$(document).ready(function () {
   
   GetBannerimage();
   
 /*  
///OutlicensingReviewerPending();

MOWANDAReviewerPending();

CapexReviewerPending();


OutlicensingValidatorPending();

AndaValidatorPending();

CapexValidatorPending();
*/

   //   fetchListDataList();


});


function GetBannerimage() {
   CurrLogUserId1 = _spPageContextInfo.userDisplayName;
   $("#CurrLogUserId").append(CurrLogUserId1);

   var siteUrl = _spPageContextInfo.webAbsoluteUrl;
   var oDataUrl = siteUrl + "/_api/web/lists/getbytitle('BannerImages')/items?$select=*&$filter=Status eq 'Active'";
   $.ajax({
      url: oDataUrl,
      type: "GET",
      dataType: "json",
      headers: {
         "accept": "application/json;odata=verbose"
      },
      success: OnSuccess,
      error: OnFailure

   });
}

function OnSuccess(data) {
   try {

      $("#menu1").empty();
      $.each(data.d.results, function (key, val) {
         if (val.ImageUrl!= null && val.ImageUrl!= undefined) {
            imgUrl = val.ImageUrl.Url
         }
         $("#bannerimg").append('<img src="' + val.ImageUrl.Description + '">');

      });

   } catch (e) {
      alert(e.message);
   }
}

function OnFailure(data, errMessage) {
   alert("Error: " + errMessage);
}


// ARVIND


// Super- Admin Role -- // Master URL


var boolSuperAdminRole = 'false';
function SuperAdminRole() {
   //   var SuperAdminRoleCounter= 0;

   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member&$filter=UserGroup/Id eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=UserGroup/Title eq 'SuperAdmin'&$orderby=ID desc&$top=5000";

   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;
         try {
            var SuperAdminRoleCounter = 0;

            if (Logg.length > 0) {
               for (var i = 0; i < Logg.length; i++) {

                  var gName = Logg[i].UserGroup.Title;
                  var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);

                  if (userExist == true) {
                     SuperAdminRoleCounter++;


                  }


               }
               if (SuperAdminRoleCounter > 0) {
                  boolSuperAdminRole = 'true'

               }


            }




         } catch (e) { }
      },
      error: function () {

      }
   });

}

//





//
// initiatorLP  for Super Admin
/*
function InitiatorLP() {
 boolSuperAdminRole='false'  
   SuperAdminRole();
      
if (boolSuperAdminRole== 'true') {
        var url = _spPageContextInfo.webServerRelativeUrl+"/SitePages/BusinessCase.aspx#!/InitiatorLP"; 
        $(location).attr('href', url);
    //   return false;
 
     }
     else{
        alert('You are not authorized to access  Please contact your IT administrator.')
             return false;
       }
}
*/


// Arvind // Update Templates

function UpdateTemplate() {
   boolSuperAdminRole = 'false'
   SuperAdminRole();
   
   

   if (boolSuperAdminRole == 'true') {
   
    
    //  var url = _spPageContextInfo.webAbsoluteUrl+ "/SitePages/TemplateUrl.aspx ";
      var url = _spPageContextInfo.webAbsoluteUrl+ "/SitePages/newpagesTemplates.aspx";

      
      window.location.href = url;// -- to open same tab
     // window.open(url, '_blank');
      //location.reload(true);
      //   return false;

   }
   else {
      alert('You are not authorized to access  Please contact your IT administrator.')
      return false;
   }
}


/// Master List 


function Masters() {
   boolSuperAdminRole = 'false'
   SuperAdminRole();


   if (boolSuperAdminRole == 'true') {
      var url = _spPageContextInfo.webAbsoluteUrl+ "/SitePages/MasterUrl.aspx";
      window.location.href = url;
 
   }
   else {
      alert('You are not authorized to access  Please contact your IT administrator.')
      return false;
   }
}





//

// 25-08-23


var boolReviewerRole = 'false';
var boolValidatorRole = 'false';

