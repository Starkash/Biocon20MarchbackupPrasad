﻿// appOperations.controller("ELTReviewerANDAUMEDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
//     var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,LapVersion,Modified,Title,BusinessCaseName,Counter,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
//     var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

//     var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

//     $scope.test=[];
//     var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl];
//     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

//         $scope.PreviousCurrentPage = 1;
//         $scope.PreviousItemsPerPage = 500;
//         $scope.CurrentPage = 1;
//         $scope.itemsPerPage =20// 10;
//         $scope.upComingCurrentPage = 1;
//         $scope.upComingItemsPerPage = 5;
//         $scope.certCurrentPage = 1;
//         $scope.certItemsPerPage = 10;
//         $scope.pageSize1 = "5";

//         $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
//         $scope.APIColl = batchedData[0].d.results;
//         $scope.StrategyColl = batchedData[1].d.results;
//         $scope.SubStrategyColl = batchedData[2].d.results;

//         $scope.APIColl1=  $scope.APIColl;

        

//        $scope.test = $scope.APIColl1;

//         if ($scope.APIColl.length > 0) {
//           var  OLFinalArray=[];
//             for (var i = 0; i < $scope.APIColl.length; i++) {

//                     var gName ='ELTReviewer';
//                     var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, 'ELTReviewer')
//                     if (userExist == true) 
//                 {
//                     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                         //  $scope.APIColl[i].V2VPowerBiLink = "";
//                          // $scope.APIColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.APIColl[i].ID + "";
      
//                           //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
//                       }
//                        if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                           $scope.APIColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/b78c6e74-9a06-4804-9070-433a7d1b4f8d/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.APIColl[i].ID + "";
//                           // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
//                       }
//                       if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                           //   $scope.APIColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.APIColl[i].ID + "";
//                           $scope.APIColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/613e7790-240b-4a34-ab93-4f8493e74e9a/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.APIColl[i].ID + "";

      
//                       }

//                   // DRC Link

//                 if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                     $scope.APIColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.APIColl[i].ID + "";
//                 }
//                  if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                     $scope.APIColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.APIColl[i].ID + "";
//                 }

//                 if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                     $scope.APIColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.APIColl[i].ID + "";


//                 }

                  
//                    OLFinalArray.push($scope.APIColl[i]);
                  
//                 }
          
//             }

          

//         }

     
//         $scope.APIColl=OLFinalArray

     

//         $scope.test = $scope.APIColl;

//         $scope.totalItems = $scope.APIColl.length; // Total number of items
//         $scope.currentPage = 1; // Current page
//         $scope.itemsPerPage =20// 5; // Items per page
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

//         $scope.displayedItems = generateItems(); // Initialize displayed items

//     });

//     $scope.statusChnage = function (ddlStatus) {

//         $scope.APIColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

//             return responseLine.CaseStatus == ddlStatus;
//         });
//         console.log($scope.APIColl);

//     }

//     //view
//     $scope.ViewReviewerForm = function (request,ELTReviewerAPIDash) {
//         Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);

//         if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
//             $location.path('/ReviewerAndaUMELicensingBusinessCaseView');
//         }
//     }
  
    

//     $scope.onClickHome = function () {
//         window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

//     }
// });


// appOperations.controller("ELTReviewerANDAUMEDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
//     localStorage.clear();// New Change VD

//     var strBusinessUSAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,BusinessCaseDescription,VersionNo,LapVersion,CaseStatus,Counter,Modified,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
//     var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
//     var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
//     var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMELicensingLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,AndaUMEBusinessCase/Title,AndaUMEBusinessCaseId&$expand=AndaUMEBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";
//     $scope.test=[];

//     var urlColl = [strBusinessUSAndaLicencingUrl, strStrategyUrl, strSubStrategyUrl,strOutLicensingLaunchDetailsUrl];
//     Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

//         $scope.PreviousCurrentPage = 1;
//         $scope.PreviousItemsPerPage = 500;
//         $scope.CurrentPage = 1;
//         $scope.itemsPerPage =10// 10;
//         $scope.upComingCurrentPage = 1;
//         $scope.upComingItemsPerPage = 5;
//         $scope.certCurrentPage = 1;
//         $scope.certItemsPerPage = 10;

//         $scope.pageSize1 = "5";
//         // for username
//         $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

//         $scope.InBusinessLicencingLicencingColl = batchedData[0].d.results;
//         $scope.StrategyColl = batchedData[1].d.results;
//         $scope.SubStrategyColl = batchedData[2].d.results;
        
//         $scope.InBusinessLicencingLicencingColl1=$scope.InBusinessLicencingLicencingColl;
//         $scope.OutLicensingLaunchDetailColl = batchedData[3].d.results;
        
//         $scope.OutLicensingLaunchDetailColl2=$scope.OutLicensingLaunchDetailColl ;
//         $scope.OutBusinessLicencingColl2=$scope.InBusinessLicencingLicencingColl ;

//         $scope.OutLicensingLaunchDetailColl3=$scope.OutLicensingLaunchDetailColl ;
//         $scope.OutBusinessLicencingColl3=$scope.InBusinessLicencingLicencingColl ;
//         $scope.OutBusinessLicencingColl4=$scope.InBusinessLicencingLicencingColl ;
//         $scope.OutBusinessLicencingColl5=$scope.InBusinessLicencingLicencingColl ;
//         $scope.test = $scope.InBusinessLicencingLicencingColl1;


