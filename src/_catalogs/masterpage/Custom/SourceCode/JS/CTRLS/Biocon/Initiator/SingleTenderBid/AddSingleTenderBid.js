appOperations.controller("AddSingleTenderBidCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
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
  
    //BID DUE DATE
    $scope.BidDueDatePopUp = {
        opened: false,
    };
    $scope.openBidDueDate = function (countryRow) {
        countryRow.IsOpenDate4 = true;

    };
    $scope.BidDueDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    //SupplyStartDate
    $scope.SupplyStartDatePopUp = {
        opened: false,
    };
    $scope.openSupplyStartDate = function (countryRow) {
        countryRow.IsOpenDate5 = true;

    };
    $scope.SupplyStartDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
     //SupplyEndDate
     $scope.SupplyEndDatePopUp = {
        opened: false,
    };
    $scope.openSupplyEndDate = function (countryRow) {
        countryRow.IsOpenDate6 = true;
    };
    $scope.SupplyEndDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$filter=Strategy/Title eq 'Tender Bid single Scenario'&$orderby=ID";

    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
   // change for  Email//var strOLBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidBusinessCase')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strOLBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,LapVersion,Modified,Counter,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$top=5000&$orderby=Id desc";

    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    var strOLBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title&$expand=UserGroup,Market,SubMarket&$filter=TemplateType eq 'Tender Bid single Scenarios'&$top=5000&$orderby=ID"; // cascading
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('StageMaster')/items?$select=*&$filter=Title eq 'Initiated'&$top=100&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
   // var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,SingleBidBusinessCaseId,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,SingleBidBusinessCase&$orderby=ID desc&$top=1000";
   var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=*&$top=1000&$orderby=ID"; // cascading

   var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'Tender Bid single Scenario'&$top=5000&$orderby=ID";
   var strBidAuthorityUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BidAuthorityMaster')/items?$select=*&$top=500&$orderby=Id desc";
   
    $scope.setting5 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll: true
        //showUncheckAll:false
    };


    var urlColl = [ strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strOLBUCaseUrl, strPartnerUrl, strOLBULaunchUrl, strRoleMasterUrl, strStageMasterUrl, strSkuMasterUrl,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strStrategyUrl,strBidAuthorityUrl];

    // Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

    //     function callMultiSelect(argument) {
    //         $('#ddnmembers').fSelect();
    //         // $('#ddnRJmembers').fSelect();
    //     }
    //     $scope.newMarketRow1Coll = [];
        
    //     $scope.SubStrategyColl = batchedData[0].d.results;
    //     $scope.ProductCategoryColl = batchedData[1].d.results;
    //     $scope.ProductMasterColl = batchedData[2].d.results;
    //     $scope.MarketColl = batchedData[3].d.results;
    //     $scope.CountryColl = batchedData[4].d.results;
    //     $scope.DosageColl = batchedData[5].d.results;
    //     $scope.subMarketColl = batchedData[6].d.results;
    //     $scope.OLBUCaseColl = batchedData[7].d.results;
    //     $scope.PartnerColl = batchedData[8].d.results;
    //     $scope.OLLaunchColl = batchedData[9].d.results;
    //     $scope.RoleMasterColl = batchedData[10].d.results;
    //     $scope.StageMasterColl = batchedData[11].d.results;
    //     $scope.SkuMasterColl = batchedData[12].d.results;
    //     $scope.PackingMasterColl = batchedData[13].d.results;
    //     $scope.CurrentStatusMasterColl = batchedData[14].d.results;
    //     $scope.CurrencyMasterColl = batchedData[15].d.results;
    //     $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = batchedData[16].d.results;
    //     $scope.StrategyColl = batchedData[17].d.results;
    //     $scope.BidAuthorityColl=batchedData[18].d.results;
    //     if ($scope.StrategyColl.length > 0) {
    //         $scope.ddlStrategy = $scope.StrategyColl[0].Id;
    //         $scope.ddlStrategyOL = $scope.StrategyColl[0].Title;

    //     }



    // new add single bid code --

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        function callMultiSelect(argument) {
            $('#ddnmembers').fSelect();
            // $('#ddnRJmembers').fSelect();
        }
        $scope.newMarketRow1Coll = [];
        
        $scope.SubStrategyColl = batchedData[0].d.results;
        $scope.ProductCategoryColl = batchedData[1].d.results;
        $scope.ProductMasterColl = batchedData[2].d.results;
        $scope.MarketColl = batchedData[3].d.results;
        $scope.CountryColl = batchedData[4].d.results;
        $scope.DosageColl = batchedData[5].d.results;
        $scope.subMarketColl = batchedData[6].d.results;
        $scope.OLBUCaseColl = batchedData[7].d.results;
        $scope.PartnerColl = batchedData[8].d.results;
        $scope.OLLaunchColl = batchedData[9].d.results;
        $scope.RoleMasterColl = batchedData[10].d.results;
        $scope.StageMasterColl = batchedData[11].d.results;
        $scope.SkuMasterColl = batchedData[12].d.results;
        $scope.PackingMasterColl = batchedData[13].d.results;
        $scope.CurrentStatusMasterColl = batchedData[14].d.results;
        $scope.CurrencyMasterColl = batchedData[15].d.results;
        $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = batchedData[16].d.results;
        $scope.StrategyColl = batchedData[17].d.results;
        $scope.BidAuthorityColl=batchedData[18].d.results;


        if ($scope.StrategyColl.length > 0) {
            $scope.ddlStrategy = $scope.StrategyColl[0].Id;
            $scope.ddlStrategyOL = $scope.StrategyColl[0].Title;

        }
        if ($scope.SubStrategyColl.length > 0) {
            $scope.SubStrategyColl = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });

        }

        /// Email Trigger 



        // $scope.InitiatorsGroupsName = [];
        // $scope.ReviewersGroupsName = [];
        // $scope.ValidatorsGroupsName = [];

        // for (let m = 0; m < $scope.OLBUCaseColl[0].Initiators.results.length; m++) {
        //     $scope.InitiatorsGroupsName.push($scope.OLBUCaseColl[0].Initiators.results[m].Title);
        // }
        // for (let m = 0; m < $scope.OLBUCaseColl[0].Reviewers.results.length; m++) {
        //     $scope.ReviewersGroupsName.push($scope.OLBUCaseColl[0].Reviewers.results[m].Title);
        // }
        // for (let m = 0; m < $scope.OLBUCaseColl[0].Validators.results.length; m++) {
        //     $scope.ValidatorsGroupsName.push($scope.OLBUCaseColl[0].Validators.results[m].Title);
        // }



        ///
        
        $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;


        var counter;
        var vRetVal;
        if ($scope.OLBUCaseColl.length > 0) {
            var Logg = $scope.OLBUCaseColl[0].Title;
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
           // $scope.ProdCode = $scope.getProductame[0].ProductCode;
           
           
           
          
            
            
            
            //$scope.addMarketRow(null)
        };
        
        
        $scope.GetProductcode=function(){
        
         if( $scope.getProductame.length>0 && $scope.ddlProductName!=undefined ){
             
             for(var d=0;d<$scope.getProductame.length;d++){
             
             if($scope.getProductame[d].Id==$scope.ddlProductName){

                $scope.ProdCode = $scope.getProductame[d].ProductCode;
             
             }
             
             
             }
             
             
             }
        
        
        }
        console.log($scope.getProductame)
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

        $scope.addMarketRow = function (marketObj,sb) {
          if(sb=='reset')
          {
            $scope.ShowMarketBtn=false
          }
            // if($scope.MarketColl1!=undefined)
            // {
            //     $scope.MarketColl= $scope.MarketColl1;
            // }
            // if(sb == null && marketObj != null)
            // {
            //     $scope.MarketColl= $scope.MarketColl1;
            // }
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
            //
            
            //
            if (marketObj != null) {
                if (marketObj.ddlmarket == undefined && marketObj.MarketId == 0) {
                    alert("Select Market  first")
                    return false
                }
                if (marketObj.ddlSubMarket == undefined && marketObj.SubMarketId == 0) {
                    alert("Select  sub market first")
                    return false
                }
                // 23 nov
                // if($scope.newMarketRow1Coll.length>0)
                // {
                // for(var i =0;i<$scope.newMarketRow1Coll.length;i++)
                // {
                //     if($scope.newMarketRow1Coll[i].ddlmarket==marketObj.ddlmarket && $scope.newMarketRow1Coll[i].ddlSubMarket==marketObj.ddlSubMarket )
                //     {
                //         marLen=i;
                //     }
                // }
                // }
                var marLen = $scope.newMarketRow1Coll.length - 1;
                if ($scope.newMarketRow1Coll[marLen].CountryRow.length == 0) {
                    $scope.newMarketRow1Coll[marLen].hidecountryRow = true;
                    $scope.bindCountryRow(null,'SubMarketClick')


                } else {
                  var  ddlmarket=$scope.newMarketRow1Coll[marLen].ddlmarket
                  var  ddlSubMarket=$scope.newMarketRow1Coll[marLen].ddlSubMarket
                    var counLen = $scope.newMarketRow1Coll[marLen].CountryRow.length - 1;
                    $scope.newMarketRow1Coll[marLen].CountryRow[counLen].MarketId=ddlmarket;
                    $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SubMarketId=ddlSubMarket;
                    var skulLen = $scope.newMarketRow1Coll[marLen].CountryRow[counLen].SKURow.length;
                    for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                  if(  $scope.newMarketRow1Coll[marLen].CountryRow[i].Status!=3){
                        if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                            alert('First Fill All Fields In Country')
                            return false;

                        } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                            alert('First Fill All Fields In Country')
                            return false;

                        }
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
                        if ($scope.newMarketRow1Coll.length >2) {
                            alert("You can add only 3 Markets");
                            return false;
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
                         //Dup   22 nov
                       // if(sb == null)
                        //{
                           
                        
                       
                        // for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) 
                        // {
                            
                        //         var marObj=$scope.newMarketRow1Coll[i].ddlmarket;
                                
                        //         if(marObj==0 || marObj==undefined)
                        //         {
                        //             var marObj=$scope.newMarketRow1Coll[i-1].ddlmarket
                        //             $scope.MarketColl = $scope.MarketColl.filter(function (item) {
                        //             return (item.ID != marObj);
                        //             });
                        //         $scope.newMarketRow1Coll[i].Market=$scope.MarketColl;
                        //        //// $scope.newMarketRow1Coll[i].MarketColl=$scope.MarketColl;
                        //         }
                        //         // else
                        //         // {
                        //         //     $scope.newMarketRow1Coll[i].Market=$scope.MarketColl;
                        //         //    // $scope.newMarketRow1Coll[i].MarketColl=$scope.MarketColl;
                        //         // }
                            
                           
                        // }
                      // marketObj.Market=$scope.MarketColl
                    //}
                        //
                    }
                }

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
        $scope.bindCountryRow = function (marketObj,ClickValue) {
            var marLen;
            if(ClickValue=='SubMarketClick')
            {
            marLen = $scope.newMarketRow1Coll.length - 1;
            }
            else if(ClickValue=='RowClick')
            {
                for(var i =0;i<$scope.newMarketRow1Coll.length;i++)
                    {
                        if($scope.newMarketRow1Coll[i].ddlmarket==marketObj.ddlmarket && $scope.newMarketRow1Coll[i].ddlSubMarket==marketObj.ddlSubMarket)
                        {
                            marLen=i;
                            break;
                        }
                    }
            }
           //ADDED ON 23 Nov For BIND COUNTRY AGAINST SAME MARATEKE
           
            // if(marketObj==null)
            // {
            //     marLen=0;
            // }
            // else
            // {
            //     for(var i =0;i<$scope.newMarketRow1Coll.length;i++)
            //     {
            //         if($scope.newMarketRow1Coll[i].ddlmarket==marketObj.ddlmarket)
            //         {
            //             marLen=i;
            //         }
            //     }
            // }
             //
         //   marketObj.ddlmarket 
        // $scope.newMarketRow1Coll[0].CountryRow[0].MarketId
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


                    "BidDueDate": null,
                    "SupplyStartDate": null,
                    "SupplyEndDate": null,

                    "BidAuthority": 0,
                    "BidAuthorityColl": $scope.BidAuthorityColl,
                    "IsOpenDate": false,
                    "IsOpenDate2": false,
                    "IsOpenDate3": false,
                    "IsOpenDate4": false,
                    "IsOpenDate5": false,
                    "IsOpenDate6": false

                });
            } else {
                if ($scope.newMarketRow1Coll.length > 0) {
                    var Countleng = $scope.newMarketRow1Coll[marLen].CountryRow.length; //0
                    var finalcounLen = $scope.newMarketRow1Coll[marLen].CountryRow.length - 1;

                    if (Countleng >= 0 && Countleng <= 2) {
                if(  $scope.newMarketRow1Coll[marLen].CountryRow[i].Status!=3){

                        for (var i = 0; i < $scope.newMarketRow1Coll[marLen].CountryRow.length; i++) {
                            if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == 0 && $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                                alert('First Fill All Fields In Country')
                                return false;

                            } else if ($scope.newMarketRow1Coll[marLen].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marLen].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marLen].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].Currency == 0 || $scope.newMarketRow1Coll[marLen].CountryRow[i].PartnerDesc == "") {
                                alert('First Fill All Fields In Country')
                                return false;

                            }
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
                        if (Countleng == 5) { // Countleng == 5 // this change should be change on every where later
                            alert("You can add only 5 Countries");
                            return false;
                        }
                        if (Countleng != 5) {
                            var newSKUDetails1Coll = [];
                            $scope.newCounryRow1Coll=[];
                            //var newCounryRow1Coll=[];
                            $scope.newCounryRow1Coll.push({
                            //newCounryRow1Coll.push({
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
                                "Currency": 0,
                                "CurrencyColl":$scope.CurrencyMasterColl,
                                "Status": 0,  
                                "StatusColl": $scope.CurrentStatusMasterColl, // arvind
                                "Country": 0,
                                "CountryID": 0,
                                "CountryColl":$scope.CountryColl,// $scope.filteredCountryColl,
                                "HideAddButtonCountryRow": false,
                                "HideRemoveButtonCountryRow": false,
                                "SKURow": newSKUDetails1Coll,
                                //"HideRemoveButton": false

                                "BidDueDate": null,
                                "SupplyStartDate": null,
                                "SupplyEndDate": null,
                                
                                "BidAuthority": 0,
                                "BidAuthorityColl": $scope.BidAuthorityColl,
                                "IsOpenDate": false,
                                "IsOpenDate2": false,
                                "IsOpenDate3": false,
                                "IsOpenDate4": false,
                                "IsOpenDate5": false,
                                "IsOpenDate6": false

                                
                               
                            });
                            $scope.newMarketRow1Coll[marLen].CountryRow[Countleng] =$scope.newCounryRow1Coll[0];//newCounryRow1Coll[0];// $scope.newCounryRow1Coll[Countleng]
                            console.log($scope.newCounryRow1Coll);
                            console.log($scope.newMarketRow1Coll);

                        }
                    } else {
                        var newSKUDetails1Coll = [];
                       // $scope.addOneMoreSKU()
                       alert("Please add atleast one SKU details")
            }
                }
            }
            //$scope.newMarketRow1Coll[marLen].CountryRow[Countleng] = $scope.newCounryRow1Coll[Countleng]
            // if(ClickValue=='RowClick')
            // {
            //     for(var i =0;i<$scope.newMarketRow1Coll.length;i++)
            //         {
            //             if($scope.newMarketRow1Coll[i].ddlmarket==marketObj.ddlmarket)
            //             {
            //                 marLen=i;
            //                 $scope.newMarketRow1Coll[i].CountryRow[Countleng] = $scope.newCounryRow1Coll[Countleng]
            //                 break;
            //             }
            //         } 
            // }
         //   $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[skulenght1] = newSKUDetails1Coll[0];
            if ($scope.newMarketRow1Coll[marLen].CountryRow.length > 0 && $scope.newMarketRow1Coll[marLen].CountryRow.length <= 1) {
                $scope.newMarketRow1Coll[marLen].CountryRow[$scope.newMarketRow1Coll[marLen].CountryRow.length - 1].HideRemoveButtonCountryRow = true;
            }
            //
            // if(marketObj!=null)
            // {
            //     for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) 
            //     {
            //         for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) 
            //         {  
            //              var cobj=$scope.newMarketRow1Coll[i].CountryRow[j].Country
            //             if(cobj==0)
            //             {
            //                 var cobj=$scope.newMarketRow1Coll[i].CountryRow[j-1].Country
            //                 $scope.CountryColl = $scope.CountryColl.filter(function (item) {
            //                 return (item.ID != cobj);
            //                 });
            //             $scope.newMarketRow1Coll[i].CountryRow[j].CountryColl=$scope.CountryColl;
            //             }
            //         }
            //        console.log($scope.CountryColl)
            //     }
            // }
          

        }
        //BIND SKU DETAILS ROW 1 DETAILS    
        // $scope.bindSKUDetailRow1 = function () {
        //     if ($scope.newMarketRow1Coll.length == 1) {
        //         $scope.addOneMoreSKU()
        //      }
        //     else {
        //         $scope.addOneMoreSKU()
        //     }
        // }



