appOperations.controller("ReviewerReviewSingleTenderBidCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerSingDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    $scope.ChangeStagebc = [];
    var strSingleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseDescription,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    
    //var strSingleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,SingleBidBusinessCase&$filter=SingleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strSingleBidLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?&$select=Id,Title,Modified,BidAuthority/Id,BidAuthority/Title,BidDueDate,SupplyStartDate,SupplyEndDate,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=Market,BidAuthority,SubMarket,Currency,CurrentStatus,Country,Partner,SingleBidBusinessCase&$filter=SingleBidBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strSingleBidSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,SingleBidLaunchDetail/Id,SingleBidLaunchDetail/Title,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title&$expand=SingleBidLaunchDetail,SkuUnit,PackingType,SingleBidBusinessCase&$top=5000&$orderby=ID asc";

    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,SingleBidBusinessCaseId,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strSingleBidCommentsWFHistoryUrl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,DescriptionType,SingleBidBusinessCaseDoc/Id,SingleBidBusinessCaseDoc/Title&$expand=SingleBidBusinessCaseDoc,SingleBidBusinessCase,Editor&$filter=SingleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,SingleBidBusinessCaseId,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strSingleBidCommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,DescriptionType,SingleBidBusinessCaseDoc/Id,SingleBidBusinessCaseDoc/Title&$expand=SingleBidBusinessCaseDoc,SingleBidBusinessCase,Editor&$filter=SingleBidBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,SingleBidBusinessCase/Id,SingleBidBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,SingleBidBusinessCase,File&$filter=SingleBidBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";


    
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    


    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

    var urlColl = [strSingleBidUrl, strSingleBidLaunchDetailsUrl, strSingleBidSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strSingleBidCommentsWFHistoryUrl, strBusinessCaseOLDocumentLinkUrlWorkFlow, strSingleBidCommentsWFHistoryUrl2, strBusinessCaseOLSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    //Logics.sendEmailToGroups(["US_Form_In", "US_Rev"], [], "Test Please Ignore", "Test Please Ignore");

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.SingleBidTenderColl = batchedData[0].d.results;
        $scope.SingleBidLaunchColl = batchedData[1].d.results;
        $scope.SingleBidSKUDetailsColl = batchedData[2].d.results;
        $scope.SingleBidDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.SingleBidCommentsWFHistoryColl = batchedData[6].d.results;
        $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = batchedData[7].d.results;
        $scope.SingleBidCommentsWFHistoryColl2 = batchedData[8].d.results;
        $scope.SingleBidSupportingDocColl = batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;

        $scope.ProductMasterColl= batchedData[13].d.results;


        $scope.isLoading = false;
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;


        // Email



        $scope.InitiatorsGroupsName = [];
        $scope.ReviewersGroupsName = [];
        $scope.ValidatorsGroupsName = [];

        for (let m = 0; m < $scope.SingleBidTenderColl[0].Initiators.results.length; m++) {
            $scope.InitiatorsGroupsName.push($scope.SingleBidTenderColl[0].Initiators.results[m].Title);
        }
        for (let m = 0; m < $scope.SingleBidTenderColl[0].Reviewers.results.length; m++) {
            $scope.ReviewersGroupsName.push($scope.SingleBidTenderColl[0].Reviewers.results[m].Title);
        }
        for (let m = 0; m < $scope.SingleBidTenderColl[0].Validators.results.length; m++) {
            $scope.ValidatorsGroupsName.push($scope.SingleBidTenderColl[0].Validators.results[m].Title);
        }



        if ($scope.SingleBidTenderColl.length > 0 || $scope.SingleBidLaunchColl.length > 0 || $scope.SingleBidSKUDetailsColl.length > 0 || $scope.SingleBidDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.SingleBidTenderColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.SingleBidTenderColl[0].ID;
            //$scope.Businesscaseid=$scope.SingleBidTenderColl[0].BusinessCaseID;
          //  $scope.InitiationDate = new Date($scope.SingleBidTenderColl[0].InitiationDate);

            $scope.InitiationDate = new Date($scope.SingleBidTenderColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.SingleBidTenderColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.SingleBidTenderColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.SingleBidTenderColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.SingleBidTenderColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.SingleBidTenderColl[0].CaseStatus;
            $scope.Businesscaseid = $scope.SingleBidTenderColl[0].Title;
            $scope.CurrentStatus = $scope.SingleBidLaunchColl[0].CurrentStatus.Title;

            $scope.BusinessCaseDescription = $scope.SingleBidTenderColl[0].BusinessCaseDescription;


            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;

             if($scope.SingleBidCommentsWFHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.SingleBidCommentsWFHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.SingleBidTenderColl[0].Editor.Title;
            // $scope.ddlmarket=$scope.SingleBidLaunchColl[0].Market.Title;
            // $scope.ddlsubmarket=$scope.SingleBidLaunchColl[0].SubMarket.Title;
            // $scope.ddlCountry=$scope.SingleBidLaunchColl[0].Country.Title;
            // $scope.loedate= new Date($scope.SingleBidLaunchColl[0].LOEDate);
            // $scope.fillingdate= new Date($scope.SingleBidLaunchColl[0].FillingDate);
            // $scope.launchdate= new Date($scope.SingleBidLaunchColl[0].LaunchDate);
            // $scope.fillingdate= new Date($scope.SingleBidLaunchColl[0].FillingDate);
            // $scope.partner=$scope.SingleBidLaunchColl[0].Partner.Title;
            // $scope.partnerdetails=$scope.SingleBidLaunchColl[0].PartnerDetails;
            // $scope.currency=$scope.SingleBidLaunchColl[0].Currency;
            // $scope.currentstatus=$scope.SingleBidLaunchColl[0].CurrentStatus;  
            $scope.Modified = new Date($scope.SingleBidTenderColl[0].Modified);

            if ($scope.SingleBidTenderColl[0].CaseStage != undefined && $scope.SingleBidTenderColl[0].CaseStage != '' && $scope.SingleBidTenderColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.SingleBidTenderColl[0].CaseStage.Title;

            }

            if ($scope.SingleBidTenderColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.SingleBidTenderColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.SingleBidTenderColl[0].DosageForm.results[p].Title + ',';


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

            if ($scope.SingleBidDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.SingleBidDocumentLinkColl.length; s++) {
                    $scope.SingleBidDocumentLinkColl[s].DocID = $scope.SingleBidDocumentLinkColl[s].ID;
                    $scope.SingleBidDocumentLinkColl[s].Fname = $scope.SingleBidDocumentLinkColl[s].File.Name;
                    $scope.SingleBidDocumentLinkColl[s].ServRel = location.origin + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.SingleBidDocumentLinkColl = "";
            }

            if ($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.SingleBidCommentsWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.SingleBidSupportingDocColl, function (item) {
                        return (item.SingleBidBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
                    });

                    $scope.MemberType = "Reviewer";

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



                    var inputDate = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified;
                    // Convert input date string to Date object
                    var dateObject = new Date(inputDate);
                    
                    // Format the date using the date filter
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');
                    
                    
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified;
                    
        
        
        

                  //  $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified;
                    //$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl = "";
            }


        }

        for (var i = 0; i < $scope.SingleBidLaunchColl.length; i++) {
            $scope.SingleBidLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.SingleBidSKUDetailsColl, function (responseLine) {

                return responseLine.SingleBidLaunchDetail.Id == $scope.SingleBidLaunchColl[i].Id;
            });

        }

    });

 $scope.openDocVersionHistory = function(filedata){
			        Logics.openDocumentVersionHistory(filedata);
			    }



    var fileCounter = 0;
     $scope.MemberType="Reviewer";
     
    //  $scope.ChagneBusinesscaseStage = [{
    //         Id: 14,
    //         Value: "Under Internal Review"
    //     }];

    // $scope.onReviewerSubmit = function () {

    //   //  $scope.ChagneBusinesscaseStage="Review Completed"           
    //     $scope.CaseStatus="Ready for Validation"           

    //     // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
    //     //     alert("Please Select Stage ")
    //     //     return false;
    //     // }

    //     if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
    //         alert("Please Enter Reviewer Comments ")
    //         return false;
    //     }


    // var addCommentBusinessCaseRequest = {
    //     __metadata: {
    //         type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
    //     },
    //     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    // }

    // Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //     console.log(response);
    // });

    //     var BcChangeStage = {

    //         __metadata: {
    //             type: "SP.Data.SingleBidBusinessCaseListItem"
    //         },

    //       //  CaseStageId: $scope.ChagneBusinesscaseStage,
    //         CaseStatus: $scope.CaseStatus


    //     }

    //      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
    //      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    //         console.log(Changeresponse1)
    //             alert("Form Stage Changed Approved Successfully!!");
    //             $location.path("/ReviewerSingDash");

    //       });

    // }

    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorSingDash";
   $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerSingDash";
   $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorSingDash";


   $scope.CommentReuquired = false;


    $scope.ChnageCommentReuquired = function () {



        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;

        }
        else {
            $scope.CommentReuquired = false;


        }
    },



    $scope.onReviewerSubmit = function () {

        
        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }
        //  $scope.ChagneBusinesscaseStage="Review Completed"           
          $scope.CaseStatus = "Ready for Validation"
       // $scope.CaseStatus = "Sent For Validation"
        



        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Reviewer Comments ")
            return false;
        }

