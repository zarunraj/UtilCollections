var AdminApp;
(function (AdminApp) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider.when("/firm", { controller: "AdminApp.Controllers.FirmController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Firm/firm.html", controllerAs: "Firm" });
            $routeProvider.when("/evidence/:id", { controller: "AdminApp.Controllers.EvidenceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Evidence/evidence.html", controllerAs: "Evidence" });
            $routeProvider.when("/theme", { controller: "AdminApp.Controllers.ThemeController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Theme/theme.html", controllerAs: "Theme" });
            $routeProvider.when("/addTheme/:id", { controller: "AdminApp.Controllers.AddThemeController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Theme/addTheme.html", controllerAs: "Theme" });
            $routeProvider.when("/addEvidence/:id/:location", { controller: "AdminApp.Controllers.AddEvidenceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Evidence/addEvidence.html", controllerAs: "Evidence" });
            //$routeProvider.when("/searchevidence", { controller: "AdminApp.Controllers.SearchEvidenceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Evidence/SearchEvidence.html", controllerAs: "Search" });
            // $routeProvider.when("/sector", { controller: "AdminApp.Controllers.AddSectorController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Sector/sector.html", controllerAs: "Sector" });
            $routeProvider.when("/strategicIssue", { controller: "AdminApp.Controllers.AddStrategicIssueController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/StrategicIssue/strategicIssue.html", controllerAs: "StrategicIssue" });
            $routeProvider.when("/geography", { controller: "AdminApp.Controllers.GeographyController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Geography/geography.html", controllerAs: "Geography" });
            // $routeProvider.when("/sourceOfInsight", { controller: "AdminApp.Controllers.SourceOfInSightController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/SourceOfInSight/sourceOfInsight.html", controllerAs: "SourceOfInSight" });
            $routeProvider.when("/addGeography/:id", { controller: "AdminApp.Controllers.AddGeographyController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Geography/Geography.html", controllerAs: "Geography" });
            $routeProvider.when("/CompetitorsIssue", { controller: "AdminApp.Controllers.CompetitorsIssueController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/CompetitorIssue/CompetitorsIssue.html", controllerAs: "CompetitorsIssue" });
            //$routeProvider.when("/addCompetitorsIssue/:id", { controller: "AdminApp.Controllers.AddCompetitorsIssueController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/CompetitorIssue/CompetitorsIssue.html", controllerAs: "CompetitorsIssue" });
            $routeProvider.when("/sector", { controller: "AdminApp.Controllers.AddSectorController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Sector/sector.html", controllerAs: "Sector" });
            //$routeProvider.when("/addStrategicIssue/:id", { controller: "AdminApp.Controllers.AddStrategicIssueController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/StrategicIssue/StrategicIssue.html", controllerAs: "StrategicIssue" });
            $routeProvider.when("/sourceOfInsight", { controller: "AdminApp.Controllers.AddSourceOfInsightController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/SourceOfInSight/sourceOfInsight.html", controllerAs: "SourceOfInSight" });
            $routeProvider.when("/ViewEvidence/:id", { controller: "AdminApp.Controllers.viewEvidenceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Evidence/ViewEvidence.html", controllerAs: "ViewEvidence" });
            $routeProvider.when("/PNB", { controller: "AdminApp.Controllers.AddPNBController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/PNB/PNB.html", controllerAs: "PNB" });
            //  $routeProvider.when("/PNB/", { controller: "AdminApp.Controllers.AddPNBController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/PNB/PNB.html", controllerAs: "PNB" });
            // $routeProvider.when("/Importance", { controller: "AdminApp.Controllers.ImportancesController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Importance/Importance.html", controllerAs: "Importance" });
            $routeProvider.when("/Importance", { controller: "AdminApp.Controllers.AddImportanceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Importance/Importance.html", controllerAs: "Importance" });
            $routeProvider.when("/GlobalClients", { controller: "AdminApp.Controllers.AddGlobalClientsController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/GlobalClients/GlobalClients.html", controllerAs: "GlobalClients" });
            $routeProvider.when("/LocalGeography", { controller: "AdminApp.Controllers.AddLocalGeographyController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/LocalGeography/LocalGeography.html", controllerAs: "LocalGeography" });
            $routeProvider.when("/Services", { controller: "AdminApp.Controllers.AddServiceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Service/Services.html", controllerAs: "Service" });
            $routeProvider.when("/Users", { controller: "AdminApp.Controllers.UserController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/User/Users.html", controllerAs: "User" });
            //  $routeProvider.when("/Services", { controller: "AdminApp.Controllers.AddServiceController", templateUrl: AdminApp.Constants.ApplicationPath + "app/views/Service/Services.html", controllerAs: "Service" });
            $routeProvider.otherwise({ redirectTo: "/evidence/0" });
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    }());
    AdminApp.Routes = Routes;
})(AdminApp || (AdminApp = {}));