// ADD SKU FUNCTION--


$scope.addSKU = function (marID,countryID, index, exist) {

    var marklenght = $scope.newMarketRow1Coll.length;

    marklenght = marklenght - 1;

    //countrylenght = countrylenght - 1;

    var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
    var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length - 1; //0

    var newSKUDetails1Coll = [];
    newSKUDetails1Coll.push({
        // "SNo":index,
        "SKUCountry":countryID,// $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].Country,
        "SKUQunatity": null,
        // "SKUUnit": "",
        "SKUUnit": 0,
        //  "SkuMaster": $scope.SkuMasterColl,
        "PackSize": null,
        "PackingType": 0,
        "HideAddButtonSKURow": false,
        "HideRemoveButtonSKURow": false
    });
    for(var i=0;i< $scope.newMarketRow1Coll.length;i++)
    {
        for(var j=0;j<$scope.newMarketRow1Coll[i].CountryRow.length;j++)
        {
            if($scope.newMarketRow1Coll[i].ddlmarket==marID && $scope.newMarketRow1Coll[i].CountryRow[j].Country == countryID)
            {

                if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status != 3) {
                    if ($scope.newMarketRow1Coll[i].CountryRow[j].Status == "" && $scope.newMarketRow1Coll[i].CountryRow[j].Country == 0 && $scope.newMarketRow1Coll[i].CountryRow[j].LOEDate == null && $scope.newMarketRow1Coll[i].CountryRow[j].LaunchDate == null && $scope.newMarketRow1Coll[i].CountryRow[j].Partner == 0 && $scope.newMarketRow1Coll[i].CountryRow[j].Currency == "" && $scope.newMarketRow1Coll[i].CountryRow[j].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[i].CountryRow[j].Status == "" || $scope.newMarketRow1Coll[i].CountryRow[j].Country == 0 || $scope.newMarketRow1Coll[i].CountryRow[j].LOEDate == null || $scope.newMarketRow1Coll[i].CountryRow[j].LaunchDate == null || $scope.newMarketRow1Coll[i].CountryRow[j].Partner == 0 || $scope.newMarketRow1Coll[i].CountryRow[j].Currency == "" || $scope.newMarketRow1Coll[i].CountryRow[j].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    }
                }
            
                if($scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length==0 || $scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length==undefined)
                {
                $scope.newMarketRow1Coll[i].CountryRow[j].SKURow = newSKUDetails1Coll;
                return false;
                }
                if($scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length>=1)
                {
                    alert("Only applicable for adding first SKU row of respective country. Please click on Add one more SKU section button of relevant country.");
                        return false;
                }
                // else{
                //     alert("Only applicable for adding first SKU row of respective country. Please click on Add one more SKU section button of relevant country.");
                //     return false;
                // }
            }

        }
    }
    
