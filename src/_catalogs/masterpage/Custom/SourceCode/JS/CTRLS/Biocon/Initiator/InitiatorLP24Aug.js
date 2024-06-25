appOperations.controller("InitiatorLPctrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    //var strRollURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";

    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"

    // Logics.getRolltData(strBusinessOutLicencingUrl)
    // {

    // }
	
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    //var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Status,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"
    var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,VersionNo,Title,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"

//    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,InitiationDate,CapexValue,CapexCurrency,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Initiator/Id,Initiator/Title,Entity/Id,Entity/Title,Site/Id,Site/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage&$expand=Strategy,SubStrategy,Initiator,Entity,Site&$top=5000&$orderby=ID desc"
    //var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,InitiationDate,LOEDate,LaunchDateUS,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,ProductName&$top=5000&$orderby=ID desc"


    
    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl,strBusinessInLicencingUrl ,strBusinessAndaLicencingUrl,strBusinessCapexLicencingUrl]; 
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
    //     $scope.PreviousCurrentPage = 1;
    //     $scope.PreviousItemsPerPage = 500;
    //     $scope.CurrentPage = 10;
    //     $scope.ItemsPerPage = 10;
    //     $scope.upComingCurrentPage = 1;
    //     $scope.upComingItemsPerPage = 5;
    //     $scope.certCurrentPage = 1;
    //     $scope.certItemsPerPage = 10;
	// //Defualt pages view
	//         $scope.pageSize1="5";
	// // for username

    //

 
    //
	$scope.CurrLogUserId=_spPageContextInfo.userDisplayName;	
	
		
        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.InBusinessLicencingLicencingColl = batchedData[3].d.results;
        //$scope.CapexBusinessLicencingColl = batchedData[4].d.results;
        $scope.AndaBusinessLicencingColl = batchedData[4].d.results;
       // $scope.CapexBusinessLicencingColl = batchedData[5].d.results;

        
       
        
         // var BusinessArry = [];
          
        //  if($scope.OutBusinessLicencingColl.length>0)
        // {
        //     for(var i=0;i<$scope.OutLicencingBusinessCaseDocColl.length;i++)
        //     {
        //         var results =  $filter('filter')($scope.OutLicencingBusinessCaseDocColl, function (responseLine) {

        //                 return responseLine.OutLicensingBusinessCaseId== $scope.OutBusinessLicencingColl[i].ID;
        //         });
        //         if(results.length>0)
        //         {
        //             $scope.OutBusinessLicencingColl[i].Version=''+results[0].CaseVersion.toFixed(1);

        //         }
        //         else
        //         {
        //             $scope.OutBusinessLicencingColl[i].Version='';
        //         }
        //     }
        // }
        // console.log($scope.OutBusinessLicencingColl[0].Version);


        // if($scope.InBusinessLicencingColl.length>0)
        // {
        //     for(var i=0;i<$scope.InLicencingBusinessCaseDocColl.length;i++)
        //     {
        //         var results =  $filter('filter')($scope.InLicencingBusinessCaseDocColl, function (responseLine) {

        //                 return responseLine.InLicensingBusinessCaseId== $scope.InBusinessLicencingColl[i].Id;
        //         });
        //         if(results.length>0)
        //         {
        //             $scope.InBusinessLicencingColl[i].Version=''+results[0].CaseVersion.toFixed(1);

        //         }
        //         else
        //         {
        //             $scope.InBusinessLicencingColl[i].Version='';
        //         }
        //     }
        // }

        

        $scope.FINALArry = [];
         var BusinessArry = [];

      
        if ($scope.OutBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) {
                var col = {};
                col.Strategy = $scope.OutBusinessLicencingColl[i].Strategy.Title;
                col.ID = $scope.OutBusinessLicencingColl[i].Id;
                col.SubStrategy = $scope.OutBusinessLicencingColl[i].SubStrategy.Title;
                col.Title = $scope.OutBusinessLicencingColl[i].Title;
                col.BusinessCaseName = $scope.OutBusinessLicencingColl[i].BusinessCaseName;
                col.InitiationDate = $scope.OutBusinessLicencingColl[i].InitiationDate;
                col.ProductName = $scope.OutBusinessLicencingColl[i].ProductName.Title;
                col.CaseStage = $scope.OutBusinessLicencingColl[i].CaseStage.Title;
                col.CaseStatus = $scope.OutBusinessLicencingColl[i].CaseStatus;
                col.Status = $scope.OutBusinessLicencingColl[i].Status; //
                col.Modified= $scope.OutBusinessLicencingColl[i].Modified;
				col.VersionNo=$scope.OutBusinessLicencingColl[i].VersionNo;


                BusinessArry.push(col)
            }
            //  $scope.FINALArry.push($scope.OutBusinessLicencingColl);
        }
        
          if ($scope.AndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) {
                var col = {};
                col.Strategy = $scope.AndaBusinessLicencingColl[i].Strategy.Title;
                col.ID = $scope.AndaBusinessLicencingColl[i].Id;
                col.SubStrategy = $scope.AndaBusinessLicencingColl[i].SubStrategy.Title;
                col.Title = $scope.AndaBusinessLicencingColl[i].Title;
                col.BusinessCaseName = $scope.AndaBusinessLicencingColl[i].BusinessCaseName;
                col.InitiationDate = $scope.AndaBusinessLicencingColl[i].InitiationDate;
                col.ProductName = $scope.AndaBusinessLicencingColl[i].ProductName.Title;
                col.CaseStage = $scope.AndaBusinessLicencingColl[i].CaseStage.Title;
                col.CaseStatus = $scope.AndaBusinessLicencingColl[i].CaseStatus;
                col.Status = $scope.AndaBusinessLicencingColl[i].Status;
                 col.Modified= $scope.AndaBusinessLicencingColl[i].Modified;
                // col.Version= $scope.InBusinessLicencingColl[i].Version;
                 col.VersionNo= $scope.AndaBusinessLicencingColl[i].VersionNo;



                BusinessArry.push(col)
            }
        }
        
        if ($scope.InBusinessLicencingLicencingColl.length > 0) {
            // $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl);
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {
                var col = {};
                col.Strategy = $scope.InBusinessLicencingLicencingColl[i].Strategy.Title;
                col.ID = $scope.InBusinessLicencingLicencingColl[i].Id;
                col.SubStrategy = $scope.InBusinessLicencingLicencingColl[i].SubStrategy.Title;
                col.Title = $scope.InBusinessLicencingLicencingColl[i].Title;
                col.BusinessCaseName = $scope.InBusinessLicencingLicencingColl[i].BusinessCaseName;
                col.InitiationDate = $scope.InBusinessLicencingLicencingColl[i].InitiationDate;
                col.ProductName = $scope.InBusinessLicencingLicencingColl[i].ProductName.Title;
                col.CaseStage = $scope.InBusinessLicencingLicencingColl[i].CaseStage.Title;
                col.CaseStatus= $scope.InBusinessLicencingLicencingColl[i].CaseStatus;
                col.Status = $scope.InBusinessLicencingLicencingColl[i].Status;
                col.Modified= $scope.InBusinessLicencingLicencingColl[i].Modified;
				col.VersionNo= $scope.InBusinessLicencingLicencingColl[i].VersionNo;
                BusinessArry.push(col)
            }
        }

        // if ($scope.CapexBusinessLicencingColl.length > 0) {
        //     // $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl);
        //     for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {
        //         var col = {};
        //         col.Strategy = $scope.CapexBusinessLicencingColl[i].Strategy.Title;
        //         col.ID = $scope.CapexBusinessLicencingColl[i].Id;
        //         col.SubStrategy = $scope.CapexBusinessLicencingColl[i].SubStrategy.Title;
        //         col.Title = $scope.CapexBusinessLicencingColl[i].Title;
        //         col.BusinessCaseName = $scope.CapexBusinessLicencingColl[i].BusinessCaseName;
        //         col.InitiationDate = $scope.CapexBusinessLicencingColl[i].InitiationDate;
        //         col.ProductName = $scope.CapexBusinessLicencingColl[i].ProductName.Title;
        //         col.CaseStage = $scope.CapexBusinessLicencingColl[i].CaseStage.Title;
        //         col.CaseStatus= $scope.CapexBusinessLicencingColl[i].CaseStatus;
        //         col.Status = $scope.CapexBusinessLicencingColl[i].Status;
        //         col.Modified= $scope.CapexBusinessLicencingColl[i].Modified;
		// 		col.VersionNo= $scope.CapexBusinessLicencingColl[i].VersionNo;
        //         BusinessArry.push(col)
        //     }
        // }




     /*   if ($scope.CapexBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {
                var col = {};
                col.Strategy = $scope.CapexBusinessLicencingColl[i].Strategy.Title;
                col.ID = $scope.CapexBusinessLicencingColl[i].Id;
                col.SubStrategy = $scope.CapexBusinessLicencingColl[i].SubStrategy.Title;
                col.Title = $scope.CapexBusinessLicencingColl[i].Title;
                col.InitiationDate = $scope.CapexBusinessLicencingColl[i].InitiationDate;
                // col.ProductName=$scope.CapexBusinessLicencingColl[i].ProductName.Title;
                col.CaseStage = $scope.CapexBusinessLicencingColl[i].CaseStage;

                BusinessArry.push(col)
            }
        }
        */
      
        
       // $scope.ddlStatus="Initiated";
        $scope.FINALArry = BusinessArry;
        
        if( $scope.FINALArry.length==0){

            $scope.nodata=true;
            }
            else{
                
            $scope.nodata=false;
            }
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
        //ARVIND


       
    });
    
  //if(getfilteredStatus)

    $scope.onAddInitiationClick = function (ddlStragy) {

        $scope.getStrategy = $scope.StrategyColl.filter(function (item) {
            return (item.Id == ddlStragy);
        });
        if ($scope.getStrategy.length > 0) {
            if ($scope.getStrategy[0].Title == "Outlicensing (OL)") {

               
                //   Logics.setSharingData(request);
                $location.path('/AddOLBusinessCase')
            }
            if ($scope.getStrategy[0].Title == "Inlicensing (IL)") {
                //   Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')
            }
            
             if ($scope.getStrategy[0].Title == "ANDA inhouse US") {
                //   Logics.setSharingData(request);
                $location.path('/AddAndaBusinessCase')
            }

            if ($scope.getStrategy[0].Title == "Capex(CAP)") {
                //   Logics.setSharingData(request);
                $location.path('/AddCapexBusinessCase')
            }




        } else {
            alert('Please Select The Relevant Strategy');
        }

    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy == 'Outlicensing (OL)') {
            $location.path('/EditOL');
        }
        if (request.Strategy == 'Inlicensing (IL)') {
            $location.path('/EditIL');
        }
        
           if (request.Strategy == 'ANDA inhouse US') {
            $location.path('/EditAnda');
        }

        if (request.Strategy == 'Capex(CAP)') {
            $location.path('/EditCapex');
        }
        


        var request = []
        var coll = {};
        coll.StrategyId = $scope.ddlStragy;
        coll.SubStrategyId = $scope.ddlsubStragy;
        request.push(coll);
        $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
            return (item.StrategyId == $scope.ddlStragy || item.Id == $scope.ddlsubStragy);
        });
        if ($scope.getStrategy.length > 0) {
            if ($scope.getStrategy[0].Strategy.Title == "Outlicensing (OL)") {
                Logics.setSharingData(request);
                $location.path('/AddOLBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }
            if ($scope.getStrategy[0].Strategy.Title == "Inlicensing (IL)") {  //ANDA inhouse US//ANDA inhouse US
                Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }
            
			if ($scope.getStrategy[0].Strategy.Title == "ANDA inhouse US") { 
			Logics.setSharingData(request);
			$location.path('/AddAndaBusinessCase')
			
			//   var req=$scope.ddlsubStragy;
			// Logics.setSharingData(req)
			//$scope.stgyID=$scope.ddlsubStragy;
			//$location.path('AddOLBusinessCase/'+$scope.stgyID+'')
			
			}


        }


    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy == 'Outlicensing (OL)') {
            $location.path('/ViewOutLicensing');
        } else if (request.Strategy == 'Inlicensing (IL)') {
            $location.path('/ViewInLicensing');
        } else if (request.Strategy == 'Outlicensing (OL)') {
            $location.path('/ViewOutLicensing');
        }
               
        else if (request.Strategy == 'ANDA inhouse US') {
            $location.path('/ViewAndaLicensing');
        }
         else if (request.Strategy == 'Capex(CAP)') {
            $location.path('/ViewCapexLicensing');
        } 
        

        
        
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy == 'Outlicensing (OL)') {
            $location.path('/ChangeStageOutLicensing');
        } else if (request.Strategy == 'Inlicensing (IL)') {
            $location.path('/ChangeStageInLicensing');
        }
        // else if(request.Strategy=='Outlicensing (OL)')
        // {
        // $location.path('/ViewOutLicensing');
        //}
       else if (request.Strategy == 'Capex(CAP)') {
            $location.path('/ChangeStageCapex');
        } 
        
        else if (request.Strategy == 'ANDA inhouse US') {
            $location.path('/ChangeStageAndaLicensing');
        }
    } 
    $scope.onClickHome = function () {
        window.location.href =  _spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCaseLP.aspx";

    }
      });