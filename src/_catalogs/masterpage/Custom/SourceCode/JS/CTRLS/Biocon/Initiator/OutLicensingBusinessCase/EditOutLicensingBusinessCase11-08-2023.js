    appOperations.controller("EditOutLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
        if (Logics.getSharedData() == undefined) {
            $location.path('/InitiatorLP');
        } else {
            // alert("jji");
            $scope.BcInitiateDetails = Logics.getSharedData();
            $scope.IntiateID =$scope.BcInitiateDetails.ID;
           
        }

        $scope.selectedContTypeDes = [];
        $scope.LOEdateDatePopUp = {
            opened: false,
        };
        $scope.disabledFlag = false;
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
        var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID";
        var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,StrategyId&$expand=Strategy&$top=100&$orderby=ID";
        var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
        var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
        var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$orderby=ID ";
        var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
        var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
        var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
        // var strOLBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
        var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
        // var strOLBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
        var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'Outlicensing (OL)'&$top=5000&$orderby=ID"; // cascading
        var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseName,InitiationDate,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
        var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,OutLicensingBusinessCase&$filter=OutLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
        var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase&$expand=OutLicensingBusinessCase,OutLicensingLaunchDetail&$filter=OutLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

        $scope.setting5 = {
            scrollableHeight: '200px',
            scrollable: true,
            enableSearch: true,
            showCheckAll: true
            //showUncheckAll:false
        };
        var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strPartnerUrl, strRoleMasterUrl, strOutLicensingBusinessCaseUrl, strOutLicensingLaunchDetailsUrl, strOutLicensingSKUDetailsUrl];
        Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

            function callMultiSelect(argument) {
                $('#ddnmembers').fSelect();
                // $('#ddnRJmembers').fSelect();
            }
            $scope.ExistMarketRowColl = [];
            $scope.StrategyColl = batchedData[0].d.results;
            $scope.SubStrategyColl = batchedData[1].d.results;
            $scope.ProductCategoryColl = batchedData[2].d.results;
            $scope.ProductMasterColl = batchedData[3].d.results;
            $scope.MarketColl = batchedData[4].d.results;
            $scope.CountryColl = batchedData[5].d.results;
            $scope.DosageColl = batchedData[6].d.results;
            $scope.subMarketColl = batchedData[7].d.results;
            $scope.PartnerColl = batchedData[8].d.results;
            $scope.RoleMasterColl = batchedData[9].d.results;
            $scope.OutLicensingBusinessCaseColl = batchedData[10].d.results;
            $scope.OLLaunchColl = batchedData[11].d.results;
            $scope.OLSKUColl = batchedData[12].d.results;

            if ($scope.OutLicensingBusinessCaseColl.length > 0) {
                $scope.BusinessCaseName = $scope.OutLicensingBusinessCaseColl[0].BusinessCaseName;
                $scope.Businesscaseid = $scope.OutLicensingBusinessCaseColl[0].ID;
                //$scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].BusinessCaseID;
                $scope.InitiationDate = new Date($scope.OutLicensingBusinessCaseColl[0].InitiationDate);
                $scope.MonthInitiation=$scope.InitiationDate;
                $scope.ddlProductCategory = $scope.OutLicensingBusinessCaseColl[0].ProductCategory.Id;
                $scope.ddlProductName = $scope.OutLicensingBusinessCaseColl[0].ProductName.Id;
                $scope.ddlStrategy = $scope.OutLicensingBusinessCaseColl[0].Strategy.Id;
                $scope.ddlSubStrategy = $scope.OutLicensingBusinessCaseColl[0].SubStrategy.Id;
                $scope.Modified = new Date($scope.OutLicensingBusinessCaseColl[0].Modified);
            }
            /* arvind
     if( $scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length>0){
        $scope.DosageForm="";
         for(var p=0;p<$scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length;p++){                            
       		  $scope.DosageForm+=$scope.OutLicensingBusinessCaseColl[0].DosageForm.results[p].Title+',';  
            }
         $scope.dosage1=$scope.DosageForm.slice(0, -1);  
       }
        
*/



            if ($scope.SubStrategyColl.length > 0) {
                $scope.ddlSubStrategyText = $scope.SubStrategyColl[0].Title;
            }

            $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString()



            $scope.selectedContTypeDes = [];
            $scope.PrevConType = [];
            for (var n = 0; n < $scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length; n++) {

                $scope.selectedContTypeDes.push({

                    "label": $scope.OutLicensingBusinessCaseColl[0].DosageForm.results[n].Title,

                    "id": $scope.OutLicensingBusinessCaseColl[0].DosageForm.results[n].Id
                });
                $scope.PrevConType.push({
                    "label": $scope.OutLicensingBusinessCaseColl[0].DosageForm.results[n].Title,
                    "id": $scope.OutLicensingBusinessCaseColl[0].DosageForm.results[n].Id
                });

            }


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
            };
            $scope.bindproduct1 = function (ExistmarRow) {
             for(var p=0;p<$scope.ExistMarketRowColl.length;p++)
             {
                for(var i=0;i<ExistmarRow.CountryRow.length;i++)
                {
                  ExistmarRow.CountryRow[i].CountryColl= $scope.CountryColl.filter(function (item) {
                      return (item.MarketNameId == ExistmarRow.ddlmarket);});
                      ExistmarRow.CountryRow[i].CountryColl=$scope.ExistMarketRowColl[p].CountryRow[i].CountryColl
                      ExistmarRow.CountryRow[i].SubMarketId=ExistmarRow.ddlSubMarket
                      ExistmarRow.CountryRow[i].MarketId=ExistmarRow.ddlmarket
  
                  }
             }
             
               
            };
            //BIND EXIST MARKET COLLECETION    
            $scope.ExistCounryRowColl = [];
            if ($scope.OLLaunchColl.length > 0) {
                //BINDING MARKET ROWS
                for (var i = 0; i < $scope.OLLaunchColl.length; i++) {

                    if ($scope.ExistMarketRowColl.length == 0) {
                        // $scope.filteredCountryColl = $scope.CountryColl.filter(function (item) {
                        //     return ($scope.OLLaunchColl[i].Market.Id == item.MarketName.Id);
                        // });
                        $scope.ExistMarketRowColl.push({
                            "ddlmarket": $scope.OLLaunchColl[i].Market.Id,
                            "Market": $scope.MarketColl,
                            "SubMarket": $scope.subMarketColl,
                            "ddlSubMarket": $scope.OLLaunchColl[i].SubMarket.Id,
                            "CountryRow": $scope.ExistCounryRowColl,
                            "HideAddButtonMarket": false,
                            "HideRemoveButtonMarket": true
                        });
                    } else {
                        var filteredMarket = $scope.ExistMarketRowColl.filter(function (item) {
                            return (item.ddlmarket == $scope.OLLaunchColl[i].Market.Id);
                        });
                        if (filteredMarket.length != 1) {
                            // $scope.filteredCountryColl = $scope.CountryColl.filter(function (item) {
                            //     return ($scope.OLLaunchColl[i].Market.Id == item.MarketName.Id);
                            // });
                            $scope.ExistMarketRowColl.push({
                                "ddlmarket": $scope.OLLaunchColl[i].Market.Id,
                                "Market": $scope.MarketColl,
                                "SubMarket": $scope.subMarketColl,
                                "ddlSubMarket": $scope.OLLaunchColl[i].SubMarket.Id,
                                "CountryRow": $scope.ExistCounryRowColl,
                                "HideAddButtonMarket": false,
                                "HideRemoveButtonMarket": true
                            });
                        }

                    }
                }
                console.log($scope.ExistMarketRowColl)
                $scope.ExistSKURowColl = [];
                var marLen;
                //BINDING COUNTRY AGAIST MARKET
                for (var i = 0; i < $scope.ExistMarketRowColl.length; i++) {
                    var cretedCountryRow = $scope.OLLaunchColl.filter(function (item) {
                        return (item.Market.Id == $scope.ExistMarketRowColl[i].ddlmarket)
                    });
                    $scope.filteredCountryColl = $scope.CountryColl.filter(function (item) {
                        return ($scope.ExistMarketRowColl[i].ddlmarket == item.MarketName.Id);
                    });
                    $scope.ExistCounryRowColl = [];
                    if (cretedCountryRow.length > 0) {
                        for (var j = 0; j < cretedCountryRow.length; j++) {
                            $scope.ExistCounryRowColl.push({
                                "LaunchId": cretedCountryRow[j].Id,
                                //"LOEDate":moment(moment(new Date($scope.OLLaunchColl[i].LOEDate))).format('MMM-YYYY'),
                                "LOEDate": new Date(cretedCountryRow[j].LOEDate),
                                "FillingDate": new Date(cretedCountryRow[j].FillingDate),
                                "MarketId": $scope.ExistMarketRowColl[i].ddlmarket,
                                "Market": 0,
                                "SubMarketId": $scope.ExistMarketRowColl[i].ddlSubMarket,
                                "Market": $scope.MarketColl,
                                "SubMarket": $scope.subMarketColl,
                                "LaunchDate": new Date(cretedCountryRow[j].LaunchDate),
                                "PartnerDesc": cretedCountryRow[j].PartnerDetails,
                                "Partner": cretedCountryRow[j].Partner.Id,
                                "PartnerColl": $scope.PartnerColl,
                                "Currency": cretedCountryRow[j].Currency,
                                "Status": cretedCountryRow[j].CurrentStatus,
                                "Country": cretedCountryRow[j].Country.Id,
                                "CountryID": 0,
                                "CountryColl": $scope.filteredCountryColl,
                                "HideAddButtonCountryRow": false,
                                "HideRemoveButtonCountryRow": true,
                                "SKURow": $scope.ExistSKURowColl,
                                "IsOpenDate": false,
                                "IsOpenDate2": false,
                                "IsOpenDate3": false,
                                "ExistCountryEntry": "Yes"
                            });
                        }
                        $scope.ExistMarketRowColl[i].CountryRow = $scope.ExistCounryRowColl
                    }

                }
            }
            console.log($scope.ExistMarketRowColl)
            //BING SKU
            if ($scope.OLSKUColl.length > 0) {
                for (var i = 0; i < $scope.ExistMarketRowColl.length; i++) {
                    for (var j = 0; j < $scope.ExistMarketRowColl[i].CountryRow.length; j++) {
                        var filteredSku = $scope.OLSKUColl.filter(function (item) {
                            return (item.OutLicensingLaunchDetail.Id == $scope.ExistMarketRowColl[i].CountryRow[j].LaunchId);
                        });
                        if (filteredSku.length > 0) {
                            var sku1 = [];
                            for (var k = 0; k < filteredSku.length; k++) {
                                sku1.push({
                                    "SKUCountry": $scope.ExistMarketRowColl[i].CountryRow[j].Country,
                                    //"SKUCountry": $scope.ExistMarketRowColl[marLen].CountryRow[$scope.ExistCounryRowColl[i].Country],
                                    "SKUQunatity": filteredSku[k].Quantity,
                                    "SKUUnit": filteredSku[k].Unit,
                                    "PackSize": filteredSku[k].Pack,
                                    "PackingType": filteredSku[k].PackingType,
                                    "HideAddButtonSKURow": false,
                                    "HideRemoveButtonSKURow": true,
                                    "ExistSKUEntry": "Yes",
                                    "SKUIntId": filteredSku[k].Id,
                                    "LaunchID": filteredSku[k].OutLicensingLaunchDetail.Id
                                });
                            }
                            $scope.ExistMarketRowColl[i].CountryRow[j].SKURow = sku1
                          //  $scope.ExistMarketRowColl[i].CountryRow[j].SKURow[0].HideRemoveButtonSKURow = true;
                            // $scope.ExistCounryRowColl[i].SKURow=sku1
                            // $scope.ExistCounryRowColl[i].SKURow[0].HideRemoveButtonSKURow=true;
                        }
                    }
                }

            }
            console.log($scope.ExistMarketRowColl)
            $scope.ExistSKUDetailsRow1 = function (objCountry, mark, index, exist) {
                var leng1 = $scope.ExistMarketRowColl.length - 1; //1index
                var Countleng1 = $scope.ExistMarketRowColl[leng1].CountryRow.length - 1; //0
                var filtrdCountryRow = $scope.ExistMarketRowColl[leng1].CountryRow.filter(function (item) {
                    return (item.Country == objCountry);
                });
                var newSKUDetails1Coll = [];
                newSKUDetails1Coll.push({
                    "SKUCountry": filtrdCountryRow[0].Country, //$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].Country,
                    "SKUQunatity": null,
                    "SKUUnit": "",
                    "PackSize": null,
                    "PackingType": "",
                    "HideAddButtonSKURow": false,
                    "HideRemoveButtonSKURow": false,
                    "NewSKUEntry": "Yes",
                    "LaunchID": filtrdCountryRow[0].LaunchId
                });
                if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow == undefined || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow == 0) {
                    var newSKUDetails1Coll = [];
                    newSKUDetails1Coll.push({
                        // "SNo":index,
                        "SKUCountry": filtrdCountryRow[0].Country, // $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].Country,
                        "SKUQunatity": null,
                        "SKUUnit": 0,
                        // "SkuMaster": $scope.SkuMasterColl,
                        "PackSize": null,
                        "PackingType": "",
                        "HideAddButtonSKURow": false,
                        "HideRemoveButtonSKURow": false,
                        "NewSKUEntry": "Yes",
                        "LaunchID": filtrdCountryRow[0].LaunchId
                    });
                    $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll;

                } else {
                    var SKUleng = filtrdCountryRow[0].SKURow.length; // $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length;//0
                    if (SKUleng == 0) {
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll
                    } else if (SKUleng >= 20) {
                        for (var i = 0; i < $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length; i++) {
                            if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            } else if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            }
                        }
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideAddButtonSKURow = true;
                        alert("Can not Add 20 SKUs");
                        return false;
                    } else if (SKUleng >= 1) {
                        for (var i = 0; i < $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length; i++) {
                            if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            } else if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
                                alert('First Fill All Fields In SKU')
                                return false;

                            }
                        }
                        filtrdCountryRow[0].SKURow[SKUleng] = newSKUDetails1Coll[0]
                        // $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1-1].SKURow[SKUleng] = newSKUDetails1Coll[0]
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideRemoveButtonSKURow = true;

                    }
                }
                if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1 - 1].SKURow.length > 0 && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                    $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1 - 1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                }

            }
        });
        $scope.ExistCountryRow = function (marketObj) {
            var marLen;var filtrdCountryRow=[];var   Countleng
            marLen = $scope.ExistMarketRowColl.length - 1;
            if($scope.ExistMarketRowColl.length>1)
            {
                for(var i=0;i<$scope.ExistMarketRowColl.length;i++)
                {
                    if($scope.ExistMarketRowColl[i].ddlmarket==marketObj)
                    {
                        var filtrerMarket = $scope.ExistMarketRowColl[i];
                    }
                }
            }
            else
            {
               var filtrerMarket = $scope.ExistMarketRowColl.filter(function (item) {
                    return (item.ddlmarket == marketObj);
                });
            }
            
            // filtrdCountryRow = $scope.ExistMarketRowColl[0].CountryRow.filter(function (item) {
            //     return (item.MarketId == marketObj);
            // });
              // filtrdCountryRow = $scope.ExistMarketRowColl[0].CountryRow.filter(function (item) {
            //     return (item.MarketId == marketObj);
            // });
             
            // for (var i = 0; i < $scope.ExistMarketRowColl.length; i++) 
            // {
            //     if($scope.ExistMarketRowColl[i].ddlmarket==marketObj)
            //     {
            //         filtrdCountryRow.push($scope.ExistMarketRowColl[i]);
            //         break;
            //     }
            // }
          
          //  console.log(filtrdCountryRow);
            
                Countleng= filtrerMarket[0].CountryRow.length
                if (Countleng == 5) 
                {
                    alert("Can not Add more than 5 Countries");
                    return false;
                }
                else
                {
                    if (Countleng >= 0 && Countleng <= 4) 
                    {
                        for (var i = 0; i < $scope.ExistMarketRowColl[marLen].CountryRow.length; i++) 
                        {
                            if ($scope.ExistMarketRowColl[marLen].CountryRow[i].Status == "" && $scope.ExistMarketRowColl[marLen].CountryRow[i].Country == 0 && $scope.ExistMarketRowColl[marLen].CountryRow[i].LOEDate == null && $scope.ExistMarketRowColl[marLen].CountryRow[i].LaunchDate == null && $scope.ExistMarketRowColl[marLen].CountryRow[i].Partner == 0 && $scope.ExistMarketRowColl[marLen].CountryRow[i].Currency == "" && $scope.ExistMarketRowColl[marLen].CountryRow[i].PartnerDesc == "") {
                                alert('First Fill All Fields In Country')
                                return false;

                            } else if ($scope.ExistMarketRowColl[marLen].CountryRow[i].Status == "" || $scope.ExistMarketRowColl[marLen].CountryRow[i].Country == 0 || $scope.ExistMarketRowColl[marLen].CountryRow[i].LOEDate == null || $scope.ExistMarketRowColl[marLen].CountryRow[i].LaunchDate == null || $scope.ExistMarketRowColl[marLen].CountryRow[i].Partner == 0 || $scope.ExistMarketRowColl[marLen].CountryRow[i].Currency == "" || $scope.ExistMarketRowColl[marLen].CountryRow[i].PartnerDesc == "") {
                                alert('First Fill All Fields In Country')
                                return false;

                            }
                        }
                        var finalcounLen = filtrerMarket[0].CountryRow.length-1;
                        var skulLen =filtrerMarket[0].CountryRow[finalcounLen].SKURow.length;
                        if (skulLen > 0) 
                        {
                            for (var i = 0; i < $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow.length; i++) 
                            {
                                if ($scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" && $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 && $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null && $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                                    alert('First Fill All Fields In SKU')
                                    return false;
        
                                } else if ($scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" || $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 || $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null || $scope.ExistMarketRowColl[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                                    alert('First Fill All Fields In SKU')
                                    return false;
        
                                }
                            }
                            if(finalcounLen!=4)
                            {
                                var newSKUDetails1Coll = [];
                                $scope.ExistCounryRowColl.push({
                                    "LOEDate": null, //moment(moment(new Date()).startOf('isoWeek')._d).format('DD-MMM-YYYY')
                                    "FillingDate": null,
                                    "MarketId": filtrerMarket[0].ddlmarket,
                                    "Market": 0,
                                    "SubMarketId": filtrerMarket[0].ddlSubMarket,
                                    "Market": $scope.MarketColl,
                                    "SubMarket": $scope.subMarketColl,
                                    "LaunchDate": null,
                                    "PartnerDesc": "",
                                    "Partner": 0,
                                    "PartnerColl": $scope.PartnerColl,
                                    "Currency": "",
                                    "Status": "",
                                    "Country": 0,
                                    "CountryID": 0,
                                    "CountryColl": $scope.filteredCountryColl,
                                    "HideAddButtonCountryRow": false,
                                    "HideRemoveButtonCountryRow": false,
                                    "SKURow": newSKUDetails1Coll,
                                    //"HideRemoveButton": false
                                    "IsOpenDate": false,
                                    "IsOpenDate2": false,
                                    "IsOpenDate3": false,
                                    "NewCountryEntry": "Yes"
                                });
                            }
                        } 
                        else 
                        {
                            var newSKUDetails1Coll = [];
                            var cntylen = $scope.ExistCounryRowColl.length - 1;
                            var objCountry = $scope.ExistCounryRowColl[cntylen].Country
                            $scope.ExistSKUDetailsRow1(objCountry)
                        }
                        
                     }
                    

                    
                   // filtrdCountryRow[Countleng].CountryRow = $scope.ExistCounryRowColl
                   // var finalcounLen = $scope.ExistMarketRowColl[marLen].CountryRow.length - 1;
                    

                   
                }
            
            // if ($scope.ExistMarketRowColl.length > 0) 
            // {
                //var Countleng = $scope.ExistMarketRowColl[marLen].CountryRow.length; //0
                var finalcounLen = $scope.ExistMarketRowColl[marLen].CountryRow.length - 1;

                // if (Countleng >= 0 && Countleng <= 2) {
                //     for (var i = 0; i < $scope.ExistMarketRowColl[marLen].CountryRow.length; i++) {
                //         if ($scope.ExistMarketRowColl[marLen].CountryRow[i].Status == "" && $scope.ExistMarketRowColl[marLen].CountryRow[i].Country == 0 && $scope.ExistMarketRowColl[marLen].CountryRow[i].LOEDate == null && $scope.ExistMarketRowColl[marLen].CountryRow[i].LaunchDate == null && $scope.ExistMarketRowColl[marLen].CountryRow[i].Partner == 0 && $scope.ExistMarketRowColl[marLen].CountryRow[i].Currency == "" && $scope.ExistMarketRowColl[marLen].CountryRow[i].PartnerDesc == "") {
                //             alert('First Fill All Fields In Country')
                //             return false;

                //         } else if ($scope.ExistMarketRowColl[marLen].CountryRow[i].Status == "" || $scope.ExistMarketRowColl[marLen].CountryRow[i].Country == 0 || $scope.ExistMarketRowColl[marLen].CountryRow[i].LOEDate == null || $scope.ExistMarketRowColl[marLen].CountryRow[i].LaunchDate == null || $scope.ExistMarketRowColl[marLen].CountryRow[i].Partner == 0 || $scope.ExistMarketRowColl[marLen].CountryRow[i].Currency == "" || $scope.ExistMarketRowColl[marLen].CountryRow[i].PartnerDesc == "") {
                //             alert('First Fill All Fields In Country')
                //             return false;

                //         }
                //     }

                // }


               
           // }
            
          
            if ($scope.ExistMarketRowColl[marLen].CountryRow.length > 0 && $scope.ExistMarketRowColl[marLen].CountryRow.length <= 1) {
                $scope.ExistMarketRowColl[marLen].CountryRow[$scope.ExistMarketRowColl[marLen].CountryRow.length - 1].HideRemoveButtonCountryRow = true;
            }

        }





        $scope.onSubmit = function () {

            var deferred = $q.defer();
            if($scope.BcInitiateDetails.CaseStatus=="Draft")
            {
                $scope.CaseStatus="Initiated"
            }
            else if($scope.BcInitiateDetails.CaseStatus=="Data Input Stage")
            {
                $scope.CaseStatus="Data Input Stage"
            }
            var updatedBUBatch = [];
            $scope.InsertSKUDetails = [];
            $scope.UpdateLaunchDetails = [];
            $scope.InsertLaunchDetails = [];
            $scope.UpdateSKUDetails = [];
            var marLen = $scope.ExistMarketRowColl.length - 1;
            var counLen = $scope.ExistMarketRowColl[marLen].CountryRow.length - 1;
            // $scope.UpdateLaunchDetails = $scope.ExistMarketRowColl[marLen].CountryRow.filter(function (item) {
            //     return (item.ExistCountryEntry == "Yes");
            // });
            for (var i = 0; i < $scope.ExistMarketRowColl.length; i++) 
            {
                for (var j = 0; j < $scope.ExistMarketRowColl[i].CountryRow.length; j++) 
                {
                var countryUpdate = $scope.ExistMarketRowColl[i].CountryRow.filter(function (item) {
                    return (item.ExistCountryEntry == "Yes");
                });
                if (countryUpdate.length == 1) {
                    $scope.UpdateLaunchDetails.push(countryUpdate[0]);
                } else if (countryUpdate.length > 1) {
                    for (var j = 0; j < countryUpdate.length; j++) {
                        $scope.UpdateLaunchDetails.push(countryUpdate[j])
                    }
                }
                }
            }
            $scope.InsertLaunchDetails = $scope.ExistMarketRowColl[marLen].CountryRow.filter(function (item) {
                return (item.NewCountryEntry == "Yes");
            });
            for (var i = 0; i < $scope.UpdateLaunchDetails.length; i++) {
                var skuUpdate = $scope.UpdateLaunchDetails[i].SKURow.filter(function (item) {
                    return (item.ExistSKUEntry == "Yes");
                });
                if (skuUpdate.length == 1) {
                    $scope.UpdateSKUDetails.push(skuUpdate[0]);
                } else if (skuUpdate.length > 1) {
                    for (var j = 0; j < skuUpdate.length; j++) {
                        $scope.UpdateSKUDetails.push(skuUpdate[j])
                    }
                }
            }
            for (var i = 0; i < $scope.UpdateLaunchDetails.length; i++) {

                var skuline = $scope.UpdateLaunchDetails[i].SKURow.filter(function (item) {
                    return (item.NewSKUEntry == "Yes");
                });
                if (skuline.length > 0) {
                    for (var j = 0; j < skuline.length; j++) {
                        $scope.InsertSKUDetails.push(skuline[j])
                    }

                }
            }
            if ($scope.InsertLaunchDetails.length > 0) {
                for (var i = 0; i < $scope.InsertLaunchDetails.length; i++) {
                    for (var j = 0; j < $scope.InsertLaunchDetails[i].SKURow.length; j++) {
                        $scope.InsertSKUDetails.push($scope.InsertLaunchDetails[i].SKURow[j])
                    }
                }

            }
            var month = $('#lblDate').text();
            var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
                 return (item.Id == $scope.ddlSubStrategy);
            });
            var shortname = objSNSubStargy[0].ShortName;
            var GetID = $scope.BcInitiateDetails.Title
            GetID = GetID.split("_")
            if ($scope.ProdCode == undefined) {
                $scope.ProdCode = GetID[2];
            }
            $scope.counter = GetID[0];
            shortname = "OL" + shortname;

            $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + $('#lblDate').text();
            console.log($scope.ExistMarketRowColl)
            var marklenght = $scope.ExistMarketRowColl.length;
            if (marklenght > 0) {
                marklenght = marklenght - 1;
                var countrylenght = $scope.ExistMarketRowColl[marklenght].CountryRow.length;

                if (countrylenght == 0) {
                    alert('Please First Add Country Row');
                    return false;
                }
                if (countrylenght > 0) {
                    countrylenght = countrylenght - 1;
                    for (var i = 0; i < $scope.ExistMarketRowColl[marklenght].CountryRow.length; i++) {
                        if ($scope.ExistMarketRowColl[marklenght].CountryRow[i].Status == "" && $scope.ExistMarketRowColl[marklenght].CountryRow[i].Country == 0 && $scope.ExistMarketRowColl[marklenght].CountryRow[i].LOEDate == null && $scope.ExistMarketRowColl[marklenght].CountryRow[i].LaunchDate == null && $scope.ExistMarketRowColl[marklenght].CountryRow[i].Partner == 0 && $scope.ExistMarketRowColl[marklenght].CountryRow[i].Currency == "" && $scope.ExistMarketRowColl[marklenght].CountryRow[i].PartnerDesc == "") {
                            alert('First Fill All Fields In Country')
                            return false;

                        } else if ($scope.ExistMarketRowColl[marklenght].CountryRow[i].Status == "" || $scope.ExistMarketRowColl[marklenght].CountryRow[i].Country == 0 || $scope.ExistMarketRowColl[marklenght].CountryRow[i].LOEDate == null || $scope.ExistMarketRowColl[marklenght].CountryRow[i].LaunchDate == null || $scope.ExistMarketRowColl[marklenght].CountryRow[i].Partner == 0 || $scope.ExistMarketRowColl[marklenght].CountryRow[i].Currency == "" || $scope.ExistMarketRowColl[marklenght].CountryRow[i].PartnerDesc == "") {
                            alert('First Fill All Fields In Country')
                            return false;

                        }
                    }
                    var skulength = $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow.length;

                    if (skulength == 0) {
                        alert('Please First Add SKU Row');
                        return false;
                    }

                    for (var i = 0; i < $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
                        if ($scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;

                        } else if ($scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.ExistMarketRowColl[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                            alert('First Fill All Fields In SKU')
                            return false;
                        }
                    }
                }
            }
            $scope.disabledFlag =true;
            //Fetechin member from role master based on   Reviewer,  Initiator,
            var pplInitiator = []; var pplReviewer = []; var pplValidator = [];
            for (var z = 0; z < $scope.UpdateLaunchDetails.length; z++) {
                $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
                    return (item.Role == 'Initiator' && item.MarketId == $scope.UpdateLaunchDetails[z].MarketId);
                });
                $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
                    return (item.Role == 'Reviewer'&& item.MarketId == $scope.UpdateLaunchDetails[z].MarketId);
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
            if ($scope.newMarketRow1Coll.length > 0) {

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
                for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
                    $scope.fiterdInitiatorMemberNew = $scope.RoleMasterColl.filter(function (item) {
                        return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
                    });
                    $scope.fiterdReviewerMemberNew = $scope.RoleMasterColl.filter(function (item) {
                        return (item.Role == 'Reviewer'&& item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
                    });
                    $scope.fiterdValidatorMemberNew = $scope.RoleMasterColl.filter(function (item) {
                        return (item.Role == 'Validator');
                    });
                    if ($scope.fiterdInitiatorMemberNew.length > 0) {
                        pplInitiator.push($scope.fiterdInitiatorMemberNew[0].UserGroupId)
                        }
                    if ($scope.fiterdReviewerMemberNew.length > 0) {
                        pplReviewer.push($scope.fiterdReviewerMemberNew[0].UserGroupId)
                    }
                    if ($scope.fiterdValidatorMemberNew.length > 0) {
                        pplValidator.push($scope.fiterdValidatorMemberNew[0].UserGroupId)
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
            //Update Data into Parent List (OutLicensingBusinessCase)

            updatedBUBatch.push({

                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")",
                action: "UPDATE",
                data: {
                    __metadata: {
                        type: "SP.Data.OutLicensingBusinessCaseListItem"
                    },
                    Title: $scope.BUTitle,
                    StrategyId: $scope.ddlStrategy,
                    SubStrategyId: $scope.ddlSubStrategy,
                    BusinessCaseName: $scope.BusinessCaseName,
                    ProductCategoryId: $scope.ddlProductCategory,
                    ProductNameId: $scope.ddlProductName,
                  //  DosageFormId: $scope.DossageId,
                    InitiationDate: $('#lblDate').text(),
                  // , CaseStageId: $scope.StageMasterColl[0].Id,
                    CaseStatus:  $scope.CaseStatus
                    , InitiatorsId: { 'results': pplInitiator }
                    , ReviewersId: { 'results': pplReviewer }
                    , ValidatorsId: { 'results': pplValidator }
                    ,VersionNo:"1.0"

                }
            });
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch).then(function (insertedScheduleData) {
                console.log(insertedScheduleData);
                $scope.LaunchSkuDetails();
                if ($scope.newMarketRow1Coll.length > 0)
                {
                $scope.LaunchSkuDetailsNew();
                }
                deferred.resolve();
               
                alert("Business Case updated Successfully!!");
                $location.path("/InitiatorLP");
            });
            return deferred.promise;


        }
        $scope.LaunchSkuDetails = function () {

           // var deferred = $q.defer();
            var noOfLaunchIndex = 0;
            var newnoOfLaunchIndex = $scope.UpdateLaunchDetails.length;
            var insertCountryBatch = [];
            var updateCountryBatch = [];
            var insertSKUDetailsBatch = [];
            $scope.AddedLaunchids = [];
            $scope.AddedLaunchids = [];

            for (var z = 0; z < $scope.UpdateLaunchDetails.length; z++) {
                // noOfLaunchIndex++;
                //  var launchTitle = $scope.BUTitle + "-Launch-" + noOfLaunchIndex;
                updateCountryBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingLaunchDetails')/items(" + $scope.UpdateLaunchDetails[z].LaunchId + ")",
                    action: "UPDATE",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.OutLicensingLaunchDetailsListItem"
                        },
                        //Title:$scope.UpdateLaunchDetails launchTitle,
                        MarketId: $scope.UpdateLaunchDetails[z].MarketId,
                        SubMarketId: $scope.UpdateLaunchDetails[z].SubMarketId,
                        CountryId: $scope.UpdateLaunchDetails[z].Country, //USA:1
                        LOEDate: $scope.UpdateLaunchDetails[z].LOEDate,
                        FillingDate: $scope.UpdateLaunchDetails[z].FillingDate,
                        LaunchDate: $scope.UpdateLaunchDetails[z].LaunchDate,
                        PartnerId: $scope.UpdateLaunchDetails[z].Partner,
                        PartnerDetails: $scope.UpdateLaunchDetails[z].PartnerDesc,
                        Currency: $scope.UpdateLaunchDetails[z].Currency,
                        OutLicensingBusinessCaseId: $scope.IntiateID
                    }
                });
            }
            for (var z = 0; z < $scope.InsertLaunchDetails.length; z++) {
                noOfLaunchIndex++;
                newnoOfLaunchIndex = parseInt(newnoOfLaunchIndex) + 1;
                var launchTitle = $scope.BUTitle + "-Launch-" + newnoOfLaunchIndex;
                insertCountryBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingLaunchDetails')/items",
                    action: "ADD",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.OutLicensingLaunchDetailsListItem"
                        },
                        Title: launchTitle,
                        MarketId: $scope.InsertLaunchDetails[z].MarketId,
                        SubMarketId: $scope.InsertLaunchDetails[z].SubMarketId,
                        CountryId: $scope.InsertLaunchDetails[z].Country, //USA:1
                        LOEDate: $scope.InsertLaunchDetails[z].LOEDate,
                        FillingDate: $scope.InsertLaunchDetails[z].FillingDate,
                        LaunchDate: $scope.InsertLaunchDetails[z].LaunchDate,
                        PartnerId: $scope.InsertLaunchDetails[z].Partner,
                        PartnerDetails: $scope.InsertLaunchDetails[z].PartnerDesc,
                        Currency: $scope.InsertLaunchDetails[z].Currency,
                        OutLicensingBusinessCaseId: $scope.IntiateID
                    }
                });
            }

            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updateCountryBatch).then(function (upda) {
                console.log(upda);
                Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData1) {
                    console.log(insertedLaunchData1);

                    for (var p = 0; p < insertedLaunchData1.length; p++) {
                        var coll = {};
                        coll.LunchID = insertedLaunchData1[p].d.Id
                        coll.Country = insertedLaunchData1[p].d.CountryId
                        coll.LaunchTitle = insertedLaunchData1[p].d.Title
                        $scope.AddedLaunchids.push(coll);
                    }
                    if (noOfLaunchIndex == $scope.InsertLaunchDetails.length) {
                        $scope.SkuDetails($scope.AddedLaunchids);
                    }
                   // deferred.resolve();
                });
            });
            //return deferred.promise;
        }
        $scope.SkuDetails = function (AddedLaunchids) {
           // var deferred = $q.defer();
            var insertSKUDetailsBatch = [];
            var UpdateSKUDetailsBatch = [];
            var index = 0;
            if ($scope.UpdateSKUDetails.length > 0) {
                for (var z = 0; z < $scope.UpdateSKUDetails.length; z++) {
                    // var getLaunchID = AddedLaunchids.filter(function (item) {
                    //     return (item.Country == $scope.UpdateSKUDetails[z].SKUCountry);
                    // });
                    UpdateSKUDetailsBatch.push({
                        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingSKUDetails')/items(" + $scope.UpdateSKUDetails[z].SKUIntId + ")",
                        action: "UPDATE",
                        async: false,
                        data: {
                            __metadata: {
                                type: "SP.Data.OutLicensingSKUDetailsListItem"
                            },
                            Quantity: $scope.UpdateSKUDetails[z].SKUQunatity,
                            Unit: $scope.UpdateSKUDetails[z].SKUUnit,
                            PackingType: $scope.UpdateSKUDetails[z].PackingType,
                            Pack: $scope.UpdateSKUDetails[z].PackSize,
                            OutLicensingLaunchDetailId: $scope.UpdateSKUDetails[z].LaunchID,
                            OutLicensingBusinessCaseId: $scope.IntiateID
                        }
                    });
                }
            }
            if ($scope.InsertSKUDetails.length > 0) {
                for (var z = 0; z < $scope.InsertSKUDetails.length; z++) {
                    index++;
                    if ($scope.InsertSKUDetails[z].LaunchID!=undefined)
                    {
                        var lunchID = $scope.InsertSKUDetails[z].LaunchID
                    }
                    else
                    {
                        if (AddedLaunchids.length != 0) {
                            var getLaunchID = AddedLaunchids.filter(function (item) {
                                return (item.Country == $scope.InsertSKUDetails[z].SKUCountry);
                            });
                            var lunchID = getLaunchID[0].LunchID
                        }
                    }
                    console.log(getLaunchID);
                    insertSKUDetailsBatch.push({
                        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingSKUDetails')/items",
                        action: "ADD",
                        async: false,
                        data: {
                            __metadata: {
                                type: "SP.Data.OutLicensingSKUDetailsListItem"
                            },
                            Quantity: $scope.InsertSKUDetails[z].SKUQunatity,
                            Unit: $scope.InsertSKUDetails[z].SKUUnit,
                            PackingType: $scope.InsertSKUDetails[z].PackingType,
                            Pack: $scope.InsertSKUDetails[z].PackSize,
                            OutLicensingLaunchDetailId: lunchID,
                            OutLicensingBusinessCaseId: $scope.IntiateID
                        }
                    });
                }
            }
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, UpdateSKUDetailsBatch).then(function (updatedSkuData) {
                console.log(updatedSkuData);
                Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedSKUData) {
                    console.log(insertedSKUData);
                    // if (index == $scope.InsertSKUDetails.length) {
                    //     alert("Request Submitted");
                    //     $location.path("/InitiatorLP");
                    //     deferred.resolve();
                    // }
                });
            });
          //  return deferred.promise;
        }
        $scope.LaunchSkuDetailsNew = function () {

            //var deferred = $q.defer();
            var noOfLaunchIndex = 0;
            var newnoOfLaunchIndex = $scope.UpdateLaunchDetails.length;
            var insertCountryBatch = [];
            var insertSKUDetailsBatch = [];
            $scope.AddedLaunchidsNew = [];
            var insertCountryBatch = [];
            for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
                noOfLaunchIndex++;
                newnoOfLaunchIndex = parseInt(newnoOfLaunchIndex) + 1;
                var launchTitle = $scope.BUTitle + "-Launch-" + newnoOfLaunchIndex;
                insertCountryBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingLaunchDetails')/items",
                    action: "ADD",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.OutLicensingLaunchDetailsListItem"
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
                        Currency: $scope.FinalCountryLaunchColl[z].Currency,
                        OutLicensingBusinessCaseId: $scope.IntiateID
                    }
                });
            }
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
                console.log(insertedLaunchData);

                for (var p = 0; p < insertedLaunchData.length; p++) {
                    var coll = {};
                    coll.LunchID = insertedLaunchData[p].d.Id
                    coll.Country = insertedLaunchData[p].d.CountryId
                    coll.LaunchTitle = insertedLaunchData[p].d.Title
                    $scope.AddedLaunchidsNew.push(coll);
                }
                if (noOfLaunchIndex == $scope.FinalCountryLaunchColl.length) {
                    $scope.SkuDetailsNew($scope.AddedLaunchidsNew);
                }
                //deferred.resolve();
            });
            //return deferred.promise;
        }
        $scope.SkuDetailsNew = function (AddedLaunchids) {
           // var deferred = $q.defer();
            var insertSKUDetailsBatch = [];
            var index = 0;
            for (var z = 0; z < $scope.FinalSKUColl.length; z++) {
                index++;
                var getLaunchID = AddedLaunchids.filter(function (item) {
                    return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
                });
                console.log(getLaunchID);
                insertSKUDetailsBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingSKUDetails')/items",
                    action: "ADD",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.OutLicensingSKUDetailsListItem"
                        },
                        Quantity: $scope.FinalSKUColl[z].SKUQunatity,
                        Unit: $scope.FinalSKUColl[z].SKUUnit,
                        PackingType: $scope.FinalSKUColl[z].PackingType,
                        Pack: $scope.FinalSKUColl[z].PackSize,
                        OutLicensingLaunchDetailId: getLaunchID[0].LunchID,
                        OutLicensingBusinessCaseId: $scope.IntiateID
                    }
                });
            }
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
                console.log(insertedLaunchData);
                if (index == $scope.FinalSKUColl.length) {
                   // alert("Business Case Saved Successfully!!");
                    //$location.path("/InitiatorLP");
                    // var alertMessage = "Request has been submitted";
                    // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorLP");
                    // Utilities.closeDialogBox();

                   // deferred.resolve();
                }
            });
          //  return deferred.promise;
        }

        $scope.removeSKUDetailsRow = function (skuRow1, $event) {
                $event.currentTarget.style.display = "none";
                
                    var leng1 = $scope.ExistMarketRowColl.length - 1; //1index
                    var Countleng1 = $scope.ExistMarketRowColl[leng1].CountryRow.length - 1; //0
                    //SKUCountry
                    for (var i = 0; i < $scope.ExistMarketRowColl[leng1].CountryRow.length; i++) {
                        if ($scope.ExistMarketRowColl[leng1].CountryRow[i].Country == skuRow1.SKUCountry) {
                            var t = $scope.ExistMarketRowColl[leng1].CountryRow[i].SKURow.indexOf(skuRow1);
                            $scope.ExistMarketRowColl[leng1].CountryRow[i].SKURow.splice(t, 1);

                        }
                    }

                    // var dlg = $dialogs.confirm('Please Confirm', 'Are you sure to delete this item?');
                    //dlg.result.then(function(btn) {
                    /// $scope.setLoading(true);

                    if ($scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideAddButtonSKURow = false;
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                        // $scope.showSubmit = true;
                    }
                    else 
                    {
                        
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideAddButtonSKURow = false;
                      if( $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].ExistSKUEntry=="Yes")
                      {
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                      }
                      else
                      {
                        $scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow[$scope.ExistMarketRowColl[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = false;
                      }
                    }
                
            },
            function (btn) {
                $event.currentTarget.style.display = "inline-block";
                $scope.isDeleting = true;
            }
        $scope.onInitiationCancel = function () {
            $location.path("/InitiatorLP");

        }
        $scope.existRowMarket11111== function (marketObj)
        {
           // function (marketObj,exist)
          console.log(marketObj)
            var marlen = $scope.ExistMarketRowColl.length - 1;

        }
        ///ADD NEW MARKET  FROM OL.JS
        //ARVIND
        $scope.newMarketRow1Coll = []

        $scope.addMarketRow = function (marketObj) {
            $scope.newMarketColldiv=true;
            var oldMarket = $scope.newMarketRow1Coll.length;
            var newMarket = $scope.ExistMarketRowColl.length;
            var SumMarketLength = parseInt((oldMarket) + (newMarket))
            if (SumMarketLength > 3) {
                alert("Can not Add more than 3 Market");
                return false;
            }

            if (marketObj == 'new') {
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
            if (marketObj != 'new') {
                /* if (marketObj.ddlmarket == undefined && marketObj.MarketId == 0) {
                     alert("Select Market  first")
                     return false
                 }
                 if (marketObj.ddlSubMarket == undefined && marketObj.SubMarketId == 0) {
                     alert("Select  sub market first")
                     return false
                 }
                 */

                var marLen = $scope.newMarketRow1Coll.length - 1;
                if ($scope.newMarketRow1Coll[marLen].CountryRow.length == 0) {
                    $scope.newMarketRow1Coll[marLen].hidecountryRow = true;
                    $scope.bindCountryRow(null);

                } else {
                    var counLen = $scope.newMarketRow1Coll[marLen].CountryRow.length - 1;
                    var skulLen = $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow.length;
                    /*  for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                          if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                              alert('First Fill All Fields In Country')
                              return false;

                          } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                              alert('First Fill All Fields In Country')
                              return false;

                          }
                          */
                    //}
                    /*  if (skulLen == 0) {
                         alert('First Add SKU  Details ')
                         return false;
                     }*/
                    if (skulLen > 0) {
                        /* for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow.length; i++) {
                               if ($scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackingType == "") {
                                   alert('First Fill All Fields In SKU')
                                   return false;

                               } else if ($scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow[i].PackingType == "") {
                                   alert('First Fill All Fields In SKU')
                                   return false;

                               }
                           }  */

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
                alert("Can not Add more than 3 Market");
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
                    "Currency": "",
                    "Status": "",
                    "Country": 0,
                    "CountryID": 0,
                    "CountryColl": $scope.CountryColl,
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
                        // for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                        //     if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                        //         alert('First Fill All Fields In Country')
                        //         return false;

                        //     } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                        //         alert('First Fill All Fields In Country')
                        //         return false;

                        //     }
                        // }

                    }


                    var skulLen = $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow.length;

                    if (skulLen > 0) {
                        // for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow.length; i++) {
                        //     if ($scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                        //         alert('First Fill All Fields In SKU')
                        //         return false;

                        //     } else if ($scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marLen].CountryRow[finalcounLen].SKURow[i].PackingType == "") {
                        //         alert('First Fill All Fields In SKU')
                        //         return false;

                        //     }
                        // }
                        // if (Countleng == 2) {
                        //     alert("Can not Add more than 2 Countries");
                        //     return false;
                        // }
                        if (Countleng != 2) {
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
                                "Currency": "",
                                "Status": "",
                                "Country": 0,
                                "CountryID": 0,
                                "CountryColl": $scope.CountryColl,
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
                "SKUUnit": "",
                //  "SkuMaster": $scope.SkuMasterColl,
                "PackSize": null,
                "PackingType": "",
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
                    "PackingType": "",
                    "HideAddButtonSKURow": false,
                    "HideRemoveButtonSKURow": false
                });
                $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll;

            } else {
                var SKUleng = $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; //0
                if (SKUleng == 0) {
                    $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll
                } else if (SKUleng >= 2) {
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
                    alert("Can not Add 2 SKUs");
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



        //REMOVE SELECTED ROW FROM SKU DETAILS ROW 1 
        $scope.removeSKUDetailsRowNew = function (skuRow1, $event) {
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


        //ARVIND



    });