//SN Comm
    // if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == undefined || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == 0) {
    //     var newSKUDetails1Coll = [];
    //     newSKUDetails1Coll.push({
    //         // "SNo":index,
    //         "SKUCountry": $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].Country,
    //         "SKUQunatity": null,
    //         "SKUUnit": 0,
    //         // "SkuMaster": $scope.SkuMasterColl,
    //         "PackSize": null,
    //         "PackingType": 0,
    //         "HideAddButtonSKURow": false,
    //         "HideRemoveButtonSKURow": false
    //     });
    //     $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll;

    // } else {
    //     var SKUleng = $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; //0
    //     if (SKUleng == 0) {
    //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll
    //     } else if (SKUleng >= 20) {
    //         for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
    //             if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
    //                 alert('First Fill All Fields In SKU')
    //                 return false;

    //             } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
    //                 alert('First Fill All Fields In SKU')
    //                 return false;

    //             }
    //         }
    //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideAddButtonSKURow = true;
    //         alert("You can add only 20 SKUs");
    //         return false;
    //     } else if (SKUleng >= 1) {
    //         for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
    //             if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
    //                 alert('First Fill All Fields In SKU')
    //                 return false;

    //             } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
    //                 alert('First Fill All Fields In SKU')
    //                 return false;

    //             }
    //         }
    //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng] = newSKUDetails1Coll[0]
    //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideRemoveButtonSKURow = true;

    //     }
    // }
    //SN Co
    if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
        $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
    }

}

