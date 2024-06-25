appOperations.controller("ChangeStageOLCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorLP');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];
    var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency,CurrentStatus,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=Market,SubMarket,Country,Partner,OutLicensingBusinessCase&$filter=OutLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    // var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Quantity,Unit,Pack,PackingType,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingLaunchDetail,InLicensingBusinessCase&$filter=InLicensingLaunchDetail/ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";
    var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Unit,Pack,PackingType,OutLicensingLaunchDetail/Id,OutLicensingLaunchDetail/Title,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title&$expand=OutLicensingLaunchDetail,OutLicensingBusinessCase&$top=5000&$orderby=ID asc";

    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('OutLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseOLDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionDescription,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";
    var strOutLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,DescriptionType,OutLicensingBusinessCaseDoc/Id,OutLicensingBusinessCaseDoc/Title&$expand=OutLicensingBusinessCaseDoc,OutLicensingBusinessCase,Editor&$filter=OutLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,VersionDescription,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strOutLicensingCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,DescriptionType,OutLicensingBusinessCaseDoc/Id,OutLicensingBusinessCaseDoc/Title&$expand=OutLicensingBusinessCaseDoc,OutLicensingBusinessCase,Editor&$filter=OutLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";
 
     var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,OutLicensingBusinessCase/Id,OutLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,OutLicensingBusinessCase/Id,File&$filter=OutLicensingBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";


    var urlColl = [strOutLicensingBusinessCaseUrl, strOutLicensingLaunchDetailsUrl, strOutLicensingSKUDetailsUrl, strBusinessCaseOLDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strOutLicensingCommentsWorkflowHistoryUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strOutLicensingCommentsWorkflowHistoryUrl2,strBusinessCaseOLSupportingDocumentURL ];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.OutLicensingBusinessCaseColl = batchedData[0].d.results;
        $scope.OutLicensingLaunchDetailsColl = batchedData[1].d.results;
        $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results;
        $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.OutLicensingCommentsWorkflowHistoryColl = batchedData[6].d.results;        
        $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl =batchedData[7].d.results;
        $scope.OutLicensingCommentsWorkflowHistoryColl2 =batchedData[8].d.results;
        $scope.OutLicensingSupportingDocColl =batchedData[9].d.results;




        $scope.isLoading = false;
// for username
$scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 

        if ($scope.OutLicensingBusinessCaseColl.length > 0 || $scope.OutLicensingLaunchDetailsColl.length > 0 || $scope.OutLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseOLDocumentLinkColl.length >= 0 ) {

            $scope.Businesscasename = $scope.OutLicensingBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.OutLicensingBusinessCaseColl[0].Title;
            //$scope.Businesscaseid=$scope.OutLicensingBusinessCaseColl[0].BusinessCaseID;
            $scope.InitiationDate = new Date($scope.OutLicensingBusinessCaseColl[0].InitiationDate);
            $scope.ddlProductCategory = $scope.OutLicensingBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.OutLicensingBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.OutLicensingBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.OutLicensingBusinessCaseColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.OutLicensingBusinessCaseColl[0].CaseStatus;
            $scope.CurrentStatus= $scope.OutLicensingLaunchDetailsColl[0].CurrentStatus;

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
            
           /* if($scope.OutLicensingBusinessCaseColl.length>0){
            
		            for(var a=0;a<$scope.OutLicensingBusinessCaseColl.length;a++){
		            $scope.OutLicensingBusinessCaseColl[a].Created= $scope.OutLicensingBusinessCaseColl[a].Created;
		            $scope.OutLicensingBusinessCaseColl[a].Author= $scope.OutLicensingBusinessCaseColl[a].Author.Title
		            
		            }
		            else{
		           $scope.OutLicensingBusinessCaseColl="";
		           }
		            
            }*/

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
            
              if($scope.BusinessCaseOLDocumentLinkColl[0].LapVersion ==undefined || $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion =="" || $scope.BusinessCaseOLDocumentLinkColl[0].LapVersion ==null)
                {                    		
        		$scope.counter=0;        
        		$scope.counter = parseInt($scope.counter);
        		//$scope.LapV = "V" +"-" + $scope.counter;// 		
        		$scope.LapV = "V" + $scope.counter;// 		
        		
        		}
 
 			 if ($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl.length; s++) {
                 
                var cv=parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                var casestg=$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                var lapvrsion= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
               var vrsionType= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].VersionType;
              


        var FilteredData= $filter('filter')($scope.OutLicensingCommentsWorkflowHistoryColl2, function (item) {
            return (item.CaseStage== casestg && item.VersionNo== cv) ;
        });
        
        
          var docFilteredData= $filter('filter')($scope.OutLicensingSupportingDocColl, function (item) {
            return ( item.OutLicensingBusinessCase.Id== $scope.IntiateID && item.CaseVersion== cv) ; //Arvind item.CaseStage.Title== casestg &&
        });

        $scope.MemberType="Initiator";
       
        $scope.FileArry=[];
         if(docFilteredData.length>0){
        for(var c=0;c<docFilteredData.length;c++){
  	  		var col={};
  	  		col.FinalAttachData=docFilteredData[c].File.Name;
  	  		col.FinalCaseStage=docFilteredData[c].CaseStage.Title;
            col.Comment=$scope.CommentsWorkflowHistory
            col.MemberType=$scope.MemberType 


  	  		col.FinalAttachDataRel=docFilteredData[c].File.ServerRelativeUrl;		
			 $scope.FileArry.push(col);

   		}
   		$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData=$scope.FileArry

   		}
   		else
   		{
   		$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachData="";
   		$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel="";

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
       
        

        
        
      
         if(lapvrsion=='null' || casestg=='undefined')        
        {
	        lapvrsion='V0';
	        casestg='Initiated';
  	$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

        //	$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

        }
          
        		
        if(FilteredData.length>0)
        {
       	$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

		//$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }
        
        else
        {
                $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }                
               	
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].DocID = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].ID;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].LapVersion = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].LapVersion;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].CaseVersion = parseFloat($scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].CaseStage = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].VersionType = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].VersionType;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].Fname = $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.Name;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].Author= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Author.Title; 
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].CaseStage= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].Created= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Created;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].Editor= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Editor.Title;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].Modified;
            $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;

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
        for (var i = 0; i < $scope.OutLicensingLaunchDetailsColl.length; i++) {
            $scope.OutLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.OutLicensingSKUDetailsColl, function (responseLine) {

                return responseLine.OutLicensingLaunchDetail.Id == $scope.OutLicensingLaunchDetailsColl[i].Id;
            });
        }

    });


    $scope.onChangeStage = function (stgId) {

        // $scope.filteredStageColl =  $filter('filter')($scope.ChangeCaseStageColl, function (itemId) {
        //     return itemId.Id ==stgId;
        //     // return itemId.StageId ==stgId;
        // });

        // $scope.chngStgIntId=$scope.filteredStageColl[0].Id;
        // if($scope.filteredStageColl.length>0)
        // {
        //     $scope.ChagneBusinesscaseStage=$scope.filteredStageColl[0].Id

        //     if($scope.filteredStageColl[0].Title=="Minor")
        // 	{

        // 	$scope.Showbtn=true;
        // 	}
        // 	else
        // 	{
        // 	$scope.Showbtn=false;
        // 	}
        // }	
        
        // arvind
    
         $scope.filteredStageColl4 = $filter('filter')($scope.OutLicensingBusinessCaseColl, function (itemId) {
            return itemId.Id==$scope.BusinessCaseOLDocumentLinkColl[0].OutLicensingBusinessCaseId;
        });
        
        //
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
    
     $scope.openDocVersionHistory = function(filedata){
			        Logics.openDocumentVersionHistory(filedata);
			    }

    var fileCounter = 0;
    
    


    $scope.onInitiationSubmit = function () {

        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
            return false;
        }
		if ($scope.BcAttachFileNew!= null && $scope.BcAttachFileNew!= undefined && $scope.BcAttachFileNew!= "") {
			var regex = /^[^*|\"<>{}`\\()';@&$]+$/;
                var isValid = regex.test($scope.BcAttachFileNew[0].name);
			if (!isValid) {
			    alert("Attach Supporting documents should not contains special characters.");
			    return false;
			}
       	}
       	else
       	
       	


        // if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
        //     alert("Please Enter Initiator Comments ")
        //     return false;
        // }


        //Status UPDATE ACCORDING TO STAGE CHANGE 

        // if ($scope.filteredStageColl[0].Title == "Under Review") {
        //     $scope.CaseStatus = "Review Submitted"

        // }
        if ($scope.filteredStageColl[0].Title == "Data Input Stage") {
            $scope.CaseStatus = "Data Input Stage"

        }
        if ($scope.filteredStageColl[0].Title == "Under Internal Review") {
            $scope.CaseStatus = "Under Internal Review"

        }
        if ($scope.filteredStageColl[0].Title == "Under Validation") {
            $scope.CaseStatus = "Sent For Validation"

        }
        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes"


        }
        if ($scope.filteredStageColl[0].Title == "Ready for ELT Review") {
        alert('Please lock the final business case version for ELT review')
            $scope.CaseStatus = "Ready for ELT Review"

        }
        if ($scope.filteredStageColl[0].Title == "Under ELT Review") {
            $scope.CaseStatus = "Under ELT Review"


        }
        if ($scope.filteredStageColl[0].Title == "ELT Review-Approved") {
            $scope.CaseStatus = "Business Case Published"

        }
        
      $scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType:"Initiator Comments",
            VersionNo: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            OutLicensingBusinessCaseId: $scope.OutLicensingBusinessCaseColl[0].Id,
            OutLicensingBusinessCaseDocId: $scope.BusinessCaseOLDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "ELT Review-Approved") {
            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.OutLicensingBusinessCaseListItem"
                },

                CaseStatus: $scope.CaseStatus,
                VersionNo:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)
                

            }
            if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
                $scope.UploadSupportingAttachment();
            }
            
        } 
        // else if($scope.filteredStageColl[0].Title == "Minor Changes"){
        //     var BcChangeStage = {

        //         __metadata: {
        //             type: "SP.Data.OutLicensingBusinessCaseListItem"
        //         },

        //         CaseStatus: $scope.CaseStatus,
        //         VersionNo:(parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
                

        //     }

        // }
        else {

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.OutLicensingBusinessCaseListItem"
                },

                CaseStageId: $scope.chngStgIntId,
                CaseStatus: $scope.CaseStatus,
                VersionNo:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


                //$scope.ChagneBusinesscaseStage  


            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
           
			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=CaseStage,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq "+ $scope.IntiateID+"&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                   
                  if($scope.filteredStageColl[0].Title == "ELT Review-Approved"){
                  
	                   var objLapVer=$scope.BusinessCaseOLDocumentLinkColl[0].LapVersion;
	        		//objLapVer=objLapVer.split("-");
	        		//objLapVer=objLapVer[1];
	        		//objLapVer=parseInt( objLapVer) + 1;
	        		objLapVer= objLapVer.charAt(1);
	        		objLapVer=parseInt(objLapVer) + 1;
	        		$scope.LapV = "V" + objLapVer

                  
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major",
                        VersionDescription:$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[0].FinalVersion
                    };
                    }
                    else{
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc//$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[0].FinalVersion
                    };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);                         
                        
                            if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
         					   $scope.UploadSupportingAttachment();
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorLP");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorLP");
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
        
        var name=$scope.BusinessCaseOLDocumentLinkColl[0].File.Name;

        $scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            OutLicensingBusinessCaseId: $scope.OutLicensingBusinessCaseColl[0].Id,
             DescriptionType:"Initiator Comments",
            OutLicensingBusinessCaseDocId:  $scope.BusinessCaseOLDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"



            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.OutLicensingBusinessCaseListItem"
                },

                // CaseStageId:$scope.chngStgIntId 

                //$scope.ChagneBusinesscaseStage     
                CaseStatus: $scope.CaseStatus,
                VersionNo: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)



            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion+0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseOLDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=CaseStage,OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,                        
                        VersionType: "Minor",
                        VersionDescription:$scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
          //  $scope.UploadSupportingAttachment()
          
          
          //arvind             

      						 $scope.UploadSupportingAttachment2();
                            //$scope.UploadAttachment2($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorLP");

                            //);
                        } 
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorLP");
                        }
                    });
                    
                  
                });
            });

        });




    }
    //NEW SUPPORT ATTACHE
      $scope.UploadSupportingAttachment = function () 
      {
    var deferred = $q.defer();
    var invFile =document.getElementById("fileAttachSupport").files.length;
    var noOfSupportingDocs = 0;

    var webUrl = _spPageContextInfo.webAbsoluteUrl;
    var documentLibrary = "OutLicenseSupportingDocument";
    var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + documentLibrary;

    for (var i = 0; i < invFile; i++) {
      var fileName = document.getElementById("fileAttachSupport").files[i].name;
      var DocFileName=fileName;
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
      var ext = fileName.split(".");
      ext = ext[ext.length - 1].toLowerCase();
      var ext1 = "." + ext;
      fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");

      var url = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";
      Logics.uploadFile(url, document.getElementById("fileAttachSupport").files[i]).then(function (docData) 
      {
        //update meta data
        var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
        var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          , OutLicensingBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)+1).toFixed(1)
                      
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
    //

    // var deferred = $q.defer();
    // $scope.UploadAttachment = function (IntiateID) {
    //     if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
    //         var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
    //         Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {
    //             // var regex = /^[A-Za-z0-9 ]+$/;
    //             // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
    //             var regex = /^[^*|\"<>{}`\\()';@&$]+$/;
    //             //var regex = /\.([^.]*?)(?=\?|#|$)/;

    //             var isValid = regex.test($scope.BcAttachFileNew[0].name);
    //             if (!isValid) {
    //                 alert("Attach Supporting documents should not contains special characters.");
    //                 return isValid;
    //             }

    //             console.log(BCAttachmentResponse);
    //             fileCounter++;
    //             if (fileCounter < $scope.BcAttachFileNew.length) {
    //                 $scope.UploadAttachment(IntiateID)
    //             } else {
    //                 deferred.resolve(null);
    //             }
    //         });

    //     } else {
    //         deferred.resolve(null);
    //     }
    //     return deferred.promise;
    // }

    //  $scope.bindSChgstage= function (ChagneBusinesscaseStage) {
    //  $scope.getbindSChgstage = $scope.CaseStageColl.filter(function (item) {
    //    return (item.StageId == $scope.ChagneBusinesscaseStage);
    //});
    // }
    
    
    // Minor-Attachments--
    
    
     //NEW SUPPORT ATTACHE
      $scope.UploadSupportingAttachment2 = function () 
      {
    var deferred = $q.defer();
    var invFile =document.getElementById("fileAttachSupport").files.length;
    var noOfSupportingDocs = 0;

    var webUrl = _spPageContextInfo.webAbsoluteUrl;
    var documentLibrary = "OutLicenseSupportingDocument";
    var targetUrl = _spPageContextInfo.webServerRelativeUrl + "/" + documentLibrary;

    for (var i = 0; i < invFile; i++) {
      var fileName = document.getElementById("fileAttachSupport").files[i].name;
      var DocFileName=fileName;
      var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds  
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(":", "").slice(0, -2).replace(":", "").slice(0, -3).replace(".", "");
      var ext = fileName.split(".");
      ext = ext[ext.length - 1].toLowerCase();
      var ext1 = "." + ext;
      fileName = fileName.replace(ext1, "" + localISOTime + "" + ext1 + "");

      var url = webUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + fileName + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";
      Logics.uploadFile(url, document.getElementById("fileAttachSupport").files[i]).then(function (docData) 
      {
        //update meta data
        var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
        var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          , OutLicensingBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(parseFloat($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion)+0.1).toFixed(1)
                      
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
    //

    
    
    

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorLP");

    }



});