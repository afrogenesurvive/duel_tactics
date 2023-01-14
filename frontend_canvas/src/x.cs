

        // main layout.cs
        // switch company
        private void clients()
        {
            ctx.Company = new Company();

            ctx.ArchiveViewer = false;
            ctx.ArchiveYear = 0;
            ctx.ArchivePeriod = 0;
            ctx.ArchiveType = "";

            nm.NavigateTo("/");

        }


        // open form
        private async Task ToggleArchive(string args)
        {
            if(args == "on")
            {
                await JS.InvokeVoidAsync("showModal", "archive-modal");
            }
            else
            {
                ctx.ArchiveViewer = false;
                ctx.ArchiveYear = 0;
                ctx.ArchivePeriod = 0;
                ctx.ArchiveType = "";

                try
                {

                    var svc = await DataManagementService.Load;
                    //_isButtonLoading = true;
                    ctx.Company = await svc.GetCompanyById(ctx.Company.id);

                    await JS.InvokeVoidAsync("closeModal");
                    //_isButtonLoading = false;
                    Notifier.Send();

                    nm.NavigateTo("/company");

                }
                catch (ApplicationException ex)
                {
                    _isButtonLoading = false;
                    await JS.InvokeAsync<string>("notify", new object[] { ex.Message });

                }


            }

        }


        // submit form
        private async Task SetArchiveMode()
        {
            if (archiveYear == 0)
            {
                archiveYear = 2022;
            }

            try
            {
                _isButtonLoading = true;
                var svc = await DataManagementService.Load;
                var prollsvc = await PayrollService.Load;

                ctx.ArchiveViewer = true;
                ctx.ArchiveYear = archiveYear;
                ctx.ArchiveType = archiveType;
                ctx.ArchivePeriod = archivePeriod;
                payroll = await svc.GetPayrollByContextOrId(ctx);

                ctx.Company = payroll.Company;


                switch (ctx.ArchiveType)
                {
                    case "fortnightly":
                        payrolls = await prollsvc.GetPayrollByType(ctx, "fortnightly");
                        break;
                    case "monthly":
                        payrolls = await prollsvc.GetPayrollByType(ctx, "monthly");
                        break;
                    case "bimonthly":
                        payrolls = await prollsvc.GetPayrollByType(ctx, "bimonthly");
                        break;
                    case "weekly":
                        payrolls = await prollsvc.GetPayrollByType(ctx, "weekly");
                        break;
                    default:
                        break;
                }
                foreach (var proll in payrolls)
                {
                    if (!periods.Contains(proll.PayCycle.Period))
                    {
                        periods.Add(proll.PayCycle.Period);
                    }
                }


                await JS.InvokeVoidAsync("closeModal");
                _isButtonLoading = false;


                Notifier.Send();


                //nm.NavigateTo("/company");

            }
            catch (ApplicationException ex)
            {
                ctx.ArchiveViewer = false;
                ctx.ArchiveYear = 0;
                ctx.ArchiveType = "";
                ctx.ArchivePeriod = 0;

                _isButtonLoading = false;
                await JS.InvokeAsync<string>("notify", new object[] { ex.Message });

            }


            pageWrapperClass = "page-wrapper archivePageWrap";
            _isButtonLoading = false;
        }


        private async Task SwitchArchivePeriod()
        {
            try
            {
                _isButtonLoading = true;
                var svc = await DataManagementService.Load;

                ctx.ArchivePeriod = archivePeriod;

                payroll = await svc.GetPayrollByContextOrId(ctx);

                ctx.Company = payroll.Company;

                _isButtonLoading = false;

                Notifier.Send();

                nm.NavigateTo("/company");
            }
            catch (ApplicationException ex)
            {
                _isButtonLoading = false;
                await JS.InvokeAsync<string>("notify", new object[] { ex.Message });

            }
            _isButtonLoading = false;
        }


        // mainLayout.blazor

        <li>
               <a style="cursor:pointer" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Archive Viewer</a>
               <div class="dropdown-menu" style="cursor:pointer;">
                   @if (ctx.ArchiveViewer == true && ctx.Company.id != "")
                   {
                       <a class="dropdown-item" @onclick="@(e => ToggleArchive("off"))">Off</a>
                       <hr />

                       <EditForm Model="ctx.ArchivePeriod">
                           <div class="row">
                               <div class="col-sm-12">
                                   <div class="form-group" style="padding: 0 .5rem;">
                                       <label for="filter_all" class="col-form-label" style="width:100%;text-align:center;">Switch Period</label>
                                       <InputSelect id="filter_all" class="form-control" @bind-Value="archivePeriod">
                                           @foreach (var period in periods)
                                           {
                                               <option value="@period">Period @period</option>
                                           }
                                       </InputSelect>

                                       @*<LoadingButton IsLoading="_isButtonLoading" class="btn btn-secondary" Type="ButtonTypes.Button" @onclick="SwitchArchivePeriod">
                                           <Content>
                                               <i class="fas fa-check"></i>
                                           </Content>
                                           <LoadingContent>
                                               <i class="fa fa-spinner fa-spin"></i> Loading...
                                           </LoadingContent>
                                           </LoadingButton>*@
                                       <button type="button" class="btn btn-secondary" @onclick="SwitchArchivePeriod"><i class="fas fa-check"></i></button>
                                   </div>

                               </div>
                           </div>
                       </EditForm>
                   }

                   @if (ctx.ArchiveViewer == false && ctx.Company.id != "")
                   {
                       <a class="dropdown-item" @onclick="@(e => ToggleArchive("on"))">On</a>
                   }
                   @if (ctx.Company.id == "")
                   {
                       <a class="dropdown-item">Choose a Company</a>
                   }
               </div>
           </li>


        @if (ctx.ArchiveViewer == true)
            {
                <div class="row" style="width:85%;margin-left:17rem;">

                    <Alert Type="NotificationTypes.Primary"
                           NotificationStyle="NotificationStyles.Normal"
                           IsVisible="true"
                           AutoClose="false"
                           ShowCloseButton="false"
                           ShowIcon="true">
                        <Content>
                            <p>You are now in <strong>Archive Mode.</strong> Period: <strong>@ctx.ArchivePeriod</strong></p>
                        </Content>
                    </Alert>

                </div>
            }


      <div id="archive-modal" class="modal custom-modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Archive Mode</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <EditForm Model="archiveYear" OnSubmit="SetArchiveMode">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Year</label>
                                    <InputSelect class="select form-control" @bind-Value="archiveYear">

                                        @for (int i = thisYear; i > start; i--)
                                        {
                                            <option>@i</option>
                                        }
                                    </InputSelect>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Type</label>
                                    <InputSelect class="form-control" @bind-Value="archiveType">
                                        <option value="fortnightly">Fortnightly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="bimonthly">Bi-Monthly</option>
                                        <option value="weekly">Weekly</option>
                                    </InputSelect>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Period</label><br />
                                    <InputNumber @bind-Value="archivePeriod" class="form-control" />
                                </div>
                            </div>

                            <div class="submit-section">
                                <LoadingButton class="btn btn-primary submit-btn" Type="ButtonTypes.Submit" IsLoading="@_isButtonLoading">
                                    <Content>Submit </Content>
                                    <LoadingContent>
                                        <i class="fa fa-spinner fa-spin"></i> Submitting...
                                    </LoadingContent>
                                </LoadingButton>
                                <a href="javascript:void(0);" data-bs-dismiss="modal" class="btn btn-primary cancel-btn">Cancel</a>
                            </div>
                        </div>
                    </EditForm>

                </div>
            </div>
        </div>
      </div>



      // notifierService.cs

      using PayrollSystem.Data.Enums;
      using PayrollSystem.Data.Models;
      using PayrollSystem.Data.Repositories;
      using PayrollSystem.Helpers;
      using System.Globalization;
      using System.Linq;
      using System.Text;

      namespace PayrollSystem.Services
      {
          public class NotifierService
          {


              public NotifierService()
              {

              }

              //public static Lazy<Task<NotifierService>> instance = new(Create);

              //public static Task<NotifierService> Load => instance.Value;

              //public static async Task<NotifierService> Create()
              //{
              //    return new NotifierService();
              //}

              public void Send()
              {
                  Notify?.Invoke();
              }

              public event Func<Task> Notify;


          }
      }



      // companyPage.cs/ reciever notfier notification

      protected async override Task OnInitializedAsync()
        {


            Notifier.Notify += OnNotify;

        }


        public async Task OnNotify()
        {
            await InvokeAsync(() =>
            {
                Console.WriteLine("The threshold was reached...2");
                StateHasChanged();
            });
        }

        public void Dispose()
        {
            Notifier.Notify -= OnNotify;
        }




