/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    $scope.routeReload = function () {
    
        $route.reload();
    }
});*/

appOperations.controller("AddBusinessCaseInitiationCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
  
    $scope.CurrDate=new Date();

    var peoplePickerUsers = [];
    $scope.AllpeoplePickerUsers = [];
    $scope.InitatorIDS=[];

    $scope.currentDate = new Date();
    $scope.preQScoreDate = $scope.currentDate;  
    $scope.BioconfillingdateDatePopUp = {
        opened: false,
    };
    $scope.currentDate = new Date();
    $scope.preQScoreDate1 = $scope.currentDate;  
    $scope.YearofGenDatePopUp = {
        opened: false,
    };
    Utilities.initializePeoplePickerMul('MultiplepeoplePickerNotify');
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strTemplateNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseTemplateName')/items?$select=*&$top=5000&$orderby=ID ";
    var strTreatmentCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TreatmentCategoryMaster')/items?$select=*&$top=5000&$orderby=ID desc";
    var strMoleculeUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MoleculeMaster')/items?$select=*&$top=5000&$orderby=ID desc";
    var strInnovatorUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InnovatorMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strBrandUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BrandMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strStrengthUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrengthMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,Member/Id,Member/Title,Member/Name,Member/EMail,Country/Id,Country/Title,Market/Id,Market/Title&$expand=Market,Country,Member&$top=5000&$orderby=ID"; // cascading
    var urlColl = [strMarketUrl, strTemplateNameUrl, strTreatmentCategoryUrl, strMoleculeUrl, strInnovatorUrl, strCountryUrl, strBrandUrl, strStrengthUrl, strProductCategoryUrl, strProductMasterUrl,strRoleMasterUrl];
   
    // fillingDate
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


     // loe
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

    // var AllpeoplePickerUsers = [];
    // var peoplePickerUsers = [];
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

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        $scope.MarketColl = batchedData[0].d.results;
        $scope.TemplateNameColl = batchedData[1].d.results;
        $scope.TreatmentCategoryColl = batchedData[2].d.results;
        $scope.InnovatorColl = batchedData[4].d.results;
        $scope.CountryColl = batchedData[5].d.results;
        $scope.BrandColl = batchedData[6].d.results;
        $scope.StrengthColl = batchedData[7].d.results;
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


     
        
          
        
        $scope.isLoading = false;

        $scope.bindCommo = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory );
            });
        }
      
     
    });
    /// Angular js multiple checkbox:- Run lar
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
            return (item.CountryId == $scope.ddlCountry && item.MarketId==$scope.ddlmarket );
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
        }
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
        if ($scope.Strategy == '' || $scope.Strategy == undefined) {
            alert("Please Select Strategy")
            return false;
        }
        
        if ($scope.ddlCountry == '' || $scope.ddlCountry == undefined) {
            alert("Please Select Country ")
            return false;
        }
        if ($scope.ddlmarket == '' || $scope.ddlmarket == undefined) {
            alert("Please Select Market")
            return false;
        }

        // if ($scope.ddltemplatename == '' || $scope.ddltemplatename == undefined) {
        //     alert("Please Select Business Case Template Type")
        //     return false;
        // }

        if ($scope.ddlProductCategory == '' || $scope.ddlProductCategory == undefined || $scope.ddlProductCategory == 'Select') {
            alert("Please Select Product Category")
            return false;
        }
        if ($scope.ddlProductName == '' || $scope.ddlProductName == undefined) {
            alert("Please Select Product Name")
            return false;
        }
        var addBusinessCaseRequest = {
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
            BioconfilingDate: $scope.Bioconfillingdate,
            API: $scope.API,
            GenericFilers: $scope.GenericFilers,
            Yearofgeneralisation: $scope.Yearofgen,
            MfgSite: $scope.MfgSite,
            FilingType: $scope.FillingType,
            PartnerFilingStrategy: $scope.PartnerFillingStrategy,
            BusinessCaseStages: $scope.BusinessCaseStages,
            Strategy: $scope.Strategy,
            OBApprovals: $scope.ObApproval,
            NoofUSDMF: $scope.NoofUSDMF,
            Status: flag,
            Dosage: {
                'results': $scope.selecteddosage
          },
            ProductCategoryId: parseInt($scope.ddlProductCategory),
            DateofInitiation: new Date(),
            ProductNameId: parseInt($scope.ddlProductName),
            InitiatorId: { 'results': $scope.InitatorIDS }

            // CFTuserId: {
            //     'results': mNotifyStr
            // }
        };

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items", addBusinessCaseRequest).then(function (response) {
            console.log(response);
            $scope.businessCaseId = response.data.d.ID;
            var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + $scope.businessCaseId + ")";
            var updateBusinessCaseRequest = {
                __metadata: {
                    type: "SP.Data.BusinessCaseRequestsListItem"
                },
                BusinessCaseID: "BIOCON-BUS-CASE-" + $scope.businessCaseId
            };
            Logics.updateData(updateBusinessCaseRequestUrl, updateBusinessCaseRequest).then(function (busCaseResponse) {
                alert("Form Saved Successfully!!");
                $location.path("/InitiatorDashboard");
            });
        });
    }


    $scope.onInitiationSubmitDraft = function (flag) {
        
        // if (flag == "Submitted") {
        //     $scope.BusinessCaseStages = "Initiated";
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
        if ($scope.Strategy == '' || $scope.Strategy == undefined) {
            alert("Please Select Strategy")
            return false;
        }
        if ($scope.Businesscasename == '' || $scope.Businesscasename == undefined) {
            alert("Please Enter Business Case Name")
            return false;
        }
       

        // if ($scope.ddlCountry == '' || $scope.ddlCountry == undefined) {
        //     alert("Please Select Country ")
        //     return false;
        // }
        // if ($scope.ddlmarket == '' || $scope.ddlmarket == undefined) {
        //     alert("Please Select Market")
        //     return false;
        // }
        // if ($scope.ddltemplatename == '' || $scope.ddltemplatename == undefined) {
        //     alert("Please Select Business Case Template Type")
        //     return false;
        // }
        // if ($scope.ddlProductCategory == '' || $scope.ddlProductCategory == undefined || $scope.ddlProductCategory == 'Select') {
        //     alert("Please Select Product Category")
        //     return false;
        // }
        // if ($scope.ddlProductName == '' || $scope.ddlProductName == undefined) {
        //     alert("Please Select Product Name")
        //     return false;
        // }
         var addBusinessCaseRequest = {
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
            BioconfilingDate: $scope.Bioconfillingdate,
            API: $scope.API,
            GenericFilers: $scope.GenericFilers,
            Yearofgeneralisation: $scope.Yearofgen,
            MfgSite: $scope.MfgSite,
            FilingType: $scope.FillingType,
            PartnerFilingStrategy: $scope.PartnerFillingStrategy,
            BusinessCaseStages: $scope.BusinessCaseStages,
            Strategy: $scope.Strategy,
            OBApprovals: $scope.ObApproval,
            NoofUSDMF: $scope.NoofUSDMF,
            Status: flag,
            Dosage: {
                'results': $scope.selecteddosage
            },
            ProductCategoryId: parseInt($scope.ddlProductCategory),
            DateofInitiation: new Date(),
            ProductNameId: parseInt($scope.ddlProductName),
            InitiatorId: { 'results': $scope.InitatorIDS }

            // CFTuserId: {
            //     'results': mNotifyStr
            // }
        };

        Logics.addData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items", addBusinessCaseRequest).then(function (response) {
            console.log(response);
            $scope.businessCaseId = response.data.d.ID;
            var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + $scope.businessCaseId + ")";
            var updateBusinessCaseRequest = {
                __metadata: {
                    type: "SP.Data.BusinessCaseRequestsListItem"
                },
                BusinessCaseID: "BIOCON-BUS-CASE-" + $scope.businessCaseId
            };
            Logics.updateData(updateBusinessCaseRequestUrl, updateBusinessCaseRequest).then(function (busCaseResponse) {
                alert("Form Saved Successfully!!");
                $location.path("/InitiatorDashboard");
            });
        });
    }

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorDashboard");
      
    }
    
});