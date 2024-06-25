appOperations.controller("InitiatorOLDashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    
    
   
    
    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,CaseStatus,BusinessCaseDescription,Title,LapVersion,VersionNo,Modified,Counter,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Initiators/Id,Initiators/Title,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,Initiators,ProductName&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,OutLicensingBusinessCase/Title,OutLicensingBusinessCaseId&$expand=OutLicensingBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";


    $scope.test=[];
    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl,strOutLicensingLaunchDetailsUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.itemsPerPage =20;

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.OutLicensingLaunchDetailColl = batchedData[3].d.results;
        
     

        $scope.OutLicensingLaunchDetailColl2=$scope.OutLicensingLaunchDetailColl ;
        $scope.OutBusinessLicencingColl2=$scope.OutBusinessLicencingColl ;

        $scope.OutLicensingLaunchDetailColl3=$scope.OutLicensingLaunchDetailColl ;
        $scope.OutBusinessLicencingColl3=$scope.OutBusinessLicencingColl ;
        $scope.OutBusinessLicencingColl4=$scope.OutBusinessLicencingColl ;
        $scope.OutBusinessLicencingColl5=$scope.OutBusinessLicencingColl ;

         $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;
         
// if all blank then 

$scope.ifallblank=function(){

    if(($scope.ddlStatus=="" ||$scope.ddlStatus==undefined) && ($scope.ddlPartner==undefined || $scope.ddlPartner=="" ) &&
         ($scope.Submarket==undefined || $scope.Submarket=="" ) && ($scope.ddlProduct5=="" || $scope.ddlProduct5==undefined)){

    $route.reload();


    }
}


//

       
 
         $scope.Partnerfilter = function (pname,Submarket) {

            Submarket=$scope.Submarket;
            
 
             if (pname != null && pname != undefined && Submarket==undefined) {
                 $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl2, function (item) {
                     return item.PartnerId == pname;
                 });
                 var FArry = [];
                 for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {
 
                     var filteredData = $filter('filter')($scope.OutBusinessLicencingColl2, function (item) {
                         return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].OutLicensingBusinessCaseId;
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
                        return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].OutLicensingBusinessCaseId;
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
 
            partnerSelec=$scope.ddlPartner;
            //ProductNameSelec=$scope.ddlProduct5;
            //If only Submarket Selection
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec==undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return item.SubMarketId == sbmarketname;
                });
                var FArry = [];
                for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {

                    var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
                        return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].OutLicensingBusinessCaseId;
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
            // submarket with partner selection
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec!=undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return (item.SubMarketId == sbmarketname &&item.PartnerId==partnerSelec);
                });
                var FArry = [];
                for (var c = 0; c < $scope.DupOutLicensingLaunchDetailColl.length; c++) {

                    var filteredData = $filter('filter')($scope.OutBusinessLicencingColl3, function (item) {
                        return item.ID == $scope.DupOutLicensingLaunchDetailColl[c].OutLicensingBusinessCaseId;
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
 
                 col.OutLicensingBusinessCaseId = $scope.OutLicensingLaunchDetailColl[i].OutLicensingBusinessCase.Id;
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
             var unique = filterUnique(obj, "OutLicensingBusinessCaseId");
 
 
 
             var PRODunique = filterUnique(obj, "PartnerId");
             var PRODunique2 = filterUnique(obj, "SubMarketId");
 
             console.log(PRODunique);
             console.log(PRODunique2);
             console.log(unique);
             newfilteredarray2.push(unique);
             newfilteredarray.push(PRODunique);
 
             $scope.newfilteredarrayColl = newfilteredarray[0];
 
         }

         

        if ($scope.OutBusinessLicencingColl.length > 0) {
            var OLFinalArray=[];
          
            for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) 
            {


                for (var j = 0; j < $scope.OutBusinessLicencingColl[i].Initiators.results.length; j++) {
                    var gName = $scope.OutBusinessLicencingColl[i].Initiators.results[j].Title;
                    var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                    if (userExist == true) 
                    {
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                        }
                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/2bf91bf3-79ad-4174-9f9b-7f3312c46ada/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                        }
        
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
        
        
                        }

                        //DRC Link

                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                        }
                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                        }
        
                        if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                            $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
        
        
                        }



                        //
                      //  $scope.OutBusinessLicencingColl[i];
                       OLFinalArray.push($scope.OutBusinessLicencingColl[i]);
                        break;
    
                    }
                }


               


            }

        }
        $scope.OutBusinessLicencingColl= OLFinalArray;
        console.log($scope.OutBusinessLicencingColl1);
        if ($scope.OutBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }
        $scope.test = $scope.OutBusinessLicencingColl;
        //PAGINATION
        $scope.totalItems = $scope.OutBusinessLicencingColl.length; // Total number of items
       
    

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


    
    $scope.onAddInitiationClick = function () {

        $location.path('/AddOLBusinessCase')
    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/EditOL');
        }
        if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/EditIL');
        }

        if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/EditAnda');
        }

        if (request.Strategy.Title == 'Capex') {
            $location.path('/EditCapex');
        }
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
            if ($scope.getStrategy[0].Strategy.Title == "Outlicensing") {
                Logics.setSharingData(request);
                $location.path('/AddOLBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }
            else if ($scope.getStrategy[0].Strategy.Title == "Inlicensing") {  //ANDA inhouse US//ANDA inhouse US
                Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')

                //   var req=$scope.ddlsubStragy;
                // Logics.setSharingData(req)
                //$scope.stgyID=$scope.ddlsubStragy;
                //$location.path('AddOLBusinessCase/'+$scope.stgyID+'')

            }

            else if ($scope.getStrategy[0].Strategy.Title == 'ANDA - Inhouse US + MoW') {
                Logics.setSharingData(request);
                $location.path('/AddAndaBusinessCase')
            }

            else if ($scope.getStrategy[0].Strategy.Title == "Capex") {
                Logics.setSharingData(request);
                $location.path('/AddCapexBusinessCase')
            }


            else if ($scope.getStrategy[0].Strategy.Title == "ANDA - Inhouse US") {
                Logics.setSharingData(request);
                $location.path('/AddUSAndaBusinessCase')
            }


        }

    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ViewOutLicensing');
        } else if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ViewInLicensing');
        } else if (request.Strategy.Title == 'Outlicensing)') {
            $location.path('/ViewOutLicensing');
        }

        else if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ViewAndaLicensing');
        }
        else if (request.Strategy.Title == 'Capex') {
            $location.path('/ViewCapexLicensing');
        }

        else if (request.Strategy.Title == 'ANDA - Inhouse US') {
            $location.path('/ViewUSAndaLicensing');
        }
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Outlicensing') {
            $location.path('/ChangeStageOutLicensing');
        } else if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ChangeStageInLicensing');
        }
        // else if(request.Strategy=='Outlicensing (OL)')
        // {
        // $location.path('/ViewOutLicensing');
        //}
        else if (request.Strategy.Title == 'Capex') {
            $location.path('/ChangeStageCapex');
        }

        else if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ChangeStageAndaLicensing');
        }

        else if (request.Strategy.Title == 'ANDA - Inhouse US') {

            $location.path('/ChangeStageUSAnda');

        }






    }
    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }

    $scope.onClickBack = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Commercialslp.aspx";

    }

});