//         $scope.ifallblank=function(){

//             if(($scope.ddlStatus=="" ||$scope.ddlStatus==undefined) && ($scope.ddlPartner==undefined || $scope.ddlPartner=="" ) &&
//                 ($scope.Submarket==undefined || $scope.Submarket=="" ) && ($scope.ddlProduct5=="" || $scope.ddlProduct5==undefined)){
      
//             $route.reload();
      
      
//             }
//         }
      
//         $scope.Partnerfilter = function (pname,Submarket) {
      
//             Submarket=$scope.Submarket;
//             Submarket=$scope.Submarket;
//             sbmarketname = $scope.Submarket; 
//             partnerSelec = pname;
//             if (sbmarketname != null && sbmarketname != undefined && partnerSelec ==undefined) {
//                 $scope.Submarketfilter(Submarket,pname);
//             }
      
//              if (pname != null && pname != undefined && Submarket==undefined) {
//                  $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl2, function (item) {
//                      return item.PartnerId == pname;
//                  });
//                  var FArry = [];
//                  for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
      
//                      var filteredData = $filter('filter')($scope.OutBusinessLicencingColl2, function (item) {
//                          return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
//                      });
//                      if (filteredData.length > 0) {
//                          var col = {};
//                          col.Id = filteredData[0].Id;
//                          col.ID = filteredData[0].ID;
//                          col.Modified = filteredData[0].Modified;
      
      
//                          col.Title = filteredData[0].Title;
//                          col.CaseStatus = filteredData[0].CaseStatus;
//                          col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                          col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
//                          col.InitiationDate = filteredData[0].InitiationDate;
//                          col.VersionNo = filteredData[0].VersionNo;
//                          col.LapVersion = filteredData[0].LapVersion;
      
      
//                          if (filteredData[0].CaseStage.Id != 0) {
//                              var CaseStage = [];
      
//                              CaseStage.Title = filteredData[0].CaseStage.Title;
//                              CaseStage.Id = filteredData[0].CaseStage.Id;
//                              col.CaseStage = filteredData[0].CaseStage;
//                          }
      
//                          if (filteredData[0].Strategy.Id != 0) {
//                              var Strategy = [];
//                              Strategy.Title = filteredData[0].Strategy.Title;
//                              Strategy.Id = filteredData[0].Strategy.Id;
//                              col.Strategy = filteredData[0].Strategy;
      
      
//                          }
      
//                          if (filteredData[0].SubStrategy.Id != 0) {
//                             var SubStrategy = [];
//                             SubStrategy.Title = filteredData[0].SubStrategy.Title;
//                             SubStrategy.Id = filteredData[0].SubStrategy.Id;
//                             col.SubStrategy = filteredData[0].SubStrategy;
      
      
//                         }
//                         if (filteredData[0].ProductNameId != 0) {
//                             var ProductName = [];
//                             ProductName.Title = filteredData[0].ProductName.Title;
//                             ProductName.Id = filteredData[0].ProductNameId;
//                             col.ProductName = filteredData[0].ProductName;
//                             col.ProductNameId = filteredData[0].ProductNameId;
//                         }
      
//                         //  if (filteredData[0].ProductCategory.Id != 0) {
//                         //      var ProductCategory = [];
//                         //      ProductCategory.Title = filteredData[0].ProductCategory.Title;
//                         //      ProductCategory.Id = filteredData[0].ProductCategory.Id;
//                         //      col.ProductCategory = filteredData[0].ProductCategory;
//                         //  }
      
//                         //  if (filteredData[0].Site.Id != 0) {
//                         //      var Site = [];
//                         //      Site.Title = filteredData[0].Site.Title;
//                         //      Site.Id = filteredData[0].Site.Id;
//                         //      col.Site = filteredData[0].Site;
//                         //  }
      
      
//                         //  if (filteredData[0].CapexContext.Id != 0) {
//                         //      var CapexContext = [];
//                         //      CapexContext.Title = filteredData[0].CapexContext.Title;
//                         //      CapexContext.Id = filteredData[0].CapexContext.Id;
//                         //      col.CapexContext = filteredData[0].CapexContext;
//                         //  }
      
//                          FArry.push(col);
      
      
//                      }
      
      
      
//                  }
      
      
//                  // TO FILTER REPEATED BUSINESS CASE 
//                  function filterUnique(arr, property) {
//                      return arr.filter((item, index, self) =>
//                          index === self.findIndex((t) => t[property] === item[property])
//                      );
//                  }
      
//                  // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//                  var unique = filterUnique(FArry, "ID");
      
      
//                  $scope.OutBusinessLicencingColl = unique;
//                  $scope.test = unique;
      
      
//                  console.log(unique);
      
//              }
      
      
      
//              if (pname != null && pname != undefined && Submarket!=undefined) {
//                 $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl2, function (item) {
//                     return (item.PartnerId == pname && item.SubMarketId == Submarket);
//                 });
//                 var FArry = [];
//                 for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
      
//                     var filteredData = $filter('filter')($scope.OutBusinessLicencingColl2, function (item) {
//                         return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
//                     });
//                     if (filteredData.length > 0) {
//                         var col = {};
//                         col.Id = filteredData[0].Id;
//                         col.ID = filteredData[0].ID;
//                         col.Modified = filteredData[0].Modified;
      
      
//                         col.Title = filteredData[0].Title;
//                         col.CaseStatus = filteredData[0].CaseStatus;
//                         col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                         col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
//                         col.InitiationDate = filteredData[0].InitiationDate;
//                         col.VersionNo = filteredData[0].VersionNo;
//                         col.LapVersion = filteredData[0].LapVersion;
      
      
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
      
