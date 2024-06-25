// // appOperations.controller("ELTReviewerCAPEXDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
// //     //var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"
// //     var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,LapVersion,CapexValue,Site/Id,Site/Title,ProductCategory/Id,ProductCategory/Title,CapexContext/Id,CapexContext/Title,VersionNo,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Modified,BusinessCaseDescription,BusinessCaseName,Counter,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Site,ProductCategory,CapexContext,CaseStage,Initiators,Reviewers,SubStrategy&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"

// //     var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

// //     var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

// //     var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase&$filter=ProductName/Id ne null &$top=5000&$orderby=ID desc";

// //     $scope.test=[];

// //     var urlColl = [strBusinessCapexLicencingUrl, strStrategyUrl, strSubStrategyUrl, strCapexProductDetailsUrl];
// //     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

// //         $scope.PreviousCurrentPage = 1;
// //         $scope.PreviousItemsPerPage = 500;
// //         $scope.CurrentPage = 1;
// //         $scope.itemsPerPage = 20// 10;
// //         $scope.upComingCurrentPage = 1;
// //         $scope.upComingItemsPerPage = 5;
// //         $scope.certCurrentPage = 1;
// //         $scope.certItemsPerPage = 10;

// //         $scope.pageSize1 = "5";

// //         $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;


// //         $scope.CapexBusinessLicencingColl = batchedData[0].d.results;
// //         $scope.StrategyColl = batchedData[1].d.results;
// //         $scope.SubStrategyColl = batchedData[2].d.results;

// //         $scope.CapexProductDetailsColl = batchedData[3].d.results;
// //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

// //         $scope.test = $scope.CapexBusinessLicencingColl1;






// //         if ($scope.CapexBusinessLicencingColl.length > 0) {
// //             var OLFinalArray = [];

// //             for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {

// //               //  for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Reviewers.results.length; j++) {
// //                     var gName = 'ELTReviewer';
// //                     var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
// //                     if (userExist == true) {
                       
// //                             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
// //                                 //  $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
// //                             }
// //                             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
// //                                 $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/ec8d7e64-d73e-4b9b-b266-be5d3d61ae36/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
    
// //                                 //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink="";
    
// //                             }
// //                             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
// //                                 $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/2bcf350a-62dc-4d6c-ab24-d16a797e9eca/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
// //                                 //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "";
    
// //                             }
// //                             //  $scope.CapexBusinessLicencingColl[i];
// //                             OLFinalArray.push($scope.CapexBusinessLicencingColl[i]);
// //                           //  break;
    
    
                        

// //                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
// //                             $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
// //                         }
// //                          if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
// //                             $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
// //                         }
        
// //                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
// //                             $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
        
        
// //                         }

                        
// //                         //  $scope.CapexBusinessLicencingColl[i];
// //                         OLFinalArray.push($scope.CapexBusinessLicencingColl[i]);
// //                       //  break;


// //                     }
           
    

// //             }



// //             $scope.StatusFilter = function (xyz) {

// //                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

// //                 $scope.ddlStatus = xyz;


// //             }

          

            
// //         $scope.Productfilter = function (pname) {

// //             if (pname != null && pname != undefined) {
// //                 $scope.DupCapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
// //                     return item.ProductName.Id == pname;
// //                 });
// //                 var FArry = [];
// //                 for (var c = 0; c < $scope.DupCapexProductDetailsColl.length; c++) {

// //                     var filteredData = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
// //                         return item.ID == $scope.DupCapexProductDetailsColl[c].CapexBusinessCase.Id;
// //                     });
// //                     if (filteredData.length > 0) {
// //                         var col = {};
// //                         col.Id = filteredData[0].Id;
// //                         col.ID = filteredData[0].ID;
// //                         col.Modified = filteredData[0].Modified;


// //                         col.Title = filteredData[0].Title;
// //                         col.CaseStatus = filteredData[0].CaseStatus;
// //                         col.BusinessCaseName = filteredData[0].BusinessCaseName;
// //                         col.VersionNo = filteredData[0].VersionNo;
// //                         col.LapVersion = filteredData[0].LapVersion;
// //                         col.CapexValue = filteredData[0].CapexValue;
// //                         col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;


// //                         if (filteredData[0].CaseStage.Id != 0) {
// //                             var CaseStage = [];

// //                             CaseStage.Title = filteredData[0].CaseStage.Title;
// //                             CaseStage.Id = filteredData[0].CaseStage.Id;
// //                             col.CaseStage = filteredData[0].CaseStage;
// //                         }

