appOperations.controller("ValidatorOLDashCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,VersionNo,Modified,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;
        $scope.pageSize1 = "5"

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;


        if ($scope.OutBusinessLicencingColl.length > 0) {
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) {
                for (var j = 0; j < $scope.OutBusinessLicencingColl[i].Validators.results.length; j++) {
                    var gName = $scope.OutBusinessLicencingColl[i].Validators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                    if (userExist == true) {
                        $scope.OutBusinessLicencingColl[i];
                        break;
                        //alert("TRUE")
                    }
                }
            }

        }
        $scope.AllFINALArry = $scope.OutBusinessLicencingColl

        $scope.OutBusinessLicencingColl = $filter('filter')($scope.OutBusinessLicencingColl, function (responseLine) {

            return (responseLine.CaseStatus === "Minor Changes-by Validator" || responseLine.CaseStatus === "On Hold" || responseLine.CaseStatus === "Sent For Validation");
        });
        if ($scope.OutBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }

        $scope.totalItems = $scope.OutBusinessLicencingColl.length; // Total number of items
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


    });

    $scope.statusChnage = function (ddlStatus) {

        $scope.OutBusinessLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.OutBusinessLicencingColl);


    }
    //view
    $scope.ViewValidateForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ValidatorOutLicensingBusinessCaseView');
        }
    }
    $scope.ValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ValidateOL');
        }

    }
    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

});