//                         if (filteredData[0].SubStrategy.Id != 0) {
//                            var SubStrategy = [];
//                            SubStrategy.Title = filteredData[0].SubStrategy.Title;
//                            SubStrategy.Id = filteredData[0].SubStrategy.Id;
//                            col.SubStrategy = filteredData[0].SubStrategy;
      
      
//                        }
//                        if (filteredData[0].ProductNameId) {
//                            var ProductName = [];
//                            ProductName.Title = filteredData[0].ProductName.Title;
//                            ProductName.Id = filteredData[0].ProductNameId;
//                            col.ProductName = filteredData[0].ProductName;
//                            col.ProductNameId = filteredData[0].ProductNameId;
      
//                        }
      
//                        //  if (filteredData[0].ProductCategory.Id != 0) {
//                        //      var ProductCategory = [];
//                        //      ProductCategory.Title = filteredData[0].ProductCategory.Title;
//                        //      ProductCategory.Id = filteredData[0].ProductCategory.Id;
//                        //      col.ProductCategory = filteredData[0].ProductCategory;
//                        //  }
      
//                        //  if (filteredData[0].Site.Id != 0) {
//                        //      var Site = [];
//                        //      Site.Title = filteredData[0].Site.Title;
//                        //      Site.Id = filteredData[0].Site.Id;
//                        //      col.Site = filteredData[0].Site;
//                        //  }
      
      
//                        //  if (filteredData[0].CapexContext.Id != 0) {
//                        //      var CapexContext = [];
//                        //      CapexContext.Title = filteredData[0].CapexContext.Title;
//                        //      CapexContext.Id = filteredData[0].CapexContext.Id;
//                        //      col.CapexContext = filteredData[0].CapexContext;
//                        //  }
      
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
      
      
//                 $scope.OutBusinessLicencingColl = unique;
//                 $scope.test = unique;
      
      
//                 console.log(unique);
      
//             }
//             else if(pname==undefined) {
      
//                  $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
//                  $scope.test = $scope.OutBusinessLicencingColl;
//              }
             
//              else {
      
//                 //  $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
//                 //  $scope.test = $scope.OutBusinessLicencingColl;
      
//              //   location.reload();
      
      
//              }
      
//         }
         
//         $scope.Submarketfilter = function (sbmarketname,partnerSelec) {
      
//             //$scope.Partnerfilter($scope.ddlPartner,$scope.Submarket)
//             partnerSelec=$scope.ddlPartner;
//             var pname = partnerSelec;
//             var Submarket = sbmarketname;
//             Submarket = $scope.Submarket;
//             //ProductNameSelec=$scope.ddlProduct5;
//             //If only Submarket Selection
            
//                 if (partnerSelec != null && partnerSelec != undefined && sbmarketname ==undefined) {
//                     $scope.Partnerfilter(pname,Submarket);
//                 }
      
//                 if (sbmarketname != null && sbmarketname != undefined && partnerSelec ==undefined) {
//                     $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
//                         return item.SubMarketId == sbmarketname;
//                     });
//                 }
      
      
//                 if (sbmarketname != null && sbmarketname != undefined && partnerSelec !=undefined) {
//                     $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
//                     return (item.SubMarketId == sbmarketname && item.PartnerId == partnerSelec);
//                     });
//                 }
      
//                 var FArry = [];
//                 for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
      
//                     var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
//                         return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
//                     });
//                     if (filteredData.length > 0) {
//                         var col = {};
//                         col.Id = filteredData[0].Id;
//                         col.ID = filteredData[0].ID;
//                         col.Modified = filteredData[0].Modified;
      
      
//                         col.Title = filteredData[0].Title;
//                         col.CaseStatus = filteredData[0].CaseStatus;
//                         col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                         col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
//                         col.InitiationDate = filteredData[0].InitiationDate;
      
      
//                         col.VersionNo = filteredData[0].VersionNo;
//                         col.LapVersion = filteredData[0].LapVersion;
      
      
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
//                         if (filteredData[0].SubStrategy.Id != 0) {
//                             var SubStrategy = [];
//                             SubStrategy.Title = filteredData[0].SubStrategy.Title;
//                             SubStrategy.Id = filteredData[0].SubStrategy.Id;
//                             col.SubStrategy = filteredData[0].SubStrategy;
      
      
//                         }
//                         if (filteredData[0].ProductNameId) {
//                             var ProductName = [];
//                             ProductName.Title = filteredData[0].ProductName.Title;
//                             ProductName.Id = filteredData[0].ProductNameId;
//                             col.ProductName = filteredData[0].ProductName;
//                             col.ProductNameId = filteredData[0].ProductNameId;
      
//                         }
      
                      
      
//                         FArry.push(col);
      
      
//                     }
      
      
      
                
      
      
//                 // TO FILTER REPEATED BUSINESS CASE 
//                 function filterUnique(arr, property) {
//                     return arr.filter((item, index, self) =>
//                         index === self.findIndex((t) => t[property] === item[property])
//                     );
//                 }
      
