
((): void => {
    var app = angular.module("AdminApp", ['ngRoute', 'kendo.directives','dropdown-multiselect']);
    app.config(AdminApp.Routes.configureRoutes);    
})() 