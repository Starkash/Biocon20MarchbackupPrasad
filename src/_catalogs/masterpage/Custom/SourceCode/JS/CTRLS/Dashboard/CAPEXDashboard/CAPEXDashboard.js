appOperations.controller("InitiatorCAPEXDashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.goBack = function() {
    //     $window.history.back();



    // }
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,AuthorId,Author/Title,Author/EMail,Delete,Title,Site/Id,Site/Title,CapexValue,ProductCategory/Id,ProductCategory/Title,CapexContext/Id,CapexContext/Title,LapVersion,VersionNo,Initiators/Id,Initiators/Title,Modified,BusinessCaseDescription,BusinessCaseName,Counter,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Site,ProductCategory,CapexContext,CaseStage,Initiators,SubStrategy,Author&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,AuthorId,Author/Title,Author/EMail,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase,Author&$filter=ProductName/Id ne null  &$top=5000&$orderby=ID desc";

    $scope.test=[];
    var urlColl = [strBusinessCapexLicencingUrl, strStrategyUrl, strSubStrategyUrl, strCapexProductDetailsUrl];



    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.itemsPerPage =20;
        
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;


        $scope.CapexBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        $scope.CapexProductDetailsColl = batchedData[3].d.results;


        // $scope.CurrentloggedUser= _spPageContextInfo.userId


        // $scope.CapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
        //     return (item.AuthorId == $scope.CurrentloggedUser);
        // });

        // $scope.CapexBusinessLicencingColl = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
        //     return (item.AuthorId == $scope.CurrentloggedUser);
        // });
       


        // 7 Dec-2023---
        if($scope.CapexBusinessLicencingColl.length>0){

         
           var CapexValueCollection=[]
           
            for(var d=0;d<$scope.CapexBusinessLicencingColl.length;d++){
                CapexValueCollection.push($scope.CapexBusinessLicencingColl[d].CapexValue);

            }

            $scope.CapexValueCollection=CapexValueCollection;
        }
        $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;



        $scope.ShowallSatus=function(){

            {
                
                $scope.ddlStatus="";
                $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

            }


        }
        // BACK BUTTON


        $scope.StatusFilter= function(xyz){
            $scope.ddlStatus=xyz;

            // $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

        }

        //

        //  $scope.CapexProductDetailsCollUnique=$scope.CapexProductDetailsColl

        $scope.Productfilter = function (pname) {

            if (pname != null && pname != undefined) {
                $scope.DupCapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
                    return item.ProductName.Id == pname;
                });
                var FArry = [];
                for (var c = 0; c < $scope.DupCapexProductDetailsColl.length; c++) {

                    var filteredData = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
                        return item.ID == $scope.DupCapexProductDetailsColl[c].CapexBusinessCase.Id;
                    });
                    if (filteredData.length > 0) {
                        var col = {};
                        col.Id = filteredData[0].Id;
                        col.ID = filteredData[0].ID;
                        col.Modified = filteredData[0].Modified;


                        col.Title = filteredData[0].Title;
                        col.CaseStatus = filteredData[0].CaseStatus;
                        col.BusinessCaseName = filteredData[0].BusinessCaseName;
                        col.VersionNo = filteredData[0].VersionNo;
                        col.LapVersion = filteredData[0].LapVersion;
                        col.CapexValue = filteredData[0].CapexValue;
                        col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;


                        if (filteredData[0].CaseStage.Id != 0) {
                            var CaseStage = [];

                            CaseStage.Title = filteredData[0].CaseStage.Title;
                            CaseStage.Id = filteredData[0].CaseStage.Id;
                            col.CaseStage = filteredData[0].CaseStage;
                        }

                        if (filteredData[0].Strategy.Id != 0) {
                            var Strategy = [];
                            Strategy.Title = filteredData[0].Strategy.Title;
                            Strategy.Id = filteredData[0].Strategy.Id;
                            col.Strategy = filteredData[0].Strategy;


                        }
                        if (filteredData[0].ProductCategory.Id != 0) {
                            var ProductCategory = [];
                            ProductCategory.Title = filteredData[0].ProductCategory.Title;
                            ProductCategory.Id = filteredData[0].ProductCategory.Id;
                            col.ProductCategory = filteredData[0].ProductCategory;
                        }

                        if (filteredData[0].Site.Id != 0) {
                            var Site = [];
                            Site.Title = filteredData[0].Site.Title;
                            Site.Id = filteredData[0].Site.Id;
                            col.Site = filteredData[0].Site;
                        }


                        if (filteredData[0].CapexContext.Id != 0) {
                            var CapexContext = [];
                            CapexContext.Title = filteredData[0].CapexContext.Title;
                            CapexContext.Id = filteredData[0].CapexContext.Id;
                            col.CapexContext = filteredData[0].CapexContext;
                        }

                        FArry.push(col);


                    }



                }


                // TO FILTER REPEATED BUSINESS CASE 
                function filterUnique(arr, property) {
                    return arr.filter((item, index, self) =>
                        index === self.findIndex((t) => t[property] === item[property])
                    );
                }

                // Use the custom filter function to get unique objects based on CapexBusinessCaseId
                var unique = filterUnique(FArry, "ID");


                $scope.CapexBusinessLicencingColl1 = unique;
                $scope.test = $scope.CapexBusinessLicencingColl1;


                console.log(unique);

            }
           else if(pname==0) {

                $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
                $scope.test = $scope.CapexBusinessLicencingColl1;
            }
            
            else {

                $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
                $scope.test = $scope.CapexBusinessLicencingColl1;

            }

        }

        if ($scope.CapexProductDetailsColl.length > 0) {

            $scope.uniqueArray = $scope.CapexProductDetailsColl.filter(function (item, index, array) {
                return array.indexOf(item) === index;
            });
            var newfilteredarray = [];
            var newfilteredarray2 = [];
            var obj = [];
            for (var i = 0; i < $scope.CapexProductDetailsColl.length; i++) {
                var col = {};

                col.CapexBusinessCaseId = $scope.CapexProductDetailsColl[i].CapexBusinessCase.Id;
                col.ProductId = $scope.CapexProductDetailsColl[i].ProductName.Id;
                col.ProductTitle = $scope.CapexProductDetailsColl[i].ProductName.Title;

                obj.push(col);
            }

            // Define a custom function to filter unique objects based on CapexBusinessCaseId
            function filterUnique(arr, property) {
                return arr.filter((item, index, self) =>
                    index === self.findIndex((t) => t[property] === item[property])
                );
            }

            // Use the custom filter function to get unique objects based on CapexBusinessCaseId
            var unique = filterUnique(obj, "CapexBusinessCaseId");



            var PRODunique = filterUnique(obj, "ProductId");

            console.log(PRODunique);
            console.log(unique);
            newfilteredarray2.push(unique);
            newfilteredarray.push(PRODunique);

            $scope.newfilteredarrayColl = newfilteredarray[0];

        }


        // $scope.CapexBusinessLicencingColl = $filter('filter')($scope.CapexBusinessLicencingColl, function (itemId) {
        //     return itemId.ID == $scope.filteredStageColl[0].CapexBusinessCaseId;
        // });

        // $scope.newfilteredarrayColl2 = newfilteredarray2[0];






        //https://app.powerbi.com/groups/me/reports/69c10b7e-3d4e-4fab-9d2e-763a2d37b1f4/ReportSectionec98540767a196cd7210?experience=power-bi
        if ($scope.CapexBusinessLicencingColl.length > 0) {

            var OLFinalArray = [];
            for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {

                for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Initiators.results.length; j++) {
                    var gName = $scope.CapexBusinessLicencingColl[i].Initiators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                    if (userExist == true) {
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            //  $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                            $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/ec8d7e64-d73e-4b9b-b266-be5d3d61ae36/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";

                            //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink="";

                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/2bcf350a-62dc-4d6c-ab24-d16a797e9eca/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
                            //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "";

                        }


                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                           // $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                           $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/b367dff5-451a-49ed-87eb-a380c3988943/reports/bc13a726-f025-4700-b6f7-3eeb99ec99cc/ReportSection6fbd4b24cef52a8efc10?experience=power-bi&filter=Merge1%2FCapexBusinessCaseId eq '" + $scope.CapexBusinessLicencingColl[i].ID + "'";
                           

                        }

                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/ebd1f24f-994d-4b29-a896-77608fa5651d/ReportSection6fbd4b24cef52a8efc10?experience=power-bi&filter=Merge1%2FCapexBusinessCaseId%20eq '" + $scope.CapexBusinessLicencingColl[i].ID + "'";


                        }



                        //  $scope.CapexBusinessLicencingColl[i];
                        OLFinalArray.push($scope.CapexBusinessLicencingColl[i]);
                        break;

                    }
                }
            }

        }
        $scope.CapexBusinessLicencingColl = OLFinalArray;
        if ($scope.CapexBusinessLicencingColl1.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }
        $scope.test = $scope.CapexBusinessLicencingColl;


        $scope.totalItems = $scope.CapexBusinessLicencingColl1.length; // Total number of items
        $scope.currentPage = 1; // Current page
        $scope.itemsPerPage = 20; // Items per page
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

        $scope.displayedItems = generateItems(); // Initialize displayed items

    });

    $scope.onAddInitiationClick = function () {


        $location.path('/AddCapexBusinessCase')

    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Capex') {
            $location.path('/EditCapex');
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

            if ($scope.getStrategy[0].Strategy.Title == "Capex") {
                Logics.setSharingData(request);
                $location.path('/AddCapexBusinessCase')
            }
        }
    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Capex') {
            $location.path('/ViewCapexLicensing');
        }
    }

    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Capex') {
            $location.path('/ChangeStageCapex');
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
                
                        var strCapexBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?&$select=*&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                        var strCapexPhaseDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?&$select=*,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=*,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strCapexCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexCommentsWorkflowHistory')/items?&$select=Id,Title,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

                        var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexBusinessCaseDocuments')/items?$select=*,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                      var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('CapexLicenseSupportingDocument')/items?$select=Id,Title,CapexBusinessCaseId,CapexBusinessCase/Title&$expand=CapexBusinessCase&$filter=CapexBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                
                
                
                        var urlColl = [strCapexBusinessCaseUrl, strCapexPhaseDetailsUrl, strCapexProductDetailsUrl, strCapexCommentsWorkflowHistoryUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strBusinessCaseOLSupportingDocumentURL];
                
                        Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then( async function (batchedData) {
                
                            $scope.CapexBusinessCaseColl = batchedData[0].d.results;
                            $scope.CapexPhaseDetailsColl = batchedData[1].d.results;
                            $scope.CapexProductDetailsColl = batchedData[2].d.results;
                            $scope.CapexCommentsWorkflowHistoryColl = batchedData[3].d.results;
                
                            $scope.BusinessCaseOLDocumentLinkColl = batchedData[4].d.results;
                            $scope.BusinessCaseOLSupportingDocumentColl = batchedData[5].d.results;
                
                
                
                            $scope.CapexPhaseDetailsColl1 = $scope.CapexPhaseDetailsColl.filter(function (item) {
                                return (item.CapexBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.CapexProductDetailsColl1 = $scope.CapexProductDetailsColl.filter(function (item) {
                                return (item.CapexBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.CapexCommentsWorkflowHistoryColl1 = $scope.CapexCommentsWorkflowHistoryColl.filter(function (item) {
                                return (item.CapexBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLDocumentLinkColl1 = $scope.BusinessCaseOLDocumentLinkColl.filter(function (item) {
                                return (item.CapexBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLSupportingDocumentColl1 = $scope.BusinessCaseOLSupportingDocumentColl.filter(function (item) {
                                return (item.CapexBusinessCaseId == $scope.IntiateID);
                            });
                
                         
                
                           // var deferred = $q.defer();
                            
                        var updatedBUBatch1 = [];
                        var updatedBUBatch2 = [];
                        var updatedBUBatch3 = [];
                        var updatedBUBatch4 = [];
                        var updatedBUBatch5 = [];
                        var updatedBUBatch6 = [];
                
                
                        if($scope.CapexBusinessCaseColl.length>0){
                
                            var deferred = $q.defer();
                        updatedBUBatch1.push({
                
                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexBusinessCase')/items(" + $scope.IntiateID + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.CapexBusinessCaseListItem"
                                },
                                Delete: '' + $scope.isChecked
                
                            }
                
                
                        });
                
                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch1).then(function (insertedScheduleData2) {
                            console.log(insertedScheduleData2); 
                        });
                    }
                
                
                            if($scope.CapexCommentsWorkflowHistoryColl1.length>0){
                
                                // var deferred = $q.defer();
                                 for(var v=0;v<$scope.CapexCommentsWorkflowHistoryColl1.length;v++){
                                     updatedBUBatch4.push({
                             
                                         reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexCommentsWorkflowHistory')/items(" + $scope.CapexCommentsWorkflowHistoryColl1[v].Id + ")",
                                         action: "UPDATE",
                                         data: {
                                             __metadata: {
                                                 type: "SP.Data.CapexCommentsWorkflowHistoryListItem"
                                             },
                                             Delete: '' + $scope.isChecked
                             
                                         }
                                     });
                
                                     Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch4).then(function (insertedScheduleData4) {
                                        console.log(insertedScheduleData4);
                
                                    });
                
                                       
                                    }   
                            
                                }
                                  
                                         
                
                                         if($scope.CapexPhaseDetailsColl1.length>0){
                
                                            //  var deferred = $q.defer();
                                              for(var a=0;a<$scope.CapexPhaseDetailsColl1.length;a++){
                                  
                                  
                                              
                                              updatedBUBatch2.push({
                                  
                                                  reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items(" + $scope.CapexPhaseDetailsColl1[a].Id + ")",
                                                  action: "UPDATE",
                                                  data: {
                                                      __metadata: {
                                                          type: "SP.Data.CapexPhaseDetailsListItem"
                                                      },
                                                      Delete: '' + $scope.isChecked
                                      
                                                  }
                                              });
                                              Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch2).then(function (insertedScheduleData2) {
                                                console.log(insertedScheduleData2);
                                            });
                                            }
                                          
                                        }
                                        
                                  
                                      
                
                                              if($scope.CapexProductDetailsColl1.length>0){
                
                            
                                                // var deferred = $q.defer();
                                     
                                     
                                                 for(var r=0;r<$scope.CapexProductDetailsColl1.length;r++){
                                             updatedBUBatch3.push({
                                     
                                                 reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexProductDetails')/items(" + $scope.CapexProductDetailsColl1[r].Id + ")",
                                                 action: "UPDATE",
                                                 data: {
                                                     __metadata: {
                                                         type: "SP.Data.CapexProductDetailsListItem"
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
                
                                    var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/CapexBusinessCaseDocuments/items("+$scope.BusinessCaseOLDocumentLinkColl1[n].Id+")"
                               
                
                                   var  data= {
                                        '__metadata': { 'type': 'SP.Data.CapexBusinessCaseDocumentsItem' },
                
                                     
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
                
                    
                                        var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/CapexLicenseSupportingDocument/items(" + $scope.BusinessCaseOLSupportingDocumentColl1[d].Id + ")"
                                   
                    

                                        var  data= {
                                            '__metadata': { 'type': 'SP.Data.CapexLicenseSupportingDocumentItem' },
                    
                                         
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
                     
                        $location.path("/InitiatorCAPEXDash");
                        // $route.reload();
                                                 location.reload();

                
                        });
                
                      //  return deferred.promise;
                
                
                
                
                
                
                    
    
            // Your existing logic for fetching data and updating lists goes here...
            // Ensure this logic is inside the confirmation block, so it only executes when confirmed.
    
        } else {
            
            // User canceled the deletion, do nothing
                      // $route.reload();
                                                                       location.reload();
                                                                                               $location.path("/InitiatorCAPEXDash");


                       

            return;
        }
    };
});