//                 // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//                 var unique = filterUnique(FArry, "ID");
      
      
//                 $scope.OutBusinessLicencingColl = unique;
//                 $scope.test = unique//$scope.OutBusinessLicencingColl1;
      
      
//                 console.log(unique);
      
//             }
//             // submarket with partner selection
//             if (sbmarketname != null && sbmarketname != undefined && partnerSelec!=undefined) {
//                 $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
//                     return (item.SubMarketId == sbmarketname &&item.PartnerId==partnerSelec);
//                 });
//                 var FArry = [];
//                 for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
      
//                     var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
//                         return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
//                     });
//                     if (filteredData.length > 0) {
//                         var col = {};
//                         col.Id = filteredData[0].Id;
//                         col.ID = filteredData[0].ID;
//                         col.Modified = filteredData[0].Modified;
      
      
//                         col.Title = filteredData[0].Title;
//                         col.CaseStatus = filteredData[0].CaseStatus;
//                         col.BusinessCaseName = filteredData[0].BusinessCaseName;
//                         col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
//                         col.InitiationDate = filteredData[0].InitiationDate;
      
      
//                         col.VersionNo = filteredData[0].VersionNo;
//                         col.LapVersion = filteredData[0].LapVersion;
      
      
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
//                         if (filteredData[0].SubStrategy.Id != 0) {
//                             var SubStrategy = [];
//                             SubStrategy.Title = filteredData[0].SubStrategy.Title;
//                             SubStrategy.Id = filteredData[0].SubStrategy.Id;
//                             col.SubStrategy = filteredData[0].SubStrategy;
      
      
//                         }
//                         if (filteredData[0].ProductNameId) {
//                             var ProductName = [];
//                             ProductName.Title = filteredData[0].ProductName.Title;
//                             ProductName.Id = filteredData[0].ProductNameId;
//                             col.ProductName = filteredData[0].ProductName;
//                             col.ProductNameId = filteredData[0].ProductNameId;
      
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
      
      
//                 $scope.OutBusinessLicencingColl = unique;
//                 $scope.test = unique//$scope.OutBusinessLicencingColl1;
      
      
//                 console.log(unique);
      
//             }
//             //
//            else if(sbmarketname==undefined) {
      
//                 $scope.OutBusinessLicencingColl1= $scope.OutBusinessLicencingColl;
//                 $scope.test = $scope.OutBusinessLicencingColl1;
//              //   location.reload();
//             }
            
//             else {
//               //  location.reload();
      
//                 // $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;
//                 // $scope.test = $scope.OutBusinessLicencingColl1;
      
//             }
      
//         }
      
//         if ($scope.OutLicensingLaunchDetailColl.length > 0) {
      
//              $scope.uniqueArray = $scope.OutLicensingLaunchDetailColl.filter(function (item, index, array) {
//                  return array.indexOf(item) === index;
//              });
//              var newfilteredarray = [];
//              var newfilteredarray2 = [];
//              var newfilteredarray3 = [];
//              var obj = [];
//              for (var i = 0; i < $scope.OutLicensingLaunchDetailColl.length; i++) {
//                  var col = {};
      
//                  col.OutLicensingBusinessCaseId = $scope.OutLicensingLaunchDetailColl[i].AndaUMEBusinessCase.Id;
//                  col.PartnerId = $scope.OutLicensingLaunchDetailColl[i].PartnerId;
//                  col.PartnerTitle = $scope.OutLicensingLaunchDetailColl[i].Partner.Title;
//                  col.SubMarketId = $scope.OutLicensingLaunchDetailColl[i].SubMarketId;
//                  col.SubMarketTitle = $scope.OutLicensingLaunchDetailColl[i].SubMarket.Title;
      
//                  obj.push(col);
//              }
      
//              // Define a custom function to filter unique objects based on CapexBusinessCaseId
//              function filterUnique(arr, property) {
//                  return arr.filter((item, index, self) =>
//                      index === self.findIndex((t) => t[property] === item[property])
//                  );
//              }
      
//              // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//              var unique = filterUnique(obj, "AndaUMEBusinessCaseId");
      
      
      
//              var PRODunique = filterUnique(obj, "PartnerId");
//              var PRODunique2 = filterUnique(obj, "SubMarketId");
      
//              console.log(PRODunique);
//              console.log(PRODunique2);
//              console.log(unique);
//              newfilteredarray2.push(PRODunique);
//              newfilteredarray.push(PRODunique2);
      
//              $scope.newfilteredarrayColl = newfilteredarray[0];
//              $scope.newfilteredarrayCol2 = newfilteredarray2[0];
      
//         }

//         if ($scope.InBusinessLicencingLicencingColl.length > 0) {
//            var OLFinalArray =[];
//             for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {

//               //  for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Reviewers.results.length; j++) {
//                    // var gName = $scope.InBusinessLicencingLicencingColl[i].Reviewers.results[j].Title;
//                     var gName ='ELTReviewer';

//                     var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, 'ELTReviewer')
//                     if (userExist == true) {

//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                             //  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "";
//                              // $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
          
//                               //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
//                           }
//                            if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                               $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/b78c6e74-9a06-4804-9070-433a7d1b4f8d/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                               // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
//                           }
//                           if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                               //   $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                               $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/613e7790-240b-4a34-ab93-4f8493e74e9a/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";

          
//                           }

//                           if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                             $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                         }
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                             $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/50cbdb9c-11f8-40e3-9175-6f66f229b7e1/reports/cbafcea2-2ffc-4c23-9198-28865b72f68e/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";
//                         }
        
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                             $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
        
        
//                         }
                        
