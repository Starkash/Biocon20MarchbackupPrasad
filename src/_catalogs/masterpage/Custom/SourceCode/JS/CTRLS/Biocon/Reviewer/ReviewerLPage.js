appOperations.controller("ReviewerLPCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,InitiationDate,Reviewers/Id,Reviewers/Title,Reviewers/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName,Reviewers&$filter=CaseStage eq 'Under Internal Review' and Reviewer/Title eq '_spPageContextInfo.userEmail' &$top=5000&$orderby=ID desc";
    //var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=Reviewers/EMail eq '"+_spPageContextInfo.userEmail+"'&$top=5000&$orderby=ID desc"
    // var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=(substringof('"+_spPageContextInfo.userEmail +"',Reviewers/EMail)) and CaseStage/Title eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$top=5000&$orderby=ID desc";
    //var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=substringof(" +_spPageContextInfo.userEmail+ ",'Reviewers') eq true&$top=5000&$orderby=ID desc"

    //  var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,CaseStatus,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$filter=CaseStage/Title eq 'Under Internal Review'&$top=5000&$orderby=ID desc";
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
 //   var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"
    var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Reviewers&$top=5000&$orderby=ID desc";
 
   var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,VersionNo,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"

   var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,VersionNo,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"

// real   var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,ProductName,Initiators,Reviewers&$top=5000&$orderby=ID desc"

   // var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$filter=CaseStage eq 'Under Review'&$top=5000&$orderby=ID desc";
    //  var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,InitiationDate,CapexValue,CapexCurrency,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Initiator/Id,Initiator/Title,Entity/Id,Entity/Title,Site/Id,Site/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage&$expand=Strategy,SubStrategy,Initiator,Entity,Site&$top=5000&$orderby=ID desc"
    //  var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,InitiationDate,LOEDate,LaunchDateUS,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$filter=CaseStage eq 'Under Review'&$top=5000&$orderby=ID desc";

    var strBusinessUSAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,VersionNo,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"


    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl,strBusinessInLicencingUrl,strBusinessAndaLicencingUrl,strBusinessCapexLicencingUrl,strBusinessUSAndaLicencingUrl];  
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;
        
         $scope.pageSize1="5";
