appOperations.controller("ViewMultipleBidCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $window, $routeParams) {
    // if ($routeParams.initiationID != null && $routeParams.initiationID != undefined) {
    //     Logics.setSharingData({ ID: $routeParams.initiationID });
    // }

    // if ($routeParams.bussCaseDocID != null && $routeParams.bussCaseDocID != undefined) {
    //     $scope.bussCaseDocID = $routeParams.bussCaseDocID;
    // }

    // if (Logics.getSharedData() == undefined) {
    //     $location.path('/InitiatorMultipleDash');
    // }
    // else {
    //     $scope.BcInitiateDetails = Logics.getSharedData();
    //     $scope.IntiateID = $scope.BcInitiateDetails.ID;
    // }


   
    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorMultipleDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    var strMultipleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
    var strMultipleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidLaunchDetails')/items?&$select=Id,Title,Modified,BidAuthority/Id,BidAuthority/Title,BidDueDate,SupplyStartDate,SupplyEndDate,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=Market,BidAuthority,SubMarket,Currency,CurrentStatus,Country,Partner,MultipleBidBusinessCase&$filter=MultipleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strMultipleBidSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,MultipleBidLaunchDetail/Id,MultipleBidLaunchDetail/Title,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=MultipleBidLaunchDetail,SkuUnit,PackingType,MultipleBidBusinessCase&$top=5000&$orderby=ID asc";

    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,MultipleBidBusinessCaseId,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strMultipleBidCommentsWFHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,DescriptionType,MultipleBidBusinessCaseDoc/Id,MultipleBidBusinessCaseDoc/Title&$expand=MultipleBidBusinessCaseDoc,MultipleBidBusinessCase,Editor&$filter=MultipleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strMultipleBidDocumentLinkWFUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=*,EncodedAbsUrl,Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,MultipleBidBusinessCaseId,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strMultipleBidCommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MultipleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,DescriptionType,MultipleBidBusinessCaseDoc/Id,MultipleBidBusinessCaseDoc/Title&$expand=MultipleBidBusinessCaseDoc,MultipleBidBusinessCase,Editor&$filter=MultipleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strMultipleBidSupportingDocURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,MultipleBidBusinessCase,File&$filter=MultipleBidBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
  
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading


    var urlColl = [strMultipleBidUrl, strMultipleBidLaunchDetailsUrl, strMultipleBidSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strMultipleBidCommentsWFHistoryUrl, strMultipleBidDocumentLinkWFUrl, strMultipleBidCommentsWFHistoryUrl2, strMultipleBidSupportingDocURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) 
    {

        $scope.MultipleBidColl = batchedData[0].d.results;
        $scope.MultipleBidLaunchColl = batchedData[1].d.results;
        $scope.MultipleBidSKUDetailsColl = batchedData[2].d.results;
        $scope.MultipleBidDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.MultipleBidCommentsWFHistoryColl = batchedData[6].d.results;
        $scope.MultipleBidDocLinkUrlWorkFlowColl1= batchedData[7].d.results;
        $scope.MultipleBidCommentsWFHistoryColl2 = batchedData[8].d.results;
        $scope.OutLicensingSupportingDocColl = batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        // for product code
        $scope.ProductMasterColl= batchedData[13].d.results;

 $scope.MultipleBidDocLinkUrlWorkFlowColl= $scope.MultipleBidDocLinkUrlWorkFlowColl1;
        $scope.isLoading = false;
        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        if ($scope.MultipleBidColl.length > 0 || $scope.MultipleBidLaunchColl.length > 0 || $scope.MultipleBidSKUDetailsColl.length > 0 || $scope.MultipleBidDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.MultipleBidColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.MultipleBidColl[0].Title;
            //$scope.Businesscaseid=$scope.MultipleBidColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.MultipleBidColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.MultipleBidColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.MultipleBidColl[0].ProductName.Title;

// arvind product code---
            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
/// 
            $scope.ddlStrategy = $scope.MultipleBidColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.MultipleBidColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.MultipleBidColl[0].CaseStatus;
            $scope.CurrentStatus = $scope.MultipleBidLaunchColl[0].CurrentStatus.Title;

            $scope.BusinessCaseDescription = $scope.MultipleBidColl[0].BusinessCaseDescription;

/// file lock code if anywhere the Excel file opened

if ($scope.MultipleBidDocumentLinkColl.length > 0) {
    if ($scope.bussCaseDocID != undefined && $scope.bussCaseDocID != null) {
        var docOLBussinessLink = $filter('filter')($scope.MultipleBidDocumentLinkColl, function(value){
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

            for (let m = 0; m < $scope.MultipleBidColl[0].Initiators.results.length; m++) {
                $scope.InitiatorsGroupsName.push($scope.MultipleBidColl[0].Initiators.results[m].Title);
            }
            for (let m = 0; m < $scope.MultipleBidColl[0].Reviewers.results.length; m++) {
                $scope.ReviewersGroupsName.push($scope.MultipleBidColl[0].Reviewers.results[m].Title);
            }
            for (let m = 0; m < $scope.MultipleBidColl[0].Validators.results.length; m++) {
                $scope.ValidatorsGroupsName.push($scope.MultipleBidColl[0].Validators.results[m].Title);
            }

            if ($scope.MultipleBidCommentsWFHistoryColl.length > 0) {
                $scope.InitiatorComments1 = $scope.MultipleBidCommentsWFHistoryColl[0].CommentsWorkflowHistory;
            }
            $scope.Editor = $scope.MultipleBidColl[0].Editor.Title;
            $scope.Modified = new Date($scope.MultipleBidColl[0].Modified);
            if ($scope.MultipleBidColl[0].CaseStage != undefined && $scope.MultipleBidColl[0].CaseStage != '' && $scope.MultipleBidColl[0].CaseStage != null) {
                $scope.CaseStage = $scope.MultipleBidColl[0].CaseStage.Title;

            }

            if ($scope.MultipleBidColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.MultipleBidColl[0].DosageForm.results.length; p++) {

                    $scope.DosageForm += $scope.MultipleBidColl[0].DosageForm.results[p].Title + ',';
                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);
            }
            if ($scope.MultipleBidDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.MultipleBidDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.MultipleBidDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.MultipleBidDocumentLinkColl[0].LapVersion == undefined || $scope.MultipleBidDocumentLinkColl[0].LapVersion == "" || $scope.MultipleBidDocumentLinkColl[0].LapVersion == null) {
                $scope.counter = 0;
                $scope.counter = parseInt($scope.counter);
                //$scope.LapV = "V" +"-" + $scope.counter;// 		
                $scope.LapV = "V" + $scope.counter;// 		

            }

            if ($scope.MultipleBidDocLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.MultipleBidDocLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.MultipleBidCommentsWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.OutLicensingSupportingDocColl, function (item) {
                        return (item.MultipleBidBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
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
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                  
                    if (lapvrsion == 'null' || casestg == undefined) {
                        lapvrsion = 'V0';
                        casestg = 'Initiated';
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                    }
             

                    if (FilteredData.length > 0) {

                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
                    }

                    else {
                        $scope.MultipleBidDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + casestg + ";" + "  Version Type - " + vrsionType;
                    }

                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].DocID = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].ID;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].LapVersion = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].LapVersion;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseVersion = parseFloat($scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseStage = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseStage;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].VersionType = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].VersionType;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Fname = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].File.Name;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Author = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Author.Title;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseStage = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Created = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Created;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Editor = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Editor.Title;
                    
                    
                    
                    var inputDate = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified;
	// Convert input date string to Date object
	var dateObject = new Date(inputDate);

	// Format the date using the date filter
	$scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');


	$scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified= $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified;



                    
                   // $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified = $scope.MultipleBidDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.MultipleBidDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.MultipleBidDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.MultipleBidDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.MultipleBidDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.MultipleBidDocLinkUrlWorkFlowColl = "";
            }

            if ($scope.MultipleBidDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.MultipleBidDocumentLinkColl.length; s++) {
                    $scope.MultipleBidDocumentLinkColl[s].DocID = $scope.MultipleBidDocumentLinkColl[s].ID;
                    $scope.MultipleBidDocumentLinkColl[s].Fname = $scope.MultipleBidDocumentLinkColl[s].File.Name;
                  //  $scope.MultipleBidDocumentLinkColl[s].ServRel = location.origin + $scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl;
                   
                  $scope.MultipleBidDocumentLinkColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.MultipleBidDocumentLinkColl[s].File.ServerRelativeUrl;

                  var fname= $scope.MultipleBidDocumentLinkColl[s].Fname;
                  // $scope.CheckExcelFileOpenOrNot(fname);

                }
            } else {
                $scope.MultipleBidDocumentLinkColl = "";
            }
        }
        for (var i = 0; i < $scope.MultipleBidLaunchColl.length; i++) {
            $scope.MultipleBidLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.MultipleBidSKUDetailsColl, function (responseLine) {

                return responseLine.MultipleBidLaunchDetail.Id == $scope.MultipleBidLaunchColl[i].Id;
            });
        }
 
    });

    $scope.CheckExcelFileOpenOrNot=function (param) 
    {  
        var fname=  $scope.MultipleBidDocumentLinkColl[0].File.Name;
        var serrel=$scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl;
        finalserrel = serrel.substr(serrel.lastIndexOf('/') + 1)
        var test=serrel.replace( new RegExp(finalserrel), '' );
        var strstrFileopenUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + test + "')/Files('" + fname + "')/LockedByUser";


      var urlColl = [strstrFileopenUrl];
      https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplDev/BusinessCaseAutomation/MultipleBidBusinessCaseDocuments')/Files('5_OLCPRS_ATRVS_Aug%20-%202023-csCsd-V6.0.xlsx')/LockedByUser
   // https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplUAT/BusinessCaseAutomation/MultipleBidBusinessCaseDocuments')/Files('3_OLCPRS_AXTNB_Aug%20-%202023-bo-V2.0.xlsx')/LockedByUser
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

    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorMultipleDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerMultipleDash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorMultipleDash";


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
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType: "Initiator Comments",
            VersionNo: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            MultipleBidBusinessCaseId: $scope.MultipleBidColl[0].Id,
            MultipleBidBusinessCaseDocId: $scope.MultipleBidDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });
       var BcChangeStage = {

            __metadata: {
                type: "SP.Data.MultipleBidBusinessCaseListItem"
            },

            CaseStageId: $scope.chngStgIntId,
            CaseStatus: $scope.CaseStatus,
            VersionNo: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

        }
        // }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,MultipleBidBusinessCase/Id,MultipleBidBusinessCase/Title&$expand=CaseStage,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;


                    if ($scope.filteredStageColl[0].Title == "Business Case Published") {

                        var objLapVer = $scope.MultipleBidDocumentLinkColl[0].LapVersion;
                        objLapVer = objLapVer.charAt(1);
                        objLapVer = parseInt(objLapVer) + 1;
                        $scope.LapV = "V" + objLapVer


                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.MultipleBidBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.MultipleBidDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }
                    else {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.MultipleBidBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.MultipleBidDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                        //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.MultipleBidColl[0].Id + "/" + $scope.MultipleBidDocLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                        //     + " to open business case document";

                        // Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment();
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                            alert("Business Case Updated Successfully");
                            $location.path("/InitiatorMultipleDash");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorMultipleDash");
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
        var name = $scope.MultipleBidDocumentLinkColl[0].File.Name;
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.MultipleBidCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            MultipleBidBusinessCaseId: $scope.MultipleBidColl[0].Id,
            DescriptionType: "Initiator Comments",
            MultipleBidBusinessCaseDocId: $scope.MultipleBidDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.MultipleBidBusinessCaseListItem"
                },
                CaseStatus: $scope.CaseStatus,
                VersionNo: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/MultipleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion + 0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.MultipleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,MultipleBidBusinessCaseId,MultipleBidBusinessCase/Title&$expand=CaseStage,MultipleBidBusinessCase&$filter=MultipleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.MultipleBidBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                            $location.path("/InitiatorMultipleDash");

                            //);
                        }
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorMultipleDash");
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
        var documentLibrary = "MultipleBidSupportingDocument";
       
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , MultipleBidBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (Math.floor($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

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
        var documentLibrary = "MultipleBidSupportingDocument";
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('MultipleBidSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , MultipleBidBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (parseFloat($scope.MultipleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

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
        $location.path("/InitiatorMultipleDash");

    }

});