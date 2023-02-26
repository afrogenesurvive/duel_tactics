
.ToString("MM/dd/yyyy")

string path = Environment.CurrentDirectory;
path = path.Substring(0, Environment.CurrentDirectory.Length - 17);
var stream = File.OpenRead(Path.Combine(path, @"AppData/csv/Timesheet1.csv"));


var directory = $"{Path.GetDirectoryName(context.DeploymentDirectory)}\\net6.0\\AppData\\csv\\Timesheet1.csv";
var stream = File.OpenRead(directory);


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------



// RECORD



using System;
using System.Collections.Generic;
using AbacusApi.Data.Models;


namespace AbacusApi.Features
{

    public record AuditReportByDepartmentResults(
        string AuditCompany,
        string criteria,
        List<AuditByDepartment> Audits,
        List<AuditDetail> Totals);

    public record AuditByDepartment(
        string PayrollDate,
        string DepartmentName,
        string DepartmentNo,
        int PayCycles,
        decimal TotalGross,
        decimal TotalTaxableGross,
        List<AuditDetail> Employee,
        List<AuditDetail> Employer);



}


// SERVICE


using System;
using System.Collections.Generic;
using System.Data;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AbacusApi.Data.Models;
using AbacusApi.Features.Report.Providers;
using AbacusApi.Helpers;
using AbacusApi.Repositories;
using AbacusApi.Services;
using Microsoft.Azure.Cosmos.Core;
using Microsoft.Azure.Cosmos.Serialization.HybridRow.RecordIO;
using AbacusApi.Constants;
using System.ComponentModel.Design;
using AbacusApi.Features.Report.Templates;
using AbacusApi.Integrations.PDFShift;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using System.Text.Json;

namespace AbacusApi.Features.Report.Services
{
    public class AuditReportByDepartmentService<T> : IReport<T>
    {
        readonly public StateContext ctx;
        readonly PayrollRepository payrollRep;
        readonly PDFGenerator PDF;
        ITemplateProvider provider = TemplateConnector.CreateTemplateProvider(PDFTemplates.auditReportByDepartment);


        List<AuditByDepartment> audits = new List<AuditByDepartment>();



        public AuditReportByDepartmentService(PayrollRepository payrollRep, PDFGenerator PDF, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.PDF = PDF;
            this.ctx = ctx;
        }

        public Task<string> GenerateCSV(Dictionary<string, string> param)
        {
            return default;
        }

        public async Task<string> GeneratePDF(Dictionary<string, string> param)
        {

            string[] payrollIds = param["payrollIds"].Split(',');
            List<Filter> filters = JsonSerializer.Deserialize<List<Filter>>(param["filters"]);
            string[] departments = filters[0].Value.Split(',');


            List<Payrolls> payrolls = new List<Payrolls>();
            List<Payrolls> filtered_payrolls = new List<Payrolls>();



            if (payrollIds[0].IsNullOrEmptyWhitespace())
            {
                payrolls = await payrollRep.GetAllPayrollsByCompanyId(ctx.Company.id, false, 0);
            }
            else
            {
                payrolls = await payrollRep.GetPayrollsByIds(payrollIds);
            }



            if (filtered_payrolls.Count > 0)
                payrolls = filtered_payrolls;

            Contracts.Requires(payrolls.Count > 0, "No Payrolls found.");
            Contracts.Requires(payrolls[0].EmployeeData.Count > 0, "Cannot generate listing on empty payroll.");

            await payrolls.Select(x => Audits(x,departments,filters)).Parallel();

            Contracts.Requires(audits.Count > 0, "No Audits found.");



            List<AuditDetail> totals = new List<AuditDetail>();

            totals.AddRange(
                payrolls.SelectMany(p => p.EmployeeData)
                  .SelectMany(e => e.Cache.Statutory)
                  .GroupBy(s => s.Tax)
                  .Select(g => new AuditDetail(g.Key, g.Sum(s => s.EmployeeAmount + s.EmployerAmount)))
                  .ToList()
                );
            totals.AddRange(
                payrolls.SelectMany(p => p.EmployeeData)
                  .SelectMany(e => e.Cache.NonStatutory)
                  .GroupBy(s => s.Description)
                  .Select(g => new AuditDetail(g.Key, g.Sum(s => s.EmployeeAmount + s.EmployerAmount)))
                  .ToList()
                );

            totals.Add(new AuditDetail("TotalTaxes",
                payrolls.SelectMany(p => p.EmployeeData).Sum(f => f.Cache.StatutoryTotal)
            ));
            totals.Add(new AuditDetail("Pension",
                payrolls.SelectMany(p => p.EmployeeData).Sum(s => s.Employee.Pension.Code.GetEmployeeAmount() + s.Employee.Pension.Code.GetEmployerAmount())
            ));
            totals.Add(new AuditDetail("EmployeeTotal",
                payrolls.Select(p => p.EmployeeData.Count()).Sum()
            ));




            var result = new AuditReportByDepartmentResults(
                ctx.Company.CompanyName,
                @$"{filters[0].Field}, {filters[0].Value}",
                audits,
                totals
            );


            var filename = param.ContainsKey("filename") ? param["filename"] : "auditReportByDepartment.pdf";


            var footer = await File.ReadAllTextAsync(@"AppData/Templates/AuditReports/footer.html");
            var header = await File.ReadAllTextAsync(@"AppData/Templates/AuditReports/header.html");
            footer = footer.Replace("{{owner}}", $"{ctx.User.FirstName} {ctx.User.LastName}").Replace("{{date}}", DateTime.UtcNow.ConvertTOEST().ToShortDateString());


            var body = await provider.GetTemplate(result);

            var res = await PDF.Generate(filename, body, header, footer, landscape: true);

            return res.url;

            throw new ArgumentNullException(nameof(payrolls));
        }

        public Task<T> GeneratePDFPreview()
        {
            return default;
        }



        async Task Audits(Payrolls payroll, string[] departments, List<Filter> filters)
        {


                foreach (var data in payroll.EmployeeData)
                {
                    if (data != null)
                    {


                        var add_this_audit = false;
                        var empCurrent = data.Cache;
                        var audit = audits.FirstOrDefault(e => e.DepartmentNo == data.Employee.Employment.Department.Code);

                        if (departments != null && departments.Count() > 0)
                        {
                            if (departments.Contains(data.Employee.Employment.Department.Code)) add_this_audit = true;
                        }


                    //if (filters[0].Field.ToLower() == "department")
                    //{
                    //    add_this_audit = false;

                    //    if (filters[0].FieldChildren.Count > 0 && filter.FieldChildren.Contains(data.Employee.Employment.Department.Code.ToLower()))
                    //    {
                    //        add_this_audit = true;
                    //    }

                    //}


                    if (filters[0].Value.ToLower() == "all")
                        {
                            add_this_audit = true;
                        }


                        #region add audit
                        if (add_this_audit)
                        {
                            if (audit == null)
                            {
                                audit = new AuditByDepartment(
                                    payroll.PayCycle.EndDate.ToString(),
                                    data.Employee.Employment.Department.Description,
                                    data.Employee.Employment.Department.Code,
                                    0,
                                    empCurrent.Gross,
                                    empCurrent.TaxableGross,
                                    AuditDetails(data).Item1,
                                    AuditDetails(data).Item2
                                    );
                                audits.Add(audit);
                            }
                            else
                            {
                                var existingAudit = audit;
                                audit = new AuditByDepartment(
                                    payroll.PayCycle.EndDate.ToString(),
                                    data.Employee.Employment.Department.Description,
                                    data.Employee.Employment.Department.Code,
                                    0,
                                    (existingAudit.TotalGross + empCurrent.Gross),
                                    (existingAudit.TotalTaxableGross + empCurrent.TaxableGross),
                                    AuditDetails(data).Item1,
                                    AuditDetails(data).Item2
                                    );
                                audits.Where(a => a.DepartmentNo == audit.DepartmentNo).ToList().ForEach(adt => adt = audit);
                            }


                        }
                        #endregion
                    }


                }

            await Task.CompletedTask;
        }


