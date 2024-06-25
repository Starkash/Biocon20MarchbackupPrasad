appOperations.controller("ReviewerUSANDAUMEDashCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessUSAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,VersionNo,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

    var urlColl = [strBusinessUSAndaLicencingUrl, strStrategyUrl, strSubStrategyUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 20;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;

        $scope.pageSize1 = "5";

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        $scope.USAndaBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        if ($scope.USAndaBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) {

                for (var j = 0; j < $scope.USAndaBusinessLicencingColl[i].Reviewers.results.length; j++) {
                    var gName = $scope.USAndaBusinessLicencingColl[i].Reviewers.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                    if (userExist == true) {
                        $scope.USAndaBusinessLicencingColl[i];
                        break;

                    }
                }
            }
        }
        $scope.AllFINALArry = $scope.USAndaBusinessLicencingColl

        $scope.USAndaBusinessLicencingColl = $filter('filter')($scope.USAndaBusinessLicencingColl, function (responseLine) {

            return (responseLine.CaseStatus === "Under Internal Review");
        });

        if ($scope.USAndaBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }
        
        // PAGINATION
        
        $scope.totalItems = $scope.USAndaBusinessLicencingColl.length; // Total number of items
        $scope.currentPage = 1; // Current page
        $scope.itemsPerPage = 20; // Items per page
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

        $scope.displayedItems = generateItems();
    });


    $scope.statusChnage = function (ddlStatus) {

        $scope.USAndaBusinessLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.USAndaBusinessLicencingColl);

    }

    $scope.ViewReviewerForm = function (request) {
        Logics.setSharingData(request);


        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ReviewerUSAndaLicensingBusinessCaseView');
        }
    }

    $scope.ReviewForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ReviewerReviewUSAndaLicensingBusinessCase');//ReviewerReviewAndaLicensingBusinessCase
        }
    }

    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }
});