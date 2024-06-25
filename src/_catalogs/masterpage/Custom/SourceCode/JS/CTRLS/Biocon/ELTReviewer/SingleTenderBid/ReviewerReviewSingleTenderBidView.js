// /*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
//     // $scope.routeReload = function () {
//     //     $route.reload();
//     // }
// });*/

// /*
// appOperations.controller("ReviewerOutLicensingBusinessCaseViewCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $window, $routeParams) {

//     // if($routeParams.initiationID != null && $routeParams.initiationID != undefined){
//     //     Logics.setSharingData({ID: $routeParams.initiationID});
//     // }

//     // if($routeParams.bussCaseDocID != null && $routeParams.bussCaseDocID != undefined){
//     //     $scope.bussCaseDocID = $routeParams.bussCaseDocID;
//     // }

//     if (Logics.getSharedData() == undefined) {
//         $location.path('/ReviewerLP');
//     }
//     else {
//         $scope.BcInitiateDetails = Logics.getSharedData();
//         $scope.IntiateID = $scope.BcInitiateDetails.ID;
//     }

   
//     $scope.ChangeStagebc=[];
//     //var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=Modified desc";

//     var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,OutLicensingBusinessCase&$filter=OutLicensingBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase&$top=5000&$orderby=ID asc";
   
//    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('OutLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
//    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
//     var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    
//     var strOutLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,DescriptionType,MemberType,OutLicensingBusinessCaseDoc/Id,OutLicensingBusinessCaseDoc/Title&$expand=OutLicensingBusinessCaseDoc,OutLicensingBusinessCase,Editor&$filter=OutLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title+ "'&$top=1&$orderby=Modified desc";

//             var urlColl = [strOutLicensingBusinessCaseUrl,strOutLicensingLaunchDetailsUrl,strOutLicensingSKUDetailsUrl,strBusinessCaseOLDocumentLinkUrl,strOutLicensingCommentsWorkflowHistoryUrl];

//             Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
//             // for username
// $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;

//                 if($scope.BcInitiateDetails.CaseStage =='Initiated')
//                 {
//                     var currColl={}
//                     currColl.ID="Data Input Stage";
//                     currColl.ValueText="Data Input Stage";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under Review";
//                     currColl1.ValueText="Under Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }   
//                else if($scope.BcInitiateDetails.CaseStage =='Data Input Stage')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under Review";
//                     currColl1.ValueText="Under Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }
//                 else  if($scope.BcInitiateDetails.CaseStage =='Under Validation')
//                 {
//                     var currColl={}
//                     currColl.ID="Ready for ELT Review";
//                     currColl.ValueText="Ready for ELT Review";
//                     $scope.ChangeStagebc.push(currColl);
                   
            
//                 }  
//                  else  if($scope.BcInitiateDetails.CaseStage =='Review Completed')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
                   
            
//                 }
//                 else if($scope.BcInitiateDetails.CaseStage =='Ready for ELT Review')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under ELT Review";
//                     currColl1.ValueText="Under ELT Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }

//                 console.log( $scope.ChangeStagebc)
//                 $scope.OutLicensingBusinessCaseColl = batchedData[0].d.results; 
//                 $scope.OutLicensingLaunchDetailsColl = batchedData[1].d.results; 
//                 $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results; 
//                 $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results; 
//                 $scope.OutLicensingCommentsWorkflowHistoryColl = batchedData[4].d.results; 
            
//                 $scope.isLoading = false;

//                 if ($scope.OutLicensingBusinessCaseColl.length>0 || $scope.OutLicensingLaunchDetailsColl.length>0 ||$scope.OutLicensingSKUDetailsColl.length>0 ||$scope.BusinessCaseOLDocumentLinkColl.length>=0) {

//                     $scope.Businesscasename = $scope.OutLicensingBusinessCaseColl[0].BusinessCaseName;
//                     $scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].ID;
//                     //$scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].BusinessCaseID;
//                     $scope.InitiationDate=new Date($scope.OutLicensingBusinessCaseColl[0].InitiationDate);                
//                     $scope.ddlProductCategory =$scope.OutLicensingBusinessCaseColl[0].ProductCategory.Title;
//                     $scope.ddlProductName =$scope.OutLicensingBusinessCaseColl[0].ProductName.Title;
//                     $scope.ddlStrategy=$scope.OutLicensingBusinessCaseColl[0].Strategy.Title;
//                     $scope.ddlSubStrategy=$scope.OutLicensingBusinessCaseColl[0].SubStrategy.Title;
//                     $scope.CaseStatus=$scope.OutLicensingBusinessCaseColl[0].CaseStatus;
//                     $scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].Title;  
//                     if($scope.OutLicensingCommentsWorkflowHistoryColl.length>0)
           
// 						{
// 						 $scope.InitiatorComments1= $scope.OutLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
// 						 }

//                     $scope.Editor= $scope.OutLicensingBusinessCaseColl[0].Editor.Title;
//                     // $scope.ddlmarket=$scope.OutLicensingLaunchDetailsColl[0].Market.Title;
//                     // $scope.ddlsubmarket=$scope.OutLicensingLaunchDetailsColl[0].SubMarket.Title;
//                     // $scope.ddlCountry=$scope.OutLicensingLaunchDetailsColl[0].Country.Title;
//                     // $scope.loedate= new Date($scope.OutLicensingLaunchDetailsColl[0].LOEDate);
//                     // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
//                     // $scope.launchdate= new Date($scope.OutLicensingLaunchDetailsColl[0].LaunchDate);
//                     // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
//                     // $scope.partner=$scope.OutLicensingLaunchDetailsColl[0].Partner.Title;
//                     // $scope.partnerdetails=$scope.OutLicensingLaunchDetailsColl[0].PartnerDetails;
//                     // $scope.currency=$scope.OutLicensingLaunchDetailsColl[0].Currency;
//                     // $scope.currentstatus=$scope.OutLicensingLaunchDetailsColl[0].CurrentStatus;  
//                     $scope.Modified = new Date($scope.OutLicensingBusinessCaseColl[0].Modified);
                   