        (List<AuditDetail>, List<AuditDetail>) AuditDetails(EmployeeData data)
        {
            List<AuditDetail> employee = new List<AuditDetail>();
            List<AuditDetail> employer = new List<AuditDetail>();


            #region add employee net pay
            var empCurrent = data.Cache;
            var audit = audits.FirstOrDefault(e => e.DepartmentNo == data.Employee.Employment.Department.Code);


            //call func for emp net and return employee and add

            var employee_net = new AuditDetail("",0);
            var employee_pension = new AuditDetail("", 0);
            var employer_pension = new AuditDetail("",0);
            if (audit == null)
            {
                employee_net = null;
                employee_pension = null;
                employer_pension = null;
            }
            else
            {
                employee_net = audit.Employee.FirstOrDefault(e => e.Description == "NetPay");
                employee_pension = audit.Employee.FirstOrDefault(e => e.Description == "Pension");
                employer_pension = audit.Employer.FirstOrDefault(e => e.Description == "Pension");
            }

            if (employee_net == null)
            {
                employee.Add(EmployeeNet(data, employee_net));
            }
            else
            {
                employee.Where(e => e.Description == "NetPay").ToList().ForEach(p => p = EmployeeNet(data, employee_net));
            }
            #endregion

            //do employee count




            #region add employee pension

            var pension = data.Employee?.Pension?.Code;
            if (employee_pension == null)
            {
                employee.Add(EmployeePension(employee_pension, pension));
            }
            else
            {
                employee.Where(e => e.Description == "Pension").ToList().ForEach(p => p = EmployeePension(employee_pension, pension));
            }
            #endregion


            #region add employer pension


            if (employer_pension == null)
            {
                employer.Add(EmployerPension(employee_pension, pension));
            }
            else
            {
                employer.Where(e => e.Description == "Pension").ToList().ForEach(p => p = EmployerPension(employee_pension, pension));
            }

            //var pensionSummary = totals.FirstOrDefault(t => t.Description == "Pension");
            //if (pension != null)
            //{
            //    AuditDetail existingPensionTotal = pensionSummary;
            //    pensionSummary = new AuditDetail(
            //        existingPensionTotal.Description,
            //        existingPensionTotal.Amount + pension.GetEmployeeAmount() + pension.GetEmployerAmount());
            //}
            //else
            //{
            //    AuditDetail existingPensionTotal = pensionSummary;
            //    pensionSummary = new AuditDetail(
            //        existingPensionTotal.Description,
            //        existingPensionTotal.Amount);
            //}
            //totals.Where(t => t.Description == pensionSummary.Description).ToList().ForEach(e => e = pensionSummary);
            #endregion


            #region start adding statutories
            foreach (var stat in empCurrent.Statutory)
            {
                #region set employee employer stat amount



                var audit_detail_employee = new AuditDetail("",0);
                var audit_detail_employer = new AuditDetail("",0);
                if (audit == null)
                {
                    audit_detail_employee = null;
                    audit_detail_employer = null;
                }
                else
                {
                    audit_detail_employee = audit.Employee.FirstOrDefault(s => s.Description == stat.Tax);
                    audit_detail_employer = audit.Employer.FirstOrDefault(s => s.Description == stat.Tax);
                }


                if (audit_detail_employee == null)
                {
                    employee.Add(StatutoryEmployee(audit_detail_employee, stat));
                }
                else
                {
                    employee.Where(s => s.Description == stat.Tax).ToList().ForEach(s => s = StatutoryEmployee(audit_detail_employee, stat));
                }



                if (audit_detail_employer == null)
                {
                    employer.Add(StatutoryEmployer(audit_detail_employee, stat));
                }
                else
                {
                    employer.Where(s => s.Description == stat.Tax).ToList().ForEach(s => s = StatutoryEmployer(audit_detail_employee, stat));
                }

                //var total = totals.FirstOrDefault(t => t.Description == stat.Tax);
                //if (total == null)
                //{
                //    total = new AuditDetail(
                //        stat.Tax,
                //        stat.EmployeeAmount + stat.EmployerAmount);
                //    totals.Add(total);
                //}
                //else
                //{
                //    AuditDetail existingStatTotal = total;
                //    total = new AuditDetail(
                //        stat.Tax,
                //        existingStatTotal.Amount + stat.EmployeeAmount + stat.EmployerAmount);
                //    totals.Where(t => t.Description == total.Description).ToList().ForEach(e => e = total);
                //}
                #endregion


                #region update statutory summary
                //var statSummary = totals.FirstOrDefault(t => t.Description == "StatutorySummary");

                //totals.Where(t => t.Description == statSummary.Description).ToList().ForEach(e => e = new AuditDetail(
                //    statSummary.Description,
                //    statSummary.Amount + stat.EmployeeAmount + stat.EmployerAmount));
                #endregion

            }
            #endregion


            foreach (var nonstat in empCurrent.NonStatutory)
            {
                #region set employee employer nonstat amount

                var audit_detail_employee = new AuditDetail("", 0);
                var audit_detail_employer = new AuditDetail("", 0);
                if (audit == null)
                {
                    audit_detail_employee = null;
                    audit_detail_employer = null;
                }
                else
                {
                    audit_detail_employee = audit.Employee.FirstOrDefault(s => s.Description == nonstat.Description);
                    audit_detail_employer = audit.Employer.FirstOrDefault(s => s.Description == nonstat.Description);
                }

                if (audit_detail_employee == null)
                {
                    employee.Add(NonStatutoryEmployee(audit_detail_employee, nonstat));
                }
                else
                {
                    employee.Where(s => s.Description == nonstat.Description).ToList().ForEach(s => s = NonStatutoryEmployee(audit_detail_employee, nonstat));
                }



                if (audit_detail_employer == null)
                {
                    employer.Add(NonStatutoryEmployer(audit_detail_employer, nonstat));
                }
                else
                {
                    employer.Where(s => s.Description == nonstat.Description).ToList().ForEach(s => s = NonStatutoryEmployer(audit_detail_employer, nonstat));
                }
                #endregion


                #region start adding nonstatutories
                //var total = totals.FirstOrDefault(t => t.Description == nonstat.Description);


                //if (total == null)
                //{
                //    total = new AuditDetail(
                //        nonstat.Description,
                //        nonstat.EmployerAmount + nonstat.EmployeeAmount);
                //    totals.Add(total);
                //}
                //else
                //{
                //    AuditDetail existingNonstatTotal = total;
                //    total = new AuditDetail(
                //        existingNonstatTotal.Description,
                //        existingNonstatTotal.Amount + nonstat.EmployerAmount + nonstat.EmployeeAmount);
                //    totals.Where(t => t.Description == total.Description).ToList().ForEach(e => e = total);
                //}
                #endregion

                //var nonstatTotal = new AuditDetail("", 0);
                //if(audit == null)
                //{
                //    nonstatTotal = null;
                //}
                //else
                //{
                //    nonstatTotal = audit.Employee.FirstOrDefault(t => t.Description == "NonStatTotal");
                //}
                //if(nonstatTotal == null)
                //{
                //    employee.Add(new AuditDetail(
                //    "NonStatTotal",
                //    nonstat.EmployeeAmount));
                //}
                //else
                //{
                //    employee.Where(t => t.Description == nonstatTotal.Description).ToList().ForEach(e => e = new AuditDetail(
                //    nonstatTotal.Description,
                //    nonstatTotal.Amount + nonstat.EmployeeAmount));
                //}


                #region update nonstatutory summary
                //var nonstatSummary = totals.FirstOrDefault(t => t.Description == "NonStatutorySummary");

                //totals.Where(t => t.Description == nonstatSummary.Description).ToList().ForEach(e => e = new AuditDetail(
                //    nonstatSummary.Description,
                //    nonstatSummary.Amount + nonstat.EmployeeAmount + nonstat.EmployerAmount));
                #endregion

            }


            return (employee, employer);
        }

        AuditDetail EmployeeNet(EmployeeData data, AuditDetail employee_net)
        {
            var empCurrent = data.Cache;
            if (employee_net == null)
            {

                employee_net = new AuditDetail(
                    "NetPay",
                    empCurrent.Net);

            }
            else
            {
                AuditDetail existingEmployeeNet = employee_net;
                employee_net = new AuditDetail(
                    existingEmployeeNet.Description,
                    (existingEmployeeNet.Amount + empCurrent.Net));
            }

            return employee_net;

        }

