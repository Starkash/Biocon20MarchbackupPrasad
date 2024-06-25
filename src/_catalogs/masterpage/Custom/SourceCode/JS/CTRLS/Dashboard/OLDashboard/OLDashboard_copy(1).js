appOperations.controller("InitiatorOLDashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {




    var strBusinessOutLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Delete,CaseStatus,BusinessCaseDescription,Title,LapVersion,VersionNo,Modified,Counter,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Initiators/Id,Initiators/Title,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,Initiators,ProductName&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?$select=*,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,OutLicensingBusinessCase/Title,OutLicensingBusinessCaseId&$expand=OutLicensingBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID ";


    $scope.test = [];
    var urlColl = [strBusinessOutLicencingUrl, strStrategyUrl, strSubStrategyUrl, strOutLicensingLaunchDetailsUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        $scope.itemsPerPage = 20;

        $scope.OutBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
        $scope.OutLicensingLaunchDetailColl = batchedData[3].d.results;

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

                col.OutLicensingBusinessCaseId = $scope.OutLicensingLaunchDetailColl[i].OutLicensingBusinessCaseId;
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
            newfilteredarray2.push(PRODunique);
            newfilteredarray.push(PRODunique2);

            $scope.newfilteredarrayColl = newfilteredarray[0];
            $scope.newfilteredarrayCol2 = newfilteredarray2[0];



            var OLFinalArray = [];
            $scope.A1newfilteredarrayColl = [];

            $scope.NewA1newfilteredarrayColl = [];

            if ($scope.OutBusinessLicencingColl.length > 0) {


                for (var i = 0; i < $scope.OutBusinessLicencingColl.length; i++) {


                    for (var j = 0; j < $scope.OutBusinessLicencingColl[i].Initiators.results.length; j++) {
                        var gName = $scope.OutBusinessLicencingColl[i].Initiators.results[j].Title;
                        //  var  userExist =false;

                        userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
                        if (userExist == true) {
                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                                $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                            }
                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                                $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/2bf91bf3-79ad-4174-9f9b-7f3312c46ada/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                            }

                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                                $scope.OutBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/557453ae-b1b3-42fe-9490-8fce8f72a45f/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";


                            }


                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                                $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                            }
                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                                // $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/0796fd75-5dc1-4a64-aff0-7600542e2885/ReportSection4d40f6b94376d7660ac7?filter=BI%20Input%20Page%20(3)/OutLicensingBusinessCaseId eq " + $scope.OutBusinessLicencingColl[i].ID + "";
                                //$scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/b9a4e840-2061-479a-bb88-94b68b3b4ebb/ReportSection4d40f6b94376d7660ac7?filter=BI_Input_Page/OutLicensingBusinessCaseId%20eq" + $scope.OutBusinessLicencingColl[i].ID + "";
                                //  $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/b9a4e840-2061-479a-bb88-94b68b3b4ebb/ReportSection4d40f6b94376d7660ac7?filter=BI_Input_Page/OutLicensingBusinessCaseId eq '" + $scope.OutBusinessLicencingColl[i].ID + "'";
                                $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/b9a4e840-2061-479a-bb88-94b68b3b4ebb/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FOutLicensingBusinessCaseId eq '" + $scope.OutBusinessLicencingColl[i].ID + "'";

                            }                                                       //https://app.powerbi.com/groups/911fe840-d529-4352-a463-dbef95a4abcc/reports/b9a4e840-2061-479a-bb88-94b68b3b4ebb/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FOutLicensingBusinessCaseId%20eq%20%27ID%27

                            if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                                $scope.OutBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/4872da81-96b8-4ebf-a641-172cdf952ad6/ReportSection4d40f6b94376d7660ac7?experience=power-bi&filter=BI_Input_Page%2FOutLicensingBusinessCaseId%20eq '" + $scope.OutBusinessLicencingColl[i].ID + "'";


                            }


                            //  $scope.OutBusinessLicencingColl[i];
                            OLFinalArray.push($scope.OutBusinessLicencingColl[i]);
                            break;

                        }

                      
                    }


  if (OLFinalArray.length > 0) {

                            for (var q = 0; q < OLFinalArray.length; q++) {


                                //   $scope.A1newfilteredarrayColl= $filter('filter')(unique, function (item) {
                                //         return (item.OutLicensingBusinessCaseId== OLFinalArray[q].ID);
                                //   });

                                $scope.A1newfilteredarrayColl = $filter('filter')($scope.OutLicensingLaunchDetailColl, function (item) {
                                    return (item.OutLicensingBusinessCaseId == OLFinalArray[q].ID);
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
            $scope.OutBusinessLicencingColl = OLFinalArray;

        }

        $scope.OutLicensingLaunchDetailColl2 = $scope.NewA1newfilteredarrayColl //$scope.OutLicensingLaunchDetailColl;
        $scope.OutBusinessLicencingColl2 = $scope.OutBusinessLicencingColl;

        $scope.OutLicensingLaunchDetailColl3 = $scope.NewA1newfilteredarrayColl//$scope.OutLicensingLaunchDetailColl;
        $scope.OutBusinessLicencingColl3 = $scope.OutBusinessLicencingColl;
        $scope.OutBusinessLicencingColl4 = $scope.OutBusinessLicencingColl;
        $scope.OutBusinessLicencingColl5 = $scope.OutBusinessLicencingColl;

        $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;

        // if all blank then 

        $scope.ifallblank = function () {

            if (($scope.ddlStatus == "" || $scope.ddlStatus == undefined) && ($scope.ddlPartner == undefined || $scope.ddlPartner == "") &&
                ($scope.Submarket == undefined || $scope.Submarket == "") && ($scope.ddlProduct5 == "" || $scope.ddlProduct5 == undefined)) {

                $route.reload();


            }
        }

        $scope.Partnerfilter = function (pname, Submarket) {

            Submarket = $scope.Submarket;
            Submarket = $scope.Submarket;
            sbmarketname = $scope.Submarket;
            partnerSelec = pname;
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec == undefined) {
                $scope.Submarketfilter(Submarket, pname);
            }

            if (pname != null && pname != undefined && Submarket == undefined) {
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



            if (pname != null && pname != undefined && Submarket != undefined) {
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
            else if (pname == undefined) {

                $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
                $scope.test = $scope.OutBusinessLicencingColl;
            }

            else {

                //  $scope.OutBusinessLicencingColl = $scope.OutBusinessLicencingColl;
                //  $scope.test = $scope.OutBusinessLicencingColl;

                //   location.reload();


            }

        }

        $scope.Submarketfilter = function (sbmarketname, partnerSelec) {

            //$scope.Partnerfilter($scope.ddlPartner,$scope.Submarket)
            partnerSelec = $scope.ddlPartner;
            var pname = partnerSelec;
            var Submarket = sbmarketname;
            Submarket = $scope.Submarket;
            //ProductNameSelec=$scope.ddlProduct5;
            //If only Submarket Selection

            if (partnerSelec != null && partnerSelec != undefined && sbmarketname == undefined) {
                $scope.Partnerfilter(pname, Submarket);
            }

            if (sbmarketname != null && sbmarketname != undefined && partnerSelec == undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return item.SubMarketId == sbmarketname;
                });
            }


            if (sbmarketname != null && sbmarketname != undefined && partnerSelec != undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return (item.SubMarketId == sbmarketname && item.PartnerId == partnerSelec);
                });
            }

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
            if (sbmarketname != null && sbmarketname != undefined && partnerSelec != undefined) {
                $scope.DupOutLicensingLaunchDetailColl = $filter('filter')($scope.OutLicensingLaunchDetailColl3, function (item) {
                    return (item.SubMarketId == sbmarketname && item.PartnerId == partnerSelec);
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
            else if (sbmarketname == undefined) {

                $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;
                $scope.test = $scope.OutBusinessLicencingColl1;
                //   location.reload();
            }

            else {
                //  location.reload();

                // $scope.OutBusinessLicencingColl1 = $scope.OutBusinessLicencingColl;
                // $scope.test = $scope.OutBusinessLicencingColl1;

            }

        }

    



        console.log($scope.OutBusinessLicencingColl1);
        console.log($scope.NewA1newfilteredarrayColl);

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
        $scope.itemsPerPage = 20// 5; // Items per page
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



    // delete checkbox to all list and library




    // $scope.isChecked=false;
    // Function to toggle checkbox status



    $scope.toggleCheckbox = function (data) {

        var confirmation = confirm("Are you sure you want to Archive/Unarchive this Business Case?");
        if (confirmation) {
            // User confirmed, proceed with deletion
            if (data.Delete == "True" || data.Delete == "true") {
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


            $scope.isLoading = true;

            var strOutLicensingBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?&$select=*&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
            var strOutLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingLaunchDetails')/items?&$select=*,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

            var strOutLicensingSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingSKUDetails')/items?&$select=*,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

            var strOutLicensingCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingCommentsWorkflowHistory')/items?&$select=Id,Title,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

            var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicensingBusinessCaseDocuments')/items?$select=*,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
            var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('OutLicenseSupportingDocument')/items?$select=Id,Title,OutLicensingBusinessCaseId,OutLicensingBusinessCase/Title&$expand=OutLicensingBusinessCase&$filter=OutLicensingBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";




            var urlColl = [strOutLicensingBusinessCaseUrl, strOutLicensingLaunchDetailsUrl, strOutLicensingSKUDetailsUrl, strOutLicensingCommentsWorkflowHistoryUrl, strBusinessCaseOLDocumentLinkUrlWorkFlow, strBusinessCaseOLSupportingDocumentURL];

            Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(async function (batchedData) {

                $scope.OutLicensingBusinessCaseColl = batchedData[0].d.results;
                $scope.OutLicensingLaunchDetailsColl = batchedData[1].d.results;
                $scope.OutLicensingSKUDetailsColl = batchedData[2].d.results;
                $scope.OutLicensingCommentsWorkflowHistoryColl = batchedData[3].d.results;

                $scope.BusinessCaseOLDocumentLinkColl = batchedData[4].d.results;
                $scope.BusinessCaseOLSupportingDocumentColl = batchedData[5].d.results;



                $scope.OutLicensingLaunchDetailsColl1 = $scope.OutLicensingLaunchDetailsColl.filter(function (item) {
                    return (item.OutLicensingBusinessCaseId == $scope.IntiateID);
                });

                $scope.OutLicensingSKUDetailsColl1 = $scope.OutLicensingSKUDetailsColl.filter(function (item) {
                    return (item.OutLicensingBusinessCaseId == $scope.IntiateID);
                });

                $scope.OutLicensingCommentsWorkflowHistoryColl1 = $scope.OutLicensingCommentsWorkflowHistoryColl.filter(function (item) {
                    return (item.OutLicensingBusinessCaseId == $scope.IntiateID);
                });

                $scope.BusinessCaseOLDocumentLinkColl1 = $scope.BusinessCaseOLDocumentLinkColl.filter(function (item) {
                    return (item.OutLicensingBusinessCaseId == $scope.IntiateID);
                });

                $scope.BusinessCaseOLSupportingDocumentColl1 = $scope.BusinessCaseOLSupportingDocumentColl.filter(function (item) {
                    return (item.OutLicensingBusinessCaseId == $scope.IntiateID);
                });



                // var deferred = $q.defer();

                var updatedBUBatch1 = [];
                var updatedBUBatch2 = [];
                var updatedBUBatch3 = [];
                var updatedBUBatch4 = [];
                var updatedBUBatch5 = [];
                var updatedBUBatch6 = [];


                if ($scope.OutLicensingBusinessCaseColl.length > 0) {

                    var deferred = $q.defer();
                    updatedBUBatch1.push({

                        reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingBusinessCase')/items(" + $scope.IntiateID + ")",
                        action: "UPDATE",
                        data: {
                            __metadata: {
                                type: "SP.Data.OutLicensingBusinessCaseListItem"
                            },
                            Delete: '' + $scope.isChecked

                        }


                    });

                    Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch1).then(function (insertedScheduleData2) {
                        console.log(insertedScheduleData2);
                    });
                }


                if ($scope.OutLicensingCommentsWorkflowHistoryColl1.length > 0) {

                    // var deferred = $q.defer();
                    for (var v = 0; v < $scope.OutLicensingCommentsWorkflowHistoryColl1.length; v++) {
                        updatedBUBatch4.push({

                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingCommentsWorkflowHistory')/items(" + $scope.OutLicensingCommentsWorkflowHistoryColl1[v].Id + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.OutLicensingCommentsWorkflowHistoryListItem"
                                },
                                Delete: '' + $scope.isChecked

                            }
                        });

                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch4).then(function (insertedScheduleData4) {
                            console.log(insertedScheduleData4);

                        });


                    }

                }



                if ($scope.OutLicensingLaunchDetailsColl1.length > 0) {

                    //  var deferred = $q.defer();
                    for (var a = 0; a < $scope.OutLicensingLaunchDetailsColl1.length; a++) {



                        updatedBUBatch2.push({

                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingLaunchDetails')/items(" + $scope.OutLicensingLaunchDetailsColl1[a].Id + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.OutLicensingLaunchDetailsListItem"
                                },
                                Delete: '' + $scope.isChecked

                            }
                        });
                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch2).then(function (insertedScheduleData2) {
                            console.log(insertedScheduleData2);
                        });
                    }

                }




                if ($scope.OutLicensingSKUDetailsColl1.length > 0) {


                    // var deferred = $q.defer();


                    for (var r = 0; r < $scope.OutLicensingSKUDetailsColl1.length; r++) {
                        updatedBUBatch3.push({

                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('OutLicensingSKUDetails')/items(" + $scope.OutLicensingSKUDetailsColl1[r].Id + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.OutLicensingSKUDetailsListItem"
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

                            var reqUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/OutLicensingBusinessCaseDocuments/items(" + $scope.BusinessCaseOLDocumentLinkColl1[n].Id + ")"


                            var data = {
                                '__metadata': { 'type': 'SP.Data.OutLicensingBusinessCaseDocumentsItem' },


                                Delete: '' + $scope.isChecked

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
                    for (var d = 0; d < $scope.BusinessCaseOLSupportingDocumentColl1.length; d++) {


                        var reqUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/OutLicenseSupportingDocument/items(" + $scope.BusinessCaseOLSupportingDocumentColl1[d].Id + ")"



                        var data = {
                            '__metadata': { 'type': 'SP.Data.OutLicenseSupportingDocumentItem' },


                            Delete: '' + $scope.isChecked

                        }



                        //
                        Logics.updateData(reqUrl, data).then(function (insertedScheduleData9) {
                            console.log(insertedScheduleData9);
                            // deferred.resolve();
                        });


                    }

                }





                alert('Data Updated Successfully!!!');
                $scope.isLoading = false;

                $location.path("/InitiatorOLDash");
                //$route.reload();
                location.reload();


            });

            //  return deferred.promise;








            // Your existing logic for fetching data and updating lists goes here...
            // Ensure this logic is inside the confirmation block, so it only executes when confirmed.

        } else {

            // User canceled the deletion, do nothing
            //$route.reload();
            location.reload();

            $location.path("/InitiatorOLDash");



            return;
        }
    };

    //

});