//                     if($scope.OutLicensingBusinessCaseColl[0].CaseStage!='undefined' && $scope.OutLicensingBusinessCaseColl[0].CaseStage!='' && $scope.OutLicensingBusinessCaseColl[0].CaseStage!=null)
                    
//                     {
//                         $scope.CaseStage = $scope.OutLicensingBusinessCaseColl[0].CaseStage.Title;

//                     }

//                     if( $scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length>0){

//                         $scope.DosageForm="";
//                     for(var p=0;p<$scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length;p++){
                       
                       
//                         $scope.DosageForm+=$scope.OutLicensingBusinessCaseColl[0].DosageForm.results[p].Title+',';
                        

//                     }
//                     $scope.dosage1=$scope.DosageForm.slice(0, -1);
                    
                  

//                    }
                    
                    

//                     if($scope.BusinessCaseOLDocumentLinkColl.length>0){
//                         $scope.MajorV= Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion);
//                         $scope.MinorV= parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion).toFixed(1);
//                         if( $scope.MajorV==$scope.MinorV){
//                             $scope.VersionFlag="Major Version";
            
//                         }
//                         else{
//                             $scope.VersionFlag="Minor Version";
//                         }
//                     }
        
//                     if ($scope.BusinessCaseOLDocumentLinkColl.length > 0) {
//                         for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkColl.length; s++) {
//                             $scope.BusinessCaseOLDocumentLinkColl[s].DocID = $scope.BusinessCaseOLDocumentLinkColl[s].ID;
//                             $scope.BusinessCaseOLDocumentLinkColl[s].Fname = $scope.BusinessCaseOLDocumentLinkColl[s].File.Name;
//                             $scope.BusinessCaseOLDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl;
        
//                         }
//                     } else {
//                         $scope.BusinessCaseOLDocumentLinkColl = "";
//                     }        
                    
//                  }

//                  for(var i=0;i<$scope.OutLicensingLaunchDetailsColl.length;i++)
//                  {
//                     $scope.OutLicensingLaunchDetailsColl[i].LicenseSKUDetails =  $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {

//                             return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
//                     });

//                  }

//                 });
           


//             var fileCounter = 0;

//             $scope.onInitiationSubmit = function () {

//                 //$scope.ChagneBusinesscaseStage=$('#ChagneBusinesscaseStage').val();           

//                 if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
//                     alert("Please Select Stage ")
//                     return false;
//                 }
               
//                 if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
//                     alert("Please Enter Initiator Comments ")
//                     return false;
//                 }
             

//             var addCommentBusinessCaseRequest = {
//                 __metadata: {
//                     type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
//                 },
//                 CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
//             }

//             Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
//                 console.log(response);
//             });

//                 var BcChangeStage = {
        
//                     __metadata: {
//                         type: "SP.Data.OutLicensingBusinessCaseListItem"
//                     },
                   
//                     CaseStage: $scope.ChagneBusinesscaseStage
        
//                 }
        
//                  var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
//                  Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
                 
//                     console.log(Changeresponse1);
//                     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsb";
//                     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
//                     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
//                         console.log(response);
        
//                         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
        
//                         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
//                             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;
        
//                             var BcVersion = {
//                                 __metadata: {
//                                     type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
//                                 },
//                                 CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)
//                             };
        
//                             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";
        
//                             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
//                                 console.log(Vresponse);
//                                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
        
//                                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
//                                         alert("Business Case Updated Successfully");
//                                         $location.path("/ReviewerLP");
        
//                                     });
//                                 } else {
//                                     alert("Business Case Updated Successfully");
//                                     $location.path("/ReviewerLP");
//                                 }
//                             });
//                         });
//                     });
        
//                  });     

        
//             }
        
        
//             $scope.onCreateVersion = function () {
//              $scope.ChagneBusinesscaseStage=$('#ChagneBusinesscaseStage').val();           

           
//                 if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined) {
//                     alert("Please Select Stage ")
//                     return false;
//                 }
               
//                 if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
//                     alert("Please Enter Initiator Comments ")
//                     return false;
//                 }
             
        
//                 var addCommentBusinessCaseRequest = {
//                     __metadata: {
//                         type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
//                     },
//                     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
//                 }
    
//                 Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
//                     console.log(response);
//                 });
    
//                     var BcChangeStage = {
            
//                         __metadata: {
//                             type: "SP.Data.OutLicensingBusinessCaseListItem"
//                         },
                       
//                         CaseStage: $scope.ChagneBusinesscaseStage
            
//                     }
            
//                      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
//                      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    
//                         console.log(Changeresponse1); 

//                 var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
//                 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
//                 Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
//                     console.log(response);
    
//                     var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
    
//                     Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
//                         var newBusinessCaseDocID = docResponse.data.d.results[0].Id;
    
//                         var BcVersion = {
//                             __metadata: {
//                                 type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
//                             },
//                             CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
//                         };
    
//                         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";
    
//                         Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
//                             console.log(Vresponse);
//                             if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
    
//                                 $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
//                                     alert("Business Case Updated Successfully");
//                                     $location.path("/ReviewerLP");
    
//                                 });
//                             } else {
//                                 alert("Business Case Updated Successfully");
//                                 $location.path("/ReviewerLP");
//                             }
//                         });
//                     });
//                 });
//             });
    
        
//             }
        
//             var deferred = $q.defer();
//             $scope.UploadAttachment = function (IntiateID) {
//                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
//                     var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
//                     Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {
        
//                         console.log(BCAttachmentResponse);
//                         fileCounter++;
//                         if (fileCounter < $scope.BcAttachFileNew.length) {
//                             $scope.UploadAttachment(IntiateID)
//                         } else {
//                             deferred.resolve(null);
//                         }
//                     });
        
//                 } else {
//                     deferred.resolve(null);
//                 }
//                 return deferred.promise;
//             }
        
        
//             $scope.onInitiationCancel = function () {
//                 $location.path("/ReviewerLP");
            
        
//             }

   
        
//         });
        
//         */


