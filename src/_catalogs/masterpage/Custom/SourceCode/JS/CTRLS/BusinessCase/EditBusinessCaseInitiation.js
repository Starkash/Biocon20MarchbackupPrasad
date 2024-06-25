/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/


appOperations.controller("EditBusinessCaseInitiationCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    // edit
    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorDashboard');
    }
    else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.ID;
    }
    $scope.CurrDate=new Date();
    var peoplePickerUsers = [];
    $scope.AllpeoplePickerUsers = [];
    $scope.InitatorIDS=[];

// billing
    $scope.currentDate = new Date();
    $scope.preQScoreDate = $scope.currentDate;  
    $scope.BioconfillingdateDatePopUp = {
        opened: false,
    };

//loe
    $scope.currentDate = new Date();
    $scope.preQScoreDate1 = $scope.currentDate;  
    $scope.YearofGenDatePopUp = {
        opened: false,
    };

    Utilities.initializePeoplePickerMul('MultiplepeoplePickerNotify');
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?&$select=*&$top=5000&$orderby=Title";
    var strTemplateNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseTemplateName')/items?&$select=*&$top=5000&$orderby=ID";
    var strTreatmentCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TreatmentCategoryMaster')/items?&$select=*&$top=5000&$orderby=Title";
    var strInnovatorUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InnovatorMaster')/items?&$select=*&$top=5000&$orderby=Title ";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?&$select=*&$top=5000&$orderby=Title";
    var strBrandUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BrandMaster')/items?&$select=*&$top=5000&$orderby=Id";
    var strStrengthUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrengthMaster')/items?&$select=*&$top=5000&$orderby=Title";
    var strBcReqUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseRequests')/items?&$select=Id,Title,Status,GenericisationScenario,Site,FilingType,Strategy,PartnerFilingStrategy,BioconfilingDate,API,GenericFilers,Yearofgeneralisation,MfgSite,OBApprovals,NoofUSDMF,BusinessCaseTemplateId,BusinessCaseTemplate/Title,CFTuserId,CFTuser/Title,CFTuser/EMail,Market/Id,Market/Title,Country/Id,Country/Title,BrandName/Id,BrandName/Title,Classification,Innovator/Id,Innovator/Title,MoleculeName/Id,MoleculeName/Title,Strength/Id,Strength/Title,PackSize,Dosage,Sector,ProductName/Id,ProductName/Title,ProductCategory/Id,ProductCategory/Title,DateofInitiation,Worksheet,TreatmentCategory/Id,TreatmentCategory/Title,CurrentDevelopmentStatus,BusinessCaseStages,BusinessCaseID&$expand=BusinessCaseTemplate,CFTuser,Market,Country,BrandName,Innovator,MoleculeName,Strength,ProductCategory,ProductName,TreatmentCategory&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc"
    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?&$select=*&$top=5000&$orderby=Title";
    var strProductNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID desc"; /// cascading
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,Member/Id,Member/Title,Member/Name,Member/EMail,Country/Id,Country/Title,Market/Id,Market/Title&$expand=Market,Country,Member&$top=5000&$orderby=ID"; // cascading

    var urlColl = [strMarketUrl, strTemplateNameUrl, strTreatmentCategoryUrl, strInnovatorUrl, strCountryUrl, strBrandUrl, strStrengthUrl, strBcReqUrl, strProductCategoryUrl, strProductNameUrl,strRoleMasterUrl];

   // filling
    function disableWeekEnd(data) {
        var date = data.date,
            mode = data.mode;
        return mode === "day" && (date.getDay() === 0 || date.getDay() === 6);
    }
 
    $scope.billingFillingDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };

    $scope.openBillingFillingDate = function () {
        $scope.BioconfillingdateDatePopUp.opened = true;
    };

