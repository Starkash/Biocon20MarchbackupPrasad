appOperations.controller("ValidatorUSANDADashCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessUSANDALicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USANDABusinessCase')/items?$select=Id,BusinessCaseDescription,VersionNo,Modified,LapVersion,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,Counter,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

    $scope.test=[];

    var urlColl = [strBusinessUSANDALicencingUrl, strStrategyUrl, strSubStrategyUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.itemsPerPage =20// 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;

        $scope.pageSize1 = "5"

        $scope.InBusinessLicencingLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        $scope.InBusinessLicencingLicencingColl1=$scope.InBusinessLicencingLicencingColl;
        $scope.OutBusinessLicencingColl4=$scope.InBusinessLicencingLicencingColl ;
        $scope.OutBusinessLicencingColl5=$scope.InBusinessLicencingLicencingColl ;
   
        $scope.test = $scope.InBusinessLicencingLicencingColl1;

        if ($scope.InBusinessLicencingLicencingColl.length > 0) {
          var  OLFinalArray=[];
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {
                for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Validators.results.length; j++) {
                    var gName = $scope.InBusinessLicencingLicencingColl[i].Validators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                    if (userExist == true) {
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            //  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "";
                            // $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";

                            //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                            $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                            // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/dee5a721-3f34-4d05-b1be-f6c7331041e8/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";


                        }
                      //  $scope.InBusinessLicencingLicencingColl[i];
                       OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
                        break;
                    }
                }
            }

           
    

        }
        $scope.InBusinessLicencingLicencingColl=OLFinalArray

        $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

        $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

            return (responseLine.CaseStatus === "Minor Changes-by Validator" || responseLine.CaseStatus === "On Hold" || responseLine.CaseStatus === "Sent For Validation");
        });


      



        if ($scope.InBusinessLicencingLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }

        $scope.test = $scope.InBusinessLicencingLicencingColl1;

        $scope.showallstatus = 'conditionForFalse'; // Initial value

        $scope.toggleStatus = function() {
          // Your logic based on the true or false value of showallstatus
          if ($scope.showallstatus === 'conditionForTrue') {

            $scope.test = $scope.InBusinessLicencingLicencingColl1;
            // Do something when true
            location.reload();
          } else {
            $scope.ddlStatus="";
            // Do something when false
            $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
            
            $scope.test = $scope.InBusinessLicencingLicencingColl;
          //  alert('Radhe Radhe');
          
          }
        };
        



        $scope.totalItems = $scope.InBusinessLicencingLicencingColl.length; // Total number of items
        $scope.currentPage = 1; // Current page
        $scope.itemsPerPage =20// 5; // Items per page
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

    });

    $scope.statusChnage = function (ddlStatus) {

        $scope.InBusinessLicencingLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.InBusinessLicencingLicencingColl);

    }


    $scope.ViewValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ValidatorValidateUSAndaBusinessCaseView');
        }

    }

    $scope.ValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ValidateUSAnda');
        }
    }

    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

});