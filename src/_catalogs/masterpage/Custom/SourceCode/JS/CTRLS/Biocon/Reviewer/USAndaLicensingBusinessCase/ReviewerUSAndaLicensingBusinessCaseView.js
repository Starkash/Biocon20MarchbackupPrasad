
appOperations.controller("ReviewerUSAndaLicensingBusinessCaseViewCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $window, $routeParams) {

   
    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerUSANDADash');
    } else   {
       // $scope.BcInitiateDetails = Logics.setSharingDataTwoDash();
        $scope.BcInitiateDetails = Logics.getSharedDataTwoDash();
        $scope.IntiateID = $scope.BcInitiateDetails[0].ID;
    }

    
        // New Change VD Start
   var dashboard=localStorage.getItem("dashboard"); 
   var Value=localStorage.getItem("Value");
   if(Value=="" && dashboard=="ReviewerUSANDADash")
   {
       $location.path('/ReviewerMultipleDash'); 
   }
   else if(Value=="" && dashboard=="ELTReviewerAPIDash")
   {
       $location.path('/ELTReviewerUSANDADashboard'); 
   }
   localStorage.setItem("Value", "");
   // New Change VD End



    $scope.ChangeStagebc = [];
    var strUSAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,LapVersion,Modified,Editor/Id,Editor/Title,BusinessCaseName,LOEDate,LaunchDateUS,FillingDate,NoofGenericFilers,FilingType/Id,FilingType/Title,Innovator/Id,Innovator/Title,CurrentStatus/Id,CurrentStatus/Title,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Market/Id,Market/Title,Country/Id,Country/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=FilingType,Innovator,CurrentStatus,Strategy,Editor,Market,Country,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
     //var strUSAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?&$select=Id,Title,Modified,LapVersion,FillingDate,NoofGenericFilers,FilingType/Id,FilingType/Title,Innovator/Id,Innovator/Title,CurrentStatus/Id,CurrentStatus/Title,Editor/Id,Editor/Title,BusinessCaseName,LOEDate,LaunchDateUS,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Market/Id,Market/Title,Country/Id,Country/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,Market,Country,CaseStage,SubStrategy,FilingType,Innovator,CurrentStatus,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=Modified desc";
 
     var strUSAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaSKUDetails')/items?&$select=Id,Title,Modified,Quantity,SkuUnit/Id,SkuUnit/Title,Pack,PackingType/Id,PackingType/Title,USAndaBusinessCase/Id,USAndaBusinessCase/Title&$expand=SkuUnit,PackingType,USAndaBusinessCase&$filter=USAndaBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
 
     // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('OutLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
     // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
     var strBusinessCaseUSAndaDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaBusinessCaseDocuments')/items?$select=Id,Title,Modified,LapVersion,CaseVersion,CaseStage/Id,CaseStage/Title,USAndaBusinessCaseId,USAndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,CaseStage,USAndaBusinessCase&$filter=USAndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
 
     var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";
 
     var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails[0].CaseStage.Title + "'&$top=5000&$orderby=ID asc";
     var strUSAndaCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,USAndaBusinessCase/Id,USAndaBusinessCase/Title,DescriptionType,USAndaBusinessCaseDoc/Id,USAndaBusinessCaseDoc/Title&$expand=USAndaBusinessCaseDoc,USAndaBusinessCase,Editor&$filter=USAndaBusinessCase/Title eq '" + $scope.BcInitiateDetails[0].Title + "'&$top=1&$orderby=Modified desc";
 
     var strBusinessCaseUSAndaDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,USAndaBusinessCaseId,USAndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,USAndaBusinessCase&$filter=USAndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
     var strUSAndaCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,USAndaBusinessCase/Id,USAndaBusinessCase/Title,DescriptionType,USAndaBusinessCaseDoc/Id,USAndaBusinessCaseDoc/Title&$expand=USAndaBusinessCaseDoc,USAndaBusinessCase,Editor&$filter=USAndaBusinessCase/Title eq '" + $scope.BcInitiateDetails[0].Title + "'&$top=1000&$orderby=Modified desc";
  
      var strBusinessCaseUSAndaSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,USAndaBusinessCase/Id,USAndaBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,USAndaBusinessCase/Id,File&$filter=USAndaBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
 
      var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
      var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
      var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
  
      var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
 
     
      var strInnovatorMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InnovatorMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading
 
      var strFillingTypeMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FillingTypeMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading
  
      var strCurrentStatusUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=1000&$orderby=ID"; // cascading
      
 
      var strUSAndaBusinessCaseUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,LOEDate,LaunchDateUS,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,Market/Id,Market/Title,Country/Id,Country/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,Market,Country,CaseStage,Validators,Reviewers,Initiators,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
 
  
 
     var urlColl = [strUSAndaBusinessCaseUrl,  strUSAndaSKUDetailsUrl, strBusinessCaseUSAndaDocumentLinkUrl, strStageMasterUrl, strChangeStageMasterUrl, strUSAndaCommentsWorkflowHistoryUrl,strBusinessCaseUSAndaDocumentLinkUrlWorkFlow,strUSAndaCommentsWorkflowHistoryUrl2,strBusinessCaseUSAndaSupportingDocumentURL, strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl,strInnovatorMasterUrl,strFillingTypeMasterUrl,strCurrentStatusUrl,strUSAndaBusinessCaseUrl2];
 
 
 
     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
 
         $scope.AndaBusinessCaseColl = batchedData[0].d.results;
     
         $scope.AndaSKUDetailsColl = batchedData[1].d.results;
         $scope.BusinessCaseANDADocumentLinkColl = batchedData[2].d.results;  //arvind
         $scope.CaseStageColl = batchedData[3].d.results;
         $scope.ChangeCaseStageColl = batchedData[4].d.results;
         $scope.AndaCommentsWorkflowHistoryColl = batchedData[5].d.results;        
         $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl =batchedData[6].d.results;
         $scope.AndaCommentsWorkflowHistoryColl2 =batchedData[7].d.results;
         $scope.AndaSupportingDocColl =batchedData[8].d.results;
 
         $scope.PackingMasterColl = batchedData[9].d.results;
         $scope.CurrentStatusMasterColl = batchedData[10].d.results;
         $scope.CurrencyMasterColl = batchedData[11].d.results;
         $scope.ProductMasterColl= batchedData[12].d.results;
 
 
         $scope.InnovatorColl = batchedData[13].d.results;
         $scope.FillingTypeColl = batchedData[14].d.results;
 
      $scope.StatusColl = batchedData[15].d.results;
      $scope.AndaBusinessCaseColl2 = batchedData[16].d.results;
 
 
 
 
 
         $scope.isLoading = false;
 
         if($scope.AndaBusinessCaseColl.length>0){
             if ($scope.AndaBusinessCaseColl[0].CaseStatus == 'Data To Be Rework' && $scope.AndaBusinessCaseColl[0].CaseStage.Title == 'Under Validation') {
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
 
 // Email code
 
         $scope.InitiatorsGroupsName = [];
         $scope.ReviewersGroupsName = [];
         $scope.ValidatorsGroupsName = [];
 
         for (let m = 0; m < $scope.AndaBusinessCaseColl2[0].Initiators.results.length; m++) {
             $scope.InitiatorsGroupsName.push($scope.AndaBusinessCaseColl2[0].Initiators.results[m].Title);
         }
         for (let m = 0; m < $scope.AndaBusinessCaseColl2[0].Reviewers.results.length; m++) {
             $scope.ReviewersGroupsName.push($scope.AndaBusinessCaseColl2[0].Reviewers.results[m].Title);
         }
         for (let m = 0; m < $scope.AndaBusinessCaseColl2[0].Validators.results.length; m++) {
             $scope.ValidatorsGroupsName.push($scope.AndaBusinessCaseColl2[0].Validators.results[m].Title);
         }
 
 
 // for username
 $scope.CurrLogUserId=_spPageContextInfo.userDisplayName; 
 
         if ($scope.AndaBusinessCaseColl.length > 0 || $scope.AndaLaunchDetailsColl.length > 0 || $scope.AndaSKUDetailsColl.length > 0 || $scope.BusinessCaseANDADocumentLinkColl.length >= 0 ) {
 
             $scope.Businesscasename = $scope.AndaBusinessCaseColl[0].BusinessCaseName;
             $scope.Businesscaseid = $scope.AndaBusinessCaseColl[0].Title;
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
 
             
             $scope.ddlCountry = $scope.AndaBusinessCaseColl[0].Country.Title;
             $scope.ddlMarket = $scope.AndaBusinessCaseColl[0].Market.Title;

             $scope.BusinessCaseDescription = $scope.AndaBusinessCaseColl[0].BusinessCaseDescription;

 
             $scope.LOEDate = new Date($scope.AndaBusinessCaseColl[0].LOEDate);
             $scope.LaunchDateUS = new Date($scope.AndaBusinessCaseColl[0].LaunchDateUS);
 
 
 
 
 
             $scope.NoofGenericFilers = parseInt($scope.AndaBusinessCaseColl[0].NoofGenericFilers);
 
 
             $scope.ddlFillingType = $scope.AndaBusinessCaseColl[0].FilingType.Title;
 
             $scope.ddlFillingStatus = $scope.AndaBusinessCaseColl[0].CurrentStatus.Title;
 
             $scope.ddlInnovator = $scope.AndaBusinessCaseColl[0].Innovator.Title;
 
             $scope.FillingDate = new Date($scope.AndaBusinessCaseColl[0].FillingDate);
 
 
 
 
 
         
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
     
            $scope.Modified = new Date($scope.AndaBusinessCaseColl[0].Modified);
            
         

            if ($scope.AndaBusinessCaseColl[0].CaseStage != 'undefined' && $scope.AndaBusinessCaseColl[0].CaseStage != '' && $scope.AndaBusinessCaseColl[0].CaseStage != null)

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
            
              if($scope.BusinessCaseANDADocumentLinkColl[0].LapVersion ==undefined || $scope.BusinessCaseANDADocumentLinkColl[0].LapVersion =="" || $scope.BusinessCaseANDADocumentLinkColl[0].LapVersion ==null)
                {                    		
        		$scope.counter=0;        
        		$scope.counter = parseInt($scope.counter);
        		//$scope.LapV = "V" +"-" + $scope.counter;// 		
        		$scope.LapV = "V" + $scope.counter;// 		
        		
        		}
 
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
            return (item.USAndaBusinessCase.Id== $scope.IntiateID && item.CaseVersion== cv) ;
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
       
        

        
        
      
         if(lapvrsion=='null' || casestg=='undefined')        
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
            





            //$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].Modified;
         //   $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
         $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl = "";
            }
            
            if ($scope.BusinessCaseANDADocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseANDADocumentLinkColl.length; s++) {
                    $scope.BusinessCaseANDADocumentLinkColl[s].DocID = $scope.BusinessCaseANDADocumentLinkColl[s].ID;
                    $scope.BusinessCaseANDADocumentLinkColl[s].Fname = $scope.BusinessCaseANDADocumentLinkColl[s].File.Name;
                  //  $scope.BusinessCaseANDADocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseANDADocumentLinkColl[s].File.ServerRelativeUrl;
                    $scope.BusinessCaseANDADocumentLinkColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseANDADocumentLinkColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseANDADocumentLinkColl = "";
            }
        }
        
        

    });


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
        //alert('Please lock the final business case version for ELT review')
            $scope.CaseStatus = " Ready for ELT Review"

        }
        if ($scope.filteredStageColl[0].Title == "Under ELT Review") {
            $scope.CaseStatus = "Under ELT Review"


        }
         if ($scope.filteredStageColl[0].Title == "Business Case Published") {
            $scope.CaseStatus = "Business Case Published"

        }
       
        if ($scope.filteredStageColl[0].Title == "Business Case Rejected") {
            $scope.CaseStatus = "Business Case Rejected"

        }
        
       // $scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;

        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.USAndaCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            DescriptionType:"Initiator Comments",
            VersionNo: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
            USAndaBusinessCaseId: $scope.AndaBusinessCaseColl[0].Id,
            USAndaBusinessCaseDocId: $scope.BusinessCaseANDADocumentLinkColl[0].Id
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        // if ($scope.filteredStageColl[0].Title == "ELT Review-Approved") {
        //     var BcChangeStage = {

        //         __metadata: {
        //             type: "SP.Data.AndaBusinessCaseListItem"
        //         },

        //         CaseStatus: $scope.CaseStatus,
        //         VersionNo:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1)

                

        //     }
        //     if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
        //         $scope.UploadSupportingAttachment();
        //     }
            
        // } else {

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.USAndaBusinessCaseListItem"
                },

                CaseStageId: $scope.chngStgIntId,
                CaseStatus: $scope.CaseStatus,
                VersionNo:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1)



                //$scope.ChagneBusinesscaseStage  


            }
      //  }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //   var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/USAndaBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
           
			 var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseStage/Id,CaseStage/Title,CaseVersion,LapVersion,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=CaseStage,USAndaBusinessCase&$filter=USAndaBusinessCaseId eq "+ $scope.IntiateID+"&$orderby=Id desc&$top=1";
                //var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                   
                  if($scope.filteredStageColl[0].Title == "Business Case Published"){
                  
	                   var objLapVer=$scope.BusinessCaseANDADocumentLinkColl[0].LapVersion;
	        		//objLapVer=objLapVer.split("-");
	        		//objLapVer=objLapVer[1];
	        		//objLapVer=parseInt( objLapVer) + 1;
	        		objLapVer= objLapVer.charAt(1);
	        		objLapVer=parseInt(objLapVer) + 1;
	        		$scope.LapV = "V" + objLapVer

                  
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.USAndaBusinessCaseDocumentsItem"
                        },
                        CaseVersion:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major",
                        VersionDescription:$scope.VersionDesc//$scope.BusinessCaseANDADocumentLinkUrlWorkFlowColl[0].FinalVersion
                        
                    };
                    }
                    else{
                     var BcVersion = {
                        __metadata: {
                            type: "SP.Data.USAndaBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        LapVersion :$scope.LapV,
                        CaseStageId: $scope.chngStgIntId,
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc//$scope.BusinessCaseOLDocumentLinkUrlWorkFlowColl[0].FinalVersion

                    };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);                         
                        
                            if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
         					   $scope.UploadSupportingAttachment()
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
        
        var name=$scope.BusinessCaseANDADocumentLinkColl[0].File.Name;

        //$scope.VersionDesc= 'Case Stage'+$scope.chngStgIntTitle+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Minor"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.chngStgIntTitle + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Minor" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.USAndaCommentsWorkflowHistoryListItem"
            },
              CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.chngStgIntTitle,
            MemberType: $scope.MemberType,
            VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
          USAndaBusinessCaseId: $scope.AndaBusinessCaseColl[0].Id,
             DescriptionType:"Initiator Comments",
            USAndaBusinessCaseDocId:  $scope.BusinessCaseANDADocumentLinkColl[0].Id


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes-by Initiator"



            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.AndaBusinessCaseListItem"
                },

                // CaseStageId:$scope.chngStgIntId 

                //$scope.ChagneBusinesscaseStage     
                CaseStatus: $scope.CaseStatus,
                VersionNo: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1)




            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            //var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/USAndaBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion+0.1)).toFixed(1).toString() + ".xlsx";

            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseANDADocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,CaseStage/Id,CaseStage/Title,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=CaseStage,USAndaBusinessCase&$filter=USAndaBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.USAndaBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        CaseStageId: $scope.chngStgIntId,                        
                        VersionType: "Minor",
                        VersionDescription:$scope.VersionDesc//= $scope.chngStgIntTitle+','+$scope.CommentsWorkflowHistory+','+"Major"+','+ $scope.MemberType  ;        

                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
          //  $scope.UploadSupportingAttachment()
          
          
          //arvind             

      						 $scope.UploadSupportingAttachment2()
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
    var documentLibrary = "USAndaLicenseSupportingDocument";
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
     //   var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AndaLicenseSupportingDocument')/items("+docData.data.d.ListItemAllFields.ID+")";
     var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";

     var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          ,  AndaBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(Math.floor($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)+1).toFixed(1)
                      
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

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
            Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {
                // var regex = /^[A-Za-z0-9 ]+$/;
                // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
                var regex = /^[^*|\"<>{}`\\()';@&$]+$/;
                //var regex = /\.([^.]*?)(?=\?|#|$)/;

                var isValid = regex.test($scope.BcAttachFileNew[0].name);
                if (!isValid) {
                    alert("Attach Supporting documents should not contains special characters.");
                    return isValid;
                }

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
    var documentLibrary = "USAndaLicenseSupportingDocument";
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
       // var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('AndaLicenseSupportingDocument')/items("+docData.data.d.ListItemAllFields.ID+")";
       var strInvoiceDocUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaLicenseSupportingDocument')/items(" + docData.data.d.ListItemAllFields.ID + ")";
       var invoiceDocData = {
          __metadata: { 'type': docData.data.d.ListItemAllFields.__metadata.type }
          , 
        AndaBusinessCaseId:$scope.IntiateID,
          //  CaseVersion: (parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
            CaseStageId: $scope.chngStgIntId,
            CaseVersion:(parseFloat($scope.BusinessCaseANDADocumentLinkColl[0].CaseVersion)+0.1).toFixed(1)
                      
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
        
        if($scope.BcInitiateDetails[1]=="ELTReviewerAPIDash")
        {
            $location.path("/ELTReviewerUSANDADashboard");
        }
       else{
        $location.path("/ReviewerUSANDADash");
       }
       

    }



});