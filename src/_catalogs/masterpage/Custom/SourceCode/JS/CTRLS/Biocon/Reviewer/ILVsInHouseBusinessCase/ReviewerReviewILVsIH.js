appOperations.controller("ReviewerReviewILVsIHCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerILVsIHDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }

    

    $scope.ChangeStagebc = [];

    var strILVsIHUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseBusinessCase')/items?&$select=Id,Title,Modified,BusinessCaseDescription,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    
    var strILVsIHLaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strILVsIHSKUDetailsUrl =_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,InLicensingVsInHouseLaunchDetail/Id,InLicensingVsInHouseLaunchDetail/Title,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title&$expand=InLicensingVsInHouseLaunchDetail,SkuUnit,PackingType,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    var strILVsIHDocLinkUrl =  _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strILVsIHWFHistoryUrl =   _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,DescriptionType,ILVsIHBusinessCaseDoc/Id,ILVsIHBusinessCaseDoc/Title&$expand=ILVsIHBusinessCaseDoc,InLicensingVsInHouseBusinessCase,Editor&$filter=InLicensingVsInHouseBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strILVsIHDocLinkUrlWorkFlow =_spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=*,EncodedAbsUrl,Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strILVsIHWFHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingVsInHouseCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,DescriptionType,ILVsIHBusinessCaseDoc/Id,ILVsIHBusinessCaseDoc/Title&$expand=ILVsIHBusinessCaseDoc,InLicensingVsInHouseBusinessCase,Editor&$filter=InLicensingVsInHouseBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

    var strBusinessCaseOLSupportingDocumentURL =  _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,InLicensingVsInHouseBusinessCase/Id,InLicensingVsInHouseBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,InLicensingVsInHouseBusinessCase,File&$filter=InLicensingVsInHouseBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";


    
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
    
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

    var urlColl = [strILVsIHUrl, strILVsIHLaunchUrl, strILVsIHSKUDetailsUrl, strILVsIHDocLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strILVsIHWFHistoryUrl, strILVsIHDocLinkUrlWorkFlow, strILVsIHWFHistoryUrl2, strBusinessCaseOLSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];
    //Logics.sendEmailToGroups(["US_Form_In", "US_Rev"], [], "Test Please Ignore", "Test Please Ignore");

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

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

        $scope.ProductMasterColl= batchedData[13].d.results;
        $scope.isLoading = false;
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

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



        if ($scope.ILVsIHLicencingColl.length > 0 || $scope.ILVsIHLaunchColl.length > 0 || $scope.ILVsIHSKUDetailsColl.length > 0 || $scope.ILVsIHDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.ILVsIHLicencingColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.ILVsIHLicencingColl[0].ID;
            //$scope.Businesscaseid=$scope.ILVsIHLicencingColl[0].BusinessCaseID;
          //  $scope.InitiationDate = new Date($scope.ILVsIHLicencingColl[0].InitiationDate);

            $scope.InitiationDate = new Date($scope.ILVsIHLicencingColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.ILVsIHLicencingColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.ILVsIHLicencingColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.ILVsIHLicencingColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.ILVsIHLicencingColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.ILVsIHLicencingColl[0].CaseStatus;
            $scope.Businesscaseid = $scope.ILVsIHLicencingColl[0].Title;
            $scope.CurrentStatus = $scope.ILVsIHLaunchColl[0].CurrentStatus.Title;
            $scope.BusinessCaseDescription = $scope.ILVsIHLicencingColl[0].BusinessCaseDescription;

            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;

             if($scope.ILVsIHCommentWFHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.ILVsIHCommentWFHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.ILVsIHLicencingColl[0].Editor.Title;
            // $scope.ddlmarket=$scope.ILVsIHLaunchColl[0].Market.Title;
            // $scope.ddlsubmarket=$scope.ILVsIHLaunchColl[0].SubMarket.Title;
            // $scope.ddlCountry=$scope.ILVsIHLaunchColl[0].Country.Title;
            // $scope.loedate= new Date($scope.ILVsIHLaunchColl[0].LOEDate);
            // $scope.fillingdate= new Date($scope.ILVsIHLaunchColl[0].FillingDate);
            // $scope.launchdate= new Date($scope.ILVsIHLaunchColl[0].LaunchDate);
            // $scope.fillingdate= new Date($scope.ILVsIHLaunchColl[0].FillingDate);
            // $scope.partner=$scope.ILVsIHLaunchColl[0].Partner.Title;
            // $scope.partnerdetails=$scope.ILVsIHLaunchColl[0].PartnerDetails;
            // $scope.currency=$scope.ILVsIHLaunchColl[0].Currency;
            // $scope.currentstatus=$scope.ILVsIHLaunchColl[0].CurrentStatus;  
            $scope.Modified = new Date($scope.ILVsIHLicencingColl[0].Modified);

            if ($scope.ILVsIHLicencingColl[0].CaseStage != undefined && $scope.ILVsIHLicencingColl[0].CaseStage != '' && $scope.ILVsIHLicencingColl[0].CaseStage != null)

            {
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

            if ($scope.ILVsIHDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.ILVsIHDocumentLinkColl.length; s++) {
                    $scope.ILVsIHDocumentLinkColl[s].DocID = $scope.ILVsIHDocumentLinkColl[s].ID;
                    $scope.ILVsIHDocumentLinkColl[s].Fname = $scope.ILVsIHDocumentLinkColl[s].File.Name;
                    $scope.ILVsIHDocumentLinkColl[s].ServRel = location.origin + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.ILVsIHDocumentLinkColl = "";
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
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachData = $scope.FileArry

                    }
                    else {
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachData = "";
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalAttachDataRel = "";

                    }
                    /*  $scope.AttachColl=[];
                      if(docFilteredData.length>0){
                          for(var w=0;w<docFilteredData.length;w++)
                          {
                          var attach={};
                          attach.DocAttachFName=docFilteredData[w].File.Name
                          attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
                          //$scope.AttachColl.push(attach);
                           $scope.ILVsIHDocLinkUrlWorkFlowColl.push(attach);
                            
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
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                        //	$scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

                    }


                    if (FilteredData.length > 0) {
                        if(FilteredData[0].CommentsWorkflowHistory ==null)
                        {
                            FilteredData[0].CommentsWorkflowHistory='NA'
                            
                        }
                        $scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion = " Case Stage - " + FilteredData[0].CaseStage + " ; " + " Comment - " + FilteredData[0].CommentsWorkflowHistory + ";" + " Member Type - " + FilteredData[0].MemberType + ";" + " Version Type  - " + vrsionType;

                        //$scope.ILVsIHDocLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
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
                    
        
        

                    
                   // $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified = $scope.ILVsIHDocLinkUrlWorkFlowColl[s].Modified;
                    //$scope.ILVsIHDocLinkUrlWorkFlowColl[s].ServRel = location.origin + $scope.ILVsIHDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
                    $scope.ILVsIHDocLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.ILVsIHDocLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.ILVsIHDocLinkUrlWorkFlowColl = "";
            }


        }

        for (var i = 0; i < $scope.ILVsIHLaunchColl.length; i++) {
            $scope.ILVsIHLaunchColl[i].LicenseSKUDetails = $filter('filter')($scope.ILVsIHSKUDetailsColl, function (responseLine) {

                return responseLine.InLicensingVsInHouseLaunchDetail.Id == $scope.ILVsIHLaunchColl[i].Id;
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
    //         type: "SP.Data.SInLicensingVsInHouseCommentsWorkflowHistoryListItem"
    //     },
    //     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    // }

    // Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //     console.log(response);
    // });

    //     var BcChangeStage = {

    //         __metadata: {
    //             type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
    //         },

    //       //  CaseStageId: $scope.ChagneBusinesscaseStage,
    //         CaseStatus: $scope.CaseStatus


    //     }

    //      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
    //      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    //         console.log(Changeresponse1)
    //             alert("Form Stage Changed Approved Successfully!!");
    //             $location.path("/ReviewerILVsIHDash");

    //       });

    // }

   
    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorILVsIHDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerILVsIHDash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorILVsIHDash";
    
    

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

//        $scope.VersionDesc= 'Case Stage'+$scope.ILVsIHLicencingColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.ILVsIHLicencingColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;



        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingVsInHouseCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ILVsIHLicencingColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
            VersionNo: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
            InLicensingVsInHouseBusinessCaseId: $scope.ILVsIHLicencingColl[0].Id,
            ILVsIHBusinessCaseDocId: $scope.ILVsIHDocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
            },

            CaseStageId: $scope.ILVsIHLicencingColl[0].CaseStage.Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webAbsoluteUrl+"/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
		  var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title&$expand=CaseStage,InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingVsInHouseBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId:$scope.ILVsIHLicencingColl[0].CaseStage.Id,                       
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        

                        
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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

                                $location.path("/ReviewerILVsIHDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerILVsIHDash");
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
    //             type: "SP.Data.SInLicensingVsInHouseCommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SInLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingVsInHouseBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.ILVsIHDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);

    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,InLicensingVsInHouseBusinessCaseId,InLicensingVsInHouseBusinessCase/Title&$expand=InLicensingVsInHouseBusinessCase&$filter=InLicensingVsInHouseBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.InLicensingVsInHouseBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.ILVsIHDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/OutLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Form Minor Created Successfully!!");
    //                     $location.path("/ReviewerILVsIHDash");

    //                 }
    //             });
    //         });
    //     });
    // });


    // }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ReviewerILVsIHDash");

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
                type: "SP.Data.InLicensingVsInHouseCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ILVsIHLicencingColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion)).toFixed(1),
            InLicensingVsInHouseBusinessCaseId: $scope.ILVsIHLicencingColl[0].Id,
            ILVsIHBusinessCaseDocId: $scope.ILVsIHDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
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
             $location.path("/ReviewerILVsIHDash");

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
                type: "SP.Data.InLicensingVsInHouseCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ILVsIHLicencingColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
           VersionNo: (parseFloat($scope.ILVsIHDocumentLinkColl[0].CaseVersion)).toFixed(1),

            InLicensingVsInHouseBusinessCaseId: $scope.ILVsIHLicencingColl[0].Id,
            ILVsIHBusinessCaseDocId: $scope.ILVsIHDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingVsInHouseBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingVsInHouseBusinessCase')/items(" + $scope.IntiateID + ")";
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
            $location.path("/ReviewerILVsIHDash");
        });
    }




});