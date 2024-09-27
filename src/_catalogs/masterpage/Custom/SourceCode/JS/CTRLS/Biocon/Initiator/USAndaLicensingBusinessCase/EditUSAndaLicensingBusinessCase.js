appOperations.controller("EditUSAndaLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    if (Logics.getSharedData() == undefined) {
        $location.path('/EditUSAnda');
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

$scope.selectedContTypeDes=[];
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
    showCheckAll:false
};




$scope.openFillingDate = function() {
    $scope.FillingDateOptions.opened = true;
    
 
};
$scope.FillingDateOptions = {
    opened: false,
 
};
$scope.FillingDateOptions = {
    
    formatYear: "yy",
    startingDay: 1,
    showWeeks: false,
    minMode: 'month'
};







$scope.openLoeDate = function() {
    $scope.LOEDateOptions.opened = true;
    
 
};
$scope.LOEDateOptions = {
    opened: false,
 
};
$scope.LOEDateOptions = {
    
    formatYear: "yy",
    startingDay: 1,
    showWeeks: false,
    minMode: 'month'
};


$scope.openLaunchDate = function() {
    $scope.LaunchDateOptions.opened = true;
    
 
};
$scope.LaunchDateOptions = {
    opened: false,
 
};
$scope.LaunchDateOptions = {
    formatYear: "yy",
    startingDay: 1,
    showWeeks: false,
    minMode: 'month'
};
 
    $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,StrategyId&$expand=Strategy&$top=100&$orderby=ID";
    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$filter=Title eq 'US'&$orderby=ID asc";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
    // var strOLBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    // var strOLBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?$select=*,Title,ID&$top=1&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title&$expand=UserGroup,Market,SubMarket&$filter=TemplateType eq 'ANDA - Inhouse US'&$top=5000&$orderby=ID"; // cascading


   
    var strUSAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,LapVersion,FillingDate,NoofGenericFilers,FilingType/Id,FilingType/Title,Innovator/Id,Innovator/Title,CurrentStatus/Id,CurrentStatus/Title,Editor/Id,Editor/Title,BusinessCaseName,LOEDate,LaunchDateUS,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Market/Id,Market/Title,Country/Id,Country/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,Market,Country,CaseStage,SubStrategy,FilingType,Innovator,CurrentStatus,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=Modified desc";
 
    var strUSAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,USAndaBusinessCase/Id,USAndaBusinessCase/Title&$expand=SkuUnit,PackingType,USAndaBusinessCase&$filter=USAndaBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

  
    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('Site')/items?$select=*&$top=500&$orderby=Id desc";

    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading
   

    var strInnovatorMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InnovatorMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    var strFillingTypeMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FillingTypeMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    var strCurrentStatusUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=1000&$orderby=ID"; // cascading
   

    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strPartnerUrl, strRoleMasterUrl, strUSAndaBusinessCaseUrl,strUSAndaSKUDetailsUrl,strSiteUrl, strPackingMasterUrl,strSkuMasterUrl, strInnovatorMasterUrl,strFillingTypeMasterUrl,strCurrentStatusUrl];
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
        $scope.USAndaBusinessCaseColl = batchedData[10].d.results;
        $scope.USAndaSKUColl = batchedData[11].d.results;
        $scope.SiteColl = batchedData[12].d.results;
        $scope.PackColl = batchedData[13].d.results;
        $scope.SkuColl = batchedData[14].d.results;
       // $scope.PackingTypeColl = batchedData[15].d.results;
        $scope.InnovatorColl = batchedData[15].d.results;
        $scope.FillingTypeColl = batchedData[16].d.results;

     $scope.StatusColl = batchedData[17].d.results;

       


        $scope.OldUSAndaBusinessCaseColl=[];
        $scope.cfsaAuditColl = [];  
        $scope.OldCapexPhaseColl=[];

        if ($scope.USAndaBusinessCaseColl.length > 0) {
            $scope.BusinessCaseName = $scope.USAndaBusinessCaseColl[0].BusinessCaseName;
            $scope.LOEDate = new Date($scope.USAndaBusinessCaseColl[0].LOEDate);
            $scope.LaunchDate = new Date($scope.USAndaBusinessCaseColl[0].LaunchDateUS);
            
            $scope.ddlStrategy = $scope.USAndaBusinessCaseColl[0].Strategy.Id;
            $scope.Businesscaseid = $scope.USAndaBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.USAndaBusinessCaseColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.USAndaBusinessCaseColl[0].InitiationDate);
            $scope.ddlProductCategory = $scope.USAndaBusinessCaseColl[0].ProductCategory.Id;
            $scope.ddlProductName = $scope.USAndaBusinessCaseColl[0].ProductName.Id;
            $scope.BUTitle=$scope.USAndaBusinessCaseColl[0].Title;
            $scope.LapVersion = $scope.USAndaBusinessCaseColl[0].LapVersion;

            $scope.BusinessCaseDescription = $scope.USAndaBusinessCaseColl[0].BusinessCaseDescription;


            $scope.ddlMarket = $scope.USAndaBusinessCaseColl[0].Market.Id;

            $scope.ddlcountry = $scope.USAndaBusinessCaseColl[0].Country.Id;

            $scope.ddlSubStrategy = $scope.USAndaBusinessCaseColl[0].SubStrategy.Id;
         //   $scope.ddlSubStrategy = $scope.USAndaBusinessCaseColl[0].SubStrategy.Id;
         
            $scope.CurrDate=new Date($scope.USAndaBusinessCaseColl[0].InitiationDate);
           
            $scope.Modified = new Date($scope.USAndaBusinessCaseColl[0].Modified);


