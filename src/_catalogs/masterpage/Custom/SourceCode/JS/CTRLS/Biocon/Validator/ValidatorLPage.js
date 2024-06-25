appOperations.controller("ValidatorLPCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {


    //  var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,CaseStatus,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$filter=CaseStage/Title eq 'Under Validation'&$top=5000&$orderby=ID desc";
    // var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,Validators/Id,Validators/Title,Validators/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$filter=(substringof('"+_spPageContextInfo.userEmail +"',Validators/EMail)) and CaseStage/Title eq 'Under Validation'&$top=5000&$orderby=ID desc"
    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"

    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    // var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,CaseStatus,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,Validators/Id,Validators/Title,Validators/EMail&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail))&$top=5000&$orderby=ID desc"
   var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"

    var strBusinessANDALicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ANDABusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"
   
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"

    // var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,InitiationDate,CapexValue,CapexCurrency,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Initiator/Id,Initiator/Title,Entity/Id,Entity/Title,Site/Id,Site/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage&$expand=Strategy,SubStrategy,Initiator,Entity,Site&$top=5000&$orderby=ID desc"
    //  var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,InitiationDate,LOEDate,LaunchDateUS,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$filter=CaseStage eq 'Under Validation'&$top=5000&$orderby=ID desc";
    var strBusinessUSANDALicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USANDABusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"

    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl,strBusinessInLicencingUrl,strBusinessANDALicencingUrl,strBusinessCapexLicencingUrl,strBusinessUSANDALicencingUrl ];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
