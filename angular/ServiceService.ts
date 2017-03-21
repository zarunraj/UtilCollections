


module AdminApp.Services {
    export class ServiceService
        extends ServiceBase<Interfaces.Models.IServices>
        implements Interfaces.Services.IServicesService {

        static $inject = ["AdminApp.Services.CIHttpService"];
        constructor(CIHttpService: AdminApp.Services.CIHttpService) {
            super(CIHttpService, "Service");
        }
        getParentDetails = () => {
            var promise: ng.IPromise<Array<AdminApp.Interfaces.Models.IServices>>;
            promise = this.CIHttpService.Get("Service/GetParentDetails");
            return promise;
        };
    }

    angular.module("AdminApp").service("AdminApp.Services.ServiceService", ServiceService);
}