var boolInitiatorRole = 'false';

var boolReviewerRole = 'false';

var boolValidatorRole = 'false';


function GetInitiatorRole(abc) {
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Role,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=Role eq 'Initiator' or Role eq 'SuperAdmin'&$orderby=ID desc&$top=5000";

   //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";//


   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;

         var InitiatorTemplate = [];
         try {
            var InitiatorRoleCounter = 0;
            var InitiatorNot = false;
            if (data.d.results.length > 0) {

               for (var i = 0; i < Logg.length; i++) {

                  var gName = Logg[i].UserGroup.Title;
                  var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);

                  if (userExist == true) {
                     InitiatorRoleCounter++;

                     InitiatorNot = true;

                     //   InitiatorTemplate.push(Logg[i].TemplateType);

                  }





               }

               //var uniqueArray = InitiatorTemplate.filter((value, index, self) => self.indexOf(value) === index);

               if (InitiatorNot == false && InitiatorRoleCounter == 0) {


                  alert('You are not authorized to access  Please contact your IT administrator.')
                  return false;


               }
               else {


                  if (abc == 'Outlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorOLDash";
                     window.location.href = url;


                  }

                   if (abc == 'Inlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorILDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'Tender Bid (Single Scenario)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorSingDash";
                     window.location.href = url;


                  }
                  
                  
                    if (abc == 'Tender Bid (Multiple Scenarios)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorMultipleDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'InLicensing Vs InHouse') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorILVsIHDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'Capex') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorCAPEXDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorUSANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorUSMOWANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW+EU') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorUSANDAUMEDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'InLicensing Vs InHouse') {
                   
                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorILVsIHDash";
                     window.location.href = url;



                  }
                  
                  
                     if (abc == 'API') {
                   
                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/InitiatorAPIDash";
                     window.location.href = url;



                  }

                  

               }

          



            }

         } catch (e) { }
      },
      error: function () {

      }
   });

}




function GetReviewerRole(abc) {
   var ReviewerRoleData = [];
   var col2 = {};

   var r = $('#Reviewer option:selected').text();

   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Role,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=Role eq 'Reviewer'&$orderby=ID desc&$top=5000";

   //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";//
   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;
         try {
            var ReviewerRoleCounter = 0;
            var ReviewerNot = false;
            if (data.d.results.length > 0) {

               for (var i = 0; i < Logg.length; i++) {

                  var gName = Logg[i].UserGroup.Title;
                  var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);

                  if (userExist == true) {
                     ReviewerRoleCounter++;
                     ReviewerNot = true;

                  }


               }

               if (ReviewerNot == false && ReviewerRoleCounter == 0) {
                  alert('You are not authorized to access  Please contact your IT administrator.')
                  return false;



               }
               else {


                  if (abc == 'Outlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerOLDash";
                     window.location.href = url;


                  }

                   if (abc == 'Inlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerILDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'Tender Bid (Single Scenario)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerSingDash";
                     window.location.href = url;


                  }
                  
                  
                    if (abc == 'Tender Bid (Multiple Scenarios)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerMultipleDash";
                     window.location.href = url;
                     


                  }
                  
                    if (abc == 'InLicensing Vs InHouse') {
                    
                    
                    
                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerILVsIHDash";
                     window.location.href = url;


                   


                  }
                  
                    if (abc == 'Capex') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerCAPEXDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerUSANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerUSMOWANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW+EU') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerUSANDAUMEDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'InLicensing Vs InHouse') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerILVsIHDash";
                    window.location.href = url;


                  }
                  
                     if (abc == 'API') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ReviewerAPIDash";
                    window.location.href = url;


                  }


               }




            }

         } catch (e) { }
      },
      error: function () {

      }
   });

}





