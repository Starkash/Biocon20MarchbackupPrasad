

appOperations.controller("ValidatorValidateMultipleTenderBidCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ValidatorMultipleDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];
  
    var strMultipleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseDescription,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
  //  var strMultipleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,MultipleBidBusinessCase&$filter=MultipleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strMultipleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidLaunchDetails')/items?&$select=Id,Title,Modified,BidAuthority/Id,BidAuthority/Title,BidDueDate,SupplyStartDate,SupplyEndDate,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=Market,BidAuthority,SubMarket,Currency,CurrentStatus,Country,Partner,MultipleBidBusinessCase&$filter=MultipleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strMultipleBidSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,MultipleBidLaunchDetail/Id,MultipleBidLaunchDetail/Title,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=MultipleBidLaunchDetail,SkuUnit,PackingType,MultipleBidBusinessCase&$top=5000&$orderby=ID asc";
    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,MultipleBidBusinessCaseId,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strMultipleBidCommentsWFHistoryUrl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,DescriptionType,MultipleBidBusinessCaseDoc/Id,MultipleBidBusinessCaseDoc/Title&$expand=MultipleBidBusinessCaseDoc,MultipleBidBusinessCase,Editor&$filter=MultipleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";


    var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,MultipleBidBusinessCaseId,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strMultipleBidCommentsWFHistoryUrl2 =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,DescriptionType,MultipleBidBusinessCaseDoc/Id,MultipleBidBusinessCaseDoc/Title&$expand=MultipleBidBusinessCaseDoc,MultipleBidBusinessCase,Editor&$filter=MultipleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,MultipleBidBusinessCase/Id,File&$filter=MultipleBidBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
     
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
   
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

    
    var urlColl = [strMultipleBidUrl, strMultipleBidLaunchDetailsUrl, strMultipleBidSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strMultipleBidCommentsWFHistoryUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strMultipleBidCommentsWFHistoryUrl2,strBusinessCaseOLSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
// for username
$scope.CurrLogUserId=_spPageContextInfo.userDisplayName;

        if ($scope.BcInitiateDetails.CaseStage == 'Initiated') {
            var currColl = {}
            currColl.ID = "Data Input Stage";
            currColl.ValueText = "Data Input Stage";
            $scope.ChangeStagebc.push(currColl);
            var currColl1 = {}
            currColl1.ID = "Under Review";
            currColl1.ValueText = "Under Review";
            $scope.ChangeStagebc.push(currColl1);

        } else if ($scope.BcInitiateDetails.CaseStage == 'Data Input Stage') {
            var currColl = {}
            currColl.ID = "Under Validation";
            currColl.ValueText = "Under Validation";
            $scope.ChangeStagebc.push(currColl);
            var currColl1 = {}
            currColl1.ID = "Under Review";
            currColl1.ValueText = "Under Review";
            $scope.ChangeStagebc.push(currColl1);

        } else if ($scope.BcInitiateDetails.CaseStage == 'Under Validation') {
            var currColl = {}
            currColl.ID = "Ready for ELT Review";
            currColl.ValueText = "Ready for ELT Review";
            $scope.ChangeStagebc.push(currColl);


        } else if ($scope.BcInitiateDetails.CaseStage == 'Ready for ELT Review') {
            var currColl = {}
            currColl.ID = "Under Validation";
            currColl.ValueText = "Under Validation";
            $scope.ChangeStagebc.push(currColl);
            var currColl1 = {}
            currColl1.ID = "Under ELT Review";
            currColl1.ValueText = "Under ELT Review";
            $scope.ChangeStagebc.push(currColl1);

        }

        console.log($scope.ChangeStagebc)
        $scope.MultipleBidTenderColl = batchedData[0].d.results;
        $scope.MultipleBidLaunchColl = batchedData[1].d.results;
        $scope.MultipleBidSKUDetailsColl = batchedData[2].d.results;
        $scope.MultipleBidDocumentLinkColl = batchedData[3].d.results;
        $scope.MultipleBidCommentsWFHistoryColl = batchedData[4].d.results;
        $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = batchedData[5].d.results;
        $scope.MultipleBidCommentsWFHistoryColl2 = batchedData[6].d.results;
        $scope.MultipleBidSupportingDocColl = batchedData[7].d.results;

        $scope.PackingMasterColl = batchedData[8].d.results;
        $scope.CurrentStatusMasterColl = batchedData[9].d.results;
        $scope.CurrencyMasterColl = batchedData[10].d.results;

        $scope.ProductMasterColl= batchedData[11].d.results;

        $scope.isLoading = false;


       // Email group 
        $scope.InitiatorsGroupsName = [];
        $scope.ReviewersGroupsName = [];
        $scope.ValidatorsGroupsName = [];

        for (let m = 0; m < $scope.MultipleBidTenderColl[0].Initiators.results.length; m++) {
            $scope.InitiatorsGroupsName.push($scope.MultipleBidTenderColl[0].Initiators.results[m].Title);
        }
        for (let m = 0; m < $scope.MultipleBidTenderColl[0].Reviewers.results.length; m++) {
            $scope.ReviewersGroupsName.push($scope.MultipleBidTenderColl[0].Reviewers.results[m].Title);
        }
        for (let m = 0; m < $scope.MultipleBidTenderColl[0].Validators.results.length; m++) {
            $scope.ValidatorsGroupsName.push($scope.MultipleBidTenderColl[0].Validators.results[m].Title);
        }




        if ($scope.MultipleBidTenderColl.length > 0 || $scope.MultipleBidLaunchColl.length > 0 || $scope.MultipleBidSKUDetailsColl.length > 0) {

            $scope.Businesscasename = $scope.MultipleBidTenderColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.MultipleBidTenderColl[0].ID;
            //$scope.Businesscaseid=$scope.MultipleBidTenderColl[0].BusinessCaseID;
          //  $scope.InitiationDate = new Date($scope.MultipleBidTenderColl[0].InitiationDate);
            $scope.InitiationDate = new Date($scope.MultipleBidTenderColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.MultipleBidTenderColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.MultipleBidTenderColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.MultipleBidTenderColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.MultipleBidTenderColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.MultipleBidTenderColl[0].CaseStatus;
            $scope.CurrentStatus= $scope.MultipleBidLaunchColl[0].CurrentStatus.Title;
            $scope.Businesscaseid = $scope.MultipleBidTenderColl[0].Title;

            $scope.BusinessCaseDescription = $scope.MultipleBidTenderColl[0].BusinessCaseDescription;


            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
            
          if($scope.MultipleBidCommentsWFHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.MultipleBidCommentsWFHistoryColl[0].CommentsWorkflowHistory;
						 }
            $scope.Editor = $scope.MultipleBidTenderColl[0].Editor.Title;
            $scope.Modified = new Date($scope.MultipleBidTenderColl[0].Modified);

            if ($scope.MultipleBidTenderColl[0].CaseStage != undefined && $scope.MultipleBidTenderColl[0].CaseStage != '' && $scope.MultipleBidTenderColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.MultipleBidTenderColl[0].CaseStage.Title;

            }

            if ($scope.MultipleBidTenderColl[0].DosageForm.results.length > 0) 
            {
                $scope.DosageForm = "";
                for (var p = 0; p < $scope.MultipleBidTenderColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.MultipleBidTenderColl[0].DosageForm.results[p].Title + ',';


                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);

            }
            if ($scope.MultipleBidDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion= $scope.MultipleBidDocumentLinkColl[0].LapVersion;

                $scope.Title = $scope.MultipleBidDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major Version";

                } else {
                    $scope.VersionFlag = "Minor Version";
                }
            }

            if ($scope.MultipleBidDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.MultipleBidDocumentLinkColl.length; s++) {
                    $scope.MultipleBidDocumentLinkColl[s].DocID = $scope.MultipleBidDocumentLinkColl[s].ID;
                    $scope.MultipleBidDocumentLinkColl[s].Fname = $scope.MultipleBidDocumentLinkColl[s].File.Name;
                    $scope.MultipleBidDocumentLinkColl[s].ServRel = location.origin + $scope.MultipleBidDocumentLinkColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.MultipleBidDocumentLinkColl = "";
            }

        }

        if ($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length > 0) {
            for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length; s++) {

                var cv = parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                var casestg = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                var lapvrsion = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
                var vrsionType = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType;

                var FilteredData = $filter('filter')($scope.MultipleBidCommentsWFHistoryColl2, function (item) {
                    return (item.CaseStage == casestg && item.VersionNo == cv);
                });

                var docFilteredData = $filter('filter')($scope.MultipleBidSupportingDocColl, function (item) {
                    return (item.MultipleBidBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
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

                        col.FinalAttachDataRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + docFilteredData[c].File.ServerRelativeUrl;

                        $scope.FileArry.push(col);

                    }
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                }
                else {
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData = "";
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                }
                if (lapvrsion == 'null' || casestg == undefined) {
                    lapvrsion = 'V0';
                    casestg = 'Initiated';
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                
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

        for (var i = 0; i < $scope.MultipleBidLaunchColl.length; i++) {
            $scope.MultipleBidLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.MultipleBidSKUDetailsColl, function (responseLine) {

                return responseLine.MultipleBidLaunchDetail.Id == $scope.MultipleBidLaunchColl[i].Id;
            });

        }

    });
 $scope.openDocVersionHistory = function(filedata){
			        Logics.openDocumentVersionHistory(filedata);
}


    var fileCounter = 0;
    
     var fileCounter = 0;
     $scope.MemberType="Validator";
   
     $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorMultipleDash";
     $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerMultipleDash";
     $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorMultipleDash";
 

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


     
        $scope.CaseStatus = "Validation Completed"

     
        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }

        $scope.VersionDesc = 'Case Stage-' + $scope.MultipleBidTenderColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;

        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             MultipleBidBusinessCaseId: $scope.MultipleBidTenderColl[0].Id,
            MultipleBidBusinessCaseDocId: $scope.MultipleBidDocumentLinkColl[0].ID,
             CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
             DescriptionType:"Validator Comment",
          VersionNo: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)            
      
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.MultipleBidBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
           // var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
 			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.MultipleBidBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                        + "<p>Thanks & Regards,</p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);
            
            

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/ValidatorMultipleDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorMultipleDash");
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


        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }
        $scope.VersionDesc = 'Case Stage-' + $scope.MultipleBidTenderColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ';'+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             MultipleBidBusinessCaseId: $scope.MultipleBidTenderColl[0].Id,
            MultipleBidBusinessCaseDocId: $scope.MultipleBidDocumentLinkColl[0].ID,
            CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
          VersionNo: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });
        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.MultipleBidBusinessCaseListItem"
            },

            CaseStageId:$scope.MultipleBidTenderColl[0].CaseStage.Id,// CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title,
            CaseStatus: "Minor Changes-by Validator",
            VersionNo:(parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)



        }


        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);

          //  var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl+"/BusinessCaseAutomation" + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1).toString() + ".xlsx";
           
 			var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.MultipleBidBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc  //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        


                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                        + "<p>Thanks & Regards,</p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups($scope.ValidatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);
            
            
                      
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/ValidatorMultipleDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ValidatorMultipleDash");
                        }
                    });
                });
            });
        });


    }


    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ValidatorMultipleDash");

    }

    $scope.onValidatorOnHold = function () {


        
 if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
    $scope.CommentReuquired = true;
    return false;

}


        // $scope.ChagneBusinesscaseStage="On Hold"         
        $scope.CaseStatus = "On Hold"

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Validator Comments ")
            return false;
        }


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             MultipleBidBusinessCaseId: $scope.MultipleBidTenderColl[0].Id,
             MultipleBidBusinessCaseDocId  : $scope.MultipleBidDocumentLinkColl[0].ID,
             CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title,
              DescriptionType:"Validator Comment",
            MemberType: $scope.MemberType,
         VersionNo: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.MultipleBidBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
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
            + "<p>Thanks & Regards,</p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.ValidatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);

            alert("Business Case Updated Successfully");
            $location.path("/ValidatorMultipleDash");
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
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
             MultipleBidBusinessCaseId: $scope.MultipleBidTenderColl[0].Id,
            MultipleBidBusinessCaseDocId: $scope.MultipleBidDocumentLinkColl[0].ID,
             DescriptionType:"Validator Comment",
             CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title, //CaseStage:$scope.MultipleBidTenderColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
           VersionNo: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion)).toFixed(1),

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.MultipleBidBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage
            CaseStatus: $scope.CaseStatus

        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {


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
            + "<p>Thanks & Regards,</p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups($scope.InitiatorsGroupsName, $scope.ValidatorsGroupsName, emailSubject, emailBody);





            console.log(Changeresponse1);
            alert("Business Case Updated Successfully");
            $location.path("/ValidatorMultipleDash");
        });
    }
});