// //                         if (filteredData[0].Strategy.Id != 0) {
// //                             var Strategy = [];
// //                             Strategy.Title = filteredData[0].Strategy.Title;
// //                             Strategy.Id = filteredData[0].Strategy.Id;
// //                             col.Strategy = filteredData[0].Strategy;


// //                         }
// //                         if (filteredData[0].ProductCategory.Id != 0) {
// //                             var ProductCategory = [];
// //                             ProductCategory.Title = filteredData[0].ProductCategory.Title;
// //                             ProductCategory.Id = filteredData[0].ProductCategory.Id;
// //                             col.ProductCategory = filteredData[0].ProductCategory;
// //                         }

// //                         if (filteredData[0].Site.Id != 0) {
// //                             var Site = [];
// //                             Site.Title = filteredData[0].Site.Title;
// //                             Site.Id = filteredData[0].Site.Id;
// //                             col.Site = filteredData[0].Site;
// //                         }


// //                         if (filteredData[0].CapexContext.Id != 0) {
// //                             var CapexContext = [];
// //                             CapexContext.Title = filteredData[0].CapexContext.Title;
// //                             CapexContext.Id = filteredData[0].CapexContext.Id;
// //                             col.CapexContext = filteredData[0].CapexContext;
// //                         }

// //                         FArry.push(col);


// //                     }



// //                 }


// //                 // TO FILTER REPEATED BUSINESS CASE 
// //                 function filterUnique(arr, property) {
// //                     return arr.filter((item, index, self) =>
// //                         index === self.findIndex((t) => t[property] === item[property])
// //                     );
// //                 }

// //                 // Use the custom filter function to get unique objects based on CapexBusinessCaseId
// //                 var unique = filterUnique(FArry, "ID");


// //                 $scope.CapexBusinessLicencingColl1 = unique;
// //                 $scope.test = $scope.CapexBusinessLicencingColl1;


// //                 console.log(unique);

// //             }
// //            else if(pname==0) {

// //                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
// //                 $scope.test = $scope.CapexBusinessLicencingColl1;
// //             }
            
// //             else {

// //                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
// //                 $scope.test = $scope.CapexBusinessLicencingColl1;

// //             }

// //         }

// //             if ($scope.CapexProductDetailsColl.length > 0) {

// //                 $scope.uniqueArray = $scope.CapexProductDetailsColl.filter(function (item, index, array) {
// //                     return array.indexOf(item) === index;
// //                 });
// //                 var newfilteredarray = [];
// //                 var newfilteredarray2 = [];
// //                 var obj = [];
// //                 for (var i = 0; i < $scope.CapexProductDetailsColl.length; i++) {
// //                     var col = {};

// //                     col.CapexBusinessCaseId = $scope.CapexProductDetailsColl[i].CapexBusinessCase.Id;
// //                     col.ProductId = $scope.CapexProductDetailsColl[i].ProductName.Id;
// //                     col.ProductTitle = $scope.CapexProductDetailsColl[i].ProductName.Title;

// //                     obj.push(col);
// //                 }

// //                 // Define a custom function to filter unique objects based on CapexBusinessCaseId
// //                 function filterUnique(arr, property) {
// //                     return arr.filter((item, index, self) =>
// //                         index === self.findIndex((t) => t[property] === item[property])
// //                     );
// //                 }

// //                 // Use the custom filter function to get unique objects based on CapexBusinessCaseId
// //                 var unique = filterUnique(obj, "CapexBusinessCaseId");



// //                 var PRODunique = filterUnique(obj, "ProductId");

// //                 console.log(PRODunique);
// //                 console.log(unique);
// //                 newfilteredarray2.push(unique);
// //                 newfilteredarray.push(PRODunique);

// //                 $scope.newfilteredarrayColl = newfilteredarray[0];

// //             }
// //             //



// //         }
// //         $scope.AllFINALArry = $scope.CapexBusinessLicencingColl1

// //         $scope.CapexBusinessLicencingColl = OLFinalArray;


// //         $scope.CapexBusinessLicencingColl1 = $filter('filter')($scope.CapexBusinessLicencingColl, function (responseLine) {

// //             return (responseLine.CaseStatus === "Under Internal Review");
       
            
// //         });

// //         if ($scope.CapexBusinessLicencingColl.length == 0) {

// //             $scope.nodata = true;
// //         }
// //         else {