//

        // $scope.chkcountryexit = function (CountryID) {
        //     console.log($scope.TestCountry);
        // //     if($scope.TestCountry.length!=0 || $scope.TestCountry!=undefined)
        // //     {
        // //     for (var i = 0; i < $scope.TestCountry.length; i++) 
        // //     {
        // //         for (var j = 0; j < $scope.TestCountry[i].CountryRow.length; j++) 
        // //         {
        // //             if ($scope.TestCountry[i].CountryRow[j].Country == CountryID) {
        // //                 alert("Already exist !");
        // //                 CountryID=0;
        // //                 $scope.newMarketRow1Coll[0].CountryRow[1].Country=CountryID
        // //                 $scope.TestCountry[i].CountryRow[j].Country=CountryID;
        // //                 return false;

        // //             }
        // //         }
        // //     }
        // // }


        // }



        //ADD SKU DETAILS ROW 1 
        $scope.addOneMoreSKU = function (marID, countryID,index, exist) {
            var leng1 = $scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 = $scope.newMarketRow1Coll[leng1].CountryRow.length - 1; //0

            var newSKUDetails1Coll = [];
            newSKUDetails1Coll.push({
                // "SNo":index,
                "SKUCountry": countryID,
                "SKUQunatity": null,
                // "SKUUnit": "",
                "SKUUnit": 0,
                //  "SkuMaster": $scope.SkuMasterColl,
                "PackSize": null,
                "PackingType": 0,
                "HideAddButtonSKURow": false,
                "HideRemoveButtonSKURow": false
            });
            //  //22 noDup  
             for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) 
             {
                 
                     var marObj=$scope.newMarketRow1Coll[i].ddlmarket;
                     
                    //  if(marObj==0 || marObj==undefined)
                    //  {
                         var marObj=$scope.newMarketRow1Coll[i].ddlmarket
                         $scope.MarketColl1 = $scope.MarketColl.filter(function (item) {
                         return (item.ID != marObj);
                         });
                   //  $scope.newMarketRow1Coll[i].Market=$scope.MarketColl;
                    // $scope.newMarketRow1Coll[i].MarketColl=$scope.MarketColl;
                    // }
                    
                 
                 console.log($scope.MarketColl)
             }
            //Validation
            for(var i=0;i< $scope.newMarketRow1Coll.length;i++)
            {
                for(var j=0;j<$scope.newMarketRow1Coll[i].CountryRow.length;j++)
                {
                    if($scope.newMarketRow1Coll[i].ddlmarket==marID && $scope.newMarketRow1Coll[i].CountryRow[j].Country == countryID)
                    {
                        var skulength=$scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length;
                        // if(skulength>1)
                        // //if($scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length>=1)
                        // {
                        //     var skulenght1=$scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length;
                        //     $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[skulenght1] = newSKUDetails1Coll[0];

                        //     $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[skulenght1 - 1].HideRemoveButtonSKURow = true;

                        //     if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                        //     $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                        //     }
                        // }
                        if(skulength>=20)
                        {
                            $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[skulength - 1].HideAddButtonSKURow = true;
                            alert("You can add only 20 SKUs");
                            return false;
                        }
                        
                        else if(skulength<=20)
                        {

                            for (var k = 0; k < $scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length; k++)
                            {
                                if ($scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].SKUQunatity == "" && $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].SKUUnit == 0 && $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].PackSize == null && $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].PackingType == "") {
                                    alert('First Fill All Fields In SKU')
                                    return false;

                                } else if ($scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].SKUQunatity == "" || $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].SKUUnit == 0 || $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].PackSize == null || $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[k].PackingType == "") {
                                    alert('First Fill All Fields In SKU')
                                    return false;

                                }
                            }

                            var skulenght1=$scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length;  
                            $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[skulenght1] = newSKUDetails1Coll[0];
                            $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[skulenght - 1].HideRemoveButtonSKURow = true;

                        
                                        if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
                                            $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
                                        }

                        }
                       

                    }
                }
            }

            //
            
            //22 nov