//                       //  $scope.InBusinessLicencingLicencingColl[i];
//                        OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
//                        // break;
//                     }
//                 //}
//             }


//             if($scope.InBusinessLicencingLicencingColl.length>0){

//                 $scope.ddlStatus="";
//                 $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
//                 $scope.test = $scope.InBusinessLicencingLicencingColl1;
//              }

             
//              // arvind

//             //  $scope.showallstatus = 'conditionForFalse'; // Initial value

//             //  $scope.toggleStatus = function() {
//             //    // Your logic based on the true or false value of showallstatus
//             //    if ($scope.showallstatus === 'conditionForTrue') {
//             //      // Do something when true
                
//             //      $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
                
//             //      $scope.ddlStatus="Under Internal Review";
//             //      $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
//             //      $scope.test = $scope.InBusinessLicencingLicencingColl1;
           
//             //     } else {
//             //      $scope.ddlStatus="";
//             //      // Do something when false
//             //      $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
                 
//             //    //  alert('Radhe Radhe');
               
//             //    }
//             //  };

//  //
//         }

//         // $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

//         // $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

//         //     return (responseLine.CaseStatus === "Under Internal Review");
//         // });


//         $scope.InBusinessLicencingLicencingColl=OLFinalArray

//         $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

//         // $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

//         //     return (responseLine.CaseStatus === "Under Internal Review");
//         // });




       




//         if ($scope.InBusinessLicencingLicencingColl.length == 0) {

//             $scope.nodata = true;
//         }
//         else {

//             $scope.nodata = false;
//         }


//         // PAGINATION

//         $scope.test = $scope.InBusinessLicencingLicencingColl;

//         $scope.totalItems = $scope.InBusinessLicencingLicencingColl.length; // Total number of items
//         $scope.currentPage = 1; // Current page
//         $scope.itemsPerPage =10// 5; // Items per page
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
//         //alert(ddlStatus);
//         $scope.InBusinessLicencingLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

//             return responseLine.CaseStatus == ddlStatus;
//         });
//         console.log($scope.InBusinessLicencingLicencingColl);

//     }
//     //   $scope.ViewReviewerForm = function (request,ELTReviewerAPIDash) {
//     //     Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);


//     //     if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
//     //         $location.path('/ReviewerAndaUMELicensingBusinessCaseView');
//     //     }
//     // }



//     //view
//     $scope.ViewReviewerForm = function (request,ELTReviewerAPIDash) {
//         Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);
//         localStorage.setItem("dashboard", ELTReviewerAPIDash);// New Change VD
//         localStorage.setItem("Value", request);// New Change VD
//         if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
//             $location.path('/ReviewerAndaUMELicensingBusinessCaseView');
//         }
//     }
//     // Review Business-Case Initiation//


//     $scope.ReviewForm = function (request) {
//         Logics.setSharingData(request);

//         if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
//             $location.path('/ReviewerReviewAndaUMELicensingBusinessCase');//ReviewerReviewAndaLicensingBusinessCase
//         }
//     }

//     $scope.onClickHome = function () {
//         window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

//     }
// });