// for username
$scope.CurrLogUserId=_spPageContextInfo.userDisplayName;

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;
        
        $scope.pageSize1="5"

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.InBusinessLicencingLicencingColl = batchedData[3].d.results;
        //  $scope.CapexBusinessLicencingColl = batchedData[4].d.results;
        $scope.AndaBusinessLicencingColl = batchedData[4].d.results;
        $scope.CapexBusinessLicencingColl = batchedData[5].d.results;
        $scope.USAndaBusinessLicencingColl = batchedData[6].d.results;



        $scope.FINALArry = [];
        var BusinessArry = [];
        $scope.ValidateArry=[];
        if ($scope.OutBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) 
            {
                for (var j = 0; j < $scope.OutBusinessLicencingColl[i].Validators.results.length; j++) 
                {
                  var gName=$scope.OutBusinessLicencingColl[i].Validators.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ValidateArry.push($scope.OutBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
      
        }
        
        
            if ($scope.InBusinessLicencingLicencingColl.length > 0) {
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl .length; i++) 
            {
                for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Validators.results.length; j++) 
                {
                  var gName=$scope.InBusinessLicencingLicencingColl[i].Validators.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ValidateArry.push($scope.InBusinessLicencingLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
      
        }


    if ($scope.AndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) 
            {
                for (var j = 0; j < $scope.AndaBusinessLicencingColl[i].Validators.results.length; j++) 
                {
                  var gName=$scope.AndaBusinessLicencingColl[i].Validators.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ValidateArry.push($scope.AndaBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
      
        }


        if ($scope.USAndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) 
            {
                for (var j = 0; j < $scope.USAndaBusinessLicencingColl[i].Validators.results.length; j++) 
                {
                  var gName=$scope.USAndaBusinessLicencingColl[i].Validators.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ValidateArry.push($scope.USAndaBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
      
        }

        
    if ($scope.CapexBusinessLicencingColl.length > 0) {
        for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) 
        {
            for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Validators.results.length; j++) 
            {
              var gName=$scope.CapexBusinessLicencingColl[i].Validators.results[j].Title;
              var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
              if(userExist==true)
              {
                $scope.ValidateArry.push($scope.CapexBusinessLicencingColl[i]);
                break;
                //alert("TRUE")
              }
            }
        }
  
    }
        //

      /*    if($scope.InBusinessLicencingLicencingColl.length>0){
                // $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl);
                for(var i=0;i<$scope.InBusinessLicencingLicencingColl.length;i++)
                {
                    var col={};
                    col.Strategy=$scope.InBusinessLicencingLicencingColl[i].Strategy.Title;
                    col.ID=$scope.InBusinessLicencingLicencingColl[i].Id;    
                    col.SubStrategy=$scope.InBusinessLicencingLicencingColl[i].SubStrategy.Title;
                    col.Title=$scope.InBusinessLicencingLicencingColl[i].Title;
                    col.InitiationDate=$scope.InBusinessLicencingLicencingColl[i].InitiationDate;
                    col.ProductName=$scope.InBusinessLicencingLicencingColl[i].ProductName.Title;
                    col.CaseStage=$scope.InBusinessLicencingLicencingColl[i].CaseStage.Title;
                     col.CaseStatus = $scope.InBusinessLicencingLicencingColl[i].CaseStatus;
                col.BusinessCaseName = $scope.InBusinessLicencingLicencingColl[i].BusinessCaseName;

                    
                    BusinessArry.push(col)
                }
            }
            
             if($scope.AndaBusinessLicencingColl.length>0){
                for(var i=0;i<$scope.AndaBusinessLicencingColl.length;i++)
                {
                    var col={};
                    col.Strategy=$scope.AndaBusinessLicencingColl[i].Strategy.Title;
                    col.ID=$scope.AndaBusinessLicencingColl[i].Id;
                    col.SubStrategy=$scope.AndaBusinessLicencingColl[i].SubStrategy.Title;
                    col.Title=$scope.AndaBusinessLicencingColl[i].Title;
                    col.InitiationDate=$scope.AndaBusinessLicencingColl[i].InitiationDate;
                    col.ProductName=$scope.AndaBusinessLicencingColl[i].ProductName.Title;
                    col.CaseStage=$scope.AndaBusinessLicencingColl[i].CaseStage;                
                    BusinessArry.push(col)
                }
            }
            */

         /*
            if($scope.CapexBusinessLicencingColl.length>0){
                // for(var i=0;i<$scope.CapexBusinessLicencingColl.length;i++)
                // {
                //     var col={};
                //     col.Strategy=$scope.CapexBusinessLicencingColl[i].Strategy.Title;
                //     col.ID=$scope.CapexBusinessLicencingColl[i].Id;
                //     col.SubStrategy=$scope.CapexBusinessLicencingColl[i].SubStrategy.Title;
                //     col.Title=$scope.CapexBusinessLicencingColl[i].Title;
                //     col.InitiationDate=$scope.CapexBusinessLicencingColl[i].InitiationDate;
                //    // col.ProductName=$scope.CapexBusinessLicencingColl[i].ProductName.Title;
                //     col.CaseStage=$scope.CapexBusinessLicencingColl[i].CaseStage;
                    
                //     BusinessArry.push(col)
                // }
            }
            if($scope.AndaBusinessLicencingColl.length>0){
                for(var i=0;i<$scope.AndaBusinessLicencingColl.length;i++)
                {
                    var col={};
                    col.Strategy=$scope.AndaBusinessLicencingColl[i].Strategy.Title;
                    col.ID=$scope.AndaBusinessLicencingColl[i].Id;
                    col.SubStrategy=$scope.AndaBusinessLicencingColl[i].SubStrategy.Title;
                    col.Title=$scope.AndaBusinessLicencingColl[i].Title;
                    col.InitiationDate=$scope.AndaBusinessLicencingColl[i].InitiationDate;
                    col.ProductName=$scope.AndaBusinessLicencingColl[i].ProductName.Title;
                    col.CaseStage=$scope.AndaBusinessLicencingColl[i].CaseStage;                
                    BusinessArry.push(col)
                }
            }
            */
         // $scope.ddlStatus2="Under Validation";

            //$scope.ddlStatus="Sent For Validation";
            
          //  $scope.ddlStatus1="On Hold";
          //  $scope.ddlStatus2="Minor Change";
          $scope.FINALArry = $scope.ValidateArry;  //4
         $scope.AllFINALArry=$scope.FINALArry
        
          $scope.FINALArry= $filter('filter')($scope.FINALArry, function (responseLine) {

                  return ( responseLine.CaseStatus === "Minor Changes-by Validator" || responseLine.CaseStatus === "On Hold"  || responseLine.CaseStatus === "Sent For Validation"); 
                             });
        if( $scope.FINALArry.length==0){

        $scope.nodata=true;
        }
        else{
            
        $scope.nodata=false;
        }

      //  console.log($scope.FINALArry);


//ARVIND


                 
$scope.totalItems = $scope.FINALArry.length; // Total number of items
$scope.currentPage = 1; // Current page
$scope.itemsPerPage = 5; // Items per page
$scope.maxSize = 5; // Maximum number of pagination links to display
$scope.displayedItems = [];

$scope.updatePagination = function () {
    $scope.currentPage = 1; // Reset current page to 1 when items per page changes
    $scope.displayedItems = generateItems(); // Update displayed items
};

function generateItems() {
    const startIdx = ($scope.currentPage - 1) * $scope.itemsPerPage;
    const endIdx = startIdx + $scope.itemsPerPage;
    return Array.from({ length: $scope.totalItems }).map((_, idx) => `Item ${idx + 1}`).slice(startIdx, endIdx);
}

$scope.displayedItems = generateItems(); // Initialize displayed items



//


    });
    
   $scope.statusChnage=function(ddlStatus){
   //alert(ddlStatus);
    $scope.FINALArry= $filter('filter')($scope.AllFINALArry, function (responseLine) {

                return responseLine.CaseStatus== ddlStatus;
            });
        console.log($scope.FINALArry);

   
   
   
   
   }
    
    

    // $scope.onAddInitiationClick = function () {
    //     $location.path('/AddOLBusinessCase');
    // }
    // // edit
    // $scope.EditRadioForm = function (request) {
    //     Logics.setSharingData(request);
    //     $location.path('/EditBusinessCaseInitiation');

    // }
    //view
    $scope.ViewValidateForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ValidatorOutLicensingBusinessCaseView');
        }
         else if(request.Strategy.Title=='Inlicensing')
         {
     //   $location.path('/ViewInLicensing');
      $location.path('/ValidatorInLicensingBusinessCaseView');

    
         }
         else if(request.Strategy.Title=='ANDA - Inhouse US + MoW')
         {
         $location.path('/ValidatorValidateANDABusinessCase');
         }

         else if(request.Strategy.Title=='Capex(CAP)')
         {
         $location.path('/ValidatorValidateCapexBusinessCaseView');
         }

         else if(request.Strategy.Title=='ANDA - Inhouse US')
         {
         $location.path('/ValidatorValidateUSAndaBusinessCaseView');
         }
         

        // else if(request.Strategy=='Outlicensing (OL)')
        // {
        // $location.path('/ViewOutLicensing');
        // }   if(request.Strategy=='Capex(CAP)')
        // {
        // $location.path('/ViewCapexLicensing');
        // }
        // else if(request.Strategy=='API(API)')
        // {
        // $location.path('/ViewAndaLicensing');
        // }
    }
    // Review Business-Case Initiation
    $scope.ValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ValidateOL');
        }
         else if(request.Strategy.Title=='Inlicensing')
         {
         $location.path('/ValidateIL');
         }
        else if(request.Strategy.Title=='ANDA - Inhouse US + MoW')
        {
        $location.path('/ValidateANDA');
        }
        else if(request.Strategy.Title=='Capex')
        {
        $location.path('/ValidateCapex');
        }

        else if(request.Strategy.Title=='ANDA - Inhouse US')
        {
        $location.path('/ValidateUSAnda');
        }

        
        //    if(request.Strategy=='Capex(CAP)')
        // {
        // $location.path('/ChangeStageCapex');
        // }
        // else if(request.Strategy=='API(API)')
        // {
        //     $location.path('/ChangeStageAndaLicensing');
        // }
    }
    
   /* if(FINALArry.length>0){
      $scope.ddlStatusFilterFor=[{Id:0,value:'On Hold'},{Id:1,value:'Minor Changes'}]
    
    $scope.StatusDatashow=function()
    {
      $scope.getfilteredStatus = $scope.FINALArry.filter(function (item) {
            return (item.Status== ddlStatusFilterFor[0].value);
            
 	   });

    }
    }
    */
    $scope.onClickHome = function () {
        window.location.href =  _spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCaseLP.aspx";

    }

});