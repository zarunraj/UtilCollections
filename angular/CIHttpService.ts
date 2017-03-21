module AdminApp.Services {
    export class CIHttpService {
        httpService: ng.IHttpService;
        $q: ng.IQService;
        static $inject = ["$http", "$q"];
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.httpService = $http;
            this.$q = $q;
        }


        //***********************
        Get = (url: string) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.get(AdminApp.Constants.ApiPath + url, AdminApp.Constants.HttpConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };

        //***********************
        GetFile = (url: string, data: any) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.post(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpFileConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };


        //***********************
        GetApp = (url: string) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.get(AdminApp.Constants.DomainPath + url, AdminApp.Constants.HttpConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };

        //***********************
        PostFile = (url: string, file: any) => {
            var promise = {};
            var fd = new FormData();
            //fd.append('file', { data: file, Name: file.name});
            fd.append('file', file);
            var deferred = this.$q.defer();
            promise = this.httpService.post(AdminApp.Constants.ApiPath + url, fd, AdminApp.Constants.HttpFileImportConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };


        //***********************

        Post = (url: string, data: any) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.post(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject(data);
                    //deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };


        //***********************
        Put = (url: string, data: any) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.put(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject(data);
                    //deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };



        //***********************
        Delete = (url: string) => {
            var promise = {};
            var deferred = this.$q.defer();
            promise = this.httpService.delete(AdminApp.Constants.ApiPath + url,  AdminApp.Constants.HttpConfig)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    this.errorHandler(deferred, url);
                    deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                });
            return deferred.promise;
        };

        private errorHandler = (deferred: ng.IDeferred<any>, url:string) => {
            console.log("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
        };
    }
    angular.module("AdminApp").service("AdminApp.Services.CIHttpService", CIHttpService);
}

function errorHandler(d,u,m)
{
    if (m) {
        console.log(m);
    }
}