// ----------------------------------
// ----------------------------------
// ----------------------------------
// ----------------------------------




// Unit Tests > Reports.cs

using Abacus_Unit_Tests.TestDataScope;
using AbacusApi.Constants;
using AbacusApi.Features.Payroll;
using AbacusApi.Data.Models;
using AbacusApi.Helpers;
using AbacusApi.Repositories.Search;
using AbacusApi.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic.FileIO;
using System.IO;
using System.Net;
using Microsoft.Azure.Cosmos.Linq;
using System.Linq;
using AbacusApi.Features;
using AbacusApi.Repositories;
using System.ComponentModel.Design;

namespace Abacus_Unit_Tests
{
    [TestClass]
    public class Reports
    {
        public static DataManagementService data;
        public static PayrollOperations ops;
        readonly PayrollRepository payrollRepo;
        public static ReportGenerator rep;
        public static StateContext ctx = new StateContext();


        [ClassInitialize]
        public static async Task Init(TestContext context)
        {
            Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");


            var build = WebHost.CreateDefaultBuilder()
                .UseEnvironment("Development")
                .UseStartup<Startup>().Build();

            ops = build.Services.GetRequiredService<PayrollOperations>();
            data = build.Services.GetRequiredService<DataManagementService>();
            rep = build.Services.GetRequiredService<ReportGenerator>();

            var company = TestData.CompanyTestData;
            ctx.CompanyCode = company.Code;
            ctx.Company = company;
            ctx.User = TestData.User;

            await data.CreateCompany(ctx, ctx.Company);
            await ShouldUploadEmployees(ctx);

        }

        #region CompanyTests

        public static async Task ShouldUploadEmployees(StateContext ctx)
        {
            List<List<string>> data = new();
            using (var client = new HttpClient())
            {
                var stream = await client.GetStreamAsync("https://storageaccountvisua8d03.blob.core.windows.net/products/EmployeeSheet.csv");

                TextFieldParser parser = new TextFieldParser(stream);

                var index = 0;

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {
                    List<string> d = new List<string>();
                    var fields = parser.ReadFields();


                    foreach (var field in fields)
                    {

                        d.Add(field);
                    }

                    if (index > 0)
                    {
                        data.Add(d);
                    }

                    index++;
                }

            }
            var svc = await DataManagementService.Load;
            var (employees, errors) = await svc.UploadEmployees(ctx, data);
            Assert.AreEqual(43, employees.Count());
            Assert.AreEqual(errors.Count(), 0);


        }

        #endregion


        #region ReportTests

        [TestMethod]
        public async Task ShouldGeneratePayrollSummary()
        {
            string type = "fortnightly";

            NewPayrollForm form = new NewPayrollForm();
            var company = await data.GetCompany(ctx?.CompanyCode);
            form.CompanyId = company.id;
            form.Period = 1;
            form.StartDate = new DateTime(2022, 01, 17);
            form.EndDate = new DateTime(2022, 01, 28);
            form.Type = PayrollTypes.fortnightly;
            ops.ctx = ctx;

            var payroll = await ops.CreatePayroll(form);
            var payrolls = await payrollRepo.GetAllCurrentPayrollsByCompanyId(company.id, type);
            var result = await rep.GeneratePayrollSummary(format.PDF, type);

            Assert.IsNotNull(result);
            Assert.IsTrue(result.Earnings.Count > 0);
            Assert.IsTrue(result.Statutories.Count > 0);
            Assert.IsTrue(result.NonStatutories.Count > 0);
            Assert.IsTrue(result.Totals.Count > 0);
            Assert.IsTrue(result.TotalEmployees > 0);

        }


        #endregion

    }
}


// Unit Tests > Startup.cs

using AbacusApi.Features;
using AbacusApi.Features.Payroll;
using AbacusApi.Repositories;
using AbacusApi.Repositories.Search;
using AbacusApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abacus_Unit_Tests
{
    public class Startup
    {

        public void ConfigureServices(IServiceCollection sc)
        {
            sc.AddSingleton<StateContext>();
            sc.AddSingleton<PayrollOperations>();
            sc.AddSingleton<DataManagementService>();
            sc.AddSingleton<CompanyRepository>();
            sc.AddSingleton<CompanySearchRepository>();
            sc.AddSingleton<EmployeeSearchRepository>();
            sc.AddSingleton<EmployeeRepository>();
            sc.AddSingleton<UploadRepository>();

            sc.AddSingleton<PayrollRepository>();
            sc.AddSingleton<LogRepository>();
            sc.AddSingleton<TaxHeaderRepository>();

            sc.AddSingleton<ReportGenerator>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

        }

    }
}







// ReportsController.cs

/// <summary>
///
/// </summary>
/// <param name="type"></param>
/// <returns></returns>
[Route("v1/api/CreatePayrollSummary/{type}")]
[HttpGet]
public async Task<IActionResult> CreatePayrollSummary(string type)
{

    var payrollSummary = await svc.GeneratePayrollSummary(format.PDF, type);
    return Ok(payrollSummary);
}


// PayrollSummaryResults.cs

using System;
namespace AbacusApi.Features
{
    public record PayrollSummaryResults(

        List<Summary> Earnings,
        List<Summary> Statutories,
        List<Summary> NonStatutories,
        List<Summary> Totals,
        (decimal, decimal) Threshold,
        int TotalEmployees
    );

    public record Summary(

        string Description,
        Detail Units,
        Detail Employee,
        Detail Employer
    );
    public record Detail(

        decimal Previous,
        decimal Current,
        decimal MTD,
        decimal YTD
    );
}


// ReportBuilder.cs

using AbacusApi.Features.Report.Services;
using AbacusApi.Repositories;
using AbacusApi.Services;

namespace AbacusApi.Features.Report.Providers
{

    public enum Reports
    {
        Payslip,
        AllPayslips,
        EmployeeRegister,
        PayrollRegister
    }

    public class ReportBuilder
    {
        readonly PayrollRepository payrollRep;
        readonly public StateContext ctx;

        public ReportBuilder(PayrollRepository payrollRep, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.ctx = ctx;
        }

        public async Task<IReport<TResult>> CreateReportProvider<TResult>(Reports type)
        {

            switch (type)
            {
                case Reports.Payslip:
                    return new PayslipService<TResult>(payrollRep);

                case Reports.AllPayslips:
                    return new PayslipService<TResult>(payrollRep);

                case Reports.PayrollRegister:
                    return new PayrollSummaryService<TResult>(payrollRep,ctx);

                default:
                    throw new InvalidOperationException();
            }
        }

    }
}


// ReportGenerator.cs

using AbacusApi.Features.Report;
using AbacusApi.Features.Report.Providers;
using AbacusApi.Repositories;
using AbacusApi.Services;

