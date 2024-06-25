appOperations.controller("ChngStgAPICtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
 
    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorAPIDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    var strAPIUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APIBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,LapVersion,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
  //  var strAPILaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APILaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,APIBusinessCase&$filter=APIBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strAPILaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APILaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,APIBusinessCase&$filter=APIBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strAPISKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APISKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,APILaunchDetail/Id,APILaunchDetail/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=APILaunchDetail,SkuUnit,PackingType,APIBusinessCase&$top=5000&$orderby=ID asc";

    var strAPIDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,APIBusinessCaseId,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strAPICommentsWFHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APICommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,APIBusinessCase/Id,APIBusinessCase/Title,DescriptionType,APIBusinessCaseDoc/Id,APIBusinessCaseDoc/Title&$expand=APIBusinessCaseDoc,APIBusinessCase,Editor&$filter=APIBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strSingleBidDocumentLinkWFUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=*,EncodedAbsUrl,Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,APIBusinessCaseId,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strAPICommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APICommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,APIBusinessCase/Id,APIBusinessCase/Title,DescriptionType,APIBusinessCaseDoc/Id,APIBusinessCaseDoc/Title&$expand=APIBusinessCaseDoc,APIBusinessCase,Editor&$filter=APIBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strAPISupportingDocURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APISupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,APIBusinessCase/Id,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,APIBusinessCase,File&$filter=APIBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
  
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading


    var urlColl = [strAPIUrl, strAPILaunchUrl, strAPISKUDetailsUrl, strAPIDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strAPICommentsWFHistoryUrl, strSingleBidDocumentLinkWFUrl, strAPICommentsWFHistoryUrl2, strAPISupportingDocURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) 
    {

        $scope.APIColl = batchedData[0].d.results;
        $scope.APILaunchColl = batchedData[1].d.results;
        $scope.APISKUColl = batchedData[2].d.results;
        $scope.APIDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.APICommentWFHistoryColl = batchedData[6].d.results;
        $scope.APIDocLinkUrlWorkFlowColl = batchedData[7].d.results;
        $scope.APICommentWFHistoryColl2 = batchedData[8].d.results;
        $scope.APISupportingDocColl = batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        // for product code
        $scope.ProductMasterColl= batchedData[13].d.results;


        $scope.isLoading = false;


        if($scope.APIColl.length>0){
            if ($scope.APIColl[0].CaseStatus == 'Data To Be Rework' && $scope.APIColl[0].CaseStage.Title == 'Under Validation') {
                var array = [];
    
                for (var i = 0; i < $scope.ChangeCaseStageColl.length; i++) {
                    array.push($scope.ChangeCaseStageColl[i]);
    
                }
                for (var j = 0; j < array.length; j++) {
                    //if(array[i].)
                    array.splice(0, 2);
                    break;
                }
                console.log(array);
                $scope.ChangeCaseStageColl = array;
            }
            else {
    
                $scope.ChangeCaseStageColl = $scope.ChangeCaseStageColl;
            }

        }


        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        if ($scope.APIColl.length > 0 || $scope.APILaunchColl.length > 0 || $scope.APISKUColl.length > 0 || $scope.APIDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.APIColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.APIColl[0].Title;

            $scope.BusinessCaseDescription = $scope.APIColl[0].BusinessCaseDescription;

            //$scope.Businesscaseid=$scope.APIColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.APIColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.APIColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.APIColl[0].ProductName.Title;

// arvind product code---
            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
/// 
            $scope.ddlStrategy = $scope.APIColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.APIColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.APIColl[0].CaseStatus;
            $scope.CurrentStatus = $scope.APILaunchColl[0].CurrentStatus.Title;



/// file lock code if anywhere the Excel file opened

if ($scope.APIDocumentLinkColl.length > 0) {
    if ($scope.bussCaseDocID != undefined && $scope.bussCaseDocID != null) {
        var docOLBussinessLink = $filter('filter')($scope.APIDocumentLinkColl, function(value){
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

            for (let m = 0; m < $scope.APIColl[0].Initiators.results.length; m++) {
                $scope.InitiatorsGroupsName.push($scope.APIColl[0].Initiators.results[m].Title);
            }
            for (let m = 0; m < $scope.APIColl[0].Reviewers.results.length; m++) {
                $scope.ReviewersGroupsName.push($scope.APIColl[0].Reviewers.results[m].Title);
            }
            for (let m = 0; m < $scope.APIColl[0].Validators.results.length; m++) {
                $scope.ValidatorsGroupsName.push($scope.APIColl[0].Validators.results[m].Title);
            }

            if ($scope.APICommentWFHistoryColl.length > 0) {
                $scope.InitiatorComments1 = $scope.APICommentWFHistoryColl[0].CommentsWorkflowHistory;
            }
            $scope.Editor = $scope.APIColl[0].Editor.Title;
            $scope.Modified = new Date($scope.APIColl[0].Modified);
            if ($scope.APIColl[0].CaseStage != 'undefined' && $scope.APIColl[0].CaseStage != '' && $scope.APIColl[0].CaseStage != null) {
                $scope.CaseStage = $scope.APIColl[0].CaseStage.Title;

            }

            if ($scope.APIColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.APIColl[0].DosageForm.results.length; p++) {

                    $scope.DosageForm += $scope.APIColl[0].DosageForm.results[p].Title + ',';
                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);
            }
            if ($scope.APIDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.APIDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.APIDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.APIDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.APIDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.APIDocumentLinkColl[0].LapVersion == undefined || $scope.APIDocumentLinkColl[0].LapVersion == "" || $scope.APIDocumentLinkColl[0].LapVersion == null) {
                $scope.counter = 0;
                $scope.counter = parseInt($scope.counter);
                //$scope.LapV = "V" +"-" + $scope.counter;// 		
                $scope.LapV = "V" + $scope.counter;// 		

            }

            if ($scope.APIDocLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.APIDocLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.APIDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.APIDocLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.APIDocLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.APICommentWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.APISupportingDocColl, function (item) {
                        return (item.APIBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
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
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                  
                    if (lapvrsion == 'null' || casestg == 'undefined') {
                        lapvrsion = 'V0';
                        casestg = 'Initiated';
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                    }
             

                    if (FilteredData.length > 0) {

                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;
                    }

                    else {
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + casestg + ";" + "  Version Type - " + vrsionType;
                    }

                    $scope.APIDocLinkUrlWorkFlowColl[s].DocID = $scope.APIDocLinkUrlWorkFlowColl[s].ID;
                    $scope.APIDocLinkUrlWorkFlowColl[s].LapVersion = $scope.APIDocLinkUrlWorkFlowColl[s].LapVersion;
                    $scope.APIDocLinkUrlWorkFlowColl[s].CaseVersion = parseFloat($scope.APIDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage = $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage;
                    $scope.APIDocLinkUrlWorkFlowColl[s].VersionType = $scope.APIDocLinkUrlWorkFlowColl[s].VersionType;
                    $scope.APIDocLinkUrlWorkFlowColl[s].Fname = $scope.APIDocLinkUrlWorkFlowColl[s].File.Name;
                    $scope.APIDocLinkUrlWorkFlowColl[s].Author = $scope.APIDocLinkUrlWorkFlowColl[s].Author.Title;
                    $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage = $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    $scope.APIDocLinkUrlWorkFlowColl[s].Created = $scope.APIDocLinkUrlWorkFlowColl[s].Created;
                    $scope.APIDocLinkUrlWorkFlowColl[s].Editor = $scope.APIDocLinkUrlWorkFlowColl[s].Editor.Title;
                    $scope.APIDocLinkUrlWorkFlowColl[s].Modified = $scope.APIDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.APIDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.APIDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.APIDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.APIDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.APIDocLinkUrlWorkFlowColl = "";
            }

            if ($scope.APIDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.APIDocumentLinkColl.length; s++) {
                    $scope.APIDocumentLinkColl[s].DocID = $scope.APIDocumentLinkColl[s].ID;
                    $scope.APIDocumentLinkColl[s].Fname = $scope.APIDocumentLinkColl[s].File.Name;
                    $scope.APIDocumentLinkColl[s].ServRel = location.origin + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl;
                   var fname= $scope.APIDocumentLinkColl[s].Fname;
                  // $scope.CheckExcelFileOpenOrNot(fname);

                }
            } else {
                $scope.APIDocumentLinkColl = "";
            }
        }
        for (var i = 0; i < $scope.APILaunchColl.length; i++) {
            $scope.APILaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.APISKUColl, function (responseLine) {

                return responseLine.APILaunchDetail.Id == $scope.APILaunchColl[i].Id;
            });
        }
 
    });

    $scope.CheckExcelFileOpenOrNot=function (param) 
    {  
        var fname=  $scope.APIDocumentLinkColl[0].File.Name;
        var serrel=$scope.APIDocumentLinkColl[0].File.ServerRelativeUrl;
        finalserrel = serrel.substr(serrel.lastIndexOf('/') + 1)
        var test=serrel.replace( new RegExp(finalserrel), '' );
        var strstrFileopenUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + test + "')/Files('" + fname + "')/LockedByUser";


      var urlColl = [strstrFileopenUrl];
      https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplDev/BusinessCaseAutomation/APIBusinessCaseDocuments')/Files('5_OLCPRS_ATRVS_Aug%20-%202023-csCsd-V6.0.xlsx')/LockedByUser
   // https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation/_api/web/GetFolderByServerRelativeUrl('/sites/SPCustomApplUAT/BusinessCaseAutomation/APIBusinessCaseDocuments')/Files('3_OLCPRS_AXTNB_Aug%20-%202023-bo-V2.0.xlsx')/LockedByUser
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

  
    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorAPIDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerAPIDash";
     $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorAPIDash";
 
 


     $scope.CommentReuquired = false;


     $scope.ChnageCommentReuquired = function () {
 
 
 
         if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
             $scope.CommentReuquired = true;
 
         }
         else {
             $scope.CommentReuquired = false;
 
 
         }
     },
 
 
 
         $scope.ddlStageReuquired = false;
 
 
     $scope.ddlStageReuquired = function (a) {
 
 
 
         if ($scope.ddlStage == 0 || $scope.ddlStage == undefined || a == 0 || $scope.ddlStage == '') {
             $scope.ddlStageReuquired = true;
             //  return false;
 
         }
         else {
             $scope.ddlStageReuquired = false;
 
 
         }
     },

     



    $scope.onInitiationSubmit = function () {


         if ($scope.APIDocumentLinkColl.length == 0) {

             alert('The system needs 1 min to configure the template.Please wait for sometime.');
             return false;

         }

         if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
             $scope.CommentReuquired = true;
             return false;

         }

         if ($scope.ddlStage == 0 || $scope.ddlStage == undefined || $scope.ddlStage == '') {
             $scope.ddlStageReuquired = true;
             return false;

         }

       




        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
            return false;
        }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Initiator Comments ")
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
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'
      //  $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;
        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.APICommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType: "Initiator Comments",
            VersionNo: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            APIBusinessCaseId: $scope.APIColl[0].Id,
            APIBusinessCaseDocId: $scope.APIDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });
       var BcChangeStage = {

            __metadata: {
                type: "SP.Data.APIBusinessCaseListItem"
            },
            LapVersion :$scope.LapV,  // LAP NEW 

            CaseStageId: $scope.chngStgIntId,
            CaseStatus: $scope.CaseStatus,
            VersionNo: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

        }
        // }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,APIBusinessCase/Id,APIBusinessCase/Title&$expand=CaseStage,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;


                    if ($scope.filteredStageColl[0].Title == "Business Case Published") {

                        var objLapVer = $scope.APIDocumentLinkColl[0].LapVersion;
                        objLapVer = objLapVer.charAt(1);
                        objLapVer = parseInt(objLapVer) + 1;
                        $scope.LapV = "V" + objLapVer


                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.APIBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.APIDocLinkUrlWorkFlowColl[0].FinalVersion
                        };

                        var LAPVersion = {
                            __metadata: {
                                type: "SP.Data.APIBusinessCaseListItem"
                            },
                         //   CaseVersion:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion :$scope.LapV,
                            // CaseStageId: $scope.chngStgIntId,
                            // VersionType: "Major"
                        };
    
                        var strInlicensingLaPUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
    
                        Logics.updateData(strInlicensingLaPUrl, LAPVersion).then(function (Vresponse) {
                            console.log(Vresponse);   
                        });


                    }
                    else {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.APIBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: $scope.LapV,
                            CaseStageId: $scope.chngStgIntId,
                            VersionType: "Major",
                            VersionDescription: $scope.VersionDesc//$scope.APIDocLinkUrlWorkFlowColl[0].FinalVersion
                        };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                        //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.APIColl[0].Id + "/" + $scope.APIDocLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                        //     + " to open business case document";

                        // Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.InitiatorsGroupsName, emailSubject, emailBody);

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment();
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                            alert("Business Case Updated Successfully");
                            $location.path("/InitiatorAPIDash");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorAPIDash");
                        }
                    });


                });
            });

        });

    }

    $scope.onCreateVersion = function () {


        if( $scope.APIDocumentLinkColl.length==0){
       
            alert('The system needs 1 min to configure the template.Please wait for sometime.');
            return false;
            
            }


        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }

        if ($scope.ddlStage == 0 || $scope.ddlStage == undefined || $scope.ddlStage == '') {
            $scope.ddlStageReuquired = true;
            return false;

        }

        



        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
            return false;
        }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Initiator Comments ")
            return false;
        }
        var name = $scope.APIDocumentLinkColl[0].File.Name;
       // $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;
       $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'

        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.APICommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage: $scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            APIBusinessCaseId: $scope.APIColl[0].Id,
            DescriptionType: "Initiator Comments",
            APIBusinessCaseDocId: $scope.APIDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.APIBusinessCaseListItem"
                },
                CaseStatus: $scope.CaseStatus,
                LapVersion :$scope.LapV, 
                VersionNo: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion + 0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,APIBusinessCaseId,APIBusinessCase/Title&$expand=CaseStage,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.APIBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Minor",
                        VersionDescription: $scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);

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
              
                        
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                            $scope.UploadSupportingAttachment2();

                        
                            alert("Business Case Updated Successfully");
                            $location.path("/InitiatorAPIDash");

                            //);
                        }
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorAPIDash");
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
        var documentLibrary = "APISupportingDocument";
       
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APISupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , APIBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

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
        var documentLibrary = "APISupportingDocument";
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
                var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APISupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
                var invoiceDocData = {
                    __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
                    , APIBusinessCaseId: $scope.IntiateID,
                    //  CaseVersion: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                    CaseStageId: $scope.chngStgIntId,
                    CaseVersion: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)

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
        $location.path("/InitiatorAPIDash");

    }

});