// //             $scope.nodata = false;
// //         }

// //         // PAGINATION

// //         $scope.test = $scope.CapexBusinessLicencingColl;

// //         $scope.totalItems = $scope.CapexBusinessLicencingColl.length; // Total number of items
// //         $scope.currentPage = 1; // Current page
// //         $scope.itemsPerPage = 20// 5; // Items per page
// //         $scope.maxSize = 5; // Maximum number of pagination links to display
// //         $scope.displayedItems = [];

// //         $scope.updatePagination = function () {
// //             $scope.currentPage = 1; // Reset current page to 1 when items per page changes
// //             $scope.displayedItems = generateItems(); // Update displayed items
// //         };

// //         function generateItems() {
// //             const startIdx = ($scope.currentPage - 1) * $scope.itemsPerPage;
// //             const endIdx = startIdx + $scope.itemsPerPage;
// //             return Array.from({ length: $scope.totalItems }).map((_, idx) => `Item ${idx + 1}`).slice(startIdx, endIdx);
// //         }

// //         $scope.displayedItems = generateItems();
// //     });


// //     $scope.statusChnage = function (ddlStatus) {

// //         $scope.CapexBusinessLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

// //             return responseLine.CaseStatus == ddlStatus;
// //         });
// //         console.log($scope.CapexBusinessLicencingColl);

// //     }


// //     // $scope.ViewReviewerForm = function (request) {
// //     //     Logics.setSharingData(request);


// //     //     if (request.Strategy.Title == 'Capex') {
// //     //         $location.path('/ReviewerCapexLicensingBusinessCaseView');
// //     //     }
// //     // }

// //     $scope.ViewReviewerForm = function (request,ELTReviewerCapexDash) {
// //         Logics.setSharingDataTwoDash(request,ELTReviewerCapexDash);

// //         if (request.Strategy.Title == 'Capex') {
// //             $location.path('/ReviewerCapexLicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
// //         }
// //     }
  

// //     $scope.ReviewForm = function (request) {
// //         Logics.setSharingData(request);

// //         if (request.Strategy.Title == 'Capex') {
// //             $location.path('/ReviewerReviewCapexLicensingBusinessCase');//ReviewerReviewAndaLicensingBusinessCase
// //         }
// //     }

// //     $scope.onClickHome = function () {
// //         window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

// //     }
// // });

// appOperations.controller("ELTReviewerCAPEXDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
//     localStorage.clear();// New Change VD

//     //var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,CaseStatus,Modified,Title,InitiationDate,BusinessCaseName,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,CaseStage,Initiators,Reviewers&$top=5000&$orderby=ID desc"
//     var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,LapVersion,CapexValue,Site/Id,Site/Title,ProductCategory/Id,ProductCategory/Title,CapexContext/Id,CapexContext/Title,VersionNo,Initiators/Id,Initiators/Title,Reviewers/Id,Reviewers/Title,Modified,BusinessCaseDescription,BusinessCaseName,Counter,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Site,ProductCategory,CapexContext,CaseStage,Initiators,Reviewers,SubStrategy&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"

//     var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

//     var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

//     var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase&$filter=ProductName/Id ne null &$top=5000&$orderby=ID desc";

//     $scope.test=[];

//     var urlColl = [strBusinessCapexLicencingUrl, strStrategyUrl, strSubStrategyUrl, strCapexProductDetailsUrl];
//     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

//         $scope.PreviousCurrentPage = 1;
//         $scope.PreviousItemsPerPage = 500;
//         $scope.CurrentPage = 1;
//         $scope.itemsPerPage = 20// 10;
//         $scope.upComingCurrentPage = 1;
//         $scope.upComingItemsPerPage = 5;
//         $scope.certCurrentPage = 1;
//         $scope.certItemsPerPage = 10;

//         $scope.pageSize1 = "5";

//         $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;


//         $scope.CapexBusinessLicencingColl = batchedData[0].d.results;
//         $scope.StrategyColl = batchedData[1].d.results;
//         $scope.SubStrategyColl = batchedData[2].d.results;

//         $scope.CapexProductDetailsColl = batchedData[3].d.results;
//         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

//         $scope.test = $scope.CapexBusinessLicencingColl1;






//         if ($scope.CapexBusinessLicencingColl.length > 0) {
//             var OLFinalArray = [];

//             for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {

