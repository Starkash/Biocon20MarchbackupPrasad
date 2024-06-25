appOperations.controller("", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
   
    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,InitiationDate,CapexValue,CapexCurrency,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Initiator/Id,Initiator/Title,Entity/Id,Entity/Title,Site/Id,Site/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage&$expand=Strategy,SubStrategy,Initiator,Entity,Site&$top=5000&$orderby=ID desc"
    var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,InitiationDate,LOEDate,LaunchDateUS,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage&$expand=Strategy,SubStrategy,DosageForm,ProductName&$top=5000&$orderby=ID desc"

    var urlColl = [strBusinessOutLicencingUrl,strStrategyUrl,strSubStrategyUrl,strBusinessInLicencingUrl,strBusinessCapexLicencingUrl,strBusinessAndaLicencingUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
       
        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage =5;
        $scope.CurrentPage = 1;
        $scope.ItemsPerPage = 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.InBusinessLicencingLicencingColl = batchedData[3].d.results;
        $scope.CapexBusinessLicencingColl = batchedData[4].d.results;
        $scope.AndaBusinessLicencingColl = batchedData[5].d.results;
      
        $scope.FINALArry=[];
        var BusinessArry=[];
        if($scope.OutBusinessLicencingColl.length>0){
            for(var i=0;i<$scope.OutBusinessLicencingColl.length;i++)
            {
                var col={};
                col.Strategy=$scope.OutBusinessLicencingColl[i].Strategy.Title;
                col.ID=$scope.OutBusinessLicencingColl[i].Id;
                col.SubStrategy=$scope.OutBusinessLicencingColl[i].SubStrategy.Title;
                col.Title=$scope.OutBusinessLicencingColl[i].Title;
                col.InitiationDate=$scope.OutBusinessLicencingColl[i].InitiationDate;
                col.ProductName=$scope.OutBusinessLicencingColl[i].ProductName.Title;
                col.CaseStage=$scope.OutBusinessLicencingColl[i].CaseStage;
                BusinessArry.push(col)
            }
          //  $scope.FINALArry.push($scope.OutBusinessLicencingColl);
        }
        if($scope.InBusinessLicencingLicencingColl.length>0){
            // $scope.FINALArry.push($scope.InBusinessLicencingLicencingColl);
            for(var i=0;i<$scope.InBusinessLicencingLicencingColl.length;i++)
            {
                var col={};
                col.Strategy=$scope.InBusinessLicencingLicencingColl[i].Strategy.Title;
                col.ID=$scope.InBusinessLicencingLicencingColl[i].Id;

                col.SubStrategy=$scope.InBusinessLicencingLicencingColl[i].SubStrategy.Title;
                col.Title=$scope.InBusinessLicencingLicencingColl[i].Title;
                col.InitiationDate=$scope.InBusinessLicencingLicencingColl[i].InitiationDate;
                col.ProductName=$scope.InBusinessLicencingLicencingColl[i].ProductName.Title;
                col.CaseStage=$scope.InBusinessLicencingLicencingColl[i].CaseStage;
                
                BusinessArry.push(col)
            }
        }
     
        if($scope.CapexBusinessLicencingColl.length>0){
            for(var i=0;i<$scope.CapexBusinessLicencingColl.length;i++)
            {
                var col={};
                col.Strategy=$scope.CapexBusinessLicencingColl[i].Strategy.Title;
                col.ID=$scope.CapexBusinessLicencingColl[i].Id;
                col.SubStrategy=$scope.CapexBusinessLicencingColl[i].SubStrategy.Title;
                col.Title=$scope.CapexBusinessLicencingColl[i].Title;
                col.InitiationDate=$scope.CapexBusinessLicencingColl[i].InitiationDate;
               // col.ProductName=$scope.CapexBusinessLicencingColl[i].ProductName.Title;
                col.CaseStage=$scope.CapexBusinessLicencingColl[i].CaseStage;
                
                BusinessArry.push(col)
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
        $scope.FINALArry=BusinessArry;

    });
    
    $scope.onAddInitiationClick = function () {
        $location.path('/AddOLBusinessCase');
    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        $location.path('/EditBusinessCaseInitiation');

    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if(request.Strategy=='Outlicensing (OL)')
        {
        $location.path('/ViewOutLicensing');
        }
        else if(request.Strategy=='Inlicensing (IL)')
        {
        $location.path('/ViewInLicensing');
        }
        else if(request.Strategy=='Outlicensing (OL)')
        {
        $location.path('/ViewOutLicensing');
        }   if(request.Strategy=='Capex(CAP)')
        {
        $location.path('/ViewCapexLicensing');
        }
        else if(request.Strategy=='API(API)')
        {
        $location.path('/ViewAndaLicensing');
        }
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if(request.Strategy=='Outlicensing (OL)')
        {
            $location.path('/ChangeStageOutLicensing');
        }
        else if(request.Strategy=='Inlicensing (IL)')
        {
        $location.path('/ChangeStageInLicensing');
        }
        // else if(request.Strategy=='Outlicensing (OL)')
        // {
        // $location.path('/ViewOutLicensing');
        //}
           if(request.Strategy=='Capex(CAP)')
        {
        $location.path('/ChangeStageCapex');
        }
        else if(request.Strategy=='API(API)')
        {
            $location.path('/ChangeStageAndaLicensing');
        }
    }


});