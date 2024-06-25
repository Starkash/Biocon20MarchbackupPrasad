appOperations.controller("USAndaBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    $scope.CurrDate = new Date();
// arind
$scope.LOEdateDatePopUp = {
        opened: false,
    };
    $scope.openCompletionYearDate = function (countryRow) {
        //  $scope.LOEdateDatePopUp.opened = true;
        countryRow.IsOpenDate = true;
    };

    $scope.CompletionYearDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
    $scope.FillingdateDatePopUp = {
        opened: false,
    };
    $scope.openTriggerYear = function (countryRow) {
        // $scope.FillingdateDatePopUp.opened = true;
        countryRow.IsOpenDate2 = true;
    };
    $scope.TriggerYearOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
     

    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'Capex'&$top=5000&$orderby=ID";
    // var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$&$filter=SubStrategy eq 'Fixed TP/FP'top=5000&$orderby=ID";
    //var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'OutLicensing (ANDA)'&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$orderby=ID";

    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$filter=ID eq '4'&$orderby=ID ";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
    var strCAPEXBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=*,Title,ID&$top=1000&$orderby=Id desc";
    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    var strCAPEXBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?$select=*,Title,ID&$top=1000&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'Capex'&$top=5000&$orderby=ID"; // cascading
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('StageMaster')/items?$select=*&$filter=Title eq 'Initiated'&$top=100&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Site')/items?$select=*&$top=100&$orderby=ID"; // cascading



    $scope.setting5 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll: true
        //showUncheckAll:false
    };

    $scope.setting1 = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        showCheckAll:false
    };
    


    $scope.openAuditDate = function() {
        $scope.auditDatePopUp.opened = true;
        
     
    };
    $scope.auditDatePopUp = {
        opened: false,
     
    };
    $scope.auditDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'year'
    };



    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strCAPEXBUCaseUrl, strPartnerUrl, strCAPEXBULaunchUrl, strRoleMasterUrl, strStageMasterUrl, strSkuMasterUrl,strSiteUrl];

    //ARVIND
    var newAuditItem;

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {

        function callMultiSelect(argument) {
            $('#ddnmembers').fSelect();
            // $('#ddnRJmembers').fSelect();
        }
        $scope.newMarketRow1Coll = [];
        $scope.CapexPhaseColl = [];     //ARVIND


        $scope.StrategyColl = batchedData[0].d.results;
        $scope.SubStrategyColl = batchedData[1].d.results;
        $scope.ProductCategoryColl = batchedData[2].d.results;
        $scope.ProductMasterColl = batchedData[3].d.results;
        $scope.MarketColl = batchedData[4].d.results;
        $scope.CountryColl = batchedData[5].d.results;
        $scope.DosageColl = batchedData[6].d.results;
        $scope.subMarketColl = batchedData[7].d.results;
        $scope.CAPEXBUCaseColl = batchedData[8].d.results;
        $scope.PartnerColl = batchedData[9].d.results;
        $scope.CAPEXLaunchColl = batchedData[10].d.results;
        $scope.RoleMasterColl = batchedData[11].d.results;
        $scope.StageMasterColl = batchedData[12].d.results;
        $scope.SkuMasterColl = batchedData[13].d.results;
        $scope.SiteColl = batchedData[14].d.results;





        if ($scope.StrategyColl.length > 0) {
            $scope.ddlStrategy = $scope.StrategyColl[0].Id;
            $scope.ddlStrategyCAPEX = $scope.StrategyColl[0].Title;

            
        }
        if ($scope.SubStrategyColl.length > 0) {
            $scope.SubStrategyColl = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });

        }
        
        $scope.CurrLogUserId=_spPageContextInfo.userDisplayName;
        $scope.selectedContTypeDes=[];

        $scope.ppedescriptioncoll = [];
        for (var n = 0; n < $scope.ProductMasterColl.length; n++) {
            $scope.finalppedescriptionColl = [{
                "label": $scope.ProductMasterColl[n].Title,
                "id": $scope.ProductMasterColl[n].Id

            }];
            console.log($scope.finalppedescriptionColl);
            $scope.ppedescriptioncoll.push($scope.finalppedescriptionColl[0]);

        }



        // arvind

         
        var counter;
        var vRetVal;
        if ($scope.CAPEXBUCaseColl.length > 0) {
            var Logg = $scope.CAPEXBUCaseColl[0].Title;
            if (Logg == null) {
                counter = 0;
            } else {
                // BIOCON-OUT-LIC-1
                var Result = Logg.split("-");
                $scope.counter = Result[0];

            }
        } else {
            $scope.counter = "000";
        }
        // counter = parseInt(counter) + 1;
        // $scope.BUTitle = vRetVal;
        var i = 0;
        $scope.InitiationDate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();
        
      

        //BIND STARGEY DROPDOWN
        $scope.bindstrategy = function (ddlStrategy) {
            $scope.getStrategy = $scope.SubStrategyColl.filter(function (item) {
                return (item.StrategyId == $scope.ddlStrategy);
            });
        }
        //BIND PRODUCT DROPDOWN  
        $scope.ProductNameColl=[];  
        $scope.dosagessColl = [];
        var unique = [];

        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
            $scope.ProdCode = $scope.getProductame[0].ProductCode;
          
            //$scope.ProductNameColl.push($scope.getProductame);

            for (var n = 0; n < $scope.getProductame.length; n++) {
                $scope.finalppcommoditycoll = [{
                    "label": $scope.getProductame[n].Product,
                    "id": $scope.getProductame[n].Id
    
                }];
                    for (i = 0; i <  $scope.finalppcommoditycoll.length; i++) {
                        if (unique.indexOf( $scope.finalppcommoditycoll[i]) === -1) {
                            unique.push( $scope.finalppcommoditycoll[i]);
                        }
                    }
                    
                console.log(unique);
                $scope.dosagessColl.push(unique[0]);

               
            }

        };
        

       

       

        

        // DUPLICATE REMOVE ARRAY FUNCTION
        // var arr = [1,2,1,5,6,45,45];
 
        // function removeDuplicates(arr) {
        //     var unique = [];
        //     for (i = 0; i < arr.length; i++) {
        //         if (unique.indexOf(arr[i]) === -1) {
        //             unique.push(arr[i]);
        //         }
        //     }
        //     return unique;
        // }
        // var a=removeDuplicates(arr).length
        // console.log(a)

        //
      
        // $scope.newScheduleColl=[];
        // $scope.addScheduleRow = function(scheduleObj) {
        //       $scope.showSubmit = false;
        //       if (scheduleObj != null || scheduleObj != undefined) {
        //           scheduleObj.HideAddButton = true;
        //           if ($scope.newScheduleColl.length === 1) {
        //               scheduleObj.HideRemoveButton = true;
        //           } else {
        //               scheduleObj.HideRemoveButton = false;
        //           }
               
        //       }
        //     //   $scope.ProductNameColl=[];
        //     //   $scope.ProductNameColl.push( $scope.dosagessColl)


        //       $scope.newScheduleColl.push({
        //         "Phase":"",
        //         "CapexPhaseTotal":0,
        //         "CapexTriggerYearPhase":"",
        //         "ProductName": $scope.dosagessColl,
        //         "CapexCompletionYear":"",
        //         "IsOpenDate": false,
        //         "IsOpenDate2": false,
        //         "IsOpenDate3": false,
        //         "CreatedBy": { "ID": _spPageContextInfo.userId, "Name": _spPageContextInfo.userDisplayName, "Email": _spPageContextInfo.userEmail },
        //         "HideAddButton": false,
        //         "HideRemoveButton": false
        //       });
            
        //       if ($scope.newScheduleColl.length > 0 && $scope.newScheduleColl.length <= 1) {
        //           $scope.newScheduleColl[$scope.newScheduleColl.length - 1].HideAddButton = false;
        //           $scope.newScheduleColl[$scope.newScheduleColl.length - 1].HideRemoveButton = true;
        //       }
        //       $scope.dosagessColl=[];
        //       $scope.dosagessColl.push( $scope.newScheduleColl[1].ProductName)

      
        //       //console.log($scope.newScheduleColl);
        //   }
        
          
          


          $scope.OnCapexValueChange = function() {
            var CapexPhaseTotal1=0;
              $scope.PhaseTotal=[];
              for(var i=0;i<$scope.CapexPhaseColl.length;i++){
                CapexPhaseTotal1+=parseFloat($scope.CapexPhaseColl[i].CapexPhaseTotal)/10000000;
              }
              $scope.CapexPhaseTotal2=CapexPhaseTotal1;
            
        };

        // Count product (counter of unique product)
        var uniqueCount;
                $scope.ProdCount = function () {
                var objppe = [];
                for(var z=0;z<$scope.CapexPhaseColl.length;z++){
                if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
                    for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                        console.log(objppe);
                        var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                        objppe.push(a)
                    }
                }
                // $scope.ProdId = {
                //     "results": objppe
                // };

                // filter unique value of array // arvind
                     uniqueCount = new Set(objppe).size;
                        console.log(uniqueCount);
                    $scope.Productcount=uniqueCount;          

                    }
                }


      

        
        
      
          $scope.removeAuditItem = function(Capex, $event) {
              $event.currentTarget.style.display = "none";
        
          var  boolCapexValue='false'
            if($scope.CapexPhaseColl.length>1){
              for(var r =0;r<=$scope.CapexPhaseColl.length;r++){
                if(Capex.CapexPhaseTotal==parseFloat($scope.CapexPhaseColl[i].CapexPhaseTotal)){
                    boolCapexValue='True';
                }
                
              }
                if(boolCapexValue='True')

                $scope.CapexPhaseTotal2=($scope.CapexPhaseTotal2)-parseFloat(Capex.CapexPhaseTotal)/10000000;
           
            }
                   $scope.Productcount=uniqueCount;     // counter of unique product
          
                  var t = $scope.CapexPhaseColl.indexOf(Capex);
                  $scope.CapexPhaseColl.splice(t, 1);
      
                  if ($scope.CapexPhaseColl.length > 0 && $scope.CapexPhaseColl.length <= 1) {
                      $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideAddButton = false;
                      $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = true;
                      $scope.showSubmit = true;
                  } else {
                      $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideAddButton = false;
                      $scope.CapexPhaseColl[$scope.CapexPhaseColl.length - 1].HideRemoveButton = false;
                  }
      
                  $scope.setLoading(false);
           
          }
      
       
          newAuditItem={
            StandardColl: $scope.standardColl,
            // ViolationAgainstStandardId: "",
            // ObservationColl: ["First Time", "Repeat"],
            // ObservationOccurence: "",
             selectedContTypeDes:[],
             CapexPhaseTotal:0,
            // Action: "",
            // Status: "",
            ScheduleIDId: $scope.scheduleID,
            HideAddButton: true,
            HideRemoveButton: true,

    }

    var currentRoWIndex = $scope.CapexPhaseColl.length

    if ($scope.CapexPhaseColl.length == 0) {

        setTimeout(function() {
            for (var i = 0; i < 1; i++) {
                var auditItemCopy = angular.copy(newAuditItem);
                setAuditItem(auditItemCopy);
                currentRoWIndex = $scope.CapexPhaseColl.length;
                //auditItemCopy.ObservationFor="Unscheduled";//1 line added by ketaki
                $scope.CapexPhaseColl.push(auditItemCopy);
                $scope.CapexPhaseColl[i].SrNo = currentRoWIndex + i + 1;
                $scope.CapexPhaseColl[i].HideAddButton = false;
                // if (i > 3) {
                //     $scope.CapexPhaseColl[i].HideAddButton = false;
                // }
                $scope.$apply();
            }
        }, 1000);


    }

    if ($scope.CapexPhaseColl.length > 0) {
            for (var index = 0; index < $scope.CapexPhaseColl.length; index++) {
                $scope.CapexPhaseColl[index].SrNo = index + 1;
                $scope.CapexPhaseColl[index].HideAddButton = true;
                if ($scope.isFormReadonly == true) {
                    $scope.CapexPhaseColl[index].HideRemoveButton = true;
                } else {
                    $scope.CapexPhaseColl[index].HideRemoveButton = false;
                }
                $scope.CapexPhaseColl[index].CFSAAuditIDId = $scope.CapexPhaseColl[index].ID;
                $scope.CapexPhaseColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;
           
                if (index == $scope.CapexPhaseColl.length - 1 && $scope.isFormReadonly == false) {
                    $scope.CapexPhaseColl[index].HideAddButton = false;
                    if ($scope.CapexPhaseColl.length == 1) {
                        $scope.CapexPhaseColl[index].HideRemoveButton = true;
                    } else {
                        $scope.CapexPhaseColl[index].HideRemoveButton = false;
                    }
                }
            }
        }


        function setAuditItem(auItem) {
            //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;
         
    
            //addded by sonali start
            //    $scope.PPEDescriptionData = auItem.selectedPPEescription;
            var objppe = [];
            if (auItem.selectedContTypeDes.length > 0) {
                for (var i = 0; i < auItem.selectedContTypeDes.length; i++) {
                    console.log(objppe);
                    var a = auItem.selectedContTypeDes[i].id;
                    objppe.push(a)
    
    
                }
            }
            auItem.PPEDescriptionId = { "results": objppe };

              


         
        }

        $scope.addAuditItem = function(auditObj) {
            if (auditObj != null && auditObj != undefined) {
                auditObj.HideAddButton = true;
            }
            var auditItemCopy = angular.copy(newAuditItem);
            setAuditItem(auditItemCopy);
            auditItemCopy.SrNo = auditObj.SrNo + 1;
            auditItemCopy.HideAddButton = false;
            auditItemCopy.HideRemoveButton = false;
            $scope.CapexPhaseColl.push(auditItemCopy);
            console.log($scope.CapexPhaseColl);
    
            $timeout(function() {
                $('[data-toggle="tooltip"]').tooltip();
            }, 100);
        };
    
    


    });


  
    //ON SUBMIT BUTTON:SAVE DATA IN 3 LIST
    $scope.onSubmit = function () {
        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Id == $scope.ddlSubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
      //  shortname = "ANDA" + shortname;
        $scope.counter = parseInt($scope.counter) + 1;
       // $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

        // "0001-ILCFTP_ATVR_Jul-2023"

        console.log($scope.newMarketRow1Coll)
        var marklenght = $scope.newMarketRow1Coll.length;
        if (marklenght > 0) {
            marklenght = marklenght - 1;
            var countrylenght = $scope.newMarketRow1Coll[marklenght].CountryRow.length;
            // if(countrylenght>0){
            //     countrylenght=countrylenght-1;
            //     var skulength= $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].length;

            if (countrylenght == 0) {
                alert('Please First Add Country Row');
                return false;
            }


            // }
            if (countrylenght > 0) {

                countrylenght = countrylenght - 1;



                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    }
                }
                var skulength = $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length;

                if (skulength == 0) {
                    alert('Please First Add SKU Row');
                    return false;
                }

                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    }
                }


            }

        }

        $scope.FinalCountryLaunchColl = [];
        $scope.FinalSKUColl = [];
        for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
            for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
                $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
            }
        }
        for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
            for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
                $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

            }
        }


        //Fetechin User from role master based on   Reviewer,  Initiator,
        // var pplInitiator = [];
        // var pplReviewer = [];
        // var pplValidator = [];
        // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
        //     $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Initiator');
        //     });
        //     $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Reviewer');
        //     });
        //     $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
        //         return (item.Role == 'Validator');
        //     });
        //     if ($scope.fiterdInitiatorMember.length > 0) {
        //         pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
        //         }
        //     if ($scope.fiterdReviewerMember.length > 0) {
        //         pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
        //     }
        //     if ($scope.fiterdValidatorMember.length > 0) {
        //         pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
        //     }
        //     if(pplInitiator.length==0)
        //     {
        //         alert("No Initiator Group Found")
        //         return false;
        //     }
        //     if(pplReviewer.length==0)
        //     {
        //         alert("No Reviewer Group Found")
        //         return false;
        //     }
        //     if(pplValidator.length==0)
        //     {
        //         alert("No Validator Group Found")
        //         return false;
        //     }
        // }


        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
       // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
            $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Initiator');
            });
            $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Reviewer');
            });
            $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Validator');
            });
            if ($scope.fiterdInitiatorMember.length > 0) {
                pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
                }
            if ($scope.fiterdReviewerMember.length > 0) {
                pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
            }
            if ($scope.fiterdValidatorMember.length > 0) {
                pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
            }
            // if(pplInitiator.length==0)
            // {
            //     alert("No Initiator Group Found")
            //     return false;
            // }
            // if(pplReviewer.length==0)
            // {
            //     alert("No Reviewer Group Found")
            //     return false;
            // }
            // if(pplValidator.length==0)
            // {
            //     alert("No Validator Group Found")
            //     return false;
            // }
      //  }
       
        

        // var objppe = [];
        // if ($scope.selectedContTypeDes.length > 0) {
        //     for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
        //         console.log(objppe);
        //         var a = $scope.selectedContTypeDes[i].id;
        //         objppe.push(a)
        //     }
        // }
        // $scope.DossageId = {
        //     "results": objppe
        // };

        var objppe = [];
        var uniqueCount;
        for(var z=0;z<$scope.CapexPhaseColl.length;z++){
        if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
            for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                console.log(objppe);
                var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                objppe.push(a)
            }
        }
        $scope.ProdId = {
            "results": objppe
        };

     uniqueCount = new Set(objppe).size;
     console.log(uniqueCount);
     $scope.Productcount=uniqueCount;    
    }


        
       // $scope.IsDisabled = true;
        //Insert Data into Parent List (OutLicensingBusinessCase)
        var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items";
        var AndaBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.CapexBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.ddlSubStrategy,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            NumberOfProducts: $scope.Productcount,         //   DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            CaseStageId: $scope.StageMasterColl[0].Id,
            CaseStatus: "Initiated",
            Escalation:parseInt($scope.Escalation),
            EscalationRemarks:$scope.EscalationRemarks,        
            SiteId:$scope.ddlSite,
            BCCompletionYear:$scope.auditDate,
            CapexCurrency:$scope.CapexCurrency,
            ProductNameId:$scope.ProdId,

          //  CapexCurrency:$scope.ddlCapexCurrency,
            CapexValue: parseFloat($scope.CapexPhaseTotal2),
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },
            ValidatorsId: {
                'results': pplValidator
            },
            VersionNo:"1.0"

        };
        Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
            $scope.CapexBusinessCaseIntID = AndaBusCaseData.data.d.Id;
            console.log($scope.CapexBusinessCaseIntID);
            $scope.CapexPhaseDetails();
            alert("Business Case Saved Successfully!!");
            $location.path("/InitiatorLP");

        });

    }


    $scope.onSaveAsDraft = function () {
        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Id == $scope.ddlSubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
      //  shortname = "ANDA" + shortname;
        $scope.counter = parseInt($scope.counter) + 1;
       // $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

        // "0001-ILCFTP_ATVR_Jul-2023"

        console.log($scope.newMarketRow1Coll)
        var marklenght = $scope.newMarketRow1Coll.length;
        if (marklenght > 0) {
            marklenght = marklenght - 1;
            var countrylenght = $scope.newMarketRow1Coll[marklenght].CountryRow.length;
            // if(countrylenght>0){
            //     countrylenght=countrylenght-1;
            //     var skulength= $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].length;

            if (countrylenght == 0) {
                alert('Please First Add Country Row');
                return false;
            }


            // }
            if (countrylenght > 0) {

                countrylenght = countrylenght - 1;



                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
                        alert('First Fill All Fields In Country')
                        return false;

                    }
                }
                var skulength = $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length;

                if (skulength == 0) {
                    alert('Please First Add SKU Row');
                    return false;
                }

                for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
                        alert('First Fill All Fields In SKU')
                        return false;

                    }
                }


            }

        }

        $scope.FinalCountryLaunchColl = [];
        $scope.FinalSKUColl = [];
        for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
            for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
                $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
            }
        }
        for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
            for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
                $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

            }
        }

        var pplInitiator = [];
        var pplReviewer = [];
        var pplValidator = [];
       // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
            $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Initiator');
            });
            $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Reviewer');
            });
            $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
                return (item.Role == 'Validator');
            });
            if ($scope.fiterdInitiatorMember.length > 0) {
                pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
                }
            if ($scope.fiterdReviewerMember.length > 0) {
                pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
            }
            if ($scope.fiterdValidatorMember.length > 0) {
                pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
            }
            // if(pplInitiator.length==0)
            // {
            //     alert("No Initiator Group Found")
            //     return false;
            // }
            // if(pplReviewer.length==0)
            // {
            //     alert("No Reviewer Group Found")
            //     return false;
            // }
            // if(pplValidator.length==0)
            // {
            //     alert("No Validator Group Found")
            //     return false;
            // }
      //  }
       
        

        // var objppe = [];
        // if ($scope.selectedContTypeDes.length > 0) {
        //     for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
        //         console.log(objppe);
        //         var a = $scope.selectedContTypeDes[i].id;
        //         objppe.push(a)
        //     }
        // }
        // $scope.DossageId = {
        //     "results": objppe
        // };

        // PRODUCT

        var objppe = [];
        var uniqueCount;
        for(var z=0;z<$scope.CapexPhaseColl.length;z++){

        if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
            for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                console.log(objppe);
                var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                objppe.push(a)
            }
        }
        $scope.ProdId = {
            "results": objppe
        };

     uniqueCount = new Set(objppe).size;
     console.log(uniqueCount);
     $scope.Productcount=uniqueCount;    
    }

        
       // $scope.IsDisabled = true;
        //Insert Data into Parent List (OutLicensingBusinessCase)
        var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items";
        var AndaBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.CapexBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.ddlSubStrategy,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            NumberOfProducts: $scope.Productcount,         //   DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            CaseStageId: $scope.StageMasterColl[0].Id,
            CaseStatus: "Draft",
            Escalation:parseInt($scope.Escalation),
            EscalationRemarks:$scope.EscalationRemarks,        
            SiteId:$scope.ddlSite,
            BCCompletionYear:$scope.auditDate,
            CapexCurrency:$scope.CapexCurrency,
            ProductNameId:$scope.ProdId,

          //  CapexCurrency:$scope.ddlCapexCurrency,
            CapexValue: parseFloat($scope.CapexPhaseTotal2),
            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },
            ValidatorsId: {
                'results': pplValidator
            },
            VersionNo:"1.0"

        };
        Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
            $scope.CapexBusinessCaseIntID = AndaBusCaseData.data.d.Id;
            console.log($scope.CapexBusinessCaseIntID);
            $scope.CapexPhaseDetails();
            alert("Business Case Saved Successfully!!");
            $location.path("/InitiatorLP");

        });

    }





    $scope.CapexPhaseDetails = function () {

        var deferred = $q.defer();
        var noOfLaunchIndex = 0;
        var insertCountryBatch = [];
        var insertSKUDetailsBatch = [];
        $scope.AddedLaunchids = [];
        var insertCountryBatch = [];
        $scope.AddedLaunchids = [];
        for (var z = 0; z < $scope.CapexPhaseColl.length; z++) {
            noOfLaunchIndex++;
            var launchTitle = $scope.BUTitle + "-Phase-" + noOfLaunchIndex;
           $scope.TriggerYear= new Date(($scope.CapexPhaseColl[z].CompletionYear).format("dd-MM-yyyy"));//$scope.CapexPhaseColl[z].CompletionYear.format("dd-MM-yyyy")
          $scope.CompletionYear=new Date(($scope.CapexPhaseColl[z].TriggerYear).format("dd-MM-yyyy"));
//$scope.CapexPhaseColl[0].selectedContTypeDes.length
           var objppe = [];
           var uniqueCount;
           if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
               for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
                   console.log(objppe);
                   var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
                   objppe.push(a)
               }
           }
           $scope.ProdId = {
               "results": objppe
           };

        uniqueCount = new Set(objppe).size;
        console.log(uniqueCount);
        $scope.Productcount=uniqueCount;    


           //return false;

            insertCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('CapexPhaseDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.CapexPhaseDetailsListItem"
                    },
                    Title: launchTitle,
                    // MarketId: $scope.FinalCountryLaunchColl[z].MarketId,
                    // SubMarketId: $scope.FinalCountryLaunchColl[z].SubMarketId,
                    // CountryId: $scope.FinalCountryLaunchColl[z].Country, //USA:1
                    TriggerYear: new Date($scope.CapexPhaseColl[z].TriggerYear),
                    CompletionYear: new Date($scope.CapexPhaseColl[z].CompletionYear),
                    PhaseTotal: $scope.CapexPhaseColl[z].CapexPhaseTotal,
                    ProductNameId: $scope.ProdId,   
                   
                   // ProductNameId: $scope.newScheduleColl[0].ProductName.Id,
                   // ProductNameId: $scope.DossageId,

                   // CompletionYear: $scope.FinalCountryLaunchColl[z].LaunchDate,
                    // PartnerId: $scope.FinalCountryLaunchColl[z].Partner,
                    // PartnerDetails: $scope.FinalCountryLaunchColl[z].PartnerDesc,
                    // CurrentStatus: $scope.FinalCountryLaunchColl[z].Status, // arvind  
                    // Currency: $scope.FinalCountryLaunchColl[z].Currency,
                   // Currency: $scope.newScheduleColl[z].Product,

                    CapexBusinessCaseId: $scope.CapexBusinessCaseIntID //newScheduleColl
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);

            for (var p = 0; p <insertedLaunchData.length; p++) {
                var coll = {};
                coll.LunchID = insertedLaunchData[p].d.Id
                coll.Country = insertedLaunchData[p].d.CountryId
                coll.LaunchTitle = insertedLaunchData[p].d.Title
                $scope.AddedLaunchids.push(coll);
            }
            if (noOfLaunchIndex == $scope.FinalCountryLaunchColl.length) {
                $scope.SkuDetails($scope.AddedLaunchids);
            }
            deferred.resolve();
        });
        return deferred.promise;
    }
    $scope.SkuDetails = function (AddedLaunchids) {
        var deferred = $q.defer();
        var insertSKUDetailsBatch = [];
        var index = 0;
        for (var z = 0; z <$scope.FinalSKUColl.length; z++) {
            index++;
            var getLaunchID = AddedLaunchids.filter(function (item) {
                return (item.Country == $scope.FinalSKUColl[z].SKUCountry);
            });
            console.log(getLaunchID);
            insertSKUDetailsBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('AndaSKUDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.AndaSKUDetailsListItem"
                    },
                    Quantity: $scope.FinalSKUColl[z].SKUQunatity,
                    Unit: $scope.FinalSKUColl[z].SKUUnit,
                    PackingType: $scope.FinalSKUColl[z].PackingType,
                    Pack: $scope.FinalSKUColl[z].PackSize,
                    AndaLicensingLaunchDetailId: getLaunchID[0].LunchID,
                    AndaBusinessCaseId: $scope.AndaBusinessCaseIntID
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertSKUDetailsBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);
            if (index == $scope.FinalSKUColl.length) {
                alert("Business Case Saved Successfully!!");
                $location.path("/InitiatorLP");
                // var alertMessage = "Request has been submitted";
                // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorLP");
                // Utilities.closeDialogBox();

                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorLP");

    }
});