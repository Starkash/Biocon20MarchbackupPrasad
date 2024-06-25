appOperations.controller("AddAndaLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    $scope.CurrDate = new Date();
    $scope.disabledFlag=false;
    $scope.selectedContTypeDes = [];
    $scope.LOEdateDatePopUp = {
        opened: false,
    };
    $scope.openLOEDate = function (countryRow) {
        //  $scope.LOEdateDatePopUp.opened = true;
        countryRow.IsOpenDate = true;
    };

    $scope.LOEDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    $scope.FillingdateDatePopUp = {
        opened: false,
    };
    $scope.openFillingDate = function (countryRow) {
        // $scope.FillingdateDatePopUp.opened = true;
        countryRow.IsOpenDate2 = true;
    };
    $scope.FillingDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    $scope.LaunchdateDatePopUp = {
        opened: false,
    };
    $scope.openLaunchDate = function (countryRow) {
        //$scope.LaunchdateDatePopUp.opened = true;
        countryRow.IsOpenDate3 = true;

    };
    $scope.LaunchDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    //var abc='ANDA - Inhouse US + MoW';
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=(Title eq '"+encodeURIComponent('ANDA - Inhouse US + MoW')+"')&$top=5000&$orderby=ID asc";
    // var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$&$filter=SubStrategy eq 'Fixed TP/FP'top=5000&$orderby=ID";
    //var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'OutLicensing (ANDA)'&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$orderby=ID";

    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$filter=Title eq 'US' or Title eq 'MOW' &$orderby=ID";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
   // var strANDABUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strANDABUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?&$select=Id,Title,Modified,LapVersion,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$top=5000&$orderby=Modified desc";

    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    var strANDABULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaLicensingLaunchDetails')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
   
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=(TemplateType eq '"+encodeURIComponent('ANDA - Inhouse US + MoW')+"')&$top=5000&$orderby=ID asc";
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('StageMaster')/items?$select=*&$filter=Title eq 'Initiated'&$top=100&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading

    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
   // var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,OutLicensingBusinessCase&$orderby=ID desc&$top=1000";
  // var strBusinessCaseANDADocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ANDALicensingBusinessCaseDocuments')/items?$select=*&$top=1000&$orderby=ID"; // cascading

  var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
  var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading


  var strInnovatorMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InnovatorMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading

  var strFillingTypeMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FillingTypeMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading


    $scope.setting5 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll: true
        //showUncheckAll:false
    };


    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strANDABUCaseUrl, strPartnerUrl, strANDABULaunchUrl, strRoleMasterUrl, strStageMasterUrl, strSkuMasterUrl,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strInnovatorMasterUrl,strFillingTypeMasterUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        function callMultiSelect(argument) {
            $('#ddnmembers').fSelect();
            // $('#ddnRJmembers').fSelect();
        }
        $scope.newMarketRow1Coll = [];
        $scope.StrategyColl = batchedData[0].d.results;
        $scope.SubStrategyColl = batchedData[1].d.results;
        $scope.ProductCategoryColl = batchedData[2].d.results;
        $scope.ProductMasterColl = batchedData[3].d.results;
        $scope.MarketColl = batchedData[4].d.results;
        $scope.CountryColl = batchedData[5].d.results;
        $scope.DosageColl = batchedData[6].d.results;
        $scope.subMarketColl = batchedData[7].d.results;
        $scope.ANDABUCaseColl = batchedData[8].d.results;
        $scope.PartnerColl = batchedData[9].d.results;
        $scope.ANDALaunchColl = batchedData[10].d.results;
        $scope.RoleMasterColl = batchedData[11].d.results;
        $scope.StageMasterColl = batchedData[12].d.results;
        $scope.SkuMasterColl = batchedData[13].d.results;
        $scope.PackingMasterColl = batchedData[14].d.results;
        $scope.CurrentStatusMasterColl = batchedData[15].d.results;
        $scope.CurrencyMasterColl = batchedData[16].d.results;

        $scope.InnovatorColl = batchedData[17].d.results;


        $scope.FilingTypeColl = batchedData[18].d.results;


    //    $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl = batchedData[17].d.results;


        if ($scope.StrategyColl.length > 0) {
            $scope.ddlStrategy = $scope.StrategyColl[0].Id;
            $scope.ddlStrategyANDA = $scope.StrategyColl[0].Title;

            
        }
        if ($scope.SubStrategyColl.length > 0) {
            $scope.SubStrategyColl = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });

        }

         /// Email Trigger 



        //  $scope.InitiatorsGroupsName = [];
        //  $scope.ReviewersGroupsName = [];
        //  $scope.ValidatorsGroupsName = [];
 
        //  for (let m = 0; m < $scope.ANDABUCaseColl[0].Initiators.results.length; m++) {
        //      $scope.InitiatorsGroupsName.push($scope.ANDABUCaseColl[0].Initiators.results[m].Title);
        //  }
        //  for (let m = 0; m < $scope.ANDABUCaseColl[0].Reviewers.results.length; m++) {
        //      $scope.ReviewersGroupsName.push($scope.ANDABUCaseColl[0].Reviewers.results[m].Title);
        //  }
        //  for (let m = 0; m < $scope.ANDABUCaseColl[0].Validators.results.length; m++) {
        //      $scope.ValidatorsGroupsName.push($scope.ANDABUCaseColl[0].Validators.results[m].Title);
        //  }
 
 
 
         ///
         
        
        $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;


        var counter;
        var vRetVal;
        if ($scope.ANDABUCaseColl.length > 0) {
            var Logg = $scope.ANDABUCaseColl[0].Title;
            if (Logg == null) {
                counter = 0;
            } else {
                // BIOCON-OUT-LIC-1
                var Result = Logg.split("-");
                $scope.counter = Result[0];
                $scope.counter = parseInt($scope.counter) + 1;

            }
        } else {
            $scope.counter = "000";
        }
        // counter = parseInt(counter) + 1;
        // $scope.BUTitle = vRetVal;
        var i = 0;
        $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString()
        $scope.dosagessColl = [];

        for (var n = 0; n < $scope.DosageColl.length; n++) {
            $scope.finalppcommoditycoll = [{
                "label": $scope.DosageColl[n].Title,
                "id": $scope.DosageColl[n].Id

            }];
            console.log($scope.finalppcommoditycoll);
            $scope.dosagessColl.push($scope.finalppcommoditycoll[0]);

        }

        //BIND STARGEY DROPDOWN
        $scope.bindstrategy = function (ddlStrategy) {
            $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
        }
        //BIND PRODUCT DROPDOWN    
        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
            $scope.ProdCode = $scope.getProductame[0].ProductCode;
            //$scope.addMarketRow(null)
        };
        // $scope.addMarketRow = function (marketObj) {
        //     $scope.newCounryRow1Coll = [];
        //     $scope.newMarketRow1Coll.push({
        //         "MarketId": 0,
        //         "Market": $scope.MarketColl,
        //         "SubMarket": $scope.subMarketColl,
        //         "SubMarketId": 0,
        //         "CountryRow": $scope.newCounryRow1Coll,
        //         "HideAddButtonMarket": false,
        //         "HideRemoveButtonMarket": false
        //     });
        //     if ($scope.newMarketRow1Coll.length > 3) {
        //         alert("Can not Add more than 3 Market");
        //         return false;


        //     }
        //     if ($scope.newMarketRow1Coll.length > 0 && $scope.newMarketRow1Coll.length <= 1) {
        //         $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideRemoveButtonMarket = true;
        //     }
        // }

        $scope.addMarketRow = function (marketObj) {
            if (marketObj == null) {
                $scope.newCounryRow1Coll = [];
                $scope.newMarketRow1Coll.push({
                    "MarketId": 0,
                    "Market": $scope.MarketColl,
                    "SubMarket": $scope.subMarketColl,
                    "SubMarketId": 0,
                    "CountryRow": $scope.newCounryRow1Coll,
                    "HideAddButtonMarket": false,
                    "HideRemoveButtonMarket": false
                });
                if ($scope.newMarketRow1Coll.length > 0 && $scope.newMarketRow1Coll.length <= 1) {
                    $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideRemoveButtonMarket = true;
                    $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].hidecountryRow = false;
                }
            }
            if (marketObj != null) {
                if (marketObj.ddlmarket == undefined && marketObj.MarketId == 0) {
                    alert("Select Market  first")
                    return false
                }
                if (marketObj.ddlSubMarket == undefined && marketObj.SubMarketId == 0) {
                    alert("Select  sub market first")
                    return false
                }

                var marLen = $scope.newMarketRow1Coll.length - 1;
                if ($scope.newMarketRow1Coll[marLen].CountryRow.length == 0) {
                    $scope.newMarketRow1Coll[marLen].hidecountryRow = true;
                    $scope.bindCountryRow(null);

                } else {
                  var  ddlmarket=$scope.newMarketRow1Coll[marLen].ddlmarket
                    var counLen = $scope.newMarketRow1Coll[marLen].CountryRow.length - 1;
                    $scope.newMarketRow1Coll[marLen].CountryRow[counLen].MarketId=ddlmarket;
                    var skulLen = $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow.length;
                    for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                        if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null &&  $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" ) {
                            alert('First Fill All Fields In Country')
                            return false;

                        } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null  || $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" ) {
                            alert('First Fill All Fields In Country')
                            return false;

                        }
                    }
                    if (skulLen == 0) {
                        alert('First Add SKU  Details ')
                        return false;
                    }
                    if (skulLen > 0) {
                        for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow.length; i++) {
                            if ($scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            } else if ($scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            }
                        }
                        $scope.newCounryRow1Coll = [];
                        $scope.newMarketRow1Coll.push({
                            "MarketId": 0,
                            "Market": $scope.MarketColl,
                            "SubMarket": $scope.subMarketColl,
                            "SubMarketId": 0,
                            "CountryRow": $scope.newCounryRow1Coll,
                            "HideAddButtonMarket": false,
                            "HideRemoveButtonMarket": false
                        });
                    }
                }

            }

            if ($scope.newMarketRow1Coll.length > 3) {
                alert("You can add only 3 Markets");
                return false;
            }



        }


        //BIND COUNTRY DROPDOWN  BASED ON SELECTION OF PRODUCT  
        $scope.bindCountry = function (ddlStrategy) {
            $scope.filteredCountryColl = $scope.CountryColl.filter(function (item) {
                return (item.MarketNameId == ddlStrategy);
            });
            console.log($scope.newMarketRow1Coll.length);

        }


        //BIND COUNTRY ROW  DETAILS    
        $scope.bindCountryRow = function (marketObj) {
            var marLen;
            marLen = $scope.newMarketRow1Coll.length - 1;

            if (marketObj == null) {
                var newSKUDetails1Coll = [];
                $scope.newCounryRow1Coll.push({
                    "LOEDate": null, //moment(moment(new Date()).startOf('isoWeek')._d).format('DD-MMM-YYYY')
                    "FillingDate": null,
                    "MarketId": $scope.newMarketRow1Coll[marLen].ddlmarket,
                    "Market": 0,
                    "SubMarketId": $scope.newMarketRow1Coll[marLen].ddlSubMarket,
                    "Market": $scope.MarketColl,
                    "SubMarket": $scope.subMarketColl,
                    "LaunchDate": null,
                    "PartnerDesc": "",
                    "Partner": 0,
                    "PartnerColl": $scope.PartnerColl,


                    "NoofGenericFiller": 0,
                    "FilingType": 0,
                    "FilingTypeColl": $scope.FilingTypeColl,
                    


                    "Currency":0,
                    "CurrencyColl": $scope.CurrencyMasterColl,
                    "Status": 0,
                    "StatusColl": $scope.CurrentStatusMasterColl ,
                    "Country": 0,
                    "CountryID": 0,
                    "CountryColl":$scope.CountryColl,// $scope.filteredCountryColl,
                    "HideAddButtonCountryRow": false,
                    "HideRemoveButtonCountryRow": false,
                    "SKURow": newSKUDetails1Coll,
                    //"HideRemoveButton": false
                    "IsOpenDate": false,
                    "IsOpenDate2": false,
                    "IsOpenDate3": false



                });
            } else {
                if ($scope.newMarketRow1Coll.length > 0) {
                    var Countleng = $scope.newMarketRow1Coll[marLen].CountryRow.length; //0
                    var finalcounLen = $scope.newMarketRow1Coll[marLen].CountryRow.length - 1;

                    if (Countleng >= 0 && Countleng <= 2) {
                        for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                            if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" ) {
                                alert('First Fill All Fields In Country')
                                return false;

                            } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null ||  $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" ) {
                                alert('First Fill All Fields In Country')
                                return false;

                            }
                        }

                    }


                    var skulLen = $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow.length;

                    if (skulLen > 0) {
                        for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow.length; i++) {
                            if ($scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            } else if ($scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            }
                        }
                     //CHANGE DATE 08-09-2023 ARVIND COMMENT IT 
                        // if (Countleng == 2) {
                        //     alert("You can add only 5 Countries");
                        //     return false;
                        // }
                        // if (Countleng != 2) {
                         if (Countleng != 20) {
                            var newSKUDetails1Coll = [];
                            $scope.newCounryRow1Coll.push({
                                "LOEDate": null, //moment(moment(new Date()).startOf('isoWeek')._d).format('DD-MMM-YYYY')
                                "FillingDate": null,
                                "MarketId": $scope.newMarketRow1Coll[marLen].ddlmarket,
                                "Market": 0,
                                "SubMarketId": $scope.newMarketRow1Coll[marLen].ddlSubMarket,
                                "Market": $scope.MarketColl,
                                "SubMarket": $scope.subMarketColl,
                                "LaunchDate": null,
                                "PartnerDesc": "",
                                "Partner": 0,
                                "PartnerColl": $scope.PartnerColl,


                                "NoofGenericFiller": 0,
                                "FilingType": 0,
                                "FilingTypeColl": $scope.FilingTypeColl,
                                
                              
                                "Currency":0,
                                "CurrencyColl": $scope.CurrencyMasterColl,
                                "Status": 0,
                                "StatusColl": $scope.CurrentStatusMasterColl ,
                                "Country": 0,
                                "CountryID": 0,
                                "CountryColl":$scope.CountryColl,// $scope.filteredCountryColl,
                                "HideAddButtonCountryRow": false,
                                "HideRemoveButtonCountryRow": false,
                                "SKURow": newSKUDetails1Coll,
                                //"HideRemoveButton": false
                                "IsOpenDate": false,
                                "IsOpenDate2": false,
                                "IsOpenDate3": false
                            });
                        }
                    } else {
                        var newSKUDetails1Coll = [];
                        $scope.addSKUDetailsRow1()
                    }
                }
            }
            $scope.newMarketRow1Coll[marLen].CountryRow = $scope.newCounryRow1Coll
            if ($scope.newMarketRow1Coll[marLen].CountryRow.length > 0 && $scope.newMarketRow1Coll[marLen].CountryRow.length <= 1) {
                $scope.newMarketRow1Coll[marLen].CountryRow[$scope.newMarketRow1Coll[marLen].CountryRow.length - 1].HideRemoveButtonCountryRow = true;
            }
            //

        }
        //BIND SKU DETAILS ROW 1 DETAILS    
        // $scope.bindSKUDetailRow1 = function () {
        //     if ($scope.newMarketRow1Coll.length == 1) {
        //         $scope.addSKUDetailsRow1()
        //     }
        //     else {
        //         $scope.addSKUDetailsRow1()
        //     }
        // }
        //ADD SKU DETAILS ROW 1 
        $scope.addSKUDetailsRow1 = function (marketObj, index, exist) {
            var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length - 1; //0

            var newSKUDetails1Coll = [];
            newSKUDetails1Coll.push({
                // "SNo":index,
                "SKUCountry": $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].Country,
                "SKUQunatity": null,
                // "SKUUnit": "",
                "SKUUnit": 0,
                //  "SkuMaster": $scope.SkuMasterColl,
                "PackSize": null,
                "PackingType": 0,
                "HideAddButtonSKURow": false,
                "HideRemoveButtonSKURow": false
            });
            if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == undefined || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == 0) {
                var newSKUDetails1Coll = [];
                newSKUDetails1Coll.push({
                    // "SNo":index,
                    "SKUCountry": $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].Country,
                    "SKUQunatity": null,
                    "SKUUnit": 0,
                    // "SkuMaster": $scope.SkuMasterColl,
                    "PackSize": null,
                    "PackingType": 0,
                    "HideAddButtonSKURow": false,
                    "HideRemoveButtonSKURow": false
                });
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll;

            } else {
                var SKUleng = $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; //0
                if (SKUleng == 0) {
                    $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll
                } else if (SKUleng >= 20) {
                    for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
                        if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;

                        } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;

                        }
                    }
                    $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideAddButtonSKURow = true;
                    alert("You can add only 20 SKUs");
                    return false;
                } else if (SKUleng >= 1) {
                    for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
                        if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;

                        } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;

                        }
                    }
                    $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng] = newSKUDetails1Coll[0]
                    $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideRemoveButtonSKURow = true;

                }
            }
            if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
            }

        }
    });


    //REMOVE SELECTED ROW FROM SKU DETAILS ROW 1 
    $scope.removeSKUDetailsRow = function (skuRow1, $event) {
            $event.currentTarget.style.display = "none";
            var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length - 1; //0

            // var dlg = $dialogs.confirm('Please Confirm', 'Are you sure to delete this item?');
            //dlg.result.then(function(btn) {
            /// $scope.setLoading(true);
            var t = $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.indexOf(skuRow1);
            $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.splice(t, 1);

            if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideAddButtonSKURow = false;
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                // $scope.showSubmit = true;
            } else {
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideAddButtonSKURow = false;
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = false;
            }
        },
        function (btn) {
            $event.currentTarget.style.display = "inline-block";
            //  $scope.setLoading(false);
            $scope.isDeleting = true;
            //});
        }
    //REMOVE SELECTED ROW FROM Country DETAILS ROW 1 
    $scope.removeCountryDetailsRow = function (countryRow1, $event) {
            $event.currentTarget.style.display = "none";
            var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length; //0

            // var dlg = $dialogs.confirm('Please Confirm', 'Are you sure to delete this item?');
            //dlg.result.then(function(btn) {
            /// $scope.setLoading(true);
            var t = $scope.newMarketRow1Coll[leng1].CountryRow.indexOf(countryRow1);
            $scope.newMarketRow1Coll[leng1].CountryRow.splice(t, 1);

            if ($scope.newMarketRow1Coll[leng1].CountryRow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow.length <= 1) {
                $scope.newMarketRow1Coll[leng1].CountryRow[$scope.newMarketRow1Coll[leng1].CountryRow.length - 1].HideAddButtonCountryRow = false;
                $scope.newMarketRow1Coll[leng1].CountryRow[$scope.newMarketRow1Coll[leng1].CountryRow.length - 1].HideRemoveButtonCountryRow = true;
                // $scope.showSubmit = true;
            } else {
                $scope.newMarketRow1Coll[leng1].CountryRow[$scope.newMarketRow1Coll[leng1].CountryRow.length - 1].HideAddButtonCountryRow = false;
                $scope.newMarketRow1Coll[leng1].CountryRow[$scope.newMarketRow1Coll[leng1].CountryRow.length - 1].HideRemoveButtonCountryRow = false;
            }
        },
        function (btn) {
            $event.currentTarget.style.display = "inline-block";
            //  $scope.setLoading(false);
            $scope.isDeleting = true;
            //});
        }
    //REMOVE SELECTED ROW FROM MARKET DETAILS ROW 1 

    $scope.removeMarketDetailsRow = function (marketRow1, $event) {
            $event.currentTarget.style.display = "none";
            var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length; //0

            // var dlg = $dialogs.confirm('Please Confirm', 'Are you sure to delete this item?');
            //dlg.result.then(function(btn) {
            /// $scope.setLoading(true);


            var t = $scope.newMarketRow1Coll.indexOf(marketRow1);
            $scope.newMarketRow1Coll.splice(t, 1);


            if ($scope.newMarketRow1Coll.length > 0 && $scope.newMarketRow1Coll.length <= 1) {
                $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideAddButtonMarketRow = false;
                $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideRemoveButtonMarketRow = true;
                $scope.showSubmit = true;
            } else {
                $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideAddButtonMarketRow = false;
                $scope.newMarketRow1Coll[$scope.newMarketRow1Coll.length - 1].HideRemoveButtonMarketRow = false;
            }

        },
        function (btn) {
            $event.currentTarget.style.display = "inline-block";
            //  $scope.setLoading(false);
            $scope.isDeleting = true;
            //});
        }


    // Market and SubMarket Cascading

    $scope.bindMarketSubMarkt = function (ddlmarket) {
        $scope.getProductame1 = $scope.subMarketColl.filter(function (item) {
            return (item.MarketId == $scope.ddlmarket);
        });
        //$scope.addMarketRow(null)
    };


    //ON SUBMIT BUTTON:SAVE DATA IN 3 LIST
    $scope.onSubmit = function () {
        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Id == $scope.ddlSubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
      //  shortname = "ANDA" + shortname;
       // $scope.counter = parseInt($scope.counter) + 1;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;

        // "0001-ILCFTP_ATVR_Jul-2023"

        console.log($scope.newMarketRow1Coll)
        var marklenght = $scope.newMarketRow1Coll.length;
        if (marklenght > 0) {
            marklenght = marklenght - 1;
            var countrylenght = $scope.newMarketRow1Coll[marklenght].CountryRow.length;
            // if(countrylenght>0){
            //     countrylenght=countrylenght-1;
            //     var skulength= $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].length;

            if (countrylenght == 0) {
                alert('Please First Add Country Row');
                return false;
            }


            // }
            if (countrylenght > 0) {

                countrylenght = countrylenght - 1;



                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null  && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null  || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
                        alert('First Fill All Fields In Country')
                        return false;

                    }
                }
                var skulength = $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length;

                if (skulength == 0) {
                    alert('Please First Add SKU Row');
                    return false;
                }

                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    }
                }


            }

        }

        $scope.FinalCountryLaunchColl = [];
        $scope.FinalSKUColl = [];
        for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
            for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
                $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
            }
        }
        for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
            for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
                $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

            }
        }


        //Fetechin User from role master based on   Reviewer,  Initiator,
        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
        for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
            $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
            });
            $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Reviewer'&& item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
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
            if(pplInitiator.length==0)
            {
                alert("No Initiator Group Found")
                return false;
            }
            if(pplReviewer.length==0)
            {
                alert("No Reviewer Group Found")
                return false;
            }
            if(pplValidator.length==0)
            {
                alert("No Validator Group Found")
                return false;
            }
        }

       
        var objppe = [];
        if ($scope.selectedContTypeDes.length > 0) {
            for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
                console.log(objppe);
                var a = $scope.selectedContTypeDes[i].id;
                objppe.push(a)
            }
        }
        $scope.disabledFlag=true
        $scope.DossageId = {
            "results": objppe
        };
       // $scope.IsDisabled = true;
        //Insert Data into Parent List (OutLicensingBusinessCase)
        var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCase')/items";
        var AndaBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.AndaBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.ddlSubStrategy,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            ProductNameId: $scope.ddlProductName,
            DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            Counter:$scope.counter,
            CaseStageId: $scope.StageMasterColl[0].Id,
            InnovatorId: $scope.ddlInnovator,
            CaseStatus: "Initiated",
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },
            ValidatorsId: {
                'results': pplValidator
            },
            LapVersion:"V0",

            VersionNo:"1.0"

            

        };
        Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
            $scope.AndaBusinessCaseIntID = AndaBusCaseData.data.d.Id;
            console.log($scope.AndaBusinessCaseIntID);
            $scope.LaunchSkuDetails();
        });

    }


  $scope.onSaveAsDraft = function () {
  
   if($scope.ddlSubStrategy=="" || $scope.ddlSubStrategy=='undefined' || $scope.ddlSubStrategy==null ) {
            alert("Please Select Sub Strategy");
            return false;

        }
        
        if($scope.BusinessCaseName=="" || $scope.BusinessCaseName=='undefined' || $scope.BusinessCaseName==null ) {
            alert("Please Enter Business Case Name");
            return false;
            
        }
        
        if($scope.ddlProductCategory=="" || $scope.ddlProductCategory=='undefined' || $scope.ddlProductCategory==null ) {

            alert("Please Select Product Category");
            return false;
        }
        
        if($scope.ddlProductName=="" || $scope.ddlProductName=='undefined' || $scope.ddlProductName==null ) {

            alert("Please Select Product Name");
            return false;
        }  
        if( $scope.selectedContTypeDes.length==0) {

            alert("Please Select Dosages");
            return false;
        }
        
    //   var a= $('#ddlmarket').val();



  
  
  
      var month = $('#lblDate').text();
      var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
          return (item.Id == $scope.ddlSubStrategy);
      });
      var shortname = objSNSubStargy[0].ShortName;
      //  shortname = "ANDA" + shortname;
     // $scope.counter = parseInt($scope.counter) + 1;
      $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;

      // "0001-ILCFTP_ATVR_Jul-2023"

    //arvind/*  console.log($scope.newMarketRow1Coll)
    /*  var marklenght = $scope.newMarketRow1Coll.length;
      if (marklenght > 0) {
          marklenght = marklenght - 1;
          var countrylenght = $scope.newMarketRow1Coll[marklenght].CountryRow.length;
          // if(countrylenght>0){
          //     countrylenght=countrylenght-1;
          //     var skulength= $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].length;

          if (countrylenght == 0) {
              alert('Please First Add Country Row');
              return false;
          }


          // }
          if (countrylenght > 0) {

              countrylenght = countrylenght - 1;



              for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
                  if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                      alert('First Fill All Fields In Country')
                      return false;

                  } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                      alert('First Fill All Fields In Country')
                      return false;

                  }
              }
              var skulength = $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length;

              if (skulength == 0) {
                  alert('Please First Add SKU Row');
                  return false;
              }

              for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
                  if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                      alert('First Fill All Fields In SKU')
                      return false;

                  } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                      alert('First Fill All Fields In SKU')
                      return false;

                  }
              }


          }

      }*/

      $scope.FinalCountryLaunchColl = [];
      $scope.FinalSKUColl = [];
      for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
          for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
              $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
          }
      }
      for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
          for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
              $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

          }
      }


      //Fetechin member from role master based on   Reviewer,  Initiator,
      var pplInitiator = [];
      var pplReviewer = [];
      var pplValidator = [];
      for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) 
      {
        $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
        });
        $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Reviewer'&& item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
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
        if(pplInitiator.length==0)
        {
            alert("No Initiator Group Found")
            return false;
        }
        if(pplReviewer.length==0)
        {
            alert("No Reviewer Group Found")
            return false;
        }
        if(pplValidator.length==0)
        {
            alert("No Validator Group Found")
            return false;
        }
    }
      var objppe = [];
      if ($scope.selectedContTypeDes.length > 0) {
          for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
              console.log(objppe);
              var a = $scope.selectedContTypeDes[i].id;
              objppe.push(a)
          }
      }
      $scope.DossageId = {
          "results": objppe
      };
      //Insert Data into Parent List (ANDABusinessCase)
      var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCase')/items";
      var AndaBusinessCaseData = {
          __metadata: {
              'type': 'SP.Data.AndaBusinessCaseListItem'
          },
          Title: $scope.BUTitle,
          StrategyId: $scope.ddlStrategy,
          SubStrategyId: $scope.ddlSubStrategy,
          BusinessCaseName: $scope.BusinessCaseName,
          ProductCategoryId: $scope.ddlProductCategory,
          ProductNameId: $scope.ddlProductName,
          DosageFormId: $scope.DossageId,
          InitiationDate: $('#lblDate').text(),
          CaseStageId: $scope.StageMasterColl[0].Id,
          CaseStatus: "Draft",
          InnovatorId: $scope.ddlInnovator.Id,

          Counter:$scope.counter,
          InitiatorsId: {
              'results': pplInitiator
          },
          ReviewersId: {
              'results': pplReviewer
          },
          ValidatorsId: {
              'results': pplValidator
          }
         

      };
      Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusinessCaseData) {
          $scope.AndaBusinessCaseIntID = AndaBusinessCaseData.data.d.Id;
          console.log($scope.AndaBusinessCaseIntID );
          $scope.LaunchSkuDetails();
      });

  }


    $scope.LaunchSkuDetails = function () {

        var deferred = $q.defer();
        var noOfLaunchIndex = 0;
        var insertCountryBatch = [];
        var insertSKUDetailsBatch = [];
        $scope.AddedLaunchids = [];
        var insertCountryBatch = [];
        $scope.AddedLaunchids = [];
        for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
            noOfLaunchIndex++;
            var launchTitle = $scope.BUTitle + "-Launch-" + noOfLaunchIndex;
            insertCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaLicensingLaunchDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.AndaLicensingLaunchDetailsListItem"
                    },
                    Title: launchTitle,
                    MarketId: $scope.FinalCountryLaunchColl[z].MarketId,
                    SubMarketId: $scope.FinalCountryLaunchColl[z].SubMarketId,
                    CountryId: $scope.FinalCountryLaunchColl[z].Country, //USA:1
                    LOEDate: $scope.FinalCountryLaunchColl[z].LOEDate,
                    FillingDate: $scope.FinalCountryLaunchColl[z].FillingDate,
                    LaunchDate: $scope.FinalCountryLaunchColl[z].LaunchDate,
                    PartnerId: $scope.FinalCountryLaunchColl[z].Partner,
                    PartnerDetails: $scope.FinalCountryLaunchColl[z].PartnerDesc,
                    CurrentStatusId: $scope.FinalCountryLaunchColl[z].Status, // arvind
                    CurrencyId: $scope.FinalCountryLaunchColl[z].Currency,



                    FilingTypeId: $scope.FinalCountryLaunchColl[z].FilingType,


                    NoofGenericFilers: parseInt($scope.FinalCountryLaunchColl[z].NoofGenericFiller),

                    


                    AndaBusinessCaseId: $scope.AndaBusinessCaseIntID
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);

            for (var p = 0; p <insertedLaunchData.length; p++) {
                var coll = {};
                coll.LunchID = insertedLaunchData[p].d.Id
                coll.Country = insertedLaunchData[p].d.CountryId
                coll.LaunchTitle = insertedLaunchData[p].d.Title
                $scope.AddedLaunchids.push(coll);
            }
            if (noOfLaunchIndex == $scope.FinalCountryLaunchColl.length) {
                $scope.SkuDetails($scope.AddedLaunchids);
            }
            deferred.resolve();
        });
        return deferred.promise;
    }
    $scope.SkuDetails = function (AddedLaunchids) {
        var deferred = $q.defer();
        var insertSKUDetailsBatch = [];
        var index = 0;
        for (var z = 0; z <$scope.FinalSKUColl.length; z++) {
            index++;
            var getLaunchID = AddedLaunchids.filter(function (item) {
                return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
            });
            console.log(getLaunchID);
            insertSKUDetailsBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaSKUDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.AndaSKUDetailsListItem"
                    },
                    Quantity: $scope.FinalSKUColl[z].SKUQunatity,
                    // Unit: $scope.FinalSKUColl[z].SKUUnit,
                    SkuUnitId: $scope.FinalSKUColl[z].SKUUnit,
                    PackingTypeId: $scope.FinalSKUColl[z].PackingType,
                    Pack: $scope.FinalSKUColl[z].PackSize,
                    AndaLicensingLaunchDetailId: getLaunchID[0].LunchID,
                    AndaBusinessCaseId: $scope.AndaBusinessCaseIntID
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);
            if (index == $scope.FinalSKUColl.length) {


                $scope.ddlStrategy="Anda";
                // Email
                // var emailSubject = "BIOCON-Business Case: Business Case Submission " + $scope.Businesscaseid;
                // var emailBody = "<h1>BIOCON Business Case Request</h1>"
                //     + "<p>Below are the details:</p>"
                //     + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
                //     + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
                //     + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
                //     + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
                //     + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
                //     + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
                //     + "<p>&nbsp;</p>"
                //     + "<p>Click "
                //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.ANDABUCaseColl[0].Id + "/" + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                //     + " to open business case document";
                // Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.InitiatorsGroupsName, emailSubject, emailBody);
                //

                alert("Business Case Saved Successfully!!");
                $location.path("/InitiatorUSMOWANDADash");
                // var alertMessage = "Request has been submitted";
                // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorUSMOWANDADash");
                // Utilities.closeDialogBox();

                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorUSMOWANDADash");

    }
});