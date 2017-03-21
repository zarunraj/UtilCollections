using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace KPMG.CI.CompetitiveIntelligence.Admin
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
        protected void Application_EndRequest()
        {
            const string X_REQUEST_WITH = "X-Requested-With";
            if ((Request.Headers[X_REQUEST_WITH]) == null)
            {
                const string defaultErrorPath = "~/Errors/500.html";
                const string notFoundErrorPath = "~/Errors/404.html";
                const string unauthorizedErrorPath = "~/Errors/401.html";
                // If the user is not authorized redirect to error page
                if (Response.StatusCode.Equals(401))
                {
                    Response.ClearContent();
                    Response.Redirect(unauthorizedErrorPath);
                }

                // If the requested page contents is not found
                else if (Response.StatusCode.Equals(404))
                {
                    Response.ClearContent();
                    Response.Redirect(notFoundErrorPath);
                }
                else if(Response.StatusCode.Equals(500))
                {
                    Response.ClearContent();
                    Response.Redirect(defaultErrorPath);
                }
            }
        }
    }
}