// /*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
//     // $scope.routeReload = function () {
//     //     $route.reload();
//     // }
// });*/
// appOperations.controller("ReviewerOutLicensingBusinessCaseViewCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $window, $routeParams) {

//     // if($routeParams.initiationID != null && $routeParams.initiationID != undefined){
//     //     Logics.setSharingData({ID: $routeParams.initiationID});
//     // }

//     // if($routeParams.bussCaseDocID != null && $routeParams.bussCaseDocID != undefined){
//     //     $scope.bussCaseDocID = $routeParams.bussCaseDocID;
//     // }

//     if (Logics.getSharedData() == undefined) {
//         $location.path('/ReviewerLP');
//     }
//     else {
//         $scope.BcInitiateDetails = Logics.getSharedData();
//         $scope.IntiateID = $scope.BcInitiateDetails.ID;
//     }

//     $scope.ChangeStagebc=[];
//    // var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseName,CaseStatus,InitiationDate,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,SubStrategy,ProductCategory,ProductName,CaseStage,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//    var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=Modified desc";
 
//    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,OutLicensingBusinessCase&$filter=OutLicensingBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
//     var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,SkuUnit/Id,SkuUnit/Title,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase,SkuUnit&$top=5000&$orderby=ID asc";
   
//    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('OutLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
//    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
//     var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseVersion,LapVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    
//     var strOutLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,DescriptionType,MemberType,OutLicensingBusinessCaseDoc/Id,OutLicensingBusinessCaseDoc/Title&$expand=OutLicensingBusinessCaseDoc,OutLicensingBusinessCase,Editor&$filter=OutLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title+ "'&$top=1&$orderby=Modified desc";


//             var urlColl = [strOutLicensingBusinessCaseUrl,strOutLicensingLaunchDetailsUrl,strOutLicensingSKUDetailsUrl,strBusinessCaseOLDocumentLinkUrl,strOutLicensingCommentsWorkflowHistoryUrl];

//             Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
//             // for username
// 			$scope.CurrLogUserId=_spPageContextInfo.userDisplayName;
//                 if($scope.BcInitiateDetails.CaseStage =='Initiated')
//                 {
//                     var currColl={}
//                     currColl.ID="Data Input Stage";
//                     currColl.ValueText="Data Input Stage";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under Review";
//                     currColl1.ValueText="Under Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }   
//                else if($scope.BcInitiateDetails.CaseStage =='Data Input Stage')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under Review";
//                     currColl1.ValueText="Under Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }
//                 else  if($scope.BcInitiateDetails.CaseStage =='Under Validation')
//                 {
//                     var currColl={}
//                     currColl.ID="Ready for ELT Review";
//                     currColl.ValueText="Ready for ELT Review";
//                     $scope.ChangeStagebc.push(currColl);
                   
            
//                 }  
//                  else  if($scope.BcInitiateDetails.CaseStage =='Review Completed')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
                   
            
//                 }
//                 else if($scope.BcInitiateDetails.CaseStage =='Ready for ELT Review')
//                 {
//                     var currColl={}
//                     currColl.ID="Under Validation";
//                     currColl.ValueText="Under Validation";
//                     $scope.ChangeStagebc.push(currColl);
//                     var currColl1={}
//                     currColl1.ID="Under ELT Review";
//                     currColl1.ValueText="Under ELT Review";
//                     $scope.ChangeStagebc.push(currColl1);
            
//                 }

//                 console.log( $scope.ChangeStagebc)
//                 $scope.OutLicensingBusinessCaseColl = batchedData[0].d.results; 
//                 $scope.OutLicensingLaunchDetailsColl = batchedData[1].d.results; 
//                 $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results; 
//                 $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results; 
//                 $scope.OutLicensingCommentsWorkflowHistoryColl = batchedData[4].d.results;
            
//                 $scope.isLoading = false;

//                 if ($scope.OutLicensingBusinessCaseColl.length>0 || $scope.OutLicensingLaunchDetailsColl.length>0 ||$scope.OutLicensingSKUDetailsColl.length>0 ||$scope.BusinessCaseOLDocumentLinkColl.length>=0) {

//                     $scope.Businesscasename = $scope.OutLicensingBusinessCaseColl[0].BusinessCaseName;
//                     $scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].Title;
//                     //$scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].BusinessCaseID;
//                     $scope.InitiationDate=new Date($scope.OutLicensingBusinessCaseColl[0].InitiationDate);                
//                     $scope.ddlProductCategory =$scope.OutLicensingBusinessCaseColl[0].ProductCategory.Title;
//                     $scope.ddlProductName =$scope.OutLicensingBusinessCaseColl[0].ProductName.Title;
//                     $scope.ddlStrategy=$scope.OutLicensingBusinessCaseColl[0].Strategy.Title;
//                     $scope.ddlSubStrategy=$scope.OutLicensingBusinessCaseColl[0].SubStrategy.Title;
//                     $scope.CaseStatus=$scope.OutLicensingBusinessCaseColl[0].CaseStatus;
//                    if($scope.OutLicensingCommentsWorkflowHistoryColl.length>0)
           
// 						{
// 						 $scope.InitiatorComments1= $scope.OutLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
// 						 }
		



//                 //  if($scope.OutLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory.results.length>0) {
//                 //     $scope.InitiatorComments1= $scope.OutLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;

//                 //  }
                   
//                     $scope.Editor= $scope.OutLicensingBusinessCaseColl[0].Editor.Title;
//                     $scope.SkuUnit=  $scope.OutLicensingSKUDetailsColl[0].Unit;


