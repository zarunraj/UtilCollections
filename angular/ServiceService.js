var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AdminApp;
(function (AdminApp) {
    var Services;
    (function (Services) {
        var ServiceService = (function (_super) {
            __extends(ServiceService, _super);
            function ServiceService(CIHttpService) {
                var _this = this;
                _super.call(this, CIHttpService, "Service");
                this.getParentDetails = function () {
                    var promise;
                    promise = _this.CIHttpService.Get("Service/GetParentDetails");
                    return promise;
                };
            }
            ServiceService.$inject = ["AdminApp.Services.CIHttpService"];
            return ServiceService;
        }(Services.ServiceBase));
        Services.ServiceService = ServiceService;
        angular.module("AdminApp").service("AdminApp.Services.ServiceService", ServiceService);
    })(Services = AdminApp.Services || (AdminApp.Services = {}));
})(AdminApp || (AdminApp = {}));
