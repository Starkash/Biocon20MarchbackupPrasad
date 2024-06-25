
appOperations.controller("ViewILCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs, $routeParams) {

    if ($routeParams.initiationID != null && $routeParams.initiationID != undefined) {
        Logics.setSharingData({ ID: $routeParams.initiationID });
    }

    if ($routeParams.bussCaseDocID != null && $routeParams.bussCaseDocID != undefined) {
        $scope.bussCaseDocID = $routeParams.bussCaseDocID;
    }

    if (Logics.getSharedData() == undefined) {
        $location.path('/ChangeStageInLicensing');
    }

    else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }
    $scope.ChangeStagebc = [];
    var strInLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?&$select=Id,Title,BusinessCaseDescription,Modified,Editor/Id,Editor/Title,BusinessCaseName,InitiationDate,CaseStatus,CaseStage/Id,CaseStage/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductCategory/Id,ProductCategory/Title,ProductName/Id,ProductName/Title,DosageForm/Id,DosageForm/Title&$expand=Strategy,Editor,CaseStage,SubStrategy,ProductCategory,ProductName,DosageForm&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=Modified desc";


    var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingLaunchDetails')/items?&$select=Id,Title,Modified,LOEDate,FillingDate,LaunchDate,PartnerDetails,Currency/Id,Currency/Title,CurrentStatus/Id,CurrentStatus/Title,Market/Id,Market/Title,SubMarket/Id,SubMarket/Title,Country/Id,Country/Title,Partner/Id,Partner/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=Market,SubMarket,Currency,CurrentStatus,Country,Partner,InLicensingBusinessCase&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
    var strInLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingSKUDetails')/items?&$select=Id,Title,Modified,Quantity,Pack,SkuUnit/Id,SkuUnit/Title,PackingType/Id,PackingType/Title,InLicensingLaunchDetail/Id,InLicensingLaunchDetail/Title,InLicensingBusinessCase/Id,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase,PackingType,SkuUnit,InLicensingLaunchDetail&$filter=InLicensingBusinessCase/ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";


    var strBusinessCaseILDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,Modified,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";

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



