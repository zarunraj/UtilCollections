var AdminApp;
(function (AdminApp) {
    var Controllers;
    (function (Controllers) {
        var GeographyController = (function () {
            function GeographyController(geographyService, $scope) {
                var _this = this;
                this.DeleteGeographyModalSuccess = function (response) {
                    if (response) {
                        if (response.StatusCode == 412) {
                            _this.ShowMessagePopup('Warning', response.StatusDescription);
                        }
                        else if (response.StatusCode == 400) {
                            _this.ShowMessagePopup('Error', 'Some error occured in action.');
                        }
                        else {
                            _this.geographyGridOptions.dataSource.read();
                        }
                    }
                };
                this.EntityRemoveClick = function (dataItem) {
                    var _self = _this;
                    _this.geographyService.Delete(dataItem).then(_this.DeleteGeographyModalSuccess);
                };
                this.geographyGridDataRead = function (e) {
                    _this.FillGridPropertyAttributes(e);
                    _this.geographyService.GetAllPaginated(_this.GridPropertyData).then(function (response) {
                        e.success(response);
                    });
                };
                this.ShowMessagePopup = function (Title, Content) {
                    var displayConent = angular.element('<div style="text-align: center; width:100%"> '
                        + ' <span> ' + Content + ' </span>'
                        + ' <div class="clear-fix"></div> <br>'
                        + '<input  type="button" class="k-button" value="OK"  ng-click="wndMessage.close()" /> </div>');
                    _this.$scope.wndMessage.title(Title).content(displayConent).center().open();
                };
                this.FillGridPropertyAttributes = function (e) {
                    var sortfield = "";
                    var sortDir = "";
                    var filter = [];
                    if (e.data.sort) {
                        if (e.data.sort[0]) {
                            sortfield = e.data.sort[0]['field'];
                            sortDir = e.data.sort[0]['dir'];
                        }
                    }
                    if (!e.data.filter) {
                        e.data.filter = {};
                    }
                    if (!e.data.filter.filters) {
                        e.data.filter.filters = filter;
                    }
                    angular.forEach(e.data.filter.filters, function (filter, key) {
                        filter.Operator = "And";
                    });
                    angular.forEach(_this.$scope.SelectedFilters, function (filter, key) {
                        e.data.filter.filters.push(filter);
                    });
                    filter = e.data.filter.filters;
                    _this.GridPropertyData.pageSize = e.data.pageSize;
                    _this.GridPropertyData.skip = e.data.skip;
                    _this.GridPropertyData.sortfield = sortfield;
                    _this.GridPropertyData.sortDir = sortDir;
                    _this.GridPropertyData.filters = filter;
                };
                this.FillGridData = function () {
                    var geographyDataSource = new kendo.data.DataSource({
                        pageSize: 15,
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        transport: {
                            read: _this.geographyGridDataRead
                        },
                        schema: {
                            data: "Data",
                            total: "Total",
                            model: {
                                fields: {
                                    Name: { type: "string" },
                                    Active: { type: "boolean" },
                                }
                            }
                        }
                    });
                    _this.geographyGridOptions = {
                        dataSource: geographyDataSource,
                        height: 475,
                        scrollable: true,
                        filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    contains: "Contains",
                                    startswith: "Starts with",
                                    eq: "Is equal to",
                                    neq: "Is not equal to"
                                }
                            }
                        },
                        sortable: true,
                        pageable: {
                            input: true,
                            numeric: false
                        },
                        columns: [
                            {
                                title: "Action",
                                headerAttributes: { "class": "center-text-align" },
                                attributes: { "class": "center-text-align" },
                                width: "100px",
                                filterable: false,
                                sortable: false,
                                template: kendo.template($("#tmplActionButtonsTemplate").html())
                            },
                            {
                                field: "Name",
                                title: "Geographic Relevance",
                                filterable: true,
                                sortable: true,
                            },
                            {
                                field: "SubRegion",
                                template: '#if(data.SubRegion){# #=data.SubRegion.Name# #}#',
                                title: "SubRegion",
                                filterable: true,
                                sortable: true,
                            },
                            {
                                field: "Region",
                                title: "Region",
                                template: '#if(data.SubRegion && data.SubRegion.Region){# #=data.SubRegion.Region.Name# #}#',
                                filterable: true,
                                sortable: true,
                            },
                            {
                                field: "Restricted",
                                title: "GSPA",
                                width: "120px",
                                filterable: false,
                                sortable: true,
                                template: kendo.template($("#tmplRestrictSelect").html()),
                                headerAttributes: { "class": "center-text-align" },
                                attributes: { "class": "center-text-align" }
                            },
                            {
                                filterable: { messages: { isTrue: "Active", isFalse: "Inactive" } },
                                field: "Active",
                                title: "Active",
                                width: "120px",
                                hidden: true,
                                sortable: true,
                                headerAttributes: { "class": "center-text-align" },
                                attributes: { "class": "center-text-align" },
                                template: kendo.template($("#tmplActiveSelect").html()),
                            },
                        ]
                    };
                };
                this.init = function () {
                    _this.FillGridData();
                    _this.$scope.$on("ItemDeleteSuccess", _this.itemDeletesucessApply);
                    //    this.grphyDdlOptions = {
                    //        dataSource: {
                    //            transport: {
                    //                read: this.getRegionRead
                    //            }
                    //        },
                    //        dataTextField: "Name",
                    //        dataValueField: "ID"
                    //    };
                };
                this.itemDeletesucessApply = function (e, response) {
                    if (response.StatusCode == 412) {
                        _this.ShowMessagePopup('Warning', response.StatusDescription);
                    }
                    else if (response.StatusCode == 400) {
                        _this.ShowMessagePopup('Error', 'Some error occured in action.');
                    }
                    else {
                        window["GeographyController"].$scope.geographyGrid.dataSource.read();
                    }
                };
                this.geographyService = geographyService;
                this.$scope = $scope;
                this.GeographyModal = undefined;
                this.IsEditViewVisible = false;
                this.grphyDdlOptions = { dataTextField: "Name", dataValueField: "ID" };
                this.init();
                window["GeographyController"] = this;
                this.GridPropertyData = { pageSize: 0, skip: 0, sortDir: "", sortfield: "", filters: [] };
            }
            GeographyController.$inject = ["AdminApp.Services.GeographyService", "$scope"];
            return GeographyController;
        }());
        Controllers.GeographyController = GeographyController;
        angular.module("AdminApp").controller("AdminApp.Controllers.GeographyController", GeographyController);
    })(Controllers = AdminApp.Controllers || (AdminApp.Controllers = {}));
})(AdminApp || (AdminApp = {}));