//FillingDate,NoofGenericFilers,FilingType/Id,FilingType/Title,Innovator/Id,Innovator/Title,CurrentStatus/Id,CurrentStatus/Title

            $scope.NoofGenericFilers = parseInt($scope.USAndaBusinessCaseColl[0].NoofGenericFilers);


            $scope.ddlFillingType = $scope.USAndaBusinessCaseColl[0].FilingType.Id;

            $scope.ddlFillingStatus = $scope.USAndaBusinessCaseColl[0].CurrentStatus.Id;

            $scope.ddlInnovator = $scope.USAndaBusinessCaseColl[0].Innovator.Id;

            $scope.FillingDate = new Date($scope.USAndaBusinessCaseColl[0].FillingDate);

        }

        if ($scope.USAndaBusinessCaseColl[0].DosageForm.results.length > 0) {

            $scope.DosageForm = "";
            for (var p = 0; p < $scope.USAndaBusinessCaseColl[0].DosageForm.results.length; p++) {

                $scope.DosageForm += $scope.USAndaBusinessCaseColl[0].DosageForm.results[p].Title + ',';
            }
            $scope.dosage1 = $scope.DosageForm.slice(0, -1);
        }

      
        if ($scope.USAndaSKUColl.length > 0) {
            for(var t=0;t<$scope.USAndaSKUColl.length;t++){


            $scope.OldCapexPhaseColl.push({
                "SKU":  $scope.USAndaSKUColl[t].Quantity,
                "SkuMasterColl":   $scope.SkuColl,
                "ddlSKUUnit": $scope.USAndaSKUColl[t].SkuUnit.Id, //
                "PackSize": $scope.USAndaSKUColl[t].Pack,
                "PackingTypeColl":$scope.PackColl,
                "ddlPackingType":$scope.USAndaSKUColl[t].PackingType.Id,
                "HideAddButtonMarket": false,
                "HideRemoveButton": true
            });
        }

        
        }

        if($scope.BcInitiateDetails.CaseStatus=="Draft")
        {
            $scope.CaseStatus="Initiated"
            $scope.IsDataInputStageUpdated=0;
            $scope.VersionNo="1.0";
            $scope.LapVersion="V0";

        }
        else if($scope.BcInitiateDetails.CaseStatus=="Data Input Stage")
        {
            $scope.CaseStatus="Data Input Stage",
            $scope.IsDataInputStageUpdated=1;
           
        }

            var newAuditItem;
           

        $scope.ppedescriptioncoll = [];
        for (var n = 0; n < $scope.DosageColl.length; n++) {
            $scope.finalppedescriptionColl = [{
                "label": $scope.DosageColl[n].Title,
                "id": $scope.DosageColl[n].Id

            }];
            console.log($scope.finalppedescriptionColl);
            $scope.ppedescriptioncoll.push($scope.finalppedescriptionColl[0]);

        }

        $scope.selectedOnGroundRJDes=[];
     

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
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
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


             var counter;
        var vRetVal;
        if ($scope.USAndaBusinessCaseColl.length > 0) {
            var Logg = $scope.USAndaBusinessCaseColl[0].Title;
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

               

          $scope.removeAuditItem = function(PhaseObj, $event) {
            
            $event.currentTarget.style.display = "none";
                 
                  var t = $scope.cfsaAuditColl.indexOf(PhaseObj);
                  $scope.cfsaAuditColl.splice(t, 1);
                 

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
   

 $scope.cfsaAuditColl=[];
    $scope.HideAddButton = function (PhaseObj) {
        $scope.newMarketColldiv=true;
        
        var oldMarket = $scope.cfsaAuditColl.length;
        var newMarket = $scope.OldCapexPhaseColl.length;
        var SumMarketLength = parseInt((oldMarket) + (newMarket))
        if (SumMarketLength >= 20) {
            alert("Can not Add more than 20 SKU");
            return false;
        }


        // if (PhaseObj != 'new') {
            
        //             $scope.cfsaAuditColl.push({
        //                 "SKU":0,
        //                 "PackSize": 0,
        //                 "ddlPackingType": 0,
        //                 "ddlSKUUnit": 0,
        //                 "PackingTypeColl": $scope.PackColl,
        //                 "SkuMasterColl": $scope.SkuColl,
        //                 "HideAddButtonMarket": false,

        //                 "HideRemoveButtonMarket": false
        //             });
                  
        //  }

         //arvind


            var a =$scope.cfsaAuditColl.length-1;

            if($scope.cfsaAuditColl.length>0){

            if($scope.cfsaAuditColl[a].SKU!=0 &&  $scope.cfsaAuditColl[a].PackSize!=0 &&  $scope.cfsaAuditColl[a].ddlPackingType!=0 &&  $scope.cfsaAuditColl[a].ddlSKUUnit!=0)
            {

                $scope.cfsaAuditColl.push({
                    "SKU":0,
                    "PackSize": 0,
                    "ddlPackingType": 0,
                    "ddlSKUUnit": 0,
                    "PackingTypeColl": $scope.PackColl,
                    "SkuMasterColl": $scope.SkuColl,
                    "HideAddButtonMarket": false,

                    "HideRemoveButtonMarket": false
                });

            }
            else{

                alert('Please First Fill All Fields In SKU')
                return false;
                }

        }

        if($scope.cfsaAuditColl.length==0){

            $scope.cfsaAuditColl.push({
                "SKU":0,
                "PackSize": 0,
                "ddlPackingType": 0,
                "ddlSKUUnit": 0,
                "PackingTypeColl": $scope.PackColl,
                "SkuMasterColl": $scope.SkuColl,
                "HideAddButtonMarket": false,

                "HideRemoveButtonMarket": false
            });
        }


   
        
           

            

       // }
        // else{
        //     alert('Please First Fill All Fields In SKU ');
        //     return false;
        // }

         

        if ($scope.cfsaAuditColl.length > 20) {
            alert("Can not Add more than 20 sku");
            return false;
        }

    }

    $scope.removeAuditItem = function (PhaseObj, $event) {
        $event.currentTarget.style.display = "none";
        var leng1 = $scope.cfsaAuditColl.length - 1; 
            

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


    if($scope.ddlMarket=="" || $scope.ddlMarket=='undefined' || $scope.ddlMarket==null ) {
    
        alert("Please Select Market Name");
        return false;
    }  
    if($scope.ddlcountry=="" || $scope.ddlcountry=='undefined' || $scope.ddlcountry==null ) {

        alert("Please Select Country Name");
        return false;
    }  

    for(var a =0;a<$scope.cfsaAuditColl.length;a++){

        if($scope.cfsaAuditColl[a].SKU==0 ||  $scope.cfsaAuditColl[a].PackSize==0 ||  $scope.cfsaAuditColl[a].ddlPackingType==0 ||  $scope.cfsaAuditColl[a].ddlSKUUnit==0)
        {
            alert("Please fill all SKU");
            return false;
        }

    }

    for(var a =0;a<$scope.OldCapexPhaseColl.length;a++){

        if($scope.OldCapexPhaseColl[a].SKU==0 || $scope.OldCapexPhaseColl[a].PackSize==0 ||  $scope.OldCapexPhaseColl[a].ddlPackingType==0 ||  $scope.OldCapexPhaseColl[a].ddlSKUUnit==0)
        {
            alert("Please fill all SKU");
            return false;
        }

    }
      
      

    if($scope.BcInitiateDetails.CaseStatus=="Draft")
    {
        $scope.CaseStatus="Initiated"
    }
    else if($scope.BcInitiateDetails.CaseStatus=="Data Input Stage")
    {
        $scope.CaseStatus="Data Input Stage"
    }

    if($scope.SKU==0 &&$scope.SKU=='undefined'){
        return false;
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
   
   
var a = _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('USAndaBusinessCase')/items("+$scope.IntiateID+")"
console.log(a);
    updatedBUBatch.push({

        reqUrl:a,
        action: "UPDATE",
        data: {
            __metadata: {
                type: "SP.Data.USAndaBusinessCaseListItem"
            },
            CaseStatus: $scope.CaseStatus
            , InitiatorsId: { 'results': pplInitiator }
            , ReviewersId: { 'results': pplReviewer }
            , ValidatorsId: { 'results': pplValidator }
            , VersionNo: $scope.VersionNo
            , LapVersion: $scope.LapVersion
            ,BusinessCaseDescription:$scope.BusinessCaseDescription

            , IsDataInputStageUpdated: $scope.IsDataInputStageUpdated

            , NoofGenericFilers: parseInt($scope.NoofGenericFilers)
            , FilingTypeId: $scope.ddlFillingType
            , CurrentStatusId: $scope.ddlFillingStatus
            , InnovatorId: $scope.ddlInnovator
            , FillingDate: $scope.FillingDate

        }
    });
    Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch).then(function (updatedBUBatch) {
        console.log(updatedBUBatch);

        $scope.LaunchPhaseDetails();
      
        deferred.resolve();
       
        alert("Business Case updated Successfully!!");
        $location.path("/InitiatorUSANDADash");
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

     
      console.log(b)

        for (var z = 0; z < $scope.OldCapexPhaseColl.length; z++) {
          
            var  b=_spPageContextInfo.webAbsoluteUrl+"/_api/Lists/getbytitle('USAndaSKUDetails')/items("+$scope.USAndaSKUColl[z].Id+")";
            updateCountryBatch.push({
                reqUrl:b,
                action: "UPDATE",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.USAndaSKUDetailsListItem"
                    },
                    
                    Pack: $scope.OldCapexPhaseColl[z].PackSize,
                    Quantity: $scope.OldCapexPhaseColl[z].SKU,
                    SkuUnitId: $scope.OldCapexPhaseColl[z].ddlSKUUnit,
                    PackingTypeId: $scope.OldCapexPhaseColl[z].ddlPackingType,
                    USAndaBusinessCaseId: $scope.IntiateID
                }
            });
        }
        for (var z = 0; z < $scope.cfsaAuditColl.length; z++) {

  

            noOfLaunchIndex++;
            newnoOfLaunchIndex = parseInt(newnoOfLaunchIndex) + 1;
            var launchTitle = $scope.BUTitle + "-SKU-" + newnoOfLaunchIndex;
            insertCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl +"/_api/Lists/getbytitle('USAndaSKUDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.USAndaSKUDetailsListItem"
                    },
                    Title: launchTitle,
                    Pack: $scope.cfsaAuditColl[z].PackSize,
                    Quantity: $scope.cfsaAuditColl[z].SKU,
                    SkuUnitId: $scope.cfsaAuditColl[z].ddlSKUUnit,
                    PackingTypeId: $scope.cfsaAuditColl[z].ddlPackingType,
                    USAndaBusinessCaseId: $scope.IntiateID
                }
            });
        }

        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updateCountryBatch).then(function (upda) {
            console.log(upda);
            Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData1) {
                console.log(insertedLaunchData1);

               
            });
        });
}

   
   
    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorUSANDADash");

    }

});