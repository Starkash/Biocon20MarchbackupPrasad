appOperations.controller("AddCapexBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    $scope.CurrDate = new Date();
    // arind
    $scope.LOEdateDatePopUp = {
        opened: false,
    };
    $scope.openCompletionYearDate = function (countryRow) {
        //  $scope.LOEdateDatePopUp.opened = true;
        countryRow.IsOpenDate = true;
    };

    $scope.CompletionYearDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    $scope.FillingdateDatePopUp = {
        opened: false,
    };
    $scope.openTriggerYear = function (countryRow) {
        // $scope.FillingdateDatePopUp.opened = true;
        countryRow.IsOpenDate2 = true;
    };
    $scope.TriggerYearOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };


    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'Capex'&$top=5000&$orderby=ID";
    // var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$&$filter=SubStrategy eq 'Fixed TP/FP'top=5000&$orderby=ID";
    //var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'OutLicensing (ANDA)'&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$orderby=ID";

    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Entity')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$filter=ID eq '4'&$orderby=ID ";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
    var strCAPEXBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=*,Title,ID&$top=1000&$orderby=Id desc";
    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    var strCAPEXBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?$select=*,Title,ID&$top=1000&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'Capex'&$top=5000&$orderby=ID"; // cascading
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('StageMaster')/items?$select=*&$filter=Title eq 'Initiated'&$top=100&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Site')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCapexContextUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexContext')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexProductDetails')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading



    $scope.setting5 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll: true
        //showUncheckAll:false
    };

    $scope.setting1 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll: false
    };



    $scope.openAuditDate = function () {
        $scope.auditDatePopUp.opened = true;


    };
    $scope.auditDatePopUp = {
        opened: false,

    };
    $scope.auditDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'year'
    };



    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strCAPEXBUCaseUrl, strPartnerUrl, strCAPEXBULaunchUrl, strRoleMasterUrl, strStageMasterUrl, strSkuMasterUrl, strSiteUrl, strCapexContextUrl, strCapexProductDetailsUrl, strCurrencyMasterUrl];

    //ARVIND
    var newAuditItem;

    var newAuditItem1;
    $scope.isLoading=false;
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        function callMultiSelect(argument) {
            $('#ddnmembers').fSelect();
            // $('#ddnRJmembers').fSelect();
        }

        $scope.CapexPhaseColl = [];     //ARVIND

        $scope.ProdColl = [];     //ARVIND


        $scope.StrategyColl = batchedData[0].d.results;
        $scope.SubStrategyColl = batchedData[1].d.results;
        $scope.ProductCategoryColl = batchedData[2].d.results;
        $scope.ProductMasterColl = batchedData[3].d.results;
        $scope.MarketColl = batchedData[4].d.results;
        $scope.CountryColl = batchedData[5].d.results;
        $scope.DosageColl = batchedData[6].d.results;
        $scope.subMarketColl = batchedData[7].d.results;
        $scope.CAPEXBUCaseColl = batchedData[8].d.results;
        $scope.PartnerColl = batchedData[9].d.results;
        $scope.CAPEXLaunchColl = batchedData[10].d.results;
        $scope.RoleMasterColl = batchedData[11].d.results;
        $scope.StageMasterColl = batchedData[12].d.results;
        $scope.SkuMasterColl = batchedData[13].d.results;
        $scope.SiteColl = batchedData[14].d.results;
        $scope.CapexContextColl = batchedData[15].d.results;
        $scope.CapexProductDetailsColl = batchedData[16].d.results;
        $scope.CurrencyMasterColl = batchedData[17].d.results;









        //$scope.ddlSubStrategy=0;

        if ($scope.StrategyColl.length > 0) {
            $scope.ddlStrategy = $scope.StrategyColl[0].Id;
            $scope.ddlStrategyCAPEX = $scope.StrategyColl[0].Title;


        }
        if ($scope.SubStrategyColl.length > 0) {
            $scope.SubStrategyColl = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
            $scope.SubStrategy = $scope.SubStrategyColl[0].Title
            $scope.SubStrategyId = $scope.SubStrategyColl[0].Id;

        }

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.selectedContTypeDes = [];

        $scope.ppedescriptioncoll = [];
        for (var n = 0; n < $scope.ProductMasterColl.length; n++) {
            $scope.finalppedescriptionColl = [{
                "label": $scope.ProductMasterColl[n].Title,
                "id": $scope.ProductMasterColl[n].Id

            }];
            console.log($scope.finalppedescriptionColl);
            $scope.ppedescriptioncoll.push($scope.finalppedescriptionColl[0]);

        }



        // arvind


        var counter;
        var vRetVal;
        if ($scope.CAPEXBUCaseColl.length > 0) {
            var Logg = $scope.CAPEXBUCaseColl[0].Title;
            if (Logg == null) {
                counter = 0;
            } else {
                // BIOCON-OUT-LIC-1
                var Result = Logg.split("_");
                $scope.counter = Result[0];
                $scope.counter = parseInt($scope.counter) + 1;


            }
        } else {
            $scope.counter = "000";
        }
        // counter = parseInt(counter) + 1;
        // $scope.BUTitle = vRetVal;
        var i = 0;
        $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();



        //BIND STARGEY DROPDOWN
        $scope.bindstrategy = function (ddlStrategy) {
            $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
        }
        //BIND PRODUCT DROPDOWN  
        $scope.ProductNameColl = [];
        $scope.dosagessColl = [];
        var unique = [];

        $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
            return (item.ProductCategoryNameId == $scope.ddlProductCategory);
        });
        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
            //   $scope.ProdCode = $scope.getProductame[0].ProductCode;


        };



        var capexValue;


        $scope.OnCapexValueChange = function () {
            var CapexPhaseTotal1 = 0;
            $scope.PhaseTotal = [];
            for (var i = 0; i < $scope.CapexPhaseColl.length; i++) {
                if ($scope.CapexPhaseColl[i].CapexPhaseTotal == undefined || $scope.CapexPhaseColl[i].CapexPhaseTotal == "" || $scope.CapexPhaseColl[i].CapexPhaseTotal == NaN || $scope.CapexPhaseColl[i].CapexPhaseTotal == null) {
                  //  $scope.CapexPhaseTotal1 = "";
                    $scope.CapexPhaseColl[i].CapexPhaseTotal=0;
                }

                if ($scope.Escalation == null) {               
                  $scope.Escalation=0;
                }


                CapexPhaseTotal1 += ($scope.CapexPhaseColl[i].CapexPhaseTotal);

            }

            //    $scope.CapexPhaseTotal2=CapexPhaseTotal1/10000000;

            $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);

            $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);


        };


        // Count product (counter of unique product)
        var uniqueCount;


        $scope.ProdCount = function () {

            objppe = [];
            for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {

                for (var t = 0; t < $scope.CapexPhaseColl[z].ProdColl.length; t++) {


                    var a = $scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                    if (a != undefined && a !== "" && a != 0) {
                        objppe.push(a)
                    }
                }

                // filter unique value of array // arvind
                uniqueCount = new Set(objppe).size;
                console.log(uniqueCount);
                $scope.Productcount = uniqueCount;

            }
        }



      //  if (Phaseobj != null) {
            $scope.ProdColl = [];
            $scope.ProdColl.push({

                //"ddlProductName":0,
                "getProductame": $scope.getProductame,
                "ProductSubheading": '',
                "HideAddButtonMarket": false,
                "HideRemoveButton": true
            });
            $scope.CapexPhaseColl.push({

                "ProdColl": $scope.ProdColl,

                "CapexPhaseTotal": 0,
                "Phase": 1,
                " TriggerYear": '',
                " CompletionYear": '',
                "ddlProductName": 0,
                "getProductame": $scope.getProductame,
                "HideAddButtonMarket": false,
                "HideRemoveButton": false
            });



            if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
            }
            if ($scope.ProdColl.length > 0 && $scope.ProdColl.length <= 1) {
                $scope.ProdColl[$scope.ProdColl.length - 1].HideRemoveButtonMarket = true;
                $scope.ProdColl[$scope.ProdColl.length - 1].hidecountryRow = false;
            }

            // $scope.ProdCount = function () {
            //     var objppe = [];
            //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){

            //         for(var t =0;t<$scope.CapexPhaseColl[z].ProdColl.length;t++){

            //             var a=$scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

            //             objppe.push(a)


            //         }
            //     // if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
            //     //     for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
            //     //         console.log(objppe);
            //     //         var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
            //     //         objppe.push(a)
            //     //     }
            //     // }
            //     // $scope.ProdId = {
            //     //     "results": objppe
            //     // };

            //     // filter unique value of array // arvind
            //          uniqueCount = new Set(objppe).size;
            //             console.log(uniqueCount);
            //         $scope.Productcount=uniqueCount;          

            //         }
            //     }


      //  }



        $scope.AddPhaseRow = function (Phaseobj) {
            if (Phaseobj == null) {
                $scope.ProdColl = [];
                $scope.ProdColl.push({

                    //"ddlProductName":0,
                    "getProductame": $scope.getProductame,
                    "ProductSubheading": '',
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": true
                });
                $scope.CapexPhaseColl.push({

                    "ProdColl": $scope.ProdColl,

                    "CapexPhaseTotal": 0,
                    "Phase": 1,
                    " TriggerYear": '',
                    " CompletionYear": '',
                    "ddlProductName": 0,
                    "getProductame": $scope.getProductame,
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": false
                });



                if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
                }
                if ($scope.ProdColl.length > 0 && $scope.ProdColl.length <= 1) {
                    $scope.ProdColl[$scope.ProdColl.length - 1].HideRemoveButtonMarket = true;
                    $scope.ProdColl[$scope.ProdColl.length - 1].hidecountryRow = false;
                }

                // $scope.ProdCount = function () {
                //     var objppe = [];
                //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){

                //         for(var t =0;t<$scope.CapexPhaseColl[z].ProdColl.length;t++){

                //             var a=$scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                //             objppe.push(a)


                //         }
                //     // if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
                //     //     for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                //     //         console.log(objppe);
                //     //         var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                //     //         objppe.push(a)
                //     //     }
                //     // }
                //     // $scope.ProdId = {
                //     //     "results": objppe
                //     // };

                //     // filter unique value of array // arvind
                //          uniqueCount = new Set(objppe).size;
                //             console.log(uniqueCount);
                //         $scope.Productcount=uniqueCount;          

                //         }
                //     }


            }


            //

            //

            if (Phaseobj != null) {

                ///   AddPhaseRow
                $scope.ProdColl = [];
                $scope.ProdColl.push({
                    // "MarketId": 0,
                    // "Market": $scope.MarketColl,
                    // "SubMarket": $scope.subMarketColl,
                    // "SubMarketId": 0,

                    //"ProdColl": $scope.ProdColl,

                     //"ddlProductName":0,
                   // "ddlProductName": $scope.ProductMasterColl,
                    "ProductSubheading": '',
                    //    " TriggerYear":'',
                    //    " CompletionYear":'',
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": true
                });
                $scope.CapexPhaseColl.push({

                    "ProdColl": $scope.ProdColl,

                    "CapexPhaseTotal": 0,
                    "Phase": $scope.CapexPhaseColl.length + 1,
                    " TriggerYear": '',
                    " CompletionYear": '',
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": false
                });
                if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButtonMarket = true;
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
                }
                if ($scope.ProdColl.length > 0 && $scope.ProdColl.length <= 1) {
                    $scope.ProdColl[$scope.ProdColl.length - 1].HideRemoveButtonMarket = true;
                    $scope.ProdColl[$scope.ProdColl.length - 1].hidecountryRow = false;
                }

                // $scope.ProdCount = function () {
                //     var objppe = [];
                //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){

                //         for(var t =0;t<$scope.CapexPhaseColl[z].ProdColl.length;t++){

                //             var a=$scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                //             objppe.push(a)


                //         }
                //     // if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
                //     //     for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                //     //         console.log(objppe);
                //     //         var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                //     //         objppe.push(a)
                //     //     }
                //     // }
                //     // $scope.ProdId = {
                //     //     "results": objppe
                //     // };

                //     // filter unique value of array // arvind
                //          uniqueCount = new Set(objppe).size;
                //             console.log(uniqueCount);
                //         $scope.Productcount=uniqueCount;          

                //         }
                //     }
            }
        }




        $scope.AddProd = function (Phaseobj) {

            // for (var a = 0; a < $scope.CapexPhaseColl.length; a++) {
            //     for (var r = 0; r < $scope.CapexPhaseColl[a].ProdColl.length; r++) {
    
            //             if ($scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != undefined || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != '') {
            //            // if($scope.CapexPhaseColl[a].ProdColl.length>1){

            //                 if ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == '' || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == null) {
        
            //                     alert('Please provide the Product Sub-Heading!');
            //                     return false;
        
            //                 }
        
            //          //   }

            //             if ($scope.CapexPhaseColl[a].ProdColl.length >= 50) {
    
            //                 alert('Cannot add product more than 50!');
            //                 return false;
            //             }

            //         }

                  
    
            //             // if ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == '' || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == null) {
    
            //             //     alert('Please provide the Product Sub-Heading!');
            //             //     return false;
    
            //             // }
                    
    
                        
    
    
                   
            //     }
    
    
            // }

            if (Phaseobj == null) {
                // $scope.ProdColl = [];
                $scope.ProdColl.push({

                    // "ddlProductName":0,
                    "ddlProductName": $scope.ProductMasterColl,
                    "ProductSubheading": '',
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": false
                });

                if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
                }


            }


            if (Phaseobj != null) {

                $scope.CapexPhaseColl[Phaseobj.Phase - 1].ProdColl.push({

                    //"ddlProductName":0,
                    //"ddlProductName": $scope.ProductMasterColl,
                    "ProductSubheading": '',

                    "HideAddButtonMarket": false,
                    "HideRemoveButton": false,

                });
                // if( $scope.ProdColl.length==1){
                //     $scope.CapexPhaseColl[$scope.CapexPhaseColl.length].push({
                //         "ProdColl": $scope.ProdColl,
                //         "ddlProductName":0,
                //        " ProductSubheading": '',
                //         "HideAddButtonMarket": false,
                //         "HideRemoveButton": false
                //     });

                // }
                if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButtonMarket = true;
                    $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
                }

                // $scope.ProdCount = function () {
                //     var objppe = [];
                //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){

                //         for(var t =0;t<$scope.CapexPhaseColl[z].ProdColl.length;t++){

                //             var a=$scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                //             objppe.push(a)


                //         }
                //     // if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
                //     //     for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                //     //         console.log(objppe);
                //     //         var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                //     //         objppe.push(a)
                //     //     }
                //     // }
                //     // $scope.ProdId = {
                //     //     "results": objppe
                //     // };

                //     // filter unique value of array // arvind
                //          uniqueCount = new Set(objppe).size;
                //             console.log(uniqueCount);
                //         $scope.Productcount=uniqueCount;          

                //         }
                //     }
            }
        }






        $scope.removeAuditItem = function (Capex, $event) {
            $event.currentTarget.style.display = "none";

            var boolCapexValue = 'false'
            if ($scope.CapexPhaseColl.length > 1) {
                for (var r = 0; r <= $scope.CapexPhaseColl.length; r++) {
                    if (Capex.CapexPhaseTotal == ($scope.CapexPhaseColl[i].CapexPhaseTotal)) {

                        boolCapexValue = 'True';

                    }

                }
                if (boolCapexValue = 'True')

                    // $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(Capex.CapexPhaseTotal)/10000000;
                    $scope.CapexPhaseTotal2 = ($scope.CapexPhaseTotal2) - (Capex.CapexPhaseTotal);

                    $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);


            }
            //  $scope.Productcount=uniqueCount;     // counter of unique product

            var t = $scope.CapexPhaseColl.indexOf(Capex);
            $scope.CapexPhaseColl.splice(t, 1);

            if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideAddButton = false;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                $scope.showSubmit = true;
            } else {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideAddButton = false;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = false;
            }

            // $scope.setLoading(false);
            if ($scope.CapexPhaseColl.length > 0) {
                var objppe = [];
                for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {

                    for (var t = 0; t < $scope.CapexPhaseColl[z].ProdColl.length; t++) {


                        var a = $scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                        if (a != undefined && a !== "" && a != 0) {
                            objppe.push(a)
                        }
                    }

                    // filter unique value of array // arvind
                    uniqueCount = new Set(objppe).size;
                    console.log(uniqueCount);
                    $scope.Productcount = uniqueCount;
                }

            }

        }


       
 


        $scope.removeAuditItem1 = function (Capex, Prod, $event) {
            $event.currentTarget.style.display = "none";

            // var boolCapexValue = 'false'
            // if ($scope.ProdColl.length > 1) {
            //     for (var r = 0; r <= $scope.ProdColl.length; r++) {
            //         if (Capex.CapexPhaseTotal == parseFloat($scope.ProdColl[i].CapexPhaseTotal)) {
            //             boolCapexValue = 'True';
            //         }

            //     }
            
            //     if (boolCapexValue = 'True')

            //         //   $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(Capex.CapexPhaseTotal)/10000000
            //         $scope.CapexPhaseTotal2 = ($scope.CapexPhaseTotal2) - parseFloat(Capex.CapexPhaseTotal);

            //         $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);


            // }
            // // counter of unique product




            var objppe = [];



            var t = Capex.ProdColl.indexOf(Prod);
            Capex.ProdColl.splice(t, 1);

            if (Capex.ProdColl.length > 0 && Capex.ProdColl.length <= 1) {
                Capex.ProdColl[Capex.ProdColl.length - 1].HideAddButton = false;
                Capex.ProdColl[Capex.ProdColl.length - 1].HideRemoveButton = true;
                $scope.showSubmit = true;
            } else {
                Capex.ProdColl[Capex.ProdColl.length - 1].HideAddButton = false;
                Capex.ProdColl[Capex.ProdColl.length - 1].HideRemoveButton = false;
            }

            // Product Unique counts
            if ($scope.CapexPhaseColl.length > 0) {
                var objppe = [];
                for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {

                    for (var t = 0; t < $scope.CapexPhaseColl[z].ProdColl.length; t++) {


                        var a = $scope.CapexPhaseColl[z].ProdColl[t].ddlProductName

                        if (a != undefined && a !== "" && a != 0) {
                            objppe.push(a)
                        }
                    }

                    // filter unique value of array // arvind
                    uniqueCount = new Set(objppe).size;
                    console.log(uniqueCount);
                    $scope.Productcount = uniqueCount;
                }

            }



            //  $scope.setLoading(false);



        }



    });


    