//                     // $scope.ddlmarket=$scope.OutLicensingLaunchDetailsColl[0].Market.Title;
//                     // $scope.ddlsubmarket=$scope.OutLicensingLaunchDetailsColl[0].SubMarket.Title;
//                     // $scope.ddlCountry=$scope.OutLicensingLaunchDetailsColl[0].Country.Title;
//                     // $scope.loedate= new Date($scope.OutLicensingLaunchDetailsColl[0].LOEDate);
//                     // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
//                     // $scope.launchdate= new Date($scope.OutLicensingLaunchDetailsColl[0].LaunchDate);
//                     // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
//                     // $scope.partner=$scope.OutLicensingLaunchDetailsColl[0].Partner.Title;
//                     // $scope.partnerdetails=$scope.OutLicensingLaunchDetailsColl[0].PartnerDetails;
//                     // $scope.currency=$scope.OutLicensingLaunchDetailsColl[0].Currency;
//                     // $scope.currentstatus=$scope.OutLicensingLaunchDetailsColl[0].CurrentStatus;  
//                     $scope.Modified = new Date($scope.OutLicensingBusinessCaseColl[0].Modified);
//                     $scope.CurrentStatus = $scope.OutLicensingBusinessCaseColl[0].CurrentStatus;

//                     if( $scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length>0){

//                         $scope.DosageForm="";
//                             for(var p=0;p<$scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length;p++){
                            
                            
//                                 $scope.DosageForm+=$scope.OutLicensingBusinessCaseColl[0].DosageForm.results[p].Title+',';                                

//                             }
//                             $scope.dosage1=$scope.DosageForm.slice(0, -1);                        
                  

//                    }
                    


                   
//                     if($scope.OutLicensingBusinessCaseColl[0].CaseStage!='undefined' && $scope.OutLicensingBusinessCaseColl[0].CaseStage!='' && $scope.OutLicensingBusinessCaseColl[0].CaseStage!=null)
                    
//                     {
//                         $scope.CaseStage = $scope.OutLicensingBusinessCaseColl[0].CaseStage.Title;

//                     }
                    

//                     if($scope.BusinessCaseOLDocumentLinkColl.length>0){
//                         $scope.MajorV= Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion);
//                         $scope.LapVersion = $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion;
//                         $scope.MinorV= parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion).toFixed(1);
//                         if( $scope.MajorV==$scope.MinorV){
//                             $scope.VersionFlag="Major Version";
            
//                         }
//                         else{
//                             $scope.VersionFlag="Minor Version";
//                         }
//                     }
        
//                     if ($scope.BusinessCaseOLDocumentLinkColl.length > 0) {
//                         for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkColl.length; s++) {
//                             $scope.BusinessCaseOLDocumentLinkColl[s].DocID = $scope.BusinessCaseOLDocumentLinkColl[s].ID;
//                             $scope.BusinessCaseOLDocumentLinkColl[s].Fname = $scope.BusinessCaseOLDocumentLinkColl[s].File.Name;
//                             $scope.BusinessCaseOLDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl;
        
//                         }
//                     } else {
//                         $scope.BusinessCaseOLDocumentLinkColl = "";
//                     }        
                    
//                  }

//                  for(var i=0;i<$scope.OutLicensingLaunchDetailsColl.length;i++)
//                  {
//                     $scope.OutLicensingLaunchDetailsColl[i].LicenseSKUDetails =  $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {

//                             return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
//                     });

//                  }

//                 });
           
//  $scope.openDocVersionHistory = function(filedata){
// 			        Logics.openDocumentVersionHistory(filedata);
// 			    }


//             var fileCounter = 0;

//             $scope.onInitiationSubmit = function () {

//                 $scope.ChagneBusinesscaseStage=$('#ChagneBusinesscaseStage').val();           

//                 if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
//                     alert("Please Select Stage ")
//                     return false;
//                 }
               
//                 if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
//                     alert("Please Enter Initiator Comments ")
//                     return false;
//                 }
             

//             var addCommentBusinessCaseRequest = {
//                 __metadata: {
//                     type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
//                 },
//                 CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
//             }

//             Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
//                 console.log(response);
//             });

//                 var BcChangeStage = {
        
//                     __metadata: {
//                         type: "SP.Data.OutLicensingBusinessCaseListItem"
//                     },
                   
//                     CaseStage: $scope.ChagneBusinesscaseStage
        
//                 }
        
//                  var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
//                  Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
                 
//                     console.log(Changeresponse1);
//                     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsb";
//                     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
//                     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
//                         console.log(response);
        
//                         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
        
//                         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
//                             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;
        
//                             var BcVersion = {
//                                 __metadata: {
//                                     type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
//                                 },
//                                 CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)
//                             };
        
//                             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";
        
//                             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
//                                 console.log(Vresponse);
//                                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
        
//                                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
//                                         alert("Business Case Updated Successfully");
//                                         $location.path("/ReviewerLP");
        
//                                     });
//                                 } else {
//                                     alert("Business Case Updated Successfully");
//                                     $location.path("/ReviewerLP");
//                                 }
//                             });
//                         });
//                     });
        
//                  });     

        
//             }
        
        
//             $scope.onCreateVersion = function () {
//              $scope.ChagneBusinesscaseStage=$('#ChagneBusinesscaseStage').val();           

           
//                 if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined) {
//                     alert("Please Select Stage ")
//                     return false;
//                 }
               
//                 if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
//                     alert("Please Enter Initiator Comments ")
//                     return false;
//                 }
             
        
//                 var addCommentBusinessCaseRequest = {
//                     __metadata: {
//                         type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
//                     },
//                     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
//                 }
    
//                 Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
//                     console.log(response);
//                 });
    
//                     var BcChangeStage = {
            
//                         __metadata: {
//                             type: "SP.Data.OutLicensingBusinessCaseListItem"
//                         },
                       
//                         CaseStage: $scope.ChagneBusinesscaseStage
            
//                     }
            
//                      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
//                      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    
//                         console.log(Changeresponse1); 

//                 var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
//                 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
//                 Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
//                     console.log(response);
    
//                     var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
    
//                     Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
//                         var newBusinessCaseDocID = docResponse.data.d.results[0].Id;
    
//                         var BcVersion = {
//                             __metadata: {
//                                 type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
//                             },
//                             CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
//                         };
    
//                         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";
    
//                         Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
//                             console.log(Vresponse);
//                             if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
    
//                                 $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
//                                     alert("Business Case Updated Successfully");
//                                     $location.path("/ReviewerLP");
    
