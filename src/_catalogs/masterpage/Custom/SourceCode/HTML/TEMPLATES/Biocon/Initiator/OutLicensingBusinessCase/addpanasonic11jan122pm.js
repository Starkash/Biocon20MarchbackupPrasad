appOperations.controller("AddOfferRequisitionCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {


   $scope.CurrLogUserId = _spPageContextInfo.userDisplayName;

   $scope.CurrDate = new Date();

   var strQuestionListUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('QuestionList')/items?$select=*&$top=5000&$orderby=ID asc"; // cascading
   var strGiftsDetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('GiftsDetails')/items?$select=*&$top=5000&$orderby=ID desc"; // cascading

   var strPreviouslyoffereddetailsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Previouslyoffereddetails')/items?$select=*&$top=5000&$orderby=ID desc"; // cascading

   var strTypeofbeneficiaryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Typeofbeneficiary')/items?$select=*&$top=5000&$orderby=ID desc"; // cascading
   var strTypeofofferingUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Typeofoffering')/items?$select=*&$top=5000&$orderby=ID asc"; // cascading
   var strEmployeeMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('EmployeeMaster')/items?$select=*&$top=5000&$filter eq EmployeeEmail='" + _spPageContextInfo.userEmail + "'&$orderby=ID asc"; // cascading
   var strBeneficiaryMasterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BeneficiaryMaster')/items?$select=*&$top=5000&$orderby=ID asc"; // cascading
   var strGiftsCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('GiftsCategory')/items?$select=*&$top=5000&$orderby=ID asc"; // cascading
   var strPanasonicProductsUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PanasonicProducts')/items?$select=*&$top=5000&$orderby=ID asc"; // cascading

   
   var urlColl = [strQuestionListUrl, strGiftsDetailsUrl, strPreviouslyoffereddetailsUrl, strTypeofbeneficiaryUrl, strTypeofofferingUrl, strEmployeeMasterUrl,strBeneficiaryMasterUrl,strGiftsCategoryUrl,strPanasonicProductsUrl];
   var newGiftItem;
   $scope.GiftsDetailsprevColl = [];

   var newEmpDetailsItem;
   $scope.EmpDetailsColl=[];

   var newGiftsDetailsItem;
   $scope.GiftsDetailsColl=[];

  var newBenificiaryDetailsItem;
   $scope.BenificiaryColl=[];
  
   
   /// fiscal year---



   $scope.openDatepicker = function (item) {
      item.datepickerIsOpen = true;
  };


  function getFiscalYearDates() {
   var currentDate = new Date();

   if(currentDate.getMonth()<3)
  {
   var endmonth=currentDate.getMonth();
   var endDate=currentDate.getDate();
   var fiscalYearStart = new Date(currentDate.getFullYear()-1, 3, 1); // Assuming fiscal year starts in April (month index 3)
   var fiscalYearEnd = new Date(currentDate.getFullYear(), endmonth, endDate); // Assuming fiscal year ends in March (month index 2)
}
  else{
  var fiscalYearStart = new Date(currentDate.getFullYear(), 3, 1); // Assuming fiscal year starts in April (month index 3)
//  var fiscalYearEnd = new Date(currentDate.getFullYear()+1 , 2, 31); // Assuming fiscal year ends in March (month index 2)

  var fiscalYearEnd = new Date(currentDate.getFullYear()+1 , endmonth, endDate); // Assuming fiscal year ends in March (month index 2)
 }

   return {
       start: fiscalYearStart,
       end: fiscalYearEnd
   };
}

   /// fiscal year---
 

  // Datepicker configuration
  $scope.dateOptions = {
   
      formatYear: 'yyyy',
      startingDay: 1,
      minDate: getFiscalYearDates().start,
      maxDate: getFiscalYearDates().end,
  };


  $scope.dateFormat = 'dd-MM-yyyy';  // Adjust the date format as needed


 /// fiscal year---


   Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {



      $scope.QuestionListColl = batchedData[0].d.results;
      $scope.GiftsDetailsColl = batchedData[1].d.results;

      $scope.PreviouslyoffereddetailsColl = batchedData[2].d.results;
      $scope.TypeofbeneficiaryColl = batchedData[3].d.results;
      $scope.TypeofofferingColl = batchedData[4].d.results;
      $scope.EmployeeMasterColl = batchedData[5].d.results;
      $scope.BeneficiaryMasterColl = batchedData[6].d.results;
      $scope.GiftsCategoryColl = batchedData[7].d.results;
      $scope.PanasonicProductsColl = batchedData[8].d.results;




      if ($scope.EmployeeMasterColl.length > 0) {

         $scope.EmployeeCode = $scope.EmployeeMasterColl[0].EmployeeEmpcode;
         $scope.Name = $scope.EmployeeMasterColl[0].Employeename;
         $scope.EmailID = $scope.EmployeeMasterColl[0].EmployeeEmail;
         $scope.ContactNo = $scope.EmployeeMasterColl[0].Contact;


        

      }


      /*
       if ($scope.QuestionListColl.length > 0) {

          $scope.GiftQuestionListColl = $scope.QuestionListColl.filter(function (item) {
            return (item.TypeofBenefitsforOffering == 'Gift');
         });
      //   var QuestionObj={};
      //   $scope.QuestionArray=[];
      //    for (var a = 0; a < $scope.GiftQuestionListColl.length; a++) {
      //       var QuestionObj={};
      //       QuestionObj.Question=$scope.GiftQuestionListColl[a].Question;
      //       QuestionObj.SrNo=$scope.GiftQuestionListColl[a].SrNo;
      //       QuestionObj.TypeOfControl=$scope.GiftQuestionListColl[a].TypeOfControl;
      //       // if($scope.GiftQuestionListColl[a].control=="Radio")
      //       // {

      //       // }

      //       $scope.QuestionArray.push(QuestionObj);
       if ($scope.GiftQuestionListColl[a].SrNo == 3) {
          $scope.question3 = $scope.GiftQuestionListColl[a].Question;
          $scope.SrNo3 = $scope.GiftQuestionListColl[a].SrNo;
       }
       if ($scope.GiftQuestionListColl[a].SrNo == 3.1) {
         $scope.question3_1 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo3_1 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 3.2) {
         $scope.question3_2 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo3_2 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 4) {
         $scope.question4 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo4 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 4.1) {
         $scope.question4_1 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo4_1 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 4.2) {
         $scope.question4_2 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo4_2 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 4.3) {
         $scope.question4_3 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo4_3 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 4.4) {
         $scope.question4_4 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo4_4 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 5) {
         $scope.question5 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo5 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 5.1) {
         $scope.question5_1 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo5_1 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 5.2) {
         $scope.question5_2 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo5_2 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 6) {
         $scope.question6 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo6 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 7) {
         $scope.question7 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo7 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 8) {
         $scope.question8 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo8 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 9) {
         $scope.question9 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo9 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 10) {
         $scope.question10 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo10 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 11) {
         $scope.question11 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo11 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 12) {
         $scope.question12 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo12 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 13) {
         $scope.question13 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo13 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 14) {
         $scope.question14 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo14 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 15) {
         $scope.question15 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo15 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 16) {
         $scope.question16 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo16 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 17) {
         $scope.question17 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo17 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 18) {
         $scope.question18 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo18 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 19) {
         $scope.question19 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo19 = $scope.GiftQuestionListColl[a].SrNo;
       }


       if ($scope.GiftQuestionListColl[a].SrNo == 20) {
         $scope.question20 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo20 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 21) {
         $scope.question21 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo21 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 22) {
         $scope.question22 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo22 = $scope.GiftQuestionListColl[a].SrNo;
       }

       if ($scope.GiftQuestionListColl[a].SrNo == 23) {
         $scope.question23 = $scope.GiftQuestionListColl[a].Question;
         $scope.SrNo23 = $scope.GiftQuestionListColl[a].SrNo;
       }


       }

      // }
      */
      $scope.ChangeTypeofBenefitforOffering = function (type) {
         console.log(type);

         if (type == 1) {
            $scope.Gifttype = true;
            $scope.Entertainmenttype = false;
            $scope.Traveltype = false;
            $scope.Mealtype = false;

            if ($scope.QuestionListColl.length > 0) {

               $scope.GiftQuestionListColl = $scope.QuestionListColl.filter(function (item) {
                  return (item.TypeofBenefitsforOffering == 'Gift');
               });
               var QuestionObj = {};
               $scope.QuestionArray = [];
               for (var a = 0; a < $scope.GiftQuestionListColl.length; a++) {
                  var QuestionObj = {};
                  QuestionObj.Question = $scope.GiftQuestionListColl[a].Question;
                  QuestionObj.SrNo = $scope.GiftQuestionListColl[a].SrNo;
                  QuestionObj.TypeOfControl = $scope.GiftQuestionListColl[a].TypeOfControl;
                  QuestionObj.Modal = "Question" + $scope.GiftQuestionListColl[a].SrNo;
                  $scope.QuestionArray.push(QuestionObj);

               }

            }

         }

         if (type == 2) {
            $scope.Gifttype = false;
            $scope.Entertainmenttype = true;
            $scope.Traveltype = false;
            $scope.Mealtype = false;
            if ($scope.QuestionListColl.length > 0) {

               $scope.GiftQuestionListColl = $scope.QuestionListColl.filter(function (item) {
                  return (item.TypeofBenefitsforOffering == 'Entertainment');
               });
               var QuestionObj = {};
               $scope.QuestionArray = [];
               for (var a = 0; a < $scope.GiftQuestionListColl.length; a++) {
                  var QuestionObj = {};
                  QuestionObj.Question = $scope.GiftQuestionListColl[a].Question;
                  QuestionObj.SrNo = $scope.GiftQuestionListColl[a].SrNo;
                  QuestionObj.TypeOfControl = $scope.GiftQuestionListColl[a].TypeOfControl;
                  QuestionObj.Modal = "Question" + $scope.GiftQuestionListColl[a].SrNo;
                  $scope.QuestionArray.push(QuestionObj);

               }

            }
         }
         if (type == 3) {
            $scope.Traveltype = true;
            $scope.Gifttype = false;
            $scope.Entertainmenttype = false;
            $scope.Mealtype = false;

         }
         if (type == 4) {
            $scope.Mealtype = true;
            $scope.Traveltype = false;
            $scope.Gifttype = false;
            $scope.Entertainmenttype = false;
         }
      }




   //// add +++ 3.2

      function setAuditItem() {
         //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;

         


      };

      $scope.addGiftItem = function (auditObj) {
         if (auditObj != null && auditObj != undefined) {
            auditObj.HideAddButton = true;
         }


       

         if (auditObj.NameofBeneficiary != '' && auditObj.OrganizationName != '' && auditObj.Designation != '' && auditObj.DateofOffering != '' &&

            auditObj.ValueofGIFTOffered != '' && auditObj.Purpose != '' && auditObj.Detailsofofferedgift != '') {

            var a = $scope.GiftsDetailsprevColl.length - 1;

           

         if ( $scope.GiftsDetailsprevColl[a].NameofBeneficiary !='' &&  $scope.GiftsDetailsprevColl[a].OrganizationName != '' &&  $scope.GiftsDetailsprevColl[a].Designation != '' &&  $scope.GiftsDetailsprevColl[a].DateofOffering != '' &&

         $scope.GiftsDetailsprevColl[a].ValueofGIFTOffered != '' &&  $scope.GiftsDetailsprevColl[a].Purpose != '' &&  $scope.GiftsDetailsprevColl[a].Detailsofofferedgift != '') {


                     var auditItemCopy = angular.copy(newGiftItem);
                     setAuditItem(auditItemCopy);
                     auditItemCopy.SrNo = auditObj.SrNo + 1;
                     auditItemCopy.HideAddButton = false;
                     auditItemCopy.HideRemoveButton = false;
                     $scope.GiftsDetailsprevColl.push(auditItemCopy);
                     console.log($scope.GiftsDetailsprevColl);

                  }
                  else {

                     alert('Please First Fill All Fields')
                     return false;
                  }
               }
         
         else {
            alert('Please First Fill All Fields')
            return false;
         }
         // alert('Please fill all SKU ')



         $timeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
         }, 100);
      };



   


      $scope.removeGigttItem = function (Capex, $event) {
         $event.currentTarget.style.display = "none";



         var t = $scope.GiftsDetailsprevColl.indexOf(Capex);
         $scope.GiftsDetailsprevColl.splice(t, 1);

         if ($scope.GiftsDetailsprevColl.length > 0 && $scope.GiftsDetailsprevColl.length <= 1) {
            $scope.GiftsDetailsprevColl[$scope.GiftsDetailsprevColl.length - 1].HideAddButton = false;
            $scope.GiftsDetailsprevColl[$scope.GiftsDetailsprevColl.length - 1].HideRemoveButton = true;
            $scope.showSubmit = true;
         } else {
            $scope.GiftsDetailsprevColl[$scope.GiftsDetailsprevColl.length - 1].HideAddButton = false;
            $scope.GiftsDetailsprevColl[$scope.GiftsDetailsprevColl.length - 1].HideRemoveButton = false;
         }

         $scope.setLoading(false);

      }




      newGiftItem = {
         // ddlMarket:0,
         // MarketColl:$scope.MarketColl,

         // CountryColl:$scope.filteredCountryColl,  if country and market required both in one row the we uncomment it
         // ddlcountry:0,

         
         


        // NameofBeneficiaryId: 0,
         NameofBeneficiary: 0,
         BeneficiaryMasterColl:$scope.BeneficiaryMasterColl,

         Designation:'',
         DateofOffering:'',
         ValueofGIFTOffered:'',
         Purpose:'',
         Detailsofofferedgift:'',

         HideAddButton: true,
         HideRemoveButton: true




      }

      var currentRoWIndex = $scope.GiftsDetailsprevColl.length

      if ($scope.GiftsDetailsprevColl.length == 0) {

         setTimeout(function () {
            for (var i = 0; i < 1; i++) {
               var auditItemCopy = angular.copy(newGiftItem);
               setAuditItem(auditItemCopy);
               currentRoWIndex = $scope.GiftsDetailsprevColl.length;

               $scope.GiftsDetailsprevColl.push(auditItemCopy);
               //$scope.GiftsDetailsprevColl[i].SrNo = currentRoWIndex + i + 1;
               $scope.GiftsDetailsprevColl[i].HideAddButton = false;

               $scope.$apply();
            }
         }, 1000);


      }

      if ($scope.GiftsDetailsprevColl.length > 0) {
         for (var index = 0; index < $scope.GiftsDetailsprevColl.length; index++) {
            $scope.GiftsDetailsprevColl[index].SrNo = index + 1;
            $scope.GiftsDetailsprevColl[index].HideAddButton = true;
            if ($scope.isFormReadonly == true) {
               $scope.GiftsDetailsprevColl[index].HideRemoveButton = true;
            } else {
               $scope.GiftsDetailsprevColl[index].HideRemoveButton = false;
            }
            $scope.GiftsDetailsprevColl[index].CFSAAuditIDId = $scope.GiftsDetailsprevColl[index].ID;
            $scope.GiftsDetailsprevColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;

            if (index == $scope.GiftsDetailsprevColl.length - 1 && $scope.isFormReadonly == false) {
               $scope.GiftsDetailsprevColl[index].HideAddButton = false;
               if ($scope.GiftsDetailsprevColl.length == 1) {
                  $scope.GiftsDetailsprevColl[index].HideRemoveButton = true;
               } else {
                  $scope.GiftsDetailsprevColl[index].HideRemoveButton = false;
               }
            }
         }
      }


      /// autopopulate--


      $scope.bindbenificiaryname=function(benificiary){

         if(benificiary!=undefined ||benificiary!=null || benificiary!=="" || benificiary!='' ){

         $scope.BenificiaryCollfiltered = $scope.BeneficiaryMasterColl.filter(function (item) {
            return (item.ID == benificiary);
        });
        if($scope.BenificiaryCollfiltered.length>0){


         var g=$scope.GiftsDetailsprevColl.length-1;
         $scope.GiftsDetailsprevColl[g].OrganizationName = $scope.BenificiaryCollfiltered[0].Organization;
         $scope.GiftsDetailsprevColl[g].Designation = $scope.BenificiaryCollfiltered[0].Designation;
       console.log(benificiary)
      }
      else{
         var g=$scope.GiftsDetailsprevColl.length-1;
         $scope.GiftsDetailsprevColl[g].OrganizationName ='';
         $scope.GiftsDetailsprevColl[g].Designation = '';
       console.log(benificiary)

      }
   }
   }

      /// autopopulate--


      $scope.bindEmpDetails=function(EmpId){

         if(EmpId!=undefined ||EmpId!=null || EmpId!=="" || EmpId!='' ){

            $scope.EmpDetailsCollfiltered = $scope.EmployeeMasterColl.filter(function (item) {
               return (item.ID == EmpId);
           });
           if($scope.EmpDetailsCollfiltered.length>0){
            var g=$scope.EmpDetailsColl.length-1;
            $scope.EmpDetailsColl[g].NameofEmployee = $scope.EmpDetailsCollfiltered[0].Employeename;
            $scope.EmpDetailsColl[g].ContactNo = $scope.EmpDetailsCollfiltered[0].Contact;
            $scope.EmpDetailsColl[g].Designation4_2 = $scope.EmpDetailsCollfiltered[0].Designation;
            $scope.EmpDetailsColl[g].Department4_2 = $scope.EmpDetailsCollfiltered[0].Department;
            $scope.EmpDetailsColl[g].Email = $scope.EmpDetailsCollfiltered[0].EmployeeEmail;
            $scope.EmpDetailsColl[g].Location = $scope.EmpDetailsCollfiltered[0].Location;

           }
           else{

            var g=$scope.EmpDetailsColl.length-1;
            $scope.EmpDetailsColl[g].NameofEmployee = '';
            $scope.EmpDetailsColl[g].ContactNo ='';
            $scope.EmpDetailsColl[g].Designation4_2 ='';
            $scope.EmpDetailsColl[g].Department4_2 = '';
            $scope.EmpDetailsColl[g].Email = '';
            $scope.EmpDetailsColl[g].Location = '';
           }

          

       console.log(EmpId);

         }

       

         
      }


      

     
     
      //// add +++ 3.2




      function setGiftsDetailsItem() {
         //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;
   
       
   
   
   
      };
   
      $scope.addGiftsDetailsItem = function (GiftsDetailsObj) {
         if (GiftsDetailsObj != null && GiftsDetailsObj != undefined) {
            GiftsDetailsObj.HideAddButton = true;
         }
   
         if (GiftsDetailsObj.GiftsCategory != '' && GiftsDetailsObj.DetailsofGiftsOffered != '' && GiftsDetailsObj.QuantityofGiftsOffered != '' && GiftsDetailsObj.PerUnitRate != '' 
   
            ) { //GiftsDetailsObj.TotalAmountofGiftsOffered22 != ''
   
            var a = $scope.GiftsDetailsColl.length - 1;
   
           
   
                  if ( $scope.GiftsDetailsColl[a].GiftsCategory !='' &&  $scope.GiftsDetailsColl[a].DetailsofGiftsOffered != '' &&  $scope.GiftsDetailsColl[a].QuantityofGiftsOffered != '' &&  $scope.GiftsDetailsColl[a].PerUnitRate != '' 
   
                 ) { // $scope.GiftsDetailsColl[a].TotalAmountofGiftsOffered22 != ''
   
   
                     var auditItemCopy = angular.copy(newGiftsDetailsItem);
                     setGiftsDetailsItem(auditItemCopy);
                     auditItemCopy.SrNo = GiftsDetailsObj.SrNo + 1;
                     auditItemCopy.HideAddButton = false;
                     auditItemCopy.HideRemoveButton = false;
                     $scope.GiftsDetailsColl.push(auditItemCopy);
                     console.log($scope.GiftsDetailsColl);
   
                  }
                  else {
   
                     alert('Please First Fill All Fields')
                     return false;
                  }
               }
         
         else {
            alert('Please First Fill All Fields')
            return false;
         }
         // alert('Please fill all SKU ')
   
   
   
         $timeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
         }, 100);
      };

      $scope.bindGiftsDetails=function(a){
         if(a.GiftsCategory==1){
            a.DetailsofGiftsOffered=0;
            a.PerUnitRate=0;
            a.QuantityofGiftsOffered=0;

            a.TotalAmountofGiftsOffered22=(a.PerUnitRate)*(a.QuantityofGiftsOffered);
         

         }
         else{
            a.DetailsofGiftsOffered='';


         }

       
         console.log(a);
      }

      $scope.ChangeperUnitratedetails=function(a){
        
         a.TotalAmountofGiftsOffered22=(a.PerUnitRate)*(a.QuantityofGiftsOffered);
         console.log(a);
      }

      
   
   
   
   
   
   
      $scope.removeGiftsDetailsItem = function (Capex, $event) {
         $event.currentTarget.style.display = "none";
   
   
   
         var t = $scope.GiftsDetailsColl.indexOf(Capex);
         $scope.GiftsDetailsColl.splice(t, 1);
   
         if ($scope.GiftsDetailsColl.length > 0 && $scope.GiftsDetailsColl.length <= 1) {
            $scope.GiftsDetailsColl[$scope.GiftsDetailsColl.length - 1].HideAddButton = false;
            $scope.GiftsDetailsColl[$scope.GiftsDetailsColl.length - 1].HideRemoveButton = true;
            $scope.showSubmit = true;
         } else {
            $scope.GiftsDetailsColl[$scope.GiftsDetailsColl.length - 1].HideAddButton = false;
            $scope.GiftsDetailsColl[$scope.GiftsDetailsColl.length - 1].HideRemoveButton = false;
         }
   
         $scope.setLoading(false);
   
      }
   
   
   
   
      newGiftsDetailsItem = {
         // ddlMarket:0,
         // MarketColl:$scope.MarketColl,
   
         // CountryColl:$scope.filteredCountryColl,  if country and market required both in one row the we uncomment it
         // ddlcountry:0,
         GiftsCategoryColl:$scope.GiftsCategoryColl,
         GiftsCategory:0,
         DetailsofGiftsOffered:'',
         QuantityofGiftsOffered:'',
         PerUnitRate:'',
         TotalAmountofGiftsOffered22:'',
         
         HideAddButton: true,
         HideRemoveButton: true,
   
   
   
   
      }
   
      var currentRoWIndex = $scope.GiftsDetailsColl.length
   
      if ($scope.GiftsDetailsColl.length == 0) {
   
         setTimeout(function () {
            for (var i = 0; i < 1; i++) {
               var auditItemCopy = angular.copy(newGiftsDetailsItem);
               setGiftsDetailsItem(auditItemCopy);
               currentRoWIndex = $scope.GiftsDetailsColl.length;
   
               $scope.GiftsDetailsColl.push(auditItemCopy);
               //$scope.GiftsDetailsColl[i].SrNo = currentRoWIndex + i + 1;
               $scope.GiftsDetailsColl[i].HideAddButton = false;
   
               $scope.$apply();
            }
         }, 1000);
   
   
      }
   
      if ($scope.GiftsDetailsColl.length > 0) {
         for (var index = 0; index < $scope.GiftsDetailsColl.length; index++) {
            $scope.GiftsDetailsColl[index].SrNo = index + 1;
            $scope.GiftsDetailsColl[index].HideAddButton = true;
            if ($scope.isFormReadonly == true) {
               $scope.GiftsDetailsColl[index].HideRemoveButton = true;
            } else {
               $scope.GiftsDetailsColl[index].HideRemoveButton = false;
            }
            $scope.GiftsDetailsColl[index].CFSAAuditIDId = $scope.GiftsDetailsColl[index].ID;
            $scope.GiftsDetailsColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;
   
            if (index == $scope.GiftsDetailsColl.length - 1 && $scope.isFormReadonly == false) {
               $scope.GiftsDetailsColl[index].HideAddButton = false;
               if ($scope.GiftsDetailsColl.length == 1) {
                  $scope.GiftsDetailsColl[index].HideRemoveButton = true;
               } else {
                  $scope.GiftsDetailsColl[index].HideRemoveButton = false;
               }
            }
         }
      }
   
   
   



      

     //// add +++ 4.1

   function setEmpDetailsItem() {
      //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;

      //    NameofBeneficiary    :"",         
      // DesignationOrganizationName  :"",     
      // DateofLastBenifitsOffered :"",     
      // ValueofGiftOffered :"",     
      // PurposeofPaseofferings :"",     
      // TypesofBenifitsOffered :"",     
      // DetailsofBenifitsOffered :"", 


   };

   $scope.addEmpDetailsItem = function (auditObj) {
      if (auditObj != null && auditObj != undefined) {
         auditObj.HideAddButton = true;
      }
      


      if (auditObj.NameofEmployee != '' && auditObj.EmployeeID != '' && auditObj.Designation4_2 != '' && auditObj.Department4_2 != '' && auditObj.Email != '' && auditObj.Location != '' ) {

         var a = $scope.EmpDetailsColl.length - 1;

               if ( $scope.EmpDetailsColl[a].NameofEmployee !='' &&  $scope.EmpDetailsColl[a].EmployeeID != '' &&  $scope.EmpDetailsColl[a].Designation4_2 != '' &&  $scope.EmpDetailsColl[a].Department4_2 != '' &&  $scope.EmpDetailsColl[a].Email != '' && $scope.EmpDetailsColl[a].Location != '') {


                  var auditItemCopy = angular.copy(newEmpDetailsItem);
                  setEmpDetailsItem(auditItemCopy);
                  auditItemCopy.SrNo = auditObj.SrNo + 1;
                  auditItemCopy.HideAddButton = false;
                  auditItemCopy.HideRemoveButton = false;
                  $scope.EmpDetailsColl.push(auditItemCopy);
                  console.log($scope.EmpDetailsColl);

               }
               else {

                  alert('Please First Fill All Fields')
                  return false;
               }
            }
      
      else {
         alert('Please First Fill All Fields')
         return false;
      }
      // alert('Please fill all SKU ')



      $timeout(function () {
         $('[data-toggle="tooltip"]').tooltip();
      }, 100);
   };






   $scope.removeEmpDetailsItem = function (Capex, $event) {
      $event.currentTarget.style.display = "none";



      var t = $scope.EmpDetailsColl.indexOf(Capex);
      $scope.EmpDetailsColl.splice(t, 1);

      if ($scope.EmpDetailsColl.length > 0 && $scope.EmpDetailsColl.length <= 1) {
         $scope.EmpDetailsColl[$scope.EmpDetailsColl.length - 1].HideAddButton = false;
         $scope.EmpDetailsColl[$scope.EmpDetailsColl.length - 1].HideRemoveButton = true;
         $scope.showSubmit = true;
      } else {
         $scope.EmpDetailsColl[$scope.EmpDetailsColl.length - 1].HideAddButton = false;
         $scope.EmpDetailsColl[$scope.EmpDetailsColl.length - 1].HideRemoveButton = false;
      }

      $scope.setLoading(false);

   }




   newEmpDetailsItem = {
      

      NameofEmployee:'',

      EmployeeID: 0,
      EmployeeMasterColl:$scope.EmployeeMasterColl,
      
      Department4_2:'',
      Designation4_2:'',
      Email:'',
      Location:'',

      HideAddButton: true,
      HideRemoveButton: true,




   }

   var currentRoWIndex = $scope.EmpDetailsColl.length

   if ($scope.EmpDetailsColl.length == 0) {

      setTimeout(function () {
         for (var i = 0; i < 1; i++) {
            var auditItemCopy = angular.copy(newEmpDetailsItem);
            setEmpDetailsItem(auditItemCopy);
            currentRoWIndex = $scope.EmpDetailsColl.length;

            $scope.EmpDetailsColl.push(auditItemCopy);
            //$scope.GiftsDetailsprevColl[i].SrNo = currentRoWIndex + i + 1;
            $scope.EmpDetailsColl[i].HideAddButton = false;

            $scope.$apply();
         }
      }, 1000);


   }

   if ($scope.EmpDetailsColl.length > 0) {
      for (var index = 0; index < $scope.EmpDetailsColl.length; index++) {
         $scope.EmpDetailsColl[index].SrNo = index + 1;
         $scope.EmpDetailsColl[index].HideAddButton = true;
         if ($scope.isFormReadonly == true) {
            $scope.EmpDetailsColl[index].HideRemoveButton = true;
         } else {
            $scope.EmpDetailsColl[index].HideRemoveButton = false;
         }
         $scope.EmpDetailsColl[index].CFSAAuditIDId = $scope.EmpDetailsColl[index].ID;
         $scope.EmpDetailsColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;

         if (index == $scope.EmpDetailsColl.length - 1 && $scope.isFormReadonly == false) {
            $scope.EmpDetailsColl[index].HideAddButton = false;
            if ($scope.EmpDetailsColl.length == 1) {
               $scope.EmpDetailsColl[index].HideRemoveButton = true;
            } else {
               $scope.EmpDetailsColl[index].HideRemoveButton = false;
            }
         }
      }
   }



   //// add +++ 4.1




   ///22---


      


   //// add +++ 4.1


   //22



   //---23


      

     //// add +++ 4.1


     function setBenificiaryDetailsItem() {
      //auItem.Title = $scope.scheduleColl.Department.Title + " - " + $scope.scheduleColl.Location.Title + " - " + $scope.auditWeather + " - " + $scope.auditStartTime;

    


   };

   $scope.addBenificiaryItem = function (GiftsDetailsObj) {
      if (GiftsDetailsObj != null && GiftsDetailsObj != undefined) {
         GiftsDetailsObj.HideAddButton = true;
      }

      

      if (GiftsDetailsObj.NameofBenificiary != '' && GiftsDetailsObj.Department_23 != '' && GiftsDetailsObj.Organization_23 != '' && GiftsDetailsObj.Designation_23 != '' && GiftsDetailsObj.RelationshipPanasonicnBenificiary != '' &&

         GiftsDetailsObj.DetailsGiftsOffered != '' &&  GiftsDetailsObj.TotalAmountofGiftsOffered != '') {


         var a = $scope.BenificiaryColl.length - 1;

        

               if ( $scope.BenificiaryColl[a].NameofBenificiary !='' &&  $scope.BenificiaryColl[a].Department_23 != '' &&  $scope.BenificiaryColl[a].Organization_23 != '' &&  $scope.BenificiaryColl[a].Designation_23 != '' &&  $scope.BenificiaryColl[a].RelationshipPanasonicnBenificiary != '' &&

               $scope.BenificiaryColl[a].DetailsGiftsOffered != '' &&  $scope.BenificiaryColl[a].TotalAmountofGiftsOffered != '') {


                  var auditItemCopy = angular.copy(newBenificiaryDetailsItem);
                  setBenificiaryDetailsItem(auditItemCopy);
                  auditItemCopy.SrNo = GiftsDetailsObj.SrNo + 1;
                  auditItemCopy.HideAddButton = false;
                  auditItemCopy.HideRemoveButton = false;
                  $scope.BenificiaryColl.push(auditItemCopy);
                  console.log($scope.BenificiaryColl);

               }
               else {

                  alert('Please First Fill All Fields')
                  return false;
               }
            }
      
      else {
         alert('Please First Fill All Fields')
         return false;
      }
      // alert('Please fill all SKU ')



      $timeout(function () {
         $('[data-toggle="tooltip"]').tooltip();
      }, 100);
   };






   $scope.removeBenificiaryItem = function (Capex, $event) {
      $event.currentTarget.style.display = "none";



      var t = $scope.BenificiaryColl.indexOf(Capex);
      $scope.BenificiaryColl.splice(t, 1);

      if ($scope.BenificiaryColl.length > 0 && $scope.BenificiaryColl.length <= 1) {
         $scope.BenificiaryColl[$scope.BenificiaryColl.length - 1].HideAddButton = false;
         $scope.BenificiaryColl[$scope.BenificiaryColl.length - 1].HideRemoveButton = true;
         $scope.showSubmit = true;
      } else {
         $scope.BenificiaryColl[$scope.BenificiaryColl.length - 1].HideAddButton = false;
         $scope.BenificiaryColl[$scope.BenificiaryColl.length - 1].HideRemoveButton = false;
      }

      $scope.setLoading(false);

   }

   


   newBenificiaryDetailsItem = {
      // ddlMarket:0,
      // MarketColl:$scope.MarketColl,

      // CountryColl:$scope.filteredCountryColl,  if country and market required both in one row the we uncomment it
      // ddlcountry:0,
      NameofBenificiary:'',
      Department_23:'',
      Organization_23:'',
      Designation_23:'',
      RelationshipPanasonicnBenificiary:'',
      DetailsGiftsOffered:'',
      TotalAmountofGiftsOffered:'',
      
      HideAddButton: true,
      HideRemoveButton: true,




   }

   var currentRoWIndex = $scope.BenificiaryColl.length

   if ($scope.BenificiaryColl.length == 0) {

      setTimeout(function () {
         for (var i = 0; i < 1; i++) {
            var auditItemCopy = angular.copy(newBenificiaryDetailsItem);
            setBenificiaryDetailsItem(auditItemCopy);
            currentRoWIndex = $scope.BenificiaryColl.length;

            $scope.BenificiaryColl.push(auditItemCopy);
            //$scope.BenificiaryColl[i].SrNo = currentRoWIndex + i + 1;
            $scope.BenificiaryColl[i].HideAddButton = false;

            $scope.$apply();
         }
      }, 1000);


   }

   if ($scope.BenificiaryColl.length > 0) {
      for (var index = 0; index < $scope.BenificiaryColl.length; index++) {
         $scope.BenificiaryColl[index].SrNo = index + 1;
         $scope.BenificiaryColl[index].HideAddButton = true;
         if ($scope.isFormReadonly == true) {
            $scope.BenificiaryColl[index].HideRemoveButton = true;
         } else {
            $scope.BenificiaryColl[index].HideRemoveButton = false;
         }
         $scope.BenificiaryColl[index].CFSAAuditIDId = $scope.BenificiaryColl[index].ID;
         $scope.BenificiaryColl[index].ContractorSupervisorColl = $scope.contractorAgencyColl;

         if (index == $scope.BenificiaryColl.length - 1 && $scope.isFormReadonly == false) {
            $scope.BenificiaryColl[index].HideAddButton = false;
            if ($scope.BenificiaryColl.length == 1) {
               $scope.BenificiaryColl[index].HideRemoveButton = true;
            } else {
               $scope.BenificiaryColl[index].HideRemoveButton = false;
            }
         }
      }
   }

   //// beneficiary autopopulate



   ///////////////////////////benificiary autopopulate






  //--- 23


 


   });





});