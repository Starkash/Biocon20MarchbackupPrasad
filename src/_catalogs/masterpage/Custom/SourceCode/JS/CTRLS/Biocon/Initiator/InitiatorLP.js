appOperations.controller("InitiatorLPctrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
   var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,VersionNo,Title,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,Strategy/Id,Strategy/Title,ProductName/Id,ProductName/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,ProductName,CaseStage,SubStrategy&$top=5000&$orderby=ID desc"
    var strBusinessUSAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,Title,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"

    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl,strBusinessInLicencingUrl ,strBusinessAndaLicencingUrl,strBusinessCapexLicencingUrl,strBusinessUSAndaLicencingUrl]; 

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
        $scope.CapexBusinessLicencingColl = batchedData[5].d.results;
        $scope.USAndaBusinessLicencingColl = batchedData[6].d.results;

        $scope.FINALArry = [];
       if ($scope.OutBusinessLicencingColl.length > 0) {
           
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) 
            {
              if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation')
              {
                $scope.OutBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq "+$scope.OutBusinessLicencingColl[i].ID+"";
              }
              else
                {
                    $scope.OutBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/2bf91bf3-79ad-4174-9f9b-7f3312c46ada/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq "+$scope.OutBusinessLicencingColl[i].ID+"";
                }    
                $scope.FINALArry.push($scope.OutBusinessLicencingColl[i])
            }
            
        }

        if ($scope.InBusinessLicencingLicencingColl.length > 0) {
           
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) 
            {
              if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation')
              {
                $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq "+$scope.InBusinessLicencingLicencingColl[i].ID+"";
              }
              else
                {
                    $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq "+$scope.InBusinessLicencingLicencingColl[i].ID+"";
                }    
                $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl[i])
            }
            
        }


        if ($scope.AndaBusinessLicencingColl.length > 0) {
           
            for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) 
            {
              if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation')
              {
                $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="";
              //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
              }
              else
                {
                    $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="";
                   // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                }    
                $scope.FINALArry.push($scope.AndaBusinessLicencingColl[i])
            }
            
        }


        if ($scope.CapexBusinessLicencingColl.length > 0) {
           
            for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) 
            {
              if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation')
              {
               // var ProductName=[];
                $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink="";
               
            //     for(var t=0;t< $scope.CapexBusinessLicencingColl.length;t++){
            //         $scope.ProductNamecoll={};
                    
            //         $scope.ProductNamecoll=$scope.CapexBusinessLicencingColl[0].ProductName.results[t]; 
            //         ProductName.push($scope.ProductNamecoll);


            //   }
              
              //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
              }
              else
                {
                    $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink="";
                   // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
                }    
                $scope.FINALArry.push($scope.CapexBusinessLicencingColl[i])
            }
            
        }

        if ($scope.USAndaBusinessLicencingColl.length > 0) {
           
            for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) 
            {
              if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation')
              {
                $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink="";
              //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
              }
              else
                {
                    $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink="";
                   // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                }    
                $scope.FINALArry.push($scope.USAndaBusinessLicencingColl[i])
            }
            
        }
        
        
        
       // $scope.ddlStatus="Initiated";
      //  $scope.FINALArry = BusinessArry;
        
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
            if ($scope.getStrategy[0].Title == "Outlicensing") {

               
                //   Logics.setSharingData(request);
                $location.path('/AddOLBusinessCase')
            }
            if ($scope.getStrategy[0].Title == "Inlicensing") {
                //   Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')
            }
            
             if ($scope.getStrategy[0].Title == "ANDA - Inhouse US + MoW") {
                //   Logics.setSharingData(request);
                $location.path('/AddAndaBusinessCase')
            }

            if ($scope.getStrategy[0].Title == "Capex") {
                //   Logics.setSharingData(request);
                $location.path('/AddCapexBusinessCase')
            }

            if ($scope.getStrategy[0].Title == "ANDA - Inhouse US") {
                //   Logics.setSharingData(request);
                $location.path('/AddUSAndaBusinessCase')
            }

          
            




        } else {
            alert('Please Select The Relevant Strategy');
        }

    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/EditOL');
        }
        if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/EditIL');
        }
        
           if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/EditAnda');
        }

        if (request.Strategy.Title == 'Capex') {
            $location.path('/EditCapex');
        }
        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/EditUSAnda'); ///
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
            if ($scope.getStrategy[0].Strategy.Title == "Outlicensing") {
                Logics.setSharingData(request);
                $location.path('/AddOLBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }
            else if ($scope.getStrategy[0].Strategy.Title == "Inlicensing") {  //ANDA inhouse US//ANDA inhouse US
                Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }
            
			else if ($scope.getStrategy[0].Strategy.Title == 'ANDA - Inhouse US + MoW') { 
			Logics.setSharingData(request);
			$location.path('/AddAndaBusinessCase')
			}

           else if ($scope.getStrategy[0].Strategy.Title == "Capex") { 
                Logics.setSharingData(request);
                $location.path('/AddCapexBusinessCase')
                }

                
          else  if ($scope.getStrategy[0].Strategy.Title == "ANDA - Inhouse US") { 
                Logics.setSharingData(request);
                $location.path('/AddUSAndaBusinessCase')
                }


        }


    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ViewOutLicensing');
        } else if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ViewInLicensing');
        } else if (request.Strategy.Title == 'Outlicensing)') {
            $location.path('/ViewOutLicensing');
        }
               
        else if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ViewAndaLicensing');
        }
         else if (request.Strategy.Title == 'Capex') {
            $location.path('/ViewCapexLicensing');
        } 

        else if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ViewUSAndaLicensing');
        } 


        
       

        
        
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ChangeStageOutLicensing');
        } else if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ChangeStageInLicensing');
        }
        // else if(request.Strategy=='Outlicensing (OL)')
        // {
        // $location.path('/ViewOutLicensing');
        //}
       else if (request.Strategy.Title == 'Capex') {
            $location.path('/ChangeStageCapex');
        } 
        
        else if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ChangeStageAndaLicensing');
        }

        else if (request.Strategy.Title == 'ANDA - Inhouse US') {
          
                $location.path('/ChangeStageUSAnda');
            
        }




       
        
    } 
    $scope.onClickHome = function () {
        window.location.href =  _spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCaseLP.aspx";

    }
      });