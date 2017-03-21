module AdminApp.Services {
    export   class ServiceBase<T extends AdminApp.Interfaces.Models.IBaseModel> implements AdminApp.Interfaces.Services.IServiceBase<T>
    {
        public CIHttpService: AdminApp.Services.CIHttpService;
        private Api: string; 
        constructor(CIHttpService: AdminApp.Services.CIHttpService,api:string) {
            this.CIHttpService = CIHttpService;
            this.Api = api;
        }
         
         
        Delete(id: number): ng.IPromise<boolean> {
            var promise: ng.IPromise<boolean>;
            if (id > 0) {
                promise = this.CIHttpService.Delete(this.Api+"/Delete/" + id);
            }
            return promise;
        }

        GetAll(): ng.IPromise<Array<T>> {
            var promise: ng.IPromise<Array<T>>;
            promise = this.CIHttpService.Get(this.Api + "/GetAll");
            return promise;
        }

        GetAllPaginated(page: AdminApp.Interfaces.IGridPropertyObejctModel): ng.IPromise<Array<T>> {
            var promise: ng.IPromise<Array<T>>;
            promise = this.CIHttpService.Post(this.Api + "/GetAllPaginated", page);
            return promise;
        }


        Get(id: number) :ng.IPromise<T>{
            var promise: ng.IPromise<T>;
            promise = this.CIHttpService.Get(this.Api+ "/Get/" + id);
            return promise;
        }

        Save(model: T): ng.IPromise<any>
        {
            var promise: ng.IPromise<any>;
            if (model.ID && model.ID > 0) {
                promise = this.CIHttpService.Put(this.Api +"/Put/", model);
            }
            else {
                promise = this.CIHttpService.Post(this.Api +"/Post/", model);
            }
            return promise;
        }
    }
}