// for username
$scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.InBusinessLicencingLicencingColl = batchedData[3].d.results;
        $scope.AndaBusinessLicencingColl = batchedData[4].d.results;
        $scope.CapexBusinessLicencingColl = batchedData[5].d.results;
        $scope.USAndaBusinessLicencingColl = batchedData[6].d.results;
      

        $scope.FINALArry = [];
        $scope.ReviewArry=[];
        if ($scope.OutBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) 
            {
               
                for (var j = 0; j < $scope.OutBusinessLicencingColl[i].Reviewers.results.length; j++) 
                {
                  var gName=$scope.OutBusinessLicencingColl[i].Reviewers.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ReviewArry.push($scope.OutBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
        }
        
        
        
            if ($scope.AndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) 
            {
               //$scope.AndaBusinessLicencingColl[i].VersionNo='';
                for (var j = 0; j < $scope.AndaBusinessLicencingColl[i].Reviewers.results.length; j++) 
                {
                  var gName=$scope.AndaBusinessLicencingColl[i].Reviewers.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ReviewArry.push($scope.AndaBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
        }


        if ($scope.USAndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) 
            {
               //$scope.AndaBusinessLicencingColl[i].VersionNo='';
                for (var j = 0; j < $scope.USAndaBusinessLicencingColl[i].Reviewers.results.length; j++) 
                {
                  var gName=$scope.USAndaBusinessLicencingColl[i].Reviewers.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ReviewArry.push($scope.USAndaBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
        }


     

    if ($scope.InBusinessLicencingLicencingColl.length > 0) {
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) 
            {
               // $scope.InBusinessLicencingLicencingColl[i].VersionNo='';
                for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Reviewers.results.length; j++) 
                {
                  var gName=$scope.InBusinessLicencingLicencingColl[i].Reviewers.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ReviewArry.push($scope.InBusinessLicencingLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
        }

        if ($scope.CapexBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) 
            {
               // $scope.InBusinessLicencingLicencingColl[i].VersionNo='';
                for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Reviewers.results.length; j++) 
                {
                  var gName=$scope.CapexBusinessLicencingColl[i].Reviewers.results[j].Title;
                  var userExist= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                  if(userExist==true)
                  {
                    $scope.ReviewArry.push($scope.CapexBusinessLicencingColl[i]);
                    break;
                    //alert("TRUE")
                  }
                }
            }
        }

        
        
        //    if($scope.InBusinessLicencingLicencingColl.length>0){
        //         // $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl);
        //         for(var i=0;i<$scope.InBusinessLicencingLicencingColl.length;i++)
        //         {
        //         //     for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Reviewers.results.length; j++) 
        //         //     {
        //         //     var gName=$scope.InBusinessLicencingLicencingColl[i].Reviewers.results[j].Title;
        //         //    // var flgexist=  GetUserInGroup(gName);
        //         //     var flgexist1= Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
        //         //     if(flgexist1==true)
        //         //     {
        //         //         $scope.ReviewArry.push($scope.InBusinessLicencingLicencingColl[i]);
        //         //         break;
        //         //     }
        //         //     }
        //         }
        //     }
            /*
            if($scope.CapexBusinessLicencingColl.length>0){
                for(var i=0;i<$scope.CapexBusinessLicencingColl.length;i++)
                {
                //     var col={};
                //     col.Strategy=$scope.CapexBusinessLicencingColl[i].Strategy.Title;
                //     col.ID=$scope.CapexBusinessLicencingColl[i].Id;
                //     col.SubStrategy=$scope.CapexBusinessLicencingColl[i].SubStrategy.Title;
                //     col.Title=$scope.CapexBusinessLicencingColl[i].Title;
                //     col.InitiationDate=$scope.CapexBusinessLicencingColl[i].InitiationDate;
                //    // col.ProductName=$scope.CapexBusinessLicencingColl[i].ProductName.Title;
                //     col.CaseStage=$scope.CapexBusinessLicencingColl[i].CaseStage;
                    
                //     BusinessArry.push(col)
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
            
                    $scope.ddlStatus="Under Internal Review";

                    $scope.FINALArry =$scope.ReviewArry;// BusinessArry;FINALArry
                    if( $scope.FINALArry.length==0){

                    $scope.nodata=true;
                    }
                    else{

                    $scope.nodata=false;
                    }


                    // PAGINATION
                  
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


//arvind
                  
           /*$scope.FINALArry = BusinessArry.filter(function (item) {
                return (item.CaseStatus == "Under Internal Review");
                });*/
                //$scope.FINALArry = BusinessArry;

    });
    
    
                
                


    // $scope.onAddInitiationClick = function () {
    //     $location.path('/AddOLBusinessCase');
    // }
    // // edit
    // $scope.EditRadioForm = function (request) {
    //     Logics.setSharingData(request);
    //     $location.path('/EditBusinessCaseInitiation');

    // }
    //view
    $scope.ViewReviewerForm = function (request) {
        Logics.setSharingData(request);
         
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ReviewerOutLicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
        }
        else if(request.Strategy.Title == 'ANDA - Inhouse US + MoW'){
            
                $location.path('/ReviewerAndaLicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
            
        }
         else if(request.Strategy.Title=='Inlicensing')
         {
         $location.path('/ReviewerInLicensingBusinessCaseView');
         }

         else if(request.Strategy.Title=='Capex')
         {
         $location.path('/ReviewerCapexLicensingBusinessCaseView');
         }

         else if(request.Strategy.Title=='ANDA - Inhouse US')
         {
         $location.path('/ReviewerUSAndaLicensingBusinessCaseView');
         }


         
        
         
        // else if(request.Strategy=='Outlicensing')
        // {
        // $location.path('/ViewOutLicensing');
        // }   if(request.Strategy=='Capex(CAP)')
        // {
        // $location.path('/ViewCapexLicensing');
        // }
       
    }
    // Review Business-Case Initiation//
    $scope.ReviewForm = function (request) {
        Logics.setSharingData(request);
       

         if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ReviewerReviewOutLicensingBusinessCase');
        }
         else if(request.Strategy.Title=='Inlicensing')
         {
         $location.path('/ReviewerReviewInLicensingBusinessCase');  //ReviewerReviewAndaLicensingBusinessCase
         }
         else if(request.Strategy.Title=='ANDA - Inhouse US + MoW')
         {
         $location.path('/ReviewerReviewAndaLicensingBusinessCase');  //ReviewerReviewAndaLicensingBusinessCase
         }
         else if(request.Strategy.Title=='Capex')
         {
         $location.path('/ReviewerReviewCapexLicensingBusinessCase');  //ReviewerReviewAndaLicensingBusinessCase
         }

         else if(request.Strategy.Title=='ANDA - Inhouse US')
         {
         $location.path('/ReviewerReviewUSAndaLicensingBusinessCase');  //ReviewerReviewAndaLicensingBusinessCase
         }
         

        //   else if(request.Strategy=='ANDA inhouse US')
        //  {
        //      $location.path('/ReviewerReviewAndaLicensingBusinessCase');
        //  }
        // // else if(request.Strategy=='Outlicensing')
        // // {
        // // $location.path('/ViewOutLicensing');
        // //}
        //    if(request.Strategy=='Capex(CAP)')
        // {
        // $location.path('/ChangeStageCapex');
        // }
        //
    }

    $scope.onClickHome = function () {
        window.location.href =  _spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCaseLP.aspx";

    }
});