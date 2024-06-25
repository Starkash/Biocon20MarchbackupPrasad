appOperations.controller("ReviewerReviewCapexLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerLP');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    // var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,CaseStatus,BusinessCaseName,InitiationDate,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

    var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";

    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,OutLicensingBusinessCase&$filter=OutLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase&$top=5000&$orderby=ID asc";

    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('OutLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseVersion,LapVersion ,VersionType,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";


    var strOutLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,DescriptionType,MemberType,OutLicensingBusinessCaseDoc/Id,OutLicensingBusinessCaseDoc/Title&$expand=OutLicensingBusinessCaseDoc,OutLicensingBusinessCase,Editor&$filter=OutLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var urlColl = [strOutLicensingBusinessCaseUrl, strOutLicensingLaunchDetailsUrl, strOutLicensingSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strOutLicensingCommentsWorkflowHistoryUrl];

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
        $scope.OutLicensingBusinessCaseColl = batchedData[0].d.results;
        $scope.OutLicensingLaunchDetailsColl = batchedData[1].d.results;
        $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results;
        $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.OutLicensingCommentsWorkflowHistoryColl = batchedData[6].d.results;

        $scope.isLoading = false;

        if ($scope.OutLicensingBusinessCaseColl.length > 0 || $scope.OutLicensingLaunchDetailsColl.length > 0 || $scope.OutLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseOLDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.OutLicensingBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.OutLicensingBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.OutLicensingBusinessCaseColl[0].InitiationDate);
            $scope.ddlProductCategory = $scope.OutLicensingBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.OutLicensingBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.OutLicensingBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.OutLicensingBusinessCaseColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.OutLicensingBusinessCaseColl[0].CaseStatus;
            $scope.Businesscaseid = $scope.OutLicensingBusinessCaseColl[0].Title;
             if($scope.OutLicensingCommentsWorkflowHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.OutLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.OutLicensingBusinessCaseColl[0].Editor.Title;
            // $scope.ddlmarket=$scope.OutLicensingLaunchDetailsColl[0].Market.Title;
            // $scope.ddlsubmarket=$scope.OutLicensingLaunchDetailsColl[0].SubMarket.Title;
            // $scope.ddlCountry=$scope.OutLicensingLaunchDetailsColl[0].Country.Title;
            // $scope.loedate= new Date($scope.OutLicensingLaunchDetailsColl[0].LOEDate);
            // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
            // $scope.launchdate= new Date($scope.OutLicensingLaunchDetailsColl[0].LaunchDate);
            // $scope.fillingdate= new Date($scope.OutLicensingLaunchDetailsColl[0].FillingDate);
            // $scope.partner=$scope.OutLicensingLaunchDetailsColl[0].Partner.Title;
            // $scope.partnerdetails=$scope.OutLicensingLaunchDetailsColl[0].PartnerDetails;
            // $scope.currency=$scope.OutLicensingLaunchDetailsColl[0].Currency;
            // $scope.currentstatus=$scope.OutLicensingLaunchDetailsColl[0].CurrentStatus;  
            $scope.Modified = new Date($scope.OutLicensingBusinessCaseColl[0].Modified);

            if ($scope.OutLicensingBusinessCaseColl[0].CaseStage != 'undefined' && $scope.OutLicensingBusinessCaseColl[0].CaseStage != '' && $scope.OutLicensingBusinessCaseColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.OutLicensingBusinessCaseColl[0].CaseStage.Title;

            }

            if ($scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.OutLicensingBusinessCaseColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.OutLicensingBusinessCaseColl[0].DosageForm.results[p].Title + ',';


                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);



            }



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

        for (var i = 0; i < $scope.OutLicensingLaunchDetailsColl.length; i++) {
            $scope.OutLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {

                return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
            });

        }

    });

 $scope.openDocVersionHistory = function(filedata){
			        Logics.openDocumentVersionHistory(filedata);
			    }



    var fileCounter = 0;
     $scope.MemberType="Reviewer";
     
     $scope.ChagneBusinesscaseStage = [{
            Id: 14,
            Value: "Under Internal Review"
        }];

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
    //         type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
    //     },
    //     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    // }

    // Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //     console.log(response);
    // });

    //     var BcChangeStage = {

    //         __metadata: {
    //             type: "SP.Data.OutLicensingBusinessCaseListItem"
    //         },

    //       //  CaseStageId: $scope.ChagneBusinesscaseStage,
    //         CaseStatus: $scope.CaseStatus


    //     }

    //      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
    //      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    //         console.log(Changeresponse1)
    //             alert("Form Stage Changed Approved Successfully!!");
    //             $location.path("/ReviewerLP");

    //       });

    // }


    $scope.onReviewerSubmit = function () {

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

        $scope.VersionDesc= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        



        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ChagneBusinesscaseStage[0].Value,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
            VersionNo: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
            OutLicensingBusinessCaseId: $scope.OutLicensingBusinessCaseColl[0].Id,
            OutLicensingBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.OutLicensingBusinessCaseListItem"
            },

            CaseStageId: $scope.ChagneBusinesscaseStage[0].Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webAbsoluteUrl+"/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
          
		  var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CaseStage/Id,CaseStage/Title,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=CaseStage,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId: $scope.ChagneBusinesscaseStage[0].Id,                       
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.ChagneBusinesscaseStage[0].Value+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        

                        
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                 alert("Business Case Reviewed Successfully!!");

                                $location.path("/ReviewerLP");

                            });
                        } else {
                            alert("Business Case Reviewed Successfully!!");
                            $location.path("/ReviewerLP");
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
    //             type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.OutLicensingBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);

    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/OutLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Form Minor Created Successfully!!");
    //                     $location.path("/ReviewerLP");

    //                 }
    //             });
    //         });
    //     });
    // });


    // }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ReviewerLP");

    }

    $scope.onReviewerReject = function () {

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
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ChagneBusinesscaseStage[0].Value,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)).toFixed(1),
            OutLicensingBusinessCaseId: $scope.OutLicensingBusinessCaseColl[0].Id,
            OutLicensingBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.OutLicensingBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            alert("Business Case Rejected Successfully!!");
             $location.path("/ReviewerLP");

        });
    }




    $scope.onReviewerRework = function () {

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
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.ChagneBusinesscaseStage[0].Value,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
           VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)).toFixed(1),

            OutLicensingBusinessCaseId: $scope.OutLicensingBusinessCaseColl[0].Id,
            OutLicensingBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.OutLicensingBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
             alert("Business Case Sent for Reworked Successfully!!");
            $location.path("/ReviewerLP");
        });
    }




});