function GetValidatorRole(abc) {

   var ReviewerRoleData = [];
   var col2 = {};
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Role,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=Role eq 'Validator'&$orderby=ID desc&$top=5000";

   //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";//
   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;
         var ValidatorrNot = false;

         try {

            var ValidatorRoleCounter = 0;
            if (data.d.results.length > 0) {

               for (var i = 0; i < Logg.length; i++) {

                  var gName = Logg[i].UserGroup.Title;
                  var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);

                  if (userExist == true) {
                     ValidatorRoleCounter++;
					ValidatorrNot=true;

                  }


               }

               if (ValidatorrNot== false && ValidatorRoleCounter == 0) {
                  alert('You are not authorized to access  Please contact your IT administrator.')
                  return false;



               }

               else {


                  if (abc == 'Outlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorOLDash";
                     window.location.href = url;


                  }

                   if (abc == 'Inlicensing') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorILDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'Tender Bid (Single Scenario)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorSingDash";
                     window.location.href = url;


                  }
                  
                  
                    if (abc == 'Tender Bid (Multiple Scenarios)') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorMultipleDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'API') {

                    var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorAPIDash";
                     window.location.href = url;


                  }
                  
                    if (abc == 'Capex') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorCAPEXDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorUSANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorUSMOWANDADash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'ANDA US+MOW+EU') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorUSANDAUMEDash";
                     window.location.href = url;


                  }
                  
                   if (abc == 'InLicensing Vs InHouse') {

                     var url = _spPageContextInfo.webAbsoluteUrl + "/SitePages/BusinessCase.aspx#!/ValidatorILVsIHDash";
                     window.location.href = url;


                  }

               }

              


            }

         } catch (e) { }
      },
      error: function () {

      }
   });

}

//


/*
function GetRoleuser1() {
   var InitiatorRoleData = [];
   var col1 = {};
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member&$filter=UserGroup/Id eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$orderby=ID desc&$top=5000";

   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;
         try {
            if (data.d.results.length > 0) {
               for (var i = 0; i < Logg.length; i++) {
                  if (Logg[i].Role == "Initiator") {
                     col1.EMail = Logg[i].Member.EMail;
                     col1.Role = Logg[i].Role;
                  }
                  InitiatorRoleData.push(col1);
               }
            }
            else {

               alert('You are not authorized to access the Business Case Initiator Dashboard!! Please contact your IT administrator.')

               return false;

            }
            var userInfo = _spPageContextInfo.userEmail;
            var initiatorcount = 0;
            for (var a = 0; a < InitiatorRoleData.length; i++) {
               if (userInfo = InitiatorRoleData[a].EMail) {
                  if (InitiatorRoleData[a].EMail != 'undefined') {
                     initiatorcount++;
                  }
                  if (initiatorcount == 1) {
                     var url = _spPageContextInfo.webServerRelativeUrl + "/SitePages/BusinessCase.aspx#!/InitiatorLP";
                     $(location).attr('href', url);
                     //  alert('Welcome to the Business Case Initiator Dashboard!!');
                     return false;

                  }
               } else {
                  alert('You are not authorized to access the Business Case Initiator Dashboard!! Please contact your IT administrator.')

                  return false;
               }
            }
         } catch (e) { }
      },
      error: function () {

      }
   });

}*/




var ReviewerRoleData = [];
var ReviewCount1 = 0;
var colOLReview = {};
var colILReview = {};
var colANDAReview = {};
var colUSANDAReview = {};
var colANDAUMEReview = {};

var colCAPEXReview = {};

var ValidatorRoleData = [];
var ValidateCount1 = 0;
var colOLValidate = {};
var colILValidate = {};
var colANDAValidate = {};
var colUSANDAValidate = {};
var colANDAUMEValidate = {};

var colCAPEXValidate = {};



var InitiatorRoleData = [];
var colOLInitiate = {};
var colILInitiate = {};

//ARVIND PAL  //Initiation Data As REVIEWED  

