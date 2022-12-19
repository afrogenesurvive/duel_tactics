

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






  