namespace AbacusApi.Features
{
    public enum format { PDF, PDFPreview, CSV }
    public class ReportGenerator
    {
        ReportBuilder builder;
        public ReportGenerator(PayrollRepository payrollRep, StateContext ctx)
        {
            builder = new ReportBuilder(payrollRep,ctx);
        }

        public async Task<PayslipResults> GeneratePayslip(format format, string employeeId, string payrollId)
        {
            IReport<PayslipResults> provider = await builder.CreateReportProvider<PayslipResults>(Reports.Payslip);
            switch (format)
            {
                case format.PDF:
                    var data = new Dictionary<string, string>
                    {
                        { "employeeId", employeeId },
                        { "payrollId", payrollId }
                    };
                    return await provider.GeneratePDF(data);
                case format.PDFPreview:
                    return await provider.GeneratePDFPreview();
                case format.CSV:
                    return await provider.GenerateCSV();
                default:
                    throw new InvalidOperationException();
            }
        }

        public async Task<PayrollSummaryResults> GeneratePayrollSummary(format format, string type)
        {
            IReport<PayrollSummaryResults> provider = await builder.CreateReportProvider<PayrollSummaryResults>(Reports.PayrollRegister);
            switch (format)
            {
                case format.PDF:
                    var data = new Dictionary<string, string>
                    {
                        { "type", type }
                    };
                    return await provider.GeneratePDF(data);
                case format.PDFPreview:
                    return await provider.GeneratePDFPreview();
                case format.CSV:
                    return await provider.GenerateCSV();
                default:
                    throw new InvalidOperationException();
            }
        }


    }
}


// PayrollSummaryService.cs

using System.Data;
using AbacusApi.Data.Models;
using AbacusApi.Helpers;
using AbacusApi.Repositories;
using AbacusApi.Services;

namespace AbacusApi.Features.Report.Services
{
    public class PayrollSummaryService<T> : IReport<T>
    {
        readonly public StateContext ctx;
        readonly PayrollRepository payrollRep;
        private Payrolls payroll { get; set; } = new Payrolls();

        public PayrollSummaryService(PayrollRepository payrollRep, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.ctx = ctx;
        }

        public Task<T> GenerateCSV()
        {
            return default;
        }

        public async Task<T> GeneratePDF(Dictionary<string, string> param)
        {

            var payrolls = await payrollRep.GetAllCurrentPayrollsByCompanyId(ctx.Company.id, param["type"]);
            Contracts.Requires(payrolls != null, "Payroll does not exist");


            List<Transaction> YtdTransactions = new();
            List<Statutory> YtdStatutories = new();
            List<NonStatutory> nonStatutories = new();

            var currentPayroll = payrolls.FirstOrDefault(x => x.PayCycle.Period == payrolls.Max(x => x.PayCycle.Period), new Payrolls());
            var previousPayroll = payrolls.FirstOrDefault(x => x.PayCycle.Period == payrolls.Max(x => x.PayCycle.Period) - 1, new Payrolls());
            var employeeData = payrolls.SelectMany(x => x.EmployeeData);


            foreach (var data in employeeData)
            {
                YtdTransactions.AddRange(data.Transactions);
                YtdStatutories.AddRange(data.Cache.Statutory);
                nonStatutories.AddRange(data.Cache.NonStatutory);
            }

            var groupedTrans = YtdTransactions.GroupBy(x => x.Code.Description)
                    .Select(x => x.ToList()).ToList();

            var groupedStat = YtdStatutories.GroupBy(x => x.Tax)
                .Select(x => x.ToList()).ToList();

            var groupedNonStat = nonStatutories.GroupBy(x => x.Description)
                .Select(x => x.ToList()).ToList();



            var gross = previousPayroll.EmployeeData.Sum(x => x.YTDCache.Gross);
            var taxableGross = previousPayroll.EmployeeData.Sum(x => x.YTDCache.TaxableGross);
            var net = previousPayroll.EmployeeData.Sum(x => x.YTDCache.Net);

            List<Summary> totals = new List<Summary>();
            totals.Add(new Summary(
                "Gross",
                new Detail(0, 0, 0, 0),
                new Detail(gross, currentPayroll.EmployeeData.Sum(x => x.Cache.Gross), 0, employeeData.Sum(x => x.Cache.Gross)),
                new Detail(0, 0, 0, 0)
            ));
            totals.Add(new Summary(
                "Taxable Gross",
                new Detail(0, 0, 0, 0),
                new Detail(taxableGross, currentPayroll.EmployeeData.Sum(x => x.Cache.TaxableGross), 0, employeeData.Sum(x => x.Cache.TaxableGross)),
                new Detail(0, 0, 0, 0)
            ));
            totals.Add(new Summary(
                "Net",
                new Detail(0, 0, 0, 0),
                new Detail(net, currentPayroll.EmployeeData.Sum(x => x.Cache.Net), 0, employeeData.Sum(x => x.Cache.Net)),
                new Detail(0, 0, 0, 0)
            ));

            var res = new PayrollSummaryResults(
                SetEarnings(groupedTrans, currentPayroll),
                SetStatutories(groupedStat, currentPayroll, previousPayroll),
                SetNonStatutories(groupedNonStat, currentPayroll, previousPayroll),
                totals,
                (0, 0),
                currentPayroll.EmployeeData.Count()
            );


            return (T)(object)res;

            throw new ArgumentNullException(nameof(currentPayroll));
        }

        public Task<T> GeneratePDFPreview()
        {
            return default;
        }

        List<Summary> SetEarnings(List<List<Transaction>> data, Payrolls currentProll)
        {

            return data
                .Select(y => new Summary(
                    y[0].Code.Description,
                    new Detail(0, currentProll.EmployeeData.SelectMany(x => x.Cache.Transactions).Where(x => x.Code.Description == y[0].Code.Description).Sum(x => x.Hours), 0, y.Sum(x => x.Hours)),
                    new Detail(0, currentProll.EmployeeData.SelectMany(x => x.Cache.Transactions).Where(x => x.Code.Description == y[0].Code.Description).Sum(x => x.Amount), 0, y.Sum(x => x.Amount)),
                    new Detail(0, 0, 0, 0)
                )).ToList();
        }

        List<Summary> SetStatutories(List<List<Statutory>> data, Payrolls currentProll, Payrolls previousProll)
        {

            return data
                .Select(y => new Summary(
                    y[0].Tax,
                    new Detail(0, 0, 0, 0),
                    new Detail(previousProll.EmployeeData.SelectMany(x => x.YTDCache.Statutory).Where(x => x.Tax == y[0].Tax).Sum(x => x.EmployeeAmount), currentProll.EmployeeData.SelectMany(x => x.Cache.Statutory).Where(x => x.Tax == y[0].Tax).Sum(x => x.EmployeeAmount), 0, y.Sum(x => x.EmployeeAmount)),
                    new Detail(previousProll.EmployeeData.SelectMany(x => x.YTDCache.Statutory).Where(x => x.Tax == y[0].Tax).Sum(x => x.EmployerAmount), currentProll.EmployeeData.SelectMany(x => x.Cache.Statutory).Where(x => x.Tax == y[0].Tax).Sum(x => x.EmployerAmount), 0, y.Sum(x => x.EmployerAmount))
                )).ToList();
        }

