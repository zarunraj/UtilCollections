var AdminApp;
(function (AdminApp) {
    var Services;
    (function (Services) {
        var CIHttpService = (function () {
            function CIHttpService($http, $q) {
                var _this = this;
                //***********************
                this.Get = function (url) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.get(AdminApp.Constants.ApiPath + url, AdminApp.Constants.HttpConfig)
                        .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        this.errorHandler(deferred, url);
                        deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                    });
                    return deferred.promise;
                };
                //***********************
                this.GetFile = function (url, data) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.post(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpFileConfig)
                        .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        this.errorHandler(deferred, url);
                        deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                    });
                    return deferred.promise;
                };
                //***********************
                this.GetApp = function (url) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.get(AdminApp.Constants.DomainPath + url, AdminApp.Constants.HttpConfig)
                        .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        this.errorHandler(deferred, url);
                        deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                    });
                    return deferred.promise;
                };
                //***********************
                this.PostFile = function (url, file) {
                    var promise = {};
                    var fd = new FormData();
                    //fd.append('file', { data: file, Name: file.name});
                    fd.append('file', file);
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.post(AdminApp.Constants.ApiPath + url, fd, AdminApp.Constants.HttpFileImportConfig)
                        .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        this.errorHandler(deferred, url);
                        deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                    });
                    return deferred.promise;
                };
                //***********************
                this.Post = function (url, data) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.post(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpConfig)
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
                this.Put = function (url, data) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.put(AdminApp.Constants.ApiPath + url, JSON.stringify(data), AdminApp.Constants.HttpConfig)
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
                this.Delete = function (url) {
                    var promise = {};
                    var deferred = _this.$q.defer();
                    promise = _this.httpService.delete(AdminApp.Constants.ApiPath + url, AdminApp.Constants.HttpConfig)
                        .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        this.errorHandler(deferred, url);
                        deferred.reject("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                    });
                    return deferred.promise;
                };
                this.errorHandler = function (deferred, url) {
                    console.log("An error occurred while fetching data from " + AdminApp.Constants.ApiPath + url);
                };
                this.httpService = $http;
                this.$q = $q;
            }
            CIHttpService.$inject = ["$http", "$q"];
            return CIHttpService;
        }());
        Services.CIHttpService = CIHttpService;
        angular.module("AdminApp").service("AdminApp.Services.CIHttpService", CIHttpService);
    })(Services = AdminApp.Services || (AdminApp.Services = {}));
})(AdminApp || (AdminApp = {}));
function errorHandler(d, u, m) {
    if (m) {
        console.log(m);
    }
}
