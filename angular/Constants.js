var AdminApp;
(function (AdminApp) {
    var Constants = (function () {
        function Constants() {
            throw new Error("Cannot new this class");
        }
        Constants.ApiPath = "";
        Constants.DomainPath = "";
        Constants.ApplicationPath = "";
        Constants.HttpConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            async: false
        };
        Constants.HttpFileConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'responseType': 'arraybuffer'
            }
        };
        Constants.HttpFileImportConfig = {
            withCredentials: false,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
            }
        };
        return Constants;
    }());
    AdminApp.Constants = Constants;
})(AdminApp || (AdminApp = {}));