$scope.InvalidBusinesscasename= function(x) {
    var reg = /^[^ | % # * ? < >/ | \\ \\\\: ; "" '']+$/;

    $scope.BusinesscaseNameLength=false;

          if (!x.match(reg)) {
          $scope.BusinessCaseName = x.substring(0, x.length-1);

          $scope.isValid=true;


          }
          else
          {
           $scope.isValid=false;
          }
          if( $scope.BusinessCaseName.length>19){
            $scope.BusinesscaseNameLength=true;
           

          }
  };





    //ON SUBMIT BUTTON:SAVE DATA IN 3 LIST
    $scope.onSubmit = function () {


       

 
        if ($scope.BusinessCaseName.length > 20) {

            alert('Business Case Name cannot be more than 20 characters.')
            return false;
        }

        if($scope.BusinessCaseName.length>0){

                //var regex = /^[A-Za-z0-9 ]+$/;
                // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
                var regex = /^[^ | % # ? < >/ | \ : ; "" '']+$/; //--update 

            //  var regex = /^[^ | ~ ` ! @ $ ^ & ( ) _ - + = } { ] [ . ,]+$/; //--new change 14-12-2023 10:14 am update 


                //var regex = /^[~`!@$^&()_-+=}{][.,]+$/; // new update




                
                //var regex = /\.([^.]*?)(?=\?|#|$)/;


            var isValid = regex.test($scope.BusinessCaseName);

            if (!isValid) {
                alert("Business Case Name should not contain special characters such as ["+regex+"]");
                console.log(isValid);

                return !isValid;
                console.log(isValid);
            }
            
        }

        //$scope.ProdCode = $('#ddlCapexContext1').text();

        $scope.contextHeader = $scope.CapexContextColl.filter(function (item) {
            return (item.Title == $scope.ddlCapexContext1);
        });
        $scope.ProdCode = $scope.contextHeader[0].Code;

        if ($scope.Escalation > 0) {

            if ($scope.EscalationRemarks == '' || $scope.EscalationRemarks == undefined || $scope.EscalationRemarks == null) {

                alert('Please provide the Escalation Remarks!');
                return false;
            }


        }


        
        if ($scope.Escalation == 0) 
        {
         $scope.EscalationRemarks="";
 
 
        }



        for (var a = 0; a < $scope.CapexPhaseColl.length; a++) {
            for (var r = 0; r < $scope.CapexPhaseColl[a].ProdColl.length; r++) {

                if ($scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != undefined || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != '') {

                    if (($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == '' && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null) || ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined  && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null)|| ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == null && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null)) {

                       alert('Please provide the Product Sub-Heading!');
                       return false;


                    }

                }

                // if ($scope.CapexPhaseColl[a].ProdColl.length <= 50) {

                //     alert('Cannot add product more than 50!');
                //     return false;
                // }
            }


        }









        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Title == $scope.SubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
        //  shortname = "ANDA" + shortname;
        //$scope.counter = parseInt($scope.counter) + 1;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
        ///$scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

        // "0001-ILCFTP_ATVR_Jul-2023"


        console.log($scope.CapexPhaseColl)
        var marklenght = $scope.CapexPhaseColl.length;
        // if (marklenght > 0) {
        //     marklenght = marklenght - 1;
        //     var countrylenght = $scope.CapexPhaseColl[marklenght].CountryRow.length;
        //     // if(countrylenght>0){
        //     //     countrylenght=countrylenght-1;
        //     //     var skulength= $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].length;

        //     if (countrylenght == 0) {
        //         alert('Please First Add Country Row');
        //         return false;
        //     }


        //     // }
        //     if (countrylenght > 0) {

        //         countrylenght = countrylenght - 1;



        //         for (var i = 0; i < $scope.CapexPhaseColl[marklenght].CountryRow.length; i++) {
        //             if ($scope.CapexPhaseColl[marklenght].CountryRow[i].Status == "" && $scope.CapexPhaseColl[marklenght].CountryRow[i].Country == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[i].CompletionYear == null && $scope.CapexPhaseColl[marklenght].CountryRow[i].LaunchDate == null && $scope.CapexPhaseColl[marklenght].CountryRow[i].Partner == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[i].Currency == "" && $scope.CapexPhaseColl[marklenght].CountryRow[i].PartnerDesc == "") {
        //                 alert('First Fill All Fields In Country')
        //                 return false;

        //             } else if ($scope.CapexPhaseColl[marklenght].CountryRow[i].Status == "" || $scope.CapexPhaseColl[marklenght].CountryRow[i].Country == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[i].CompletionYear == null || $scope.CapexPhaseColl[marklenght].CountryRow[i].LaunchDate == null || $scope.CapexPhaseColl[marklenght].CountryRow[i].Partner == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[i].Currency == "" || $scope.CapexPhaseColl[marklenght].CountryRow[i].PartnerDesc == "") {
        //                 alert('First Fill All Fields In Country')
        //                 return false;

        //             }
        //         }
        //         var skulength = $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow.length;

        //         if (skulength == 0) {
        //             alert('Please First Add SKU Row');
        //             return false;
        //         }

        //         for (var i = 0; i < $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
        //             if ($scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
        //                 alert('First Fill All Fields In SKU')
        //                 return false;

        //             } else if ($scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
        //                 alert('First Fill All Fields In SKU')
        //                 return false;

        //             }
        //         }


        //     }

        // }

        // $scope.FinalCountryLaunchColl = [];
        // $scope.FinalSKUColl = [];
        // for (var i = 0; i < $scope.CapexPhaseColl.length; i++) {
        //     for (var j = 0; j < $scope.CapexPhaseColl[i].CountryRow.length; j++) {
        //         $scope.FinalCountryLaunchColl.push($scope.CapexPhaseColl[i].CountryRow[j]);
        //     }
        // }
        // for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
        //     for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
        //         $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

        //     }
        // }


        //Fetechin User from role master based on   Reviewer,  Initiator,
        // var pplInitiator = [];
        // var pplReviewer = [];
        // var pplValidator = [];
        // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
        //     $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Initiator');
        //     });
        //     $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Reviewer');
        //     });
        //     $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Validator');
        //     });
        //     if ($scope.fiterdInitiatorMember.length > 0) {
        //         pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
        //         }
        //     if ($scope.fiterdReviewerMember.length > 0) {
        //         pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
        //     }
        //     if ($scope.fiterdValidatorMember.length > 0) {
        //         pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
        //     }
        //     if(pplInitiator.length==0)
        //     {
        //         alert("No Initiator Group Found")
        //         return false;
        //     }
        //     if(pplReviewer.length==0)
        //     {
        //         alert("No Reviewer Group Found")
        //         return false;
        //     }
        //     if(pplValidator.length==0)
        //     {
        //         alert("No Validator Group Found")
        //         return false;
        //     }
        // }


        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
        // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
        $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Initiator');
        });
        $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Reviewer');
        });
        $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Validator');
        });
        if ($scope.fiterdInitiatorMember.length > 0) {
            pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
        }
        if ($scope.fiterdReviewerMember.length > 0) {
            pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
        }
        if ($scope.fiterdValidatorMember.length > 0) {
            pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
        }
        if (pplInitiator.length == 0) {
            alert("No Initiator Group Found")
            return false;
        }
        if (pplReviewer.length == 0) {
            alert("No Reviewer Group Found")
            return false;
        }
        if (pplValidator.length == 0) {
            alert("No Validator Group Found")
            return false;
        }
        //  }



        // var objppe = [];
        // if ($scope.selectedContTypeDes.length > 0) {
        //     for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
        //         console.log(objppe);
        //         var a = $scope.selectedContTypeDes[i].id;
        //         objppe.push(a)
        //     }
        // }
        // $scope.DossageId = {
        //     "results": objppe
        // };

        //     var objppe = [];
        //     var uniqueCount;
        //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){
        //     if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
        //         for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
        //             console.log(objppe);
        //             var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
        //             objppe.push(a)
        //         }
        //     }
        //     $scope.ProdId = {
        //         "results": objppe
        //     };




        //  uniqueCount = new Set(objppe).size;
        //  console.log(uniqueCount);
        //  $scope.Productcount=uniqueCount;    
        // }




        $scope.isLoading=true;

        // $scope.IsDisabled = true;

        if($scope.CapexPhaseTotal2=="" || $scope.CapexPhaseTotal2==null || $scope.CapexPhaseTotal2==undefined){

            $scope.CapexPhaseTotal2=0;
        }
        if($scope.Escalation=="" || $scope.Escalation==null || $scope.Escalation==undefined){

            $scope.Escalation=0;
        }
      //  parseFloat($scope.Escalation),
        var CapexValue = parseFloat($scope.CapexPhaseTotal2);
        var strCapexBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items";
        var CapexBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.CapexBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.SubStrategyId,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            NumberOfProducts: $scope.Productcount,         //   DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            CaseStageId: $scope.StageMasterColl[0].Id,
            CaseStatus: "Initiated",
            Counter: $scope.counter,
            Escalation: parseFloat($scope.Escalation),
            EscalationRemarks: $scope.EscalationRemarks,
            SiteId: $scope.ddlSite,
            BCCompletionYear: $scope.auditDate,
            CapexCurrencyId: $scope.CapexCurrency,
            BusinessCaseDescription: $scope.BusinessCaseDescription,
            BlockName: $scope.BlockName,
            ProductNameId: $scope.ProdId,
            CapexContextId: $scope.contextHeader[0].Id,
            CapexContextCodeId: $scope.contextHeader[0].Id,



            //  CapexCurrency:$scope.ddlCapexCurrency,
            CapexValue: CapexValue,
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },

            ValidatorsId: {
                'results': pplValidator
            },
            VersionNo: "1.0",
            LapVersion:"V0"

        };
        Logics.addData(strCapexBusinessCaseURL, CapexBusinessCaseData).then(function (CapexBusCaseData) {
            $scope.CapexBusinessCaseIntID = CapexBusCaseData.data.d.Id;
            console.log($scope.CapexBusinessCaseIntID);
            $scope.CapexPhaseDetails();
            $scope.isLoading=false;
            alert("Business Case Saved Successfully!!");
            $location.path("/InitiatorCAPEXDash");

        });

    }


    $scope.onSaveAsDraft = function () {


       

 
        if ($scope.BusinessCaseName.length > 20) {

            alert('Business Case Name cannot be more than 20 characters.')
            return false;
        }

        if($scope.BusinessCaseName.length>0){

                //var regex = /^[A-Za-z0-9 ]+$/;
                // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
                var regex = /^[^ | % # ? < >/ | \ : ; "" '']+$/; //--update 

            //  var regex = /^[^ | ~ ` ! @ $ ^ & ( ) _ - + = } { ] [ . ,]+$/; //--new change 14-12-2023 10:14 am update 


                //var regex = /^[~`!@$^&()_-+=}{][.,]+$/; // new update




                
                //var regex = /\.([^.]*?)(?=\?|#|$)/;


            var isValid = regex.test($scope.BusinessCaseName);

            if (!isValid) {
                alert("Business Case Name should not contain special characters such as ["+regex+"]");
                console.log(isValid);

                return !isValid;
                console.log(isValid);
            }
            
        }
      
        
        //$scope.ProdCode = $('#ddlCapexContext1').text();

        $scope.contextHeader = $scope.CapexContextColl.filter(function (item) {
            return (item.Title == $scope.ddlCapexContext1);
        });
        $scope.ProdCode = $scope.contextHeader[0].Code;

        if ($scope.Escalation > 0) {

            if ($scope.EscalationRemarks == '' || $scope.EscalationRemarks == undefined || $scope.EscalationRemarks == null) {

                alert('Please provide the Escalation Remarks!');
                return false;
            }


        }

        // for (var a = 0; a < $scope.CapexPhaseColl.length; a++) {
        //     for (var r = 0; r < $scope.CapexPhaseColl[a].ProdColl.length; r++) {

        //         if ($scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != undefined || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != '') {

        //             if ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == '' || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined || $scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == null) {

        //                alert('Please provide the Product Sub-Heading!');
        //                return false;


        //             }

        //         }

        //         // if ($scope.CapexPhaseColl[a].ProdColl.length <= 50) {

        //         //     alert('Cannot add product more than 50!');
        //         //     return false;
        //         // }
        //     }


        // }

        for (var a = 0; a < $scope.CapexPhaseColl.length; a++) {
            for (var r = 0; r < $scope.CapexPhaseColl[a].ProdColl.length; r++) {

                if ($scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != undefined || $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != '') {

                    if (($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == '' && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null) || ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined  && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null)|| ($scope.CapexPhaseColl[a].ProdColl[r].ProductSubheading == null && $scope.CapexPhaseColl[a].ProdColl[r].ddlProductName != null)) {

                       alert('Please provide the Product Sub-Heading!');
                       return false;


                    }

                }

                // if ($scope.CapexPhaseColl[a].ProdColl.length <= 50) {

                //     alert('Cannot add product more than 50!');
                //     return false;
                // }
            }


        }










        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Title == $scope.SubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
        //  shortname = "ANDA" + shortname;
        //$scope.counter = parseInt($scope.counter) + 1;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
        ///$scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

        // "0001-ILCFTP_ATVR_Jul-2023"


        console.log($scope.CapexPhaseColl)
        var marklenght = $scope.CapexPhaseColl.length;
        // if (marklenght > 0) {
        //     marklenght = marklenght - 1;
        //     var countrylenght = $scope.CapexPhaseColl[marklenght].CountryRow.length;
        //     // if(countrylenght>0){
        //     //     countrylenght=countrylenght-1;
        //     //     var skulength= $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].length;

        //     if (countrylenght == 0) {
        //         alert('Please First Add Country Row');
        //         return false;
        //     }


        //     // }
        //     if (countrylenght > 0) {

        //         countrylenght = countrylenght - 1;



        //         for (var i = 0; i < $scope.CapexPhaseColl[marklenght].CountryRow.length; i++) {
        //             if ($scope.CapexPhaseColl[marklenght].CountryRow[i].Status == "" && $scope.CapexPhaseColl[marklenght].CountryRow[i].Country == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[i].CompletionYear == null && $scope.CapexPhaseColl[marklenght].CountryRow[i].LaunchDate == null && $scope.CapexPhaseColl[marklenght].CountryRow[i].Partner == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[i].Currency == "" && $scope.CapexPhaseColl[marklenght].CountryRow[i].PartnerDesc == "") {
        //                 alert('First Fill All Fields In Country')
        //                 return false;

        //             } else if ($scope.CapexPhaseColl[marklenght].CountryRow[i].Status == "" || $scope.CapexPhaseColl[marklenght].CountryRow[i].Country == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[i].CompletionYear == null || $scope.CapexPhaseColl[marklenght].CountryRow[i].LaunchDate == null || $scope.CapexPhaseColl[marklenght].CountryRow[i].Partner == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[i].Currency == "" || $scope.CapexPhaseColl[marklenght].CountryRow[i].PartnerDesc == "") {
        //                 alert('First Fill All Fields In Country')
        //                 return false;

        //             }
        //         }
        //         var skulength = $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow.length;

        //         if (skulength == 0) {
        //             alert('Please First Add SKU Row');
        //             return false;
        //         }

        //         for (var i = 0; i < $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
        //             if ($scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
        //                 alert('First Fill All Fields In SKU')
        //                 return false;

        //             } else if ($scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.CapexPhaseColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
        //                 alert('First Fill All Fields In SKU')
        //                 return false;

        //             }
        //         }


        //     }

        // }

        // $scope.FinalCountryLaunchColl = [];
        // $scope.FinalSKUColl = [];
        // for (var i = 0; i < $scope.CapexPhaseColl.length; i++) {
        //     for (var j = 0; j < $scope.CapexPhaseColl[i].CountryRow.length; j++) {
        //         $scope.FinalCountryLaunchColl.push($scope.CapexPhaseColl[i].CountryRow[j]);
        //     }
        // }
        // for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
        //     for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
        //         $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

        //     }
        // }


        //Fetechin User from role master based on   Reviewer,  Initiator,
        // var pplInitiator = [];
        // var pplReviewer = [];
        // var pplValidator = [];
        // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
        //     $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Initiator');
        //     });
        //     $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Reviewer');
        //     });
        //     $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Validator');
        //     });
        //     if ($scope.fiterdInitiatorMember.length > 0) {
        //         pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
        //         }
        //     if ($scope.fiterdReviewerMember.length > 0) {
        //         pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
        //     }
        //     if ($scope.fiterdValidatorMember.length > 0) {
        //         pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
        //     }
        //     if(pplInitiator.length==0)
        //     {
        //         alert("No Initiator Group Found")
        //         return false;
        //     }
        //     if(pplReviewer.length==0)
        //     {
        //         alert("No Reviewer Group Found")
        //         return false;
        //     }
        //     if(pplValidator.length==0)
        //     {
        //         alert("No Validator Group Found")
        //         return false;
        //     }
        // }


        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
        // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
        $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Initiator');
        });
        $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Reviewer');
        });
        $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Validator');
        });
        if ($scope.fiterdInitiatorMember.length > 0) {
            pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
        }
        if ($scope.fiterdReviewerMember.length > 0) {
            pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
        }
        if ($scope.fiterdValidatorMember.length > 0) {
            pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
        }
        if (pplInitiator.length == 0) {
            alert("No Initiator Group Found")
            return false;
        }
        if (pplReviewer.length == 0) {
            alert("No Reviewer Group Found")
            return false;
        }
        if (pplValidator.length == 0) {
            alert("No Validator Group Found")
            return false;
        }
        //  }



        // var objppe = [];
        // if ($scope.selectedContTypeDes.length > 0) {
        //     for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
        //         console.log(objppe);
        //         var a = $scope.selectedContTypeDes[i].id;
        //         objppe.push(a)
        //     }
        // }
        // $scope.DossageId = {
        //     "results": objppe
        // };

        //     var objppe = [];
        //     var uniqueCount;
        //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){
        //     if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
        //         for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
        //             console.log(objppe);
        //             var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
        //             objppe.push(a)
        //         }
        //     }
        //     $scope.ProdId = {
        //         "results": objppe
        //     };




        //  uniqueCount = new Set(objppe).size;
        //  console.log(uniqueCount);
        //  $scope.Productcount=uniqueCount;    
        // }






        // $scope.IsDisabled = true;

       

        if($scope.CapexPhaseTotal2=="" || $scope.CapexPhaseTotal2==null || $scope.CapexPhaseTotal2==undefined){

            $scope.CapexPhaseTotal2=0;
        }
        if($scope.Escalation=="" || $scope.Escalation==null || $scope.Escalation==undefined){

            $scope.Escalation=0;
        }
        var CapexValue = parseFloat($scope.CapexPhaseTotal2);

        var strCapexBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items";
        var CapexBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.CapexBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.SubStrategyId,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            NumberOfProducts: $scope.Productcount,         //   DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            CaseStageId: $scope.StageMasterColl[0].Id,
            CaseStatus: "Draft",
            Counter: $scope.counter,
            Escalation: parseFloat($scope.Escalation),
            EscalationRemarks: $scope.EscalationRemarks,
            SiteId: $scope.ddlSite,
            BCCompletionYear: $scope.auditDate,
            CapexCurrencyId: $scope.CapexCurrency,
            BusinessCaseDescription: $scope.BusinessCaseDescription,
            BlockName: $scope.BlockName,
            ProductNameId: $scope.ProdId,
            CapexContextId: $scope.contextHeader[0].Id,
            CapexContextCodeId: $scope.contextHeader[0].Id,



            //  CapexCurrency:$scope.ddlCapexCurrency,
            CapexValue: CapexValue,
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },

            ValidatorsId: {
                'results': pplValidator
            },
            // VersionNo: "1.0"

        };
        Logics.addData(strCapexBusinessCaseURL, CapexBusinessCaseData).then(function (CapexBusCaseData) {
            $scope.CapexBusinessCaseIntID = CapexBusCaseData.data.d.Id;
            console.log($scope.CapexBusinessCaseIntID);
            $scope.CapexPhaseDetails();
            alert("Business Case Saved Successfully!!");
            $location.path("/InitiatorCAPEXDash");

        });

    }





    $scope.CapexPhaseDetails = function () {

        var deferred = $q.defer();
        var noOfLaunchIndex = 0;
        var insertCountryBatch = [];
        var insertSKUDetailsBatch = [];
        $scope.AddedLaunchids = [];
        var insertCountryBatch = [];
        $scope.AddedLaunchids = [];
        for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {
            noOfLaunchIndex++;
            var launchTitle = $scope.BUTitle + "-Phase-" + noOfLaunchIndex;//
            $scope.TriggerYear = new Date(($scope.CapexPhaseColl[z].TriggerYear).format("dd-MM-yyyy"));//$scope.CapexPhaseColl[z].CompletionYear.format("dd-MM-yyyy")
            $scope.CompletionYear = new Date(($scope.CapexPhaseColl[z].CompletionYear).format("dd-MM-yyyy"));


            insertCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.CapexPhaseDetailsListItem"
                    },
                    Title: launchTitle,

                    TriggerYear: new Date($scope.CapexPhaseColl[z].TriggerYear),
                    CompletionYear: new Date($scope.CapexPhaseColl[z].CompletionYear),
                    PhaseTotal: $scope.CapexPhaseColl[z].CapexPhaseTotal,
                    Phase:parseInt(z+1),
                    CapexBusinessCaseId: $scope.CapexBusinessCaseIntID
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);
            var s = insertedLaunchData.length;



            console.log($scope.CapexPhaseBusinessCaseIntID);
            // $scope.SkuDetails = function () {
            //     var deferred = $q.defer();
            var insertSKUDetailsBatch = [];
            var index = 0;
            for (var l = 0; l < s; l++) {
                $scope.CapexPhaseBusinessCaseIntID = insertedLaunchData[l].d.Id;

                for (var i = 0; i < $scope.CapexPhaseColl[l].ProdColl.length; i++) {
                 //   var ob=parseInt(i) + parseInt(1);
                    // index++;
                    // var getLaunchID = AddedLaunchids.filter(function (item) {
                    //     return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
                    //   });
                    // console.log(getLaunchID);


                    insertSKUDetailsBatch.push({
                        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items",
                        action: "ADD",
                        async: false,
                        data: {
                            __metadata: {
                                type: "SP.Data.CapexProductDetailsListItem"
                            },
                            ProductNameId: $scope.CapexPhaseColl[l].ProdColl[i].ddlProductName,
                            ProductSubheading: $scope.CapexPhaseColl[l].ProdColl[i].ProductSubheading,
                            // CapexPhaseId: getLaunchID[0].LunchID,
                            CapexBusinessCaseId: $scope.CapexBusinessCaseIntID,
                            CapexPhaseId: $scope.CapexPhaseBusinessCaseIntID

                        }
                    });
                }
            }

            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
                // alert("Business Case Saved Successfully!!");
                // $location.path("/InitiatorCAPEXDash");

                // console.log(insertedLaunchData);
                // if (index == $scope.FinalSKUColl.length) {


                //     // var alertMessage = "Request has been submitted";
                //     // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorCAPEXDash");
                //     // Utilities.closeDialogBox();

                deferred.resolve();
                // }
            });
            return deferred.promise;

        });
        //  return deferred.promise;

    }


    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorCAPEXDash");

    }
});