appOperations.controller("ELTReviewerANDAUMEDashboardCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    localStorage.clear();
    var strBusinessUSANDALicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,LapVersion,Modified,Counter,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers,Validators&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMELicensingLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,AndaUMEBusinessCase/Title,AndaUMEBusinessCaseId&$expand=AndaUMEBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";
    $scope.test=[];

    var urlColl = [strBusinessUSANDALicencingUrl, strStrategyUrl, strSubStrategyUrl,strOutLicensingLaunchDetailsUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

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

        $scope.InBusinessLicencingLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        $scope.InBusinessLicencingLicencingColl1=$scope.InBusinessLicencingLicencingColl;
        $scope.OutLicensingLaunchDetailColl = batchedData[3].d.results;
        
        $scope.OutLicensingLaunchDetailColl2=$scope.OutLicensingLaunchDetailColl ;
        $scope.OutBusinessLicencingColl2=$scope.InBusinessLicencingLicencingColl ;

        $scope.OutLicensingLaunchDetailColl3=$scope.OutLicensingLaunchDetailColl ;
        $scope.OutBusinessLicencingColl3=$scope.InBusinessLicencingLicencingColl ;
        $scope.OutBusinessLicencingColl4=$scope.InBusinessLicencingLicencingColl ;
        $scope.OutBusinessLicencingColl5=$scope.InBusinessLicencingLicencingColl ;

        $scope.test = $scope.InBusinessLicencingLicencingColl1;

      $scope.ifallblank=function(){

        if(($scope.ddlStatus=="" ||$scope.ddlStatus==undefined) && ($scope.ddlPartner==undefined || $scope.ddlPartner=="" ) &&
            ($scope.Submarket==undefined || $scope.Submarket=="" ) && ($scope.ddlProduct5=="" || $scope.ddlProduct5==undefined)){
  
        $route.reload();
  
  
        }
    }
  
    $scope.Partnerfilter = function (pname,Submarket) {
  
        Submarket=$scope.Submarket;
        Submarket=$scope.Submarket;
        sbmarketname = $scope.Submarket; 
        partnerSelec = pname;
        if (sbmarketname != null && sbmarketname != undefined && partnerSelec ==undefined) {
            $scope.Submarketfilter(Submarket,pname);
        }
  
         if (pname != null && pname != undefined && Submarket==undefined) {
             $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl2, function (item) {
                 return item.PartnerId == pname;
             });
             var FArry = [];
             for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
  
                 var filteredData = $filter('filter')($scope.OutBusinessLicencingColl2, function (item) {
                     return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
                 });
                 if (filteredData.length > 0) {
                     var col = {};
                     col.Id = filteredData[0].Id;
                     col.ID = filteredData[0].ID;
                     col.Modified = filteredData[0].Modified;
  
  
                     col.Title = filteredData[0].Title;
                     col.CaseStatus = filteredData[0].CaseStatus;
                     col.BusinessCaseName = filteredData[0].BusinessCaseName;
                     col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
                     col.InitiationDate = filteredData[0].InitiationDate;
                     col.VersionNo = filteredData[0].VersionNo;
                     col.LapVersion = filteredData[0].LapVersion;
  
  
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
  
                     if (filteredData[0].SubStrategy.Id != 0) {
                        var SubStrategy = [];
                        SubStrategy.Title = filteredData[0].SubStrategy.Title;
                        SubStrategy.Id = filteredData[0].SubStrategy.Id;
                        col.SubStrategy = filteredData[0].SubStrategy;
  
  
                    }
                    if (filteredData[0].ProductNameId != 0) {
                        var ProductName = [];
                        ProductName.Title = filteredData[0].ProductName.Title;
                        ProductName.Id = filteredData[0].ProductNameId;
                        col.ProductName = filteredData[0].ProductName;
                        col.ProductNameId = filteredData[0].ProductNameId;
                    }
  
                    //  if (filteredData[0].ProductCategory.Id != 0) {
                    //      var ProductCategory = [];
                    //      ProductCategory.Title = filteredData[0].ProductCategory.Title;
                    //      ProductCategory.Id = filteredData[0].ProductCategory.Id;
                    //      col.ProductCategory = filteredData[0].ProductCategory;
                    //  }
  
                    //  if (filteredData[0].Site.Id != 0) {
                    //      var Site = [];
                    //      Site.Title = filteredData[0].Site.Title;
                    //      Site.Id = filteredData[0].Site.Id;
                    //      col.Site = filteredData[0].Site;
                    //  }
  
  
                    //  if (filteredData[0].CapexContext.Id != 0) {
                    //      var CapexContext = [];
                    //      CapexContext.Title = filteredData[0].CapexContext.Title;
                    //      CapexContext.Id = filteredData[0].CapexContext.Id;
                    //      col.CapexContext = filteredData[0].CapexContext;
                    //  }
  
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
  
  
             $scope.OutBusinessLicencingColl = unique;
             $scope.test = unique;
  
  
             console.log(unique);
  
         }
  
  
  
         if (pname != null && pname != undefined && Submarket!=undefined) {
            $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl2, function (item) {
                return (item.PartnerId == pname && item.SubMarketId == Submarket);
            });
            var FArry = [];
            for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
  
                var filteredData = $filter('filter')($scope.OutBusinessLicencingColl2, function (item) {
                    return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
                });
                if (filteredData.length > 0) {
                    var col = {};
                    col.Id = filteredData[0].Id;
                    col.ID = filteredData[0].ID;
                    col.Modified = filteredData[0].Modified;
  
  
                    col.Title = filteredData[0].Title;
                    col.CaseStatus = filteredData[0].CaseStatus;
                    col.BusinessCaseName = filteredData[0].BusinessCaseName;
                    col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
                    col.InitiationDate = filteredData[0].InitiationDate;
                    col.VersionNo = filteredData[0].VersionNo;
                    col.LapVersion = filteredData[0].LapVersion;
  
  
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
  
                    if (filteredData[0].SubStrategy.Id != 0) {
                       var SubStrategy = [];
                       SubStrategy.Title = filteredData[0].SubStrategy.Title;
                       SubStrategy.Id = filteredData[0].SubStrategy.Id;
                       col.SubStrategy = filteredData[0].SubStrategy;
  
  
                   }
                   if (filteredData[0].ProductNameId) {
                       var ProductName = [];
                       ProductName.Title = filteredData[0].ProductName.Title;
                       ProductName.Id = filteredData[0].ProductNameId;
                       col.ProductName = filteredData[0].ProductName;
                       col.ProductNameId = filteredData[0].ProductNameId;
  
                   }
  
                   //  if (filteredData[0].ProductCategory.Id != 0) {
                   //      var ProductCategory = [];
                   //      ProductCategory.Title = filteredData[0].ProductCategory.Title;
                   //      ProductCategory.Id = filteredData[0].ProductCategory.Id;
                   //      col.ProductCategory = filteredData[0].ProductCategory;
                   //  }
  
                   //  if (filteredData[0].Site.Id != 0) {
                   //      var Site = [];
                   //      Site.Title = filteredData[0].Site.Title;
                   //      Site.Id = filteredData[0].Site.Id;
                   //      col.Site = filteredData[0].Site;
                   //  }
  
  
                   //  if (filteredData[0].CapexContext.Id != 0) {
                   //      var CapexContext = [];
                   //      CapexContext.Title = filteredData[0].CapexContext.Title;
                   //      CapexContext.Id = filteredData[0].CapexContext.Id;
                   //      col.CapexContext = filteredData[0].CapexContext;
                   //  }
  
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
  
  
            $scope.OutBusinessLicencingColl = unique;
            $scope.test = unique;
  
  
            console.log(unique);
  
        }
        else if(pname==undefined) {
  
             $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
             $scope.test = $scope.OutBusinessLicencingColl;
         }
         
         else {
  
            //  $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
            //  $scope.test = $scope.OutBusinessLicencingColl;
  
         //   location.reload();
  
  
         }
  
    }
     
    $scope.Submarketfilter = function (sbmarketname,partnerSelec) {
  
        //$scope.Partnerfilter($scope.ddlPartner,$scope.Submarket)
        partnerSelec=$scope.ddlPartner;
        var pname = partnerSelec;
        var Submarket = sbmarketname;
        Submarket = $scope.Submarket;
        //ProductNameSelec=$scope.ddlProduct5;
        //If only Submarket Selection
        
            if (partnerSelec != null && partnerSelec != undefined && sbmarketname ==undefined) {
                $scope.Partnerfilter(pname,Submarket);
            }
  
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec ==undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return item.SubMarketId == sbmarketname;
                });
            }
  
  
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec !=undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                return (item.SubMarketId == sbmarketname && item.PartnerId == partnerSelec);
                });
            }
  
            var FArry = [];
            for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
  
                var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
                    return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
                });
                if (filteredData.length > 0) {
                    var col = {};
                    col.Id = filteredData[0].Id;
                    col.ID = filteredData[0].ID;
                    col.Modified = filteredData[0].Modified;
  
  
                    col.Title = filteredData[0].Title;
                    col.CaseStatus = filteredData[0].CaseStatus;
                    col.BusinessCaseName = filteredData[0].BusinessCaseName;
                    col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
                    col.InitiationDate = filteredData[0].InitiationDate;
  
  
                    col.VersionNo = filteredData[0].VersionNo;
                    col.LapVersion = filteredData[0].LapVersion;
  
  
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
                    if (filteredData[0].SubStrategy.Id != 0) {
                        var SubStrategy = [];
                        SubStrategy.Title = filteredData[0].SubStrategy.Title;
                        SubStrategy.Id = filteredData[0].SubStrategy.Id;
                        col.SubStrategy = filteredData[0].SubStrategy;
  
  
                    }
                    if (filteredData[0].ProductNameId) {
                        var ProductName = [];
                        ProductName.Title = filteredData[0].ProductName.Title;
                        ProductName.Id = filteredData[0].ProductNameId;
                        col.ProductName = filteredData[0].ProductName;
                        col.ProductNameId = filteredData[0].ProductNameId;
  
                    }
  
                  
  
                    FArry.push(col);
  
  
                }
  
  
  
            
  
  
            // TO FILTER REPEATED BUSINESS CASE 
            function filterUnique(arr, property) {
                return arr.filter((item, index, self) =>
                    index === self.findIndex((t) => t[property] === item[property])
                );
            }
  
            // Use the custom filter function to get unique objects based on CapexBusinessCaseId
            var unique = filterUnique(FArry, "ID");
  
  
            $scope.OutBusinessLicencingColl = unique;
            $scope.test = unique//$scope.OutBusinessLicencingColl1;
  
  
            console.log(unique);
  
        }
        // submarket with partner selection
        if (sbmarketname != null && sbmarketname != undefined && partnerSelec!=undefined) {
            $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                return (item.SubMarketId == sbmarketname &&item.PartnerId==partnerSelec);
            });
            var FArry = [];
            for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
  
                var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
                    return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].AndaUMEBusinessCaseId;
                });
                if (filteredData.length > 0) {
                    var col = {};
                    col.Id = filteredData[0].Id;
                    col.ID = filteredData[0].ID;
                    col.Modified = filteredData[0].Modified;
  
  
                    col.Title = filteredData[0].Title;
                    col.CaseStatus = filteredData[0].CaseStatus;
                    col.BusinessCaseName = filteredData[0].BusinessCaseName;
                    col.BusinessCaseDescription = filteredData[0].BusinessCaseDescription;
                    col.InitiationDate = filteredData[0].InitiationDate;
  
  
                    col.VersionNo = filteredData[0].VersionNo;
                    col.LapVersion = filteredData[0].LapVersion;
  
  
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
                    if (filteredData[0].SubStrategy.Id != 0) {
                        var SubStrategy = [];
                        SubStrategy.Title = filteredData[0].SubStrategy.Title;
                        SubStrategy.Id = filteredData[0].SubStrategy.Id;
                        col.SubStrategy = filteredData[0].SubStrategy;
  
  
                    }
                    if (filteredData[0].ProductNameId) {
                        var ProductName = [];
                        ProductName.Title = filteredData[0].ProductName.Title;
                        ProductName.Id = filteredData[0].ProductNameId;
                        col.ProductName = filteredData[0].ProductName;
                        col.ProductNameId = filteredData[0].ProductNameId;
  
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
  
  
            $scope.OutBusinessLicencingColl = unique;
            $scope.test = unique//$scope.OutBusinessLicencingColl1;
  
  
            console.log(unique);
  
        }
        //
       else if(sbmarketname==undefined) {
  
            $scope.OutBusinessLicencingColl1= $scope.OutBusinessLicencingColl;
            $scope.test = $scope.OutBusinessLicencingColl1;
         //   location.reload();
        }
        
        else {
          //  location.reload();
  
            // $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;
            // $scope.test = $scope.OutBusinessLicencingColl1;
  
        }
  
    }
  
    if ($scope.OutLicensingLaunchDetailColl.length > 0) {
  
         $scope.uniqueArray = $scope.OutLicensingLaunchDetailColl.filter(function (item, index, array) {
             return array.indexOf(item) === index;
         });
         var newfilteredarray = [];
         var newfilteredarray2 = [];
         var newfilteredarray3 = [];
         var obj = [];
         for (var i = 0; i < $scope.OutLicensingLaunchDetailColl.length; i++) {
             var col = {};
  
             col.OutLicensingBusinessCaseId = $scope.OutLicensingLaunchDetailColl[i].AndaUMEBusinessCase.Id;
             col.PartnerId = $scope.OutLicensingLaunchDetailColl[i].PartnerId;
             col.PartnerTitle = $scope.OutLicensingLaunchDetailColl[i].Partner.Title;
             col.SubMarketId = $scope.OutLicensingLaunchDetailColl[i].SubMarketId;
             col.SubMarketTitle = $scope.OutLicensingLaunchDetailColl[i].SubMarket.Title;
  
             obj.push(col);
         }
  
         // Define a custom function to filter unique objects based on CapexBusinessCaseId
         function filterUnique(arr, property) {
             return arr.filter((item, index, self) =>
                 index === self.findIndex((t) => t[property] === item[property])
             );
         }
  
         // Use the custom filter function to get unique objects based on CapexBusinessCaseId
         var unique = filterUnique(obj, "AndaUMEBusinessCaseId");
  
  
  
         var PRODunique = filterUnique(obj, "PartnerId");
         var PRODunique2 = filterUnique(obj, "SubMarketId");
  
         console.log(PRODunique);
         console.log(PRODunique2);
         console.log(unique);
         newfilteredarray2.push(PRODunique);
         newfilteredarray.push(PRODunique2);
  
         $scope.newfilteredarrayColl = newfilteredarray[0];
         $scope.newfilteredarrayCol2 = newfilteredarray2[0];
  
    }

        if ($scope.InBusinessLicencingLicencingColl.length > 0) {
          var  OLFinalArray=[];
            for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {
                for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Validators.results.length; j++) {
                    var gName = $scope.InBusinessLicencingLicencingColl[i].Validators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, 'ELTReviewer')
                    if (userExist == true) {
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            //  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "";
                             // $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
          
                              //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                          }
                           if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                              $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/b78c6e74-9a06-4804-9070-433a7d1b4f8d/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                              // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                          }
                          if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                              //   $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/caaa93f8-6930-49fd-8710-63585c186a2b/ReportSection?experience=power-bi&filter=USAndaBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                              $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/613e7790-240b-4a34-ab93-4f8493e74e9a/ReportSection?experience=power-bi&filter=AndaUMEBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";

          
                          }

                          if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                        }
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                            $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/00ddd3e5-03d8-4939-b408-b12209cfd3c5/reports/c0e33fc4-9114-404b-92e0-ea21dd478f34/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";
                        }
        
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/367bb105-75a8-4711-925d-be167dfe7f1f/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";
        
        
                        }
                        
                      //  $scope.InBusinessLicencingLicencingColl[i];
                       OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
                        break;
                    }
                }
            }

           
    

        }
        $scope.InBusinessLicencingLicencingColl=OLFinalArray

        $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

        $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

          //  return (responseLine.CaseStatus === "Minor Changes-by Validator" || responseLine.CaseStatus === "On Hold" || responseLine.CaseStatus === "Sent For Validation");
          return (responseLine.CaseStatus === "Ready for ELT Review" || responseLine.CaseStatus === "Under ELT Review" || responseLine.CaseStatus === "Business Case Published");
        });


      



        if ($scope.InBusinessLicencingLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }
        $scope.test = $scope.InBusinessLicencingLicencingColl1;

        $scope.showallstatus = 'conditionForFalse'; // Initial value

        $scope.toggleStatus = function() {
          // Your logic based on the true or false value of showallstatus
          if ($scope.showallstatus === 'conditionForTrue') {

            $scope.test = $scope.InBusinessLicencingLicencingColl1;
            // Do something when true
            location.reload();
          } else {
            $scope.ddlStatus="";
            // Do something when false
            $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
            $scope.test = $scope.InBusinessLicencingLicencingColl;  
          //  alert('Radhe Radhe');
          
          }
        };
        



        $scope.totalItems = $scope.InBusinessLicencingLicencingColl.length; // Total number of items
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

        $scope.InBusinessLicencingLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.InBusinessLicencingLicencingColl);

    }

    // $scope.ViewValidateForm = function (request) {
    //     Logics.setSharingData(request);

    //     if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
    //         $location.path('/ValidatorAndaUMELicensingBusinessCaseView');
    //     }

    // }

    
    $scope.ViewValidateForm = function (request,ELTReviewerAPIDash) {
        Logics.setSharingDataTwoDash(request,ELTReviewerAPIDash);
        localStorage.setItem("dashboard", ELTReviewerAPIDash);// New Change VD
        localStorage.setItem("Value", request);// New Change VD
        if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
            $location.path('/ReviewerAndaUMELicensingBusinessCaseView');          //ReviewerReviewOutLicensingBusinessCase
        }
    }

    $scope.ValidateForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US + EU + MOW') {
            $location.path('/ValidatorValidateANDAUMEBusinessCase');
        }
    }

    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

});

