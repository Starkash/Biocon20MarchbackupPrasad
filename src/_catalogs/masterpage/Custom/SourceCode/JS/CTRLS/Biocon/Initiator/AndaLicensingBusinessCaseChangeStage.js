/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/
appOperations.controller("", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ChangeStageAndaLicensing');
    }
    else
    {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }

    var strAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?&$select=Id,Title,BusinessCaseName,InitiationDate,CaseStage,LOEDate,LaunchDateUS,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
     var strAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,AndaBusinessCase/Id,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

            var urlColl = [strAndaBusinessCaseUrl,strAndaSKUDetailsUrl];

            Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
            
                $scope.AndaBusinessCaseColl = batchedData[0].d.results; 
                $scope.AndaSKUDetailsColl = batchedData[1].d.results; 

                $scope.isLoading = false;

                    if ($scope.AndaBusinessCaseColl.length>0) {

                        $scope.Businesscasename = $scope.AndaBusinessCaseColl[0].Title;
                        $scope.Id = $scope.AndaBusinessCaseColl[0].ID;
                        $scope.InitiationDate=new Date($scope.AndaBusinessCaseColl[0].InitiationDate);                
                        $scope.Businesscaseid=$scope.AndaBusinessCaseColl[0].BusinessCaseID;
                        $scope.ddlProductCategory =$scope.AndaBusinessCaseColl[0].ProductCategory.Title;
                        $scope.ddlProductName =$scope.AndaBusinessCaseColl[0].ProductName.Title;
                        $scope.ddlStrategy=$scope.AndaBusinessCaseColl[0].Strategy.Title;
                        $scope.ddlSubStrategy=$scope.AndaBusinessCaseColl[0].SubStrategy.Title;
                        $scope.ddlmarket="US";
                        $scope.ddlCountry="US";

                    }

                });
                $scope.onInitiationCancel = function () {
                    $location.path("/OutLicensingLP");
                }
            
    });

   

