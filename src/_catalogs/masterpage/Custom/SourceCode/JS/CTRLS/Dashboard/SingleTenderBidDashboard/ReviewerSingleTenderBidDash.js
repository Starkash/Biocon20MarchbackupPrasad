appOperations.controller("ReviewerSingDashCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    localStorage.clear(); // New Change VD

    var strSingleBidUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,LapVersion,Modified,Title,Counter,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";

    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SingleBidLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,SingleBidBusinessCase/Title,SingleBidBusinessCaseId&$expand=SingleBidBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";

    $scope.test=[];

    var urlColl = [strSingleBidUrl, strStrategyUrl, strSubStrategyUrl,strInLicensingLaunchDetailsUrl];
    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.PreviousCurrentPage = 1;
        $scope.PreviousItemsPerPage = 500;
        $scope.CurrentPage = 1;
        $scope.itemsPerPage =20// 10;
        $scope.upComingCurrentPage = 1;
        $scope.upComingItemsPerPage = 5;
        $scope.certCurrentPage = 1;
        $scope.certItemsPerPage = 10;

        $scope.pageSize1 = "5";
        // for username
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

        $scope.InBusinessLicencingLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;

        $scope.InBusinessLicencingLicencingColl1=$scope.InBusinessLicencingLicencingColl;
        $scope.InLicensingLaunchDetailColl = batchedData[3].d.results;

///
   
var OLFinalArray = [];
$scope.A1newfilteredarrayColl = [];

$scope.NewA1newfilteredarrayColl = [];



if ($scope.InLicensingLaunchDetailColl.length > 0) {

    if ($scope.InBusinessLicencingLicencingColl.length > 0) {
      // var OLFinalArray =[];
        for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {

            for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Reviewers.results.length; j++) {
                var gName = $scope.InBusinessLicencingLicencingColl[i].Reviewers.results[j].Title;
                var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                if (userExist == true) {
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                        $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    }
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                        $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/8964d82f-f633-42aa-9ebf-8939905f13c7/ReportSection?experience=power-bi&filter=SingleBidBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    }

                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                       
                  //  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/2bf91bf3-79ad-4174-9f9b-7f3312c46ada/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/c1af407c-0385-43de-9825-9e1d3fe0063c/ReportSection?experience=power-bi&filter=SingleBidBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";

                }

                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                    $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                }
                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                    $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/2e7e0adb-887e-4db1-9832-9921a0e3792a/reports/9749c9e7-8a0a-4bf1-8c8d-37702438057b/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";
                }
                
                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                   // $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/7bb5f912-e4de-42f5-822e-e4333da75fbe/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";


                }

                  //  $scope.InBusinessLicencingLicencingColl[i];
                   OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
                    break;
                }
            }
            
             if (OLFinalArray.length > 0) {

                        for (var q = 0; q < OLFinalArray.length; q++) {


                            //   $scope.A1newfilteredarrayColl= $filter('filter')(unique, function (item) {
                            //         return (item.OutLicensingBusinessCaseId== OLFinalArray[q].ID);
                            //   });

                            $scope.A1newfilteredarrayColl = $filter('filter')($scope.InLicensingLaunchDetailColl, function (item) {
                                return (item.SingleBidBusinessCaseId == OLFinalArray[q].ID);
                            });

                            if ($scope.A1newfilteredarrayColl.length > 0) {
                                for(var b=0;b<$scope.A1newfilteredarrayColl.length;b++){
                                    $scope.NewA1newfilteredarrayColl.push($scope.A1newfilteredarrayColl[b]);

                                }
                            }

                            //userExist =false;


                            console.log($scope.newfilteredarrayColl)
                            console.log($scope.newfilteredarrayCol2)
                            console.log(OLFinalArray)

                        }
                    }
                    
                    }

        }
