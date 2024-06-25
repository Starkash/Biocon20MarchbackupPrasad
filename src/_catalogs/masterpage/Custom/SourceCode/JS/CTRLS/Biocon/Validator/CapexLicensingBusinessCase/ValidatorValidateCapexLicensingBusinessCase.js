//

/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/

appOperations.controller("ValidateCapexCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ValidatorCAPEXDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    
    $scope.ChangeStagebc = [];
    var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,CapexContext/Id,CapexContext/Title,CapexContextCode/Id,CapexContextCode/Code,BusinessCaseDescription,BlockName,NumberOfProducts,BusinessCaseName,Modified,Editor/Id,Editor/Title,InitiationDate,CapexValue,CapexCurrency/Id,CapexCurrency/Title,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,ProductCategory/Id,ProductCategory/Title,VersionNo,CaseStage/Id,CaseStage/Title,CaseStatus,IsDataInputStageUpdated,Site/Id,Site/Title&$expand=Strategy,CapexContextCode,CapexContext,CapexCurrency,SubStrategy,CaseStage,Initiators,Editor,Reviewers,Validators,ProductCategory,Site&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

   // var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,BlockName,NumberOfProducts,BusinessCaseName,Modified,Editor/Id,Editor/Title,InitiationDate,CapexValue,CapexCurrency/Id,CapexCurrency/Title,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,ProductCategory/Id,ProductCategory/Title,VersionNo,CaseStage/Id,CaseStage/Title,CaseStatus,IsDataInputStageUpdated,Site/Id,Site/Title&$expand=Strategy,CapexCurrency,SubStrategy,CaseStage,Initiators,Editor,Reviewers,Validators,ProductCategory,Site&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

   // var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=Id,Title,BusinessCaseName,Modified,Editor/Id,Editor/Title,InitiationDate,CapexValue,CapexCurrency/Id,CapexCurrency/Title,Escalation,EscalationRemarks,CapexApprovalYear,BCCompletionYear,NumberOfProducts,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,ProductCategory/Id,ProductCategory/Title,VersionNo,CaseStage/Id,CaseStage/Title,CaseStatus,IsDataInputStageUpdated,Site/Id,Site/Title&$expand=Strategy,CapexCurrency,SubStrategy,CaseStage,Initiators,Editor,Reviewers,Validators,ProductCategory,Site&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
        var strCapexPhaseDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?&$select=Id,Title,PhaseTotal,TriggerYear,CompletionYear,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCase/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase&$top=5000&$orderby=ID asc";
    
    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('CapexBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,CapexBusinessCaseId,CapexBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,CapexBusinessCase&$filter=CapexBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";
    
    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strCapexCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,CapexBusinessCase/Id,CapexBusinessCase/Title,DescriptionType,CapexBusinessCaseDoc/Id,CapexBusinessCaseDoc/Title&$expand=CapexBusinessCaseDoc,CapexBusinessCase,Editor&$filter=CapexBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";
    
    var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,CapexBusinessCaseId,CapexBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,CapexBusinessCase&$filter=CapexBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strCapexCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,CapexBusinessCase/Id,CapexBusinessCase/Title,DescriptionType,CapexBusinessCaseDoc/Id,CapexBusinessCaseDoc/Title&$expand=CapexBusinessCaseDoc,CapexBusinessCase,Editor&$filter=CapexBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";
    
    var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,CapexBusinessCase/Id,CapexBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,CapexBusinessCase/Id,File&$filter=CapexBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    
    
    var urlColl = [strCapexBusinessCaseUrl, strCapexPhaseDetailsUrl,strOutLicensingSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strCapexCommentsWorkflowHistoryUrl, strBusinessCaseOLDocumentLinkUrlWorkFlow, strCapexCommentsWorkflowHistoryUrl2, strBusinessCaseOLSupportingDocumentURL];
    
    
        
                Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
                
                    $scope.CapexBusinessCaseColl = batchedData[0].d.results; 
                    $scope.CapexPhaseDetailsColl = batchedData[1].d.results; 
                   $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results;
                    $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results;
                    $scope.CaseStageColl = batchedData[4].d.results;
                    $scope.ChangeCaseStageColl = batchedData[5].d.results;
                    $scope.CapexCommentsWorkflowHistoryColl = batchedData[6].d.results;
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = batchedData[7].d.results;
                    $scope.CapexCommentsWorkflowHistoryColl2 = batchedData[8].d.results;
                    $scope.OutLicensingSupportingDocColl = batchedData[9].d.results;
                    
                   
                    $scope.isLoading = false;
                     // for username
            $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

            
       // Email group 
        $scope.InitiatorsGroupsName = [];
        $scope.ReviewersGroupsName = [];
        $scope.ValidatorsGroupsName = [];

        for (let m = 0; m < $scope.CapexBusinessCaseColl[0].Initiators.results.length; m++) {
            $scope.InitiatorsGroupsName.push($scope.CapexBusinessCaseColl[0].Initiators.results[m].Title);
        }
        for (let m = 0; m < $scope.CapexBusinessCaseColl[0].Reviewers.results.length; m++) {
            $scope.ReviewersGroupsName.push($scope.CapexBusinessCaseColl[0].Reviewers.results[m].Title);
        }
        for (let m = 0; m < $scope.CapexBusinessCaseColl[0].Validators.results.length; m++) {
            $scope.ValidatorsGroupsName.push($scope.CapexBusinessCaseColl[0].Validators.results[m].Title);
        }


    
                    if ($scope.CapexBusinessCaseColl.length>0 || $scope.OutLicensingLaunchDetailsColl.length > 0 || $scope.OutLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseOLDocumentLinkColl.length >= 0) {
    
                        $scope.Businesscasename = $scope.CapexBusinessCaseColl[0].BusinessCaseName;
                        $scope.Id = $scope.CapexBusinessCaseColl[0].ID;
                     //   $scope.InitiationDate=new Date($scope.CapexBusinessCaseColl[0].InitiationDate);                
                      
                        $scope.InitiationDate = new Date($scope.CapexBusinessCaseColl[0].InitiationDate)
          
                        var date = new Date($scope.InitiationDate);
                        var year = date.getFullYear();
                        var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
                        $scope.InitiationDate = month + ' - ' + year;
                        $scope.Businesscaseid=$scope.CapexBusinessCaseColl[0].Title;
                        $scope.ddlStrategy=$scope.CapexBusinessCaseColl[0].Strategy.Title; 
                        $scope.ddlSubStrategy=$scope.CapexBusinessCaseColl[0].SubStrategy.Title; 
                        $scope.ddlSite=$scope.CapexBusinessCaseColl[0].Site.Title;
                      //  $scope.ddlEntity=$scope.CapexBusinessCaseColl[0].Entity.Title;
                        $scope.CapexValue=$scope.CapexBusinessCaseColl[0].CapexValue;
                        $scope.CapexCurrency=$scope.CapexBusinessCaseColl[0].CapexCurrency.Title;
                        $scope.Escalation=$scope.CapexBusinessCaseColl[0].Escalation;
                        $scope.EscalationRemarks=$scope.CapexBusinessCaseColl[0].EscalationRemarks;
                        $scope.CapexApprovalYear=new Date($scope.CapexBusinessCaseColl[0].CapexApprovalYear);
                        $scope.auditDate=new Date($scope.CapexBusinessCaseColl[0].BCCompletionYear);
                        $scope.TriggerYear=new Date($scope.CapexBusinessCaseColl[0].TriggerYear);
                        $scope.NoofProducts=$scope.CapexBusinessCaseColl[0].NumberOfProducts;
                        $scope.ddlSite=$scope.CapexBusinessCaseColl[0].Site.Title; //ddlProductCategory
                        $scope.BCCompletionYear = new Date($scope.CapexBusinessCaseColl[0].BCCompletionYear);
                        $scope.NoofProducts = $scope.CapexBusinessCaseColl[0].NoofProduct;//CapexValue
                        $scope.CapexValue = $scope.CapexBusinessCaseColl[0].CapexValue;//
                        $scope.ddlProductCategory = $scope.CapexBusinessCaseColl[0].ProductCategory.Title;
                        $scope.CaseStatus = $scope.CapexBusinessCaseColl[0].CaseStatus;
                      //  $scope.CurrentStatus = $scope.OutLicensingLaunchDetailsColl[0].CurrentStatus;
    
                       

                    $scope.BusinessCaseDescription = $scope.CapexBusinessCaseColl[0].BusinessCaseDescription;

                    $scope.BlockName = $scope.CapexBusinessCaseColl[0].BlockName;

                    $scope.NoofProducts = $scope.CapexBusinessCaseColl[0].NumberOfProducts;

                    
            $scope.CapexContext = $scope.CapexBusinessCaseColl[0].CapexContext.Title;
            $scope.CapexContextCode = $scope.CapexBusinessCaseColl[0].CapexContextCode.Code;
            

                    
            
                        if ($scope.CapexCommentsWorkflowHistoryColl.length > 0) {
                            $scope.InitiatorComments1 = $scope.CapexCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
                        }
                        $scope.Editor = $scope.CapexBusinessCaseColl[0].Editor.Title;
                      
                         $scope.Modified = new Date($scope.CapexBusinessCaseColl[0].Modified);
            
                       
            
                        if ($scope.CapexBusinessCaseColl[0].CaseStage != undefined && $scope.CapexBusinessCaseColl[0].CaseStage != '' && $scope.CapexBusinessCaseColl[0].CaseStage != null) {
                            $scope.CaseStage = $scope.CapexBusinessCaseColl[0].CaseStage.Title;
            
                        }
        
                       
    
    
                        // if ($scope.CapexPhaseDetailsColl.length > 0) {
                        //     for(var s=0; s<$scope.CapexPhaseDetailsColl.length;s++){
                        //         var abc=[];
                        //         if ($scope.CapexPhaseDetailsColl[s].ProductName.results.length > 0) {
            
                        //         for (var p = 0; p < $scope.CapexPhaseDetailsColl[s].ProductName.results.length; p++) {
                        //             var ProductName=$scope.CapexPhaseDetailsColl[s].ProductName.results[p].Title;
                        //             abc.push(ProductName);
                        //         }
                        //         $scope.CapexPhaseDetailsColl[s].ProdName = ''+abc;
                        //     }
                        //   }
    
    
                        // }
                      
                        if ($scope.BusinessCaseOLDocumentLinkColl.length > 0) {
                            $scope.MajorV = Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion);
                            $scope.LapVersion = $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion;
                            $scope.Title = $scope.BusinessCaseOLDocumentLinkColl[0].Title;
                            $scope.MinorV = parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion).toFixed(1);
                            if ($scope.MajorV == $scope.MinorV) {
                                $scope.VersionFlag = "Major";
            
                            } else {
                                $scope.VersionFlag = "Minor";
                            }
                        }
            
                        if ($scope.BusinessCaseOLDocumentLinkColl[0].LapVersion == undefined || $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion == "" || $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion == null) {
                            $scope.counter = 0;
                            $scope.counter = parseInt($scope.counter);
                            //$scope.LapV = "V" +"-" + $scope.counter;// 		
                            $scope.LapV = "V" + $scope.counter;// 		
            
                        }
            
                        if ($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length > 0) {
                            for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length; s++) {
            
                                var cv = parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                                var casestg = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                                var lapvrsion = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
                                var vrsionType = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType;
            
            
            
                                var FilteredData = $filter('filter')($scope.CapexCommentsWorkflowHistoryColl2, function (item) {
                                    return (item.CaseStage == casestg && item.VersionNo == cv);
                                });
            
            
                                var docFilteredData = $filter('filter')($scope.OutLicensingSupportingDocColl, function (item) {
                                    return (item.CapexBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
                                });
            
                                $scope.MemberType = "Validator";
            
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
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry
            
                                }
                                else {
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData = "";
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";
            
                                }
                                /*  $scope.AttachColl=[];
                                  if(docFilteredData.length>0){
                                      for(var w=0;w<docFilteredData.length;w++)
                                      {
                                      var attach={};
                                      attach.DocAttachFName=docFilteredData[w].File.Name
                                      attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
                                      //$scope.AttachColl.push(attach);
                                       $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.push(attach);
                                        
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
            
            
            
            
            
            
                                if (lapvrsion == 'null' || casestg == undefined) {
                                    lapvrsion = 'V0';
                                    casestg = 'Initiated';
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
            
                                    //	$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;
            
                                }
            
            
                                if (FilteredData.length > 0) {

                                    if(FilteredData[0].CommentsWorkflowHistory ==null)
                                    {
                                        FilteredData[0].CommentsWorkflowHistory='NA'
                                        
                                    }
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
            
                                    //$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
                                }
            
                                else {
                                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + casestg + ";" + "  Version Type - " + vrsionType;
                                }
            
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].DocID = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].ID;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion = parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Fname = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.Name;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Author = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Author.Title;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Created = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Created;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Editor = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Editor.Title;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified;
                                //$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
            
                            }
                        } else {
                            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = "";
                        }
            
                        if ($scope.BusinessCaseOLDocumentLinkColl.length > 0) {
                            for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkColl.length; s++) {
                                $scope.BusinessCaseOLDocumentLinkColl[s].DocID = $scope.BusinessCaseOLDocumentLinkColl[s].ID;
                                $scope.BusinessCaseOLDocumentLinkColl[s].Fname = $scope.BusinessCaseOLDocumentLinkColl[s].File.Name;
                                $scope.BusinessCaseOLDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl;
            
                            }
                        } else {
                            $scope.BusinessCaseOLDocumentLinkColl = "";
                        }
                    }
                    // for (var i = 0; i < $scope.OutLicensingLaunchDetailsColl.length; i++) {
                    //     $scope.OutLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {
            
                    //         return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
                    //     });
                    // }
                    for (var i = 0; i < $scope.CapexPhaseDetailsColl.length; i++) {
                        $scope.CapexPhaseDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {
            
                          //  return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
                             return responseLine.CapexPhase.Id == $scope.CapexPhaseDetailsColl[i].Id;
    
                        });
                    }
            
            
                });
            
            
                $scope.onChangeStage = function (stgId) {
            
                    $scope.filteredStageColl = $filter('filter')($scope.ChangeCaseStageColl, function (itemId) {
                        return itemId.Id == stgId;
                    });
                    $scope.filteredStageCollNew = $filter('filter')($scope.CaseStageColl, function (itemId) {
                        return itemId.Title == $scope.filteredStageColl[0].Title;
                    });
                    // $scope.filteredStageCollNew = $filter('filter')($scope.CaseStageColl, function (itemId) {
                    //     return itemId.Id == $scope.filteredStageColl[0].Id;
                    // });
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
            
                $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorCAPEXDash";
                $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerCAPEXDash";
                $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorCAPEXDash";
            
                 
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

       // $scope.VersionDesc= 'Case Stage'+$scope.CapexBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.CapexBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;

        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             CapexBusinessCaseId: $scope.CapexBusinessCaseColl[0].Id,
            CapexBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID,
             CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
             DescriptionType:"Validator Comment",
          VersionNo: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)            
            
         
           
           

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.CapexBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
           // var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/CapexBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/CapexBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
 			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.CapexBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                                $location.path("/ValidatorCAPEXDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorCAPEXDash");
                        }
                    });
                });
            });

        });




    }


    // $scope.onCreateVersion = function () {



    //     // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined) {
    //     //     alert("Please Select Stage ")
    //     //     return false;
    //     // }

    //     if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
    //         alert("Please Enter Validator Comments ")
    //         return false;
    //     }


    //     var addCommentBusinessCaseRequest = {
    //         __metadata: {
    //             type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.CapexBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items("+$scope.IntiateID+")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {    
    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/CapexBusinessCaseDocuments/" + $scope.Title +"-V" +(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);    
    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.CapexBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/OutLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Business Case Updated Successfully");
    //                     $location.path("/ValidatorCAPEXDash");
    //                 }
    //             });
    //         });
    //     });
    // });


    // }
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
      //  $scope.VersionDesc= 'Case Stage'+$scope.CapexBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.CapexBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             CapexBusinessCaseId: $scope.CapexBusinessCaseColl[0].Id,
            CapexBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID,
            CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
          VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });





        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.CapexBusinessCaseListItem"
            },

            CaseStageId:$scope.CapexBusinessCaseColl[0].CaseStage.Id,// CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title,
            CaseStatus: "Minor Changes-by Validator",
            VersionNo:(parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)



        }


        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);

            

          //  var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/CapexBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/CapexBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1).toString() + ".xlsx";
           
 			var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.CapexBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc  //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        


                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                                $location.path("/ValidatorCAPEXDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorCAPEXDash");
                        }
                    });
                });
            });
        });


    }


    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ValidatorCAPEXDash");

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
                type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             CapexBusinessCaseId: $scope.CapexBusinessCaseColl[0].Id,
            CapexBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID,
             CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
         VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.CapexBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")";
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
            $location.path("/ValidatorCAPEXDash");
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
                type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             CapexBusinessCaseId: $scope.CapexBusinessCaseColl[0].Id,
            CapexBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID,
             DescriptionType:"Validator Comment",
             CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title, //CaseStage:$scope.CapexBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
           VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.CapexBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")";
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
            $location.path("/ValidatorCAPEXDash");
        });
    }




});