//              //   for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Reviewers.results.length; j++) {
//                     //var gName = $scope.CapexBusinessLicencingColl[i].Reviewers.results[j].Title;
//                     var gName ='ELTReviewer';

//                     var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
//                     if (userExist == true) {
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                             //  $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
//                         }
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                             $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/ec8d7e64-d73e-4b9b-b266-be5d3d61ae36/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";

//                             //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink="";

//                         }
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                             $scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/2bcf350a-62dc-4d6c-ab24-d16a797e9eca/ReportSection?experience=power-bi&filter=CapexBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
//                             //$scope.CapexBusinessLicencingColl[i].V2VPowerBiLink = "";

//                         }


//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                             $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";
//                         }
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                            // $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.OutBusinessLicencingColl[i].ID + "";
//                            $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/b367dff5-451a-49ed-87eb-a380c3988943/reports/bc13a726-f025-4700-b6f7-3eeb99ec99cc/ReportSection6fbd4b24cef52a8efc10?experience=power-bi&filter=Merge1%2FCapexBusinessCaseId eq '" + $scope.CapexBusinessLicencingColl[i].ID + "'";
                           

//                         }

//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                             $scope.CapexBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.CapexBusinessLicencingColl[i].ID + "";


//                         }


                        
//                         //  $scope.CapexBusinessLicencingColl[i];
//                         OLFinalArray.push($scope.CapexBusinessLicencingColl[i]);
//                        // break;


//                     }
//                // }

                
//             if($scope.CapexBusinessLicencingColl.length>0){

//                 $scope.ddlStatus="";
//                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//                 $scope.test = $scope.CapexBusinessLicencingColl1;
//              }

//                 // $scope.showallstatus = 'conditionForFalse'; // Initial value

//                 // $scope.toggleStatus = function () {
//                 //     // Your logic based on the true or false value of showallstatus
//                 //     if ($scope.showallstatus === 'conditionForTrue') {
//                 //         // Do something when true
    
//                 //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
    
//                 //         $scope.ddlStatus = "Under Internal Review";
//                 //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//                 //         $scope.test = $scope.CapexBusinessLicencingColl1;
                   
//                 //     } else {
//                 //         $scope.ddlStatus = "";
//                 //         // Do something when false
//                 //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
    
//                 //         //  alert('Radhe Radhe');
    
//                 //     }
//                 // };
    

//             }




//             // To show all status filter button
//             $scope.ShowallSatus = function (ar) {


//                 if (ar == true) {
//                     $scope.ddlStatus = "";
//                     $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

//                 }






//             }




//             // arvind


          
//             //

//             $scope.StatusFilter = function (xyz) {

//                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

//                 $scope.ddlStatus = xyz;


//             }

//             //



//             // product filter workingng 6dec 2013 --arvind
//             // $scope.Productfilter = function (pname) {

//             //     if (pname != null && pname != undefined) {
//             //         $scope.DupCapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
//             //             return item.ProductName.Id == pname;
//             //         });
//             //         var FArry = [];
//             //         for (var c = 0; c < $scope.DupCapexProductDetailsColl.length; c++) {

//             //             var filteredData = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
//             //                 return item.ID == $scope.DupCapexProductDetailsColl[c].CapexBusinessCase.Id;
//             //             });
//             //             if (filteredData.length > 0) {
//             //                 var col = {};
//             //                 col.Id = filteredData[0].Id;
//             //                 col.ID = filteredData[0].ID;
//             //                 col.Modified = filteredData[0].Modified;


//             //                 col.Title = filteredData[0].Title;
//             //                 col.CaseStatus = filteredData[0].CaseStatus;
//             //                 col.BusinessCaseName = filteredData[0].BusinessCaseName;
//             //                 col.VersionNo = filteredData[0].VersionNo;
//             //                 col.LapVersion = filteredData[0].LapVersion;
//             //                 col.CapexValue = filteredData[0].CapexValue;
//             //                 col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;


//             //                 if (filteredData[0].CaseStage.Id != 0) {
//             //                     var CaseStage = [];

//             //                     CaseStage.Title = filteredData[0].CaseStage.Title;
//             //                     CaseStage.Id = filteredData[0].CaseStage.Id;
//             //                     col.CaseStage = filteredData[0].CaseStage;
//             //                 }

//             //                 if (filteredData[0].Strategy.Id != 0) {
//             //                     var Strategy = [];
//             //                     Strategy.Title = filteredData[0].Strategy.Title;
//             //                     Strategy.Id = filteredData[0].Strategy.Id;
//             //                     col.Strategy = filteredData[0].Strategy;


