appOperations.controller("InitiatorUSMOWANDADashCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    var strBusinessAndaLicencingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,AuthorId,Author/Title,Author/EMail,Delete,BusinessCaseDescription,Title,Initiators/Id,LapVersion,Initiators/Title,Counter,VersionNo,Modified,BusinessCaseName,InitiationDate,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductNameId,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,Initiators,CaseStage,SubStrategy,DosageForm,ProductName,Author&$filter=Counter ne '0'&$top=5000&$orderby=ID desc"
    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$top=5000&$orderby=ID ";
    var strInLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaLicensingLaunchDetails')/items?$select=*,AuthorId,Author/Title,Author/EMail,PartnerId,Partner/Title,SubMarketId,SubMarket/Title,MarketId,Market/Title,SubMarketId,SubMarket/Title,CountryId,Country/Title,AndaBusinessCase/Title,AndaBusinessCaseId&$expand=Author,AndaBusinessCase,Partner,SubMarket,Market,SubMarket,Country&$top=5000&$orderby=ID asc";
    $scope.test=[];

    var urlColl = [strBusinessAndaLicencingUrl, strStrategyUrl, strSubStrategyUrl,strInLicensingLaunchDetailsUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;
        
        $scope.itemsPerPage =20;
        $scope.AndaBusinessLicencingColl = batchedData[0].d.results;
        $scope.StrategyColl = batchedData[1].d.results;
        $scope.SubStrategyColl = batchedData[2].d.results;
       // $scope.InLicensingLaunchDetailColl = batchedData[3].d.results;


        
        // new changes --arvind 18-April-2024---
     //   $scope.OutLicensingLaunchDetailColl = batchedData[3].d.results;

     $scope.NewInLicensingLaunchDetailColl = batchedData[3].d.results;


    //  $scope.CurrentloggedUser= _spPageContextInfo.userId


    //  $scope.AndaBusinessLicencingColl = $filter('filter')($scope.AndaBusinessLicencingColl, function (item) {
    //      return (item.AuthorId == $scope.CurrentloggedUser);
    //  });

    //  $scope.NewInLicensingLaunchDetailColl = $filter('filter')($scope.NewInLicensingLaunchDetailColl, function (item) {
    //      return (item.AuthorId == $scope.CurrentloggedUser);
    //  });

       
     if($scope.NewInLicensingLaunchDetailColl[0].AndaBusinessCase.Title.substring(0,3)=='000'){
     
     
       $scope.InLicensingLaunchDetailColl= $scope.NewInLicensingLaunchDetailColl.splice(1,$scope.NewInLicensingLaunchDetailColl.length);
     
     }
     
     else{
       $scope.InLicensingLaunchDetailColl=  $scope.NewInLicensingLaunchDetailColl;
     }
   
             // new changes --arvind 18-April-2024---


//

               // Filter pf launch--
               if ($scope.InLicensingLaunchDetailColl.length > 0) {

                /*       $scope.uniqueArray = $scope.InLicensingLaunchDetailColl.filter(function (item, index, array) {
                           return array.indexOf(item) === index;
                       });
                       var newfilteredarray = [];
                       var newfilteredarray2 = [];
                       var newfilteredarray3 = [];
                       var obj = [];
                       for (var i = 0; i < $scope.InLicensingLaunchDetailColl.length; i++) {
                           var col = {};
            
                           col.OutLicensingBusinessCaseId = $scope.InLicensingLaunchDetailColl[i].OutLicensingBusinessCaseId;
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
            */
            
            
                var OLFinalArray = [];
                $scope.A1newfilteredarrayColl = [];
            
                $scope.NewA1newfilteredarrayColl = [];
            
                if ($scope.AndaBusinessLicencingColl.length > 0) {
            
            
                    for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) {
            
            
                        for (var j = 0; j < $scope.AndaBusinessLicencingColl[i].Initiators.results.length; j++) {
                            var gName = $scope.AndaBusinessLicencingColl[i].Initiators.results[j].Title;
                            //  var  userExist =false;
            
                            userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
                            if (userExist == true) {
            
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                                    $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
                                    //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                                }
            
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                                    $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/fccfdca4-a68d-40e2-9d8e-5b381e50796e/ReportSection?experience=power-bi&filter=AndaBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                                    //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                                }
                                
            
            
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') 
                                 {
                                    $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
                                 $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/2459b106-4f8c-4fa6-8fdf-100864b94aa3/ReportSection?experience=power-bi&filter=AndaBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                                }
            
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
                                    $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
                                }
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
                                    $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/e719ec6f-6f21-406c-a257-2446fb91676a/reports/1515ee40-90f2-4900-97f8-7e239165b3f2/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.AndaBusinessLicencingColl[i].ID + "'";
                                }
                
                                if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
                                    $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/06c0c293-b3e7-4c27-9c92-9c0d393d2744/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.AndaBusinessLicencingColl[i].ID + "'";
                
                
                                }
                                OLFinalArray.push($scope.AndaBusinessLicencingColl[i]);
                                break;
            
                            }
            
            
                        }
            
            
                        if (OLFinalArray.length > 0) {
            
                            for (var q = 0; q < OLFinalArray.length; q++) {
            
            
                                //   $scope.A1newfilteredarrayColl= $filter('filter')(unique, function (item) {
                                //         return (item.OutLicensingBusinessCaseId== OLFinalArray[q].ID);
                                //   });
            
                                $scope.A1newfilteredarrayColl = $filter('filter')($scope.InLicensingLaunchDetailColl, function (item) {
                                    return (item.AndaBusinessCaseId == OLFinalArray[q].ID);
                                });
            
                                if ($scope.A1newfilteredarrayColl.length > 0) {
                                    for (var b = 0; b < $scope.A1newfilteredarrayColl.length; b++) {
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
                $scope.AndaBusinessLicencingColl = OLFinalArray;
            
            }
            
            //

//
        $scope.InLicensingLaunchDetailColl2=$scope.NewA1newfilteredarrayColl ;
        $scope.InBusinessLicencingLicencingColl2=$scope.AndaBusinessLicencingColl ;

        $scope.InLicensingLaunchDetailColl3=$scope.NewA1newfilteredarrayColl ;
        $scope.InBusinessLicencingLicencingColl3=$scope.AndaBusinessLicencingColl ;
        $scope.InBusinessLicencingLicencingColl4=$scope.AndaBusinessLicencingColl ;
        $scope.InBusinessLicencingLicencingColl5=$scope.AndaBusinessLicencingColl ;

         $scope.InBusinessLicencingLicencingColl1 = $scope.AndaBusinessLicencingColl;

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
                         return item.ID == $scope.DupInLicensingLaunchDetailColl[c].AndaBusinessCaseId;
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
                        return item.ID == $scope.DupInLicensingLaunchDetailColl[c].AndaBusinessCaseId;
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
                        return item.ID == $scope.DupInLicensingLaunchDetailColl[c].AndaBusinessCaseId;
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
                        return item.ID == $scope.DupInLicensingLaunchDetailColl[c].AndaBusinessCaseId;
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
        
        //         col.InLicensingBusinessCaseId = $scope.InLicensingLaunchDetailColl[i].AndaBusinessCase.Id;
        //         col.PartnerId = $scope.InLicensingLaunchDetailColl[i].PartnerId;
        //         col.PartnerTitle = $scope.InLicensingLaunchDetailColl[i].Partner.Title;
        //         col.SubMarketId = $scope.InLicensingLaunchDetailColl[i].SubMarketId;
        //         col.SubMarketTitle = $scope.InLicensingLaunchDetailColl[i].SubMarket.Title;
        
        //         obj.push(col);
        //     }
        
        //     // Define a custom function to filter unique objects based on CapexBusinessCaseId
        //     function filterUnique(arr, property) {
        //         return arr.filter((item, index, self) =>
        //         index === self.findIndex((t) => t[property] === item[property])
        //         );
        //     }
        
        //     // Use the custom filter function to get unique objects based on CapexBusinessCaseId
        //     var unique = filterUnique(obj, "AndaBusinessCaseId");
        
        
        
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

        // if ($scope.AndaBusinessLicencingColl.length > 0) {

        //     var OLFinalArray=[];
        //     for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) {


        //     for (var j = 0; j < $scope.AndaBusinessLicencingColl[i].Initiators.results.length; j++) {
        //         var gName = $scope.AndaBusinessLicencingColl[i].Initiators.results[j].Title;
        //         var userExist = Logics.getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
        //         if (userExist == true) 
        //         {
        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
        //                 $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
        //                 //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //             }

        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
        //                 $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/fccfdca4-a68d-40e2-9d8e-5b381e50796e/ReportSection?experience=power-bi&filter=AndaBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //                 //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //             }
                    


        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') 
        //              {
        //                 $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
        //              $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/da2b48bc-8887-4ad2-a4cb-3b7d689a4207/reports/2459b106-4f8c-4fa6-8fdf-100864b94aa3/ReportSection?experience=power-bi&filter=AndaBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //             }

        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
        //                 $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/a1a76d85-41f0-4b06-8c03-2525accb4e0a/ReportSection?experience=power-bi&filter=OutLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //             }
        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplUAT/BusinessCaseAutomation') {
        //                 $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/e719ec6f-6f21-406c-a257-2446fb91676a/reports/1515ee40-90f2-4900-97f8-7e239165b3f2/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId eq '" + $scope.AndaBusinessLicencingColl[i].ID + "'";
        //             }
    
        //             if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomAppl/BL/BusinessCaseAutomation') {
        //                 $scope.AndaBusinessLicencingColl[i].DRCPowerBiLink = "https://app.powerbi.com/groups/9235f61b-adea-4690-aa06-b1297c156777/reports/06c0c293-b3e7-4c27-9c92-9c0d393d2744/ReportSection?experience=power-bi&filter=BI_Input_Page%2FBusinessCaseId%20eq '" + $scope.AndaBusinessLicencingColl[i].ID + "'";
    
    
        //             }
                    	

        //           //  $scope.AndaBusinessLicencingColl[i];
        //            OLFinalArray.push($scope.AndaBusinessLicencingColl[i]);
        //             break;
    
        //         }
        //     }
        // }

        //     // for (var i = 0; i < $scope.AndaBusinessLicencingColl.length; i++) {
        //     //     if (_spPageContextInfo.webAbsoluteUrl == 'https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation') {
        //     //         $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
        //     //         //  $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="https://app.powerbi.com/groups/7df8b98c-0bdb-41d0-9056-94f37dc4121c/reports/1c70d896-f138-406d-a1ff-247a2cbb7bc5/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //     //     }
        //     //     else {
        //     //         $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink = "";
        //     //         // $scope.AndaBusinessLicencingColl[i].V2VPowerBiLink="	https://app.powerbi.com/groups/02afbc0f-af46-45ca-99cb-35370af19987/reports/50f8d8cd-d9cf-447f-91f2-99cc41eb6613/ReportSection4292dcebec190b4b122a?experience=power-bi&filter=InLicensingBusinessCase/Id eq " + $scope.AndaBusinessLicencingColl[i].ID + "";
        //     //     }
        //     //     $scope.AndaBusinessLicencingColl[i]
        //     // }

        // }
        // $scope.AndaBusinessLicencingColl= OLFinalArray;
        if ($scope.AndaBusinessLicencingColl.length == 0) {

            $scope.nodata = true;
        }
        else {

            $scope.nodata = false;
        }

        $scope.test = $scope.AndaBusinessLicencingColl;

        $scope.totalItems = $scope.AndaBusinessLicencingColl.length; // Total number of items
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

        $location.path('/AddAndaBusinessCase')

    }

    $scope.EditRadioForm = function (request) {
        Logics.setSharingData(request);

        if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/EditAnda');
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
            if ($scope.getStrategy[0].Strategy.Title == 'ANDA - Inhouse US + MoW') {
                Logics.setSharingData(request);
                $location.path('/AddAndaBusinessCase')
            }
        }


    }
    //view
    $scope.ViewRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ViewAndaLicensing');
        }
    }

    $scope.ChangeStageRadioForm = function (request) {
        Logics.setSharingData(request);
        if (request.Strategy.Title == 'ANDA - Inhouse US + MoW') {
            $location.path('/ChangeStageAndaLicensing');
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
                
                        var strAndaBusinessCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?&$select=*&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                        var strAndaLicensingLaunchDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaLicensingLaunchDetails')/items?&$select=*,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strAndaSKUDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaSKUDetails')/items?&$select=*,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                        var strAndaCommentsWorkflowHistoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaCommentsWorkflowHistory')/items?&$select=Id,Title,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";

                        var strBusinessCaseOLDocumentLinkUrlWorkFlow = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaBusinessCaseDocuments')/items?$select=*,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                      var strBusinessCaseOLSupportingDocumentURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('AndaLicenseSupportingDocument')/items?$select=Id,Title,AndaBusinessCaseId,AndaBusinessCase/Title&$expand=AndaBusinessCase&$filter=AndaBusinessCaseId eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID asc";
                
                
                
                
                        var urlColl = [strAndaBusinessCaseUrl, strAndaLicensingLaunchDetailsUrl, strAndaSKUDetailsUrl, strAndaCommentsWorkflowHistoryUrl,strBusinessCaseOLDocumentLinkUrlWorkFlow,strBusinessCaseOLSupportingDocumentURL];
                
                        Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then( async function (batchedData) {
                
                            $scope.AndaBusinessCaseColl = batchedData[0].d.results;
                            $scope.AndaLicensingLaunchDetailsColl = batchedData[1].d.results;
                            $scope.AndaSKUDetailsColl = batchedData[2].d.results;
                            $scope.AndaCommentsWorkflowHistoryColl = batchedData[3].d.results;
                
                            $scope.BusinessCaseOLDocumentLinkColl = batchedData[4].d.results;
                            $scope.BusinessCaseOLSupportingDocumentColl = batchedData[5].d.results;
                
                
                
                            $scope.AndaLicensingLaunchDetailsColl1 = $scope.AndaLicensingLaunchDetailsColl.filter(function (item) {
                                return (item.AndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.AndaSKUDetailsColl1 = $scope.AndaSKUDetailsColl.filter(function (item) {
                                return (item.AndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.AndaCommentsWorkflowHistoryColl1 = $scope.AndaCommentsWorkflowHistoryColl.filter(function (item) {
                                return (item.AndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLDocumentLinkColl1 = $scope.BusinessCaseOLDocumentLinkColl.filter(function (item) {
                                return (item.AndaBusinessCaseId == $scope.IntiateID);
                            });
                
                            $scope.BusinessCaseOLSupportingDocumentColl1 = $scope.BusinessCaseOLSupportingDocumentColl.filter(function (item) {
                                return (item.AndaBusinessCaseId == $scope.IntiateID);
                            });
                
                         
                
                           // var deferred = $q.defer();
                            
                        var updatedBUBatch1 = [];
                        var updatedBUBatch2 = [];
                        var updatedBUBatch3 = [];
                        var updatedBUBatch4 = [];
                        var updatedBUBatch5 = [];
                        var updatedBUBatch6 = [];
                
                
                        if($scope.AndaBusinessCaseColl.length>0){
                
                            var deferred = $q.defer();
                        updatedBUBatch1.push({
                
                            reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaBusinessCase')/items(" + $scope.IntiateID + ")",
                            action: "UPDATE",
                            data: {
                                __metadata: {
                                    type: "SP.Data.AndaBusinessCaseListItem"
                                },
                                Delete: '' + $scope.isChecked
                
                            }
                
                
                        });
                
                        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch1).then(function (insertedScheduleData2) {
                            console.log(insertedScheduleData2); 
                        });
                    }
                
                
                            if($scope.AndaCommentsWorkflowHistoryColl1.length>0){
                
                                // var deferred = $q.defer();
                                 for(var v=0;v<$scope.AndaCommentsWorkflowHistoryColl1.length;v++){
                                     updatedBUBatch4.push({
                             
                                         reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaCommentsWorkflowHistory')/items(" + $scope.AndaCommentsWorkflowHistoryColl1[v].Id + ")",
                                         action: "UPDATE",
                                         data: {
                                             __metadata: {
                                                 type: "SP.Data.AndaCommentsWorkflowHistoryListItem"
                                             },
                                             Delete: '' + $scope.isChecked
                             
                                         }
                                     });
                
                                     Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch4).then(function (insertedScheduleData4) {
                                        console.log(insertedScheduleData4);
                
                                    });
                
                                       
                                    }   
                            
                                }
                                  
                                         
                
                                         if($scope.AndaLicensingLaunchDetailsColl1.length>0){
                
                                            //  var deferred = $q.defer();
                                              for(var a=0;a<$scope.AndaLicensingLaunchDetailsColl1.length;a++){
                                  
                                  
                                              
                                              updatedBUBatch2.push({
                                  
                                                  reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaLicensingLaunchDetails')/items(" + $scope.AndaLicensingLaunchDetailsColl1[a].Id + ")",
                                                  action: "UPDATE",
                                                  data: {
                                                      __metadata: {
                                                          type: "SP.Data.AndaLicensingLaunchDetailsListItem"
                                                      },
                                                      Delete: '' + $scope.isChecked
                                      
                                                  }
                                              });
                                              Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, updatedBUBatch2).then(function (insertedScheduleData2) {
                                                console.log(insertedScheduleData2);
                                            });
                                            }
                                          
                                        }
                                        
                                  
                                      
                
                                              if($scope.AndaSKUDetailsColl1.length>0){
                
                            
                                                // var deferred = $q.defer();
                                     
                                     
                                                 for(var r=0;r<$scope.AndaSKUDetailsColl1.length;r++){
                                             updatedBUBatch3.push({
                                     
                                                 reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaSKUDetails')/items(" + $scope.AndaSKUDetailsColl1[r].Id + ")",
                                                 action: "UPDATE",
                                                 data: {
                                                     __metadata: {
                                                         type: "SP.Data.AndaSKUDetailsListItem"
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
                
                                    var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/AndaBusinessCaseDocuments/items("+$scope.BusinessCaseOLDocumentLinkColl1[n].Id+")"
                               
                
                                   var  data= {
                                        '__metadata': { 'type': 'SP.Data.AndaBusinessCaseDocumentsItem' },
                
                                     
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
                
                    
                                        var reqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/AndaLicenseSupportingDocument/items(" + $scope.BusinessCaseOLSupportingDocumentColl1[d].Id + ")"
                                   
                    

                                        var  data= {
                                            '__metadata': { 'type': 'SP.Data.AndaLicenseSupportingDocumentItem' },
                    
                                         
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
                     
                        $location.path("/InitiatorUSMOWANDADash");
                         //$route.reload();
                                                                                                           location.reload();

                
                        });
                
                      //  return deferred.promise;
                
                
                
                
                
                
                    
    
            // Your existing logic for fetching data and updating lists goes here...
            // Ensure this logic is inside the confirmation block, so it only executes when confirmed.
    
        } else {
            
            // User canceled the deletion, do nothing
                     //  $route.reload();
                     location.reload();
                                               $location.path("/InitiatorUSMOWANDADash");


            return;
        }
    };
});