        List<Summary> SetNonStatutories(List<List<NonStatutory>> data, Payrolls currentProll, Payrolls previousProll)
        {

            return data
                .Select(y => new Summary(
                    y[0].Description,
                    new Detail(0, 0, 0, 0),
                    new Detail(previousProll.EmployeeData.SelectMany(x => x.YTDCache.NonStatutory).Where(x => x.Description == y[0].Description).Sum(x => x.EmployeeAmount), currentProll.EmployeeData.SelectMany(x => x.Cache.NonStatutory).Where(x => x.Description == y[0].Description).Sum(x => x.EmployeeAmount), 0, y.Sum(x => x.EmployeeAmount)),
                    new Detail(previousProll.EmployeeData.SelectMany(x => x.YTDCache.NonStatutory).Where(x => x.Description == y[0].Description).Sum(x => x.EmployerAmount), currentProll.EmployeeData.SelectMany(x => x.Cache.NonStatutory).Where(x => x.Description == y[0].Description).Sum(x => x.EmployerAmount), 0, y.Sum(x => x.EmployerAmount))
                )).ToList();
        }

    }
}


// Contracts.cs


public static void Requires(bool check, string message)
{
    if (!check)
        ThrowException(message);
}



using Abacus_Unit_Tests.TestDataScope;
using AbacusApi.Constants;
using AbacusApi.Features.Payroll;
using AbacusApi.Data.Models;
using AbacusApi.Helpers;
using AbacusApi.Repositories.Search;
using AbacusApi.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic.FileIO;
using System.IO;
using System.Net;
using Microsoft.Azure.Cosmos.Linq;
using System.Linq;
using AbacusApi.Features;
using AbacusApi.Repositories;
using System.ComponentModel.Design;

namespace Abacus_Unit_Tests
{
    [TestClass]
    public class Reports
    {
        public static DataManagementService data;
        public static PayrollOperations ops;
        readonly PayrollRepository payrollRepo;
        public static ReportGenerator rep;
        public static StateContext ctx = new StateContext();


        [ClassInitialize]
        public static async Task Init(TestContext context)
        {
            Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");


            var build = WebHost.CreateDefaultBuilder()
                .UseEnvironment("Development")
                .UseStartup<Startup>().Build();

            ops = build.Services.GetRequiredService<PayrollOperations>();
            data = build.Services.GetRequiredService<DataManagementService>();
            rep = build.Services.GetRequiredService<ReportGenerator>();

            var company = TestData.CompanyTestData;
            ctx.CompanyCode = company.Code;
            ctx.Company = company;
            ctx.User = TestData.User;

            await data.CreateCompany(ctx, ctx.Company);
            await ShouldUploadEmployees(ctx);

        }

        #region CompanyTests

        public static async Task ShouldUploadEmployees(StateContext ctx)
        {
            List<List<string>> data = new();
            using (var client = new HttpClient())
            {
                var stream = await client.GetStreamAsync("https://storageaccountvisua8d03.blob.core.windows.net/products/EmployeeSheet.csv");

                TextFieldParser parser = new TextFieldParser(stream);

                var index = 0;

                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");

                while (!parser.EndOfData)
                {
                    List<string> d = new List<string>();
                    var fields = parser.ReadFields();


                    foreach (var field in fields)
                    {

                        d.Add(field);
                    }

                    if (index > 0)
                    {
                        data.Add(d);
                    }

                    index++;
                }

            }
            var svc = await DataManagementService.Load;
            var (employees, errors) = await svc.UploadEmployees(ctx, data);
            Assert.AreEqual(43, employees.Count());
            Assert.AreEqual(errors.Count(), 0);


        }


        [TestMethod]
        public async Task ShouldGeneratePayrollSummary()
        {
            string type = "fortnightly";

            NewPayrollForm form = new NewPayrollForm();
            var company = await data.GetCompany(ctx?.CompanyCode);
            form.CompanyId = company.id;
            form.Period = 1;
            form.StartDate = new DateTime(2022, 01, 17);
            form.EndDate = new DateTime(2022, 01, 28);
            form.Type = PayrollTypes.fortnightly;
            ops.ctx = ctx;

            var payroll = await ops.CreatePayroll(form);
            var payrolls = await payrollRepo.GetAllCurrentPayrollsByCompanyId(company.id, type);
            var result = await rep.GeneratePayrollSummary(format.PDF, type);

            Assert.IsNotNull(result);
            Assert.IsTrue(result.Earnings.Count > 0);
            Assert.IsTrue(result.Statutories.Count > 0);
            Assert.IsTrue(result.NonStatutories.Count > 0);
            Assert.IsTrue(result.Totals.Count > 0);
            Assert.IsTrue(result.TotalEmployees > 0);

        }

    }
}



//[TestMethod]
        //public async Task ShouldGenerateDeductionListing()
        //{

        //    var payrolls = await payrollRepo.GetAllCurrentPayrollsByCompanyId(ctx.Company.id, PayrollTypes.fortnightly);
        //    var currentPayroll = payrolls.FirstOrDefault(x => x.PayCycle.Period == payrolls.Max(x => x.PayCycle.Period));

        //    var result = await rep.GenerateDeductionListing(format.PDF, currentPayroll.id);

        //    Assert.IsNotNull(result);

        //}



        public static async Task ShouldCalculatePayroll(Payrolls payroll)
                {

                    foreach (EmployeeData emp in payroll.EmployeeData)
                    {
                        await emp.CalculateEmployeePay(emp, payroll.TaxHeaders, payroll);
                        emp.CalculateTransactionAmounts();
                    }

                    foreach (EmployeeData emp in payroll.EmployeeData)
                    {
                        Assert.IsTrue(emp.Cache.Transactions.Count > 0);
                        Assert.IsTrue(emp.YTDCache.Transactions.Count > 0);
                    }

                    //Parallel.ForEach(payroll.EmployeeData, async (emp) =>
                    //{
                    //    await emp.CalculateEmployeePay(emp, payroll.TaxHeaders, payroll);
                    //    emp.CalculateTransactionAmounts();
                    //});

                    //Parallel.ForEach(payroll.EmployeeData.Take(10), data =>
                    //{
                    //    Assert.IsTrue(data.Cache.Transactions.Count > 0);
                    //    Assert.IsTrue(data.YTDCache.Transactions.Count > 0);
                    //});
                }









// reportsController.cs

// /// <summary>
// /// Report
// /// </summary>
// /// <param name="payrollId"></param>
// /// <returns></returns>
// [Route("v1/api/CreateDeductionListing/{payrollId}")]
// [HttpGet]
// public async Task<IActionResult> CreateDeductionListing(string payrollId)
// {
//     var deductionListing = await svc.GenerateDeductionListing(format.PDF, payrollId);
//     return Ok(deductionListing);
// }



// ReportBuilder.cs

// case Reports.DeductionListing:
// return new DeductionListingService<TResult>(payrollRep, ctx);



// ReportGenereator.cs


// public async Task<DeductionListingResults> GenerateDeductionListing(format format, string payrollId)
// {
//     IReport<DeductionListingResults> provider = await builder.CreateReportProvider<DeductionListingResults>(Reports.DeductionListing);
//     switch (format)
//     {
//         case format.PDF:
//             var data = new Dictionary<string, string>
//             {{ "payrollId", payrollId }};
//             return await provider.GeneratePDF(data);
//         case format.PDFPreview:
//             return await provider.GeneratePDFPreview();
//         case format.CSV:
//             return await provider.GenerateCSV();
//         default:
//             throw new InvalidOperationException();
//     }
// }



// DeductionListing Results

using System;
using System.Collections.Generic;
using AbacusApi.Data.Models;

namespace AbacusApi.Features
{
    public record DeductionListingResults(
        string CompanyName,
        DateTime endDate,
        string printedBy,
        string reportNumber,
        List<Deduction> Report
    );

    public record Deduction(
        string Abbreviation,
        string Description,
        string Policy,
        List<DeductionListing> Listings,
        DeductionFooter footer);

    public record DeductionFooter(
        int employeeCount,
        decimal totalEmployeeAmount,
        decimal totalEmployerAmount,
        decimal totalDeductions
        );