/// loe
    function disableWeekEnd(data) {
        var date = data.date,
            mode = data.mode;
        return mode === "day" && (date.getDay() === 0 || date.getDay() === 6);
    }
    $scope.YearofGenDateOptions = {
      //  dateDisabled: disableWeekEnd,
      formatYear: "yyyy",
      //maxDate: new Date($scope.currentDate),
      startingDay: 1,
      startingMonth: 1,
      showWeeks: false,
      minMode: 'year'
    };

    $scope.openYearGenFillingDate = function () {
        $scope.YearofGenDatePopUp.opened = true;
    };

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        $scope.MarketColl = batchedData[0].d.results;
        $scope.TemplateNameColl = batchedData[1].d.results;
        $scope.TreatmentCategoryColl = batchedData[2].d.results;
        $scope.InnovatorColl = batchedData[3].d.results;
        $scope.CountryColl = batchedData[4].d.results;
        $scope.BrandColl = batchedData[5].d.results;
        $scope.StrengthColl = batchedData[6].d.results;
        $scope.BcRquestColl = batchedData[7].d.results; 
        $scope.ProductCategoryColl = batchedData[8].d.results;
        $scope.ProductMasterColl = batchedData[9].d.results;
        $scope.RoleMasterColl=batchedData[10].d.results;

        
        // $.ajax({
        //     url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers",
        //     type: "GET",
        //     headers: {
        //         "Accept": "application/json;odata=verbose"
        //     },
        //     success: function (data) {
        //         AllpeoplePickerUsers = data.d.results;
        //         $scope.AllpeoplePickerUsers = AllpeoplePickerUsers;
        //         console.log(AllpeoplePickerUsers);
        //         for (var i = 0; i < AllpeoplePickerUsers.length; i++) { 

        //             var property = AllpeoplePickerUsers[i].Title;
        //             var usrEmil = AllpeoplePickerUsers[i].Email;
        //             peoplePickerUsers.push(property);
        //         }
        //         console.log(peoplePickerUsers);
        //     },
        //     error: function (error) {
        //         alert(JSON.stringify(error));
        //     }
        // });
       
        $scope.bindCommo = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
        }
        $scope.isLoading = false;
        if ($scope.BcRquestColl.length > 0) {
           
            if($scope.BcRquestColl[0].BioconfilingDate!=null && $scope.BcRquestColl[0].BioconfilingDate!='' && $scope.BcRquestColl[0].BioconfilingDate!=undefined)
            {
            $scope.Bioconfillingdate= new Date($scope.BcRquestColl[0].BioconfilingDate);
            }
            if($scope.BcRquestColl[0].Yearofgeneralisation!=null && $scope.BcRquestColl[0].Yearofgeneralisation!='' && $scope.BcRquestColl[0].Yearofgeneralisation!=undefined)
            {
                $scope.Yearofgen= new Date($scope.BcRquestColl[0].Yearofgeneralisation);
            }
            $scope.Businesscasename = $scope.BcRquestColl[0].Title;
            if( $scope.BcRquestColl[0].TreatmentCategory.Id!='' &&  $scope.BcRquestColl[0].TreatmentCategory.Id!=undefined){
                $scope.ddltreatmentcategory =''+$scope.BcRquestColl[0].TreatmentCategory.Id;
            }
            if( $scope.BcRquestColl[0].BrandName.Id!='' &&  $scope.BcRquestColl[0].BrandName.Id!=undefined){
                $scope.ddlbrand =''+$scope.BcRquestColl[0].BrandName.Id;
            }
            if( $scope.BcRquestColl[0].BusinessCaseTemplateId!='' &&  $scope.BcRquestColl[0].BusinessCaseTemplateId!=undefined){
                $scope.ddltemplatename = $scope.BcRquestColl[0].BusinessCaseTemplateId;
            }
            
            if( $scope.BcRquestColl[0].Innovator.Id!='' &&  $scope.BcRquestColl[0].Innovator.Id!=undefined){
                $scope.ddlInnovator =''+ $scope.BcRquestColl[0].Innovator.Id;
            }
           
            $scope.genscenario =$scope.BcRquestColl[0].GenericisationScenario;
            $scope.site = $scope.BcRquestColl[0].Site;
            $scope.FillingType =$scope.BcRquestColl[0].FilingType;
            $scope.PartnerFillingStrategy=$scope.BcRquestColl[0].PartnerFilingStrategy;
            $scope.API=$scope.BcRquestColl[0].API;
            $scope.GenericFilers=$scope.BcRquestColl[0].GenericFilers;
            $scope.MfgSite=$scope.BcRquestColl[0].MfgSite; 
            $scope.Strategy=$scope.BcRquestColl[0].Strategy;       
            $scope.ObApproval=$scope.BcRquestColl[0].OBApprovals;
            $scope.NoofUSDMF=$scope.BcRquestColl[0].NoofUSDMF; 
            $scope.BusinesscaseStage=$scope.BcRquestColl[0].BusinessCaseStages;       
            $scope.DateofInitiation=new Date($scope.BcRquestColl[0].DateofInitiation);
            $scope.CurrentDevlopStatus=$scope.BcRquestColl[0].CurrentDevelopmentStatus;
            $scope.ddlCountry=$scope.BcRquestColl[0].Country.Id;
            $scope.ddlmarket=$scope.BcRquestColl[0].Market.Id;
            $scope.Businesscaseid=$scope.BcRquestColl[0].BusinessCaseID;
            if( $scope.BcRquestColl[0].ProductCategory.Id!='' && $scope.BcRquestColl[0].ProductCategory.Id!='null'  &&  $scope.BcRquestColl[0].ProductCategory.Id!=undefined){
                $scope.ddlProductCategory =$scope.BcRquestColl[0].ProductCategory.Id;
            }
            if( $scope.BcRquestColl[0].ProductName.Id!='' && $scope.BcRquestColl[0].ProductName.Id!='null'  &&  $scope.BcRquestColl[0].ProductName.Id!=undefined){
                $scope.ddlProductName =$scope.BcRquestColl[0].ProductName.Id;
            }

            // for (var z = 0; z < $scope.BcRquestColl[0].CFTuser.results.length; z++) {
            //     $scope.pickmul = $scope.BcRquestColl[0].CFTuser.results[z].EMail

            //     Utilities.SetUserFieldValue('MultiplepeoplePickerNotify', $scope.pickmul);
            // }  
            
            $scope.selectDosage = ['Cap', 'Oral'];
            $scope.check = false;      
            if($scope.BcRquestColl[0].Dosage!=null && $scope.BcRquestColl[0].Dosage!=undefined)
            {
                for (var z = 0; z < $scope.BcRquestColl[0].Dosage.results.length; z++) {
                    var pickmul = $scope.BcRquestColl[0].Dosage.results[z];
                    if (pickmul == $scope.selectDosage[0]) {
                      $scope.capChecked = true;
                      $scope.Cap =true;
                      $scope.selecteddosage.push(pickmul);
                    }
                    if (pickmul == $scope.selectDosage[1]) {
                      $scope.oralChecked = true;
                      $scope.Oral =true;
                      $scope.selecteddosage.push(pickmul);
                    }
                 }
            }      
            
        }

    });


    $scope.selecteddosage = [];
    $scope.toggleDosage = function (dosageName) {
        var idx = $scope.selecteddosage.indexOf(dosageName);
        if (idx > -1) {
            $scope.selecteddosage.splice(idx, 1);
        } else {
            $scope.selecteddosage.push(dosageName);
        }
    }
  
    $scope.onInitiationSubmit = function (flag) {
      

        $scope.fiterdMember = $scope.RoleMasterColl.filter(function (item) {
            return (item.CountryId == $scope.ddlCountry && item.MarketId==$scope.ddlmarket);
        });
        if($scope.fiterdMember.length>0)
        {
            $scope.InitatorIDS.push($scope.fiterdMember[0].MemberId);
            $scope.InitatorIDS.push(_spPageContextInfo.userId)
        }
        else
        {
            $scope.InitatorIDS.push(_spPageContextInfo.userId);
        }



        if (flag == "Submitted") {
            $scope.BusinessCaseStages = "Initiated";
        } else {

        }

        // $scope.getUserDetails = function (splitstr) {
        //     var userDetails = {};
        //     $scope.tempUserName = splitstr;
        //     for (var i = 0; i < $scope.AllpeoplePickerUsers.length; i++) {
        //         if ($scope.AllpeoplePickerUsers[i].LoginName == $scope.tempUserName) {
        //             userDetails = $scope.AllpeoplePickerUsers[i];
        //             break;
        //         }

        //     }
        //     return userDetails;
        // }

        // var mvarNotify = Utilities.getUserInfo('MultiplepeoplePickerNotify');
        // var mNotifyStr = [];
        // var mcanonNstr = "";
        // if (mvarNotify.length > 0) {
        //     for (var j = 0; j < mvarNotify.length; j++) {
        //         $.when($scope.getUserDetails(mvarNotify[j].get_lookupValue())).done(function (userDetails) {
        //             mcanonNstr = userDetails.Id;
        //             mNotifyStr.push(mcanonNstr);
        //         });
        //     }
        // }
        if ($scope.Businesscasename == '' || $scope.Businesscasename == undefined) {
            alert("Please Enter Business Case Name")
            return false;

        }     

        if ($scope.ddlmarket == '' || $scope.ddlmarket == undefined) {
            alert("Please Select Market")
            return false;

        }

        if ($scope.ddltemplatename == '' || $scope.ddltemplatename == undefined) {
            alert("Please Select Business Case Template Type")
            return false;
        }
      
            var EditBusiCase = {
                __metadata: {
                    type: "SP.Data.BusinessCaseRequestsListItem"
                },

                Title: $scope.Businesscasename,
                BusinessCaseTemplateId: parseInt($scope.ddltemplatename),
                MarketId: parseInt($scope.ddlmarket),
                CountryId: parseInt($scope.ddlCountry),
                BrandNameId: parseInt($scope.ddlbrand),
                InnovatorId: parseInt($scope.ddlInnovator),
                TreatmentCategoryId: parseInt($scope.ddltreatmentcategory),
                GenericisationScenario: $scope.genscenario,
                CurrentDevelopmentStatus: $scope.CurrentDevlopStatus,
                Site: $scope.site,
                BioconfilingDate: new Date($scope.Bioconfillingdate),
                API: $scope.API,
                GenericFilers: $scope.GenericFilers,
                Yearofgeneralisation: $scope.Yearofgen,
                MfgSite: $scope.MfgSite,
                FilingType: $scope.FillingType,
                PartnerFilingStrategy: $scope.PartnerFillingStrategy,
                Strategy: $scope.Strategy,
                OBApprovals: $scope.ObApproval,
                NoofUSDMF: $scope.NoofUSDMF,
                Status: flag,
                Dosage: {'results': $scope.selecteddosage}, 
                BusinessCaseStages: $scope.BusinessCaseStages,
                ProductCategoryId: parseInt($scope.ddlProductCategory),
                DateofInitiation: new Date(),
                ProductNameId: parseInt($scope.ddlProductName), 
                InitiatorId: { 'results': $scope.InitatorIDS }
            
              
                // CFTuserId: {
                //     'results': mNotifyStr
                // }
            }
            
            BcEditreqUrl= _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('BusinessCaseRequests')/items(" + $scope.IntiateID + ")";

            Logics.updateData(BcEditreqUrl, EditBusiCase).then(function (response) {
                console.log(response);
                alert("Form Saved Successfully!!");
                $location.path("/InitiatorDashboard");
    
            });

        }
       
    
    
    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorDashboard");
    }
});
  