//        $scope.VersionDesc= 'Case Stage'+$scope.SingleBidTenderColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.SingleBidTenderColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;



        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.SingleBidTenderColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
            VersionNo: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
            SingleBidBusinessCaseId: $scope.SingleBidTenderColl[0].Id,
            SingleBidBusinessCaseDocId: $scope.SingleBidDocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.SingleBidBusinessCaseListItem"
            },

            CaseStageId: $scope.SingleBidTenderColl[0].CaseStage.Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webAbsoluteUrl+"/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/SingleBidBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
		  var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CaseStage/Id,CaseStage/Title,SingleBidBusinessCaseId,SingleBidBusinessCase/Title&$expand=CaseStage,SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.SingleBidBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId:$scope.SingleBidTenderColl[0].CaseStage.Id,                       
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        

                        
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);


                        var emailSubject = " Business Case Ready for Validation"
                        var emailBody = "<h1> Business Case Ready for Validation</h1>"
            
                        + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","
            
                        + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
                        +" is Ready for Validation sent by the"+"&nbsp;"+ "<b>"+$scope.ReviewersGroupsName+"</b>"
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
                        + "<p><b>Reviewer Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
                        + "<p></p><br>"
                        + "<p>Thanks & Regards,</p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);
            

                        
                       
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");

                                $location.path("/ReviewerSingDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerSingDash");
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
    //         alert("Please Enter Reviewer Comments ")
    //         return false;
    //     }


    //     var addCommentBusinessCaseRequest = {
    //         __metadata: {
    //             type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.SingleBidBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/SingleBidBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.SingleBidDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);

    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('SingleBidBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,SingleBidBusinessCaseId,SingleBidBusinessCase/Title&$expand=SingleBidBusinessCase&$filter=SingleBidBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.SingleBidBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.SingleBidDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/OutLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Form Minor Created Successfully!!");
    //                     $location.path("/ReviewerSingDash");

    //                 }
    //             });
    //         });
    //     });
    // });


    // }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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


    $scope.onReviewerCancel = function () {
        $location.path("/ReviewerSingDash");

    }

    $scope.onReviewerReject = function () {


        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }

        $scope.CaseStatus = "Rejected"
        //  $scope.ChagneBusinesscaseStage="Under Internal Review"           


        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Reviewer Comments ")
            return false;
        }


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.SingleBidTenderColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion)).toFixed(1),
            SingleBidBusinessCaseId: $scope.SingleBidTenderColl[0].Id,
            SingleBidBusinessCaseDocId: $scope.SingleBidDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.SingleBidBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {


            var emailSubject = "Business Case Review Rejection"
            var emailBody = "<h1>Business Case Review Rejection</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +"  has been Rejected by the "+"&nbsp;"+ "<b>"+$scope.ReviewersGroupsName+"</b>"
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
            + "<p><b>Reviewer Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
            + "<p>Thanks & Regards,</p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);


            


            console.log(Changeresponse1);
            alert("Business Case Updated Successfully");
             $location.path("/ReviewerSingDash");

        });
    }




    $scope.onReviewerRework = function () {


        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }
        
        $scope.CaseStatus = "Data To Be Rework";
        // $scope.ChagneBusinesscaseStage="Under Internal Review"           


        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Reviewer Comments ")
            return false;
        }


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.SingleBidCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.SingleBidTenderColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
           VersionNo: (parseFloat($scope.SingleBidDocumentLinkColl[0].CaseVersion)).toFixed(1),

            SingleBidBusinessCaseId: $scope.SingleBidTenderColl[0].Id,
            SingleBidBusinessCaseDocId: $scope.SingleBidDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.SingleBidBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SingleBidBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

        

            var emailSubject = "Business Case Data Rework"
            var emailBody = "<h1>Business Case Data Rework</h1>"

            + "<p> Dear"+"&nbsp;"+ $scope.InitiatorsGroupsName+","

            + "<p> A Business Case for Strategy"+"&nbsp;"+"<b>"+$scope.ddlStrategy+"</b>"+"&nbsp;"
            +" is Sent for Data Rework by the"+"&nbsp;"+ "<b>"+$scope.ReviewersGroupsName+"</b>"
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
            + "<p><b>Reviewer Comments: </b>" +$scope.CommentsWorkflowHistory+ "</p>"
            + "<p></p><br>"
            + "<p>Thanks & Regards,</p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);



            console.log(Changeresponse1);
            alert("Business Case Updated Successfully");
            $location.path("/ReviewerSingDash");
        });
    }




});