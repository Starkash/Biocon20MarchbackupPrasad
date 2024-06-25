appOperations.controller("ReviewAPICtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerAPIDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    $scope.ChangeStagebc = [];
    var strSingleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APIBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    
    //var strAPILaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,APIBusinessCase&$filter=APIBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strAPILaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APILaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,APIBusinessCase&$filter=APIBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strAPISKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APISKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,APILaunchDetail/Id,APILaunchDetailId/Title,APIBusinessCase/Id,APIBusinessCase/Title&$expand=APILaunchDetail,SkuUnit,PackingType,APIBusinessCase&$top=5000&$orderby=ID asc";

    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,APIBusinessCaseId,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strSingleBidCommentsWFHistoryUrl =  _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APICommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,APIBusinessCase/Id,APIBusinessCase/Title,DescriptionType,APIBusinessCaseDoc/Id,APIBusinessCaseDoc/Title&$expand=APIBusinessCaseDoc,APIBusinessCase,Editor&$filter=APIBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,APIBusinessCaseId,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strSingleBidCommentsWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('APICommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,APIBusinessCase/Id,APIBusinessCase/Title,DescriptionType,APIBusinessCaseDoc/Id,APIBusinessCaseDoc/Title&$expand=APIBusinessCaseDoc,APIBusinessCase,Editor&$filter=APIBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APISupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,APIBusinessCase/Id,APIBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,APIBusinessCase,File&$filter=APIBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";


    
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    


    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

    var urlColl = [strSingleBidUrl, strAPILaunchDetailsUrl, strAPISKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strSingleBidCommentsWFHistoryUrl, strBusinessCaseOLDocumentLinkUrlWorkFlow, strSingleBidCommentsWFHistoryUrl2, strBusinessCaseOLSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    //Logics.sendEmailToGroups(["US_Form_In", "US_Rev"], [], "Test Please Ignore", "Test Please Ignore");

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.APIColl = batchedData[0].d.results;
        $scope.APILaunchColl = batchedData[1].d.results;
        $scope.APISKUColl = batchedData[2].d.results;
        $scope.APIDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.APICommentsWFHistoryColl = batchedData[6].d.results;
        $scope.APIDocLinkUrlWorkFlowColl = batchedData[7].d.results;
        $scope.APICommentsWFHistoryColl2 = batchedData[8].d.results;
        $scope.APISupportingDocColl = batchedData[9].d.results;

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

        for (let m = 0; m < $scope.APIColl[0].Initiators.results.length; m++) {
            $scope.InitiatorsGroupsName.push($scope.APIColl[0].Initiators.results[m].Title);
        }
        for (let m = 0; m < $scope.APIColl[0].Reviewers.results.length; m++) {
            $scope.ReviewersGroupsName.push($scope.APIColl[0].Reviewers.results[m].Title);
        }
        for (let m = 0; m < $scope.APIColl[0].Validators.results.length; m++) {
            $scope.ValidatorsGroupsName.push($scope.APIColl[0].Validators.results[m].Title);
        }



        if ($scope.APIColl.length > 0 || $scope.APILaunchColl.length > 0 || $scope.APISKUColl.length > 0 || $scope.APIDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.APIColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.APIColl[0].ID;
            //$scope.Businesscaseid=$scope.APIColl[0].BusinessCaseID;
          //  $scope.InitiationDate = new Date($scope.APIColl[0].InitiationDate);

            $scope.InitiationDate = new Date($scope.APIColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.APIColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.APIColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.APIColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.APIColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.APIColl[0].CaseStatus;
            $scope.Businesscaseid = $scope.APIColl[0].Title;
            $scope.CurrentStatus = $scope.APILaunchColl[0].CurrentStatus.Title;

            $scope.BusinessCaseDescription = $scope.APIColl[0].BusinessCaseDescription;


            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;

             if($scope.APICommentsWFHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.APICommentsWFHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.APIColl[0].Editor.Title;
            // $scope.ddlmarket=$scope.APILaunchColl[0].Market.Title;
            // $scope.ddlsubmarket=$scope.APILaunchColl[0].SubMarket.Title;
            // $scope.ddlCountry=$scope.APILaunchColl[0].Country.Title;
            // $scope.loedate= new Date($scope.APILaunchColl[0].LOEDate);
            // $scope.fillingdate= new Date($scope.APILaunchColl[0].FillingDate);
            // $scope.launchdate= new Date($scope.APILaunchColl[0].LaunchDate);
            // $scope.fillingdate= new Date($scope.APILaunchColl[0].FillingDate);
            // $scope.partner=$scope.APILaunchColl[0].Partner.Title;
            // $scope.partnerdetails=$scope.APILaunchColl[0].PartnerDetails;
            // $scope.currency=$scope.APILaunchColl[0].Currency;
            // $scope.currentstatus=$scope.APILaunchColl[0].CurrentStatus;  
            $scope.Modified = new Date($scope.APIColl[0].Modified);

            if ($scope.APIColl[0].CaseStage != undefined && $scope.APIColl[0].CaseStage != '' && $scope.APIColl[0].CaseStage != null)

            {
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

            if ($scope.APIDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.APIDocumentLinkColl.length; s++) {
                    $scope.APIDocumentLinkColl[s].DocID = $scope.APIDocumentLinkColl[s].ID;
                    $scope.APIDocumentLinkColl[s].Fname = $scope.APIDocumentLinkColl[s].File.Name;
                    $scope.APIDocumentLinkColl[s].ServRel = location.origin + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.APIDocumentLinkColl = "";
            }

            if ($scope.APIDocLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.APIDocLinkUrlWorkFlowColl.length; s++) {

                    var cv = parseFloat($scope.APIDocLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                    var casestg = $scope.APIDocLinkUrlWorkFlowColl[s].CaseStage.Title;
                    var lapvrsion = $scope.APIDocLinkUrlWorkFlowColl[s].LapVersion;
                    var vrsionType = $scope.APIDocLinkUrlWorkFlowColl[s].VersionType;



                    var FilteredData = $filter('filter')($scope.APICommentsWFHistoryColl2, function (item) {
                        return (item.CaseStage == casestg && item.VersionNo == cv);
                    });


                    var docFilteredData = $filter('filter')($scope.APISupportingDocColl, function (item) {
                        return (item.APIBusinessCase.Id == $scope.IntiateID && item.CaseVersion == cv); //Arvind item.CaseStage.Title== casestg &&
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
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                    /*  $scope.AttachColl=[];
                      if(docFilteredData.length>0){
                          for(var w=0;w<docFilteredData.length;w++)
                          {
                          var attach={};
                          attach.DocAttachFName=docFilteredData[w].File.Name
                          attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
                          //$scope.AttachColl.push(attach);
                           $scope.APIDocLinkUrlWorkFlowColl.push(attach);
                            
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
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                        //	$scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

                    }


                    if (FilteredData.length > 0) {
                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                        //$scope.APIDocLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
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



                    var inputDate = $scope.APIDocLinkUrlWorkFlowColl[s].Modified;
                    // Convert input date string to Date object
                    var dateObject = new Date(inputDate);
                    
                    // Format the date using the date filter
                    $scope.APIDocLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');
                    
                    
                    $scope.APIDocLinkUrlWorkFlowColl[s].Modified= $scope.APIDocLinkUrlWorkFlowColl[s].Modified;
                    
        
        
        

                  ///  $scope.APIDocLinkUrlWorkFlowColl[s].Modified = $scope.APIDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.APIDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.APIDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.APIDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.APIDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.APIDocLinkUrlWorkFlowColl = "";
            }


        }

        for (var i = 0; i < $scope.APILaunchColl.length; i++) {
            $scope.APILaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.APISKUColl, function (responseLine) {

                return responseLine.APILaunchDetail.Id == $scope.APILaunchColl[i].Id;
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
    //         type: "SP.Data.APICommentsWorkflowHistoryListItem"
    //     },
    //     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    // }

    // Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //     console.log(response);
    // });

    //     var BcChangeStage = {

    //         __metadata: {
    //             type: "SP.Data.APIBusinessCaseListItem"
    //         },

    //       //  CaseStageId: $scope.ChagneBusinesscaseStage,
    //         CaseStatus: $scope.CaseStatus


    //     }

    //      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
    //      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    //         console.log(Changeresponse1)
    //             alert("Form Stage Changed Approved Successfully!!");
    //             $location.path("/ReviewerAPIDash");

    //       });

    // }

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

//        $scope.VersionDesc= 'Case Stage'+$scope.APIColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.APIColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;



        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.APICommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.APIColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
            VersionNo: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
            APIBusinessCaseId: $scope.APIColl[0].Id,
            APIBusinessCaseDocId: $scope.APIDocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.APIBusinessCaseListItem"
            },

            CaseStageId: $scope.APIColl[0].CaseStage.Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webAbsoluteUrl+"/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/APIBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
		  var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CaseStage/Id,CaseStage/Title,APIBusinessCaseId,APIBusinessCase/Title&$expand=CaseStage,APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.APIBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId:$scope.APIColl[0].CaseStage.Id,                       
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        

                        
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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

                                $location.path("/ReviewerAPIDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerAPIDash");
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
    //             type: "SP.Data.APICommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.APIBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/APIBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.APIDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);

    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('APIBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,APIBusinessCaseId,APIBusinessCase/Title&$expand=APIBusinessCase&$filter=APIBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.APIBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.APIDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/OutLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Form Minor Created Successfully!!");
    //                     $location.path("/ReviewerAPIDash");

    //                 }
    //             });
    //         });
    //     });
    // });


    // }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ReviewerAPIDash");

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
                type: "SP.Data.APICommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.APIColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion)).toFixed(1),
            APIBusinessCaseId: $scope.APIColl[0].Id,
            APIBusinessCaseDocId: $scope.APIDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.APIBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
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
             $location.path("/ReviewerAPIDash");

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
                type: "SP.Data.APICommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.APIColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
           VersionNo: (parseFloat($scope.APIDocumentLinkColl[0].CaseVersion)).toFixed(1),

            APIBusinessCaseId: $scope.APIColl[0].Id,
            APIBusinessCaseDocId: $scope.APIDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APICommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.APIBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('APIBusinessCase')/items(" + $scope.IntiateID + ")";
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
            $location.path("/ReviewerAPIDash");
        });
    }




});