$scope.InBusinessLicencingLicencingColl = OLFinalArray;
$scope.ToggleInBusinessLicencingLicencingColl=OLFinalArray;


         // arvind
         if($scope.ToggleInBusinessLicencingLicencingColl.length>0){

            $scope.ddlStatus="Under Internal Review";
            $scope.InBusinessLicencingLicencingColl = $scope.ToggleInBusinessLicencingLicencingColl;
            $scope.test = $scope.ToggleInBusinessLicencingLicencingColl;
         }


         
                
         $scope.showallstatus = 'conditionForFalse'; // Initial value

      
         $scope.toggleStatus = function() {
           // Your logic based on the true or false value of showallstatus
           if ($scope.showallstatus === 'conditionForTrue') {
             // Do something when true
            
           //  $scope.InBusinessLicencingLicencingColl = $scope.InBusinessLicencingLicencingColl;
            
             $scope.ddlStatus="Under Internal Review";
             $scope.InBusinessLicencingLicencingColl = $scope.ToggleInBusinessLicencingLicencingColl;
             $scope.test = $scope.ToggleInBusinessLicencingLicencingColl;
           } else {
             $scope.ddlStatus="";
             // Do something when false
             $scope.InBusinessLicencingLicencingColl = $scope.ToggleInBusinessLicencingLicencingColl;
             
             console.log($scope.InBusinessLicencingLicencingColl)
           //  alert('Radhe Radhe');
           
           }
         };

    
       // $scope.ddlStatus="Under Internal Review";


//
    }


//

        $scope.InLicensingLaunchDetailColl2=$scope.NewA1newfilteredarrayColl ;
        $scope.InBusinessLicencingLicencingColl2=$scope.InBusinessLicencingLicencingColl ;

        $scope.InLicensingLaunchDetailColl3=$scope.NewA1newfilteredarrayColl ;
        $scope.InBusinessLicencingLicencingColl3=$scope.InBusinessLicencingLicencingColl ;
        $scope.InBusinessLicencingLicencingColl4=$scope.InBusinessLicencingLicencingColl ;
        $scope.InBusinessLicencingLicencingColl5=$scope.InBusinessLicencingLicencingColl ;

         $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;



         // if all blank then 

$scope.ifallblank=function(){

    if(($scope.ddlStatus=="" ||$scope.ddlStatus==undefined) && ($scope.ddlPartner==undefined || $scope.ddlPartner=="" ) &&
         ($scope.Submarket==undefined || $scope.Submarket=="" ) && ($scope.ddlProduct5=="" || $scope.ddlProduct5==undefined)){

    $route.reload();


    }
}