//             //                 }
//             //                 if (filteredData[0].ProductCategory.Id != 0) {
//             //                     var ProductCategory = [];
//             //                     ProductCategory.Title = filteredData[0].ProductCategory.Title;
//             //                     ProductCategory.Id = filteredData[0].ProductCategory.Id;
//             //                     col.ProductCategory = filteredData[0].ProductCategory;
//             //                 }

//             //                 if (filteredData[0].Site.Id != 0) {
//             //                     var Site = [];
//             //                     Site.Title = filteredData[0].Site.Title;
//             //                     Site.Id = filteredData[0].Site.Id;
//             //                     col.Site = filteredData[0].Site;
//             //                 }


//             //                 if (filteredData[0].CapexContext.Id != 0) {
//             //                     var CapexContext = [];
//             //                     CapexContext.Title = filteredData[0].CapexContext.Title;
//             //                     CapexContext.Id = filteredData[0].CapexContext.Id;
//             //                     col.CapexContext = filteredData[0].CapexContext;
//             //                 }

//             //                 FArry.push(col);
//             //             }
//             //         }


//             //         // TO FILTER REPEATED BUSINESS CASE 
//             //         function filterUnique(arr, property) {
//             //             return arr.filter((item, index, self) =>
//             //                 index === self.findIndex((t) => t[property] === item[property])
//             //             );
//             //         }

//             //         // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//             //         var unique = filterUnique(FArry, "ID");


//             //         $scope.CapexBusinessLicencingColl1 = unique;

//             //         console.log(unique);

//             //     }
//             //     else if (pname == 0) {

//             //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//             //     }

//             //     else {

//             //         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//             //     }

//             // }

            
//         $scope.Productfilter = function (pname) {

//             if (pname != null && pname != undefined) {
//                 $scope.DupCapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
//                     return item.ProductName.Id == pname;
//                 });
//                 var FArry = [];
//                 for (var c = 0; c < $scope.DupCapexProductDetailsColl.length; c++) {

//                     var filteredData = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
//                         return item.ID == $scope.DupCapexProductDetailsColl[c].CapexBusinessCase.Id;
//                     });
//                     if (filteredData.length > 0) {
//                         var col = {};
//                         col.Id = filteredData[0].Id;
//                         col.ID = filteredData[0].ID;
//                         col.Modified = filteredData[0].Modified;


//                         col.Title = filteredData[0].Title;
//                         col.CaseStatus = filteredData[0].CaseStatus;
//                         col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                         col.VersionNo = filteredData[0].VersionNo;
//                         col.LapVersion = filteredData[0].LapVersion;
//                         col.CapexValue = filteredData[0].CapexValue;
//                         col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;


//                         if (filteredData[0].CaseStage.Id != 0) {
//                             var CaseStage = [];

//                             CaseStage.Title = filteredData[0].CaseStage.Title;
//                             CaseStage.Id = filteredData[0].CaseStage.Id;
//                             col.CaseStage = filteredData[0].CaseStage;
//                         }

//                         if (filteredData[0].Strategy.Id != 0) {
//                             var Strategy = [];
//                             Strategy.Title = filteredData[0].Strategy.Title;
//                             Strategy.Id = filteredData[0].Strategy.Id;
//                             col.Strategy = filteredData[0].Strategy;


//                         }
//                         if (filteredData[0].ProductCategory.Id != 0) {
//                             var ProductCategory = [];
//                             ProductCategory.Title = filteredData[0].ProductCategory.Title;
//                             ProductCategory.Id = filteredData[0].ProductCategory.Id;
//                             col.ProductCategory = filteredData[0].ProductCategory;
//                         }

//                         if (filteredData[0].Site.Id != 0) {
//                             var Site = [];
//                             Site.Title = filteredData[0].Site.Title;
//                             Site.Id = filteredData[0].Site.Id;
//                             col.Site = filteredData[0].Site;
//                         }


//                         if (filteredData[0].CapexContext.Id != 0) {
//                             var CapexContext = [];
//                             CapexContext.Title = filteredData[0].CapexContext.Title;
//                             CapexContext.Id = filteredData[0].CapexContext.Id;
//                             col.CapexContext = filteredData[0].CapexContext;
//                         }

//                         FArry.push(col);


//                     }



//                 }


