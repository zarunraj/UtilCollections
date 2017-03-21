module AdminApp.Controllers {

    interface IGeographyScope extends ng.IScope {
        win2: kendo.ui.Window;
        geographyGrid: kendo.ui.Grid;
        grphicDownList: kendo.ui.DropDownList;
        SelectedFilters: any;
        wndMessage: kendo.ui.Window;
    }
    export class GeographyController {
        geographyService: AdminApp.Interfaces.Services.IGeographyService;

        public geographyId: number;
        public geographyGridOptions: any;
        public GeographyModal: AdminApp.Interfaces.Models.IGeography;
        public IsEditViewVisible: boolean;
        public $scope: IGeographyScope;
        static $inject = ["AdminApp.Services.GeographyService", "$scope"];
        public _self: GeographyController;
        public grphyDdlOptions: any;
        public GridPropertyData: AdminApp.Interfaces.IGridPropertyObejctModel;

        constructor(geographyService: AdminApp.Interfaces.Services.IGeographyService, $scope: IGeographyScope) {

            this.geographyService = geographyService;
            this.$scope = $scope;
            this.GeographyModal = undefined;
            this.IsEditViewVisible = false;
            this.grphyDdlOptions = { dataTextField: "Name", dataValueField: "ID" };
            this.init();
            window["GeographyController"] = this;
            this.GridPropertyData = { pageSize: 0, skip: 0, sortDir: "", sortfield: "", filters: []};
        }
        DeleteGeographyModalSuccess = (response) => {
            if (response) {
                if (response.StatusCode == 412) {
                    this.ShowMessagePopup('Warning', response.StatusDescription);
                }
                else if (response.StatusCode == 400) {
                    this.ShowMessagePopup('Error', 'Some error occured in action.');
                }
                else {
                    this.geographyGridOptions.dataSource.read();
                }
            }
        }

       
        EntityRemoveClick = (dataItem) => {
            var _self: AdminApp.Controllers.GeographyController = this;

            this.geographyService.Delete(dataItem).then(this.DeleteGeographyModalSuccess);
        }
       
        geographyGridDataRead = (e: any) => {
            
            this.FillGridPropertyAttributes(e);
            this.geographyService.GetAllPaginated(this.GridPropertyData).then(function (response) {
                e.success(response);
            });

        };

        ShowMessagePopup = (Title: string, Content: string) => {
            var displayConent: any = angular.element('<div style="text-align: center; width:100%"> '
                + ' <span> ' + Content + ' </span>'
                + ' <div class="clear-fix"></div> <br>'
                + '<input  type="button" class="k-button" value="OK"  ng-click="wndMessage.close()" /> </div>');

            this.$scope.wndMessage.title(Title).content(displayConent).center().open();
        }
       FillGridPropertyAttributes = (e: any) =>
        {
            var sortfield = "";
            var sortDir = "";
            var filter: Array<AdminApp.Interfaces.IGridFilterObejctModel> = [];

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
            angular.forEach(e.data.filter.filters, (filter: AdminApp.Interfaces.IGridFilterObejctModel, key: number) => {
                filter.Operator = "And";
            });

            angular.forEach(this.$scope.SelectedFilters, (filter: AdminApp.Interfaces.IGridFilterObejctModel, key: number) => {
                e.data.filter.filters.push(filter);
            });
            
            filter = e.data.filter.filters;
            this.GridPropertyData.pageSize = e.data.pageSize;
            this.GridPropertyData.skip = e.data.skip;
            this.GridPropertyData.sortfield = sortfield;
            this.GridPropertyData.sortDir = sortDir;
            this.GridPropertyData.filters = filter;

        }

        FillGridData = () => {
            var geographyDataSource = new kendo.data.DataSource({
                pageSize: 15,
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                transport: {
                    read: this.geographyGridDataRead

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

            this.geographyGridOptions = {
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
                        filterable:false,
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
                        hidden:true,
                        sortable: true,
                        headerAttributes: { "class": "center-text-align" },
                        attributes: { "class": "center-text-align" },
                        template: kendo.template($("#tmplActiveSelect").html()),

                    },

                ]
            };
        }

        init = () => {
            this.FillGridData();
            this.$scope.$on("ItemDeleteSuccess", this.itemDeletesucessApply);
        //    this.grphyDdlOptions = {
        //        dataSource: {
        //            transport: {
        //                read: this.getRegionRead

        //            }

        //        },
        //        dataTextField: "Name",
        //        dataValueField: "ID"
        //    };
        }

        itemDeletesucessApply = (e: any, response:any) =>{
            

            if (response.StatusCode == 412) {
                this.ShowMessagePopup('Warning', response.StatusDescription);
            }
            else if (response.StatusCode == 400) {
                this.ShowMessagePopup('Error', 'Some error occured in action.');
            }
            else {
                window["GeographyController"].$scope.geographyGrid.dataSource.read();
            }
        }
    }

    angular.module("AdminApp").controller("AdminApp.Controllers.GeographyController", GeographyController);
}