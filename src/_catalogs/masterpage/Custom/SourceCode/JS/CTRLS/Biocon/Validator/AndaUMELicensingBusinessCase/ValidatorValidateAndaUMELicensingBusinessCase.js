// appOperations.controller("ValidatorValidateAndaUMEBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

//     if (Logics.getSharedData() == undefined) {
//         $location.path('/ValidatorLP');
//     } else {
//         $scope.BcInitiateDetails = Logics.getSharedData();
//         $scope.IntiateID = $scope.BcInitiateDetails.ID;
//     }


//     $scope.ChangeStagebc = [];
//     var strAndaUMEBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
//     var strAndaLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMELicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,AndaUMEBusinessCase&$filter=AndaUMEBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
//     // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     var strAndaUMESKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMESKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,AndaUMELicensingLaunchDetail/Id,AndaUMELicensingLaunchDetail/Title,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title&$expand=AndaUMELicensingLaunchDetail,AndaUMEBusinessCase&$top=5000&$orderby=ID asc";
    
//     // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('AndaUMEBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
//     // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
//     var strBusinessCaseAndaDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    
//     var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";
    
//     var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";
//     var strAndaUMECommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMECommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,DescriptionType,AndaUMEBusinessCaseDoc/Id,AndaUMEBusinessCaseDoc/Title&$expand=AndaUMEBusinessCaseDoc,AndaUMEBusinessCase,Editor&$filter=AndaUMEBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";
    
//     var strBusinessCaseAndaDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
//     var strAndaUMECommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMECommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,DescriptionType,AndaUMEBusinessCaseDoc/Id,AndaUMEBusinessCaseDoc/Title&$expand=AndaUMEBusinessCaseDoc,AndaUMEBusinessCase,Editor&$filter=AndaUMEBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";
    
//      var strBusinessCaseAndaSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,AndaUMEBusinessCase/Id,File&$filter=AndaUMEBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    
    
//     var urlColl = [strAndaUMEBusinessCaseUrl, strAndaLaunchDetailsUrl, strAndaUMESKUDetailsUrl, strBusinessCaseAndaDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strAndaUMECommentsWorkflowHistoryUrl,strBusinessCaseAndaDocumentLinkUrlWorkFlow,strAndaUMECommentsWorkflowHistoryUrl2,strBusinessCaseAndaSupportingDocumentURL ];
    
//     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
    
//         $scope.AndaUMEBusinessCaseColl = batchedData[0].d.results;
//         $scope.AndaLaunchDetailsColl = batchedData[1].d.results;
//         $scope.AndaUMESKUDetailsColl = batchedData[2].d.results;
//         $scope.BusinessCaseANDADocumentLinkColl = batchedData[3].d.results;  //arvind
//         $scope.CaseStageColl = batchedData[4].d.results;
//         $scope.ChangeCaseStageColl = batchedData[5].d.results;
//         $scope.AndaUMECommentsWorkflowHistoryColl = batchedData[6].d.results;        
//         $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl =batchedData[7].d.results;
//         $scope.AndaUMECommentsWorkflowHistoryColl2 =batchedData[8].d.results;
//         $scope.AndaSupportingDocColl =batchedData[9].d.results;
    
    

//         $scope.isLoading = false;

//         if ($scope.AndaUMEBusinessCaseColl.length > 0 || $scope.AndaLaunchDetailsColl.length > 0 || $scope.AndaUMESKUDetailsColl.length > 0) {

//             $scope.Businesscasename = $scope.AndaUMEBusinessCaseColl[0].BusinessCaseName;
//             $scope.Businesscaseid = $scope.AndaUMEBusinessCaseColl[0].ID;
//             //$scope.Businesscaseid=$scope.AndaUMEBusinessCaseColl[0].BusinessCaseID;
//             $scope.InitiationDate = new Date($scope.AndaUMEBusinessCaseColl[0].InitiationDate);
//             $scope.ddlProductCategory = $scope.AndaUMEBusinessCaseColl[0].ProductCategory.Title;
//             $scope.ddlProductName = $scope.AndaUMEBusinessCaseColl[0].ProductName.Title;
//             $scope.ddlStrategy = $scope.AndaUMEBusinessCaseColl[0].Strategy.Title;
//             $scope.ddlSubStrategy = $scope.AndaUMEBusinessCaseColl[0].SubStrategy.Title;
//             $scope.CaseStatus = $scope.AndaUMEBusinessCaseColl[0].CaseStatus;
//             $scope.CurrentStatus= $scope.AndaLaunchDetailsColl[0].CurrentStatus;
//             $scope.Businesscaseid = $scope.AndaUMEBusinessCaseColl[0].Title;
            
