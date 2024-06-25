appOperations.controller("ReviewerReviewAndaLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerUSMOWANDADash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];


    var strAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,LapVersion,Modified,Innovator/Id,Innovator/Title,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,Initiators,Reviewers,Validators,Innovator,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
    var strAndaLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,FilingType/Id,FilingType/Title,NoofGenericFilers,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,AndaBusinessCase/Id,AndaBusinessCase/Title&$expand=Market,SubMarket,FilingType,Currency,CurrentStatus,Country,Partner,AndaBusinessCase&$filter=AndaBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
var strAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,AndaLicensingLaunchDetail/Id,AndaLicensingLaunchDetail/Title,AndaBusinessCase/Id,AndaBusinessCase/Title&$expand=AndaLicensingLaunchDetail,SkuUnit,PackingType,AndaBusinessCase&$filter=AndaBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

// var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('AndaBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
// var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
var strBusinessCaseAndaDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaBusinessCaseDocuments')/items?$select=Id,Title,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,AndaBusinessCaseId,AndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,AndaBusinessCase&$filter=AndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";
var strAndaCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaBusinessCase/Id,AndaBusinessCase/Title,DescriptionType,AndaBusinessCaseDoc/Id,AndaBusinessCaseDoc/Title&$expand=AndaBusinessCaseDoc,AndaBusinessCase,Editor&$filter=AndaBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

var strBusinessCaseAndaDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,AndaBusinessCaseId,AndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,AndaBusinessCase&$filter=AndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
var strAndaCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,AndaBusinessCase/Id,AndaBusinessCase/Title,DescriptionType,AndaBusinessCaseDoc/Id,AndaBusinessCaseDoc/Title&$expand=AndaBusinessCaseDoc,AndaBusinessCase,Editor&$filter=AndaBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";

 var strBusinessCaseAndaSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,AndaBusinessCase/Id,AndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,AndaBusinessCase/Id,File&$filter=AndaBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";

 var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
 var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
 var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading

 var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

var urlColl = [strAndaBusinessCaseUrl, strAndaLaunchDetailsUrl, strAndaSKUDetailsUrl, strBusinessCaseAndaDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strAndaCommentsWorkflowHistoryUrl,strBusinessCaseAndaDocumentLinkUrlWorkFlow,strAndaCommentsWorkflowHistoryUrl2,strBusinessCaseAndaSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];

Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

    $scope.AndaBusinessCaseColl = batchedData[0].d.results;
    $scope.AndaLaunchDetailsColl = batchedData[1].d.results;
    $scope.AndaSKUDetailsColl = batchedData[2].d.results;
    $scope.BusinessCaseANDADocumentLinkColl = batchedData[3].d.results;  //arvind
    $scope.CaseStageColl = batchedData[4].d.results;
    $scope.ChangeCaseStageColl = batchedData[5].d.results;
    $scope.AndaCommentsWorkflowHistoryColl = batchedData[6].d.results;        
    $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl1 =batchedData[7].d.results;
    $scope.AndaCommentsWorkflowHistoryColl2 =batchedData[8].d.results;
    $scope.AndaSupportingDocColl =batchedData[9].d.results;

    $scope.PackingMasterColl = batchedData[10].d.results;
    $scope.CurrentStatusMasterColl = batchedData[11].d.results;
    $scope.CurrencyMasterColl = batchedData[12].d.results;
    $scope.ProductMasterColl= batchedData[13].d.results;



    $scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 


    $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl=$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl1

        $scope.isLoading = false;

         // Email



         $scope.InitiatorsGroupsName = [];
         $scope.ReviewersGroupsName = [];
         $scope.ValidatorsGroupsName = [];
 
         for (let m = 0; m < $scope.AndaBusinessCaseColl[0].Initiators.results.length; m++) {
             $scope.InitiatorsGroupsName.push($scope.AndaBusinessCaseColl[0].Initiators.results[m].Title);
         }
         for (let m = 0; m < $scope.AndaBusinessCaseColl[0].Reviewers.results.length; m++) {
             $scope.ReviewersGroupsName.push($scope.AndaBusinessCaseColl[0].Reviewers.results[m].Title);
         }
         for (let m = 0; m < $scope.AndaBusinessCaseColl[0].Validators.results.length; m++) {
             $scope.ValidatorsGroupsName.push($scope.AndaBusinessCaseColl[0].Validators.results[m].Title);
         }
 

        if ($scope.AndaBusinessCaseColl.length > 0 || $scope.AndaLaunchDetailsColl.length > 0 || $scope.AndaSKUDetailsColl.length > 0 || $scope.BusinessCaseANDADocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.AndaBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.AndaBusinessCaseColl[0].ID;
            //$scope.Businesscaseid=$scope.AndaBusinessCaseColl[0].BusinessCaseID;
           // $scope.InitiationDate = new Date($scope.AndaBusinessCaseColl[0].InitiationDate);
            
           $scope.InitiationDate = new Date($scope.AndaBusinessCaseColl[0].InitiationDate)
          
           var date = new Date($scope.InitiationDate);
           var year = date.getFullYear();
           var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
           $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.AndaBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.AndaBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.AndaBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.AndaBusinessCaseColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.AndaBusinessCaseColl[0].CaseStatus;
            $scope.Businesscaseid = $scope.AndaBusinessCaseColl[0].Title;
            $scope.CurrentStatus= $scope.AndaLaunchDetailsColl[0].CurrentStatus.Title;

            $scope.ddlInnovator = $scope.AndaBusinessCaseColl[0].Innovator.Title;

            $scope.BusinessCaseDescription = $scope.AndaBusinessCaseColl[0].BusinessCaseDescription;

            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
             if($scope.AndaCommentsWorkflowHistoryColl.length>0)
           
						{
						 $scope.InitiatorComments1= $scope.AndaCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
						 }

            $scope.Editor = $scope.AndaBusinessCaseColl[0].Editor.Title;
            // 
            $scope.Modified = new Date($scope.AndaBusinessCaseColl[0].Modified);

            if ($scope.AndaBusinessCaseColl[0].CaseStage != undefined && $scope.AndaBusinessCaseColl[0].CaseStage != '' && $scope.AndaBusinessCaseColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.AndaBusinessCaseColl[0].CaseStage.Title;

            }

            if ($scope.AndaBusinessCaseColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.AndaBusinessCaseColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.AndaBusinessCaseColl[0].DosageForm.results[p].Title + ',';


                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);



            }



            if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion);
               $scope.LapVersion = $scope.BusinessCaseANDADocumentLinkColl[0].LapVersion;

                $scope.Title = $scope.BusinessCaseANDADocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }

            if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkColl.length; s++) {
                    $scope.BusinessCaseANDADocumentLinkColl[s].DocID = $scope.BusinessCaseANDADocumentLinkColl[s].ID;
                    $scope.BusinessCaseANDADocumentLinkColl[s].Fname = $scope.BusinessCaseANDADocumentLinkColl[s].File.Name;
                    $scope.BusinessCaseANDADocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseANDADocumentLinkColl = "";
            }


            /// arvind


            if ($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.length; s++) {
                 
                var cv=parseFloat($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                var casestg=$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                var lapvrsion= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].LapVersion;
               var vrsionType= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].VersionType;
              


        var FilteredData= $filter('filter')($scope.AndaCommentsWorkflowHistoryColl2, function (item) {
            return (item.CaseStage== casestg && item.VersionNo== cv) ;
        });
        
        
          var docFilteredData= $filter('filter')($scope.AndaSupportingDocColl, function (item) {
            return (item.AndaBusinessCase.Id== $scope.IntiateID && item.CaseVersion== cv) ;
        });
        $scope.MemberType="Reviewer";

        $scope.FileArry=[];
         if(docFilteredData.length>0){
        for(var c=0;c<docFilteredData.length;c++){
  	  		var col={};
  	  		col.FinalAttachData=docFilteredData[c].File.Name;
  	  		col.FinalCaseStage=docFilteredData[c].CaseStage.Title;
                col.Comment = $scope.CommentsWorkflowHistory
                col.MemberType = $scope.MemberType
  	  	//	col.FinalAttachDataRel=docFilteredData[c].File.ServerRelativeUrl;	
            col.FinalAttachDataRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + docFilteredData[c].File.ServerRelativeUrl;
	
     
			 $scope.FileArry.push(col);

   		}
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachData=$scope.FileArry

   		}
   		else
   		{
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachData="";
   		$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel="";

   		}
      /*  $scope.AttachColl=[];
        if(docFilteredData.length>0){
	        for(var w=0;w<docFilteredData.length;w++)
	        {
	        var attach={};
	        attach.DocAttachFName=docFilteredData[w].File.Name
			attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
			//$scope.AttachColl.push(attach);
			 $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl.push(attach);
	          
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
       
        

        
        
      
         if(lapvrsion=='null' || casestg==undefined)        
        {
	        lapvrsion='V0';
	        casestg='Initiated';
  	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

        //	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

        }
          
        		
        if(FilteredData.length>0)
        {
            if(FilteredData[0].CommentsWorkflowHistory ==null)
            {
                FilteredData[0].CommentsWorkflowHistory='NA'
                
            }
       	$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

		//$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }
        
        else
        {
                $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }                
               	
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].DocID = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].ID;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].LapVersion = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].LapVersion;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseVersion = parseFloat($scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseStage = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].VersionType = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].VersionType;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Fname = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.Name;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Author= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Author.Title; 
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].CaseStage= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Created= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Created;
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Editor= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Editor.Title;





            var inputDate = $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified;
            // Convert input date string to Date object
            var dateObject = new Date(inputDate);
            
            // Format the date using the date filter
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');
            
            
            $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified;
            





            
        //    $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified;
         //   $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
         $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl = "";
            }

        }

        for (var i = 0; i < $scope.AndaLaunchDetailsColl.length; i++) {
            $scope.AndaLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.AndaSKUDetailsColl, function (responseLine) {

                return responseLine.AndaLicensingLaunchDetail.Id == $scope.AndaLaunchDetailsColl[i].Id;
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

    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorUSMOWANDADash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerUSMOWANDADash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorUSMOWANDADash";


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
        $scope.VersionDesc = 'Case Stage-' + $scope.AndaBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ';'+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.AndaCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.AndaBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
            VersionNo: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
           AndaBusinessCaseId: $scope.AndaBusinessCaseColl[0].Id,
           AndaBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaBusinessCaseListItem"
            },

            CaseStageId:$scope.AndaBusinessCaseColl[0].CaseStage.Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1)



        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/USAndaBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

        //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl +"/BusinessCaseAutomation"+"/AndaBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/AndaBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,CaseStage/Id,CaseStage/Title,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=CaseStage,AndaBusinessCase&$filter=AndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.AndaBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId:$scope.AndaBusinessCaseColl[0].CaseStage.Id,                       
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.AndaBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        


                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                + "<p><b>Thanks & Regards, </b></p>"
                        + "<p>Biocon Limited</p>"
                        Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);
            

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                 alert("Business Case Reviewed Successfully!!");

                                $location.path("/ReviewerUSMOWANDADash");

                            });
                        } else {
                            alert("Business Case Reviewed Successfully!!");
                            $location.path("/ReviewerUSMOWANDADash");
                        }
                    });
                });
            });

        });
    }



   

    $scope.onReviewerCancel = function () {
        $location.path("/ReviewerUSMOWANDADash");

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
                type: "SP.Data.AndaCommentsWorkflowHistoryListItem"
            },
               CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.AndaBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)).toFixed(1),
            AndaBusinessCaseId: $scope.AndaBusinessCaseColl[0].Id,
            AndaBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCase')/items(" + $scope.IntiateID + ")";
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
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);


            console.log(Changeresponse1);
            alert("Business Case Rejected Successfully!!");
             $location.path("/ReviewerUSMOWANDADash");

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
                type: "SP.Data.AndaCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.AndaBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
           VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)).toFixed(1),

            AndaBusinessCaseId: $scope.AndaBusinessCaseColl[0].Id,
            AndaBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.AndaBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaBusinessCase')/items(" + $scope.IntiateID + ")";
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
    + "<p><b>Thanks & Regards, </b></p>"
            + "<p>Biocon Limited</p>"
            Logics.sendEmailToGroups( $scope.InitiatorsGroupsName,$scope.ReviewersGroupsName, emailSubject, emailBody);



            console.log(Changeresponse1);
             alert("Business Case Sent for Reworked Successfully!!");
            $location.path("/ReviewerUSMOWANDADash");
        });
    }




});