    public record DeductionListing(
        string DepartmentCode,
        string EmployeeId,
        string EmployeeName,
        decimal EmployeeAmount,
        decimal EmployerAmount,
        decimal TotalAmount);


}



// Deduction Lsiting Service


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

namespace AbacusApi.Features.Report.Services
{
    public class DeductionListingService<T> : IReport<T>
    {
        readonly public StateContext ctx;
        readonly PayrollRepository payrollRep;

        List<Deduction> deductions = new List<Deduction>();

        public DeductionListingService(PayrollRepository payrollRep, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.ctx = ctx;
        }

        public Task<T> GenerateCSV()
        {
            return default;
        }

        public async Task<T> GeneratePDF(Dictionary<string, string> param)
        {

            var payroll = await payrollRep.GetPayrollById(param["payrollID"]);
            Contracts.Requires(payroll != null, "Payroll does not exist");
            Contracts.Requires(payroll.EmployeeData.Count > 0, "Cannot generate listing on empty payroll.");

            await payroll.EmployeeData.Select(x => Deductions(x, payroll.Company)).Parallel();

            var res = new DeductionListingResults(
                payroll.Company.CompanyName,
                payroll.PayCycle.EndDate,
                $"{ctx.User.FirstName} {ctx.User.LastName}",
                "54245",
                deductions
            );


            return (T)(object)res;

            throw new ArgumentNullException(nameof(payroll));
        }

        public Task<T> GeneratePDFPreview()
        {
            return default;
        }



        async Task Deductions(EmployeeData data, Company company)
        {
            var stats = data.Cache.Statutory;
            foreach (var stat in stats)
            {
                var i = deductions.FindIndex(x => x.Description == stat.Tax);
                if (i == -1)
                {

                    deductions.Add(new Deduction(
                        stat.Tax,
                        stat.Tax,
                        string.Empty,
                        new List<DeductionListing>() { DeductionListings(data.Employee, stat.EmployeeAmount, stat.EmployerAmount) },
                        new DeductionFooter(1, 1, 0, 0)));
                }
                else
                {
                    deductions[i].Listings.Add(DeductionListings(data.Employee, stat.EmployeeAmount, stat.EmployerAmount));

                    deductions[i] = deductions[i] with { footer = new DeductionFooter(
                        deductions[i].Listings.Count,
                        deductions[i].Listings.Sum(x => x.EmployeeAmount),
                        deductions[i].Listings.Sum(x => x.EmployerAmount),
                        deductions[i].Listings.Sum(x => x.TotalAmount)
                        ) };
                }
            }

            var nonstats = data.Cache.NonStatutory;
            foreach (var nonstat in nonstats)
            {
                var i = deductions.FindIndex(x => x.Description == nonstat.Description);
                if (i == -1)
                {

                    var abbr = "";

                    if (ctx.Company.TryGetDeductionCode(nonstat.Code, out DeductionCode deductionCode))
                    {
                        abbr = deductionCode.Abbreviation;
                    }

                    if (ctx.Company.TryGetLoanCode(nonstat.Code, out LoanCode loanCode))
                    {
                        abbr = loanCode.Abbreviation;
                    }

                    deductions.Add(new Deduction(
                        abbr,
                        nonstat.Description,
                        nonstat.Policy,
                        new List<DeductionListing>() { DeductionListings(data.Employee, nonstat.EmployeeAmount, nonstat.EmployerAmount) },
                        new DeductionFooter(1, 1, 0, 0)));
                }
                else
                {
                    deductions[i].Listings.Add(DeductionListings(data.Employee, nonstat.EmployeeAmount, nonstat.EmployerAmount));

                    deductions[i] = deductions[i] with
                    {
                        footer = new DeductionFooter(
                        deductions[i].Listings.Count,
                        deductions[i].Listings.Sum(x => x.EmployeeAmount),
                        deductions[i].Listings.Sum(x => x.EmployerAmount),
                        deductions[i].Listings.Sum(x => x.TotalAmount)
                        )
                    };
                }
            }

            await Task.CompletedTask;

        }

        DeductionListing DeductionListings(Employee employee, decimal employeeAmount, decimal employerAmount)
            => new DeductionListing(
                employee.Employment.Department.Code,
                employee.EmployeeId,
                employee.Name(),
                employeeAmount,
                employerAmount,
                employeeAmount + employerAmount);



    }
}




// unit test > reports.cs


public static async Task ShouldCalculatePayroll(Payrolls payroll)
  {

      foreach (EmployeeData emp in payroll.EmployeeData)
      {
          await emp.CalculateEmployeePay(emp, payroll.TaxHeaders, payroll);
          emp.CalculateTransactionAmounts();
          //emp.YTDCache = await emp.GetLastYTDCache(emp.Employee.id, payroll.PayCycle.Period, ctx.Company.id);
      }

      foreach (EmployeeData emp in payroll.EmployeeData)
      {
          Assert.IsTrue(emp.Cache.Transactions.Count > 0);
          Assert.IsTrue(emp.YTDCache.Transactions.Count > 0);
      }

  }




        #endregion


        #region ReportTests

        [TestMethod]
        public async Task ShouldGeneratePayrollRegister()
        {
            string type = "fortnightly";

            var result = await rep.GeneratePayrollRegister(format.PDF, "1", type);

            Assert.IsNotNull(result);
            //Assert.IsTrue(result.Earning.Count > 0);
            //Assert.IsTrue(result.Deduction.Count > 0);
            //Assert.IsTrue(result.Totals.Count > 0);
            //Assert.IsTrue(result.Info.TotalEmployees > 0);

        }


        [TestMethod]
        public async Task ShouldGenerateDeductionListing()
        {

            var payrolls = await payrollRepo.GetAllCurrentPayrollsByCompanyId(ctx.Company.id, PayrollTypes.fortnightly);
            var currentPayroll = payrolls.FirstOrDefault(x => x.PayCycle.Period == payrolls.Max(x => x.PayCycle.Period));

            var result = await rep.GenerateDeductionListing(format.PDF, currentPayroll.id);

            Assert.IsNotNull(result);

        }


// --------------------------------------------
// --------------------------------------------
// --------------------------------------------



// ReportsController.cs
using System.Linq;
using AbacusApi.Data.Models;
using AbacusApi.Features;


[Route("v1/api/reports/CreatePayslip/{employeeId}/{payrollId}/{type}")]

[Route("v1/api/reports/CreatePayrollRegister/{period}/{type}")]

try
{
    var payrollRegister = await svc.GeneratePayrollRegister(format.PDF, period, type);
    return Ok(payrollRegister);
}
catch (ApplicationException ex)
{
    return BadRequest(ex.Message);
}




/// <summary>
/// Report
/// </summary>
/// <param name="payrollId"></param>
/// <returns></returns>
[Route("v1/api/reports/EmployeeRegister/{payrollId}")]


[Route("v1/api/reports/CreateDeductionListing/{payrollId}")]



try
{
    var deductionListing = await svc.GenerateDeductionListing(format.PDF, payrollId);
    return Ok(deductionListing);
}
catch (ApplicationException ex)
{
    return BadRequest(ex.Message);
}



/// <summary>
/// Report
/// </summary>
/// <param name="payrollId"></param>
/// <returns></returns>
[Route("v1/api/reports/EmployeeRegister/{payrollId}")]
[HttpGet]
public async Task<IActionResult> EmployeeRegister(string payrollId)
{
  var report = await svc.GenerateEmployeeRegister(format.PDF,payrollId);
  return Ok(report);
}