// 21 noc
            // for(var i=0;i< $scope.newMarketRow1Coll.length;i++)
            // {
            //     for(var j=0;j<$scope.newMarketRow1Coll[i].CountryRow.length;j++)
            //     {
            //         if($scope.newMarketRow1Coll[i].ddlmarket==marID && $scope.newMarketRow1Coll[i].CountryRow[j].Country == countryID)
            //         {
            //             if($scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length>=1)
            //             {
            //                 var skulenght=$scope.newMarketRow1Coll[i].CountryRow[j].SKURow.length;
            //                 $scope.newMarketRow1Coll[i].CountryRow[j].SKURow[skulenght] = newSKUDetails1Coll[0];

            //             $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[skulenght - 1].HideRemoveButtonSKURow = true;

                        
            //             if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
            //                 $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
            //             }
            //             }
            //         }

            //     }
            // }
            //21 nov
            //sn now
            // if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == undefined || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow == 0) {
            //     var newSKUDetails1Coll = [];
            //     newSKUDetails1Coll.push({
            //         // "SNo":index,
            //         "SKUCountry": $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].Country,
            //         "SKUQunatity": null,
            //         "SKUUnit": 0,
            //         // "SkuMaster": $scope.SkuMasterColl,
            //         "PackSize": null,
            //         "PackingType": 0,
            //         "HideAddButtonSKURow": false,
            //         "HideRemoveButtonSKURow": false
            //     });
            //     $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll;

            // } else {
            //     var SKUleng = $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; //0
            //     if (SKUleng == 0) {
            //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow = newSKUDetails1Coll
            //     } else if (SKUleng >= 20) {
            //         for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
            //             if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
            //                 alert('First Fill All Fields In SKU')
            //                 return false;

            //             } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
            //                 alert('First Fill All Fields In SKU')
            //                 return false;

            //             }
            //         }
            //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideAddButtonSKURow = true;
            //         alert("You can add only 20 SKUs");
            //         return false;
            //     } else if (SKUleng >= 1) {
            //         for (var i = 0; i < $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length; i++) {
            //             if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
            //                 alert('First Fill All Fields In SKU')
            //                 return false;

            //             } else if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[i].PackingType == "") {
            //                 alert('First Fill All Fields In SKU')
            //                 return false;

            //             }
            //         }
            //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng] = newSKUDetails1Coll[0]
            //         $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[SKUleng - 1].HideRemoveButtonSKURow = true;

            //     }
            // }
            // if ($scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length > 0 && $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length <= 1) {
            //     $scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow[$scope.newMarketRow1Coll[leng1].CountryRow[Countleng1].SKURow.length - 1].HideRemoveButtonSKURow = true;
            // }
