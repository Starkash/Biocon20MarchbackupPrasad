appOperations.controller("ChangeStageILCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorILDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];
    var strInLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription, LapVersion,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,Initiators,Reviewers,Validators,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingBusinessCase&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Pack,SkuUnit/Id,SkuUnit/Title,PackingType/Id,PackingType/Title,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase,PackingType,SkuUnit,InLicensingLaunchDetail&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('InLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseILDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingBusinessCaseId,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage.Title + "'&$top=5000&$orderby=ID asc";
    var strInLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,DescriptionType,InLicensingBusinessCaseDoc/Id,InLicensingBusinessCaseDoc/Title&$expand=InLicensingBusinessCaseDoc,InLicensingBusinessCase,Editor&$filter=InLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";

    var strBusinessCaseILDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,InLicensingBusinessCaseId,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strInLicensingCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,DescriptionType,InLicensingBusinessCaseDoc/Id,InLicensingBusinessCaseDoc/Title&$expand=InLicensingBusinessCaseDoc,InLicensingBusinessCase,Editor&$filter=InLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";
 
     var strBusinessCaseILSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,InLicensingBusinessCase/Id,File&$filter=InLicensingBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";

     var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
     var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
     var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
     
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

     
    var urlColl = [strInLicensingBusinessCaseUrl, strInLicensingLaunchDetailsUrl, strInLicensingSKUDetailsUrl, strBusinessCaseILDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strInLicensingCommentsWorkflowHistoryUrl,strBusinessCaseILDocumentLinkUrlWorkFlow,strInLicensingCommentsWorkflowHistoryUrl2,strBusinessCaseILSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.InLicensingBusinessCaseColl = batchedData[0].d.results;
        $scope.InLicensingLaunchDetailsColl = batchedData[1].d.results;
        $scope.InLicensingSKUDetailsColl = batchedData[2].d.results;
        $scope.BusinessCaseILDocumentLinkColl = batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.InLicensingCommentsWorkflowHistoryColl = batchedData[6].d.results;        
        $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl1=batchedData[7].d.results;
        $scope.InLicensingCommentsWorkflowHistoryColl2 =batchedData[8].d.results;
        $scope.InLicensingSupportingDocColl =batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        $scope.ProductMasterColl= batchedData[13].d.results;



$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl=  $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl1;



        $scope.isLoading = false;
        if($scope.InLicensingBusinessCaseColl.length>0){
            if ($scope.InLicensingBusinessCaseColl[0].CaseStatus == 'Data To Be Rework' && $scope.InLicensingBusinessCaseColl[0].CaseStage.Title == 'Under Validation') {
                var array = [];
    
                for (var i = 0; i < $scope.ChangeCaseStageColl.length; i++) {
                    array.push($scope.ChangeCaseStageColl[i]);
    
                }
                for (var j = 0; j < array.length; j++) {
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
$scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 

        if ($scope.InLicensingBusinessCaseColl.length > 0 || $scope.InLicensingLaunchDetailsColl.length > 0 || $scope.InLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseILDocumentLinkColl.length >= 0 ) {

            $scope.Businesscasename = $scope.InLicensingBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.InLicensingBusinessCaseColl[0].Title;
            //$scope.Businesscaseid=$scope.InLicensingBusinessCaseColl[0].BusinessCaseID;
         //   $scope.InitiationDate = new Date($scope.InLicensingBusinessCaseColl[0].InitiationDate);
          
          
          
            $scope.InitiationDate = new Date($scope.InLicensingBusinessCaseColl[0].InitiationDate)
          
            var date = new Date($scope.InitiationDate);
            var year = date.getFullYear();
            var month = date.toLocaleString('default', { month: 'short' }); // Get short month name
            $scope.InitiationDate = month + ' - ' + year;

            $scope.ddlProductCategory = $scope.InLicensingBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.InLicensingBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.InLicensingBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.InLicensingBusinessCaseColl[0].SubStrategy.Title;
            $scope.CaseStatus = $scope.InLicensingBusinessCaseColl[0].CaseStatus;
            $scope.CurrentStatus= $scope.InLicensingLaunchDetailsColl[0].CurrentStatus.Title;

            $scope.BusinessCaseDescription = $scope.InLicensingBusinessCaseColl[0].BusinessCaseDescription;




            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;


            // Email

            $scope.InitiatorsGroupsName = [];
            $scope.ReviewersGroupsName = [];
            $scope.ValidatorsGroupsName = [];

            for (let m = 0; m < $scope.InLicensingBusinessCaseColl[0].Initiators.results.length; m++) {
                $scope.InitiatorsGroupsName.push($scope.InLicensingBusinessCaseColl[0].Initiators.results[m].Title);
            }
            for (let m = 0; m < $scope.InLicensingBusinessCaseColl[0].Reviewers.results.length; m++) {
                $scope.ReviewersGroupsName.push($scope.InLicensingBusinessCaseColl[0].Reviewers.results[m].Title);
            }
            for (let m = 0; m < $scope.InLicensingBusinessCaseColl[0].Validators.results.length; m++) {
                $scope.ValidatorsGroupsName.push($scope.InLicensingBusinessCaseColl[0].Validators.results[m].Title);
            }

            //

            if($scope.InLicensingCommentsWorkflowHistoryColl.length>0)
           
				{
				 $scope.InitiatorComments1= $scope.InLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
				 }
			$scope.Editor = $scope.InLicensingBusinessCaseColl[0].Editor.Title;
            // $scope.ddlmarket=$scope.InLicensingLaunchDetailsColl[0].Market.Title;
            // $scope.ddlsubmarket=$scope.InLicensingLaunchDetailsColl[0].SubMarket.Title;
            // $scope.ddlCountry=$scope.InLicensingLaunchDetailsColl[0].Country.Title;
            // $scope.loedate= new Date($scope.InLicensingLaunchDetailsColl[0].LOEDate);
            // $scope.fillingdate= new Date($scope.InLicensingLaunchDetailsColl[0].FillingDate);
            // $scope.launchdate= new Date($scope.InLicensingLaunchDetailsColl[0].LaunchDate);
            // $scope.fillingdate= new Date($scope.InLicensingLaunchDetailsColl[0].FillingDate);
            // $scope.partner=$scope.InLicensingLaunchDetailsColl[0].Partner.Title;
            // $scope.partnerdetails=$scope.InLicensingLaunchDetailsColl[0].PartnerDetails;
            // $scope.currency=$scope.InLicensingLaunchDetailsColl[0].Currency;
            // $scope.currentstatus=$scope.InLicensingLaunchDetailsColl[0].CurrentStatus;  
            $scope.Modified = new Date($scope.InLicensingBusinessCaseColl[0].Modified);
            
           /* if($scope.InLicensingBusinessCaseColl.length>0){
            
		            for(var a=0;a<$scope.InLicensingBusinessCaseColl.length;a++){
		            $scope.InLicensingBusinessCaseColl[a].Created= $scope.InLicensingBusinessCaseColl[a].Created;
		            $scope.InLicensingBusinessCaseColl[a].Author= $scope.InLicensingBusinessCaseColl[a].Author.Title
		            
		            }
		            else{
		           $scope.InLicensingBusinessCaseColl="";
		           }
		            
            }*/

            if ($scope.InLicensingBusinessCaseColl[0].CaseStage != undefined && $scope.InLicensingBusinessCaseColl[0].CaseStage != '' && $scope.InLicensingBusinessCaseColl[0].CaseStage != null)

            {
                $scope.CaseStage = $scope.InLicensingBusinessCaseColl[0].CaseStage.Title;

            }

            if ($scope.InLicensingBusinessCaseColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.InLicensingBusinessCaseColl[0].DosageForm.results.length; p++) {

                    $scope.DosageForm += $scope.InLicensingBusinessCaseColl[0].DosageForm.results[p].Title + ',';
                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);
            }
            if ($scope.BusinessCaseILDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.BusinessCaseILDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.BusinessCaseILDocumentLinkColl[0].Title;
                $scope.MinorV = parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major";

                } else {
                    $scope.VersionFlag = "Minor";
                }
            }
            
              if($scope.BusinessCaseILDocumentLinkColl[0].LapVersion ==undefined || $scope.BusinessCaseILDocumentLinkColl[0].LapVersion =="" || $scope.BusinessCaseILDocumentLinkColl[0].LapVersion ==null)
                {                    		
        		$scope.counter=0;        
        		$scope.counter = parseInt($scope.counter);
        		//$scope.LapV = "V" +"-" + $scope.counter;// 		
        		$scope.LapV = "V" + $scope.counter;// 		
        		
        		}
 
 			 if ($scope.BusinessCaseILDocumentLinkUrlWorkFlowColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl.length; s++) {
                 
                var cv=parseFloat($scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
                var casestg=$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
                var lapvrsion= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].LapVersion;
               var vrsionType= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].VersionType;
              


        var FilteredData= $filter('filter')($scope.InLicensingCommentsWorkflowHistoryColl2, function (item) {
            return (item.CaseStage== casestg && item.VersionNo== cv) ;
        });
        
        
          var docFilteredData= $filter('filter')($scope.InLicensingSupportingDocColl, function (item) {
            return (item.InLicensingBusinessCase.Id== $scope.IntiateID && item.CaseVersion== cv) ;
        });
        $scope.FileArry=[];
         if(docFilteredData.length>0){
        for(var c=0;c<docFilteredData.length;c++){
  	  		var col={};
  	  		col.FinalAttachData=docFilteredData[c].File.Name;
  	  		col.FinalCaseStage=docFilteredData[c].CaseStage.Title;

  	  		//col.FinalAttachDataRel=docFilteredData[c].File.ServerRelativeUrl;		
                col.FinalAttachDataRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + docFilteredData[c].File.ServerRelativeUrl;

			 $scope.FileArry.push(col);

   		}
   		$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalAttachData=$scope.FileArry

   		}
   		else
   		{
   		$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalAttachData="";
   		$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalAttachDataRel="";

   		}
      /*  $scope.AttachColl=[];
        if(docFilteredData.length>0){
	        for(var w=0;w<docFilteredData.length;w++)
	        {
	        var attach={};
	        attach.DocAttachFName=docFilteredData[w].File.Name
			attach.DocAttachRelURl=docFilteredData[w].File.ServerRelativeUrl
			//$scope.AttachColl.push(attach);
			 $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl.push(attach);
	          
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
  	$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

        //	$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + FilteredData[0].vrsionType;

        }
          
        		
        if(FilteredData.length>0)
        {
            if(FilteredData[0].CommentsWorkflowHistory ==null)
            {
                FilteredData[0].CommentsWorkflowHistory='NA'
                
            }
       	$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalVersion=" Case Stage - "+FilteredData[0].CaseStage+" ; "+" Comment - "+FilteredData[0].CommentsWorkflowHistory +";"+" Member Type - "+ FilteredData[0].MemberType+";"+" Version Type  - " + vrsionType;

		//$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }
        
        else
        {
                $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].FinalVersion= " Case Stage - "+casestg+";"+"  Version Type - "+vrsionType;
        }                
               	
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].DocID = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].ID;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].LapVersion = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].LapVersion;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].CaseVersion = parseFloat($scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].CaseVersion).toFixed(1);
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].CaseStage = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].CaseStage;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].VersionType = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].VersionType;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Fname = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.Name;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Author= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Author.Title; 
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].CaseStage= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].CaseStage.Title;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Created= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Created;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Editor= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Editor.Title;
            
            
            
            
            
            
var inputDate = $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified;
// Convert input date string to Date object
var dateObject = new Date(inputDate);

// Format the date using the date filter
$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified = $filter('date')(dateObject, 'MMM d,yyyy h:mm:ss a');


$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified;




            
            
            
            
       //     $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified;
            
            
          //  $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl = "";
            }
            
            if ($scope.BusinessCaseILDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseILDocumentLinkColl.length; s++) {
                    $scope.BusinessCaseILDocumentLinkColl[s].DocID = $scope.BusinessCaseILDocumentLinkColl[s].ID;
                    $scope.BusinessCaseILDocumentLinkColl[s].Fname = $scope.BusinessCaseILDocumentLinkColl[s].File.Name;
                    $scope.BusinessCaseILDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseILDocumentLinkColl = "";
            }
        }
        for (var i = 0; i < $scope.InLicensingLaunchDetailsColl.length; i++) {
            $scope.InLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.InLicensingSKUDetailsColl, function (responseLine) {

                return responseLine.InLicensingLaunchDetail.Id == $scope.InLicensingLaunchDetailsColl[i].Id;
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
        
         $scope.filteredStageColl4 = $filter('filter')($scope.InLicensingBusinessCaseColl, function (itemId) {
            return itemId.Id==$scope.BusinessCaseILDocumentLinkColl[0].InLicensingBusinessCaseId;
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
    
    $scope.MemberType="Initiator";


    $scope.InitiatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/InitiatorILDash";
    $scope.ReviewerDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ReviewerILDash";
    $scope.ValidatorDashboard = _spPageContextInfo.webAbsoluteUrl+"/SitePages/BusinessCase.aspx#!/ValidatorILDash";





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
    
     if( $scope.BusinessCaseILDocumentLinkColl.length==0){
       
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

     //   $scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
       //   $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;
       $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'

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

        
      
        
        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType:"Initiator Comments",
            VersionNo: (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),

            InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
            InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        // if ($scope.filteredStageColl[0].Title == "Minor Changes")  {
        //     var BcChangeStage = {

        //         __metadata: {
        //             type: "SP.Data.InLicensingBusinessCaseListItem"
        //         },

        //         CaseStatus: $scope.CaseStatus,
        //         VersionNo:(parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)
                

        //     }
        // // } 
        //  if($scope.filteredStageColl[0].Title == "ELT Review-Approved"){

        //     var BcChangeStage = {

        //         __metadata: {
        //             type: "SP.Data.InLicensingBusinessCaseListItem"
        //         },

        //         CaseStatus: $scope.CaseStatus,
        //         VersionNo:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)
                

        //     }


        // }
        // else  {

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingBusinessCaseListItem"
                },

                CaseStageId: $scope.chngStgIntId,
                VersionNo:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                CaseStatus: $scope.CaseStatus,
                LapVersion :$scope.LapV  // LAP NEW 



                //$scope.ChagneBusinesscaseStage  


            }
       // }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
           
			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=CaseStage,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq "+ $scope.IntiateID+"&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                   
                    if($scope.filteredStageColl[0].Title == "Business Case Published"){
                  
	                   var objLapVer=$scope.BusinessCaseILDocumentLinkColl[0].LapVersion;

                    objLapVer= objLapVer.charAt(1);
	        		objLapVer=parseInt(objLapVer) + 1;
	        		$scope.LapV = "V" + objLapVer;
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major"
                    };


                    var LAPVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseListItem"
                        },
                     //   CaseVersion:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        // CaseStageId: $scope.chngStgIntId,
                        // VersionType: "Major"
                    };

                    var strInlicensingLaPUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";

                    Logics.updateData(strInlicensingLaPUrl, LAPVersion).then(function (Vresponse) {
                        console.log(Vresponse);   
                    });





                    }
                    else{
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major",
                        VersionDescription:$scope.VersionDesc
                    };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);   
                        
                        //Email
                        
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
                        //     + "<a href='" + _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ViewOutLicensing/" + $scope.InLicensingBusinessCaseColl[0].Id + "/" + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[0].DocID + "' target='_New'>here</a>"
                        //     + " to open business case document";

                        // Logics.sendEmailToGroups($scope.ReviewersGroupsName, [], emailSubject, emailBody);

                        //
                        
                            if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
         					   $scope.UploadSupportingAttachment()
                            //$scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorILDash");

                            //);
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorILDash");
                        }
                    });
                    
                  
                });
            });

        });

    }

    $scope.onCreateVersion = function () {



 if( $scope.BusinessCaseILDocumentLinkColl.length==0){
       
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
        
        var name=$scope.BusinessCaseILDocumentLinkColl[0].File.Name;
       // $scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        
      //  $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
             DescriptionType:"Initiator Comments",
            InLicensingBusinessCaseDocId:  $scope.BusinessCaseILDocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"



            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingBusinessCaseListItem"
                },

                // CaseStageId:$scope.chngStgIntId 

                //$scope.ChagneBusinesscaseStage     
                CaseStatus: $scope.CaseStatus,
                LapVersion: $scope.LapV,
                VersionNo:(parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)




            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion+0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=CaseStage,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,                        
                        VersionType: "Minor",
                        VersionDescription:$scope.VersionDesc
                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
          //  $scope.UploadSupportingAttachment()
          
          
          //arvind             
       

      						 $scope.UploadSupportingAttachment2()
                            //$scope.UploadAttachment2($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorILDash");

                            //);
                        } 
                        else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorILDash");
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
    var documentLibrary = "InLicenseSupportingDocument";
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
        var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
        var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          , InLicensingBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion)+1).toFixed(1)
                      
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
    //         var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
    var documentLibrary = "InLicenseSupportingDocument";
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
        var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
        var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          , InLicensingBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion)+0.1).toFixed(1)
                      
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
        $location.path("/InitiatorILDash");

    }



});