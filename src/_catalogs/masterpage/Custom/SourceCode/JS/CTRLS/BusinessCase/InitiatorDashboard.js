appOperations.controller("InitiatorCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strRollURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
        Logics.getRolltData( strRollURL )
        {
        
        }

    var strBusinessCaseRequestsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseRequests')/items?$select=Id,Modified,Title,Status,GenericisationScenario,Site,BusinessCaseTemplateId,BusinessCaseTemplate/Title,CFTuserId,CFTuser/Title,CFTuser/EMail,Market/Id,Market/Title,Country/Id,Country/Title,BrandName/Id,BrandName/Title,Classification,Innovator/Id,Innovator/Title,MoleculeName/Id,MoleculeName/Title,Strength/Id,Strength/Title,PackSize,Dosage,Sector,ProductName/Id,ProductName/Title,ProductCategory/Id,ProductCategory/Title,DateofInitiation,Worksheet,TreatmentCategory/Id,TreatmentCategory/Title,CurrentDevelopmentStatus,BusinessCaseStages,BusinessCaseID&$expand=BusinessCaseTemplate,CFTuser,Market,Country,BrandName,Innovator,MoleculeName,Strength,ProductCategory,ProductName,TreatmentCategory&$top=5000&$orderby=ID desc"
    var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseDocument')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$orderby=ID desc";

    var urlColl = [strBusinessCaseRequestsUrl,strBusinessCaseDocumentUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
       
        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage =5;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;

        $scope.businessCaseRequestColl = batchedData[0].d.results;
        $scope.strBusinessCaseDocumentUrl = batchedData[1].d.results;

        if($scope.businessCaseRequestColl.length>0)
        {
            for(var i=0;i<$scope.businessCaseRequestColl.length;i++)
            {
                var results =  $filter('filter')($scope.strBusinessCaseDocumentUrl, function (responseLine) {

                        return responseLine.BusinessCaseId == $scope.businessCaseRequestColl[i].Id;
                });
                if(results.length>0)
                {
                    $scope.businessCaseRequestColl[i].Version=''+results[0].CaseVersion.toFixed(1);

                }
                else
                {
                    $scope.businessCaseRequestColl[i].Version='';
                }
            }
        }

    });
    
    $scope.onAddInitiationClick = function () {
        $location.path('/BusinessCaseInitiation');
    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        $location.path('/EditBusinessCaseInitiation');

    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        $location.path('/ViewBusinessCaseRequestInitiation');
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);
        $location.path('/ChangeStageBusinessCaseInitiation');
    }


});