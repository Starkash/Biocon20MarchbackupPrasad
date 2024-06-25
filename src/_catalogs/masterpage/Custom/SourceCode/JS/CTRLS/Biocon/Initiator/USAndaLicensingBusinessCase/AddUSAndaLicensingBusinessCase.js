appOperations.controller("AddUSAndaBusinessCaseCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    $scope.CurrDate = new Date();

    $scope.selectedContTypeDes=[];
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
    


    $scope.openFillingDate = function() {
        $scope.FillingDateOptions.opened = true;
        
     
    };
    $scope.FillingDateOptions = {
        opened: false,
     
    };
    $scope.FillingDateOptions = {
        
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };




 $scope.openLoeDate = function() {
        $scope.LOEDateOptions.opened = true;
        
     
    };
    $scope.LOEDateOptions = {
        opened: false,
     
    };
    $scope.LOEDateOptions = {
        
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };



    
    $scope.openLaunchDate = function() {
        $scope.LaunchDateOptions.opened = true;
        
     
    };
    $scope.LaunchDateOptions = {
        opened: false,
     
    };
    $scope.LaunchDateOptions = {
        formatYear: "yy",
        startingDay: 1,
        showWeeks: false,
        minMode: 'month'
    };
     

    var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'ANDA - Inhouse US'&$top=5000&$orderby=ID";
    // var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$&$filter=SubStrategy eq 'Fixed TP/FP'top=5000&$orderby=ID";
    //var strStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrategyMaster')/items?$select=*&$filter=Title eq 'OutLicensing (ANDA)'&$top=5000&$orderby=ID";
    var strSubStrategyUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SubStrategyMaster')/items?$select=*,Strategy/Title,Strategy/Id&$expand=Strategy&$orderby=ID";

    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?$select=*&$top=5000&$orderby=ID";
    var strProductMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=*,ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID"; // cascading
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?$select=*&$top=5000&$filter=Title eq 'US'&$orderby=ID asc";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?$select=*,MarketName/Title,MarketName/Id&$expand=MarketName&$top=5000&$orderby=ID ";
    var strDosageUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('DosageFormMaster')/items?$select=*&$top=5000&$orderby=ID ";
    var strSubMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('SubMarketMaster')/items?$select=*,Market/Title,Market/Id&$expand=Market&$top=5000&$orderby=ID ";
    var strCAPEXBUCaseUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=*,Title,BusinessCaseDescription,ID&$top=1000&$orderby=Id desc";
    var strPartnerUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('PartnerMaster')/items?$select=*&$top=500&$orderby=Id desc";
    var strCAPEXBULaunchUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexPhaseDetails')/items?$select=*,Title,ID&$top=1000&$orderby=Id desc";
    var strRoleMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RoleMaster')/items?$select=*,UserGroup/Id,UserGroupId/EMail,Market/Id,Market/Title&$expand=UserGroup,Market&$filter=TemplateType eq 'ANDA - Inhouse US'&$top=5000&$orderby=ID"; // cascading
    var strStageMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('StageMaster')/items?$select=*&$filter=Title eq 'Initiated'&$top=100&$orderby=ID"; // cascading
    var strSkuMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('SkuMaster')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strSiteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Site')/items?$select=*&$top=100&$orderby=ID"; // cascading
    var strPackingMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PackingType')/items?$select=*&$top=1000&$orderby=ID"; // cascading
   

    var strInnovatorMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InnovatorMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    var strFillingTypeMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('FillingTypeMaster')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    var strCurrentStatusUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CurrentStatus')/items?$select=*&$top=1000&$orderby=ID"; // cascading

    
    var urlColl = [strStrategyUrl, strSubStrategyUrl, strProductCategoryUrl, strProductMasterUrl, strMarketUrl, strCountryUrl, strDosageUrl, strSubMarketUrl, strCAPEXBUCaseUrl, strPartnerUrl, strCAPEXBULaunchUrl, strRoleMasterUrl, strStageMasterUrl, strSkuMasterUrl,strSiteUrl,strPackingMasterUrl,strInnovatorMasterUrl,strFillingTypeMasterUrl,strCurrentStatusUrl];

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
        $scope.USANDABUCaseColl = batchedData[8].d.results;
        $scope.PartnerColl = batchedData[9].d.results;
        $scope.CAPEXLaunchColl = batchedData[10].d.results;
        $scope.RoleMasterColl = batchedData[11].d.results;
        $scope.StageMasterColl = batchedData[12].d.results;
        $scope.SkuMasterColl = batchedData[13].d.results;
        
        $scope.PackingTypeColl = batchedData[15].d.results;

        $scope.InnovatorColl = batchedData[16].d.results;
        $scope.FillingTypeColl = batchedData[17].d.results;

        $scope.StatusColl = batchedData[18].d.results;



       

        $scope.dosagessColl = [];


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

       

        
        for (var n = 0; n < $scope.DosageColl.length; n++) {
            $scope.finalppcommoditycoll = [{
                "label": $scope.DosageColl[n].Title,
                "id": $scope.DosageColl[n].Id

            }];
            console.log($scope.finalppcommoditycoll);
            $scope.dosagessColl.push($scope.finalppcommoditycoll[0]);

        }


        // arvind

         
        var counter;
        var vRetVal;
        if ($scope.USANDABUCaseColl.length > 0) {
            var Logg = $scope.USANDABUCaseColl[0].Title;
            if (Logg == null) {
                counter = 0;
            } else {
                // BIOCON-OUT-LIC-1
                var Result = Logg.split("_");
                $scope.counter = Result[0];
                $scope.counter = parseInt($scope.counter) + 1;
                

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
        //$scope.dosagessColl = [];
        var unique = [];

        $scope.bindproduct = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
         // changed  28-nov// $scope.ProdCode = $scope.getProductame[0].ProductCode;
          
            //$scope.ProductNameColl.push($scope.getProductame);

          

        };
        
        
        
        
        // arvind--DuplicateID Soln and product code 28 nov
        
        
        
            
        $scope.GetProductcode=function(){
        
         if( $scope.getProductame.length>0 && $scope.ddlProductName!=undefined ){
             
             for(var d=0;d<$scope.getProductame.length;d++){
             
             if($scope.getProductame[d].Id==$scope.ddlProductName){

                $scope.ProdCode = $scope.getProductame[d].ProductCode;
             
             }
             
             
             }
             
             
             }
        
        
        }

        
        // 
        
     
      
          $scope.removeAuditItem = function(Capex, $event) {
              $event.currentTarget.style.display = "none";
        
      
          
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
      
          $scope.filteredCountryColl = $scope.CountryColl.filter(function (item) {
            return (item.MarketNameId == $scope.ddlMarket);
        });

        // at load we bint 0 position of market and country so i take first positon at page load 
        $scope.ddlMarket=0;
        $scope.ddlcountry=0;
       
          newAuditItem={
            // ddlMarket:0,
            // MarketColl:$scope.MarketColl,
            
            // CountryColl:$scope.filteredCountryColl,  if country and market required both in one row the we uncomment it
            // ddlcountry:0,
            SKU:0,
            ddlSKUUnit:0,

            SkuMasterColl:$scope.SkuMasterColl,
            PackSize:0,
            ddlPackingType:0,
            PackingTypeColl:$scope.PackingTypeColl,
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
             
                $scope.CapexPhaseColl.push(auditItemCopy);
                //$scope.CapexPhaseColl[i].SrNo = currentRoWIndex + i + 1;
                $scope.CapexPhaseColl[i].HideAddButton = false;
               
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


        function setAuditItem() {
            //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;
        
         

         
        }

        $scope.addAuditItem = function(auditObj) {
            if (auditObj != null && auditObj != undefined) {
                auditObj.HideAddButton = true;
            }

            if(auditObj.SKU!=0 && auditObj.PackSize!=0 && auditObj.ddlPackingType!=0 && auditObj.ddlSKUUnit!=0 ){

                var a =$scope.CapexPhaseColl.length-1;

                if($scope.CapexPhaseColl[a].SKU!=0 &&  $scope.CapexPhaseColl[a].PackSize!=0 &&  $scope.CapexPhaseColl[a].ddlPackingType!=0 &&  $scope.CapexPhaseColl[a].ddlSKUUnit!=0)
                {

                    var auditItemCopy = angular.copy(newAuditItem);
                    setAuditItem(auditItemCopy);
                    auditItemCopy.SrNo = auditObj.SrNo + 1;
                    auditItemCopy.HideAddButton = false;
                    auditItemCopy.HideRemoveButton = false;
                    $scope.CapexPhaseColl.push(auditItemCopy);
                    console.log($scope.CapexPhaseColl);

                }
               else{

                alert('Please First Fill All Fields In SKU ')
               }

                

            }
            else{
                alert('Please First Fill All Fields In SKU ')
            }
            // alert('Please fill all SKU ')
           
          
    
            $timeout(function() {
                $('[data-toggle="tooltip"]').tooltip();
            }, 100);
        };
    
    


    });



    

$scope.InvalidBusinesscasename= function(x) {
    var reg = /^[^ | % # * ? < >/ | \\ \\\\: ; "" '']+$/;

    $scope.BusinesscaseNameLength=false;

          if (!x.match(reg)) {
          $scope.BusinessCaseName = x.substring(0, x.length-1);

          $scope.isValid=true;


          }
          else
          {
           $scope.isValid=false;
          }
          if( $scope.BusinessCaseName.length>19){
            $scope.BusinesscaseNameLength=true;
           

          }
  };








  
  
    //ON SUBMIT BUTTON:SAVE DATA IN 3 LIST
    $scope.onSubmit = function () {


       

 if ($scope.BusinessCaseName.length > 20) {

    alert('Business Case Name cannot be more than 20 characters.')
    return false;
}

if($scope.BusinessCaseName.length>0){

        //var regex = /^[A-Za-z0-9 ]+$/;
        // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
        var regex = /^[^ | % # ? < >/ | \ : ; "" '']+$/; //--update 

    //  var regex = /^[^ | ~ ` ! @ $ ^ & ( ) _ - + = } { ] [ . ,]+$/; //--new change 14-12-2023 10:14 am update 


        //var regex = /^[~`!@$^&()_-+=}{][.,]+$/; // new update




        
        //var regex = /\.([^.]*?)(?=\?|#|$)/;


    var isValid = regex.test($scope.BusinessCaseName);

    if (!isValid) {
        alert("Business Case Name should not contain special characters such as ["+regex+"]");
        console.log(isValid);

        return !isValid;
        console.log(isValid);
    }
    
}

        
    
     $scope.GetProductcode();
     
        var month = $('#lblDate').text();
        var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
            return (item.Id == $scope.ddlSubStrategy);
        });
        var shortname = objSNSubStargy[0].ShortName;
      //  shortname = "ANDA" + shortname;
        //$scope.counter = parseInt($scope.counter) + 1;
        $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
       // $scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

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
                    if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null &&  $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
                        alert('First Fill All Fields In Country')
                        return false;

                    } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null  || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
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


        if($scope.ddlSubStrategy=="" || $scope.ddlSubStrategy=='undefined' || $scope.ddlSubStrategy==null ) {
            alert("Please Select Sub Strategy");
            return false;

        }
        
        if($scope.BusinessCaseName=="" || $scope.BusinessCaseName=='undefined' || $scope.BusinessCaseName==null ) {
            alert("Please Enter Business Case Name");
            return false;
            
        }
        
        if($scope.ddlProductCategory=="" || $scope.ddlProductCategory=='undefined' || $scope.ddlProductCategory==null ) {

            alert("Please Select Product Category");
            return false;
        }
        
        if($scope.ddlProductName=="" || $scope.ddlProductName=='undefined' || $scope.ddlProductName==null ) {

            alert("Please Select Product Name");
            return false;
        }  
        if( $scope.selectedContTypeDes.length==0) {

            alert("Please Select Dosages");
            return false;
        }
        if($scope.ddlMarket=="" || $scope.ddlMarket=='undefined' || $scope.ddlMarket==null ) {

            alert("Please Select Market Name");
            return false;
        }  
        if($scope.ddlcountry=="" || $scope.ddlcountry=='undefined' || $scope.ddlcountry==null ) {

            alert("Please Select Country Name");
            return false;
        }  

        for(var a =0;a<$scope.CapexPhaseColl.length;a++){

            if($scope.CapexPhaseColl[a].SKU==0 &&  $scope.CapexPhaseColl[a].PackSize==0 &&  $scope.CapexPhaseColl[a].ddlPackingType==0 &&  $scope.CapexPhaseColl[a].ddlSKUUnit==0)
            {
                alert("Please fill all SKU");
                return false;
            }

        }
        //var a =$scope.CapexPhaseColl.length-1;
       


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
       
        

        var objppe = [];
        if ($scope.selectedContTypeDes.length > 0) {
            for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
                console.log(objppe);
                var a = $scope.selectedContTypeDes[i].id;
                objppe.push(a)
            }
        }
        $scope.DossageId = {
            "results": objppe
        };


        
       // $scope.IsDisabled = true;
        //Insert Data into Parent List (OutLicensingBusinessCase)
        var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCase')/items";
        var AndaBusinessCaseData = {
            __metadata: {
                'type': 'SP.Data.USAndaBusinessCaseListItem'
            },
            Title: $scope.BUTitle,
            StrategyId: $scope.ddlStrategy,
            SubStrategyId: $scope.ddlSubStrategy,
            BusinessCaseName: $scope.BusinessCaseName,
            ProductCategoryId: $scope.ddlProductCategory,
            ProductNameId: $scope.ddlProductName,
            
            DosageFormId: $scope.DossageId,
            InitiationDate: $('#lblDate').text(),
            CaseStageId: $scope.StageMasterColl[0].Id,
            CaseStatus: "Initiated",
            Counter:$scope.counter,
                 
            MarketId:$scope.ddlMarket,
            CountryId:$scope.ddlcountry,
            LaunchDateUS:new Date($scope.LaunchDate),
            LOEDate: new Date($scope.LOEDate),

            NoofGenericFilers: parseInt($scope.NoofGenericFilers),
            FilingTypeId: $scope.ddlFillingType,
            CurrentStatusId: $scope.ddlFillingStatus,
            InnovatorId: $scope.ddlInnovator,
            FillingDate: $scope.FillingDate,
            BusinessCaseDescription:$scope.BusinessCaseDescription,
          
          //  DosageFormId:$scope.ProdId,

            InitiatorsId: {
                'results': pplInitiator
            },
            ReviewersId: {
                'results': pplReviewer
            },
            ValidatorsId: {
                'results': pplValidator
            },
            VersionNo:"1.0",
            LapVersion:"V0"

        };
        Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
            $scope.CapexBusinessCaseIntID = AndaBusCaseData.data.d.Id;
            console.log($scope.CapexBusinessCaseIntID);
            $scope.CapexPhaseDetails();
            alert("Business Case Saved Successfully!!");
            $location.path("/InitiatorUSANDADash");

        });

    }





        //ON SUBMIT BUTTON:SAVE DATA IN 3 LIST
        $scope.onSaveAsDraft = function () {

          

 if ($scope.BusinessCaseName.length > 20) {

    alert('Business Case Name cannot be more than 20 characters.')
    return false;
}

if($scope.BusinessCaseName.length>0){

        //var regex = /^[A-Za-z0-9 ]+$/;
        // var regex = [!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
        var regex = /^[^ | % # ? < >/ | \ : ; "" '']+$/; //--update 

    //  var regex = /^[^ | ~ ` ! @ $ ^ & ( ) _ - + = } { ] [ . ,]+$/; //--new change 14-12-2023 10:14 am update 


        //var regex = /^[~`!@$^&()_-+=}{][.,]+$/; // new update




        
        //var regex = /\.([^.]*?)(?=\?|#|$)/;


    var isValid = regex.test($scope.BusinessCaseName);

    if (!isValid) {
        alert("Business Case Name should not contain special characters such as ["+regex+"]");
        console.log(isValid);

        return !isValid;
        console.log(isValid);
    }
    
}
        
             $scope.GetProductcode();

            var month = $('#lblDate').text();
            var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
                return (item.Id == $scope.ddlSubStrategy);
            });
            var shortname = objSNSubStargy[0].ShortName;
          //  shortname = "ANDA" + shortname;
            //$scope.counter = parseInt($scope.counter) + 1;
            $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
           // $scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 
    
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
                        if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
                            alert('First Fill All Fields In Country')
                            return false;
    
                        } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" ) {
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


            if($scope.ddlSubStrategy=="" || $scope.ddlSubStrategy=='undefined' || $scope.ddlSubStrategy==null ) {
                alert("Please Select Sub Strategy");
                return false;
    
            }
            
            if($scope.BusinessCaseName=="" || $scope.BusinessCaseName=='undefined' || $scope.BusinessCaseName==null ) {
                alert("Please Enter Business Case Name");
                return false;
                
            }
            
            if($scope.ddlProductCategory=="" || $scope.ddlProductCategory=='undefined' || $scope.ddlProductCategory==null ) {
    
                alert("Please Select Product Category");
                return false;
            }
            
            if($scope.ddlProductName=="" || $scope.ddlProductName=='undefined' || $scope.ddlProductName==null ) {
    
                alert("Please Select Product Name");
                return false;
            }  
            if( $scope.selectedContTypeDes.length==0) {
    
                alert("Please Select Dosages");
                return false;
            }
            if($scope.ddlMarket=="" || $scope.ddlMarket=='undefined' || $scope.ddlMarket==null ) {
    
                alert("Please Select Market Name");
                return false;
            }  
            if($scope.ddlcountry=="" || $scope.ddlcountry=='undefined' || $scope.ddlcountry==null ) {
    
                alert("Please Select Country Name");
                return false;
            }  

            for(var a =0;a<$scope.CapexPhaseColl.length;a++){

                if($scope.CapexPhaseColl[a].SKU==0 ||  $scope.CapexPhaseColl[a].PackSize==0 ||  $scope.CapexPhaseColl[a].ddlPackingType==0 ||  $scope.CapexPhaseColl[a].ddlSKUUnit==0)
                {
                    alert("Please fill all SKU");
                    return false;
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
           
            
    
            var objppe = [];
            if ($scope.selectedContTypeDes.length > 0) {
                for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
                    console.log(objppe);
                    var a = $scope.selectedContTypeDes[i].id;
                    objppe.push(a)
                }
            }
            $scope.DossageId = {
                "results": objppe
            };
    
    
            
           // $scope.IsDisabled = true;
            //Insert Data into Parent List (OutLicensingBusinessCase)
            var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('USAndaBusinessCase')/items";
            var AndaBusinessCaseData = {
                __metadata: {
                    'type': 'SP.Data.USAndaBusinessCaseListItem'
                },
                Title: $scope.BUTitle,
                StrategyId: $scope.ddlStrategy,
                SubStrategyId: $scope.ddlSubStrategy,
                BusinessCaseName: $scope.BusinessCaseName,
                ProductCategoryId: $scope.ddlProductCategory,
                ProductNameId: $scope.ddlProductName,
                
                DosageFormId: $scope.DossageId,
                InitiationDate: $('#lblDate').text(),
                CaseStageId: $scope.StageMasterColl[0].Id,
                CaseStatus: "Draft",
                Counter:$scope.counter,
                     
                MarketId:$scope.ddlMarket,
                CountryId:$scope.ddlcountry,
                LaunchDateUS:new Date($scope.LaunchDate),
                LOEDate:new Date($scope.LOEDate),

                NoofGenericFilers: parseInt($scope.NoofGenericFilers),
                FilingTypeId: $scope.ddlFillingType,
                CurrentStatusId: $scope.ddlFillingStatus,
                InnovatorId: $scope.ddlInnovator,
                FillingDate: new Date($scope.FillingDate),
                BusinessCaseDescription:$scope.BusinessCaseDescription,
              
              //  DosageFormId:$scope.ProdId,
    
                InitiatorsId: {
                    'results': pplInitiator
                },
                ReviewersId: {
                    'results': pplReviewer
                },
                ValidatorsId: {
                    'results': pplValidator
                },
                // VersionNo:"1.0",
                // LapVersion:"V0"
    
            };
            Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
                $scope.CapexBusinessCaseIntID = AndaBusCaseData.data.d.Id;
                console.log($scope.CapexBusinessCaseIntID);
                $scope.CapexPhaseDetails();
                alert("Business Case Saved Successfully!!");
                $location.path("/InitiatorUSANDADash");
    
            });
    
        }
    
    
    // $scope.onSaveAsDraft = function () {
    //     var month = $('#lblDate').text();
    //     var objSNSubStargy = $scope.SubStrategyColl.filter(function (item) {
    //         return (item.Id == $scope.ddlSubStrategy);
    //     });
    //     var shortname = objSNSubStargy[0].ShortName;
    //   //  shortname = "ANDA" + shortname;
    //     //$scope.counter = parseInt($scope.counter) + 1;
    //    // $scope.BUTitle = $scope.counter + "_" + shortname + "_" + $scope.ProdCode + "_" + month;
    //     $scope.BUTitle = $scope.counter + "_" + shortname + "_"  + "_" + month; // now multiple product selection 

    //     // "0001-ILCFTP_ATVR_Jul-2023"

    //     console.log($scope.newMarketRow1Coll)
    //     var marklenght = $scope.newMarketRow1Coll.length;
    //     if (marklenght > 0) {
    //         marklenght = marklenght - 1;
    //         var countrylenght = $scope.newMarketRow1Coll[marklenght].CountryRow.length;
    //         // if(countrylenght>0){
    //         //     countrylenght=countrylenght-1;
    //         //     var skulength= $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].length;

    //         if (countrylenght == 0) {
    //             alert('Please First Add Country Row');
    //             return false;
    //         }


    //         // }
    //         if (countrylenght > 0) {

    //             countrylenght = countrylenght - 1;



    //             for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow.length; i++) {
    //                 if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
    //                     alert('First Fill All Fields In Country')
    //                     return false;

    //                 } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[i].Status == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Country == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].CompletionYear == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].LaunchDate == null || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Partner == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[i].Currency == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[i].PartnerDesc == "") {
    //                     alert('First Fill All Fields In Country')
    //                     return false;

    //                 }
    //             }
    //             var skulength = $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length;

    //             if (skulength == 0) {
    //                 alert('Please First Add SKU Row');
    //                 return false;
    //             }

    //             for (var i = 0; i < $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow.length; i++) {
    //                 if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null && $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
    //                     alert('First Fill All Fields In SKU')
    //                     return false;

    //                 } else if ($scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUQunatity == "" || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].SKUUnit == 0 || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackSize == null || $scope.newMarketRow1Coll[marklenght].CountryRow[countrylenght].SKURow[i].PackingType == "") {
    //                     alert('First Fill All Fields In SKU')
    //                     return false;

    //                 }
    //             }


    //         }

    //     }

    //     $scope.FinalCountryLaunchColl = [];
    //     $scope.FinalSKUColl = [];
    //     for (var i = 0; i < $scope.newMarketRow1Coll.length; i++) {
    //         for (var j = 0; j < $scope.newMarketRow1Coll[i].CountryRow.length; j++) {
    //             $scope.FinalCountryLaunchColl.push($scope.newMarketRow1Coll[i].CountryRow[j]);
    //         }
    //     }
    //     for (var i = 0; i < $scope.FinalCountryLaunchColl.length; i++) {
    //         for (var j = 0; j < $scope.FinalCountryLaunchColl[i].SKURow.length; j++) {
    //             $scope.FinalSKUColl.push($scope.FinalCountryLaunchColl[i].SKURow[j])

    //         }
    //     }

    //     var pplInitiator = [];
    //     var pplReviewer = [];
    //     var pplValidator = [];
    //    // for (var z = 0; z < $scope.FinalCountryLaunchColl.length; z++) {
    //         $scope.fiterdInitiatorMember = $scope.RoleMasterColl.filter(function (item) {
    //             return (item.Role == 'Initiator');
    //         });
    //         $scope.fiterdReviewerMember = $scope.RoleMasterColl.filter(function (item) {
    //             return (item.Role == 'Reviewer');
    //         });
    //         $scope.fiterdValidatorMember = $scope.RoleMasterColl.filter(function (item) {
    //             return (item.Role == 'Validator');
    //         });
    //         if ($scope.fiterdInitiatorMember.length > 0) {
    //             pplInitiator.push($scope.fiterdInitiatorMember[0].UserGroupId)
    //             }
    //         if ($scope.fiterdReviewerMember.length > 0) {
    //             pplReviewer.push($scope.fiterdReviewerMember[0].UserGroupId)
    //         }
    //         if ($scope.fiterdValidatorMember.length > 0) {
    //             pplValidator.push($scope.fiterdValidatorMember[0].UserGroupId)
    //         }
    //         // if(pplInitiator.length==0)
    //         // {
    //         //     alert("No Initiator Group Found")
    //         //     return false;
    //         // }
    //         // if(pplReviewer.length==0)
    //         // {
    //         //     alert("No Reviewer Group Found")
    //         //     return false;
    //         // }
    //         // if(pplValidator.length==0)
    //         // {
    //         //     alert("No Validator Group Found")
    //         //     return false;
    //         // }
    //   //  }
       
        

    //     // var objppe = [];
    //     // if ($scope.selectedContTypeDes.length > 0) {
    //     //     for (var i = 0; i < $scope.selectedContTypeDes.length; i++) {
    //     //         console.log(objppe);
    //     //         var a = $scope.selectedContTypeDes[i].id;
    //     //         objppe.push(a)
    //     //     }
    //     // }
    //     // $scope.DossageId = {
    //     //     "results": objppe
    //     // };

    //     // PRODUCT

    //     var objppe = [];
    //     var uniqueCount;
    //     for(var z=0;z<$scope.CapexPhaseColl.length;z++){

    //     if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
    //         for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
    //             console.log(objppe);
    //             var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
    //             objppe.push(a)
    //         }
    //     }
    //     $scope.ProdId = {
    //         "results": objppe
    //     };

    //  uniqueCount = new Set(objppe).size;
    //  console.log(uniqueCount);
    //  $scope.Productcount=uniqueCount;    
    // }

        
    //    // $scope.IsDisabled = true;
    //     //Insert Data into Parent List (OutLicensingBusinessCase)
    //     var strAndaBusinessCaseURL = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CapexBusinessCase')/items";
    //     var AndaBusinessCaseData = {
    //         __metadata: {
    //             'type': 'SP.Data.CapexBusinessCaseListItem'
    //         },
    //         Title: $scope.BUTitle,
    //         StrategyId: $scope.ddlStrategy,
    //         SubStrategyId: $scope.ddlSubStrategy,
    //         BusinessCaseName: $scope.BusinessCaseName,
    //         ProductCategoryId: $scope.ddlProductCategory,
    //         NumberOfProducts: $scope.Productcount,         //   DosageFormId: $scope.DossageId,
    //         InitiationDate: $('#lblDate').text(),
    //         CaseStageId: $scope.StageMasterColl[0].Id,
    //         CaseStatus: "Draft",
    //         Escalation:parseInt($scope.Escalation),
    //         EscalationRemarks:$scope.EscalationRemarks,        
    //         SiteId:$scope.ddlSite,
    //         BCCompletionYear:$scope.auditDate,
    //         CapexCurrency:$scope.CapexCurrency,
    //         ProductNameId:$scope.ProdId,

    //       //  CapexCurrency:$scope.ddlCapexCurrency,
    //         CapexValue: parseFloat($scope.CapexPhaseTotal2),
    //         InitiatorsId: {
    //             'results': pplInitiator
    //         },
    //         ReviewersId: {
    //             'results': pplReviewer
    //         },
    //         ValidatorsId: {
    //             'results': pplValidator
    //         },
    //         VersionNo:"1.0"

    //     };
    //     Logics.addData(strAndaBusinessCaseURL , AndaBusinessCaseData ).then(function (AndaBusCaseData) {
    //         $scope.CapexBusinessCaseIntID = AndaBusCaseData.data.d.Id;
    //         console.log($scope.CapexBusinessCaseIntID);
    //         $scope.CapexPhaseDetails();
    //         alert("Business Case Saved Successfully!!");
    //         $location.path("/InitiatorUSANDADash");

    //     });

    // }





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
            var launchTitle = $scope.BUTitle + "-SKU-" + noOfLaunchIndex;
        //    $scope.TriggerYear= new Date(($scope.CapexPhaseColl[z].CompletionYear).format("dd-MM-yyyy"));//$scope.CapexPhaseColl[z].CompletionYear.format("dd-MM-yyyy")
        //   $scope.CompletionYear=new Date(($scope.CapexPhaseColl[z].TriggerYear).format("dd-MM-yyyy"));