        AuditDetail EmployeePension(AuditDetail employee_pension, PensionCode pension)
        {
            if (employee_pension == null)
            {
                employee_pension = new AuditDetail(
                    "Pension",
                    pension.GetEmployeeAmount());
            }
            else
            {
                AuditDetail existingEmployeePension = employee_pension;
                employee_pension = new AuditDetail(
                    "Pension",
                    existingEmployeePension.Amount + pension.GetEmployeeAmount());
            }
            return employee_pension;
        }

        AuditDetail EmployerPension(AuditDetail employer_pension, PensionCode pension)
        {
            if (employer_pension == null)
            {
                decimal amount = 0;
                if (pension != null)
                {
                    amount = pension.GetEmployerAmount();
                }
                employer_pension = new AuditDetail(
                    "Pension",
                    amount);
            }
            else
            {
                AuditDetail existingEmployerPension = employer_pension;
                decimal amount = existingEmployerPension.Amount;
                if (pension != null)
                {
                    amount = existingEmployerPension.Amount + pension.GetEmployerAmount();
                }
                employer_pension = new AuditDetail(
                    "Pension",
                    amount);
            }
            return employer_pension;
        }

        AuditDetail StatutoryEmployee(AuditDetail audit_detail_employee, Statutory stat)
        {
            if (audit_detail_employee == null)
            {
                audit_detail_employee = new AuditDetail(
                    stat.Tax,
                    stat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployeeAudit = audit_detail_employee;
                audit_detail_employee = new AuditDetail(
                    stat.Tax,
                    existingStatEmployeeAudit.Amount + stat.EmployeeAmount);
            }

            return audit_detail_employee;
        }

        AuditDetail StatutoryEmployer(AuditDetail audit_detail_employer, Statutory stat)
        {
            if (audit_detail_employer == null)
            {
                audit_detail_employer = new AuditDetail(
                    stat.Tax,
                    stat.EmployerAmount);
            }
            else
            {
                AuditDetail existingStatEmployerAudit = audit_detail_employer;
                audit_detail_employer = new AuditDetail(
                    stat.Tax,
                    existingStatEmployerAudit.Amount + stat.EmployerAmount);
            }

            return audit_detail_employer;
        }

        AuditDetail NonStatutoryEmployee(AuditDetail audit_detail_employee, NonStatutory nonstat)
        {
            if (audit_detail_employee == null)
            {
                audit_detail_employee = new AuditDetail(
                    nonstat.Description,
                    nonstat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployeeAudit = audit_detail_employee;
                audit_detail_employee = new AuditDetail(
                    nonstat.Description,
                    existingStatEmployeeAudit.Amount + nonstat.EmployeeAmount);
            }

            return audit_detail_employee;
        }

        AuditDetail NonStatutoryEmployer(AuditDetail audit_detail_employer, NonStatutory nonstat)
        {
            if (audit_detail_employer == null)
            {
                audit_detail_employer = new AuditDetail(
                    nonstat.Description,
                    nonstat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployerAudit = audit_detail_employer;
                audit_detail_employer = new AuditDetail(
                    nonstat.Description,
                    existingStatEmployerAudit.Amount + nonstat.EmployerAmount);
            }

            return audit_detail_employer;
        }

    }
}


// TEMPLATE

using System;
using System.Reflection;
using AbacusApi.Data.Models;
using AbacusApi.Helpers;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using AbacusApi.Constants;

namespace AbacusApi.Features.Report.Templates
{
    public class AuditReportByDepartmentTemplate : ITemplateProvider
    {
        public async Task<string> GetTemplate(object results)
        {

            var pages = await File.ReadAllTextAsync(@"AppData/Templates/AuditReports/AuditReport.html");
            var page = await File.ReadAllTextAsync(@"AppData/Templates/AuditReports/AuditReportByDepartment-pages.html");

            var data = (AuditReportByDepartmentResults)results;

            var pageData = string.Empty;
            var index = 0;
            foreach (var audit in Chunks(data.Audits, 30).Select((value, i) => new { i, value }))
            {
                index += 30;
                var copy = page;

                var audits = string.Empty;
                var mainItems = string.Empty;
                var deductionItems = string.Empty;
                var contributionItems = string.Empty;
                var totals = string.Empty;


                foreach (var item in audit.value)
                {
                    mainItems += @$"
                        <tr>
                            <td>{item.PayrollDate}</td>
                            <td align=""left"">{item.DepartmentNo}</td>
                            <td align=""left"">{item.DepartmentName}</td>
                            <td align=""left"">{item.TotalGross.FormatCurrency()}</td>
                            <td align=""left"">{item.TotalTaxableGross.FormatCurrency()}</td>
                        </tr>";
                }


                foreach (var item in audit.value)
                {
                    foreach (var detail in item.Employee)
                    {
                        deductionItems += $@"
                        <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
                    }

                    foreach (var detail in item.Employer)
                    {
                        contributionItems += $@"
                        <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
                    }
                }

                if(index >= data.Audits.Count)
                {
                    foreach (var total in data.Totals)
                    {
                        if (
                                total.Description == "Pension" ||
                                total.Description == "TotalTaxes" ||
                                total.Description == "NIS" ||
                                total.Description == "NHT" ||
                                total.Description == "Nd. Tax" ||
                                total.Description == "HEART" ||
                                total.Description == "PAYE"
                        )
                        {
                            totals += $@"<tr>
                                <td class=""spc"">{total.Description}</td>
                                <td>{total.Amount.FormatCurrency()}</td>
                            </tr>";

                        }
                        if (total.Description == "EmployeeTotal")
                        {
                            totals += $@"<tr>
                                <td class=""spc"">{total.Description}</td>
                                <td>{total.Amount}</td>
                            </tr>";

                        }
                    }
                }



                copy = page
                .Replace("{{page}}", (audit.i + 1).ToString())
                .Replace("{{report_no}}", ReportNums.AuditReportbyDept)
                .Replace("{{logo}}", "")
                .Replace("{{company_name}}", data.AuditCompany)
                .Replace("{{criteria}}", data.criteria)
                .Replace("{{main_items}}", mainItems)
                .Replace("{{deduction_items}}", deductionItems)
                .Replace("{{contribution_items}}", contributionItems)
                .Replace("{{totals}}", totals);

                pageData += copy;

            }


            pages = pages.Replace("{{pages}}", pageData);
            //await File.WriteAllTextAsync(@"AppData/Templates/AuditReports/auditReportByDepartmentFinal.html", pages);

            return pages;
        }

        private IEnumerable<IEnumerable<Audit>> Chunks<Audit>(List<Audit> fullList, int batchSize)
        {
            int total = 0;
            var chunkedList = new List<List<Audit>>();
            while (total < fullList.Count)
            {
                var chunk = fullList.Skip(total).Take(batchSize);
                chunkedList.Add(chunk.ToList());
                total += batchSize;
            }

            return chunkedList;
        }
    }



}



// REPORT BUILDER


readonly PayrollRepository payrollRep;
readonly public StateContext ctx;
readonly PDFGenerator PDF;
public Calculator calc;

public ReportBuilder(PayrollRepository payrollRep, StateContext ctx, PDFGenerator PDF, Calculator calc)
{
    this.payrollRep = payrollRep;
    this.ctx = ctx;
    this.PDF = PDF;
    this.calc = calc;
}



case Reports.AuditReportByDepartment:
    return new AuditReportByDepartmentService<TResult>(payrollRep, PDF, ctx);



// REPORT GENERATOR

ReportBuilder builder;
readonly PDFGenerator PDF;
public Calculator calc;
public ReportGenerator(PayrollRepository payrollRep, StateContext ctx, PDFGenerator PDF, Calculator calc)
{
    builder = new ReportBuilder(payrollRep, ctx, PDF, calc);
}

public async Task<TResult> GenerateAuditReportByDepartment<TResult>(format format, string payrollIds, string filters)
{
    var data = new Dictionary<string, string>();
    IReport<TResult> provider = await builder.CreateReportProvider<TResult>(Reports.AuditReportByDepartment);
    switch (format)
    {
        case format.PDF:

            data = new Dictionary<string, string>
            {
                { "payrollIds", payrollIds },
                {"filters", filters }
            };
            //return await provider.GeneratePDF(data);
            var url = await provider.GeneratePDF(data);
            return (TResult)(object)url;
        case format.PDFPreview:
            return await provider.GeneratePDFPreview();
        case format.CSV:
            url = await provider.GenerateCSV(data);
            return (TResult)(object)url;
        default:
            throw new InvalidOperationException();
    }
}



// PAYROLL PayrollRepository

public async Task<List<Payrolls>> GetPayrollsByIds(string[] ids)
{

    var idQueryString = "('" + string.Join("','", ids) + "')";
    var baseQueryString = $"SELECT * FROM c WHERE c.id IN ";
    var finalQUeryString = baseQueryString + idQueryString;

    var payrolls = await GetItemsAsync(finalQUeryString);
    return payrolls;
}




// REPORTS CONTROLLER

/// <summary>
/// Report
/// </summary>
/// <param name="payrollIds"></param>
/// <returns></returns>
[Route("v1/api/reports/CreateAuditReportByDepartment/{payrollIds}/")]
[HttpPut]
public async Task<IActionResult> CreateAuditReportByDepartment(string payrollIds, List<Filter> filters)
{

    try
    {
        string jsonFilters = JsonSerializer.Serialize(filters);
        var auditReportByDepartment = await svc.GenerateAuditReportByDepartment<string>(format.PDF, payrollIds, jsonFilters);
        return Ok(auditReportByDepartment);
    }
    catch (ApplicationException ex)
    {
        return BadRequest(ex.Message);
    }
}



// UNIT TEST


[TestMethod]
public async Task ShouldGenerateAuditReportByDepartment()
{

    var filter = new Filter();
    filter.Field = "department";
    filter.Value = "all";
    var filters = new List<Filter> { filter };
    string jsonFilters = JsonSerializer.Serialize(filters);
    var result = await rep.GenerateAuditReportByDepartment<string>(format.PDF, payroll.id, jsonFilters);

    Assert.IsTrue(result != "");
    Assert.IsNotNull(result);

}



// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

// PayrollRepository

public async Task<List<Payrolls>> GetPayrollsByIds(string[] ids)
{

    var idQueryString = "('" + string.Join("','", ids) + "')";
    var baseQueryString = $"SELECT * FROM c WHERE c.id IN ";
    var finalQUeryString = baseQueryString + idQueryString;

    var payrolls = await GetItemsAsync(finalQUeryString);
    return payrolls;
}



// controller

/// <summary>
/// Report
/// </summary>
/// <param name="payrollIds"></param>
/// <returns></returns>
[Route("v1/api/reports/CreateAuditReportByEmployee/{payrollIds}")]
[HttpPut]
public async Task<IActionResult> CreateAuditReportByEmployee(string payrollIds, List<Filter> filters)
{

    try
    {
        string jsonFilters = JsonSerializer.Serialize(filters);
        var auditReportByEmployee = await svc.GenerateAuditReportByEmployee<string>(format.PDF, payrollIds, jsonFilters);
        return Ok(auditReportByEmployee);
    }
    catch (ApplicationException ex)
    {
        return BadRequest(ex.Message);
    }
}





// Record

using System;
using System.Collections.Generic;
using AbacusApi.Data.Models;


namespace AbacusApi.Features
{

    public record AuditReportByEmployeeResults(
        string AuditCompany,
        string criteria,
        List<AuditByEmployee> Audits,
        List<AuditDetail> Totals);

    public record AuditByEmployee(
        string PayrollDate,
        string EmployeeName,
        string EmployeeNo,
        int PayCycles,
        decimal TotalGross,
        decimal TotalTaxableGross,
        List<AuditDetail> Employee,
        List<AuditDetail> Employer);


}


// ReportBuilder.cs


readonly PayrollRepository payrollRep;
readonly public StateContext ctx;
readonly PDFGenerator PDF;
public Calculator calc;

public ReportBuilder(PayrollRepository payrollRep, StateContext ctx, PDFGenerator PDF, Calculator calc)
{
    this.payrollRep = payrollRep;
    this.ctx = ctx;
    this.PDF = PDF;
    this.calc = calc;
}

case Reports.AuditReportByEmployee:
    return new AuditReportByEmployeeService<TResult>(payrollRep, PDF, ctx);



// Service


using System;
using System.Collections.Generic;
using System.Data;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AbacusApi.Data.Models;
using AbacusApi.Features.Report.Providers;
using AbacusApi.Helpers;
using AbacusApi.Repositories;
using AbacusApi.Services;
using Microsoft.Azure.Cosmos.Core;
using Microsoft.Azure.Cosmos.Serialization.HybridRow.RecordIO;
using AbacusApi.Constants;
using System.ComponentModel.Design;
using AbacusApi.Features.Report.Templates;
using AbacusApi.Integrations.PDFShift;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;
using System.Text.Json;

namespace AbacusApi.Features.Report.Services
{
    public class AuditReportByEmployeeService<T> : IReport<T>
    {
        readonly public StateContext ctx;
        readonly PayrollRepository payrollRep;
        readonly PDFGenerator PDF;
        ITemplateProvider provider = TemplateConnector.CreateTemplateProvider(PDFTemplates.auditReportByEmployee);


        List<AuditByEmployee> audits = new List<AuditByEmployee>();


        public AuditReportByEmployeeService(PayrollRepository payrollRep, PDFGenerator PDF, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.PDF = PDF;
            this.ctx = ctx;
        }

        public Task<string> GenerateCSV(Dictionary<string, string> param)
        {
            return default;
        }

        public async Task<string> GeneratePDF(Dictionary<string, string> param)
        {

            string[] payrollIds = param["payrollIds"].Split(',');
            List<Filter> filters = JsonSerializer.Deserialize<List<Filter>>(param["filters"]);
            string[] employees = filters[0].Value.Split(',');

            List<Payrolls> payrolls = new List<Payrolls>();
            List<Payrolls> filtered_payrolls = new List<Payrolls>();



            if (payrollIds[0].IsNullOrEmptyWhitespace())
            {
                payrolls = await payrollRep.GetAllPayrollsByCompanyId(ctx.Company.id, false, 0);
            }
            else
            {
                payrolls = await payrollRep.GetPayrollsByIds(payrollIds);
            }



            if (filtered_payrolls.Count > 0)
                payrolls = filtered_payrolls;

            Contracts.Requires(payrolls.Count > 0, "No Payrolls found.");
            Contracts.Requires(payrolls[0].EmployeeData.Count > 0, "Cannot generate listing on empty payroll.");

            await payrolls.Select(x => Audits(x, employees, filters)).Parallel();

            Contracts.Requires(audits.Count > 0, "No Audits found.");

            List<AuditDetail> totals = new List<AuditDetail>();


            totals.AddRange(
                payrolls.SelectMany(p => p.EmployeeData)
                  .SelectMany(e => e.Cache.Statutory)
                  .GroupBy(s => s.Tax)
                  .Select(g => new AuditDetail(g.Key, g.Sum(s => s.EmployeeAmount + s.EmployerAmount)))
                  .ToList()
                );
            totals.AddRange(
                payrolls.SelectMany(p => p.EmployeeData)
                  .SelectMany(e => e.Cache.NonStatutory)
                  .GroupBy(s => s.Description)
                  .Select(g => new AuditDetail(g.Key, g.Sum(s => s.EmployeeAmount + s.EmployerAmount)))
                  .ToList()
                );

            totals.Add(new AuditDetail("TotalTaxes",
                payrolls.SelectMany(p => p.EmployeeData).Sum(f => f.Cache.StatutoryTotal)
            ));
            totals.Add(new AuditDetail("Pension",
                payrolls.SelectMany(p => p.EmployeeData).Sum(s => s.Employee.Pension.Code.GetEmployeeAmount() + s.Employee.Pension.Code.GetEmployerAmount())
            ));
            totals.Add(new AuditDetail("EmployeeTotal",
                payrolls.Select(p => p.EmployeeData.Count()).Sum()
            ));


            var result = new AuditReportByEmployeeResults(
                ctx.Company.CompanyName,
                @$"{filters[0].Field}, {filters[0].Value}",
                    audits,
                    totals
            );


            var filename = param.ContainsKey("filename") ? param["filename"] : "auditReportByEmployee.pdf";

            string path = Environment.CurrentDirectory;
            path = path.Substring(0, Environment.CurrentDirectory.Length - 17);

            var footer = await File.ReadAllTextAsync(Path.Combine(path, @"AppData/Templates/AuditReports/footer.html"));
            var header = await File.ReadAllTextAsync(Path.Combine(path, @"AppData/Templates/AuditReports/header.html"));
            footer = footer.Replace("{{owner}}", $"{ctx.User.FirstName} {ctx.User.LastName}").Replace("{{date}}", DateTime.UtcNow.ConvertTOEST().ToShortDateString());


            var body = await provider.GetTemplate(result);

            var res = await PDF.Generate(filename, body, header, footer, landscape: true);

            return res.url;

            throw new ArgumentNullException(nameof(payrolls));
        }

        public Task<T> GeneratePDFPreview()
        {
            return default;
        }



        async Task Audits(Payrolls payroll, string[] employees, List<Filter> filters)
        {


            foreach (var data in payroll.EmployeeData)
            {
                if (data != null)
                {


                    var add_this_audit = false;
                    var empCurrent = data.Cache;
                    var audit = audits.FirstOrDefault(e => e.EmployeeNo == data.Employee.EmployeeId);



                    if (employees != null && employees.Count() > 0)
                    {
                        if (employees.Contains(data.Employee.EmployeeId)) add_this_audit = true;
                    }
                    else
                    {
                        add_this_audit = true;
                    }

                    //if (filter.Field.ToLower() == "employee")
                    //{
                    //    add_this_audit = false;

                    //    if (filter.FieldChildren.Count > 0 && filter.FieldChildren.Contains(data.Employee.EmployeeId.ToLower()))
                    //    {
                    //        add_this_audit = true;

                    //    }
                    //}


                    if (filters[0].Value.ToLower() == "all")
                    {
                        add_this_audit = true;
                    }


                    #region add audit
                    if (add_this_audit)
                    {
                        if (audit == null)
                        {
                            audit = new AuditByEmployee(
                                payroll.PayCycle.EndDate.ToString(),
                                data.Employee.Name(),
                                data.Employee.EmployeeId,
                                0,
                                empCurrent.Gross,
                                empCurrent.TaxableGross,
                                AuditDetails(data).Item1,
                                AuditDetails(data).Item2
                                );
                            audits.Add(audit);
                        }
                        else
                        {
                            AuditByEmployee existingAudit = audit;
                            audit = new AuditByEmployee(
                                payroll.PayCycle.EndDate.ToString(),
                                data.Employee.Name(),
                                data.Employee.EmployeeId,
                                0,
                                (existingAudit.TotalGross + empCurrent.Gross),
                                (existingAudit.TotalTaxableGross + empCurrent.TaxableGross),
                                AuditDetails(data).Item1,
                                AuditDetails(data).Item2
                                );
                            audits.Where(a => a.EmployeeNo == audit.EmployeeNo).ToList().ForEach(adt => adt = audit);
                        }


                    }
                    #endregion
                }


            }

            await Task.CompletedTask;
        }


        (List<AuditDetail>, List<AuditDetail>) AuditDetails(EmployeeData data)
        {
            List<AuditDetail> employee = new List<AuditDetail>();
            List<AuditDetail> employer = new List<AuditDetail>();


            #region add employee net pay
            var empCurrent = data.Cache;
            var audit = audits.FirstOrDefault(e => e.EmployeeNo == data.Employee.EmployeeId);


            //call func for emp net and return employee and add

            var employee_net = new AuditDetail("", 0);
            var employee_pension = new AuditDetail("", 0);
            var employer_pension = new AuditDetail("", 0);
            if (audit == null)
            {
                employee_net = null;
                employee_pension = null;
                employer_pension = null;
            }
            else
            {
                employee_net = audit.Employee.FirstOrDefault(e => e.Description == "NetPay");
                employee_pension = audit.Employee.FirstOrDefault(e => e.Description == "Pension");
                employer_pension = audit.Employer.FirstOrDefault(e => e.Description == "Pension");
            }


            if (employee_net == null)
            {
                employee.Add(EmployeeNet(data, employee_net));
            }
            else
            {
                employee.Where(e => e.Description == "NetPay").ToList().ForEach(p => p = EmployeeNet(data, employee_net));
            }
            #endregion

            //do employee count

            //totals.Where(t => t.Description == "EmployeeTotal").ToList().ForEach(t =>
            //{
            //    AuditDetail existingTotal = t;
            //    t = new AuditDetail(
            //        existingTotal.Description,
            //        (t.Amount + 1)); ;
            //});
            //tally total statutories per employee

            //totals.Where(t => t.Description == "TotalTaxes").ToList().ForEach(t =>
            //{
            //    AuditDetail existingTotal = t;
            //    t = new AuditDetail(
            //        existingTotal.Description,
            //        (t.Amount + empCurrent.StatutoryTotal));
            //});


            #region add employee pension
            var pension = data.Employee?.Pension?.Code;
            if (employee_pension == null)
            {
                employee.Add(EmployeePension(employee_pension, pension));
            }
            else
            {
                employee.Where(e => e.Description == "Pension").ToList().ForEach(p => p = EmployeePension(employee_pension, pension));
            }
            #endregion


            #region add employer pension


            if (employer_pension == null)
            {
                employer.Add(EmployerPension(employee_pension, pension));
            }
            else
            {
                employer.Where(e => e.Description == "Pension").ToList().ForEach(p => p = EmployerPension(employee_pension, pension));
            }

            //var pensionSummary = totals.FirstOrDefault(t => t.Description == "Pension");
            //if (pension != null)
            //{
            //    AuditDetail existingPensionTotal = pensionSummary;
            //    pensionSummary = new AuditDetail(
            //        existingPensionTotal.Description,
            //        existingPensionTotal.Amount + pension.GetEmployeeAmount() + pension.GetEmployerAmount());
            //}
            //else
            //{
            //    AuditDetail existingPensionTotal = pensionSummary;
            //    pensionSummary = new AuditDetail(
            //        existingPensionTotal.Description,
            //        existingPensionTotal.Amount);
            //}
            //totals.Where(t => t.Description == pensionSummary.Description).ToList().ForEach(e => e = pensionSummary);
            #endregion


            #region start adding statutories
            foreach (var stat in empCurrent.Statutory)
            {
                #region set employee employer stat amount

                var audit_detail_employee = new AuditDetail("", 0);
                var audit_detail_employer = new AuditDetail("", 0);
                if (audit == null)
                {
                    audit_detail_employee = null;
                    audit_detail_employer = null;
                }
                else
                {
                    audit_detail_employee = audit.Employee.FirstOrDefault(s => s.Description == stat.Tax);
                    audit_detail_employer = audit.Employer.FirstOrDefault(s => s.Description == stat.Tax);
                }


                if (audit_detail_employee == null)
                {
                    employee.Add(StatutoryEmployee(audit_detail_employee, stat));
                }
                else
                {
                    employee.Where(s => s.Description == stat.Tax).ToList().ForEach(s => s = StatutoryEmployee(audit_detail_employee, stat));
                }


                if (audit_detail_employer == null)
                {
                    employer.Add(StatutoryEmployer(audit_detail_employee, stat));
                }
                else
                {
                    employer.Where(s => s.Description == stat.Tax).ToList().ForEach(s => s = StatutoryEmployer(audit_detail_employee, stat));
                }

                //var total = totals.FirstOrDefault(t => t.Description == stat.Tax);
                //if (total == null)
                //{
                //    total = new AuditDetail(
                //        stat.Tax,
                //        stat.EmployeeAmount + stat.EmployerAmount);
                //    totals.Add(total);
                //}
                //else
                //{
                //    AuditDetail existingStatTotal = total;
                //    total = new AuditDetail(
                //        stat.Tax,
                //        existingStatTotal.Amount + stat.EmployeeAmount + stat.EmployerAmount);
                //    totals.Where(t => t.Description == total.Description).ToList().ForEach(e => e = total);
                //}
                #endregion


                #region update statutory summary
                //var statSummary = totals.FirstOrDefault(t => t.Description == "StatutorySummary");

                //totals.Where(t => t.Description == statSummary.Description).ToList().ForEach(e => e = new AuditDetail(
                //    statSummary.Description,
                //    statSummary.Amount + stat.EmployeeAmount + stat.EmployerAmount));
                #endregion

            }
            #endregion


            foreach (var nonstat in empCurrent.NonStatutory)
            {
                #region set employee employer nonstat amount


                var audit_detail_employee = new AuditDetail("", 0);
                var audit_detail_employer = new AuditDetail("", 0);
                if (audit == null)
                {
                    audit_detail_employee = null;
                    audit_detail_employer = null;
                }
                else
                {
                    audit_detail_employee = audit.Employee.FirstOrDefault(s => s.Description == nonstat.Description);
                    audit_detail_employer = audit.Employer.FirstOrDefault(s => s.Description == nonstat.Description);
                }


                if (audit_detail_employee == null)
                {
                    employee.Add(NonStatutoryEmployee(audit_detail_employee, nonstat));
                }
                else
                {
                    employee.Where(s => s.Description == nonstat.Description).ToList().ForEach(s => s = NonStatutoryEmployee(audit_detail_employee, nonstat));
                }



                if (audit_detail_employer == null)
                {
                    employer.Add(NonStatutoryEmployer(audit_detail_employer, nonstat));
                }
                else
                {
                    employer.Where(s => s.Description == nonstat.Description).ToList().ForEach(s => s = NonStatutoryEmployer(audit_detail_employer, nonstat));
                }
                #endregion


                #region start adding nonstatutories
                //var total = totals.FirstOrDefault(t => t.Description == nonstat.Description);


                //if (total == null)
                //{
                //    total = new AuditDetail(
                //        nonstat.Description,
                //        nonstat.EmployerAmount + nonstat.EmployeeAmount);
                //    totals.Add(total);
                //}
                //else
                //{
                //    AuditDetail existingNonstatTotal = total;
                //    total = new AuditDetail(
                //        existingNonstatTotal.Description,
                //        existingNonstatTotal.Amount + nonstat.EmployerAmount + nonstat.EmployeeAmount);
                //    totals.Where(t => t.Description == total.Description).ToList().ForEach(e => e = total);
                //}
                #endregion

                //var nonstatTotal = new AuditDetail("", 0);
                //if (audit == null)
                //{
                //    nonstatTotal = null;
                //}
                //else
                //{
                //    nonstatTotal = audit.Employee.FirstOrDefault(t => t.Description == "NonStatTotal");
                //}
                //if (nonstatTotal == null)
                //{
                //    employee.Add(new AuditDetail(
                //    "NonStatTotal",
                //    nonstat.EmployeeAmount));
                //}
                //else
                //{
                //    employee.Where(t => t.Description == nonstatTotal.Description).ToList().ForEach(e => e = new AuditDetail(
                //    nonstatTotal.Description,
                //    nonstatTotal.Amount + nonstat.EmployeeAmount));
                //}


                #region update nonstatutory summary
                //var nonstatSummary = totals.FirstOrDefault(t => t.Description == "NonStatutorySummary");

                //totals.Where(t => t.Description == nonstatSummary.Description).ToList().ForEach(e => e = new AuditDetail(
                //    nonstatSummary.Description,
                //    nonstatSummary.Amount + nonstat.EmployeeAmount + nonstat.EmployerAmount));
                #endregion

            }


            return (employee, employer);
        }

        AuditDetail EmployeeNet(EmployeeData data, AuditDetail employee_net)
        {
            var empCurrent = data.Cache;
            if (employee_net == null)
            {

                employee_net = new AuditDetail(
                    "NetPay",
                    empCurrent.Net);

            }
            else
            {
                AuditDetail existingEmployeeNet = employee_net;
                employee_net = new AuditDetail(
                    existingEmployeeNet.Description,
                    (existingEmployeeNet.Amount + empCurrent.Net));
            }

            return employee_net;

        }

        AuditDetail EmployeePension(AuditDetail employee_pension, PensionCode pension)
        {
            if (employee_pension == null)
            {
                employee_pension = new AuditDetail(
                    "Pension",
                    pension.GetEmployeeAmount());
            }
            else
            {
                AuditDetail existingEmployeePension = employee_pension;
                employee_pension = new AuditDetail(
                    "Pension",
                    existingEmployeePension.Amount + pension.GetEmployeeAmount());
            }
            return employee_pension;
        }

        AuditDetail EmployerPension(AuditDetail employer_pension, PensionCode pension)
        {
            if (employer_pension == null)
            {
                decimal amount = 0;
                if (pension != null)
                {
                    amount = pension.GetEmployerAmount();
                }
                employer_pension = new AuditDetail(
                    "Pension",
                    amount);
            }
            else
            {
                AuditDetail existingEmployerPension = employer_pension;
                decimal amount = existingEmployerPension.Amount;
                if (pension != null)
                {
                    amount = existingEmployerPension.Amount + pension.GetEmployerAmount();
                }
                employer_pension = new AuditDetail(
                    "Pension",
                    amount);
            }
            return employer_pension;
        }

        AuditDetail StatutoryEmployee(AuditDetail audit_detail_employee, Statutory stat)
        {
            if (audit_detail_employee == null)
            {
                audit_detail_employee = new AuditDetail(
                    stat.Tax,
                    stat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployeeAudit = audit_detail_employee;
                audit_detail_employee = new AuditDetail(
                    stat.Tax,
                    existingStatEmployeeAudit.Amount + stat.EmployeeAmount);
            }

            return audit_detail_employee;
        }

        AuditDetail StatutoryEmployer(AuditDetail audit_detail_employer, Statutory stat)
        {
            if (audit_detail_employer == null)
            {
                audit_detail_employer = new AuditDetail(
                    stat.Tax,
                    stat.EmployerAmount);
            }
            else
            {
                AuditDetail existingStatEmployerAudit = audit_detail_employer;
                audit_detail_employer = new AuditDetail(
                    stat.Tax,
                    existingStatEmployerAudit.Amount + stat.EmployerAmount);
            }

            return audit_detail_employer;
        }

        AuditDetail NonStatutoryEmployee(AuditDetail audit_detail_employee, NonStatutory nonstat)
        {
            if (audit_detail_employee == null)
            {
                audit_detail_employee = new AuditDetail(
                    nonstat.Description,
                    nonstat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployeeAudit = audit_detail_employee;
                audit_detail_employee = new AuditDetail(
                    nonstat.Description,
                    existingStatEmployeeAudit.Amount + nonstat.EmployeeAmount);
            }

            return audit_detail_employee;
        }

        AuditDetail NonStatutoryEmployer(AuditDetail audit_detail_employer, NonStatutory nonstat)
        {
            if (audit_detail_employer == null)
            {
                audit_detail_employer = new AuditDetail(
                    nonstat.Description,
                    nonstat.EmployeeAmount);
            }
            else
            {
                AuditDetail existingStatEmployerAudit = audit_detail_employer;
                audit_detail_employer = new AuditDetail(
                    nonstat.Description,
                    existingStatEmployerAudit.Amount + nonstat.EmployerAmount);
            }

            return audit_detail_employer;
        }

    }
}



// Template


using System;
using System.Reflection;
using AbacusApi.Constants;
using AbacusApi.Data.Models;
using AbacusApi.Helpers;
using Microsoft.Azure.Cosmos.Serialization.HybridRow;

namespace AbacusApi.Features.Report.Templates
{
    public class AuditReportByEmployeeTemplate : ITemplateProvider
    {
        public async Task<string> GetTemplate(object results)
        {
            string path = Environment.CurrentDirectory;
            path = path.Substring(0, Environment.CurrentDirectory.Length - 17);

            var pages = await File.ReadAllTextAsync(Path.Combine(path, @"AppData/Templates/AuditReports/AuditReport.html"));
            var page = await File.ReadAllTextAsync(Path.Combine(path, @"AppData/Templates/AuditReports/AuditReportByEmployee-pages.html"));

            var data = (AuditReportByEmployeeResults)results;

            var pageData = string.Empty;
            var index = 0;
            foreach (var audit in Chunks(data.Audits, 30).Select((value, i) => new { i, value }))
            {
                index += 30;
                var copy = page;

                var audits = string.Empty;
                var mainItems = string.Empty;
                var deductionItems = string.Empty;
                var contributionItems = string.Empty;
                var totals = string.Empty;

                foreach (var item in audit.value)
                {
                    mainItems += @$"
                        <tr>
                            <td >{item.PayrollDate}</td>
                            <td align=""left"">{item.EmployeeName}</td>
                            <td align=""left"">{item.EmployeeNo}</td>
                            <td align=""left"">{item.TotalGross}</td>
                            <td align=""left"">{item.TotalTaxableGross}</td>
                        </tr>";
                }


                foreach (var item in audit.value)
                {
                    foreach (var detail in item.Employee)
                    {
                        deductionItems += $@"
                        <td align=""left"">{detail.Amount}</td>";
                    }

                    foreach (var detail in item.Employer)
                    {
                        contributionItems += $@"
                        <td align=""left"">{detail.Amount}</td>";
                    }
                }

                if (index >= data.Audits.Count)
                {
                    foreach (var total in data.Totals)
                    {
                        if (
                                total.Description == "Pension" ||
                                total.Description == "TotalTaxes" ||
                                total.Description == "NIS" ||
                                total.Description == "NHT" ||
                                total.Description == "Nd. Tax" ||
                                total.Description == "HEART" ||
                                total.Description == "PAYE"
                        )
                        {
                            totals += $@"<tr>
                                <td class=""spc"">{total.Description}</td>
                                <td>{total.Amount.FormatCurrency()}</td>
                            </tr>";

                        }
                        if (total.Description == "EmployeeTotal")
                        {
                            totals += $@"<tr>
                                <td class=""spc"">{total.Description}</td>
                                <td>{total.Amount}</td>
                            </tr>";

                        }
                    }
                }


                copy = page
                .Replace("{{page}}", (audit.i + 1).ToString())
                .Replace("{{report_no}}", ReportNums.AuditReportbyEmp)
                .Replace("{{log}}", "")
                .Replace("{{company_name}}", data.AuditCompany)
                .Replace("{{criteria}}", data.criteria)
                .Replace("{main_items}}", mainItems)
                .Replace("{{deduction_items}}", deductionItems)
                .Replace("{{contribution_items}}", contributionItems)
                .Replace("{{totals}}", totals);

                pageData += copy;

            }


            pages = pages.Replace("{{pages}}", pageData);
            //await File.WriteAllTextAsync(@"AppData/Templates/AuditReports/auditReportByEmployeeFinal.html", pages);

            return pages;
        }

        private IEnumerable<IEnumerable<Audit>> Chunks<Audit>(List<Audit> fullList, int batchSize)
        {
            int total = 0;
            var chunkedList = new List<List<Audit>>();
            while (total < fullList.Count)
            {
                var chunk = fullList.Skip(total).Take(batchSize);
                chunkedList.Add(chunk.ToList());
                total += batchSize;
            }

            return chunkedList;
        }
    }

}



// TemplateConnector

case PDFTemplates.auditReportByEmployee:
  return new AuditReportByEmployeeTemplate();


// ReportGenerator


public async Task<TResult> GenerateAuditReportByEmployee<TResult>(format format, string payrollIds, string filters)
{
    var data = new Dictionary<string, string>();
    IReport<TResult> provider = await builder.CreateReportProvider<TResult>(Reports.AuditReportByEmployee);
    switch (format)
    {
        case format.PDF:
            data = new Dictionary<string, string>
            {
                { "payrollIds", payrollIds },
                {"filters", filters }
            };
            var url = await provider.GeneratePDF(data);
            return (TResult)(object)url;
        case format.PDFPreview:
            return await provider.GeneratePDFPreview();
        case format.CSV:
            url = await provider.GenerateCSV(data);
            return (TResult)(object)url;
        default:
            throw new InvalidOperationException();
    }
}



// Filter DTO


public class Filter
{
    public IDictionary<string, string> ConditionMap = new Dictionary<string, string>() {
        {"is equal", "==" },
        { "is not equal", "!=" },
        {"is less than","<"},
        { "is less or equal", "<=" },
        { "is greater than",">" },
        { "is greater or equal", ">=" },
        { "and", "&&" },
        { "or", "||" },
        { "", "" },
        };
    public string Field { get; set; } = "";// define top level property to filter ex. Department, Earnings, Statutories etc..
    public string Value { get; set; } = "";
    public string Condition { get; set; } = "";
    public static class filterConditions
    {
        public const string IsEqual = "is equal";
        public const string IsNotEqual = "is not equal";
        public const string IsLessThan = "is less than";
        public const string IsLessOrEqual = "is less or equal";
        public const string IsGreaterThan = "is greater than";
        public const string IsGreaterOrEqual = "is greater or equal";

    }

}



// Test


[TestMethod]
public async Task ShouldGenerateAuditReportByEmployee()
{

    var filter = new Filter();
    filter.Field = "employee";
    filter.Value = "all";
    var filters = new List<Filter> { filter };
    string jsonFilters = JsonSerializer.Serialize(filters);
    var result = await rep.GenerateAuditReportByEmployee<string>(format.PDF, payroll.id, jsonFilters);

    Assert.IsTrue(result != "");
    Assert.IsNotNull(result);
    //Assert.IsTrue(result.Report.Audits.Count > 0);

}


if (filters[0].Value.ToLower() == "all")
{
    add_this_audit = true;
}


foreach (var audit in Chunks(data.Audits, 30).Select((value, i) => new { i, value }))
{
  index += 30;
  var copy = page;

  var audits = string.Empty;
  var mainItems = string.Empty;
  var deductionItems = string.Empty;
  var contributionItems = string.Empty;
  var totals = string.Empty;


  foreach (var item in audit.value)
  {
      mainItems += @$"
          <tr>
              <td>{item.PayrollDate}</td>
              <td align=""left"">{item.DepartmentNo}</td>
              <td align=""left"">{item.DepartmentName}</td>
              <td align=""left"">{item.TotalGross.FormatCurrency()}</td>
              <td align=""left"">{item.TotalTaxableGross.FormatCurrency()}</td>
          </tr>";
  }


  foreach (var item in audit.value)
  {
      foreach (var detail in item.Employee)
      {
          deductionItems += $@"
          <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
      }

      foreach (var detail in item.Employer)
      {
          contributionItems += $@"
          <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
      }
  }

  if (index >= data.Audits.Count)
  {
      foreach (var total in data.Totals)
      {
          if (
                  total.Description == "Pension" ||
                  total.Description == "TotalTaxes" ||
                  total.Description == "NIS" ||
                  total.Description == "NHT" ||
                  total.Description == "Nd. Tax" ||
                  total.Description == "HEART" ||
                  total.Description == "PAYE"
          )
          {
              totals += $@"<tr>
                  <td class=""spc"">{total.Description}</td>
                  <td>{total.Amount.FormatCurrency()}</td>
              </tr>";

          }
          if (total.Description == "EmployeeTotal")
          {
              totals += $@"<tr>
                  <td class=""spc"">{total.Description}</td>
                  <td>{total.Amount}</td>
              </tr>";

          }
      }
  }



  copy = page
  .Replace("{{page}}", (audit.i + 1).ToString())
  .Replace("{{report_no}}", ReportNums.AuditReportbyDept)
  .Replace("{{logo}}", "")
  .Replace("{{company_name}}", data.AuditCompany)
  .Replace("{{criteria}}", data.criteria)
  .Replace("{{main_items}}", mainItems)
  .Replace("{{deduction_items}}", deductionItems)
  .Replace("{{contribution_items}}", contributionItems)
  .Replace("{{totals}}", totals);

  pageData += copy;

}


foreach (var item in audit.value)
{

    deductionItems += $@"<tr>";
    foreach (var detail in item.Employee)
    {

        deductionItems += $@"
            <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
    }
    deductionItems += $@"</tr>";


    contributionItems += $@"<tr>";
    foreach (var detail in item.Employer)
    {
        contributionItems += $@"
            <td align=""left"">{detail.Amount.FormatCurrency()}</td>";
    }
    contributionItems += $@"</tr>";


}





// --------------------------------------------
// --------------------------------------------
// --------------------------------------------



changed json serialize method, removed calc from report builder/generator

using Newtonsoft.Json;

string jsonFilters = JsonConvert.SerializeObject(filters);

List<Filter> filters = JsonConvert.DeserializeObject<List<Filter>>(param["filters"]);



// --------------------------------------------
// --------------------------------------------
// --------------------------------------------


dept summary: endpoint, pdf razor pg, report client etc

string type = string.Empty;
        string period = string.Empty;


period = payroll.PayCycle.Period.ToString();
            type = payroll.type;





"/Users/michaelgrandison/Documents/GitHub/CaribbeanHRPhyeonix/PayrollSystem"





var footer = @$"
               <footer>
                   <span>If you have any questions about this payslip, please contact: </span>
                   <br />
                   <span>The Payroll Department at 876-789-4561 or gmail.com</span>
               </footer>
            ";

            string path = Environment.CurrentDirectory;
            var footer = await File.ReadAllTextAsync(Path.Combine(path, @"Pages/Reports/Print/PayslipFooter.html"));
            //var footer = await File.ReadAllTextAsync(@"Pages/Reports/Print/PayslipFooter.html");




<style>
  span {
     font-family: Montserrat, Verdana, Geneva, Tahoma, sans-serif;
     letter-spacing: 0.03em;
     font-size: 9px;
  }

  footer {
     text-align: center;
  }
</style>
<footer>
   <span>If you have any questions about this payslip, please contact: </span>
   <br />
   <span>The Payroll Department at 876-789-4561 or gmail.com</span>
</footer>




string path = Environment.CurrentDirectory;
var header = await System.IO.File.ReadAllTextAsync(Path.Combine(path, @"Pages/Reports/Print/header.html"));
var footer = await System.IO.File.ReadAllTextAsync(Path.Combine(path, @"Pages/Reports/Print/footer.html"));
var request = new RestRequest("/v3/convert/pdf", Method.Post);
var json = new
{
    source = body,
    sandbox = true,
    footer = new { source = footer, height = "25" },
    landscape = landscape,
    remove_blank = true,
    delay = 3,
    format = "Letter",
};



public async Task<Payrolls> OverrideTransactionsByBatchNumber(IStateContext ctx, List<List<string>> timesheet, string payrollID, int batchNum)
{
    await RemoveTransactionsByBatchNumber(ctx, batchNum, payrollID);
    var payroll = await AddTransactions2(ctx, timesheet, payrollID, batchNum);
    return payroll;
}

public async Task<Payrolls> UpdateTransactionsByBatchNumber(IStateContext ctx, List<List<string>> timesheet, string payrollID, int batchNum)
{
    var logs = new List<Log>();
    var payroll = await payrollRep.GetPayrollById(payrollID);
    //Contracts.AreNull(payroll, $"Payroll with ID {payrollID} does not exist");
    Contracts.Requires(!payroll.Committed, "This payroll is already commited. Command Cancelled.");

    var emps = timesheet.GroupBy(x => x[0]);

    foreach (var emp in emps)
    {
        var employee = payroll.EmployeeData.Find(x => x.Employee.EmployeeId == emp.Key);

        if(employee != null)
        {

            foreach (var row in emp)
            {

                if (ctx.Company.TryGetTransactionCode(row[1], out TransactionCode code))
                {

                    if (employee.Transactions.FirstOrDefault(x => x.Code.Code == code.Code && x.BatchNumber == batchNum) != null)
                    {
                        var trans = new Transaction(row, batchNum, code);
                        var log = employee.UpdateTransactionByCode(ctx, trans, batchNum);
                        logs.Add(log);
                    }
                    else
                    {
                        var transaction = new Transaction(row, batchNum, code!);
                        logs.Add(employee.AddTransaction(ctx, transaction));
                    }

                }

            }
        }

    }

    await Persist(payroll, logs);
    return payroll;
}


public async Task<Payrolls> AddTransactions2(IStateContext ctx, List<List<string>> timesheet, string payrollID, int batchNum)
{
    var logs = new List<Log>();
    var payroll = await payrollRep.GetPayrollById(payrollID);
    Contracts.AreNotNull(payroll, "payroll not found");
    var raw = timesheet.Skip(1);
    foreach (var data in raw)
    {

        Dictionary<string, string> codesData = new Dictionary<string, string>();
        for (int i = 1; i < data.Count; i = i + 2)
        {
            if (timesheet[0][i].IsNullOrEmptyWhitespace()) continue;
            codesData[timesheet[0][i]] = $"{data[i]},{data[i + 1]}";
        }

        var index = payroll!.EmployeeData.FindIndex(x => x.Employee.EmployeeId == data[0]);
        if (index < 0)
        {
            var empId = data[0];
            if (payroll.Company.EmployeeIDPadding > 2) empId = data[0].PadLeft(payroll.Company.EmployeeIDPadding, '0');

            var emp = await employeeRep.GetEmployeeByCompanyId(empId, payroll.Company.id);
            Contracts.AreNotNull(emp, $"Employee with id {empId} not found");

            payroll!.EmployeeData.Add(new EmployeeData()
            {
                Employee = emp
            });
            index = payroll!.EmployeeData.FindIndex(x => x.Employee.EmployeeId == data[0]);
        }

        var employeeData = payroll.EmployeeData[index];
        foreach (var item in codesData)
        {
            var code = payroll.Company.TransactionCodes.Find(x => x.Code.ToLower() == item.Key.ToLower());
            Contracts.AreNotNull(code, $"Transaction code {item.Key} not found");

            var valueData = item.Value.Split(',');
            if (!decimal.TryParse(valueData[0], out decimal amount)) Contracts.Requires(false,
                $"Transaction {item.Key} from employee " +
                $"{employeeData.Employee.FirstName} {employeeData.Employee.FirstName} has invalid number");

            if (!decimal.TryParse(valueData[1], out decimal rate))
                rate = 0;

            if(rate == 0 && code.Type == PaymentTypes.PaymentOfHours)
            {
                rate = employeeData.Employee.Employment.GetRate();
            }

            if (amount == 0)
            {
                continue;
            }
            else
            {
                if (employeeData.Transactions.FirstOrDefault(x => x.Code.Code == code.Code && x.BatchNumber == batchNum) != null)
                {
                    var trans = new Transaction(data, batchNum, code);
                    var log = employeeData.UpdateTransactionByCode(ctx, trans, batchNum);
                    logs.Add(log);
                }
                else
                {
                    var transaction = new Transaction(code!.Type, amount, rate, batchNum, code!);
                    logs.Add(employeeData.AddTransaction(ctx, transaction));
                }
            }

        }



    }

    await Persist(payroll, logs.Take(5).ToList());
    return payroll;
}


6001
6003
6006
6009
6010
6013
6014
6016
6017
6021
6025



payroll = await payrollSvc.GetPayrollById(payrollID);

				empData = payroll.EmployeeData;
				var companyPadding = payroll.Company.EmployeeIDPadding;

				foreach (var emp in empData)
                {
                    thresholds.Add(new EmployeeThesHold(emp.Employee.id, await GetThreshold(emp)));

					if(companyPadding > 0)
						emp.Employee.EmployeeId.PadLeft(companyPadding, '0');
                }



                void UpdateNewCode(ChangeEventArgs e)
                        {

                            var a = payroll.Company.TransactionCodes.FirstOrDefault(x => x.Code == e.Value);
                            var b = payroll.Company.TransactionCodes.FirstOrDefault(x => x.Code == e.Value.ToString());
                            //var y = payroll.Company.TransactionCodes.FirstOrDefault(x => x.Code.ToLower() == e.Value.ToLower());
                            var c = payroll.Company.TransactionCodes.FirstOrDefault(x => x.Code.ToLower() == e.Value.ToString().ToLower());
                        }





                        var exists = false;
                                    if (employeeData != null)
                                    {
                                        if (employeeData.Transactions.FirstOrDefault(x => x.Code.Code == transaction.Code.Code && x.BatchNumber == transaction.BatchNumber && x.Rate == transaction.Rate && x.id != transaction.id) != null)
                                        {
                                            exists = true;
                                        }
                                    }

                                    Contracts.Requires(!exists, "Transaction with the same Code, Rate & Batch Number Already Exists");