//                 // TO FILTER REPEATED BUSINESS CASE 
//                 function filterUnique(arr, property) {
//                     return arr.filter((item, index, self) =>
//                         index === self.findIndex((t) => t[property] === item[property])
//                     );
//                 }

//                 // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//                 var unique = filterUnique(FArry, "ID");


//                 $scope.CapexBusinessLicencingColl1 = unique;
//                 $scope.test = $scope.CapexBusinessLicencingColl1;


//                 console.log(unique);

//             }
//            else if(pname==0) {

//                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//                 $scope.test = $scope.CapexBusinessLicencingColl1;
//             }
            
//             else {

//                 $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//                 $scope.test = $scope.CapexBusinessLicencingColl1;

//             }

//         }

//             if ($scope.CapexProductDetailsColl.length > 0) {

//                 $scope.uniqueArray = $scope.CapexProductDetailsColl.filter(function (item, index, array) {
//                     return array.indexOf(item) === index;
//                 });
//                 var newfilteredarray = [];
//                 var newfilteredarray2 = [];
//                 var obj = [];
//                 for (var i = 0; i < $scope.CapexProductDetailsColl.length; i++) {
//                     var col = {};

//                     col.CapexBusinessCaseId = $scope.CapexProductDetailsColl[i].CapexBusinessCase.Id;
//                     col.ProductId = $scope.CapexProductDetailsColl[i].ProductName.Id;
//                     col.ProductTitle = $scope.CapexProductDetailsColl[i].ProductName.Title;

//                     obj.push(col);
//                 }

//                 // Define a custom function to filter unique objects based on CapexBusinessCaseId
//                 function filterUnique(arr, property) {
//                     return arr.filter((item, index, self) =>
//                         index === self.findIndex((t) => t[property] === item[property])
//                     );
//                 }

//                 // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//                 var unique = filterUnique(obj, "CapexBusinessCaseId");



//                 var PRODunique = filterUnique(obj, "ProductId");

//                 console.log(PRODunique);
//                 console.log(unique);
//                 newfilteredarray2.push(unique);
//                 newfilteredarray.push(PRODunique);

//                 $scope.newfilteredarrayColl = newfilteredarray[0];

//             }
//             //



//         }
//         $scope.AllFINALArry = $scope.CapexBusinessLicencingColl1

//         $scope.CapexBusinessLicencingColl = OLFinalArray;


//         // $scope.CapexBusinessLicencingColl1 = $filter('filter')($scope.CapexBusinessLicencingColl, function (responseLine) {

//         //     return (responseLine.CaseStatus === "Under Internal Review");
       
            
//         // });

//         if ($scope.CapexBusinessLicencingColl.length == 0) {

//             $scope.nodata = true;
//         }
//         else {

//             $scope.nodata = false;
//         }

//         // PAGINATION

//         $scope.test = $scope.CapexBusinessLicencingColl;

//         $scope.totalItems = $scope.CapexBusinessLicencingColl.length; // Total number of items
//         $scope.currentPage = 1; // Current page
//         $scope.itemsPerPage = 20// 5; // Items per page
//         $scope.maxSize = 5; // Maximum number of pagination links to display
//         $scope.displayedItems = [];

//         $scope.updatePagination = function () {
//             $scope.currentPage = 1; // Reset current page to 1 when items per page changes
//             $scope.displayedItems = generateItems(); // Update displayed items
//         };

//         function generateItems() {
//             const startIdx = ($scope.currentPage - 1) * $scope.itemsPerPage;
//             const endIdx = startIdx + $scope.itemsPerPage;
//             return Array.from({ length: $scope.totalItems }).map((_, idx) => `Item ${idx + 1}`).slice(startIdx, endIdx);
//         }

//         $scope.displayedItems = generateItems();
//     });


//     $scope.statusChnage = function (ddlStatus) {

//         $scope.CapexBusinessLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

//             return responseLine.CaseStatus == ddlStatus;
//         });
//         console.log($scope.CapexBusinessLicencingColl);

//     }


// //   $scope.ViewReviewerForm = function (request,ELTReviewerAPIDash) {
// //         Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);


// //         if (request.Strategy.Title == 'Capex') {
// //             $location.path('/ReviewerCapexLicensingBusinessCaseView');
// //         }
// //     }
    



//            //view
//            $scope.ViewReviewerForm = function (request,ELTReviewerAPIDash) {
//             Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);
//             localStorage.setItem("dashboard", ELTReviewerAPIDash);// New Change VD
//             localStorage.setItem("Value", request);// New Change VD
//             if (request.Strategy.Title == 'Capex') {
//                 $location.path('/ReviewerCapexLicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
//             }
//         }

