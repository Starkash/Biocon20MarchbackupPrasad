appOperations.controller("ValidatorDashboardCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessCaseRequestsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseRequests')/items?$select=Id,Title,AuthorId,Author/Title,GenericisationScenario,Site,BusinessCaseTemplateId,BusinessCaseTemplate/Title,CFTuserId,CFTuser/Title,CFTuser/EMail,Market/Id,Market/Title,Country/Id,Country/Title,BrandName/Id,BrandName/Title,Classification,Innovator/Id,Innovator/Title,MoleculeName/Id,MoleculeName/Title,Strength/Id,Strength/Title,PackSize,Dosage,Sector,ProductName/Id,ProductName/Title,ProductCategory/Id,ProductCategory/Title,DateofInitiation,Worksheet,TreatmentCategory/Id,TreatmentCategory/Title,CurrentDevelopmentStatus,BusinessCaseStages,BusinessCaseID&$expand=BusinessCaseTemplate,Author,CFTuser,Market,Country,BrandName,Innovator,MoleculeName,Strength,ProductCategory,ProductName,TreatmentCategory&$filter=BusinessCaseStages eq 'Under Validation'&$top=5000&$orderby=ID desc"
    
    var urlColl = [strBusinessCaseRequestsUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 5;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;
        
        $scope.businessCaseRequestColl = batchedData[0].d.results;
    });
    $scope.onAddInitiationClick = function () {
        $location.path('/BusinessCaseInitiation');
    }
    // edit
    $scope.ValidatorRadioForm= function (request) {
        Logics.setSharingData(request);
        $location.path('/BusinessCaseValidator');
    }
    $scope.ViewRadioForm= function (request) {
        Logics.setSharingData(request);
        $location.path('/BusinessCaseValidatorView');
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);
        $location.path('/ChangeStageBusinessCaseInitiation');

    }

});