//sn now validation part commnet
        }
    });



// new remove

$scope.removeSKUDetailsRow = function (skuRow1, $event) {
    $event.currentTarget.style.display = "none";
    var leng1,Countleng1;
    for(var i=0;i< $scope.newMarketRow1Coll.length;i++)
    {
        for(var j=0;j<$scope.newMarketRow1Coll[i].CountryRow.length;j++)
        {
           var objCountry= $scope.newMarketRow1Coll[i].CountryRow[j].Country;
           if(objCountry==skuRow1.SKUCountry)
           {
             leng1 =i;// $scope.newMarketRow1Coll.length-1; //1index
             Countleng1 =j;// $scope.newMarketRow1Coll[leng1].CountryRow.length -1;
             break;
           }
        }
    }

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


//


    //REMOVE SELECTED ROW FROM Country DETAILS ROW 1 
    $scope.removeCountryDetailsRow = function (countryRow1, $event) {
            $event.currentTarget.style.display = "none";
            var leng1 = "";//$scope.newMarketRow1Coll.length - 1; //1index
            var Countleng1 ="";// $scope.newMarketRow1Coll[leng1].CountryRow.length; //0

            for(var i=0;i< $scope.newMarketRow1Coll.length;i++)
            {
                for(var j=0;j<$scope.newMarketRow1Coll[i].CountryRow.length;j++)
                {
                var objCountry= $scope.newMarketRow1Coll[i].CountryRow[j].Country;
                if(objCountry==countryRow1.Country)
                {
                    leng1 =i;// $scope.newMarketRow1Coll.length-1; //1index
                    Countleng1 =j;// $scope.newMarketRow1Coll[leng1].CountryRow.length -1;
                    break;
                }
                }
            }

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




   $scope.DuplicateCheck= function chkDuplicates(arr,justCheck){
        var len = arr.length, tmp = {}, arrtmp = arr.slice(), dupes = [];
        arrtmp.sort();
        while(len--){
         var val = arrtmp[len];
         if (/nul|nan|infini/i.test(String(val))){
           val = String(val);
          }
          if (tmp[JSON.stringify(val)]){
             if (justCheck) {return true;}
             dupes.push(val);
          }
          tmp[JSON.stringify(val)] = true;
        }
        return justCheck ? false : dupes.length ? dupes : null;
      }






      $scope.OnchangeStatus=function(){
        var marklenght = $scope.newMarketRow1Coll.length-1;

        for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {

                    
            if($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status!=3)
            {
                 $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null ;
                
                 $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null;
    
                if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                    alert('First Fill All Fields In Country')
                    return false;
    
                } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                    alert('First Fill All Fields In Country')
                    return false;
    
                }
    
            }
          
        
          

        }


    }



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
    $scope.onSubmit = function () 
    {


    

       

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



    $scope.GetProductcode();

    
        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Id == $scope.ddlSubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
     
        $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
        
                
       

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

                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status != 3) {

                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    }
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
        // Market AND SUB MARKET DUPLICATE VALIDATION
            var DupMarketArray = [];
            angular.forEach($scope.newMarketRow1Coll, function (value, key) {
            var exist = false;
            angular.forEach(DupMarketArray, function (val, key1) 
            {
                if (value.ddlmarket== val.MarketId && value.ddlSubMarket== val.SubMarketId) {
                    exist = true;
                }
                });
                if (exist == false && value.ddlmarket!= "" && value.ddlSubMarket) {
                    DupMarketArray.push({ MarketId: value.ddlmarket,SubMarketId:value.ddlSubMarket});
                    $scope.DupMarketArray= DupMarketArray;// (4,5)
                }
                else
                {
                    alert("Duplicate Geography/Country entry exists.");
                    $scope.newMarketRow1Coll=[];
                    $scope.ShowMarketBtn=true
                    return false;
                }
            });

            // COUNTRY DUPLICATE VALIDATION
            var DupCountryArray = [];
            for(var i=0;i<$scope.newMarketRow1Coll.length;i++)
            {
            angular.forEach($scope.newMarketRow1Coll[i].CountryRow, function (value, key) {
            var exist = false;
            angular.forEach(DupCountryArray, function (val, key1) 
            {
                if (value.Country== val.CountryId) {
                    exist = true;
                }
                });
                if (exist == false && value.Country!= "") {
                    DupCountryArray.push({ CountryId: value.Country});
                    $scope.DupCountryArray= DupCountryArray;// (4,5)
                }
                else
                {
                    alert("Duplicate Country Exist");
                    $scope.newMarketRow1Coll[i].CountryRow=[]
                    $scope.newMarketRow1Coll=[];
                    $scope.ShowMarketBtn=true
                    return false;
                }
            });
            }

        //    
        if($scope.newMarketRow1Coll.length>0)
        {
        $scope.FinalCountryLaunchColl = [];
        $scope.FinalSKUColl = [];
        for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
            for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
                $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
            }
        }
        for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
            var cobj=$scope.FinalCountryLaunchColl[i].Country;
            for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
                $scope.FinalCountryLaunchColl[i].SKURow[j].SKUCountry=cobj
                $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

            }
        }
        
        


        //Fetechin User from role master based on   Reviewer,  Initiator,
        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
        for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
            $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId  && item.SubMarketId == $scope.FinalCountryLaunchColl[z].SubMarketId);

                //return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
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
        //Insert Data into Parent List (SingleBidBusinessCase)
        var strOLBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items";
        var OLBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.SingleBidBusinessCaseListItem'
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
            CaseStatus: "Initiated",
            BusinessCaseDescription:$scope.BusinessCaseDescription,
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },
            ValidatorsId: {
                'results': pplValidator
            },
            VersionNo:"1.0",
            LapVersion:"V0"

 
        };
        Logics.addData(strOLBusinessCaseURL, OLBusinessCaseData).then(function (OLBusCaseData) {
            $scope.OLBusinessCaseIntID = OLBusCaseData.data.d.Id;
            console.log($scope.OLBusinessCaseIntID);
            $scope.LaunchSkuDetails();
        });
    }

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



    $scope.GetProductcode();

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

                if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status != 3) {

                if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                    alert('First Fill All Fields In Country')
                    return false;

                } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                    alert('First Fill All Fields In Country')
                    return false;

                }
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

    
  