//         // Review Business-Case Initiation//
//     $scope.ReviewForm = function (request) {
//         Logics.setSharingData(request);

//         if (request.Strategy.Title == 'Capex') {
//             $location.path('/ReviewerReviewCapexLicensingBusinessCase');//ReviewerReviewAndaLicensingBusinessCase
//         }
//     }

//     $scope.onClickHome = function () {
//         window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

//     }
// });


appOperations.controller("ELTReviewerCAPEXDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    //var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,VersionNo,Modified,BusinessCaseDescription,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,Initiators,Reviewers,Validators&$top=5000&$orderby=ID desc"
  
    localStorage.clear();
    var strBusinessCapexLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,CapexValue,LapVersion,Site/Id,Site/Title,ProductCategory/Id,ProductCategory/Title,CapexContext/Id,CapexContext/Title,VersionNo,Initiators/Id,Initiators/Title,Validators/Id,Validators/Title,Modified,BusinessCaseDescription,BusinessCaseName,Counter,InitiationDate,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Site,ProductCategory,CapexContext,CaseStage,Initiators,Validators,SubStrategy&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"

    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

    var strCapexProductDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexProductDetails')/items?&$select=Id,Title,Modified,ProductName/Id,ProductName/Title,ProductSubheading,CapexPhase/Id,CapexPhase/Title,CapexBusinessCase/Id,CapexBusinessCase/Title&$expand=CapexPhase,ProductName,CapexBusinessCase&$filter=ProductName/Id ne null &$top=5000&$orderby=ID desc";

    var urlColl = [strBusinessCapexLicencingUrl, strStrategyUrl, strSubStrategyUrl,strCapexProductDetailsUrl];
  
    $scope.test=[];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.itemsPerPage =20// 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;
        $scope.pageSize1 = "5"
        $scope.CapexBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        $scope.CapexProductDetailsColl = batchedData[3].d.results;
        $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

        $scope.test = $scope.CapexBusinessLicencingColl1;



        if ($scope.CapexBusinessLicencingColl.length > 0) {


            var OLFinalArray = [];

            for (var i = 0; i < $scope.CapexBusinessLicencingColl.length; i++) {
                for (var j = 0; j < $scope.CapexBusinessLicencingColl[i].Validators.results.length; j++) {
                    var gName = $scope.CapexBusinessLicencingColl[i].Validators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, 'ELTReviewer')
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

                $scope.ShowallSatus=function(){

                    {
                        if( $scope.CapexBusinessLicencingColl.length>0){

                            $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

                            $scope.ddlStatus="";
                        }
                        else{

                            $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;

                          //  $scope.ddlStatus="";

                        }
                       
                
                    }
                
                
                }






// arvind

$scope.showallstatus = 'conditionForFalse'; // Initial value

$scope.toggleStatus = function() {
  // Your logic based on the true or false value of showallstatus
  if ($scope.showallstatus === 'conditionForTrue') {

    $scope.test = $scope.CapexBusinessLicencingColl1;

   
    location.reload();
    
  } else {
   
    $scope.ddlStatus = "";

    

    $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
    $scope.test = $scope.CapexBusinessLicencingColl; 
}
};


//



                
                
                $scope.StatusFilter= function(xyz){
                    if($scope.CapexBusinessLicencingColl.length>0){
                        $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
                
                        $scope.ddlStatus=xyz;

                    }
                     $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
                
                    // $scope.ddlStatus=xyz;
                
                
                }
            }


            // product filter workingng 6dec 2013 --arvind
// $scope.Productfilter = function (pname) {

//     if (pname != null && pname != undefined) {
//         $scope.DupCapexProductDetailsColl = $filter('filter')($scope.CapexProductDetailsColl, function (item) {
//             return item.ProductName.Id == pname;
//         });
//         var FArry = [];
//         for (var c = 0; c < $scope.DupCapexProductDetailsColl.length; c++) {

//             var filteredData = $filter('filter')($scope.CapexBusinessLicencingColl, function (item) {
//                 return item.ID == $scope.DupCapexProductDetailsColl[c].CapexBusinessCase.Id;
//             });
//             if (filteredData.length > 0) {
//                 var col = {};
//                 col.Id = filteredData[0].Id;
//                 col.ID = filteredData[0].ID;
//                 col.Modified = filteredData[0].Modified;


//                 col.Title = filteredData[0].Title;
//                 col.CaseStatus = filteredData[0].CaseStatus;
//                 col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                 col.VersionNo = filteredData[0].VersionNo;
//                 col.LapVersion = filteredData[0].LapVersion;
//                 col.CapexValue = filteredData[0].CapexValue;
//                 col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;


//                 if (filteredData[0].CaseStage.Id != 0) {
//                     var CaseStage = [];

//                     CaseStage.Title = filteredData[0].CaseStage.Title;
//                     CaseStage.Id = filteredData[0].CaseStage.Id;
//                     col.CaseStage = filteredData[0].CaseStage;
//                 }

//                 if (filteredData[0].Strategy.Id != 0) {
//                     var Strategy = [];
//                     Strategy.Title = filteredData[0].Strategy.Title;
//                     Strategy.Id = filteredData[0].Strategy.Id;
//                     col.Strategy = filteredData[0].Strategy;


//                 }
//                 if (filteredData[0].ProductCategory.Id != 0) {
//                     var ProductCategory = [];
//                     ProductCategory.Title = filteredData[0].ProductCategory.Title;
//                     ProductCategory.Id = filteredData[0].ProductCategory.Id;
//                     col.ProductCategory = filteredData[0].ProductCategory;
//                 }

//                 if (filteredData[0].Site.Id != 0) {
//                     var Site = [];
//                     Site.Title = filteredData[0].Site.Title;
//                     Site.Id = filteredData[0].Site.Id;
//                     col.Site = filteredData[0].Site;
//                 }


//                 if (filteredData[0].CapexContext.Id != 0) {
//                     var CapexContext = [];
//                     CapexContext.Title = filteredData[0].CapexContext.Title;
//                     CapexContext.Id = filteredData[0].CapexContext.Id;
//                     col.CapexContext = filteredData[0].CapexContext;
//                 }

//                 FArry.push(col);

//             }



//         }


//         // TO FILTER REPEATED BUSINESS CASE 
//         function filterUnique(arr, property) {
//             return arr.filter((item, index, self) =>
//                 index === self.findIndex((t) => t[property] === item[property])
//             );
//         }

//         // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//         var unique = filterUnique(FArry, "ID");


//         $scope.CapexBusinessLicencingColl1 = unique;

//         console.log(unique);

//     }
//    else if(pname==0) {

//         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//     }
    
//     else {

//         $scope.CapexBusinessLicencingColl1 = $scope.CapexBusinessLicencingColl;
//     }

// }

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
//


        }

        //$scope.CapexBusinessLicencingColl = $scope.ValidateArry;//4
        $scope.AllFINALArry = $scope.CapexBusinessLicencingColl1;
        $scope.CapexBusinessLicencingColl = OLFinalArray;


        $scope.CapexBusinessLicencingColl1 = $filter('filter')($scope.CapexBusinessLicencingColl, function (responseLine) {

          //  return (responseLine.CaseStatus === "Minor Changes-by Validator" || responseLine.CaseStatus === "On Hold" || responseLine.CaseStatus === "Sent For Validation");
          return (responseLine.CaseStatus === "Ready for ELT Review" || responseLine.CaseStatus === "Under ELT Review" || responseLine.CaseStatus === "Business Case Published");
        });
        if ($scope.CapexBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }

        $scope.test = $scope.CapexBusinessLicencingColl1;

        $scope.totalItems = $scope.CapexBusinessLicencingColl.length; // Total number of items
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

        $scope.displayedItems = generateItems(); // Initialize displayed items

    });

    $scope.statusChnage = function (ddlStatus) {

        $scope.CapexBusinessLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.CapexBusinessLicencingColl);


    }
    // $scope.ViewValidateForm = function (request) {
    //     Logics.setSharingData(request);

    //     if (request.Strategy.Title == 'Capex') {
    //         $location.path('/ValidatorValidateCapexBusinessCaseView');
    //     }

    // }
    $scope.ViewValidateForm = function (request,ELTReviewerAPIDash) {
        Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);
        localStorage.setItem("dashboard", ELTReviewerAPIDash);// New Change VD
        localStorage.setItem("Value", request);// New Change VD
        if (request.Strategy.Title == 'Capex') {
            $location.path('/ReviewerCapexLicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
        }
    }


    $scope.ValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Capex') {
            $location.path('/ValidateCapex');
        }


    }
    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

});