$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl=$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl1;

                $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        $scope.isLoading = false;

        if ($scope.InLicensingBusinessCaseColl.length > 0 || $scope.InLicensingLaunchDetailsColl.length > 0 || $scope.InLicensingSKUDetailsColl.length > 0 || $scope.BusinessCaseILDocumentLinkColl.length >= 0) {

            $scope.Businesscasename = $scope.InLicensingBusinessCaseColl[0].BusinessCaseName;
            $scope.InitiationDate = new Date($scope.InLicensingBusinessCaseColl[0].InitiationDate);
            $scope.Id = $scope.InLicensingBusinessCaseColl[0].Title;

            $scope.Businesscaseid = $scope.InLicensingBusinessCaseColl[0].Title;
            $scope.ddlProductCategory = $scope.InLicensingBusinessCaseColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.InLicensingBusinessCaseColl[0].ProductName.Title;
            $scope.ddlStrategy = $scope.InLicensingBusinessCaseColl[0].Strategy.Title;
            $scope.ddlSubStrategy = $scope.InLicensingBusinessCaseColl[0].SubStrategy.Title;
            $scope.ddlmarket = $scope.InLicensingLaunchDetailsColl[0].Market.Title;
            $scope.ddlsubmarket = $scope.InLicensingLaunchDetailsColl[0].SubMarket.Title;
            $scope.ddlCountry = $scope.InLicensingLaunchDetailsColl[0].Country.Title;
            $scope.loedate = new Date($scope.InLicensingLaunchDetailsColl[0].LOEDate);
            $scope.fillingdate = new Date($scope.InLicensingLaunchDetailsColl[0].FillingDate);
            $scope.launchdate = new Date($scope.InLicensingLaunchDetailsColl[0].LaunchDate);
            $scope.fillingdate = new Date($scope.InLicensingLaunchDetailsColl[0].FillingDate);
            $scope.partner = $scope.InLicensingLaunchDetailsColl[0].Partner.Title;
            $scope.partnerdetails = $scope.InLicensingLaunchDetailsColl[0].PartnerDetails;
            $scope.currency = $scope.InLicensingLaunchDetailsColl[0].Currency;
            $scope.CurrentStatus = $scope.InLicensingLaunchDetailsColl[0].CurrentStatus.Title;
            $scope.Modified = $scope.InLicensingBusinessCaseColl[0].Modified;
            $scope.CaseStage = $scope.InLicensingBusinessCaseColl[0].CaseStage.Title;

            $scope.BusinessCaseDescription = $scope.InLicensingBusinessCaseColl[0].BusinessCaseDescription;


            var getProductame=[];
            getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.Product == $scope.ddlProductName);
            });

            $scope.ProdCode = getProductame[0].ProductCode;
      



            $scope.CaseStatus = $scope.InLicensingBusinessCaseColl[0].CaseStatus;
            if ($scope.InLicensingCommentsWorkflowHistoryColl.length > 0) {
                $scope.InitiatorComments1 = $scope.InLicensingCommentsWorkflowHistoryColl[0].CommentsWorkflowHistory;
            }

            $scope.Editor = $scope.InLicensingBusinessCaseColl[0].Editor.Title;

            //  if($scope.CaseStage=='Initiated'){
            //  $scope.ChagneBusinesscaseStage=['Data Input Stage','Under Review'];
            // }

            if ($scope.InLicensingBusinessCaseColl[0].DosageForm.results.length > 0) {

                $scope.DosageForm = "";
                for (var p = 0; p < $scope.InLicensingBusinessCaseColl[0].DosageForm.results.length; p++) {


                    $scope.DosageForm += $scope.InLicensingBusinessCaseColl[0].DosageForm.results[p].Title + ',';


                }
                $scope.dosage1 = $scope.DosageForm.slice(0, -1);


            }



            // for(var i=0;i<$scope.InLicensingLaunchDetailsColl.length;i++)
            //     {
            //         var results =  $filter('filter')($scope.InLicensingSKUDetailsColl[i], function (responseLine) {

            //             return responseLine.InLicensingSKUDetailsColl == $scope.InLicensingLaunchDetailsColl[i].Title;
            //         });

            // if(results.length>0)
            // {
            //     $scope.InLicensingLaunchDetailsColl[i].Title=''+results[0].InLicensingLaunchDetail;            
            // }
            // else
            // {
            //     $scope.InLicensingLaunchDetailsColl[i].InLicensingLaunchDetail='';
            //     // }

            // }



            if ($scope.BusinessCaseILDocumentLinkColl.length > 0) {
                $scope.MajorV = Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion);
                $scope.LapVersion = $scope.BusinessCaseILDocumentLinkColl[0].LapVersion;
                $scope.Title = $scope.BusinessCaseILDocumentLinkColl[0].Title;

                $scope.MinorV = parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion).toFixed(1);
                if ($scope.MajorV == $scope.MinorV) {
                    $scope.VersionFlag = "Major Version";

                }
                else {
                    $scope.VersionFlag = "Minor Version";
                }
            }

            if ($scope.BusinessCaseILDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseILDocumentLinkColl.length; s++) {
                    $scope.BusinessCaseILDocumentLinkColl[s].DocID = $scope.BusinessCaseILDocumentLinkColl[s].ID;
                    $scope.BusinessCaseILDocumentLinkColl[s].Fname = $scope.BusinessCaseILDocumentLinkColl[s].File.Name;
                   // $scope.BusinessCaseILDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl;
                    $scope.BusinessCaseILDocumentLinkColl[s].ServRel= _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseILDocumentLinkColl[s].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseILDocumentLinkColl = "";
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
       
        

        
        
      
         if(lapvrsion=='null' || casestg=='undefined')        
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


$scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Modified;

            
            
            
            
            
          //  $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].Modified= $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].Modified;
          //  $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl [s].ServRel = location.origin + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;
            $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].ServRel = _spPageContextInfo.webAbsoluteUrl + "/_layouts/download.aspx?SourceUrl=" + $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl[s].File.ServerRelativeUrl;


                }
            } else {
                $scope.BusinessCaseILDocumentLinkUrlWorkFlowColl = "";
            }


            for (var i = 0; i < $scope.InLicensingLaunchDetailsColl.length; i++) {
                $scope.InLicensingLaunchDetailsColl[i].LicenseSKUDetails = $filter('filter')($scope.InLicensingSKUDetailsColl, function (responseLine) {

                    return responseLine.InLicensingLaunchDetail.Id == $scope.InLicensingLaunchDetailsColl[i].Id;
                });

            }
        }

        if ($scope.BusinessCaseILDocumentLinkColl.length > 0) {
            if ($scope.bussCaseDocID != undefined && $scope.bussCaseDocID != null) {
                var docILBussinessLink = $filter('filter')($scope.BusinessCaseILDocumentLinkColl, function(value){
                    return value.Id == $scope.bussCaseDocID;
                });
                var excelWindow = $window.open("ms-excel:ofe|u|" + _spPageContextInfo.portalUrl + docILBussinessLink[0].File.ServerRelativeUrl, "OpenExcel");
            }
            setTimeout(function () {
                excelWindow.close();
            }, 5000);
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

        //     if($scope.filteredStageColl[0].Title=="Minor Version")
        // 	{

        // 	$scope.Showbtn=true;
        // 	}
        // 	else
        // 	{
        // 	$scope.Showbtn=false;
        // 	}
        // }	

        // arvind

        /*   $scope.filteredStageColl4 = $filter('filter')($scope.InLicensingBusinessCaseColl, function (itemId) {
              return itemId.Id==$scope.BusinessCaseILDocumentLinkColl[0].InLicensingBusinessCaseId;
          });
          */
        //
        $scope.filteredStageColl = $filter('filter')($scope.ChangeCaseStageColl, function (itemId) {
            return itemId.Id == stgId;
        });
        $scope.filteredStageCollNew = $filter('filter')($scope.CaseStageColl, function (itemId) {
            return itemId.Title == $scope.filteredStageColl[0].Title;
        });
        $scope.chngStgIntId = $scope.filteredStageCollNew[0].Id;


        if ($scope.filteredStageColl[0].Title.length > 0) {

            $scope.ChagneBusinesscaseStage = $scope.filteredStageColl[0].Title

            if ($scope.filteredStageColl[0].Title == "Minor Changes") {
                $scope.Showbtn = true;
            } else {
                $scope.Showbtn = false;
            }
        }
    }
    var fileCounter = 0;


    $scope.onInitiationSubmit = function () {

        if ($scope.ddlStage == '' || $scope.ddlStage == undefined || $scope.ddlStage == null || $scope.ddlStage == 'Select') {
            alert("Please Select Stage ")
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
            $scope.CaseStatus = " Ready for ELT Review"

        }
        if ($scope.filteredStageColl[0].Title == "Under ELT Review") {
            $scope.CaseStatus = "Under ELT Review"


        }
        if ($scope.filteredStageColl[0].Title == "ELT Review – Approved") {
            $scope.CaseStatus = "Business Case Published​"


        }





        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.InLicensingCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
            InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].ID
        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes" || $scope.filteredStageColl[0].Title == "ELT Review – Approved") {
            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingBusinessCaseListItem"
                },

                CaseStatus: $scope.CaseStatus

            }
        } else {

            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingBusinessCaseListItem"
                },

                CaseStageId: $scope.chngStgIntId,
                CaseStatus: $scope.CaseStatus


                //$scope.ChagneBusinesscaseStage  


            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/OutLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsx";
            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,CaseVersion,LapVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;


                    if ($scope.filteredStageColl[0].Title == "ELT Review – Approved") {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            LapVersion: (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].LapVersion) + 1).toFixed(1),

                            VersionType: "Major Version"
                        };
                    }
                    else {
                        var BcVersion = {
                            __metadata: {
                                type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                            },
                            CaseVersion: (Math.floor($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                            VersionType: "Major Version"
                        };
                    }


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);

                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully!!");
                                $location.path("/InitiatorILDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorILDash");
                        }
                    });

                    /*    if($scope.filteredStageColl[0].Title == "ELT Review – Approved"){
                                    
                                    
                                              var BcVersion1 = {
                                            __metadata: {
                                                type: "SP.Data.OutLicensingBusinessCaseDocumentsItem"
                                            },
                                         //   CaseVersion: (Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].CaseVersion) + 1).toFixed(1),
                                           // VersionType: "Major Version",
                                            LapVersion:Math.floor($scope.BusinessCaseOLDocumentLinkColl[0].LapVersion) + 1;
                                        };
                                }
            
                                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items(" + $scope.IntiateID+ ")";
            
                                Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                                    console.log(Vresponse);
                                    alert('successfully!!')
                                });
                                */
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


        var addCommentBusinessCaseRequest = {
            __metadata: {
                type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
            },
            CommentsWorkflowHistory: $scope.CommentsWorkflowHistory,
            InLicensingBusinessCaseId: $scope.InLicensingBusinessCaseColl[0].Id,
            InLicensingBusinessCaseDocId: $scope.BusinessCaseILDocumentLinkColl[0].ID


        }

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingCommentsWorkflowHistory')/items", addCommentBusinessCaseRequest).then(function (response) {
            console.log(response);
        });

        if ($scope.filteredStageColl[0].Title == "Minor Changes") {
            $scope.CaseStatus = "Minor Changes"



            var BcChangeStage = {

                __metadata: {
                    type: "SP.Data.InLicensingBusinessCaseListItem"
                },

                // CaseStageId:$scope.chngStgIntId 

                //$scope.ChagneBusinesscaseStage     
                CaseStatus: $scope.CaseStatus



            }
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse1) {

            console.log(Changeresponse1);
            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/InLicensingBusinessCaseDocuments/" + $scope.Title + "-V" + (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1).toString() + ".xlsx";
            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.BusinessCaseILDocumentLinkColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('InLicensingBusinessCaseDocuments')/items?$select=Id,Title,VersionType,LapVersion,CaseVersion,InLicensingBusinessCaseId,InLicensingBusinessCase/Title&$expand=InLicensingBusinessCase&$filter=InLicensingBusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.InLicensingBusinessCaseDocumentsItem"
                        },
                        CaseVersion: (parseFloat($scope.BusinessCaseILDocumentLinkColl[0].CaseVersion) + 0.1).toFixed(1),
                        VersionType: "Minor Version"
                    };


                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCaseDocuments')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorILDash");

                            });
                        } else {
                            alert("Business Case Updated Successfully!!");
                            $location.path("/InitiatorILDash");
                        }
                    });


                });
            });

        });




    }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InLicensingBusinessCase')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
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

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorILDash");

    }

    $scope.isPopupVisible = false;

    // Function to open the popup
    $scope.openPopup = function () {

        $scope.isPopupVisible = true;
    }

    // Function to close the popup
    $scope.closePopup = function () {

        $scope.isPopupVisible = false;
    }
});