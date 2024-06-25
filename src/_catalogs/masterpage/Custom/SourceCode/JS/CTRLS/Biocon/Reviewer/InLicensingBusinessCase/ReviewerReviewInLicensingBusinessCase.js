/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/
appOperations.controller("ReviewerReviewInLicensingBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/ReviewerILDash');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }


    $scope.ChangeStagebc = [];

    // var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=Id,Title,Modified,CaseStatus,BusinessCaseName,InitiationDate,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '"+$scope.IntiateID+"'&$top=5000&$orderby=ID asc";

    //var strInLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";
    var strInLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm,Initiators,Reviewers,Validators&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";


 var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingBusinessCase&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
 var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Pack,SkuUnit/Id,SkuUnit/Title,PackingType/Id,PackingType/Title,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase,PackingType,SkuUnit,InLicensingLaunchDetail&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";


    // var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('InLicensingBusinessCase')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    // var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseILDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseVersion,VersionType,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StageMaster')/items?&$select=*&$top=5000&$orderby=ID asc";

    var strChangeStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ChangeStageMaster')/items?&$select=Id,Title,Stage/Id,Stage/Title&$expand=Stage&$filter=Stage/Title eq '" + $scope.BcInitiateDetails.CaseStage + "'&$top=5000&$orderby=ID asc";


    var strInLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingCommentsWorkflowHistory')/items?&$select=Id,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,DescriptionType,MemberType,InLicensingBusinessCaseDoc/Id,InLicensingBusinessCaseDoc/Title&$expand=InLicensingBusinessCaseDoc,InLicensingBusinessCase,Editor&$filter=InLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1&$orderby=Modified desc";


    var strBusinessCaseILDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseStage/Id,CaseStage/Title,Editor/Id,Editor/Title,Editor/EMail,LapVersion,Created,Author/Id,Author/Title,Author/EMail,CaseVersion,VersionType,InLicensingBusinessCaseId,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,Author,CaseStage,Editor,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
    var strInLicensingCommentsWorkflowHistoryUrl2 = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingCommentsWorkflowHistory')/items?&$select=Id,CaseStage,MemberType,VersionNo,Title,Modified,Editor/Id,Editor/Title,CommentsWorkflowHistory,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,DescriptionType,InLicensingBusinessCaseDoc/Id,InLicensingBusinessCaseDoc/Title&$expand=InLicensingBusinessCaseDoc,InLicensingBusinessCase,Editor&$filter=InLicensingBusinessCase/Title eq '" + $scope.BcInitiateDetails.Title + "'&$top=1000&$orderby=Modified desc";
 
     var strBusinessCaseILSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicenseSupportingDocument')/items?$select=Id,Title,CaseStage/Id,CaseStage/Title,CaseVersion,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=CaseStage,InLicensingBusinessCase/Id,File&$filter=InLicensingBusinessCase/Id eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1000";
     

     
     var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
     var strCurrentStatusMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=100&$orderby=ID"; // cascading
     var strCurrencyMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Currency')/items?$select=*&$top=1000&$orderby=ID"; // cascading
     
     
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading

    var urlColl = [strInLicensingBusinessCaseUrl, strInLicensingLaunchDetailsUrl, strInLicensingSKUDetailsUrl, strBusinessCaseILDocumentLinkUrl , strStageMasterUrl, strChangeStageMasterUrl, strInLicensingCommentsWorkflowHistoryUrl,strBusinessCaseILDocumentLinkUrlWorkFlow,strInLicensingCommentsWorkflowHistoryUrl2,strBusinessCaseILSupportingDocumentURL,strPackingMasterUrl,strCurrentStatusMasterUrl,strCurrencyMasterUrl,strProductMasterUrl];

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
        $scope.InLicensingBusinessCaseColl = batchedData[0].d.results;
        $scope.InLicensingLaunchDetailsColl = batchedData[1].d.results;
        $scope.InLicensingSKUDetailsColl = batchedData[2].d.results;
        $scope.BusinessCaseInDocumentLinkColl= batchedData[3].d.results;
        $scope.CaseStageColl = batchedData[4].d.results;
        $scope.ChangeCaseStageColl = batchedData[5].d.results;
        $scope.InLicensingCommentsWorkflowHistoryColl = batchedData[6].d.results;
        $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl =batchedData[7].d.results;
        $scope.InLicensingCommentsWorkflowHistoryColl2 =batchedData[8].d.results;
        $scope.InLicensingSupportingDocColl =batchedData[9].d.results;

        $scope.PackingMasterColl = batchedData[10].d.results;
        $scope.CurrentStatusMasterColl = batchedData[11].d.results;
        $scope.CurrencyMasterColl = batchedData[12].d.results;
        $scope.ProductMasterColl= batchedData[13].d.results;

        $scope.isLoading = false;

        
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



        if ($scope.InLicensingBusinessCaseColl.length > 0 || $scope.InLicensingLaunchDetailsColl.length > 0 || $scope.InLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseInDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.InLicensingBusinessCaseColl[0].BusinessCaseName;
            $scope.Businesscaseid = $scope.InLicensingBusinessCaseColl[0].ID;
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
            $scope.Businesscaseid = $scope.InLicensingBusinessCaseColl[0].Title;
              $scope.CaseStatus = $scope.InLicensingBusinessCaseColl[0].CaseStatus;
               $scope.CurrentStatus= $scope.InLicensingLaunchDetailsColl[0].CurrentStatus.Title;

               $scope.BusinessCaseDescription = $scope.InLicensingBusinessCaseColl[0].BusinessCaseDescription;


               var getProductame=[];
               getProductame = $scope.ProductMasterColl.filter(function (item) {
                   return (item.Product == $scope.ddlProductName);
               });
   
               $scope.ProdCode = getProductame[0].ProductCode;

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


			$scope.CurrLogUserId=_spPageContextInfo.userDisplayName;
            }



            if ($scope.BusinessCaseInDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion);
                $scope.Title = $scope.BusinessCaseInDocumentLinkColl[0].Title;
                $scope.LapVersion =$scope.BusinessCaseInDocumentLinkColl[0].LapVersion;               		                
                $scope.MinorV = parseFloat($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major Version";

                } else {
                    $scope.VersionFlag = "Minor Version";
                }
            }

            if ($scope.BusinessCaseInDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseInDocumentLinkColl.length; s++) {
                    $scope.BusinessCaseInDocumentLinkColl[s].DocID = $scope.BusinessCaseInDocumentLinkColl[s].ID;
                    $scope.BusinessCaseInDocumentLinkColl[s].Fname = $scope.BusinessCaseInDocumentLinkColl[s].File.Name;
                    $scope.BusinessCaseInDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseInDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseInDocumentLinkColl = "";
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
        $scope.MemberType = "Reviewer";
         if(docFilteredData.length>0){
        for(var c=0;c<docFilteredData.length;c++){
                var col={};
                col.FinalAttachData=docFilteredData[c].File.Name;
                col.FinalCaseStage=docFilteredData[c].CaseStage.Title;
                col.Comment = $scope.CommentsWorkflowHistory
                col.MemberType = $scope.MemberType

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
            





           // $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified;
          //  $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl = "";
            }



        }

        for (var i = 0; i < $scope.InLicensingLaunchDetailsColl.length; i++) {
            $scope.InLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.InLicensingSKUDetailsColl, function (responseLine) {

                return responseLine.InLicensingLaunchDetail.Id == $scope.InLicensingLaunchDetailsColl[i].Id;
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
    //         type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
    //     },
    //     CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    // }

    // Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //     console.log(response);
    // });

    //     var BcChangeStage = {

    //         __metadata: {
    //             type: "SP.Data.InLicensingBusinessCaseListItem"
    //         },

    //       //  CaseStageId: $scope.ChagneBusinesscaseStage,
    //         CaseStatus: $scope.CaseStatus


    //     }

    //      var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
    //      Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {
    //         console.log(Changeresponse1)
    //             alert("Form Stage Changed Approved Successfully!!");
    //             $location.path("/ReviewerLP");

    //       });

    // }


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

    



    $scope.onReviewerSubmit = function () {

        if ($scope.CommentsWorkflowHistory == 0 || $scope.CommentsWorkflowHistory == undefined || $scope.CommentsWorkflowHistory == '') {
            $scope.CommentReuquired = true;
            return false;

        }


        //  $scope.ChagneBusinesscaseStage="Review Completed"           
          $scope.CaseStatus = "Ready for Validation"
       // $scope.CaseStatus = "Sent For Validation"
       
       //TODAY// $scope.ChagneBusinesscaseStage = [{
        //     Id: 3,
        //     Value: "Under Internal Review"
        // }];



        // if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined || $scope.ChagneBusinesscaseStage == null) {
        //     alert("Please Select Stage ")
        //     return false;
        // }

        if ($scope.CommentsWorkflowHistory == '' || $scope.CommentsWorkflowHistory == undefined) {
            alert("Please Enter Reviewer Comments ")
            return false;
        }
       // $scope.VersionDesc= 'Case Stage'+$scope.InLicensingBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        
        $scope.VersionDesc = 'Case Stage-' + $scope.InLicensingBusinessCaseColl[0].CaseStage.Title + ';'+'Comment-' + $scope.CommentsWorkflowHistory + ';'+'Version Type-' + "Major" + ','+'Member type-' + $scope.MemberType;


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
         //   CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
          //   InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
         //  InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].ID
         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
         CaseStage:$scope.InLicensingBusinessCaseColl[0].CaseStage.Title,
         MemberType: $scope.MemberType,
         DescriptionType:"Reviewers Comment",
         VersionNo: (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
         InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
         InLicensingBusinessCaseDocId: $scope.BusinessCaseInDocumentLinkColl[0].ID



        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingBusinessCaseListItem"
            },

            CaseStageId: $scope.InLicensingBusinessCaseColl[0].CaseStage.Id,
            CaseStatus: $scope.CaseStatus,
            VersionNo:(Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) + 1).toFixed(1)


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
         //    var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.webAbsoluteUrl+ "/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strNewBusinessCaseDocumentRelativeUrl =  _spPageContextInfo.webServerRelativeUrl+"/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) +1).toFixed(1).toString() + ".xlsx";
           
			  var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseInDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
             Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                 console.log(response);

                 var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                 Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                     var newBusinessCaseDocID = docResponse.data.d.results[0].Id;
 
                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                        CaseStageId:$scope.InLicensingBusinessCaseColl[0].CaseStage.Id,     
                        VersionType: "Major",
                        VersionDescription: $scope.VersionDesc    //= 'Case Stage'+$scope.InLicensingBusinessCaseColl[0].CaseStage.Title+'; Comment'+$scope.CommentsWorkflowHistory+',Version Type'+"Major"+',Member type'+ $scope.MemberType  ;        

                    };

                     var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

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
                                alert("Business Case Updated Successfully");

                                $location.path("/ReviewerILDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/ReviewerILDash");
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
    //             type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
    //         },
    //         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory
    //     }

    //     Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
    //         console.log(response);
    //     });

    //         var BcChangeStage = {

    //             __metadata: {
    //                 type: "SP.Data.InLicensingBusinessCaseListItem"
    //             },

    //             CaseStage: $scope.ChagneBusinesscaseStage

    //         }

    //          var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
    //          Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

    //             console.log(Changeresponse1); 

    //     var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingBusinessCaseDocuments/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsb";
    //     var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseInDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
    //     Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
    //         console.log(response);

    //         var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,CaseVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

    //         Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
    //             var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

    //             var BcVersion = {
    //                 __metadata: {
    //                     type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
    //                 },
    //                 CaseVersion: (Math.floor($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion) +0.1).toFixed(1)
    //             };

    //             var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

    //             Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
    //                 console.log(Vresponse);
    //                 if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

    //                     $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
    //                         alert("Business Case Updated Successfully");
    //                         $location.path("/InLicensingLP");

    //                     });
    //                 } else {
    //                     alert("Form Minor Version Created Successfully!!");
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
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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
        $location.path("/ReviewerILDash");

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
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
        // Today//   CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            //  InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
          //  InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].ID

          CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            CaseStage:$scope.InLicensingBusinessCaseColl[0].CaseStage.Title,
            MemberType: $scope.MemberType,
            DescriptionType:"Reviewers Comment",
       	    VersionNo: (parseFloat($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion)).toFixed(1),
            InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
            InLicensingBusinessCaseDocId: $scope.BusinessCaseInDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingBusinessCaseListItem"
            },

            // CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
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
            alert("Business Case Updated Successfully");
            $location.path("/ReviewerILDash");

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
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
         //   CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
         //     InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
         //   InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].ID

         CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
         CaseStage:$scope.InLicensingBusinessCaseColl[0].CaseStage.Title,
         MemberType: $scope.MemberType,
         DescriptionType:"Reviewers Comment",
        VersionNo: (parseFloat($scope.BusinessCaseInDocumentLinkColl[0].CaseVersion)).toFixed(1),

         InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
         InLicensingBusinessCaseDocId: $scope.BusinessCaseInDocumentLinkColl[0].ID

        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.InLicensingBusinessCaseListItem"
            },

            //CaseStage: $scope.ChagneBusinesscaseStage,
            CaseStatus: $scope.CaseStatus


        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
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
            alert("Business Case Updated Successfully");
            $location.path("/ReviewerILDash");
        });
    }




});