//                                 });
//                             } else {
//                                 alert("Business Case Updated Successfully");
//                                 $location.path("/ReviewerLP");
//                             }
//                         });
//                     });
//                 });
//             });
    
        
//             }
        
//             var deferred = $q.defer();
//             $scope.UploadAttachment = function (IntiateID) {
//                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
//                     var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
//                     Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {
        
//                         console.log(BCAttachmentResponse);
//                         fileCounter++;
//                         if (fileCounter < $scope.BcAttachFileNew.length) {
//                             $scope.UploadAttachment(IntiateID)
//                         } else {
//                             deferred.resolve(null);
//                         }
//                     });
        
//                 } else {
//                     deferred.resolve(null);
//                 }
//                 return deferred.promise;
//             }
        
        
//             $scope.onInitiationCancel = function () {
//                 $location.path("/ReviewerLP");
        
//             }

   
        
//         });




appOperations.controller("ReviewSingleTenderViewCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $window, $routeParams) {

    // if (Logics.getSharedData() == undefined) {
    //     $location.path('/ReviewerLP');
    // } else {
    //     $scope.BcInitiateDetails = Logics.getSharedData();
    //     $scope.IntiateID = $scope.BcInitiateDetails.ID;
    // }

    // if ($routeParams.initiationID != null && $routeParams.initiationID != undefined) {
    //     Logics.setSharingData({ ID: $routeParams.initiationID });
    // }

    // if ($routeParams.bussCaseDocID != null && $routeParams.bussCaseDocID != undefined) {
    //     $scope.bussCaseDocID = $routeParams.bussCaseDocID;
    // }

    // if (Logics.getSharedData() == undefined) {
    //     $location.path('/ReviewerOLDash');
    // }
    // else {
    //     $scope.BcInitiateDetails = Logics.getSharedData();
    //     $scope.IntiateID = $scope.BcInitiateDetails.ID;
    // }


    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerSingDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    var strSingleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
  //  var strSingleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,SingleBidBusinessCase&$filter=SingleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strSingleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?&$select=Id,Title,Modified,BidAuthority/Id,BidAuthority/Title,BidDueDate,SupplyStartDate,SupplyEndDate,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=Market,BidAuthority,SubMarket,Currency,CurrentStatus,Country,Partner,SingleBidBusinessCase&$filter=SingleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strSingleBidSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,SingleBidLaunchDetail/Id,SingleBidLaunchDetail/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=SingleBidLaunchDetail,SkuUnit,PackingType,SingleBidBusinessCase&$top=5000&$orderby=ID asc";

    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,SingleBidBusinessCaseId,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strSingleBidCommentsWFHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,DescriptionType,SingleBidBusinessCaseDoc/Id,SingleBidBusinessCaseDoc/Title&$expand=SingleBidBusinessCaseDoc,SingleBidBusinessCase,Editor&$filter=SingleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strSingleBidDocumentLinkWFUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=*,EncodedAbsUrl,Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,SingleBidBusinessCaseId,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strSingleBidCommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,DescriptionType,SingleBidBusinessCaseDoc/Id,SingleBidBusinessCaseDoc/Title&$expand=SingleBidBusinessCaseDoc,SingleBidBusinessCase,Editor&$filter=SingleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strSingleBidSupportingDocURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,SingleBidBusinessCase,File&$filter=SingleBidBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
  
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading


    var urlColl = [strSingleBidUrl, strSingleBidLaunchDetailsUrl, strSingleBidSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strSingleBidCommentsWFHistoryUrl, strSingleBidDocumentLinkWFUrl, strSingleBidCommentsWFHistoryUrl2, strSingleBidSupportingDocURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) 
    {

        $scope.SingleBidColl = batchedData[0].d.results;
        $scope.SingleBidLaunchColl = batchedData[1].d.results;
        $scope.SingleBidSKUDetailsColl = batchedData[2].d.results;
        $scope.SingleBidDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.SingleBidCommentsWFHistoryColl = batchedData[6].d.results;
        $scope.SingleBidDocLinkUrlWorkFlowColl = batchedData[7].d.results;
        $scope.SingleBidCommentsWFHistoryColl2 = batchedData[8].d.results;
        $scope.OutLicensingSupportingDocColl = batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        // for product code
        $scope.ProductMasterColl= batchedData[13].d.results;


        $scope.isLoading = false;
        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        if ($scope.SingleBidColl.length > 0 || $scope.SingleBidLaunchColl.length > 0 || $scope.SingleBidSKUDetailsColl.length > 0 || $scope.SingleBidDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.SingleBidColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.SingleBidColl[0].Title;
            //$scope.Businesscaseid=$scope.SingleBidColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.SingleBidColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.SingleBidColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.SingleBidColl[0].ProductName.Title;

// arvind product code---
            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
/// 
            $scope.ddlStrategy = $scope.SingleBidColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.SingleBidColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.SingleBidColl[0].CaseStatus;
            $scope.CurrentStatus = $scope.SingleBidLaunchColl[0].CurrentStatus.Title;

            $scope.BusinessCaseDescription = $scope.SingleBidColl[0].BusinessCaseDescription;




/// file lock code if anywhere the Excel file opened

if ($scope.SingleBidDocumentLinkColl.length > 0) {
    if ($scope.bussCaseDocID != undefined && $scope.bussCaseDocID != null) {
        var docOLBussinessLink = $filter('filter')($scope.SingleBidDocumentLinkColl, function(value){
            return value.Id == $scope.bussCaseDocID;
        });
        var excelWindow = $window.open("ms-excel:ofe|u|" + _spPageContextInfo.portalUrl + docOLBussinessLink[0].File.ServerRelativeUrl, "OpenExcel");
    }
    setTimeout(function () {
        excelWindow.close();
    }, 5000);
}

            // Email group
            $scope.InitiatorsGroupsName = [];
            $scope.ReviewersGroupsName = [];
            $scope.ValidatorsGroupsName = [];

            for (let m = 0; m < $scope.SingleBidColl[0].Initiators.results.length; m++) {
                $scope.InitiatorsGroupsName.push($scope.SingleBidColl[0].Initiators.results[m].Title);
            }
            for (let m = 0; m < $scope.SingleBidColl[0].Reviewers.results.length; m++) {
                $scope.ReviewersGroupsName.push($scope.SingleBidColl[0].Reviewers.results[m].Title);
            }
            for (let m = 0; m < $scope.SingleBidColl[0].Validators.results.length; m++) {
                $scope.ValidatorsGroupsName.push($scope.SingleBidColl[0].Validators.results[m].Title);
            }

            if ($scope.SingleBidCommentsWFHistoryColl.length > 0) {
                $scope.InitiatorComments1 = $scope.SingleBidCommentsWFHistoryColl[0].CommentsWorkflowHistory;
            }
            $scope.Editor = $scope.SingleBidColl[0].Editor.Title;
            $scope.Modified = new Date($scope.SingleBidColl[0].Modified);
            if ($scope.SingleBidColl[0].CaseStage != 'undefined' && $scope.SingleBidColl[0].CaseStage != '' && $scope.SingleBidColl[0].CaseStage != null) {
                $scope.CaseStage = $scope.SingleBidColl[0].CaseStage.Title;

            }

            if ($scope.SingleBidColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.SingleBidColl[0].DosageForm.results.length; p++) {

                    $scope.DosageForm += $scope.SingleBidColl[0].DosageForm.results[p].Title + ',';
                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);
            }
            if ($scope.SingleBidDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.SingleBidDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.SingleBidDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.SingleBidDocumentLinkColl[0].LapVersion == undefined || $scope.SingleBidDocumentLinkColl[0].LapVersion == "" || $scope.SingleBidDocumentLinkColl[0].LapVersion == null) {
                $scope.counter = 0;
                $scope.counter = parseInt($scope.counter);
                //$scope.LapV = "V" +"-" + $scope.counter;// 		
                $scope.LapV = "V" + $scope.counter;// 		

            }

            if ($scope.SingleBidDocLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.SingleBidDocLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.SingleBidDocLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.SingleBidDocLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.SingleBidCommentsWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.OutLicensingSupportingDocColl, function (item) {
                        return (item.SingleBidBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
                    });

                    $scope.MemberType = "Initiator";

                    $scope.FileArry = [];
                    if (docFilteredData.length > 0) {
                        for (var c = 0; c < docFilteredData.length; c++) {
                            var col = {};
                            col.FinalAttachData = docFilteredData[c].File.Name;
                            col.FinalCaseStage = docFilteredData[c].CaseStage.Title;
                            col.Comment = $scope.CommentsWorkflowHistory
                            col.MemberType = $scope.MemberType


                           // col.FinalAttachDataRel = docFilteredData[c].File.ServerRelativeUrl; // its open in 

                            col.FinalAttachDataRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + docFilteredData[c].File.ServerRelativeUrl;

                            $scope.FileArry.push(col);

                        }
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                  
                    if (lapvrsion == 'null' || casestg == 'undefined') {
                        lapvrsion = 'V0';
                        casestg = 'Initiated';
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                    }
             

                    if (FilteredData.length > 0) {

                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
                    }

                    else {
                        $scope.SingleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + casestg + ";" + "  Version Type - " + vrsionType;
                    }

                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].DocID = $scope.SingleBidDocLinkUrlWorkFlowColl[s].ID;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].LapVersion = $scope.SingleBidDocLinkUrlWorkFlowColl[s].LapVersion;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseVersion = parseFloat($scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseStage = $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseStage;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].VersionType = $scope.SingleBidDocLinkUrlWorkFlowColl[s].VersionType;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Fname = $scope.SingleBidDocLinkUrlWorkFlowColl[s].File.Name;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Author = $scope.SingleBidDocLinkUrlWorkFlowColl[s].Author.Title;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseStage = $scope.SingleBidDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Created = $scope.SingleBidDocLinkUrlWorkFlowColl[s].Created;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Editor = $scope.SingleBidDocLinkUrlWorkFlowColl[s].Editor.Title;


                    var inputDate = $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified;
                    // Convert input date string to Date object
                    var dateObject = new Date(inputDate);
                    
                    // Format the date using the date filter
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');
                    
                    
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified= $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified;
                    
        
        
        


                  ///  $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified = $scope.SingleBidDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.SingleBidDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.SingleBidDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.SingleBidDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.SingleBidDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.SingleBidDocLinkUrlWorkFlowColl = "";
            }

            if ($scope.SingleBidDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.SingleBidDocumentLinkColl.length; s++) {
                    $scope.SingleBidDocumentLinkColl[s].DocID = $scope.SingleBidDocumentLinkColl[s].ID;
                    $scope.SingleBidDocumentLinkColl[s].Fname = $scope.SingleBidDocumentLinkColl[s].File.Name;
                  //  $scope.SingleBidDocumentLinkColl[s].ServRel = location.origin + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl;
                  $scope.SingleBidDocumentLinkColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.SingleBidDocumentLinkColl[s].File.ServerRelativeUrl;
 
                  var fname= $scope.SingleBidDocumentLinkColl[s].Fname;
                  // $scope.CheckExcelFileOpenOrNot(fname);

                }
            } else {
                $scope.SingleBidDocumentLinkColl = "";
            }
        }
        for (var i = 0; i < $scope.SingleBidLaunchColl.length; i++) {
            $scope.SingleBidLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.SingleBidSKUDetailsColl, function (responseLine) {

                return responseLine.SingleBidLaunchDetail.Id == $scope.SingleBidLaunchColl[i].Id;
            });
        }
 
    });

    $scope.CheckExcelFileOpenOrNot=function (param) 
    {  
        var fname=  $scope.SingleBidDocumentLinkColl[0].File.Name;
        var serrel=$scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl;
        finalserrel = serrel.substr(serrel.lastIndexOf('/') + 1)
        var test=serrel.replace( new RegExp(finalserrel), '' );
        var strstrFileopenUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + test + "')/Files('" + fname + "')/LockedByUser";


      var urlColl = [strstrFileopenUrl];
      https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplDev/BusinessCaseAutomation/SingleBidBusinessCaseDocuments')/Files('5_OLCPRS_ATRVS_Aug%20-%202023-csCsd-V6.0.xlsx')/LockedByUser
   // https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplUAT/BusinessCaseAutomation/SingleBidBusinessCaseDocuments')/Files('3_OLCPRS_AXTNB_Aug%20-%202023-bo-V2.0.xlsx')/LockedByUser
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        $scope.a = batchedData.length;
        if(batchedData[0].d.LockedByUser==undefined)
        {
          alert(" open")
        }
       else if(batchedData[0].d.LockedByUser==null)
        {
          alert("not open")
        }
       
        else
        {
            alert("alredy open")
        }
    });

    }

    $scope.onChangeStage = function (stgId) {

        $scope.filteredStageColl = $filter('filter')($scope.ChangeCaseStageColl, function (itemId) {
            return itemId.Id == stgId;
        });
        $scope.filteredStageCollNew = $filter('filter')($scope.CaseStageColl, function (itemId) {
            return itemId.Title == $scope.filteredStageColl[0].Title;
        });
        $scope.chngStgIntId = $scope.filteredStageCollNew[0].Id;
        $scope.chngStgIntTitle = $scope.filteredStageCollNew[0].Title;


        if ($scope.filteredStageColl[0].Title.length > 0) {

            $scope.ChagneBusinesscaseStage = $scope.filteredStageColl[0].Title

            if ($scope.filteredStageColl[0].Title == "Minor Changes") {
                $scope.Showbtn = true;
            } else {
                $scope.Showbtn = false;
            }
        }
    }

    $scope.openDocVersionHistory = function (filedata) {
        Logics.openDocumentVersionHistory(filedata);
    }

    var fileCounter = 0;

    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerSingDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerOLDash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorOLDash";


    $scope.onInitiationSubmit = function () {
        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
            return false;
        }
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var regex = /^[^*|\"<>{}`\\()';@&$]+$/;
            var isValid = regex.test($scope.BcAttachFileNew[0].name);
            if (!isValid) {
                alert("Attach Supporting documents should not contains special characters.");
                return false;
            }
        }
        if ($scope.filteredStageColl[0].Title == "Data Input Stage") {
            $scope.CaseStatus = "Data Input Stage"   
            
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }
            

            var emailSubject = "Business Case Data Input Submission"
            var emailBody = "<h1>Business Case Data Input Submission</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> Data Input has been done for a Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"+"and submitted by the"+"&nbsp;"+ "<b>"+$scope.InitiatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

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
           
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

        }
        if ($scope.filteredStageColl[0].Title == "Under Internal Review") {
            $scope.CaseStatus = "Under Internal Review"
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }

            var emailSubject = "Business Case Internal Review Submission"
            var emailBody = "<h1>Business Case Internal Review Submission</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.ReviewersGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +" has been sent for Review by the"+"&nbsp;"+ "<b>"+$scope.InitiatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

            + "<p><b>Below are the details of the Business Case: </b></p>"

            + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
            + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
            + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
            + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
            + "<p><b>Month of Initiation: </b>" + $scope.InitiationDate + "</p>"
            + "<p>Kindly check the Business Case using the below link:&nbsp;</p>"
            + "<a href="+ $scope.ReviewerDashboard+">"+"Click here"+"</a>"
            + "<p> <b> Below are the details of the Product and Comments:</b></p>"
            + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
            + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
            
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.ReviewersGroupsName, $scope.InitiatorsGroupsName, emailSubject, emailBody);

        }
        if ($scope.filteredStageColl[0].Title == "Under Validation") {
            $scope.CaseStatus = "Sent For Validation"
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }
          
            var emailSubject = "Business Case Under Validation"
            var emailBody = "<h1>Business Case Under Validation</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.ValidatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +" and has been sent for validation by the"+"&nbsp;"+ "<b>"+$scope.InitiatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

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
            
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.ValidatorsGroupsName, $scope.InitiatorsGroupsName, emailSubject, emailBody);



        }
        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes"

            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }

        }

        if ($scope.filteredStageColl[0].Title == "Under ELT Review") {
            $scope.CaseStatus = "Under ELT Review"
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }
            var emailSubject = "Business Case Under ELT Review "
            var emailBody = "<h1>Business Case Under ELT Review </h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"
            +"&nbsp;"+"is retained Under ELT Review by the"+"&nbsp;"+ "<b>"+$scope.InitiatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

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
            
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

          

        }

        if ($scope.filteredStageColl[0].Title == "Ready for ELT Review") {
            // alert('Please lock the final business case version for ELT review')
            $scope.CaseStatus = "Ready for ELT Review"
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }
            var emailSubject = "Business Case Ready for ELT Review "
            var emailBody = "<h1>Business Case Ready for ELT Review </h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"
            +"&nbsp;"+"is validated and made Ready for the ELT Review by the "+"&nbsp;"
            + "<b>"+$scope.InitiatorsGroupsName+"</b>"
            +"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

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
            
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

          
      


        }
       
        if ($scope.filteredStageColl[0].Title == "Business Case Published") {
            $scope.CaseStatus = "Business Case Published"

            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }
            var emailSubject = "Published"
            var emailBody = "<h1>Published</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"
            +"&nbsp;"+"is Published by the"+"&nbsp;"
            + "<b>"+$scope.InitiatorsGroupsName+"</b>"
            +"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"

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
            
            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
    + "<p><b>Thanks & Regards, </b></p>"
         
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

          

        }

        if ($scope.filteredStageColl[0].Title == "Business Case Rejected") {
            $scope.CaseStatus = "Business Case Rejected"
            if($scope.CommentsWorkflowHistory==undefined){
                $scope.CommentsWorkflowHistory="";
    
              }

        }

        //return false;

        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;
        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType: "Initiator Comments",
            VersionNo: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            SingleBidBusinessCaseId: $scope.SingleBidColl[0].Id,
            SingleBidBusinessCaseDocId: $scope.SingleBidDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });
       var BcChangeStage = {

            __metadata: {
                type: "SP.Data.SingleBidBusinessCaseListItem"
            },

            CaseStageId: $scope.chngStgIntId,
            CaseStatus: $scope.CaseStatus,
            VersionNo: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

        }
        // }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=CaseStage,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;


                    if ($scope.filteredStageColl[0].Title == "Business Case Published") {

                        var objLapVer = $scope.SingleBidDocumentLinkColl[0].LapVersion;
                        objLapVer = objLapVer.charAt(1);
                        objLapVer = parseInt(objLapVer) + 1;
                        $scope.LapV = "V" + objLapVer


                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.SingleBidBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.SingleBidDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }
                    else {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.SingleBidBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.SingleBidDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);

                        // var emailSubject = "BIOCON-Business Case: Business case has been changed " + $scope.Businesscaseid;
                        // var emailBody = "<h1>BIOCON Business Case Request</h1>"
                        //     + "<p>Below are the details:</p>"
                        //     + "<p><b>Business Case ID: </b>" + $scope.Businesscaseid + "</p>"
                        //     + "<p><b>Business Case Name: </b>" + $scope.Businesscasename + "</p>"
                        //     + "<p><b>Strategy: </b>" + $scope.ddlStrategy + "</p>"
                        //     + "<p><b>Sub Strategy: </b>" + $scope.ddlSubStrategy + "</p>"
                        //     + "<p><b>Product Category: </b>" + $scope.ddlProductCategory + "</p>"
                        //     + "<p><b>Product Name: </b>" + $scope.ddlProductName + "</p>"
                        //     + "<p>&nbsp;</p>"
                        //     + "<p>Click "
                        //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.SingleBidColl[0].Id + "/" + $scope.SingleBidDocLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                        //     + " to open business case document";

                        // Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment();
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerSingDash");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/ReviewerSingDash");
                        }
                    });


                });
            });

        });

    }

    $scope.onCreateVersion = function () {
        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
            return false;
        }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Initiator Comments ")
            return false;
        }
        var name = $scope.SingleBidDocumentLinkColl[0].File.Name;
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            SingleBidBusinessCaseId: $scope.SingleBidColl[0].Id,
            DescriptionType: "Initiator Comments",
            SingleBidBusinessCaseDocId: $scope.SingleBidDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.SingleBidBusinessCaseListItem"
                },
                CaseStatus: $scope.CaseStatus,
                VersionNo: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion + 0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,SingleBidBusinessCaseId,SingleBidBusinessCase/Title&$expand=CaseStage,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.SingleBidBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment2();

                            var emailSubject = "Business Case Minor Version Creation"
                            var emailBody = "<h1>Business Case Minor Version Creation</h1>"
                  
                            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","
                  
                            + "<p> A Minor changes have been done for a Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
                            +"  and Minor Version has been created by the"+"&nbsp;"+ "<b>"+$scope.InitiatorsGroupsName+"</b>"+"&nbsp;"+"on"+"&nbsp;"+"<b>"+$scope.InitiationDate+"</b>"+"</p"
                  
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
                            
                            + "<p><b>Initiator Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
                            + "<p></p><br>"
                    + "<p><b>Thanks & Regards, </b></p>"
                            + "<p>Biocon Limited</p>"
                            Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.InitiatorsGroupsName, emailSubject, emailBody);
                  
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerSingDash");

                            //);
                        }
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/ReviewerSingDash");
                        }
                    });


                });
            });

        });

    }
    //NEW SUPPORT ATTACHE
    $scope.UploadSupportingAttachment = function () {
        var deferred = $q.defer();
        var invFile = document.getElementById("fileAttachSupport").files.length;
        var noOfSupportingDocs = 0;

        var webUrl = _spPageContextInfo.webAbsoluteUrl;
        var documentLibrary = "SingleBidSupportingDocument";
       
        var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + documentLibrary;

        for (var i = 0; i < invFile; i++) {
            var fileName = document.getElementById("fileAttachSupport").files[i].name;
            var DocFileName = fileName;
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
            var ext = fileName.split(".");
            ext = ext[ext.length - 1].toLowerCase();
            var ext1 = "." + ext;
            fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");

            var url = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";
            Logics.uploadFile(url, document.getElementById("fileAttachSupport").files[i]).then(function (docData) {
                //update meta data
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , SingleBidBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

                    //VersionType: "Minor"
                    //  ,DocFileName:DocFileName
                };
                Logics.updateData(strInvoiceDocUrl, invoiceDocData).then(function (invoiceUpdateResponse) {
                    console.log(invoiceUpdateResponse);
                    deferred.resolve();
                })

            })
        }
        return deferred.promise;
    }
    //NEW SUPPORT ATTACHE
    $scope.UploadSupportingAttachment2 = function () {
        var deferred = $q.defer();
        var invFile = document.getElementById("fileAttachSupport").files.length;
        var noOfSupportingDocs = 0;

        var webUrl = _spPageContextInfo.webAbsoluteUrl;
        var documentLibrary = "SingleBidSupportingDocument";
        var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + documentLibrary;

        for (var i = 0; i < invFile; i++) {
            var fileName = document.getElementById("fileAttachSupport").files[i].name;
            var DocFileName = fileName;
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
            var ext = fileName.split(".");
            ext = ext[ext.length - 1].toLowerCase();
            var ext1 = "." + ext;
            fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");

            var url = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";
            Logics.uploadFile(url, document.getElementById("fileAttachSupport").files[i]).then(function (docData) {
                //update meta data
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , SingleBidBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

                    //VersionType: "Minor"
                    //  ,DocFileName:DocFileName
                };
                Logics.updateData(strInvoiceDocUrl, invoiceDocData).then(function (invoiceUpdateResponse) {
                    console.log(invoiceUpdateResponse);


                    deferred.resolve();

                    // }
                })

            })
        }
        return deferred.promise;
    }
    $scope.onInitiationCancel = function () {
        $location.path("/ReviewerSingDash");

    }

});