//$scope.CapexPhaseColl[0].selectedContTypeDes.length
        //    var objppe = [];
        //    var uniqueCount;
        //    if ($scope.CapexPhaseColl[z].selectedContTypeDes.length > 0) {
        //        for (var i = 0; i < $scope.CapexPhaseColl[z].selectedContTypeDes.length; i++) {
        //            console.log(objppe);
        //            var a = $scope.CapexPhaseColl[z].selectedContTypeDes[i].id;
        //            objppe.push(a)
        //        }
        //    }
        //    $scope.ProdId = {
        //        "results": objppe
        //    };

        // uniqueCount = new Set(objppe).size;
        // console.log(uniqueCount);
        // $scope.Productcount=uniqueCount;    


           //return false;

            insertCountryBatch.push({
                reqUrl: _spPageContextInfo.webAbsoluteUrl + "/_api/Lists/getbytitle('USAndaSKUDetails')/items",
                action: "ADD",
                async: false,
                data: {
                    __metadata: {
                        type: "SP.Data.USAndaSKUDetailsListItem"
                    },
                    Title: launchTitle,
                    
                    Pack: $scope.CapexPhaseColl[z].PackSize,
                    Quantity: $scope.CapexPhaseColl[z].SKU,
                    SkuUnitId: $scope.CapexPhaseColl[z].ddlSKUUnit,
                    PackingTypeId: $scope.CapexPhaseColl[z].ddlPackingType,//$scope.ddlPackingType,   
                   
                  

                   USAndaBusinessCaseId: $scope.CapexBusinessCaseIntID //newScheduleColl
                }
            });
        }
        Logics.postBatchedData(_spPageContextInfo.webAbsoluteUrl, insertCountryBatch).then(function (insertedLaunchData) {
            console.log(insertedLaunchData);

            // for (var p = 0; p <insertedLaunchData.length; p++) {
            //     var coll = {};
            //     coll.LunchID = insertedLaunchData[p].d.Id
            //     coll.Country = insertedLaunchData[p].d.CountryId
            //     coll.LaunchTitle = insertedLaunchData[p].d.Title
            //     $scope.AddedLaunchids.push(coll);
            // }
            // if (noOfLaunchIndex == $scope.FinalCountryLaunchColl.length) {
            //     $scope.SkuDetails($scope.AddedLaunchids);
            // }
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
                    Quantity: $scope.FinalSKUColl[z].SKU,
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
                $location.path("/InitiatorUSANDADash");
                // var alertMessage = "Request has been submitted";
                // Utilities.initiateDailogBox($scope, insertedLaunchData, alertMessage, "/InitiatorUSANDADash");
                // Utilities.closeDialogBox();

                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorUSANDADash");

    }
});