var AdminApp;
(function (AdminApp) {
    var Services;
    (function (Services) {
        var ServiceBase = (function () {
            function ServiceBase(CIHttpService, api) {
                this.CIHttpService = CIHttpService;
                this.Api = api;
            }
            ServiceBase.prototype.Delete = function (id) {
                var promise;
                if (id > 0) {
                    promise = this.CIHttpService.Delete(this.Api + "/Delete/" + id);
                }
                return promise;
            };
            ServiceBase.prototype.GetAll = function () {
                var promise;
                promise = this.CIHttpService.Get(this.Api + "/GetAll");
                return promise;
            };
            ServiceBase.prototype.GetAllPaginated = function (page) {
                var promise;
                promise = this.CIHttpService.Post(this.Api + "/GetAllPaginated", page);
                return promise;
            };
            ServiceBase.prototype.Get = function (id) {
                var promise;
                promise = this.CIHttpService.Get(this.Api + "/Get/" + id);
                return promise;
            };
            ServiceBase.prototype.Save = function (model) {
                var promise;
                if (model.ID && model.ID > 0) {
                    promise = this.CIHttpService.Put(this.Api + "/Put/", model);
                }
                else {
                    promise = this.CIHttpService.Post(this.Api + "/Post/", model);
                }
                return promise;
            };
            return ServiceBase;
        }());
        Services.ServiceBase = ServiceBase;
    })(Services = AdminApp.Services || (AdminApp.Services = {}));
})(AdminApp || (AdminApp = {}));
