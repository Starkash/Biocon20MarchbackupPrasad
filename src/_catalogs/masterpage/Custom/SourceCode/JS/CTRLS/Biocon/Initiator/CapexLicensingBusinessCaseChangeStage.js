/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/
appOperations.controller("", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ChangeStageCapexLicensing');
    }
    else
    {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }

    var peoplePickerUsers = [];
    $scope.AllpeoplePickerUsers = [];
    Utilities.initializePeoplePickerSig('SinglelepeoplePickerNotify');

    var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,BusinessCaseName,InitiationDate,CaseStage,CapexValue,CapexCurrency,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiator/Id,Initiator/Title,Entity/Id,Entity/Title,Site/Id,Site/Title&$expand=Strategy,SubStrategy,Initiator,Entity,Site&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    var strCapexPhaseDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?&$select=Id,Title,PhaseTotal,TriggerYear,CompletionYear,CapexBusinessCase/Id,CapexBusinessCase/Title,ProductName/Id,ProductName/Title&$expand=CapexBusinessCase,ProductName&$filter=CapexBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

    var urlColl = [strCapexBusinessCaseUrl,strCapexPhaseDetailsUrl];

    
            Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
            
                $scope.CapexBusinessCaseColl = batchedData[0].d.results; 
                $scope.CapexPhaseDetailsColl = batchedData[1].d.results; 
                
                $scope.isLoading = false;

                if ($scope.CapexBusinessCaseColl.length>0) {

                    $scope.Businesscasename = $scope.CapexBusinessCaseColl[0].Title;
                    $scope.Id = $scope.CapexBusinessCaseColl[0].ID;
                    $scope.InitiationDate=new Date($scope.CapexBusinessCaseColl[0].InitiationDate);                
                    $scope.Businesscaseid=$scope.CapexBusinessCaseColl[0].BusinessCaseID;
                    $scope.ddlStrategy=$scope.CapexBusinessCaseColl[0].Strategy.Title;
                    $scope.ddlSite=$scope.CapexBusinessCaseColl[0].Site.Title;
                    $scope.ddlEntity=$scope.CapexBusinessCaseColl[0].Entity.Title;
                    $scope.CapexValue=$scope.CapexBusinessCaseColl[0].CapexValue;
                    $scope.CapexCurrency=$scope.CapexBusinessCaseColl[0].CapexCurrency;
                    $scope.Escalation=$scope.CapexBusinessCaseColl[0].Escalation;
                    $scope.EscalationRemarks=$scope.CapexBusinessCaseColl[0].EscalationRemarks;
                    $scope.CapexApprovalYear=new Date($scope.CapexBusinessCaseColl[0].CapexApprovalYear);
                    $scope.BCCompletionYear=new Date($scope.CapexBusinessCaseColl[0].BCCompletionYear);
                    $scope.TriggerYear=new Date($scope.CapexBusinessCaseColl[0].TriggerYear);
                    $scope.NoofProducts=$scope.CapexBusinessCaseColl[0].NumberOfProducts;

                    for (var z = 0; z < $scope.CapexBusinessCaseColl[0].Initiator.results.length; z++) {
                    $scope.pickmul = $scope.CapexBusinessCaseColl[0].Initiator.results[z].Title

                    Utilities.SetUserFieldValue('SinglelepeoplePickerNotify', $scope.pickmul);

                    }
                 }

                });
                $scope.onInitiationCancel = function () {
                    $location.path("/OutLicensingLP");
                }
            
    });

   

