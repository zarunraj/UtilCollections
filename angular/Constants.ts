module AdminApp {
    export class Constants {
        constructor() {
            throw new Error("Cannot new this class");
        }
        static ApiPath = "";
        static DomainPath = "";
        static ApplicationPath = "";
        static HttpConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            async: false
        };

        static HttpFileConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'responseType': 'arraybuffer'
            }
        };

        static HttpFileImportConfig = {
            withCredentials: false,
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
            }
        };
    }
    
}