/// <summary>
/// Report
/// </summary>
/// <param name="payrollIds"></param>
/// <returns></returns>
[Route("v1/api/reports/CreateAuditReportByDepartment")]
[HttpPut]
public async Task<IActionResult> CreateAuditReportByDepartment(List<string> payrollIds, List<Filter> filters)
{

    try
    {
        string ids = string.Join(",", payrollIds);
        string depts = "";
        if (filters[0].FieldChildren.Count > 0)
        {
            depts = string.Join(",", filters[0].FieldChildren);
        }
        var auditReportByDepartment = await svc.GenerateAuditReportByDepartment(format.PDF, ids, depts, filters);
        return Ok(auditReportByDepartment);
    }
    catch (ApplicationException ex)
    {
        return BadRequest(ex.Message);
    }
}

}



// AuditReportResults.cs


using System;
using System.Collections.Generic;
using AbacusApi.Data.Models;


namespace AbacusApi.Features
{

public record AuditReportResults(
    string CompanyName,
    string printedBy,
    string ReportNumber,
    AuditReport Report);

public record AuditReport(
    string AuditCompany,
    List<Audit> Audits,
    List<AuditDetail> Totals);

public record Audit(
    string PayrollDate,
    string Quarter,
    string Month,
    string EmployeeName,
    string EmployeeNo,
    string DepartmentName,
    string DepartmentNo,
    int PayCycles,
    decimal TotaGross,
    decimal TotaTaxableGross,
    List<AuditDetail> Employee,
    List<AuditDetail> Employer);

public record AuditDetail(
    string Description,
    decimal Amount);


}


// PayrollSummaryResults.cs

string CompanyName,
        int Cycle,
        string Type,
        string ReportNumber,
        DateTime endDate,
        decimal Threshold,
        int TotalEmployees);



// ReportBuilder.cs

DeductionListing,
AuditReportByDepartment,
AuditReportByEmployee,
AuditReportByMonth,
AuditReportByQuarter



case Reports.AuditReportByDepartment:
  return new AuditReportByDepartmentService<TResult>(payrollRep, ctx);



// ReportGenerator.cs

ReportBuilder builder;
StateContext ctx;



