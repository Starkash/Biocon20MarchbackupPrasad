appOperations.controller("EditCapexLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorCAPEXDash');
    } else {
        // alert("jji");
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
        // $scope.IntiateID =168;// $scope.BcInitiateDetails.ID;

    }

    $scope.selectedContTypeDes = [];

    // arind
    $scope.setting5 = { idProperty: 'id' };  // Multiple checkbox selection on Edit 
    $scope.CompletionYearOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    $scope.openCompletionYear = function (OnGround) {
        //  $scope.LOEdateDatePopUp.opened = true;
        OnGround.IsOpenDate = true;
    };

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
    $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,StrategyId&$expand=Strategy&$top=100&$orderby=ID";
    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Entity')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    // var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$orderby=ID ";
    // var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    // var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    // var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
    // // var strOLBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    // var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    // var strOLBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'Capex'&$top=5000&$orderby=ID"; // cascading


    var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,LapVersion,BusinessCaseDescription,CapexContext/Id,CapexContext/Title,CapexContextCode/Id,CapexContextCode/Code,BlockName,BusinessCaseName,Modified,Editor/Id,Editor/Title,InitiationDate,CapexValue,CapexCurrency/Id,CapexCurrency/Title,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,ProductCategory/Id,ProductCategory/Title,VersionNo,CaseStage/Id,CaseStage/Title,CaseStatus,IsDataInputStageUpdated,Site/Id,Site/Title&$expand=Strategy,CapexCurrency,SubStrategy,CaseStage,Initiators,Editor,CapexContextCode,CapexContext,Reviewers,Validators,ProductCategory,Site&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strCapexBusinessCasePhaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?&$select=Id,Title,Phase,PhaseTotal,TriggerYear,CompletionYear,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase&$top=5000&$orderby=ID asc";


    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Site')/items?$select=*&$top=500&$orderby=Id desc";

    // $scope.setting5 = {
    //     scrollableHeight: '200px',
    //     scrollable: true,
    //     enableSearch: true,
    //     showCheckAll: true
    //     //showUncheckAll:false
    // };
    //CapexProductDetails iska collection result konsa hai

    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading


    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strRoleMasterUrl, strCapexBusinessCaseUrl, strCapexBusinessCasePhaseUrl, strOutLicensingSKUDetailsUrl, strSiteUrl, strCurrencyMasterUrl];
   
    $scope.isLoading=false;
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        function callMultiSelect(argument) {
            $('#ddnmembers').fSelect();
            // $('#ddnRJmembers').fSelect();  sku list ka collection 
        }
        $scope.ExistMarketRowColl = [];
        $scope.StrategyColl = batchedData[0].d.results;
        $scope.SubStrategyColl = batchedData[1].d.results;
        $scope.ProductCategoryColl = batchedData[2].d.results;
        $scope.ProductMasterColl = batchedData[3].d.results;

        $scope.RoleMasterColl = batchedData[4].d.results;
        $scope.CapexBusinessCaseColl = batchedData[5].d.results;
        $scope.CapexBusinessCasePhaseColl = batchedData[6].d.results;
        $scope.OLSKUColl = batchedData[7].d.results;
        $scope.SiteColl = batchedData[8].d.results;
        $scope.CurrencyMasterColl = batchedData[9].d.results;

        $scope.OldCapexPhaseColl = [];

        if ($scope.CapexBusinessCaseColl.length > 0) {
            $scope.BusinessCaseName = $scope.CapexBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.CapexBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.CapexBusinessCaseColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.CapexBusinessCaseColl[0].InitiationDate);
            $scope.ddlProductCategory = $scope.CapexBusinessCaseColl[0].ProductCategory.Id;

            $scope.ddlStrategy = $scope.CapexBusinessCaseColl[0].Strategy.Id;
            $scope.ddlSite = $scope.CapexBusinessCaseColl[0].Site.Id;
            $scope.ddlStrategy1 = $scope.CapexBusinessCaseColl[0].Strategy.Title;
            $scope.BUTitle=$scope.CapexBusinessCaseColl[0].Title;


            $scope.ddlSubStrategy = $scope.CapexBusinessCaseColl[0].SubStrategy.Id;
            //   $scope.ddlSubStrategy = $scope.CapexBusinessCaseColl[0].SubStrategy.Id;
            $scope.CapexPhaseTotal2 = parseFloat($scope.CapexBusinessCaseColl[0].CapexValue);
          //  $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);
            $scope.ddlCapexCurrency = $scope.CapexBusinessCaseColl[0].CapexCurrency.Id;
            $scope.Escalation = parseFloat($scope.CapexBusinessCaseColl[0].Escalation);
            $scope.EscalationRemarks = $scope.CapexBusinessCaseColl[0].EscalationRemarks;
            $scope.auditDate = new Date($scope.CapexBusinessCaseColl[0].BCCompletionYear);
            $scope.CurrDate = new Date($scope.CapexBusinessCaseColl[0].InitiationDate);
            $scope.NoofProducts = parseInt($scope.CapexBusinessCaseColl[0].NumberOfProducts);
            $scope.Modified = new Date($scope.CapexBusinessCaseColl[0].Modified);
            $scope.BusinessCaseDescription = $scope.CapexBusinessCaseColl[0].BusinessCaseDescription;
            $scope.BlockName = $scope.CapexBusinessCaseColl[0].BlockName;
            $scope.CapexContext = $scope.CapexBusinessCaseColl[0].CapexContext.Title;
            $scope.CapexContextCode = $scope.CapexBusinessCaseColl[0].CapexContextCode.Code;
            $scope.LapVersion = $scope.CapexBusinessCaseColl[0].LapVersion;




        }

        if ($scope.BcInitiateDetails.CaseStatus == "Draft") {
            $scope.CaseStatus = "Initiated"
            $scope.IsDataInputStageUpdated = 0;
            $scope.VersionNo = "1.0",
            $scope.LapVersion="V0"

        }
        else if ($scope.BcInitiateDetails.CaseStatus == "Data Input Stage") {
            $scope.CaseStatus = "Data Input Stage",
                $scope.IsDataInputStageUpdated = 1;

        }

        // $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
        //     return (item.ProductCategoryNameId == $scope.ddlProductCategory);
        // });

        var newAuditItem;
        $scope.cfsaAuditColl = [];



        $scope.selectedOnGroundRJDes = [];



        if ($scope.CapexBusinessCasePhaseColl.length > 0) {

            $scope.ProdColl = [];

            for (var t = 0; t < $scope.CapexBusinessCasePhaseColl.length; t++) {


                $scope.OldCapexPhaseColl.push({
                    "CapexPhaseTotal": $scope.CapexBusinessCasePhaseColl[t].PhaseTotal,
                    "Id": $scope.CapexBusinessCasePhaseColl[t].Id,

                    "FillingDate": new Date($scope.CapexBusinessCasePhaseColl[t].TriggerYear), //
                    "LOEDate": new Date($scope.CapexBusinessCasePhaseColl[t].CompletionYear),
                    "CompletionYear": new Date($scope.CapexBusinessCasePhaseColl[t].CompletionYear),
                    "ProdColl": $scope.ProdColl,
                    "ddlProductName": 0,
                    "getProductame": '',
                    // "selectedProjectNames":$scope.CapexBusinessCasePhaseColl[t].selectedProjectNames,
                    "HideAddButtonMarket": false,
                    "HideRemoveButton": true
                });



                for (var i = 0; i < $scope.OldCapexPhaseColl.length; i++) {

                    $scope.filteredProductColl = $scope.OLSKUColl.filter(function (item) {
                        return ($scope.OldCapexPhaseColl[i].Id == item.CapexPhase.Id);
                    });
                    $scope.ProdColl = [];
                    var UpdateInExistingAdd = [];
                    for (var r = 0; r < $scope.filteredProductColl.length; r++) {


                        $scope.ProdColl.push({
                            "ddlProductName": $scope.filteredProductColl[r].ProductName.Id,
                            "ProductSubheading": $scope.filteredProductColl[r].ProductSubheading,
                            "getProductame": $scope.ProductMasterColl,
                            // "ddlProductName": 0,
                            "HideAddButtonMarket": false,
                            "HideRemoveButton": true,
                            "UpdateInExistingAdd": 'Yes',
                            "PhaseIntId": $scope.OldCapexPhaseColl[i].Id,
                            "SkuID": $scope.filteredProductColl[r].Id

                        });
                    }
                    $scope.OldCapexPhaseColl[i].ProdColl = $scope.ProdColl;


                }


            }


        }



        if ($scope.SubStrategyColl.length > 0) {
            $scope.ddlSubStrategyText = $scope.SubStrategyColl[0].Title;
        }

        $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString()

        //BIND STARGEY DROPDOWN
        $scope.bindstrategy = function (ddlStrategy) {
            $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
        }
        //BIND PRODUCT DROPDOWN    
        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ppedescriptioncoll.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
            $scope.ProdCode = $scope.getProductame[0].ProductCode;
        };


        console.log($scope.OldCapexPhaseColl)




        $scope.selectedContTypeDes = [];

        // var counter;
        // var vRetVal;
        // if ($scope.CapexBusinessCaseColl.length > 0) {
        //     var Logg = $scope.CapexBusinessCaseColl[0].Title;
        //     if (Logg == null) {
        //         counter = 0;
        //     } else {
        //         // BIOCON-OUT-LIC-1
        //         var Result = Logg.split("-");
        //         $scope.counter = Result[0];

        //     }
        // } else {
        //     $scope.counter = "000";
        // }
        // counter = parseInt(counter) + 1;
        // $scope.BUTitle = vRetVal;
        // var i = 0;
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

        // $scope.bindproduct = function (ddlProductCategory) {
        //     $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
        //         return (item.ProductCategoryNameId == $scope.ddlProductCategory);
        //     });
        //     $scope.ProdCode = $scope.getProductame[0].ProductCode;

        //$scope.ProductNameColl.push($scope.getProductame);

        // for (var n = 0; n < $scope.getProductame.length; n++) {
        //     $scope.finalppcommoditycoll = [{
        //         "label": $scope.getProductame[n].Product,
        //         "id": $scope.getProductame[n].Id

        //     }];
        //         for (i = 0; i <  $scope.finalppcommoditycoll.length; i++) {
        //             if (unique.indexOf( $scope.finalppcommoditycoll[i]) === -1) {
        //                 unique.push( $scope.finalppcommoditycoll[i]);
        //             }
        //         }

        //     console.log(unique);
        //     $scope.dosagessColl.push(unique[0]);


        // }

        //  };




        // onload

        $scope.PhaseTotal = [];
        var CapexPhaseTotal1 = 0;
        if($scope.Escalation==null){
            $scope.Escalation=0;   
        }
        for (var i = 0; i < $scope.OldCapexPhaseColl.length; i++) {
            if ($scope.OldCapexPhaseColl[i].CapexPhaseTotal == undefined || $scope.OldCapexPhaseColl[i].CapexPhaseTotal == "" || $scope.OldCapexPhaseColl[i].CapexPhaseTotal == NaN || $scope.OldCapexPhaseColl[i].CapexPhaseTotal== null) {
                //  $scope.CapexPhaseTotal1 = "";
                $scope.OldCapexPhaseColl[i].CapexPhaseTotal=0;
              }
            CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.OldCapexPhaseColl[i].CapexPhaseTotal);
        }
        for (var i = 0; i < $scope.cfsaAuditColl.length; i++) {
            if ($scope.cfsaAuditColl[i].CapexPhaseTotal == undefined || $scope.cfsaAuditColl[i].CapexPhaseTotal == "" || $scope.cfsaAuditColl[i].CapexPhaseTotal== NaN || $scope.cfsaAuditColl[i].CapexPhaseTotal== null) {
                //  $scope.CapexPhaseTotal1 = "";
                $scope.cfsaAuditColl[i].CapexPhaseTotal=0;
              }
            CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.cfsaAuditColl[i].CapexPhaseTotal);
        }
        if (CapexPhaseTotal1 != 0) {
            CapexPhaseTotal1 = CapexPhaseTotal1;
           
            $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);
            $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);
        }
        $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);
        $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);

        //




        $scope.OnCapexValueChange = function () {
            // var CapexPhaseTotal1= $scope.OldCapexPhaseColl[0].CapexPhaseTotal;
            $scope.PhaseTotal = [];
            var CapexPhaseTotal1 = 0;
            if($scope.Escalation==null){
                $scope.Escalation=0;   
            }
            for (var i = 0; i < $scope.OldCapexPhaseColl.length; i++) {
                if ($scope.OldCapexPhaseColl[i].CapexPhaseTotal == undefined || $scope.OldCapexPhaseColl[i].CapexPhaseTotal == "" || $scope.OldCapexPhaseColl[i].CapexPhaseTotal == NaN || $scope.OldCapexPhaseColl[i].CapexPhaseTotal== null) {
                    //  $scope.CapexPhaseTotal1 = "";
                    $scope.OldCapexPhaseColl[i].CapexPhaseTotal=0;
                  }
                CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.OldCapexPhaseColl[i].CapexPhaseTotal);
            }
            for (var i = 0; i < $scope.cfsaAuditColl.length; i++) {
                if ($scope.cfsaAuditColl[i].CapexPhaseTotal == undefined || $scope.cfsaAuditColl[i].CapexPhaseTotal == "" || $scope.cfsaAuditColl[i].CapexPhaseTotal== NaN || $scope.cfsaAuditColl[i].CapexPhaseTotal== null) {
                    //  $scope.CapexPhaseTotal1 = "";
                    $scope.cfsaAuditColl[i].CapexPhaseTotal=0;
                  }
                CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.cfsaAuditColl[i].CapexPhaseTotal);
            }
            if (CapexPhaseTotal1 != 0) {
                CapexPhaseTotal1 = CapexPhaseTotal1;
               
                $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);
                $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);
            }
            $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);
            $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);


        };

        // edit product count
       var countofproduct = [];


        $scope.ProdCount = function () {


            countofproduct = [];
            
            // objppe = [];
            if ($scope.OldCapexPhaseColl.length > 0) {

                for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {


                    for (var t = 0; t < $scope.OldCapexPhaseColl[z].ProdColl.length; t++) {


                        var a = $scope.OldCapexPhaseColl[z].ProdColl[t].ddlProductName;

                        if (a != undefined && a !== "" && a != 0) {
                            countofproduct.push(a)
                        }
                    }
                }
            }
            if ($scope.cfsaAuditColl.length > 0) {

                for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {



                    for (var t = 0; t < $scope.cfsaAuditColl[z].ProdColl.length; t++) {


                        var a = $scope.cfsaAuditColl[z].ProdColl[t].ddlProductName;

                        if (a != undefined && a !== "" && a != 0) {
                            countofproduct.push(a)
                        }
                    }

                }
            }
            // filter unique value of array // arvind
            var uniqueCount = new Set(countofproduct).size;
            console.log(uniqueCount);
            $scope.Productcount = uniqueCount;

            console.log($scope.Productcount);

            //  }
        }

        // on load count


        //  $scope.ProdCount = function () {

        if ($scope.OldCapexPhaseColl.length > 0) {

            for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {


                for (var t = 0; t < $scope.OldCapexPhaseColl[z].ProdColl.length; t++) {


                    var a = $scope.OldCapexPhaseColl[z].ProdColl[t].ddlProductName;

                    if (a != undefined && a !== "" && a != 0) {
                        countofproduct.push(a)
                    }
                }
            }
        }
        if ($scope.cfsaAuditColl.length > 0) {

            for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {



                for (var t = 0; t < $scope.cfsaAuditColl[z].ProdColl.length; t++) {


                    var a = $scope.cfsaAuditColl[z].ProdColl[t].ddlProductName;

                    if (a != undefined && a !== "" && a != 0) {
                        countofproduct.push(a)
                    }
                }

            }
        }
        // filter unique value of array // arvind
        var uniqueCount = new Set(countofproduct).size;
        console.log(uniqueCount);
        $scope.Productcount = uniqueCount;

        console.log($scope.Productcount);

        //  }
        // }
        //

        //
        // Count product (counter of unique product)
        // var uniqueCount;
        // $scope.ProdCount = function () {
        //     var objppe = [];
        //     objppe.push($scope.cfsaAuditColl);
        //     objppe.push($scope.OldCapexPhaseColl);


        //     for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {
        //         if ($scope.cfsaAuditColl[z].selectedContTypeDes.length > 0) {
        //             for (var i = 0; i < $scope.cfsaAuditColl[z].selectedContTypeDes.length; i++) {
        //                 console.log(objppe);
        //                 var a = $scope.cfsaAuditColl[z].selectedContTypeDes[i].id;
        //                 objppe.push(a)
        //             }
        //         }
        //         // $scope.ProdId = {
        //         //     "results": objppe
        //         // };

        //         // filter unique value of array // arvind
        //         uniqueCount = new Set(objppe).size;
        //         console.log(uniqueCount);
        //         $scope.Productcount = uniqueCount;

        //     }
        // }


        $scope.OnCapexValueChangeNeg = function () {

            if($scope.Escalation==null){
                $scope.Escalation=0;   
            }

            // var CapexPhaseTotal1= $scope.OldCapexPhaseColl[0].CapexPhaseTotal;
            $scope.PhaseTotal = [];
            var CapexPhaseTotal1 = 0;
            if ($scope.OldCapexPhaseColl.length > 0) {
                for (var i = 0; i < $scope.OldCapexPhaseColl.length; i++) {
                    CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.OldCapexPhaseColl[i].CapexPhaseTotal);
                }
            }
            if ($scope.cfsaAuditColl.length > 0) {

                for (var i = 0; i < $scope.cfsaAuditColl.length; i++) {
                    CapexPhaseTotal1 = CapexPhaseTotal1 + ($scope.cfsaAuditColl[i].CapexPhaseTotal);
                }
            }
            if (CapexPhaseTotal1 != 0) {
                CapexPhaseTotal1 = CapexPhaseTotal1;
                $scope.CapexPhaseTotal2 = CapexPhaseTotal1+parseFloat($scope.Escalation);
                $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);
            }

        };

        $scope.removeAuditItem = function (PhaseObj, $event) {

            $event.currentTarget.style.display = "none";

            //   var  boolCapexValue='false'
            //     if($scope.cfsaAuditColl.length>1){
            //       for(var r =0;r<$scope.cfsaAuditColl.length;r++){
            //         if(PhaseObj.CapexPhaseTotal==($scope.cfsaAuditColl[r].CapexPhaseTotal)){
            //             boolCapexValue='True';
            //         }

            //       }
            //         if(boolCapexValue='True')

            //         $scope.CapexPhaseTotal2=($scope.CapexValue)-(PhaseObj.CapexPhaseTotal)/10000000;

            //     }
            // $scope.Productcount=uniqueCount;     // counter of unique product
           

            var t = $scope.cfsaAuditColl.indexOf(PhaseObj);
            $scope.cfsaAuditColl.splice(t, 1);
            $scope.OnCapexValueChangeNeg();
            $scope.ProdCount();

            if ($scope.cfsaAuditColl.length > 0 && $scope.cfsaAuditColl.length <= 1) {
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideAddButton = false;
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideRemoveButton = true;
                $scope.showSubmit = true;
            } else {
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideAddButton = false;
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideRemoveButton = false;
            }
            $scope.setLoading(false);

        }


    });
    //}   //

    //arvin add new phase
    //  $scope.AddProd=function(abc){


    //     if($scope.OldCapexPhaseColl.length>0){
    //         $scope.newProdColl=[];
    //         abc.newProdColl[abc.ProdColl.length-1];



    //     }


    //  }

    $scope.AddProdInExisting = function (Phaseobj, PhaseIntId) {
        UpdateInExistingAdd = [];
        if (Phaseobj == null) {
            $scope.ProdColl.push({

                // "ddlProductName":0,
                "getProductame": $scope.ProductMasterColl,
                "ProductSubheading": '',
                "UpdateInExistingAdd": 'Yes',
                "ID": Phaseobj.ID,
                "HideAddButtonMarket": false,
                "HideRemoveButton": false
            });

            if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
            }


        }

        //stopworkimg
        if (Phaseobj != null) {

            //$scope.PhaseCollshow=true;
            for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {
                if ($scope.OldCapexPhaseColl[z].Id == Phaseobj.Id) {

                    // var filteredPhase=[];
                    // filteredPhase = $scope.OldCapexPhaseColl.filter(function (item) {
                    //     return (item.Id == $scope.OldCapexPhaseColl[z].Id);
                    // });

                    // console.log( filteredPhase);

                    //$scope.CapexPhaseColl[Phaseobj.Phase-1].newProdColl.push({
                    // for(var v=0;v<filteredPhase.length;v++){
                    var Prodleng = $scope.OldCapexPhaseColl[z].ProdColl.length;
                    var ProdColl1 = [];
                    var AddInExistingAdd = [];
                    ProdColl1.push({


                        // "ddlProductName":0,
                        "getProductame": $scope.ProductMasterColl,
                        "ProductSubheading": '',
                        //   "ParentID": $scope.OldCapexPhaseColl[i].Id,

                        "HideAddButtonMarket": false,
                        "HideRemoveButton": false,
                        "AddInExistingAdd": 'Yes',
                        "ID": $scope.OldCapexPhaseColl[z].Id,

                        "PhaseIntId": Phaseobj.Id
                    });
                    //var lng= $scope.ExistMarketRowColl[i].CountryRow.length ;
                    $scope.OldCapexPhaseColl[z].ProdColl[Prodleng] = ProdColl1[0]

                    // }
                    break;
                }
            }

            if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButtonMarket = true;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
            }


        }
    }

    $scope.newProdColl = [];

    $scope.AddProd = function (Phaseobj, PhaseIntId) {
        if (Phaseobj == null) {
            $scope.ProdColl.push({

              
                "AddInExistingAdd": 'Yes',
                //   "ParentID": $scope.OldCapexPhaseColl[i].Id,

              
                "ID": $scope.cfsaAuditColl[z].Id,

               "ddlProductName": 0,
               
                "ProductMasterColl": $scope.ProductMasterColl,
                "ProductSubheading": '',
                "ID": Phaseobj.ID,
                "HideAddButtonMarket": false,
                "HideRemoveButton": false
            });

            if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].hidecountryRow = false;
            }





        }

        //stopworkimg
        if (Phaseobj != null) {

            $scope.PhaseCollshow = true;
            for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {

                // var filteredPhase=[];
                //     filteredPhase = $scope.CapexBusinessCaseColl.filter(function (item) {
                //         return (item.Id == $scope.CapexBusinessCaseColl[z].Id);
                //     });

                // console.log( filteredPhase);

                //$scope.CapexPhaseColl[Phaseobj.Phase-1].newProdColl.push({
                if ($scope.cfsaAuditColl[z].Phase == Phaseobj.Phase) {
                    var Prodleng = $scope.cfsaAuditColl[z].ProdColl.length;
                    var ProdColl1 = [];
                    AddInExistingAdd = [];

                    ProdColl1.push({


                        //"ddlProductName": 0,
                        "ProductMasterColl": $scope.ProductMasterColl,
                        "ProductSubheading": '',
                        "AddInExistingAdd": 'Yes',
                        //   "ParentID": $scope.OldCapexPhaseColl[i].Id,

                        "HideAddButtonMarket": false,
                        "HideRemoveButton": false,
                        "ID": $scope.cfsaAuditColl[z].Id,
                        



                        "Phase": Phaseobj.Phase
                    });
                    $scope.cfsaAuditColl[z].ProdColl[Prodleng] = ProdColl1[0]
                    break;

                }
            }

            if ($scope.cfsaAuditColl.length > 0 && $scope.cfsaAuditColl.length <= 1) {
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideRemoveButtonMarket = true;
                $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].hidecountryRow = false;
            }


        }
    }


    // REMOVE LATES
    $scope.removeAuditItem1 = function (Capex, Prod, $event) {
        $event.currentTarget.style.display = "none";

        // var boolCapexValue = 'false'
        // if ($scope.ProdColl.length > 1) {
        //     for (var r = 0; r <= $scope.ProdColl.length; r++) {
        //         if (Capex.CapexPhaseTotal == ($scope.ProdColl[r].CapexPhaseTotal)) {
        //             boolCapexValue = 'True';
        //         }

        //     }
        //     if (boolCapexValue = 'True')

        //         //   $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(Capex.CapexPhaseTotal)/10000000
        //         $scope.CapexPhaseTotal2 = ($scope.CapexPhaseTotal2) - (Capex.CapexPhaseTotal);


        // }
        // counter of unique product




        var objppe = [];



        var t = Capex.ProdColl.indexOf(Prod);
        Capex.ProdColl.splice(t, 1);
        $scope.ProdCount();

        if (Capex.ProdColl.length > 0 && Capex.ProdColl.length <=1) {
            Capex.ProdColl[Capex.ProdColl.length - 1].HideAddButton = false;
            Capex.ProdColl[Capex.ProdColl.length - 1].HideRemoveButton = false;
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


    // remove in existing

    $scope.ExistingremoveAuditItem = function (Capex, Prod, $event) {
        $event.currentTarget.style.display = "none";

        // var boolCapexValue = 'false'
        // if ($scope.ProdColl.length > 1) {
        //     for (var r = 0; r <= $scope.ProdColl.length; r++) {
        //         if (Capex.CapexPhaseTotal == ($scope.ProdColl[r].CapexPhaseTotal)) {
        //             boolCapexValue = 'True';
        //         }

        //     }
        //     if (boolCapexValue = 'True')

        //         //   $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(Capex.CapexPhaseTotal)/10000000
        //         $scope.CapexPhaseTotal2 = ($scope.CapexPhaseTotal2) - (Capex.CapexPhaseTotal);


        // }
        // counter of unique product




        var objppe = [];



        var t = Capex.ProdColl.indexOf(Prod);
        Capex.ProdColl.splice(t, 1);
        $scope.ProdCount();

        ///



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

        ///
        $scope.ProdCount();

        if (Capex.ProdColl.length > 0 && Capex.ProdColl.length <=1) {
            Capex.ProdColl[Capex.ProdColl.length - 1].HideAddButton = false;
            Capex.ProdColl[Capex.ProdColl.length].HideRemoveButton = false;
            $scope.showSubmit = true;
        } else {
            Capex.ProdColl[Capex.ProdColl.length - 1].HideAddButton = false;
            Capex.ProdColl[Capex.ProdColl.length].HideRemoveButton = false;
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


    ///




    $scope.HideAddButton = function (PhaseObj) {
        $scope.newMarketColldiv = true;
        var oldMarket = $scope.cfsaAuditColl.length;
        var newMarket = $scope.OldCapexPhaseColl.length;
        var SumMarketLength = parseInt((oldMarket) + (newMarket))
        if (SumMarketLength > 30) {
            alert("Can not Add more than 30 Market");
            return false;
        }
        if (PhaseObj != 'new') {
            $scope.ProdColl = [];

            $scope.ProdColl.push({


                // "ddlProductName":0,
                "ProductMasterColl": $scope.ProductMasterColl,
                "Phase": parseInt(SumMarketLength) + 1,
                "ddlpr": $scope.ProductMasterColl,

                "ProductSubheading": '',
                "AddInExistingAdd": 'Yes',
                "NewSKUEntry": "Yes",
                "ID":PhaseObj.Id,

                "HideAddButtonMarket": false,
                "HideRemoveButton": false,

            });

            $scope.cfsaAuditColl.push({
                "Phase": parseInt(SumMarketLength) + 1,
                "CapexPhaseTotal": 0,
                "FillingDate": "",
                "ID":PhaseObj.Id,
                "ProdColl": $scope.ProdColl,

                // "selectedContTypeDes": [],

                "LOEDate": "",
                "HideAddButtonMarket": false,
                "HideRemoveButtonMarket": false
            });


            var NewPhaseValue = ($scope.cfsaAuditColl[0].CapexPhaseTotal);
            var CapexValue = ($scope.CapexValue) + NewPhaseValue;
            $scope.CapexValue = CapexValue;
        }



        if ($scope.cfsaAuditColl.length > 20) {
            alert("Can not Add more than 20 Market");
            return false;
        }



    }

   

    $scope.removeAuditItem = function (PhaseObj, $event) {
        $event.currentTarget.style.display = "none";
        var leng1 = $scope.cfsaAuditColl.length - 1; //1index

        if ($scope.cfsaAuditColl.length > 1) {
            for (var r = 0; r <= $scope.cfsaAuditColl.length; r++) {
                if (PhaseObj.CapexPhaseTotal == ($scope.cfsaAuditColl[r].CapexPhaseTotal)) {
                    boolCapexValue = 'True';
                }

            }
            if (boolCapexValue = 'True')

                $scope.CapexPhaseTotal2 = ($scope.CapexPhaseTotal2) - (PhaseObj.CapexPhaseTotal);
                $scope.CapexPhaseTotal2 =   $scope.CapexPhaseTotal2.toFixed(2);

        }
        //   $scope.Productcount=uniqueCount;     // counter of unique product


        var t = $scope.cfsaAuditColl.indexOf(PhaseObj);
        $scope.cfsaAuditColl.splice(t, 1);


        if ($scope.cfsaAuditColl.length > 0 && $scope.cfsaAuditColl.length <= 1) {
            $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideAddButtonMarketRow = false;
            $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideRemoveButtonMarketRow = true;
            $scope.showSubmit = true;
        } else {
            $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideAddButtonMarketRow = false;
            $scope.cfsaAuditColl[$scope.cfsaAuditColl.length - 1].HideRemoveButtonMarketRow = false;
        }

    },
        function (btn) {
            $event.currentTarget.style.display = "inline-block";

            $scope.isDeleting = true;

        }



    $scope.onSubmit = function () {

        if ($scope.BcInitiateDetails.CaseStatus == "Draft") {
            $scope.CaseStatus = "Initiated"
        }
        else if ($scope.BcInitiateDetails.CaseStatus == "Data Input Stage") {
            $scope.CaseStatus = "Data Input Stage"
        }



        // Edit Validation

        if ($scope.Escalation > 0) {

            if ($scope.EscalationRemarks == '' || $scope.EscalationRemarks == "" || $scope.EscalationRemarks == undefined || $scope.EscalationRemarks == null) {

                alert('Please provide the Escalation Remarks!');
                return false;
            }



       }
     

       if ($scope.Escalation == 0) 
       {
        $scope.EscalationRemarks="";


       }


        for (var a = 0; a < $scope.cfsaAuditColl.length; a++) {
            for (var r = 0; r < $scope.cfsaAuditColl[a].ProdColl.length; r++) {

                if ($scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != null || $scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != undefined || $scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != '') {

                    if (($scope.cfsaAuditColl[a].ProdColl[r].ProductSubheading == '' && $scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != null) || ($scope.cfsaAuditColl[a].ProdColl[r].ProductSubheading == undefined  && $scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != null)|| ($scope.cfsaAuditColl[a].ProdColl[r].ProductSubheading == null && $scope.cfsaAuditColl[a].ProdColl[r].ddlProductName != null)) {

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




        
        for (var a = 0; a < $scope.OldCapexPhaseColl.length; a++) {
            for (var r = 0; r < $scope.OldCapexPhaseColl[a].ProdColl.length; r++) {

                if ($scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != null || $scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != undefined || $scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != '') {

                    if (($scope.OldCapexPhaseColl[a].ProdColl[r].ProductSubheading == '' && $scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != null) || ($scope.OldCapexPhaseColl[a].ProdColl[r].ProductSubheading == undefined  && $scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != null)|| ($scope.OldCapexPhaseColl[a].ProdColl[r].ProductSubheading == null && $scope.OldCapexPhaseColl[a].ProdColl[r].ddlProductName != null)) {

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



        //




        var deferred = $q.defer();

        var updatedBUBatch = [];
        $scope.InsertSKUDetails = [];
        $scope.UpdateLaunchDetails = [];
        $scope.InsertLaunchDetails = [];
        $scope.UpdateSKUDetails = [];
        $scope.UpdateLaunchDetailsNew = [];
        $scope.InsertLaunchDetailsNew = [];
        $scope.InsertLaunchDetailsNew12=[];
        var marLen = $scope.ExistMarketRowColl.length - 1;



        // sku update and insert

        for (var i = 0; i < $scope.OldCapexPhaseColl.length; i++) {
            for (var j = 0; j < $scope.OldCapexPhaseColl[i].ProdColl.length; j++) {

                if ($scope.OldCapexPhaseColl[i].ProdColl[j].UpdateInExistingAdd == "Yes") {

                    $scope.UpdateLaunchDetails.push($scope.OldCapexPhaseColl[i].ProdColl[j])
                }
                if ($scope.OldCapexPhaseColl[i].ProdColl[j].AddInExistingAdd == "Yes") {
                    $scope.InsertLaunchDetails.push($scope.OldCapexPhaseColl[i].ProdColl[j])
                }
            }
        }


        //return false;

        // for new add phase
        if ($scope.cfsaAuditColl.length > 0) {
            for (var i = 0; i < $scope.cfsaAuditColl.length; i++) {
                for (var j = 0; j < $scope.cfsaAuditColl[i].ProdColl.length; j++) {

                    if ($scope.cfsaAuditColl[i].ProdColl[j].UpdateInExistingAdd == "Yes") {

                        $scope.UpdateLaunchDetailsNew.push($scope.cfsaAuditColl[i].ProdColl[j])
                    }
                    if ($scope.cfsaAuditColl[i].ProdColl[j].AddInExistingAdd == "Yes") {
                      $scope.InsertLaunchDetailsNew.push($scope.cfsaAuditColl[i].ProdColl[j])
                       // $scope.InsertLaunchDetailsNew12.push($scope.cfsaAuditColl[i])
                    }
                }
            }
        }




   //   return false;
        //abhi chek kar  RAKA  AB UPDATE KAR  ab chek kar



        // for (var i = 0; i < $scope.UpdateLaunchDetails.length; i++) 
        // {
        //     var skuUpdate = $scope.UpdateLaunchDetails[i].SKURow.filter(function (item) {
        //         return (item.ExistSKUEntry == "Yes");
        //     });
        //     if (skuUpdate.length == 1) {
        //         $scope.UpdateSKUDetails.push(skuUpdate[0]);
        //     } else if (skuUpdate.length > 1) {
        //         for (var j = 0; j < skuUpdate.length; j++) {
        //             $scope.UpdateSKUDetails.push(skuUpdate[j])
        //         }
        //     }
        //     var skuline = $scope.UpdateLaunchDetails[i].SKURow.filter(function (item) {
        //         return (item.NewSKUEntry == "Yes");
        //     });
        //     if (skuline.length > 0) {
        //         for (var j = 0; j < skuline.length; j++) {
        //             $scope.InsertSKUDetails.push(skuline[j])
        //         }

        //     }
        // }

        // if ($scope.InsertLaunchDetails.length > 0) 
        // {
        //     for (var i = 0; i < $scope.InsertLaunchDetails.length; i++) 
        //     {
        //         for (var j = 0; j < $scope.InsertLaunchDetails[i].SKURow.length; j++)
        //         {
        //             $scope.InsertSKUDetails.push($scope.InsertLaunchDetails[i].SKURow[j])
        //         }
        //     }
        // }

        //

        $scope.disabledFlag = true;
        //Fetechin member from role master based on   Reviewer,  Initiator,
        var pplInitiator = []; var pplReviewer = []; var pplValidator = [];

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

        //if ($scope.newMarketRow1Coll.length > 0) {



        $scope.fiterdInitiatorMemberNew = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Initiator');
        });
        $scope.fiterdReviewerMemberNew = $scope.RoleMasterColl.filter(function (item) {
            return (item.Role == 'Reviewer');
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


        $scope.isLoading=true;

        //  }

        //Update Data into Parent List (CapexBusinessCase)


        updatedBUBatch.push({

            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")",
            action: "UPDATE",
            data: {
                __metadata: {
                    type: "SP.Data.CapexBusinessCaseListItem"
                },
                CaseStatus: $scope.CaseStatus
                , InitiatorsId: { 'results': pplInitiator }
                , ReviewersId: { 'results': pplReviewer }
                , ValidatorsId: { 'results': pplValidator }
                , VersionNo: $scope.VersionNo
                , LapVersion:$scope.LapVersion

                , IsDataInputStageUpdated: $scope.IsDataInputStageUpdated
                ,NumberOfProducts:$scope.Productcount 
                ,CapexValue: $scope.CapexPhaseTotal2
                ,Escalation:$scope.Escalation
                ,EscalationRemarks:$scope.EscalationRemarks
                ,BusinessCaseDescription:$scope.BusinessCaseDescription


            }
        });
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch).then(function (updatedBUBatch) {
            console.log(updatedBUBatch);

            $scope.LaunchPhaseDetails();

            deferred.resolve();
            $scope.isLoading=false;
            alert("Business Case updated Successfully!!");
            $location.path("/InitiatorCAPEXDash");
        });
        return deferred.promise;


    }


    $scope.LaunchPhaseDetails = function () {
        var noOfLaunchIndex = 0;
        var newnoOfLaunchIndex = $scope.UpdateLaunchDetails.length;
        var insertCountryBatch = [];
        var updateCountryBatch = [];
        var insertSKUDetailsBatch = [];
        $scope.AddedLaunchids = [];
        $scope.AddedLaunchids = [];

        //Main list me data update karna hai

        // if ($scope.CapexBusinessCaseColl.length > 0) {

        //     var BcChangeStage = {

        //         __metadata: {
        //             type: "SP.Data.CapexBusinessCaseListItem"
        //         },
        //         NumberOfProducts: $scope.NoofProducts,
        //         CapexValue: $scope.CapexPhaseTotal2
        //         //$scope.ChagneBusinesscaseStage  


        //     }
        //     // }

        //     var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")";
        //     Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (updaMain) {
        //         console.log(updaMain);;
        //     });


        // }
        for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {
          
            var objppe = [];

            
            updateCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items(" + $scope.CapexBusinessCasePhaseColl[z].Id + ")",
                action: "UPDATE",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.CapexPhaseDetailsListItem"
                    },

                    CompletionYear: $scope.OldCapexPhaseColl[z].CompletionYear,
                    TriggerYear: $scope.OldCapexPhaseColl[z].FillingDate,
                    PhaseTotal: $scope.OldCapexPhaseColl[z].CapexPhaseTotal,
                    CapexBusinessCaseId: $scope.IntiateID
                }
            });
        }

        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updateCountryBatch).then(function (upda) {
            console.log(upda);
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (InsertLaunchDetails) {
                console.log(InsertLaunchDetails);
                $scope.SkuDetails();
                //  $scope.SkuDetails($scope.AddedLaunchids);
                if ($scope.cfsaAuditColl.length > 0) {
                    for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {


                        noOfLaunchIndex++;
                        newnoOfLaunchIndex = parseInt(newnoOfLaunchIndex) + 1;
                        var launchTitle = $scope.BUTitle + "-Phase-" + newnoOfLaunchIndex;
                        insertCountryBatch.push({
                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items",
                            action: "ADD",
                            async: false,
                            data: {
                                __metadata: {
                                    type: "SP.Data.CapexPhaseDetailsListItem"
                                },
                                Title: launchTitle,
                                CompletionYear: $scope.cfsaAuditColl[z].LOEDate,
                                TriggerYear: $scope.cfsaAuditColl[z].FillingDate,
                                PhaseTotal: $scope.cfsaAuditColl[z].CapexPhaseTotal,
                                Phase: parseInt($scope.cfsaAuditColl[z].Phase),
                                CapexBusinessCaseId: $scope.IntiateID
                            }
                        });
                    }


                 //   22865  --19
                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
                            console.log(insertedLaunchData);
                            
                            for (var p = 0; p < insertedLaunchData.length; p++) {
                                var coll = {};
                                coll.LunchID = insertedLaunchData[p].d.Id;


                                 coll.Phase = insertedLaunchData[p].d.Phase;
                                coll.LaunchTitle = insertedLaunchData[p].d.Title;
                                $scope.AddedLaunchids.push(coll);

                                console.log($scope.InsertLaunchDetailsNew)
                                console.log( $scope.AddedLaunchids)

                            }
                            if (noOfLaunchIndex == insertedLaunchData.length) {

                                $scope.SkunewDetails($scope.AddedLaunchids);
                            }
                            // alert("Business Case updated Successfully!!");
                            // $location.path("/InitiatorCAPEXDash");
                        });



                    
                }



            });
        });

    }

    $scope.SkunewDetails = function (AddedLaunchids) {
        // var deferred = $q.defer();
        var insertSKUDetailsBatch = [];
        var UpdateSKUDetailsBatch = [];
        var index = 0;
        var count = 0;
       
        if ($scope.InsertLaunchDetailsNew.length > 0) {

            for (var z = 0; z < $scope.InsertLaunchDetailsNew.length; z++) {

                if ($scope.AddedLaunchids.length != 0) {
                    var getLaunchID = AddedLaunchids.filter(function (item) {
                        return (parseInt(item.Phase) == parseInt($scope.InsertLaunchDetailsNew[z].Phase));
                    });
                    var lunchID = getLaunchID[0].LunchID
                }

               
                index++;
                insertSKUDetailsBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items",
                    action: "ADD",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.CapexProductDetailsListItem"
                        },
                        ProductNameId: $scope.InsertLaunchDetailsNew[z].ddlProductName,
                        ProductSubheading: $scope.InsertLaunchDetailsNew[z].ProductSubheading,
                        CapexPhaseId:parseInt(lunchID),
                        CapexBusinessCaseId: $scope.IntiateID
                    }
                });

            }


        }

        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedSKUData) {
            console.log(insertedSKUData);

           
        });
        //   });
        //  return deferred.promise;
    }

    $scope.SkuDetails = function (AddedLaunchids) {
        // var deferred = $q.defer();
        var insertSKUDetailsBatch = [];
        var UpdateSKUDetailsBatch = [];
        var index = 0;
        if ($scope.UpdateLaunchDetails.length > 0) {
            for (var z = 0; z < $scope.UpdateLaunchDetails.length; z++) {
               
                UpdateSKUDetailsBatch.push({
                    reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items(" + $scope.UpdateLaunchDetails[z].SkuID + ")",
                    action: "UPDATE",
                    async: false,
                    data: {
                        __metadata: {
                            type: "SP.Data.CapexProductDetailsListItem"
                        },
                        ProductNameId: $scope.UpdateLaunchDetails[z].ddlProductName,
                        ProductSubheading: $scope.UpdateLaunchDetails[z].ProductSubheading
                       
                    }
                });
            }
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, UpdateSKUDetailsBatch).then(function (updatedSkuData) {
            console.log(updatedSkuData);

            if ($scope.InsertLaunchDetails.length > 0) {
                for (var z = 0; z < $scope.InsertLaunchDetails.length; z++) {
                    index++;
                         insertSKUDetailsBatch.push({
                        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items",
                        action: "ADD",
                        async: false,
                        data: {
                            __metadata: {
                                type: "SP.Data.CapexProductDetailsListItem"
                            },
                            ProductNameId: $scope.InsertLaunchDetails[z].ddlProductName,
                            ProductSubheading: $scope.InsertLaunchDetails[z].ProductSubheading,
                           CapexPhaseId: $scope.InsertLaunchDetails[z].PhaseIntId,
                          //  CapexPhaseId: $scope.InsertLaunchDetails[z].CapexPhase,
                            CapexBusinessCaseId: $scope.IntiateID
                        }
                    });
                }
            }

            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedSKUData) {
                console.log(insertedSKUData);
                // if (index == $scope.InsertSKUDetails.length) {
                //     alert("Request Submitted");
                //     $location.path("/InitiatorOLDash");
                //     deferred.resolve();
                // }
            });
        });
        //  return deferred.promise;
    }



    // $scope.CapexPhaseDetails = function () {

    //     var deferred = $q.defer();
    //     var noOfLaunchIndex = 0;
    //     var insertCountryBatch = [];
    //     var insertSKUDetailsBatch = [];
    //     $scope.AddedLaunchids = [];
    //     var insertCountryBatch = [];
    //     $scope.AddedLaunchids = [];
    //     for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {
    //         noOfLaunchIndex++;
    //         var launchTitle = $scope.BUTitle + "-Phase-" + noOfLaunchIndex;//
    //         $scope.TriggerYear = new Date(($scope.CapexPhaseColl[z].TriggerYear).format("dd-MM-yyyy"));//$scope.CapexPhaseColl[z].CompletionYear.format("dd-MM-yyyy")
    //         $scope.CompletionYear = new Date(($scope.CapexPhaseColl[z].CompletionYear).format("dd-MM-yyyy"));


    //         insertCountryBatch.push({
    //             reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items",
    //             action: "ADD",
    //             async: false,
    //             data: {
    //                 __metadata: {
    //                     type: "SP.Data.CapexPhaseDetailsListItem"
    //                 },
    //                 Title: launchTitle,

    //                 TriggerYear: new Date($scope.CapexPhaseColl[z].TriggerYear),
    //                 CompletionYear: new Date($scope.CapexPhaseColl[z].CompletionYear),
    //                 PhaseTotal: $scope.CapexPhaseColl[z].CapexPhaseTotal,


    //                 CapexBusinessCaseId: $scope.CapexBusinessCaseIntID
    //             }
    //         });
    //     }
    //     Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
    //         console.log(insertedLaunchData);
    //         var s = insertedLaunchData.length;



    //         console.log($scope.CapexPhaseBusinessCaseIntID);
    //         // $scope.SkuDetails = function () {
    //         //     var deferred = $q.defer();
    //         var insertSKUDetailsBatch = [];
    //         var index = 0;
    //         for (var l = 0; l < s; l++) {
    //             $scope.CapexPhaseBusinessCaseIntID = insertedLaunchData[l].d.Id;

    //             for (var i = 0; i < $scope.CapexPhaseColl[l].ProdColl.length; i++) {
    //                 // index++;
    //                 // var getLaunchID = AddedLaunchids.filter(function (item) {
    //                 //     return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
    //                 //   });
    //                 // console.log(getLaunchID);


    //                 insertSKUDetailsBatch.push({
    //                     reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items",
    //                     action: "ADD",
    //                     async: false,
    //                     data: {
    //                         __metadata: {
    //                             type: "SP.Data.CapexProductDetailsListItem"
    //                         },
    //                         ProductNameId: $scope.CapexPhaseColl[l].ProdColl[i].ddlProductName,
    //                         ProductSubheading: $scope.CapexPhaseColl[l].ProdColl[i].ProductSubheading,
    //                         // CapexPhaseId: getLaunchID[0].LunchID,
    //                         CapexBusinessCaseId: $scope.CapexBusinessCaseIntID,
    //                         CapexPhaseId: $scope.CapexPhaseBusinessCaseIntID

    //                     }
    //                 });
    //             }
    //         }

    //         Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
    //             // alert("Business Case Saved Successfully!!");
    //             // $location.path("/InitiatorCAPEXDash");

    //             // console.log(insertedLaunchData);
    //             // if (index == $scope.FinalSKUColl.length) {


    //             //     // var alertMessage = "Request has been submitted";
    //             //     // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorCAPEXDash");
    //             //     // Utilities.closeDialogBox();

    //             deferred.resolve();
    //             // }
    //         });
    //         return deferred.promise;

    //     });
    //     //  return deferred.promise;

    // }



    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorCAPEXDash");

    }

});