//   for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
//     if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status != 3) {
//         if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
//             alert('First Fill All Fields In Country')
//             return false;

//         } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LOEDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
//             alert('First Fill All Fields In Country')
//             return false;

//         }
//     }
// }


  
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
      //  shortname = "OL" + shortname;
     // $scope.counter = parseInt($scope.counter) + 1;
      $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;

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

      }

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
            return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId  && item.SubMarketId == $scope.FinalCountryLaunchColl[z].SubMarketId);

          //  return (item.Role == 'Initiator' && item.MarketId == $scope.FinalCountryLaunchColl[z].MarketId);
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
      //Insert Data into Parent List (SingleBidBusinessCase)
      var strOLBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items";
      var OLBusinessCaseData = {
          __metadata: {
              'type': 'SP.Data.SingleBidBusinessCaseListItem'
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
          BusinessCaseDescription:$scope.BusinessCaseDescription,
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
      Logics.addData(strOLBusinessCaseURL, OLBusinessCaseData).then(function (OLBusCaseData) {
          $scope.OLBusinessCaseIntID = OLBusCaseData.data.d.Id;
          console.log($scope.OLBusinessCaseIntID);
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
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('SingleBidLaunchDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.SingleBidLaunchDetailsListItem"
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


                    
                    BidAuthorityId:$scope.FinalCountryLaunchColl[z].BidAuthority,
                    BidDueDate:$scope.FinalCountryLaunchColl[z].BidDueDate,
                    SupplyStartDate:$scope.FinalCountryLaunchColl[z].SupplyStartDate,
                    SupplyEndDate:$scope.FinalCountryLaunchColl[z].SupplyEndDate,


                    SingleBidBusinessCaseId: $scope.OLBusinessCaseIntID
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
        for (var z = 0; z < $scope.FinalSKUColl.length; z++) {
            index++;
            var getLaunchID = AddedLaunchids.filter(function (item) {
                return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
            });
            console.log(getLaunchID);
            insertSKUDetailsBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('SingleBidSKUDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.SingleBidSKUDetailsListItem"
                    },
                    Quantity: $scope.FinalSKUColl[z].SKUQunatity,
                    SkuUnitId: $scope.FinalSKUColl[z].SKUUnit,
                    PackingTypeId: $scope.FinalSKUColl[z].PackingType,
                    Pack: $scope.FinalSKUColl[z].PackSize,
                    SingleBidLaunchDetailId: getLaunchID[0].LunchID,
                    SingleBidBusinessCaseId: $scope.OLBusinessCaseIntID
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);
            if (index == $scope.FinalSKUColl.length) {

                $scope.ddlStrategy="Outlicensing";
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
                //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.OLBUCaseColl[0].Id + "/" + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                //     + " to open business case document";

                // Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.InitiatorsGroupsName, emailSubject, emailBody);


                //



                alert("Business Case Saved Successfully!!");
                $location.path("/InitiatorSingDash");
                // var alertMessage = "Request has been submitted";
                // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorLP");
                // Utilities.closeDialogBox();

                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorSingDash");

    }
   
    
});