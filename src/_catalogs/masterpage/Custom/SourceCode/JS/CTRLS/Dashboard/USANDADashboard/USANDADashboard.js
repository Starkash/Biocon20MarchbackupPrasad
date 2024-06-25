appOperations.controller("InitiatorUSANDADashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessUSAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,Title,Delete,BusinessCaseDescription,LapVersion,Initiators/Id,Initiators/Title,Counter,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Initiators,CaseStage,SubStrategy,DosageForm,ProductName&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    
    $scope.test=[];

    var urlColl = [strBusinessUSAndaLicencingUrl, strStrategyUrl, strSubStrategyUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.itemsPerPage =20;


        $scope.USAndaBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.OutBusinessLicencingColl4=$scope.USAndaBusinessLicencingColl ;
        $scope.OutBusinessLicencingColl5=$scope.USAndaBusinessLicencingColl ;

        if ($scope.USAndaBusinessLicencingColl.length > 0) {



            var OLFinalArray=[];

         for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) {

            for (var j = 0; j < $scope.USAndaBusinessLicencingColl[i].Initiators.results.length; j++) {
                var gName = $scope.USAndaBusinessLicencingColl[i].Initiators.results[j].Title;
                var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                if (userExist == true) 
                {
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                        //  $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "";
                        // $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";

                        //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                    }
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                        $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";
                        // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                    }
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                        $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/dee5a721-3f34-4d05-b1be-f6c7331041e8/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";


                    }

                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                        $scope.USAndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";
                    }
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                        $scope.USAndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/77bfdc76-5a96-45ca-b69c-39c09e68a2ca/reports/d8e44089-fb1c-4912-9860-6dbc31c58884/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseIdhttps://app.powerbi.com/groups/77bfdc76-5a96-45ca-b69c-39c09e68a2ca/reports/d8e44089-fb1c-4912-9860-6dbc31c58884/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.USAndaBusinessLicencingColl[i].ID + "'";
                    }
    
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                        $scope.USAndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/7c88bbd4-c0ab-49cd-bf13-8228c7d7eab5/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.USAndaBusinessLicencingColl[i].ID + "'";
    
    
                    }

                    	

                  //  $scope.USAndaBusinessLicencingColl[i];
                   OLFinalArray.push($scope.USAndaBusinessLicencingColl[i]);
                    break;
    
                }
            }
        }
           
            


            // for (var i = 0; i < $scope.USAndaBusinessLicencingColl.length; i++) {
            //     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
            //       //  $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "";
            //        // $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";

            //         //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
            //     }
            //     else if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
            //         $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";
            //         // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
            //     }
            //     else{
            //      //   $scope.USAndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.USAndaBusinessLicencingColl[i].ID + "";


            //     }
            //     $scope.USAndaBusinessLicencingColl[i]
            // }

        }
        $scope.USAndaBusinessLicencingColl= OLFinalArray;
        if ($scope.USAndaBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }
        $scope.test = $scope.USAndaBusinessLicencingColl;

        $scope.totalItems = $scope.USAndaBusinessLicencingColl.length; // Total number of items
        $scope.currentPage = 1; // Current page
        $scope.itemsPerPage =20// 5; // Items per page
        $scope.maxSize = 5; // Maximum number of pagination links to display
        $scope.displayedItems = [];

        $scope.updatePagination = function () {
            $scope.currentPage = 1; // Reset current page to 1 when items per page changes
            $scope.displayedItems = generateItems(); // Update displayed items
        };

        function generateItems() {
            const startIdx = ($scope.currentPage - 1) * $scope.itemsPerPage;
            const endIdx = startIdx + $scope.itemsPerPage;
            return Array.from({ length: $scope.totalItems }).map((_, idx) => `Item ${idx + 1}`).slice(startIdx, endIdx);
        }

        $scope.displayedItems = generateItems(); 

    });
    $scope.onAddInitiationClick = function () {

        $location.path('/AddUSAndaBusinessCase')

    }

    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/EditUSAnda'); ///
        }

        var request = []
        var coll = {};
        coll.StrategyId = $scope.ddlStragy;
        coll.SubStrategyId = $scope.ddlsubStragy;
        request.push(coll);
        $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
            return (item.StrategyId == $scope.ddlStragy || item.Id == $scope.ddlsubStragy);
        });
        if ($scope.getStrategy.length > 0) {

            if ($scope.getStrategy[0].Strategy.Title == "ANDA - Inhouse US") {
                Logics.setSharingData(request);
                $location.path('/AddUSAndaBusinessCase')
            }


        }


    }

    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ViewUSAndaLicensing');
        }
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'ANDA - Inhouse US') {

            $location.path('/ChangeStageUSAnda');

        }
    }
    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

    $scope.toggleCheckbox = function(data) {
    
        var confirmation = confirm("Are you sure you want to Archive/Unarchive this Business Case?");
        if (confirmation) {
            // User confirmed, proceed with deletion
            if (data.Delete == "True" ||data.Delete == "true"  ) {
                $scope.isChecked = false;
            } else {
                $scope.isChecked = true;
            }
    
            console.log(data);
            $scope.IntiateID = data.Id;

    

     

                // if(data.Delete=="true"){

                //     $scope.isChecked = false;
                
                
                // }
                // else{
                //     $scope.isChecked=true;
                
                // }
                
                //         console.log(data);
                //         $scope.IntiateID=data.Id;
                
                
                $scope.isLoading=true;
                
                        var strUSAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?&$select=*&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strUSAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaSKUDetails')/items?&$select=*,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=USAndaBusinessCase&$filter=USAndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strUSAndaCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaCommentsWorkflowHistory')/items?&$select=Id,Title,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=USAndaBusinessCase&$filter=USAndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

                        var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaBusinessCaseDocuments')/items?$select=*,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=USAndaBusinessCase&$filter=USAndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                      var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('USAndaLicenseSupportingDocument')/items?$select=Id,Title,USAndaBusinessCaseId,USAndaBusinessCase/Title&$expand=USAndaBusinessCase&$filter=USAndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                
                
                
                        var urlColl = [strUSAndaBusinessCaseUrl, strUSAndaSKUDetailsUrl, strUSAndaCommentsWorkflowHistoryUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strBusinessCaseOLSupportingDocumentURL];
                
                        Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then( async function (batchedData) {
                
                            $scope.USAndaBusinessCaseColl = batchedData[0].d.results;
                            $scope.USAndaSKUDetailsColl = batchedData[1].d.results;
                            $scope.USAndaCommentsWorkflowHistoryColl = batchedData[2].d.results;
                
                            $scope.BusinessCaseOLDocumentLinkColl = batchedData[3].d.results;
                            $scope.BusinessCaseOLSupportingDocumentColl = batchedData[4].d.results;
                
                
                
                
                            $scope.USAndaSKUDetailsColl1 = $scope.USAndaSKUDetailsColl.filter(function (item) {
                                return (item.USAndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.USAndaCommentsWorkflowHistoryColl1 = $scope.USAndaCommentsWorkflowHistoryColl.filter(function (item) {
                                return (item.USAndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLDocumentLinkColl1 = $scope.BusinessCaseOLDocumentLinkColl.filter(function (item) {
                                return (item.USAndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLSupportingDocumentColl1 = $scope.BusinessCaseOLSupportingDocumentColl.filter(function (item) {
                                return (item.USAndaBusinessCaseId == $scope.IntiateID);
                            });
                
                         
                
                           // var deferred = $q.defer();
                            
                        var updatedBUBatch1 = [];
                        var updatedBUBatch2 = [];
                        var updatedBUBatch3 = [];
                        var updatedBUBatch4 = [];
                        var updatedBUBatch5 = [];
                        var updatedBUBatch6 = [];
                
                
                        if($scope.USAndaBusinessCaseColl.length>0){
                
                            var deferred = $q.defer();
                        updatedBUBatch1.push({
                
                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('USAndaBusinessCase')/items(" + $scope.IntiateID + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.USAndaBusinessCaseListItem"
                                },
                                Delete: '' + $scope.isChecked
                
                            }
                
                
                        });
                
                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch1).then(function (insertedScheduleData2) {
                            console.log(insertedScheduleData2); 
                        });
                    }
                
                
                            if($scope.USAndaCommentsWorkflowHistoryColl1.length>0){
                
                                // var deferred = $q.defer();
                                 for(var v=0;v<$scope.USAndaCommentsWorkflowHistoryColl1.length;v++){
                                     updatedBUBatch4.push({
                             
                                         reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('USAndaCommentsWorkflowHistory')/items(" + $scope.USAndaCommentsWorkflowHistoryColl1[v].Id + ")",
                                         action: "UPDATE",
                                         data: {
                                             __metadata: {
                                                 type: "SP.Data.USAndaCommentsWorkflowHistoryListItem"
                                             },
                                             Delete: '' + $scope.isChecked
                             
                                         }
                                     });
                
                                     Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch4).then(function (insertedScheduleData4) {
                                        console.log(insertedScheduleData4);
                
                                    });
                
                                       
                                    }   
                            
                                }
                                  
                                         
                
                               
                                  
                                      
                
                                              if($scope.USAndaSKUDetailsColl1.length>0){
                
                            
                                                // var deferred = $q.defer();
                                     
                                     
                                                 for(var r=0;r<$scope.USAndaSKUDetailsColl1.length;r++){
                                             updatedBUBatch3.push({
                                     
                                                 reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('USAndaSKUDetails')/items(" + $scope.USAndaSKUDetailsColl1[r].Id + ")",
                                                 action: "UPDATE",
                                                 data: {
                                                     __metadata: {
                                                         type: "SP.Data.USAndaSKUDetailsListItem"
                                                     },
                                                     Delete: '' + $scope.isChecked
                                     
                                                 }
                                             });
                                             Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch3).then(function (insertedScheduleData3) {
                                                console.log(insertedScheduleData3);
                                               //deferred.resolve();
                                             });
                                         }
                                        }
                                     
                                      
                                        
                       
                
                       
                     
                
                
                
                
                         if ($scope.BusinessCaseOLDocumentLinkColl1.length > 0) {
                
                            for (var n = 0; n < $scope.BusinessCaseOLDocumentLinkColl1.length; n++) {
                                {
                
                                    var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/USAndaBusinessCaseDocuments/items("+$scope.BusinessCaseOLDocumentLinkColl1[n].Id+")"
                               
                
                                   var  data= {
                                        '__metadata': { 'type': 'SP.Data.USAndaBusinessCaseDocumentsItem' },
                
                                     
                                        Delete: ''+$scope.isChecked
                
                                    }
                
                
                
                
                                    //
                                    Logics.updateData(reqUrl, data).then(function (insertedScheduleData6) {
                                        console.log(insertedScheduleData6);
                                       // deferred.resolve();
                                    });
                                    //
                                   
                                }
                            
                
                               
                
                
                
                               
                            }
                        }
                
                
                
                        if ($scope.BusinessCaseOLSupportingDocumentColl1.length > 0) {
                            for (var d = 0; d< $scope.BusinessCaseOLSupportingDocumentColl1.length; d++) {
                
                    
                                        var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/USAndaLicenseSupportingDocument/items(" + $scope.BusinessCaseOLSupportingDocumentColl1[d].Id + ")"
                                   
                    

                                        var  data= {
                                            '__metadata': { 'type': 'SP.Data.USAndaLicenseSupportingDocumentItem' },
                    
                                         
                                            Delete: ''+$scope.isChecked
                    
                                        }                    
                    
                                        
                    
                                        //
                                        Logics.updateData(reqUrl, data).then(function (insertedScheduleData9) {
                                            console.log(insertedScheduleData9);
                                           // deferred.resolve();
                                        });
                                       
                                       
                                    }
                            
                        }
                
                
                
                
                        
                        alert('Data Updated Successfully!!!');
                        $scope.isLoading=false;
                     
                        $location.path("/InitiatorUSANDADash");
                       //  $route.reload();
                                               location.reload();

                
                        });
                
                      //  return deferred.promise;
                
                
                
                
                
                
                    
    
            // Your existing logic for fetching data and updating lists goes here...
            // Ensure this logic is inside the confirmation block, so it only executes when confirmed.
    
        } else {
            
            // User canceled the deletion, do nothing
                                                           location.reload();

                                    $location.path("/InitiatorUSANDADash");

                       //$route.reload();
                       

            return;
        }
    };
});