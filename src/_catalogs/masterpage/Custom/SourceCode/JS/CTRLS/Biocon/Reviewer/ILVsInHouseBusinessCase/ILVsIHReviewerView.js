appOperations.controller("ReviewerViewILVsIHCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
 
    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerILVsIHDash');
    } else   {
       // $scope.BcInitiateDetails = Logics.setSharingDataTwoDash();
        $scope.BcInitiateDetails = Logics.getSharedDataTwoDash();
        $scope.IntiateID = $scope.BcInitiateDetails[0].ID;
    }

   // New Change VD Start
   var dashboard=localStorage.getItem("dashboard"); 
   var Value=localStorage.getItem("Value");
   if(Value=="" && dashboard=="ReviewerILVsIHDash")
   {
       $location.path('/ReviewerUSANDAUMEDash'); 
   }
   else if(Value=="" && dashboard=="ELTReviewerAPIDash")
   {
       $location.path('/ELTReviewerILVsInHouseDash'); 
   }
   localStorage.setItem("Value", "");
   // New Change VD End

    $scope.ChangeStagebc = [];

    var strILIHUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseDescription,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
  //  var strInLicensingVsInHouseLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strInLicensingVsInHouseLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strSingleBidSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,InLicensingVsInHouseLaunchDetail/Id,InLicensingVsInHouseLaunchDetail/Title,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=InLicensingVsInHouseLaunchDetail,SkuUnit,PackingType,InLicensingVsInHouseBusinessCase&$top=5000&$orderby=ID asc";

    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails[0].CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strSingleBidCommentsWFHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,DescriptionType,ILVsIHBusinessCaseDoc/Id,ILVsIHBusinessCaseDoc/Title&$expand=ILVsIHBusinessCaseDoc,InLicensingVsInHouseBusinessCase,Editor&$filter=InLicensingVsInHouseBusinessCase/Title eq '" + $scope.BcInitiateDetails[0].Title + "'&$top=1&$orderby=Modified desc";

    var strSingleBidDocumentLinkWFUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=*,EncodedAbsUrl,Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strSingleBidCommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,DescriptionType,ILVsIHBusinessCaseDoc/Id,ILVsIHBusinessCaseDoc/Title&$expand=ILVsIHBusinessCaseDoc,InLicensingVsInHouseBusinessCase,Editor&$filter=InLicensingVsInHouseBusinessCase/Title eq '" + $scope.BcInitiateDetails[0].Title + "'&$top=1000&$orderby=Modified desc";

    var strILVsIHSupportingDocURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,InLicensingVsInHouseBusinessCase,File&$filter=InLicensingVsInHouseBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
  
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading


    var urlColl = [strILIHUrl, strInLicensingVsInHouseLaunchDetailsUrl, strSingleBidSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strSingleBidCommentsWFHistoryUrl, strSingleBidDocumentLinkWFUrl, strSingleBidCommentsWFHistoryUrl2, strILVsIHSupportingDocURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) 
    {

        $scope.ILVsIHLicencingColl = batchedData[0].d.results;
        $scope.ILVsIHLaunchColl = batchedData[1].d.results;
        $scope.ILVsIHSKUDetailsColl = batchedData[2].d.results;
        $scope.ILVsIHDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.ILVsIHCommentWFHistoryColl = batchedData[6].d.results;
        $scope.ILVsIHDocLinkUrlWorkFlowColl = batchedData[7].d.results;
        $scope.ILVsIHCommentWFHistoryColl2 = batchedData[8].d.results;
        $scope.ILVsIHSupportingDocColl = batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        // for product code
        $scope.ProductMasterColl= batchedData[13].d.results;


        $scope.isLoading = false;
        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        if ($scope.ILVsIHLicencingColl.length > 0 || $scope.ILVsIHLaunchColl.length > 0 || $scope.ILVsIHSKUDetailsColl.length > 0 || $scope.ILVsIHDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.ILVsIHLicencingColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.ILVsIHLicencingColl[0].Title;

            $scope.BusinessCaseDescription = $scope.ILVsIHLicencingColl[0].BusinessCaseDescription;

            //$scope.Businesscaseid=$scope.ILVsIHLicencingColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.ILVsIHLicencingColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.ILVsIHLicencingColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.ILVsIHLicencingColl[0].ProductName.Title;

// arvind product code---
            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
/// 
            $scope.ddlStrategy = $scope.ILVsIHLicencingColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.ILVsIHLicencingColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.ILVsIHLicencingColl[0].CaseStatus;
            $scope.CurrentStatus = $scope.ILVsIHLaunchColl[0].CurrentStatus.Title;



/// file lock code if anywhere the Excel file opened

if ($scope.ILVsIHDocumentLinkColl.length > 0) {
    if ($scope.bussCaseDocID != undefined && $scope.bussCaseDocID != null) {
        var docOLBussinessLink = $filter('filter')($scope.ILVsIHDocumentLinkColl, function(value){
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

            for (let m = 0; m < $scope.ILVsIHLicencingColl[0].Initiators.results.length; m++) {
                $scope.InitiatorsGroupsName.push($scope.ILVsIHLicencingColl[0].Initiators.results[m].Title);
            }
            for (let m = 0; m < $scope.ILVsIHLicencingColl[0].Reviewers.results.length; m++) {
                $scope.ReviewersGroupsName.push($scope.ILVsIHLicencingColl[0].Reviewers.results[m].Title);
            }
            for (let m = 0; m < $scope.ILVsIHLicencingColl[0].Validators.results.length; m++) {
                $scope.ValidatorsGroupsName.push($scope.ILVsIHLicencingColl[0].Validators.results[m].Title);
            }

            if ($scope.ILVsIHCommentWFHistoryColl.length > 0) {
                $scope.InitiatorComments1 = $scope.ILVsIHCommentWFHistoryColl[0].CommentsWorkflowHistory;
            }
            $scope.Editor = $scope.ILVsIHLicencingColl[0].Editor.Title;
            $scope.Modified = new Date($scope.ILVsIHLicencingColl[0].Modified);
            if ($scope.ILVsIHLicencingColl[0].CaseStage != 'undefined' && $scope.ILVsIHLicencingColl[0].CaseStage != '' && $scope.ILVsIHLicencingColl[0].CaseStage != null) {
                $scope.CaseStage = $scope.ILVsIHLicencingColl[0].CaseStage.Title;

            }

            if ($scope.ILVsIHLicencingColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.ILVsIHLicencingColl[0].DosageForm.results.length; p++) {

                    $scope.DosageForm += $scope.ILVsIHLicencingColl[0].DosageForm.results[p].Title + ',';
                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);
            }
            if ($scope.ILVsIHDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.ILVsIHDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.ILVsIHDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.ILVsIHDocumentLinkColl[0].LapVersion == undefined || $scope.ILVsIHDocumentLinkColl[0].LapVersion == "" || $scope.ILVsIHDocumentLinkColl[0].LapVersion == null) {
                $scope.counter = 0;
                $scope.counter = parseInt($scope.counter);
                //$scope.LapV = "V" +"-" + $scope.counter;// 		
                $scope.LapV = "V" + $scope.counter;// 		

            }

            if ($scope.ILVsIHDocLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.ILVsIHDocLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.ILVsIHCommentWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.ILVsIHSupportingDocColl, function (item) {
                        return (item.InLicensingVsInHouseBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
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
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                  
                    if (lapvrsion == 'null' || casestg == 'undefined') {
                        lapvrsion = 'V0';
                        casestg = 'Initiated';
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                    }
             

                    if (FilteredData.length > 0) {

                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
                    }

                    else {
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + casestg + ";" + "  Version Type - " + vrsionType;
                    }

                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].DocID = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].ID;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].LapVersion = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].LapVersion;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseVersion = parseFloat($scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseStage = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseStage;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].VersionType = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].VersionType;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Fname = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].File.Name;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Author = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Author.Title;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseStage = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Created = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Created;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Editor = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Editor.Title;



                    var inputDate = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified;
                    // Convert input date string to Date object
                    var dateObject = new Date(inputDate);
                    
                    // Format the date using the date filter
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');
                    
                    
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified= $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified;
                    
        
        
        


                 //   $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.ILVsIHDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.ILVsIHDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.ILVsIHDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.ILVsIHDocLinkUrlWorkFlowColl = "";
            }

            if ($scope.ILVsIHDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.ILVsIHDocumentLinkColl.length; s++) {
                    $scope.ILVsIHDocumentLinkColl[s].DocID = $scope.ILVsIHDocumentLinkColl[s].ID;
                    $scope.ILVsIHDocumentLinkColl[s].Fname = $scope.ILVsIHDocumentLinkColl[s].File.Name;
                   //$scope.ILVsIHDocumentLinkColl[s].ServRel = location.origin + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl;
                   $scope.ILVsIHDocumentLinkColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.ILVsIHDocumentLinkColl[s].File.ServerRelativeUrl;

                   var fname= $scope.ILVsIHDocumentLinkColl[s].Fname;
                  // $scope.CheckExcelFileOpenOrNot(fname);

                }
            } else {
                $scope.ILVsIHDocumentLinkColl = "";
            }
        }
        for (var i = 0; i < $scope.ILVsIHLaunchColl.length; i++) {
            $scope.ILVsIHLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.ILVsIHSKUDetailsColl, function (responseLine) {

                return responseLine.InLicensingVsInHouseLaunchDetail.Id == $scope.ILVsIHLaunchColl[i].Id;
            });
        }
 
    });

    $scope.CheckExcelFileOpenOrNot=function (param) 
    {  
        var fname=  $scope.ILVsIHDocumentLinkColl[0].File.Name;
        var serrel=$scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl;
        finalserrel = serrel.substr(serrel.lastIndexOf('/') + 1)
        var test=serrel.replace( new RegExp(finalserrel), '' );
        var strstrFileopenUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + test + "')/Files('" + fname + "')/LockedByUser";


      var urlColl = [strstrFileopenUrl];
      https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplDev/BusinessCaseAutomation/InLicensingVsInHouseBusinessCaseDocuments')/Files('5_OLCPRS_ATRVS_Aug%20-%202023-csCsd-V6.0.xlsx')/LockedByUser
   // https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplUAT/BusinessCaseAutomation/InLicensingVsInHouseBusinessCaseDocuments')/Files('3_OLCPRS_AXTNB_Aug%20-%202023-bo-V2.0.xlsx')/LockedByUser
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

    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerILVsIHDash";
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
                type: "SP.Data.InLicensingVsInHouseCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType: "Initiator Comments",
            VersionNo: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            InLicensingVsInHouseBusinessCaseId: $scope.ILVsIHLicencingColl[0].Id,
            ILVsIHBusinessCaseDocId: $scope.ILVsIHDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });
       var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
            },

            CaseStageId: $scope.chngStgIntId,
            CaseStatus: $scope.CaseStatus,
            VersionNo: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

        }
        // }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=CaseStage,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;


                    if ($scope.filteredStageColl[0].Title == "Business Case Published") {

                        var objLapVer = $scope.ILVsIHDocumentLinkColl[0].LapVersion;
                        objLapVer = objLapVer.charAt(1);
                        objLapVer = parseInt(objLapVer) + 1;
                        $scope.LapV = "V" + objLapVer


                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.InLicensingVsInHouseBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.ILVsIHDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }
                    else {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.InLicensingVsInHouseBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.ILVsIHDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                        //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.ILVsIHLicencingColl[0].Id + "/" + $scope.ILVsIHDocLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                        //     + " to open business case document";

                        // Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment();
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerILVsIHDash");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/ReviewerILVsIHDash");
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
        var name = $scope.ILVsIHDocumentLinkColl[0].File.Name;
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingVsInHouseCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            InLicensingVsInHouseBusinessCaseId: $scope.ILVsIHLicencingColl[0].Id,
            DescriptionType: "Initiator Comments",
            ILVsIHBusinessCaseDocId: $scope.ILVsIHDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
                },
                CaseStatus: $scope.CaseStatus,
                VersionNo: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion + 0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title&$expand=CaseStage,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingVsInHouseBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                            $location.path("/ReviewerILVsIHDash");

                            //);
                        }
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/ReviewerILVsIHDash");
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
        var documentLibrary = "InLicensingVsInHouseSupportingDocument";
       
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , InLicensingVsInHouseBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

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
        var documentLibrary = "InLicensingVsInHouseSupportingDocument";
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , InLicensingVsInHouseBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

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
    // $scope.onInitiationCancel = function () {
    //     $location.path("/ReviewerILVsIHDash");

    // }


    
    $scope.onInitiationCancel = function () {
        
        if($scope.BcInitiateDetails[1]=="ELTReviewerAPIDash")
        {
            $location.path("/ELTReviewerILVsInHouseDash");
        }
       else{
        $location.path("/ReviewerILVsIHDash");
       }
       

    }

});