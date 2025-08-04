using Microsoft.EnterpriseManagement.NewSMPortal.SDKTransformer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Management;
using System.Web.Mvc;
using System.Web.Routing;

namespace SelfServicePortalWebApp
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {

        PortalLogger Logger = PortalLogger.Instance;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //BundleConfig.RegisterBundles(BundleTable.Bundles);
        }


        //string arg filled with the value of "varyByCustom" in your web.config
        public override string GetVaryByCustomString(HttpContext context, string arg)
        {
            if (arg == "User")
            {
                // depends on your authentication mechanism
                return "User=" + context.User.Identity.Name;
                //return "User=" + context.Session.SessionID;
            }

            return base.GetVaryByCustomString(context, arg);
        }

        public void Application_Error(object sender, EventArgs e)
        {
            var ex = Server.GetLastError();
            var httpException = ex as HttpException ?? ex.InnerException as HttpException;
            if (httpException == null) 
                return;

            Logger.LogErrorMsg("Application_Error has thrown exception : " + ex.Message + "\nStack Trace :\n" + ex.StackTrace);

            if (httpException.WebEventCode == WebEventCodes.RuntimeErrorPostTooLarge)
            {
                //TODO: handle the error
            }
        }
    }
}