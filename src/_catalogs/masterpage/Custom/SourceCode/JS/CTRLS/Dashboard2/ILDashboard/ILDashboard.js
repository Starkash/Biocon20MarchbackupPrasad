appOperations.controller("InitiatorILDashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessInLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,VersionNo,BusinessCaseDescription,LapVersion,Initiators/Id,Initiators/Title,Title,Modified,Counter,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Initiators,CaseStage,SubStrategy,DosageForm,ProductName&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";

    var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,InLicensingBusinessCase/Title,InLicensingBusinessCaseId&$expand=InLicensingBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";

    $scope.test=[];

    var urlColl = [strBusinessInLicencingUrl, strStrategyUrl, strSubStrategyUrl,strInLicensingLaunchDetailsUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.itemsPerPage =20;
        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.InBusinessLicencingLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.InLicensingLaunchDetailColl = batchedData[3].d.results;


        $scope.InLicensingLaunchDetailColl2=$scope.InLicensingLaunchDetailColl ;
        $scope.InBusinessLicencingLicencingColl2=$scope.InBusinessLicencingLicencingColl ;

        $scope.InLicensingLaunchDetailColl3=$scope.InLicensingLaunchDetailColl ;
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
                 return item.ID == $scope.DupInLicensingLaunchDetailColl[c].InLicensingBusinessCaseId;
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
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].InLicensingBusinessCaseId;
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
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].InLicensingBusinessCaseId;
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
                return item.ID == $scope.DupInLicensingLaunchDetailColl[c].InLicensingBusinessCaseId;
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

if ($scope.InLicensingLaunchDetailColl.length > 0) {
 
    $scope.uniqueArray = $scope.InLicensingLaunchDetailColl.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    });
    var newfilteredarray = [];
    var newfilteredarray2 = [];
    var newfilteredarray3 = [];
    var obj = [];
    for (var i = 0; i < $scope.InLicensingLaunchDetailColl.length; i++) {
        var col = {};

        col.InLicensingBusinessCaseId = $scope.InLicensingLaunchDetailColl[i].InLicensingBusinessCase.Id;
        col.PartnerId = $scope.InLicensingLaunchDetailColl[i].PartnerId;
        col.PartnerTitle = $scope.InLicensingLaunchDetailColl[i].Partner.Title;
        col.SubMarketId = $scope.InLicensingLaunchDetailColl[i].SubMarketId;
        col.SubMarketTitle = $scope.InLicensingLaunchDetailColl[i].SubMarket.Title;

        obj.push(col);
    }

    // Define a custom function to filter unique objects based on CapexBusinessCaseId
    function filterUnique(arr, property) {
        return arr.filter((item, index, self) =>
            index === self.findIndex((t) => t[property] === item[property])
        );
    }

    // Use the custom filter function to get unique objects based on CapexBusinessCaseId
    var unique = filterUnique(obj, "InLicensingBusinessCaseId");



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
            var OLFinalArray=[];
           for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {


            for (var j = 0; j < $scope.InBusinessLicencingLicencingColl[i].Initiators.results.length; j++) {
                var gName = $scope.InBusinessLicencingLicencingColl[i].Initiators.results[j].Title;
                var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                if (userExist == true) 
                {
                    if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                        $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    }
                     if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation'){
                        $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
                    }
                   if(_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                  $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/ddc278f5-83ae-4dec-abe8-4a99a350fa73/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";


                }
                  //  $scope.InBusinessLicencingLicencingColl[i];
                   OLFinalArray.push($scope.InBusinessLicencingLicencingColl[i]);
                    break;

                }
            }
        }


        //     for (var i = 0; i < $scope.InBusinessLicencingLicencingColl.length; i++) {
        //         if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
        //             $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
        //         }
        //          else if(_spPageContextInfo.webAbsoluteUrl=='https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation'){
        //             $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";
        //         }
        //         else{
        //         $scope.InBusinessLicencingLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/ddc278f5-83ae-4dec-abe8-4a99a350fa73/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.InBusinessLicencingLicencingColl[i].ID + "";

                 
        //         }
              

        // }
    }
    $scope.InBusinessLicencingLicencingColl= OLFinalArray;
        if ($scope.InBusinessLicencingLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {
1
            $scope.nodata = false;
        }
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



    $scope.onAddInitiationClick = function () {

        $location.path('/AddILBusinessCase')
    }
    // edit
    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/EditIL');
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

            if ($scope.getStrategy[0].Strategy.Title == "Inlicensing") {  //ANDA inhouse US//ANDA inhouse US
                Logics.setSharingData(request);
                $location.path('/AddILBusinessCase')

            }
        }
    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ViewInLicensing');
        }
    }
    // Change Business-Case Initiation
    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'Inlicensing') {
            $location.path('/ChangeStageInLicensing');
        }
    }
    $scope.onClickHome = function () {
        window.location.href = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCaseLP.aspx";

    }
});