public ReportGenerator(PayrollRepository payrollRep, StateContext ctx)
  {
      builder = new ReportBuilder(payrollRep, ctx);
      this.ctx = ctx;
  }


  public async Task<AuditReportResults> GenerateAuditReportByDepartment(format format, string payrollIds, string departments, List<Filter> filters)
          {
              IReport<AuditReportResults> provider = await builder.CreateReportProvider<AuditReportResults>(Reports.AuditReportByDepartment);
              switch (format)
              {
                  case format.PDF:
                      ctx.Filters = filters;
                      var data = new Dictionary<string, string>
                      {
                          { "payrollIds", payrollIds },
                          { "departments", departments }
                      };
                      return await provider.GeneratePDF(data);
                  case format.PDFPreview:
                      return await provider.GeneratePDFPreview();





// AuditReportByDepartment.cs


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

namespace AbacusApi.Features.Report.Services
{
    public class AuditReportByDepartmentService<T> : IReport<T>
    {
        readonly public StateContext ctx;
        readonly PayrollRepository payrollRep;

        List<Deduction> deductions = new List<Deduction>();
        //AuditReport report = new AuditReport();
        IEnumerable<Payrolls> payrolls = new List<Payrolls>();
        List<Payrolls> filtered_payrolls = new List<Payrolls>();

        public AuditReportByDepartmentService(PayrollRepository payrollRep, StateContext ctx)
        {
            this.payrollRep = payrollRep;
            this.ctx = ctx;
        }

        public Task<T> GenerateCSV()
        {
            return default;
        }

        public async Task<T> GeneratePDF(Dictionary<string, string> param)
        {

            AuditReport report = new AuditReport();
            string[] payrollIds = param["payrollIds"].Split(',');
            string[] departments = param["departments"].Split(',');


            Filter filter = new Filter();
            if (ctx.Filters[1].Field != "")
            {
                filter = ctx.Filters[1];
            }
            else
            {
                filter = ctx.Filters[0];
            }

            if (payrollIds != null)
            {
                foreach (var payrollId in payrollIds)
                {
                    var payroll = await payrollRep.GetPayrollById(payrollId);
                    payrolls.ToList().Add(payroll);
                }
            }
            else
            {
                payrolls = await payrollRep.GetAllPayrollsByCompanyId(ctx.Company.id, false, 0);
            }

            if (filter.Field.ToLower() == "month")
            {
                foreach (var payroll in payrolls)
                {
                    if (filter.FieldChildren.Contains(payroll.GetPayrollMonth()))
                    {
                        filtered_payrolls.Add(payroll);
                    }
                }
            }
            else
            {

                if (filter.Field.ToLower() == "quarter")
                {

                    foreach (var payroll in payrolls)
                    {
                        if (filter.FieldChildren.Contains(payroll.GetPayrollQuarter()))
                        {
                            filtered_payrolls.Add(payroll);
                        }
                    }
                }

            }


            report.Totals.Add(new AuditDetail("StatutorySummary", 0));
            report.Totals.Add(new AuditDetail("NonStatutorySummary", 0));
            report.Totals.Add(new AuditDetail("TotalTaxes", 0));
            report.Totals.Add(new AuditDetail("Pension", 0));
            report.Totals.Add(new AuditDetail("EmployeeTotal", 0));

            if (filtered_payrolls.Count > 0)
                payrolls = filtered_payrolls;


            //var payroll = new Payrolls();
            //var payroll = await payrollRep.GetPayrollById();
            //Contracts.Requires(payroll != null, "Payroll does not exist");
            //Contracts.Requires(payroll.EmployeeData.Count > 0, "Cannot generate listing on empty payroll.");

            //await payroll.EmployeeData.Select(x => Deductions(x, payroll.Company)).Parallel();

            var res = new AuditReportResults(
                ctx.Company.CompanyName,
                $"{ctx.User.FirstName} {ctx.User.LastName}",
                ReportNums.AuditReportbyDept,
                new AuditReport(
                    ctx.Company.CompanyName,
                    new List<Audit>
                    {
                        new Audit(
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            "",
                            0,
                            0,
                            0,
                            new List<AuditDetail>
                            {
                                new AuditDetail("",0)
                            },
                            new List<AuditDetail>
                            {
                                new AuditDetail("",0)
                            }
                        )
                    },
                    new List<AuditDetail>
                    {
                        new AuditDetail("",0)
                    }
                    )
            );


            return (T)(object)res;

            throw new ArgumentNullException(nameof(payroll));
        }

        public Task<T> GeneratePDFPreview()
        {
            return default;
        }



        async Task Deductions(EmployeeData data, Company company)
        {
            var stats = data.Cache.Statutory;
            foreach (var stat in stats)
            {
                var i = deductions.FindIndex(x => x.Description == stat.Tax);
                if (i == -1)
                {

                    deductions.Add(new Deduction(
                        stat.Tax,
                        stat.Tax,
                        string.Empty,
                        new List<DeductionListing>() { DeductionListings(data.Employee, stat.EmployeeAmount, stat.EmployerAmount) },
                        new DeductionFooter(1, 1, 0, 0)));
                }
                else
                {
                    deductions[i].Listings.Add(DeductionListings(data.Employee, stat.EmployeeAmount, stat.EmployerAmount));

                    deductions[i] = deductions[i] with
                    {
                        footer = new DeductionFooter(
                        deductions[i].Listings.Count,
                        deductions[i].Listings.Sum(x => x.EmployeeAmount),
                        deductions[i].Listings.Sum(x => x.EmployerAmount),
                        deductions[i].Listings.Sum(x => x.TotalAmount)
                        )
                    };
                }
            }

            var nonstats = data.Cache.NonStatutory;
            foreach (var nonstat in nonstats)
            {
                var i = deductions.FindIndex(x => x.Description == nonstat.Description);
                if (i == -1)
                {

                    var abbr = "";

                    if (ctx.Company.TryGetDeductionCode(nonstat.Code, out DeductionCode deductionCode))
                    {
                        abbr = deductionCode.Abbreviation;
                    }

                    if (ctx.Company.TryGetLoanCode(nonstat.Code, out LoanCode loanCode))
                    {
                        abbr = loanCode.Abbreviation;
                    }

                    deductions.Add(new Deduction(
                        abbr,
                        nonstat.Description,
                        nonstat.Policy,
                        new List<DeductionListing>() { DeductionListings(data.Employee, nonstat.EmployeeAmount, nonstat.EmployerAmount) },
                        new DeductionFooter(1, 1, 0, 0)));
                }
                else
                {
                    deductions[i].Listings.Add(DeductionListings(data.Employee, nonstat.EmployeeAmount, nonstat.EmployerAmount));

                    deductions[i] = deductions[i] with
                    {
                        footer = new DeductionFooter(
                        deductions[i].Listings.Count,
                        deductions[i].Listings.Sum(x => x.EmployeeAmount),
                        deductions[i].Listings.Sum(x => x.EmployerAmount),
                        deductions[i].Listings.Sum(x => x.TotalAmount)
                        )
                    };
                }
            }

            await Task.CompletedTask;

        }

        DeductionListing DeductionListings(Employee employee, decimal employeeAmount, decimal employerAmount)
            => new DeductionListing(
                employee.Employment.Department.Code,
                employee.EmployeeId,
                employee.Name(),
                employeeAmount,
                employerAmount,
                employeeAmount + employerAmount);



    }
}



// DeductionListingService.cs

using AbacusApi.Constants;



payroll.Company.CompanyName,
payroll.PayCycle.EndDate,
$"{ctx.User.FirstName} {ctx.User.LastName}",
"54245",
ReportNums.DeductionList,
deductions



// PayrollRegisterService.cs


using AbacusApi.Constants;


ReportNums.PayrollRegister,



string path = Environment.CurrentDirectory;
                path = path.Substring(0, Environment.CurrentDirectory.Length - 17);
                var stream = File.OpenRead(Path.Combine(path, @"AppData/csv/Timesheet1.csv"));





// --------------------------------------------_
// --------------------------------------------_
// --------------------------------------------_




// Cache.cs

using PayrollSystem.Data.Enums;
using PayrollSystem.Helpers;

namespace PayrollSystem.Data.Models
{
    public class Cache
    {
        public Cache(){}

        public Cache(bool firstCalc)
        {
            IsFirstCalc = firstCalc;
        }

        public List<Transaction> Transactions = new List<Transaction>();

        public List<Statutory> Statutory { get; set; } = new List<Statutory>();

        public Statutory GetTax(string tax) => Statutory.FirstOrDefault(x => x.Tax == tax, new Statutory());

        public void CalculateNis(TaxHeader? nisData)
        {
            Contracts.Requires(nisData != null, "Nis Tax header is null, please check taxes and defaults");
            var statutory = new Statutory();
            statutory.Tax = nisData!.TaxCode;

            var employeeNis = nisData.TaxTierEmployee[0];
            var employerNis = nisData.TaxTierEmployer[0];

            decimal activeEmpTreshold = employeeNis.Threshold;
            decimal activeEmpRate =  employeeNis.Rate;

            decimal activeEmlTreshold = employerNis.Threshold;
            decimal activeEmlRate = employerNis.Rate;

            if (employeeNis.EffectiveDate < DateTime.Now)
            {
                activeEmpTreshold = employeeNis.PreThreshold;
                activeEmpRate = employeeNis.PreRate;

                activeEmlTreshold = employerNis.PreThreshold;
                activeEmlRate = employerNis.PreRate;
            }

            statutory.EmployeeRate = activeEmpRate;
            statutory.EmployerRate = activeEmlRate;

            decimal threshold = (activeEmpTreshold * activeEmpRate) / 26;
            decimal g = TaxableGross * activeEmpRate;

            if (g > threshold)
            {
                statutory.EmployeeAmount = threshold;
            }
            else
            {
                statutory.EmployeeAmount = g;
            }

            threshold = (activeEmlTreshold * activeEmlRate) / 26;
            g = TaxableGross * activeEmlRate;


            if (g > threshold)
            {
                statutory.EmployerAmount = threshold;
            }
            else
            {
                statutory.EmployerAmount = g;
            }

            UpdateStatutory(statutory);
        }

        public void CalculatePension(Pension data)
        {
            var pension = data;

            if(pension != null && pension.Code != null && pension.Code.Code != "no data")
            {
                var statutory = new Statutory();
                statutory.Tax = $"{pension.Code.Code} - Pension";

                if (pension.Code.isEmployeePercent())
                {
                    statutory.EmployeeAmount = Gross * pension.Code.GetEmployeePercent();
                }
                else
                {
                    statutory.EmployeeAmount = pension.Code.GetEmployeeAmount();
                }

                UpdateStatutory(statutory);
            }
        }

        public decimal GetPensionEmployeeAmount()
        {
            var p = Statutory.Where(x => x.Tax.Contains("pension")).LastOrDefault();
            if (p == null)
                return 0;
            return p.EmployeeAmount;
        }

        public void CalcuateNht(TaxHeader? data)
        {
            Contracts.Requires(data != null, "Nht Tax header is null, please check taxes and defaults");
            var statutory = new Statutory();
            statutory.Tax = data!.TaxCode;

            statutory.EmployeeAmount = TaxableGross * data.TaxTierEmployee[0].Rate;
            statutory.EmployerAmount = TaxableGross * data.TaxTierEmployer[0].Rate;
            statutory.EmployeeRate = data.TaxTierEmployee[0].Rate;
            statutory.EmployerRate = data.TaxTierEmployer[0].Rate;

            UpdateStatutory(statutory);
        }

        public void CalculateHeart(TaxHeader? data)
        {
            Contracts.Requires(data != null, "Heart Tax header is null, please check taxes and defaults");
            var statutory = new Statutory();
            statutory.Tax = data!.TaxCode;

            statutory.EmployerAmount = TaxableGross * data.TaxTierEmployer[0].Rate;
            statutory.EmployerRate = data.TaxTierEmployer[0].Rate;

            UpdateStatutory(statutory);
        }

        public void CalculateEdTax(PreviousEmployment emp, TaxHeader? data)
        {
            Contracts.Requires(data != null, "Ed Tax header is null, please check taxes and defaults");
            var statutory = new Statutory();
            statutory.Tax = data!.TaxCode;

            statutory.EmployeeAmount = CalculateStatutoryIncome(emp) * data.TaxTierEmployee[0].Rate;
            statutory.EmployerAmount = CalculateStatutoryIncome(emp) * data.TaxTierEmployer[0].Rate;
            statutory.EmployeeRate = data.TaxTierEmployee[0].Rate;
            statutory.EmployerRate = data.TaxTierEmployer[0].Rate;

            UpdateStatutory(statutory);
        }

        public List<NonStatutory> CalculateDeduction(Employee data, Company company)
        {
            List<NonStatutory> deduct = new List<NonStatutory>();


            var code = company.HealthCodes.Find(x => x.Code == data.Health.Code?.Code);

            if (code != null && code.isEnable)
            {

                if (code != null)
                    data.Health.Code = code;

                switch (data.Health.Type)
                {
                    case HealthType.Single:
                        NonStatutory stat = new NonStatutory();
                        stat.Code = data.Health.Code.Code;
                        stat.Description = $"{data.Health.Code.Code} - single";
                        stat.EmployeeAmount = data.Health.Code.EmployeeAmount.GetSingle();
                        stat.EmployerAmount = data.Health.Code.EmployerAmount.GetSingle();
                        deduct.Add(stat);

                        break;
                    case HealthType.Multiple:

                        stat = new NonStatutory();
                        stat.Code = data.Health.Code.Code;
                        stat.Description = $"{data.Health.Code.Code} - multiple";
                        stat.EmployeeAmount = data.Health.Code.EmployeeAmount.GetMultiple();
                        stat.EmployerAmount = data.Health.Code.EmployerAmount.GetMultiple();
                        deduct.Add(stat);

                        break;
                    case HealthType.Family:
                        stat = new NonStatutory();
                        stat.Code = data.Health.Code.Code;
                        stat.Description = $"{data.Health.Code.Code} - family";
                        stat.EmployeeAmount = data.Health.Code.EmployeeAmount.GetFamily();
                        stat.EmployerAmount = data.Health.Code.EmployerAmount.GetFamily();
                        deduct.Add(stat);

                        break;
                    default:
                        break;
                }
            }

            foreach (var deduction in data.Deductions)
            {
                if (deduction.Enabled == false)
                {
                    continue;
                }

                    var i = company.DeductionCodes.FindIndex(x => x.Code == deduction.Code);

                    NonStatutory deducStat = new()
                    {
                        Code = deduction.Code,
                        Description = i > -1 ? company.DeductionCodes[i].Description : deduction.Code,
                        Policy = deduction.Policy,
                        EmployeeAmount = deduction.GetDeductionAmount(),
                        BeforeTax = deduction.BeforeTax
                    };


                deduct.Add(deducStat);
            }

            foreach (var loan in data.Loans)
            {
                if(loan.Suspended)
                {
                    continue;
                }

                    decimal payment = 0;
                    if (loan.GetRepaymentAmount() > loan.GetBalance())
                    {
                        payment = loan.GetBalance();
                    }
                    else
                    {
                        payment = loan.GetRepaymentAmount();
                    }

                    var loanCodeDes = company.LoanCodes.Find(x => x.Code == loan.Code);


                    NonStatutory stat = new NonStatutory
                    {
                        Code = loan.Code,
                        Description = loanCodeDes?.Description ?? loan.Code,
                        EmployeeAmount = payment,
                        BeforeTax = loan.BeforeTax
                    };
                if (payment != 0)
                {
                    deduct.Add(stat);
                }

                deduct.Add(stat);
            }

            return deduct;
        }

        public bool IsFirstCalc { get; set; } = true;

        public void CalculatePaye(PreviousEmployment emp, TaxHeader? data, Cache ytd, Payrolls payroll, int period)
        {

            Contracts.Requires(data != null, "Paye header is null, please check taxes and defaults");
            var ytdStat = ytd.Statutory.Find(x => x.Tax.ToLower() == "paye");
            var statutory = new Statutory();
            statutory.Tax = data!.TaxCode;

            var statutoryIncome = CalculateStatutoryIncome(emp);

            (decimal tax25, decimal tax30) = GetTaxFreeIncome(payroll, data);

            if (statutoryIncome > tax30)
            {
                statutory.EmployeeAmount = (tax30 - tax25) * data.TaxTierEmployee[1].Rate;
                statutory.EmployeeAmount += (statutoryIncome - tax30) * data.TaxTierEmployee[0].Rate;
            }

            else if (statutoryIncome > tax25)
            {
                statutory.EmployeeAmount = (statutoryIncome - tax25) * data.TaxTierEmployee[1].Rate;
            }


            var expected = CalculatePaye(ytd.CalculateStatutoryIncome(emp) + statutoryIncome + (emp.GetGross() - emp.GetNis()), data, (tax25 * period, tax30 * period));

            if(ytdStat != null)
            {

                statutory.EmployeeAmount = expected.EmployeeAmount - ytdStat.EmployeeAmount;

                IsFirstCalc = false;
            }

            UpdateStatutory(statutory);
        }

        public Statutory CalculatePaye(decimal statutoryIncome, TaxHeader data, (decimal tax25, decimal tax30) tax)
        {
            var statutory = new Statutory();

            if (statutoryIncome > tax.tax30)
            {
                statutory.EmployeeAmount = (tax.tax30 - tax.tax25) * data.TaxTierEmployee[1].Rate;
                statutory.EmployeeAmount += (statutoryIncome - tax.tax30) * data.TaxTierEmployee[0].Rate;
            }

            else if (statutoryIncome > tax.tax25)
            {
                statutory.EmployeeAmount = (statutoryIncome - tax.tax25) * data.TaxTierEmployee[1].Rate;
            }

            //Console.WriteLine(statutoryIncome);
            //Console.WriteLine(tax.tax25);
            //Console.WriteLine(tax.tax25);
            //Console.WriteLine(statutoryIncome - tax.tax25);
            //Console.WriteLine(data.TaxTierEmployee[1].Rate);

            return statutory;
        }

        private void UpdateStatutory(Statutory statutory)
        {
            var i = Statutory.FindIndex(x => x.Tax == statutory.Tax);

            if (i > 0)
                Statutory[i] = statutory;
            else
                Statutory.Add(statutory);
        }

        public static (decimal, decimal) GetTaxFreeIncome(Payrolls payroll, TaxHeader data, bool year = false)
        {
            decimal TaxFreeIncome25 = 0;
            decimal TaxFreeIncome30 = 0;

            int count = 0;
            switch (payroll.type)
            {
                case PayrollTypes.fortnightly:
                    count = 26;
                    break;
                case PayrollTypes.weekly:
                    count = 52;
                    break;
                case PayrollTypes.bimonthly:
                    count = 24;
                    break;
                case PayrollTypes.monthly:
                    count = 12;
                    break;
                default:
                    break;
            }

            if (year)
            {
                TaxFreeIncome25 = data.TaxTierEmployee[1].Threshold;
                TaxFreeIncome30 = data.TaxTierEmployee[0].Threshold;
                return (TaxFreeIncome25, TaxFreeIncome30);
            }

            TaxFreeIncome25 = data.TaxTierEmployee[1].Threshold / count;
            TaxFreeIncome30 = data.TaxTierEmployee[0].Threshold / count;
            return (TaxFreeIncome25, TaxFreeIncome30);
        }

        public List<NonStatutory> NonStatutory { get; set; } = new List<NonStatutory>();

        public decimal Gross { get; set; } = 0;
        public decimal TaxableGross { get; set; } = 0;

        public decimal StatutoryIncome { set; get; } = 0;

        // Please check this line of code for pension issue

        public decimal CalculateStatutoryIncome(PreviousEmployment previous)
        {
            var index = Statutory.FindIndex(x => x.Tax.Contains("pension"));

            var nis = GetTax("NIS").EmployeeAmount;

            if (index != -1)
                return TaxableGross - (nis + Statutory[index].EmployeeAmount);

            StatutoryIncome = TaxableGross - (nis);

            return StatutoryIncome;
        }

        //public decimal CalculateStatutoryIncome
        //{
        //    get
        //    {
        //        //return TaxableGross - (GetTax("NIS").EmployeeAmount + GetTax("Pension").EmployeeAmount);

        //    }

        //    set
        //    {
        //        StatutoryIncome = value;
        //    }
        //}
        public decimal Net { get; set; } = 0;
        public decimal TotalDeductions { get; set; } = 0;
        public decimal StatutoryTotal { get; set; } = 0;

    }
}




DataManagementService.cs



loan.Balance = loan.InitialAmount;



newLoan.SetInitialAmount(loanAmt);
newLoan.SetRepaymentAmount(loanInstallments);
//newLoan.SetBalance(loanAmt);
newLoan.SetBalance(loanAmt);