function OutlicensingReviewerPending() {
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Initiators/EMail,Reviewers/Id,Reviewers/Title,Reviewers/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
   // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= )) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;
  colOLReview.CaseStatus = Logg.length;
         try {
            if (Logg.length > 0) {
             


              
                  for (var i = 0; i < Logg.length; i++) {

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var arvind = false;
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colOLReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colOLReview);

                           arvind = true


                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#OLcounter").empty();

                           $("#OLcounter").append(Logg.length);



                        }


                     }

                  }
                  InlicensingReviewerPending(colOLReview);


               }
               else{
              
               
  InlicensingReviewerPending(colOLReview);
  }
               // getUserInGroup(_spPageContextInfo.webAbsoluteUrl,_spPageContextInfo.userEmail);
               // ReviewerRoleData.push(colOLReview);
            }
          
          catch (e) { }
      },
      error: function () { }
   });

   function InlicensingReviewerPending(colOLReview) {

      // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;

            try {
               if (Logg.length > 0) {
                  //  colILReview.CaseStatus = Logg.length;
                  //  ReviewerRoleData.push(colILReview);
                  //var ReviewCount1=0;
                  for (var i = 0; i < Logg.length; i++) {

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var arvind = false;
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colILReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colILReview);
                           //	colOLReview.push(ReviewCount1);

                           arvind = true

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#ILcounter").empty();

                           $("#ILcounter").append(Logg.length);


                        }


                     }

                  }

               }
               //MOWANDAReviewerPending(colILReview);

            } catch (e) { }
         },
         error: function () { }
      });

   }
}
   function MOWANDAReviewerPending() {

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= (substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;

            try {
               if (Logg.length > 0) {

                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colANDAReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colANDAReview);
                           arvind = true;
                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#USAndaMOWcounter").empty();

                           $("#USAndaMOWcounter").append(Logg.length);



                        }



                     }

                  }
                  USANDAReviewerPending(colANDAReview);


                  //   ReviewerRoleData.push(colANDAReview);  // FOR CAPEX
               }
               else{
                  USANDAReviewerPending(colANDAReview);

               }
            } catch (e) { }
         },
         error: function () { }
      });

   


   function USANDAReviewerPending(colANDAReview) {

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= (substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;

            try {
               if (Logg.length > 0) {

                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colUSANDAReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colUSANDAReview);
                           arvind = true
                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#USAndacounter").empty();


                           $("#USAndacounter").append(Logg.length);


                        }



                     }
                  }
                  ANDAUMEReviewerPending(colUSANDAReview);


                  //  ReviewerRoleData.push(colANDAReview);  // FOR CAPEX
               }
               else{
                  ANDAUMEReviewerPending(colUSANDAReview);
               }
            } catch (e) { }
         },
         error: function () { }
      });

   }


   function ANDAUMEReviewerPending(colUSANDAReview) {

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= (substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;

            try {
               if (Logg.length > 0) {

                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colANDAUMEReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colANDAUMEReview);
                           arvind = true
                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#AndaEMUcounter").empty();


                           $("#AndaEMUcounter").append(Logg.length);


                        }



                     }
                  }
                  //  MOEEUUSANDAReviewerPending(colCAPEXReview);


                 // CapexReviewerPending(colANDAUMEReview);  // FOR CAPEX
               }
            } catch (e) { }
         },
         error: function () { }
      });

   }
}

   function CapexReviewerPending() {

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= (substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
     // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=*&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Title,Reviewers/Id,Validators/Id,Validators/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,Reviewers,SubStrategy,Initiators,Validators&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;

            try {
               if (Logg.length > 0) {

                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;

                     for (var j = 0; j < Logg[i].Reviewers.results.length; j++) {
                        var gName = Logg[i].Reviewers.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colCAPEXReview = parseInt(ReviewCount1) + 1;
                           ReviewerRoleData.push(colCAPEXReview);
                           arvind = true
                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#CapexRev").empty();


                           $("#CapexRev").append(Logg.length);


                        }



                     }
                  }
                  //  MOEEUUSANDAReviewerPending(colCAPEXReview);


                  //   ReviewerRoleData.push(colCAPEXReview);  // FOR CAPEX
               }
            } catch (e) { }
         },
         error: function () { }
      });

   }