$scope.Partnerfilter = function (pname,Submarket) {

    
    Submarket=$scope.Submarket;
    sbmarketname = $scope.Submarket; 
    partnerSelec = pname;
    if (sbmarketname != null && sbmarketname != undefined && partnerSelec ==undefined) {
        $scope.Submarketfilter(Submarket,pname);
    }

     if (pname != null && pname != undefined && Submarket==undefined) {
         $scope.DupInLicensingLaunchDetailColl = $filter('filter')($scope.InLicensingLaunchDetailColl2, function (item) {
             return item.PartnerId == pname;
         });
         var FArry = [];
         for (var c = 0; c < $scope.DupInLicensingLaunchDetailColl.length; c++) {

             var filteredData = $filter('filter')($scope.InBusinessLicencingLicencingColl2, function (item) {
                 return item.ID == $scope.DupInLicensingLaunchDetailColl[c].SingleBidBusinessCaseId;
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


         $scope.InBusinessLicencingLicencingColl = unique;
         $scope.test = unique;


         console.log(unique);

     }



     if (pname != null && pname != undefined && Submarket!=undefined) {
        $scope.DupInLicensingLaunchDetailColl = $filter('filter')($scope.InLicensingLaunchDetailColl2, function (item) {
            return (item.PartnerId == pname && item.SubMarketId == Submarket);
        });
        var FArry = [];
        for (var c = 0; c < $scope.DupInLicensingLaunchDetailColl.length; c++) {

            var filteredData = $filter('filter')($scope.InBusinessLicencingLicencingColl2, function (item) {
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].SingleBidBusinessCaseId;
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


        $scope.InBusinessLicencingLicencingColl = unique;
        $scope.test = unique;


        console.log(unique);

    }
    else if(pname==undefined) {

         $scope.InBusinessLicencingLicencingColl = $scope.InBusinessLicencingLicencingColl;
         $scope.test = $scope.InBusinessLicencingLicencingColl;
     }
     
     else {

        //  $scope.InBusinessLicencingLicencingColl = $scope.InBusinessLicencingLicencingColl;
        //  $scope.test = $scope.InBusinessLicencingLicencingColl;

     //   location.reload();


     }

 }



 $scope.Submarketfilter = function (sbmarketname,partnerSelec) {
 
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
        $scope.DupInLicensingLaunchDetailColl = $filter('filter')($scope.InLicensingLaunchDetailColl3, function (item) {
            return item.SubMarketId == sbmarketname;
        });
    }


    if (sbmarketname != null && sbmarketname != undefined && partnerSelec !=undefined) {
        $scope.DupInLicensingLaunchDetailColl = $filter('filter')($scope.InLicensingLaunchDetailColl3, function (item) {
            return (item.SubMarketId == sbmarketname && item.PartnerId == partnerSelec);
        });
    }
        var FArry = [];
        for (var c = 0; c < $scope.DupInLicensingLaunchDetailColl.length; c++) {

            var filteredData = $filter('filter')($scope.InBusinessLicencingLicencingColl3, function (item) {
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].SingleBidBusinessCaseId;
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


        $scope.InBusinessLicencingLicencingColl = unique;
        $scope.test = unique//$scope.InBusinessLicencingLicencingColl1;


        console.log(unique);

    }
    // submarket with partner selection
    if (sbmarketname != null && sbmarketname != undefined && partnerSelec!=undefined) {
        $scope.DupInLicensingLaunchDetailColl = $filter('filter')($scope.InLicensingLaunchDetailColl3, function (item) {
            return (item.SubMarketId == sbmarketname &&item.PartnerId==partnerSelec);
        });
        var FArry = [];
        for (var c = 0; c < $scope.DupInLicensingLaunchDetailColl.length; c++) {

            var filteredData = $filter('filter')($scope.InBusinessLicencingLicencingColl3, function (item) {
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].SingleBidBusinessCaseId;
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


        $scope.InBusinessLicencingLicencingColl = unique;
        $scope.test = unique//$scope.InBusinessLicencingLicencingColl1;


        console.log(unique);

    }
    //
   else if(sbmarketname==undefined) {

        $scope.InBusinessLicencingLicencingColl1= $scope.InBusinessLicencingLicencingColl;
        $scope.test = $scope.InBusinessLicencingLicencingColl1;
     //   location.reload();
    }
    
    else {
      //  location.reload();

        // $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
        // $scope.test = $scope.InBusinessLicencingLicencingColl1;

    }

}

// if ($scope.InLicensingLaunchDetailColl.length > 0) {
 
//     $scope.uniqueArray = $scope.InLicensingLaunchDetailColl.filter(function (item, index, array) {
//         return array.indexOf(item) === index;
//     });
//     var newfilteredarray = [];
//     var newfilteredarray2 = [];
//     var newfilteredarray3 = [];
//     var obj = [];
//     for (var i = 0; i < $scope.InLicensingLaunchDetailColl.length; i++) {
//         var col = {};

//         col.InLicensingBusinessCaseId = $scope.InLicensingLaunchDetailColl[i].SingleBidBusinessCase.Id;
//         col.PartnerId = $scope.InLicensingLaunchDetailColl[i].PartnerId;
//         col.PartnerTitle = $scope.InLicensingLaunchDetailColl[i].Partner.Title;
//         col.SubMarketId = $scope.InLicensingLaunchDetailColl[i].SubMarketId;
//         col.SubMarketTitle = $scope.InLicensingLaunchDetailColl[i].SubMarket.Title;

//         obj.push(col);
//     }

//     // Define a custom function to filter unique objects based on CapexBusinessCaseId
//     function filterUnique(arr, property) {
//         return arr.filter((item, index, self) =>
//             index === self.findIndex((t) => t[property] === item[property])
//         );
//     }

//     // Use the custom filter function to get unique objects based on CapexBusinessCaseId
//     var unique = filterUnique(obj, "InLicensingBusinessCaseId");



//     var PRODunique = filterUnique(obj, "PartnerId");
//     var PRODunique2 = filterUnique(obj, "SubMarketId");

//     console.log(PRODunique);
//     console.log(PRODunique2);
//     console.log(unique);
//     newfilteredarray2.push(PRODunique);
//     newfilteredarray.push(PRODunique2);

//     $scope.newfilteredarrayColl = newfilteredarray[0];
//     $scope.newfilteredarrayCol2 = newfilteredarray2[0];

// }

//         $scope.test = $scope.InBusinessLicencingLicencingColl1;

//         if ($scope.InBusinessLicencingLicencingColl.length > 0) {
//            var OLFinalArray =[];
//             for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {

//                 for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Reviewers.results.length; j++) {
//                     var gName = $scope.InBusinessLicencingLicencingColl[i].Reviewers.results[j].Title;
//                     var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
//                     if (userExist == true) {

//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                             $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                         }
//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                             $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/8964d82f-f633-42aa-9ebf-8939905f13c7/ReportSection?experience=power-bi&filter=SingleBidBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                         }

//                         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                           
//                       //  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/2bf91bf3-79ad-4174-9f9b-7f3312c46ada/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                         $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/c1af407c-0385-43de-9825-9e1d3fe0063c/ReportSection?experience=power-bi&filter=SingleBidBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
    
//                     }

//                     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
//                         $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                     }
//                     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
//                         $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/2e7e0adb-887e-4db1-9832-9921a0e3792a/reports/9749c9e7-8a0a-4bf1-8c8d-37702438057b/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";
//                     }
                    
//                     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
//                        // $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
//                         $scope.InBusinessLicencingLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/7bb5f912-e4de-42f5-822e-e4333da75fbe/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.InBusinessLicencingLicencingColl[i].ID + "'";

    
//                     }

//                         //  $scope.InBusinessLicencingLicencingColl[i];
//                         //  $scope.InBusinessLicencingLicencingColl[i];
//                       //  $scope.InBusinessLicencingLicencingColl[i];
//                        OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
//                         break;
//                     }
//                 }
//             }

//             if($scope.InBusinessLicencingLicencingColl.length>0){

//                 $scope.ddlStatus="Under Internal Review";
//                 $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
//                 $scope.test = $scope.InBusinessLicencingLicencingColl1;
//              }

             
//              // arvind

//              $scope.showallstatus = 'conditionForFalse'; // Initial value

//              $scope.toggleStatus = function() {
//                // Your logic based on the true or false value of showallstatus
//                if ($scope.showallstatus === 'conditionForTrue') {
//                  // Do something when true
                
//                  $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
                
//                  $scope.ddlStatus="Under Internal Review";
//                  $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
             
//                  $scope.test = $scope.InBusinessLicencingLicencingColl1;
//                 } else {
//                  $scope.ddlStatus="";
//                  // Do something when false
//                  $scope.InBusinessLicencingLicencingColl1 = $scope.InBusinessLicencingLicencingColl;
                 
//                //  alert('Radhe Radhe');
               
//                }
//              };

//  //
//         }

        // $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

        // $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

        //     return (responseLine.CaseStatus === "Under Internal Review");
        // });


        $scope.InBusinessLicencingLicencingColl=OLFinalArray

        $scope.AllFINALArry = $scope.InBusinessLicencingLicencingColl1

        // $scope.InBusinessLicencingLicencingColl1 = $filter('filter')($scope.InBusinessLicencingLicencingColl, function (responseLine) {

        //     return (responseLine.CaseStatus === "Under Internal Review");
        // });




       




        if ($scope.InBusinessLicencingLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }


        // PAGINATION
        $scope.test = $scope.InBusinessLicencingLicencingColl;

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

        $scope.displayedItems = generateItems();
    });


    $scope.statusChnage = function (ddlStatus) {
        //alert(ddlStatus);
        $scope.InBusinessLicencingLicencingColl = $filter('filter')($scope.AllFINALArry, function (responseLine) {

            return responseLine.CaseStatus == ddlStatus;
        });
        console.log($scope.InBusinessLicencingLicencingColl);

    }
    // //view
    // $scope.ViewReviewerForm = function (request) {
    //     Logics.setSharingDataTwoDash(request);

    //     if (request.Strategy.Title == 'Tender Bid single Scenario') {
    //         $location.path('/ReviewSingleTenderView');          //ReviewerReviewOutLicensingBusinessCase
    //     }
    // }

        //view
        $scope.ViewReviewerForm = function (request) {
            Logics.setSharingDataTwoDash(request);
            localStorage.setItem("dashboard", "ReviewerOLDash"); // New Change VD
            localStorage.setItem("Value", request); // New Change VD
            if (request.Strategy.Title == 'Tender Bid single Scenario') {
                $location.path('/ReviewSingleTenderView');          //ReviewerReviewOutLicensingBusinessCase
            }
        }
        // Review Business-Case Initiation//

    // Review Business-Case Initiation//
    $scope.ReviewForm = function (request) {
        Logics.setSharingData(request);


        if (request.Strategy.Title == 'Tender Bid single Scenario') {
            $location.path('/ReviewSingleTender');
        }

    }

    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }
});