//           if($scope.AndaUMECommentsWorkflowHistoryColl.length>0)
           
// 						{
// 						 $scope.InitiatorComments1= $scope.AndaUMECommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
// 						 }
//             $scope.Editor = $scope.AndaUMEBusinessCaseColl[0].Editor.Title;

//             $scope.Modified = new Date($scope.AndaUMEBusinessCaseColl[0].Modified);

//             if ($scope.AndaUMEBusinessCaseColl[0].CaseStage != undefined && $scope.AndaUMEBusinessCaseColl[0].CaseStage != '' && $scope.AndaUMEBusinessCaseColl[0].CaseStage != null)

//             {
//                 $scope.CaseStage = $scope.AndaUMEBusinessCaseColl[0].CaseStage.Title;

//             }

//             if ($scope.AndaUMEBusinessCaseColl[0].DosageForm.results.length > 0) {

//                 $scope.DosageForm = "";
//                 for (var p = 0; p < $scope.AndaUMEBusinessCaseColl[0].DosageForm.results.length; p++) {


//                     $scope.DosageForm += $scope.AndaUMEBusinessCaseColl[0].DosageForm.results[p].Title + ',';


//                 }
//                 $scope.dosage1 = $scope.DosageForm.slice(0, -1);



//             }

//             $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;

//             if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
//                 $scope.MajorV = Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion);
//                 $scope.LapVersion= $scope.BusinessCaseANDADocumentLinkColl[0].LapVersion;

//                 $scope.Title = $scope.BusinessCaseANDADocumentLinkColl[0].Title;
//                 $scope.MinorV = parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion).toFixed(1);
//                 if ($scope.MajorV == $scope.MinorV) {
//                     $scope.VersionFlag = "Major Version";

//                 } else {
//                     $scope.VersionFlag = "Minor Version";
//                 }
//             }

//             if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
//                 for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkColl.length; s++) {
//                     $scope.BusinessCaseANDADocumentLinkColl[s].DocID = $scope.BusinessCaseANDADocumentLinkColl[s].ID;
//                     $scope.BusinessCaseANDADocumentLinkColl[s].Fname = $scope.BusinessCaseANDADocumentLinkColl[s].File.Name;
//                     $scope.BusinessCaseANDADocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkColl[s].File.ServerRelativeUrl;

//                 }
//             } else {
//                 $scope.BusinessCaseANDADocumentLinkColl = "";
//             }

//         }

//         for (var i = 0; i < $scope.AndaLaunchDetailsColl.length; i++) {
//             $scope.AndaLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.AndaUMESKUDetailsColl, function (responseLine) {

//                 return responseLine.AndaUMELicensingLaunchDetail.Id == $scope.AndaLaunchDetailsColl[i].Id;
//             });

//         }

//     });
//  $scope.openDocVersionHistory = function(filedata){
// 			        Logics.openDocumentVersionHistory(filedata);
// 			    }




appOperations.controller("ValidatorValidateANDAUMEBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ValidatorUSANDAUMEDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    var strAndaUMEBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Innovator/Id,Innovator/Title,LapVersion,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,Initiators,Innovator,Reviewers,Validators,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
    var strAndaLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMELicensingLaunchDetails')/items?&$select=Id,Title,FillingDate,FilingType/Id,FilingType/Title,NoofGenericFilers,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,FilingType,Country,Partner,AndaUMEBusinessCase&$filter=AndaUMEBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
   
var strAndaUMESKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMESKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,AndaUMELicensingLaunchDetail/Id,AndaUMELicensingLaunchDetail/Title,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title&$expand=AndaUMELicensingLaunchDetail,SkuUnit,PackingType,AndaUMEBusinessCase&$filter=AndaUMEBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

// var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('AndaUMEBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
// var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
var strBusinessCaseAndaDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";
var strAndaUMECommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMECommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,DescriptionType,AndaUMEBusinessCaseDoc/Id,AndaUMEBusinessCaseDoc/Title&$expand=AndaUMEBusinessCaseDoc,AndaUMEBusinessCase,Editor&$filter=AndaUMEBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

var strBusinessCaseAndaDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
var strAndaUMECommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMECommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,DescriptionType,AndaUMEBusinessCaseDoc/Id,AndaUMEBusinessCaseDoc/Title&$expand=AndaUMEBusinessCaseDoc,AndaUMEBusinessCase,Editor&$filter=AndaUMEBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

 var strBusinessCaseAndaSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMELicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,AndaUMEBusinessCase/Id,AndaUMEBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,AndaUMEBusinessCase/Id,File&$filter=AndaUMEBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";

 var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
 var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
 var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading


 var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading


var urlColl = [strAndaUMEBusinessCaseUrl, strAndaLaunchDetailsUrl, strAndaUMESKUDetailsUrl, strBusinessCaseAndaDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strAndaUMECommentsWorkflowHistoryUrl,strBusinessCaseAndaDocumentLinkUrlWorkFlow,strAndaUMECommentsWorkflowHistoryUrl2,strBusinessCaseAndaSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];

Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

    $scope.AndaUMEBusinessCaseColl = batchedData[0].d.results;
    $scope.AndaLaunchDetailsColl = batchedData[1].d.results;
    $scope.AndaUMESKUDetailsColl = batchedData[2].d.results;
    $scope.BusinessCaseANDADocumentLinkColl = batchedData[3].d.results;  //arvind
    $scope.CaseStageColl = batchedData[4].d.results;
    $scope.ChangeCaseStageColl = batchedData[5].d.results;
    $scope.AndaUMECommentsWorkflowHistoryColl = batchedData[6].d.results;        
    $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl =batchedData[7].d.results;
    $scope.AndaUMECommentsWorkflowHistoryColl2 =batchedData[8].d.results;
    $scope.AndaSupportingDocColl =batchedData[9].d.results;

    $scope.PackingMasterColl = batchedData[10].d.results;
    $scope.CurrentStatusMasterColl = batchedData[11].d.results;
    $scope.CurrencyMasterColl = batchedData[12].d.results;
    $scope.ProductMasterColl= batchedData[13].d.results;

    $scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 


        $scope.isLoading = false;

          // Email group 
          $scope.InitiatorsGroupsName = [];
          $scope.ReviewersGroupsName = [];
          $scope.ValidatorsGroupsName = [];
  
        //   for (let m = 0; m < $scope.AndaUMEBusinessCaseColl[0].Initiators.results.length; m++) {
        //       $scope.InitiatorsGroupsName.push($scope.AndaUMEBusinessCaseColl[0].Initiators.results[m].Title);
        //   }
        //   for (let m = 0; m < $scope.AndaUMEBusinessCaseColl[0].Reviewers.results.length; m++) {
        //       $scope.ReviewersGroupsName.push($scope.AndaUMEBusinessCaseColl[0].Reviewers.results[m].Title);
        //   }
        //   for (let m = 0; m < $scope.AndaUMEBusinessCaseColl[0].Validators.results.length; m++) {
        //       $scope.ValidatorsGroupsName.push($scope.AndaUMEBusinessCaseColl[0].Validators.results[m].Title);
        //   }
  

        if ($scope.AndaUMEBusinessCaseColl.length > 0 || $scope.AndaLaunchDetailsColl.length > 0 || $scope.AndaUMESKUDetailsColl.length > 0 || $scope.BusinessCaseANDADocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.AndaUMEBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.AndaUMEBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.AndaUMEBusinessCaseColl[0].BusinessCaseID;
          //  $scope.InitiationDate = new Date($scope.AndaUMEBusinessCaseColl[0].InitiationDate);
            $scope.InitiationDate = new Date($scope.AndaUMEBusinessCaseColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;
            $scope.ddlProductCategory = $scope.AndaUMEBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.AndaUMEBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.AndaUMEBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.AndaUMEBusinessCaseColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.AndaUMEBusinessCaseColl[0].CaseStatus;
            $scope.CurrentStatus= $scope.AndaLaunchDetailsColl[0].CurrentStatus.Title;

            $scope.ddlInnovator = $scope.AndaUMEBusinessCaseColl[0].Innovator.Title;

            $scope.BusinessCaseDescription = $scope.AndaUMEBusinessCaseColl[0].BusinessCaseDescription;



            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;

            $scope.Businesscaseid = $scope.AndaUMEBusinessCaseColl[0].Title;
             if($scope.AndaUMECommentsWorkflowHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.AndaUMECommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.AndaUMEBusinessCaseColl[0].Editor.Title;
            // 
            $scope.Modified = new Date($scope.AndaUMEBusinessCaseColl[0].Modified);

            if ($scope.AndaUMEBusinessCaseColl[0].CaseStage != undefined && $scope.AndaUMEBusinessCaseColl[0].CaseStage != '' && $scope.AndaUMEBusinessCaseColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.AndaUMEBusinessCaseColl[0].CaseStage.Title;

            }

            if ($scope.AndaUMEBusinessCaseColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.AndaUMEBusinessCaseColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.AndaUMEBusinessCaseColl[0].DosageForm.results[p].Title + ',';


                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);



            }



            if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion);
               $scope.LapVersion = $scope.BusinessCaseANDADocumentLinkColl[0].LapVersion;

                $scope.Title = $scope.BusinessCaseANDADocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkColl.length; s++) {
                    $scope.BusinessCaseANDADocumentLinkColl[s].DocID = $scope.BusinessCaseANDADocumentLinkColl[s].ID;
                    $scope.BusinessCaseANDADocumentLinkColl[s].Fname = $scope.BusinessCaseANDADocumentLinkColl[s].File.Name;
                    $scope.BusinessCaseANDADocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseANDADocumentLinkColl = "";
            }


            /// arvind

            $scope.MemberType="Validator";



            if ($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.length; s++) {
                 
                var cv=parseFloat($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                var casestg=$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                var lapvrsion= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].LapVersion;
               var vrsionType= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].VersionType;
              


        var FilteredData= $filter('filter')($scope.AndaUMECommentsWorkflowHistoryColl2, function (item) {
            return (item.CaseStage== casestg && item.VersionNo== cv) ;
        });
        
        
          var docFilteredData= $filter('filter')($scope.AndaSupportingDocColl, function (item) {
            return (item.AndaUMEBusinessCase.Id== $scope.IntiateID && item.CaseVersion== cv) ;
        });
        $scope.MemberType="Validator";

        $scope.FileArry=[];
         if(docFilteredData.length>0){
        for(var c=0;c<docFilteredData.length;c++){
  	  		var col={};
  	  		col.FinalAttachData=docFilteredData[c].File.Name;
  	  		col.FinalCaseStage=docFilteredData[c].CaseStage.Title;
                col.Comment = $scope.CommentsWorkflowHistory;
                col.MemberType = $scope.MemberType;
  	  	//	col.FinalAttachDataRel=docFilteredData[c].File.ServerRelativeUrl;	
            col.FinalAttachDataRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + docFilteredData[c].File.ServerRelativeUrl;
	
     
			 $scope.FileArry.push(col);

   		}
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachData=$scope.FileArry

   		}
   		else
   		{
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachData="";
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel="";

   		}
      /*  $scope.AttachColl=[];
        if(docFilteredData.length>0){
	        for(var w=0;w<docFilteredData.length;w++)
	        {
	        var attach={};
	        attach.DocAttachFName=docFilteredData[w].File.Name
			attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
			//$scope.AttachColl.push(attach);
			 $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.push(attach);
	          
	        }
	        
	    /*    for(var l=0;l<$scope.AttachColl.length;l++){
	        
		       $scope.FinalDocAttachCollName=$scope.AttachColl[l].DocAttachFName ;
		       $scope.FinalDocAttachCollRel=$scope.AttachColl[l].DocAttachRelURl;
	       }*/
	        
	      
    /*    for(var u=0;u<$scope.AttachColl.length;u++)  {
	     var newcoll={};
        newcoll.push($scope.AttachColl[u]);
       
        
        }*/
	       
        //}
       
        

        
        
      
         if(lapvrsion=='null' || casestg==undefined)        
        {
	        lapvrsion='V0';
	        casestg='Initiated';
  	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

        //	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

        }
          
        		
        if(FilteredData.length>0)
        {
            if(FilteredData[0].CommentsWorkflowHistory ==null)
            {
                FilteredData[0].CommentsWorkflowHistory='NA'
                
            }
       	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

		//$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }
        
        else
        {
                $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }                
               	
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].DocID = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].ID;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].LapVersion = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].LapVersion;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseVersion = parseFloat($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseStage = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].VersionType = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].VersionType;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Fname = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.Name;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Author= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Author.Title; 
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseStage= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Created= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Created;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Editor= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Editor.Title;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified;
         //   $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
         $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl = "";
            }

        }

        for (var i = 0; i < $scope.AndaLaunchDetailsColl.length; i++) {
            $scope.AndaLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.AndaUMESKUDetailsColl, function (responseLine) {

                return responseLine.AndaUMELicensingLaunchDetail.Id == $scope.AndaLaunchDetailsColl[i].Id;
            });

        }

    });

 $scope.openDocVersionHistory = function(filedata){
			        Logics.openDocumentVersionHistory(filedata);
			    }

    
     var fileCounter = 0;
     
    //  $scope.ChagneBusinesscaseStage = [{
    //         Id: 13,
    //         Value: "Under Validation"
    //     }];
   
    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorUSANDAUMEDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerUSMOWANDADash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorUSMOWANDADash";


    $scope.CommentReuquired = false;


    $scope.ChnageCommentReuquired = function () {



        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;

        }
        else {
            $scope.CommentReuquired = false;


        }
    },




    $scope.onValidatorSubmit = function () {


        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }

        // $scope.ChagneBusinesscaseStage="Validation Completed"     

        $scope.CaseStatus = "Validation Completed"

        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }

      //  $scope.VersionDesc= 'Case Stage'+$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.AndaUMEBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;

        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.AndaUMECommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            AndaUMEBusinessCaseId: $scope.AndaUMEBusinessCaseColl[0].Id,
           AndaUMEBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID,
             CaseStage:$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
             DescriptionType:"Validator Comment",
          VersionNo: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1)            
            
         
           
           

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMECommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaUMEBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
           // var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/AndaUMEBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/AndaUMEBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
 			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title&$expand=AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.AndaUMEBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);

                        var emailSubject = "Business Case Validation Completion"
                        var emailBody = "<h1>Business Case Validation Completion</h1>"
            
                        + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","
            
                        + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
                        +" has been validated by the "+"&nbsp;"+ "<b>"
                        +$scope.ValidatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"
            
                        + "<p><b>Below are the details of the Business Case: </b></p>"
            
                        + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
                        + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
                        + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
                        + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
                        + "<p><b>Month of Initiation: </b>" + $scope.InitiationDate + "</p>"
                        + "<p>Kindly check the Business Case using the below link:&nbsp;</p>"
                        + "<a href="+ $scope.InitiatorDashboard+">"+"Click here"+"</a>"
                        + "<p> <b> Below are the details of the Product and Comments:</b></p>"
                        + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
                        + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
                       
                        + "<p><b>Validator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
                        + "<p></p><br>"
                + "<p><b>Thanks & Regards, </b></p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);
            
            

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/ValidatorUSANDAUMEDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorUSANDAUMEDash");
                        }
                    });
                });
            });

        });




    }


    $scope.onCreateVersion = function () {


        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }


        // if ($scope.ddlStage== '' || $scope.ddlStage== undefined || $scope.ddlStage== null ||$scope.ddlStage== 'Select') {
        //        alert("Please Select Stage ")
        //        return false;
        //    }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }
       // $scope.VersionDesc= 'Case Stage'+$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.AndaUMEBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ';'+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.AndaUMECommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            AndaUMEBusinessCaseId: $scope.AndaUMEBusinessCaseColl[0].Id,
           AndaUMEBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID,
             CaseStage:$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
          VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMECommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });





        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaUMEBusinessCaseListItem"
            },

            CaseStageId:$scope.AndaUMEBusinessCaseColl[0].CaseStage.Id,
            CaseStatus: "Minor Changes-by Validator",
            VersionNo:(parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)



        }


        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);

          //  var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/AndaUMEBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/AndaUMEBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) +0.1).toFixed(1).toString() + ".xlsx";
           
 			var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,AndaUMEBusinessCaseId,AndaUMEBusinessCase/Title&$expand=AndaUMEBusinessCase&$filter=AndaUMEBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.AndaUMEBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc  //= 'Case Stage'+$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        


                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);

                        
                        var emailSubject = "Business Case Save Changes as Minor Version"
                        var emailBody = "<h1>Business Case Save Changes as Minor Version</h1>"
            
                        + "<p> Dear"+"&nbsp;"+ $scope.ValidatorsGroupsName+","
            
                        + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
                        +"  Minor Version Changes done have been saved for a Business Case for Strategy "+"&nbsp;"+ "<b>"
                        +$scope.ValidatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"
            
                        + "<p><b>Below are the details of the Business Case: </b></p>"
            
                        + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
                        + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
                        + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
                        + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
                        + "<p><b>Month of Initiation: </b>" + $scope.InitiationDate + "</p>"
                        + "<p>Kindly check the Business Case using the below link:&nbsp;</p>"
                        + "<a href="+ $scope.ValidatorDashboard+">"+"Click here"+"</a>"
                        + "<p> <b> Below are the details of the Product and Comments:</b></p>"
                        + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
                        + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
                       
                        + "<p><b>Validator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
                        + "<p></p><br>"
                + "<p><b>Thanks & Regards, </b></p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups($scope.ValidatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);
            
            
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/ValidatorUSANDAUMEDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorUSANDAUMEDash");
                        }
                    });
                });
            });
        });


    }


    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
            Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {

                console.log(BCAttachmentResponse);
                fileCounter++;
                if (fileCounter < $scope.BcAttachFileNew.length) {
                    $scope.UploadAttachment(IntiateID)
                } else {
                    deferred.resolve(null);
                }
            });

        } else {
            deferred.resolve(null);
        }
        return deferred.promise;
    }


    $scope.onValidatorCancel = function () {
        $location.path("/ValidatorUSANDAUMEDash");

    }

    $scope.onValidatorOnHold = function () {

        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }

        // $scope.ChagneBusinesscaseStage="On Hold"         
        $scope.CaseStatus = "On Hold"

        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.AndaUMECommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            AndaUMEBusinessCaseId: $scope.AndaUMEBusinessCaseColl[0].Id,
           AndaUMEBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID,
             CaseStage:$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
         VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMECommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaUMEBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
            console.log(Changeresponse1);

            var emailSubject = "Business Case Validation On Hold"
            var emailBody = "<h1>Business Case Validation On Hold </h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.ValidatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +"  The Validation has been kept On Hold for a Business Case for Strategy "+"&nbsp;"+ "<b>"
            +$scope.ValidatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

            + "<p><b>Below are the details of the Business Case: </b></p>"

            + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
            + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
            + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
            + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
            + "<p><b>Month of Initiation: </b>" + $scope.InitiationDate + "</p>"
            + "<p>Kindly check the Business Case using the below link:&nbsp;</p>"
            + "<a href="+ $scope.ValidatorDashboard+">"+"Click here"+"</a>"
            + "<p> <b> Below are the details of the Product and Comments:</b></p>"
            + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
            + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
          
            + "<p><b>Validator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.ValidatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);


            alert("Business Case Updated Successfully");
            $location.path("/ValidatorUSANDAUMEDash");
        });
    }




    $scope.onValidatorRework = function () {

        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }

        //  $scope.ChagneBusinesscaseStage="Data To Be Rework";           
        $scope.CaseStatus = "Data To Be Rework";

        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.AndaUMECommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            AndaUMEBusinessCaseId: $scope.AndaUMEBusinessCaseColl[0].Id,
           AndaUMEBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID,
             DescriptionType:"Validator Comment",
             CaseStage:$scope.AndaUMEBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
           VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMECommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaUMEBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaUMEBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            var emailSubject = "Business Case Validated and Sent for Rework"
            var emailBody = "<h1>Business Case Validated and Sent for Rework </h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +" has been Validated and Sent for Rework by the  "+"&nbsp;"+ "<b>"
            +$scope.ValidatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

            + "<p><b>Below are the details of the Business Case: </b></p>"

            + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
            + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
            + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
            + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
            + "<p><b>Month of Initiation: </b>" + $scope.InitiationDate + "</p>"
            + "<p>Kindly check the Business Case using the below link:&nbsp;</p>"
            + "<a href="+ $scope.InitiatorDashboard+">"+"Click here"+"</a>"
            + "<p> <b> Below are the details of the Product and Comments:</b></p>"
            + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
            + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
          
            + "<p><b>Validator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);




            alert("Business Case Updated Successfully");
            $location.path("/ValidatorUSANDAUMEDash");
        });
    }




});