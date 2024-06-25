appOperations.controller("EditUSAndaLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    if (Logics.getSharedData() == undefined) {
        $location.path('/EditCapex');
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
     

    $scope.openAuditDate = function() {
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
    $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;
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
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'Capex'&$top=5000&$orderby=ID"; // cascading
    var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,Modified,NumberOfProducts,InitiationDate,Escalation,EscalationRemarks,BCCompletionYear,BusinessCaseName,InitiationDate,CapexValue,CapexCurrency,Site/Id,Site/Title,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title&$expand=Strategy,CaseStage,SubStrategy,ProductCategory,Site,ProductName&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strCapexBusinessCasePhaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?&$select=Id,Title,Modified,PhaseTotal,TriggerYear,CompletionYear,CapexBusinessCase/Id,CapexBusinessCase/Title,ProductName/Id,ProductName/Title&$expand=ProductName,CapexBusinessCase&$filter=CapexBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase&$expand=OutLicensingBusinessCase,OutLicensingLaunchDetail&$filter=OutLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Site')/items?$select=*&$top=500&$orderby=Id desc";

    // $scope.setting5 = {
    //     scrollableHeight: '200px',
    //     scrollable: true,
    //     enableSearch: true,
    //     showCheckAll: true
    //     //showUncheckAll:false
    // };
    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strPartnerUrl, strRoleMasterUrl, strCapexBusinessCaseUrl, strCapexBusinessCasePhaseUrl, strOutLicensingSKUDetailsUrl,strSiteUrl];
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
        $scope.CapexBusinessCaseColl = batchedData[10].d.results;
        $scope.CapexBusinessCasePhaseColl = batchedData[11].d.results;
        $scope.OLSKUColl = batchedData[12].d.results;
        $scope.SiteColl = batchedData[13].d.results;
        
        $scope.OldCapexPhaseColl=[];

        if ($scope.CapexBusinessCaseColl.length > 0) {
            $scope.BusinessCaseName = $scope.CapexBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.CapexBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.CapexBusinessCaseColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.CapexBusinessCaseColl[0].InitiationDate);
            $scope.ddlProductCategory = $scope.CapexBusinessCaseColl[0].ProductCategory.Id;
            $scope.ddlProductName = $scope.CapexBusinessCaseColl[0].ProductName.Id;
            $scope.ddlStrategy = $scope.CapexBusinessCaseColl[0].Strategy.Id;
            $scope.ddlSite = $scope.CapexBusinessCaseColl[0].Site.Id;

            $scope.ddlSubStrategy = $scope.CapexBusinessCaseColl[0].SubStrategy.Id;
         //   $scope.ddlSubStrategy = $scope.CapexBusinessCaseColl[0].SubStrategy.Id;
            $scope.CapexPhaseTotal2 = parseFloat($scope.CapexBusinessCaseColl[0].CapexValue);
            $scope.ddlCapexCurrency =''+$scope.CapexBusinessCaseColl[0].CapexCurrency;
            $scope.Escalation=parseInt($scope.CapexBusinessCaseColl[0].Escalation);
            $scope.EscalationRemarks=$scope.CapexBusinessCaseColl[0].EscalationRemarks;
            $scope.auditDate=new Date($scope.CapexBusinessCaseColl[0].BCCompletionYear);
            $scope.CurrDate=new Date($scope.CapexBusinessCaseColl[0].InitiationDate);
            $scope.NoofProducts =parseInt($scope.CapexBusinessCaseColl[0].NumberOfProducts);
            $scope.Modified = new Date($scope.CapexBusinessCaseColl[0].Modified);
        }

        if($scope.BcInitiateDetails.CaseStatus=="Draft")
        {
            $scope.CaseStatus="Initiated"
            $scope.IsDataInputStageUpdated=0;
            $scope.VersionNo="1.0"
        }
        else if($scope.BcInitiateDetails.CaseStatus=="Data Input Stage")
        {
            $scope.CaseStatus="Data Input Stage",
            $scope.IsDataInputStageUpdated=1;
           
        }

            var newAuditItem;
            $scope.cfsaAuditColl = [];  


        $scope.ppedescriptioncoll = [];
        for (var n = 0; n < $scope.ProductMasterColl.length; n++) {
            $scope.finalppedescriptionColl = [{
                "label": $scope.ProductMasterColl[n].Title,
                "id": $scope.ProductMasterColl[n].Id

            }];
            console.log($scope.finalppedescriptionColl);
            $scope.ppedescriptioncoll.push($scope.finalppedescriptionColl[0]);

        }

        $scope.selectedOnGroundRJDes=[];

        if ($scope.CapexBusinessCasePhaseColl.length > 0) {


            for(var t=0;t<$scope.CapexBusinessCasePhaseColl.length;t++){

                $scope.CapexBusinessCasePhaseColl[t].selectedProjectNames=[];
                for (let n = 0; n < $scope.CapexBusinessCasePhaseColl[t].ProductName.results.length; n++) {
                    $scope.CapexBusinessCasePhaseColl[t].selectedProjectNames.push({
                        "label": $scope.CapexBusinessCasePhaseColl[t].ProductName.results[n].Title,
                        "id": $scope.CapexBusinessCasePhaseColl[t].ProductName.results[n].Id
    
                    });
                }
            $scope.OldCapexPhaseColl.push({
                "CapexPhaseTotal":  $scope.CapexBusinessCasePhaseColl[t].PhaseTotal,
                "FillingDate": new Date($scope.CapexBusinessCasePhaseColl[t].TriggerYear), //
                "LOEDate": new Date($scope.CapexBusinessCasePhaseColl[t].CompletionYear),
                "CompletionYear":new Date($scope.CapexBusinessCasePhaseColl[t].CompletionYear),
                "selectedProjectNames":$scope.CapexBusinessCasePhaseColl[t].selectedProjectNames,
                "HideAddButtonMarket": false,
                "HideRemoveButton": true
            });


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
        //BIND EXIST MARKET COLLECETION    
        // $scope.ExistCounryRowColl = [];
      
        console.log($scope.OldCapexPhaseColl)
 
   // });


    // arvind{


    $scope.selectedContTypeDes=[];


        // $scope.ppedescriptioncoll = [];
        // for (var n = 0; n < $scope.ProductMasterColl.length; n++) {
        //     $scope.finalppedescriptionColl = [{
        //         "label": $scope.ProductMasterColl[n].Title,
        //         "id": $scope.ProductMasterColl[n].Id

        //     }];
        //     console.log($scope.finalppedescriptionColl);
        //     $scope.ppedescriptioncoll.push($scope.finalppedescriptionColl[0]);

        // }



        // arvind

     //   $scope.$scope.newMarketRow1Coll = [];

        var counter;
        var vRetVal;
        if ($scope.CapexBusinessCaseColl.length > 0) {
            var Logg = $scope.CapexBusinessCaseColl[0].Title;
            if (Logg == null) {
                counter = 0;
            } else {
                // BIOCON-OUT-LIC-1
                var Result = Logg.split("-");
                $scope.counter = Result[0];

            }
        } else {
            $scope.counter = "000";
        }
        counter = parseInt(counter) + 1;
        $scope.BUTitle = vRetVal;
        var i = 0;
        $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
        
      

        //BIND STARGEY DROPDOWN
        $scope.bindstrategy = function (ddlStrategy) {
            $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
        }
        //BIND PRODUCT DROPDOWN  
        $scope.ProductNameColl=[];  
        $scope.dosagessColl = [];
        var unique = [];

        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
            $scope.ProdCode = $scope.getProductame[0].ProductCode;
          
            //$scope.ProductNameColl.push($scope.getProductame);

            for (var n = 0; n < $scope.getProductame.length; n++) {
                $scope.finalppcommoditycoll = [{
                    "label": $scope.getProductame[n].Product,
                    "id": $scope.getProductame[n].Id
    
                }];
                    for (i = 0; i <  $scope.finalppcommoditycoll.length; i++) {
                        if (unique.indexOf( $scope.finalppcommoditycoll[i]) === -1) {
                            unique.push( $scope.finalppcommoditycoll[i]);
                        }
                    }
                    
                console.log(unique);
                $scope.dosagessColl.push(unique[0]);

               
            }

        };
        

       



          $scope.OnCapexValueChange = function() {
           // var CapexPhaseTotal1= $scope.OldCapexPhaseColl[0].CapexPhaseTotal;
              $scope.PhaseTotal=[];
              var CapexPhaseTotal1=0;
              for(var i=0;i<$scope.OldCapexPhaseColl.length;i++){
                CapexPhaseTotal1=CapexPhaseTotal1+parseFloat($scope.OldCapexPhaseColl[i].CapexPhaseTotal);
              }
              for(var i=0;i<$scope.cfsaAuditColl.length;i++){
                CapexPhaseTotal1=CapexPhaseTotal1+parseFloat($scope.cfsaAuditColl[i].CapexPhaseTotal);
              }
              if(CapexPhaseTotal1!=0)
              {
                CapexPhaseTotal1=CapexPhaseTotal1/10000000;
                $scope.CapexPhaseTotal2=CapexPhaseTotal1;
              }
            
        };

        // Count product (counter of unique product)
        var uniqueCount;
                $scope.ProdCount = function () {
                var objppe = [];
                for(var z=0;z<$scope.cfsaAuditColl.length;z++){
                if ($scope.cfsaAuditColl[z].selectedContTypeDes.length > 0) {
                    for (var i = 0; i < $scope.cfsaAuditColl[z].selectedContTypeDes.length; i++) {
                        console.log(objppe);
                        var a = $scope.cfsaAuditColl[z].selectedContTypeDes[i].id;
                        objppe.push(a)
                    }
                }
                // $scope.ProdId = {
                //     "results": objppe
                // };

                // filter unique value of array // arvind
                     uniqueCount = new Set(objppe).size;
                        console.log(uniqueCount);
                    $scope.Productcount=uniqueCount;          

                    }
                }


                $scope.OnCapexValueChangeNeg = function() {
                    // var CapexPhaseTotal1= $scope.OldCapexPhaseColl[0].CapexPhaseTotal;
                       $scope.PhaseTotal=[];
                       var CapexPhaseTotal1=0;
                       if($scope.OldCapexPhaseColl.length>0){
                       for(var i=0;i<$scope.OldCapexPhaseColl.length;i++){
                         CapexPhaseTotal1=CapexPhaseTotal1+parseFloat($scope.OldCapexPhaseColl[i].CapexPhaseTotal);
                       }
                    }
                    if($scope.cfsaAuditColl.length>0){

                       for(var i=0;i<$scope.cfsaAuditColl.length;i++){
                         CapexPhaseTotal1=CapexPhaseTotal1+parseFloat($scope.cfsaAuditColl[i].CapexPhaseTotal);
                       }
                    }
                       if(CapexPhaseTotal1!=0)
                       {
                         CapexPhaseTotal1=CapexPhaseTotal1/10000000;
                         $scope.CapexPhaseTotal2=CapexPhaseTotal1;
                       }
                     
                 };

          $scope.removeAuditItem = function(PhaseObj, $event) {
            
            $event.currentTarget.style.display = "none";
        
        //   var  boolCapexValue='false'
        //     if($scope.cfsaAuditColl.length>1){
        //       for(var r =0;r<$scope.cfsaAuditColl.length;r++){
        //         if(PhaseObj.CapexPhaseTotal==parseFloat($scope.cfsaAuditColl[r].CapexPhaseTotal)){
        //             boolCapexValue='True';
        //         }
                
        //       }
        //         if(boolCapexValue='True')

        //         $scope.CapexPhaseTotal2=($scope.CapexValue)-parseFloat(PhaseObj.CapexPhaseTotal)/10000000;
              
        //     }
                  // $scope.Productcount=uniqueCount;     // counter of unique product
          
                  var t = $scope.cfsaAuditColl.indexOf(PhaseObj);
                  $scope.cfsaAuditColl.splice(t, 1);
                  $scope.OnCapexValueChangeNeg();

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
      
       
    //       newAuditItem={
    //         StandardColl: $scope.standardColl,
    //         // ViolationAgainstStandardId: "",
    //         // ObservationColl: ["First Time", "Repeat"],
    //         // ObservationOccurence: "",
    //          selectedContTypeDes:[],
    //          CapexPhaseTotal:0,
    //         // Action: "",
    //         // Status: "",
    //         ScheduleIDId: $scope.scheduleID,
    //         HideAddButton: true,
    //         HideRemoveButton: true,

    // }

    // var currentRoWIndex = $scope.cfsaAuditColl.length

    // if ($scope.cfsaAuditColl.length == 0) {

    //     setTimeout(function() {
    //         for (var i = 0; i < 1; i++) {
    //             var auditItemCopy = angular.copy(newAuditItem);
    //             setAuditItem(auditItemCopy);
    //             currentRoWIndex = $scope.cfsaAuditColl.length;
    //             //auditItemCopy.ObservationFor="Unscheduled";//1 line added by ketaki
    //             $scope.cfsaAuditColl.push(auditItemCopy);
    //             $scope.cfsaAuditColl[i].SrNo = currentRoWIndex + i + 1;
    //             $scope.cfsaAuditColl[i].HideAddButton = false;
    //             // if (i > 3) {
    //             //     $scope.cfsaAuditColl[i].HideAddButton = false;
    //             // }
    //             $scope.$apply();
    //         }
    //     }, 1000);


    // }

    // if ($scope.cfsaAuditColl.length > 0) {
    //         for (var index = 0; index < $scope.cfsaAuditColl.length; index++) {
    //             $scope.cfsaAuditColl[index].SrNo = index + 1;
    //             $scope.cfsaAuditColl[index].HideAddButton = true;
    //             if ($scope.isFormReadonly == true) {
    //                 $scope.cfsaAuditColl[index].HideRemoveButton = true;
    //             } else {
    //                 $scope.cfsaAuditColl[index].HideRemoveButton = false;
    //             }
    //             $scope.cfsaAuditColl[index].CFSAAuditIDId = $scope.cfsaAuditColl[index].ID;
    //             $scope.cfsaAuditColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;
           
    //             if (index == $scope.cfsaAuditColl.length - 1 && $scope.isFormReadonly == false) {
    //                 $scope.cfsaAuditColl[index].HideAddButton = false;
    //                 if ($scope.cfsaAuditColl.length == 1) {
    //                     $scope.cfsaAuditColl[index].HideRemoveButton = true;
    //                 } else {
    //                     $scope.cfsaAuditColl[index].HideRemoveButton = false;
    //                 }
    //             }
    //         }
    //     }


    //     function setAuditItem(auItem) {
    //         //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;
         
    
    //         //addded by sonali start
    //         //    $scope.PPEDescriptionData = auItem.selectedPPEescription;
    //         var objppe = [];
    //         if (auItem.selectedContTypeDes.length > 0) {
    //             for (var i = 0; i < auItem.selectedContTypeDes.length; i++) {
    //                 console.log(objppe);
    //                 var a = auItem.selectedContTypeDes[i].id;
    //                 objppe.push(a)
    
    
    //             }
    //         }
    //         auItem.PPEDescriptionId = { "results": objppe };

              


         
    //     }

    //     $scope.addAuditItem = function(auditObj) {
    //         if (auditObj != null && auditObj != undefined) {
    //             auditObj.HideAddButton = true;
    //         }
    //         var auditItemCopy = angular.copy(newAuditItem);
    //         setAuditItem(auditItemCopy);
    //         auditItemCopy.SrNo = auditObj.SrNo + 1;
    //         auditItemCopy.HideAddButton = false;
    //         auditItemCopy.HideRemoveButton = false;
    //         $scope.cfsaAuditColl.push(auditItemCopy);
    //         console.log($scope.cfsaAuditColl);
    
    //         $timeout(function() {
    //             $('[data-toggle="tooltip"]').tooltip();
    //         }, 100);
    //     };
    
    });
   //}   //
   




    $scope.HideAddButton = function (PhaseObj) {
        $scope.newMarketColldiv=true;
        var oldMarket = $scope.cfsaAuditColl.length;
        var newMarket = $scope.OldCapexPhaseColl.length;
        var SumMarketLength = parseInt((oldMarket) + (newMarket))
        if (SumMarketLength > 30) {
            alert("Can not Add more than 30 Market");
            return false;
        }
        if (PhaseObj != 'new') {
            
                    $scope.cfsaAuditColl.push({
                        "Phase": parseInt(SumMarketLength)+1,
                        "CapexPhaseTotal": 0,
                        "FillingDate": "",
                        "selectedContTypeDes": [],
                        "LOEDate": "",
                        "HideAddButtonMarket": false,
                        "HideRemoveButtonMarket": false
                    });
                   var NewPhaseValue= parseFloat($scope.cfsaAuditColl[0].CapexPhaseTotal/10000000);
                    var CapexValue=parseFloat($scope.CapexValue)+NewPhaseValue;
                    $scope.CapexValue=CapexValue;
         }
            
        

        if ($scope.cfsaAuditColl.length > 20) {
            alert("Can not Add more than 3 Market");
            return false;
        }



    }

    $scope.removeAuditItem = function (PhaseObj, $event) {
        $event.currentTarget.style.display = "none";
        var leng1 = $scope.cfsaAuditColl.length - 1; //1index
   
        if($scope.cfsaAuditColl.length>1){
            for(var r =0;r<=$scope.cfsaAuditColl.length;r++){
              if(PhaseObj.CapexPhaseTotal==parseFloat($scope.cfsaAuditColl[r].CapexPhaseTotal)){
                  boolCapexValue='True';
              }
              
            }
              if(boolCapexValue='True')

              $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(PhaseObj.CapexPhaseTotal)/10000000;
         
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


// arvind










///


$scope.onSubmit = function () {

    if($scope.BcInitiateDetails.CaseStatus=="Draft")
    {
        $scope.CaseStatus="Initiated"
    }
    else if($scope.BcInitiateDetails.CaseStatus=="Data Input Stage")
    {
        $scope.CaseStatus="Data Input Stage"
    }

    var deferred = $q.defer();
    
    var updatedBUBatch = [];
    $scope.InsertSKUDetails = [];
    $scope.UpdateLaunchDetails = [];
    $scope.InsertLaunchDetails = [];
    $scope.UpdateSKUDetails = [];
    var marLen = $scope.ExistMarketRowColl.length - 1;

    $scope.disabledFlag =true;
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
     
        


  //  }

    //Update Data into Parent List (CapexBusinessCase)

    updatedBUBatch.push({

        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")",
        action: "UPDATE",
        data: {
            __metadata: {
                type: "SP.Data.CapexBusinessCaseListItem"
            },
            CaseStatus:  $scope.CaseStatus
            , InitiatorsId: { 'results': pplInitiator }
            , ReviewersId: { 'results': pplReviewer }
            , ValidatorsId: { 'results': pplValidator }
            ,VersionNo:$scope.VersionNo
            ,IsDataInputStageUpdated:$scope.IsDataInputStageUpdated

        }
    });
    Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch).then(function (updatedBUBatch) {
        console.log(updatedBUBatch);

        $scope.LaunchPhaseDetails();
      
        deferred.resolve();
       
        alert("Business Case updated Successfully!!");
        $location.path("/InitiatorLP");
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

        for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {
            // noOfLaunchIndex++;
            //  var launchTitle = $scope.BUTitle + "-Launch-" + noOfLaunchIndex;

              //    $scope.PPEDescriptionData = auItem.selectedPPEescription;
              var objppe = [];
             
              if ( $scope.OldCapexPhaseColl[z].selectedProjectNames.length> 0) {
                  for (var i = 0; i < $scope.OldCapexPhaseColl[z].selectedProjectNames.length; i++) {
                      console.log(objppe);
                      var a = $scope.OldCapexPhaseColl[z].selectedProjectNames[i].id;
                      objppe.push(a)
      
      

                  }
                  $scope.ProdId = {
                    "results": objppe
                };
     
              }
            updateCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items(" + $scope.CapexBusinessCasePhaseColl[0].Id+ ")",
                action: "UPDATE",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.CapexPhaseDetailsListItem"
                    },
                    
                    CompletionYear: $scope.OldCapexPhaseColl[z].CompletionYear,
                    TriggerYear: $scope.OldCapexPhaseColl[z].FillingDate,
                    PhaseTotal: $scope.OldCapexPhaseColl[z].CapexPhaseTotal,

                    
                    ProductNameId:$scope.ProdId,
                  
                    CapexBusinessCaseId: $scope.IntiateID
                }
            });
        }
        for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {

  //  $scope.PPEDescriptionData =  $scope.cfsaAuditColl[z].selectedContTypeDes;
            var objppe = [];
            if ( $scope.cfsaAuditColl[z].selectedContTypeDes.length > 0) {
                for (var i = 0; i <  $scope.cfsaAuditColl[z].selectedContTypeDes.length; i++) {
                    console.log(objppe);
                    var a =  $scope.cfsaAuditColl[z].selectedContTypeDes[i].id;
                    objppe.push(a)
    
    
                }
            }
            $scope.cfsaAuditColl.PPEDescriptionId = { "results": objppe };


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
                    ProductNameId:   $scope.cfsaAuditColl.PPEDescriptionId,
                  
                    CapexBusinessCaseId: $scope.IntiateID
                }
            });
        }

        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updateCountryBatch).then(function (upda) {
            console.log(upda);
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData1) {
                console.log(insertedLaunchData1);

                // for (var p = 0; p < insertedLaunchData1.length; p++) {
                //     var coll = {};
                //     coll.LunchID = insertedLaunchData1[p].d.Id
                //     coll.Country = insertedLaunchData1[p].d.CountryId
                //     coll.LaunchTitle = insertedLaunchData1[p].d.Title
                //     $scope.AddedLaunchids.push(coll);
                // }
                // if (noOfLaunchIndex == $scope.InsertLaunchDetails.length) {
                //     $scope.SkuDetails($scope.AddedLaunchids);
                // }
            // deferred.resolve();
            });
        });
}

   
   
    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorLP");

    }

});