/*
--PREVIOUSLY USED FOR TOTAL COUNT--
function Reviewerdataforreview() {
   OutlicensingReviewerPending();
   var z = 0;
   for (var k = 0; k < ReviewerRoleData.length; k++) {
      z = ReviewerRoleData[k] + z;
   }
   $("#counter").append(z);




}*/ 

//ARVIND PAL  //Initiation Data As VALIDATED  
function OutlicensingValidatorPending() {

   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"

   //   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"
   //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"

   var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: requestUri,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      success: function (data) {
         var Logg = data.d.results;


         try {
            if (Logg.length > 0) {

               for (var i = 0; i < Logg.length; i++) {

                  for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                     var arvind = false;
                     var gName = Logg[i].Validators.results[j].Title;
                     var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)

                     if (userExist == true) {
                        //	parseInt(ReviewCount1)++;
                        colOLValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                        ValidatorRoleData.push(colOLValidate);
                        arvind = true;

                        //	colOLReview.push(ReviewCount1);

                        // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  

                        //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                        //alert("TRUE")
                     }

                     if (arvind == true) {
                        $("#ValOLcounter").empty();

                        $("#ValOLcounter").append(Logg.length);


                     }



                  }
               }
               InlicensingValidatorPending(colOLValidate)
               //colOLValidate.CaseStatus = Logg.length;
               // ValidatorRoleData.push(colOLValidate);
            }
            else{
               InlicensingValidatorPending(colOLValidate)
            }
           

         } catch (e) { }
      },
      error: function () { }
   });

   function InlicensingValidatorPending(colOLValidate) {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"

      // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Validators/Id,Validators/Title,Validators/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;


            try {
               if (Logg.length > 0) {
                  // colILValidate.CaseStatus = Logg.length;
                  // ValidatorRoleData.push(colILValidate);
                  for (var i = 0; i < Logg.length; i++) {



                     for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                        var arvind = false;

                        var gName = Logg[i].Validators.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colILValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colILValidate);



                           arvind = true

                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }

                        if (arvind == true) {
                           $("#ValILcounter").empty();



                           $("#ValILcounter").append(Logg.length);


                        }



                     }
                  }
               }


               //AndaValidatorPending()

            } catch (e) { }
         },
         error: function () { }
      });
   }

}
   function AndaValidatorPending() {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"

      // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=(CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Validators/Id,Validators/Title,Validators/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;
            try {
               if (Logg.length > 0) {
                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;


                     for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                        var gName = Logg[i].Validators.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colANDAValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colANDAValidate);

                           arvind = true

                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }


                     }

                     if (arvind == true) {

                        $("#ValUSANDAMOWcounter").empty();

                        $("#ValUSANDAMOWcounter").append(Logg.length);


                     }

                  }



                  // colANDAValidate.CaseStatus = Logg.length;  //colANDAValidate 
                  // ValidatorRoleData.push(colANDAValidate);
                  USAndaValidatorPending(colANDAValidate)
               }
               else{
                  USAndaValidatorPending(colANDAValidate)
               }
            } catch (e) { }
         },
         error: function () { }
      });
   


   function USAndaValidatorPending(colANDAValidate) {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"

      // var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=(CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Validators/Id,Validators/Title,Validators/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Validators/EMail)) and (CaseStatus eq 'Sent For Validation') or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'On Hold')) or ((CaseStage/Title eq 'Under Validation') and (CaseStatus eq 'Minor Changes'))&$top=5000&$orderby=ID desc"

      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;
            try {
               if (Logg.length > 0) {
                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;


                     for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                        var gName = Logg[i].Validators.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colUSANDAValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colUSANDAValidate);

                           arvind = true

                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }


                     }

                     if (arvind == true) {

                        $("#ValUSANDAcounter").empty();
                        $("#ValUSANDAcounter").append(Logg.length);


                     }

                  }

                  AndaUMEValidatorPending(colUSANDAValidate)


                  // colANDAValidate.CaseStatus = Logg.length;  //colANDAValidate 
                  // ValidatorRoleData.push(colANDAValidate);
               }
               else{
                  AndaUMEValidatorPending(colUSANDAValidate)

               }
            } catch (e) { }
         },
         error: function () { }
      });
   }


   function AndaUMEValidatorPending(colANDAValidate) {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"


      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;
            try {
               if (Logg.length > 0) {
                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;


                     for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                        var gName = Logg[i].Validators.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colANDAUMEValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colANDAUMEValidate);

                           arvind = true

                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }


                     }

                     if (arvind == true) {

                        $("#ValANDAUMEcounter").empty();
                        $("#ValANDAUMEcounter").append(Logg.length);


                     }

                  }



                  // colANDAValidate.CaseStatus = Logg.length;  //colANDAValidate 
                 // CapexValidatorPending(colANDAUMEValidate);
                  // CapexPending(colUSANDAValidate)
               }
            } catch (e) { }
         },
         error: function () { }
      });
   }
}



   function CapexValidatorPending() {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CapexBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Validators/Id,Validators/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,Initiators,Validators&$filter=CaseStatus eq 'Sent For Validation' or CaseStatus eq 'On Hold' or CaseStatus eq 'Minor Changes-by Validator'&$top=5000&$orderby=ID desc"


      var requestHeaders = {
         "accept": "application/json;odata=verbose"
      };
      $.ajax({
         url: requestUri,
         contentType: "application/json;odata=verbose",
         headers: requestHeaders,
         async: false,
         cache: false,
         success: function (data) {
            var Logg = data.d.results;
            try {
               if (Logg.length > 0) {
                  for (var i = 0; i < Logg.length; i++) {
                     var arvind = false;


                     for (var j = 0; j < Logg[i].Validators.results.length; j++) {
                        var gName = Logg[i].Validators.results[j].Title;
                        var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName)
                        if (userExist == true) {
                           //	parseInt(ReviewCount1)++;
                           colCAPEXValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colCAPEXValidate);

                           arvind = true

                           //	colOLReview.push(ReviewCount1);

                           // console.log(ReviewCount1)
                           // ReviewCount++;
                           //  break;					  

                           //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                           //   break;
                           //alert("TRUE")
                        }


                     }

                     if (arvind == true) {

                        $("#ValCapexcounter").empty();
                        $("#ValCapexcounter").append(Logg.length);


                     }

                  }



                  // colANDAValidate.CaseStatus = Logg.length;  //colANDAValidate 
                  // ValidatorRoleData.push(colANDAValidate);
                  // CapexPending(colCAPEXValidate)
               }
            } catch (e) { }
         },
         error: function () { }
      });
   }
/*
--- TOTAL VALIDATOR COUNT FOR ALL PAGES

function ValidatordataforValidate() {
   OutlicensingValidatorPending();
   var e = 0
   //var y=ReviewerRoleData[p].CaseStatus;
   for (var l = 0; l < ValidatorRoleData.length; l++) {
      e = ValidatorRoleData[l] + e;
   }
   $("#counter2").append(e);
}

*/



// 

var getUserInGroup = function (urlValue, Gname) {
   var flag = false;
   var Surl = urlValue + "/_api/web/SiteGroups/GetByName('" + Gname + "')/users";
   $.ajax({
      url: Surl,
      type: "GET",
      async: false,
      headers: {
         "accept": "application/json;odata=verbose",
         "content-type": "application/json;odata=verbose",
         "X-RequestDigest": $("#_REQUESTDIGEST").val()
      },
      success: function onSuccess(data) {
         var items = data.d.results;
         for (var i = 0; i < items.length; i++) {
            if (_spPageContextInfo.userDisplayName == items[i].Title) {
               flag = true;

               return true;
            }
         }
      },
      error: function onError(error) {
         console.log(JSON.stringify(error));
      }
   });

   return flag;
};
