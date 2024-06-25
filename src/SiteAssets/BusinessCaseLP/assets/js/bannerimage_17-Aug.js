$(document).ready(function () {
 //var ReviewCount=0;
   GetBannerimage();
   Reviewerdataforreview();
   ValidatordataforValidate();
   InitiatorInitiatedData();
  
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
         if (val.imageURL != null && val.imageURL != undefined) {
            imgUrl = val.imageURL.Url
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


 var boolSuperAdminRole='false';
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
         
          if (Logg.length > 0) 
       {		  
            for (var i = 0; i <Logg.length; i++) 
            {
               
                      var gName=Logg[i].UserGroup.Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName);
                     var SuperAdminRoleCounter= 0;
                     if(userExist==true)
                     {
                        SuperAdminRoleCounter++;
                     
                      
                     }
                     if(SuperAdminRoleCounter>0){
                     boolSuperAdminRole='true'
                     
                     }
                 
            }
          
             
        }            

         
         
           
         } catch (e) {}
      },
      error: function () {

      }
   });

}

//


   
                

//

// Arvind // Update Templates

function UpdateTemplate() {
 boolSuperAdminRole='false'  
   SuperAdminRole();
      
if (boolSuperAdminRole== 'true') {
        var url = _spPageContextInfo.webServerRelativeUrl+"/BusinessCaseTemplate/Forms/AllItems.aspx"; //BusinessCaseTemplate/Forms/AllItems.aspx
        $(location).attr('href', url);
       return false;

     }
     else{
        alert('You are not authorized to access  Please contact your IT administrator.')
             return false;
       }
}


/// Master List 


function Masters() {
  boolSuperAdminRole='false'
   SuperAdminRole();
      
if (boolSuperAdminRole== 'true') {
        var url = _spPageContextInfo.webServerRelativeUrl+"/_layouts/15/viewlsts.aspx?view=14"; //BusinessCaseTemplate/Forms/AllItems.aspx
        $(location).attr('href', url);
       return false;

     }
     else{
        alert('You are not authorized to access  Please contact your IT administrator.')
             return false;
       }
}





//



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
            else{
            
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
                     var url = _spPageContextInfo.webServerRelativeUrl+"/SitePages/BusinessCase.aspx#!/InitiatorLP";
                     $(location).attr('href', url);
                   //  alert('Welcome to the Business Case Initiator Dashboard!!');
                     return false;

                  }
               } else {
                  alert('You are not authorized to access the Business Case Initiator Dashboard!! Please contact your IT administrator.')

                  return false;
               }
            }
         } catch (e) {}
      },
      error: function () {

      }
   });

}


// GetRoleuser2-- REVIEWER

function GetRoleuser2() {
   var ReviewerRoleData = [];
   var col2 = {};
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
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
                  if (Logg[i].Role == "Reviewer") {
                     col2.EMail = Logg[i].Member.EMail;
                     col2.Role = Logg[i].Role;

                  }
                  ReviewerRoleData.push(col2);
               }
                
            }
            else{
            
             alert('You are not authorized to access the Business Case Reviewer Dashboard!! Please contact your IT administrator.')

                  return false;

            }

            var userInfo = _spPageContextInfo.userEmail;
            var reviewerrcount = 0;
            if (ReviewerRoleData.length >= 0) {
               for (var a = 0; a < ReviewerRoleData.length; i++) {
                  if (userInfo = ReviewerRoleData[a].EMail) {
                     if (ReviewerRoleData[a].EMail != 'undefined') {
                        reviewerrcount++;
                     }
                     if (reviewerrcount == 1) {
                        var url = _spPageContextInfo.webServerRelativeUrl+"/SitePages/BusinessCase.aspx#!/ReviewerLP";
                        $(location).attr('href', url);
                      //  alert('Welcome to the Business Case Reviewer Dashboard!!');
                        return false;
                     }
                  } else {
                     alert('You are not authorized to access the Business Case Reviewer Dashboard!! Please contact your IT administrator.')

                     return false;
                  }
               }
            }

         } catch (e) {}
      },
      error: function () {

      }
   });

}
// VALIDATOR -- GetRoleuser3
function GetRoleuser3() {
   var ValidatorRoleData = [];
   var col3 = {};
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
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

                  if (Logg[i].Role == "Validator") {
                     col3.EMail = Logg[i].Member.EMail;
                     col3.Role = Logg[i].Role;
                  }
                  ValidatorRoleData.push(col3);
               }

            }
            
              else{
            
             alert('You are not authorized to access the Business Case Validator Dashboard!! Please contact your IT administrator.')

                  return false;

            }


            var userInfo = _spPageContextInfo.userEmail;
            var validatorcount = 0;
            if (ValidatorRoleData.length > 0) {
               for (var a = 0; a < ValidatorRoleData.length; i++) {
                  if (userInfo = ValidatorRoleData[a].EMail) {
                     if (ValidatorRoleData[a].EMail != 'undefined') {
                        validatorcount++;
                     }
                     if (validatorcount == 1) {
                        var url = _spPageContextInfo.webServerRelativeUrl+"/SitePages/BusinessCase.aspx#!/ValidatorLP";
                        $(location).attr('href', url);
                      ///  alert('Welcome to the Business Case Validator Dashboard!!');
                        return false;
                     }
                  } else {
                     alert('You are not authorized to access the Business Case Validator Dashboard!! Please contact your IT administrator.')

                     return false;
                  }
               }

            }
         } catch (e) {}
      },
      error: function () {

      }
   });

}


var ReviewerRoleData = [];
 var ReviewCount1=0;
var colOLReview = {};
var colILReview = {};
var colANDAReview = {};

var ValidatorRoleData = [];
var ValidateCount1=0;
var colOLValidate = {};
var colILValidate = {};
var colANDAValidate = {};

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
         try {
            if (Logg.length > 0) {
               colOLReview.CaseStatus = Logg.length;  
               
		 if (Logg.length > 0) 
       {
		  
            for (var i = 0; i <Logg.length; i++) 
            {
               
                for (var j = 0; j < Logg[i].Reviewers.results.length; j++) 
                {
                     var gName=Logg[i].Reviewers.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colOLReview=parseInt(ReviewCount1)+1; 
                        ReviewerRoleData.push(colOLReview);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
            }
          
             
        }            
              
             // getUserInGroup(_spPageContextInfo.webAbsoluteUrl,_spPageContextInfo.userEmail);
              // ReviewerRoleData.push(colOLReview);
            }
          InlicensingReviewerPending(colOLReview);
         } catch (e) {}
      },
      error: function () {}
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
            for (var i = 0; i <Logg.length; i++) 
            {
               
                for (var j = 0; j < Logg[i].Reviewers.results.length; j++) 
                {
                     var gName=Logg[i].Reviewers.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colILReview=parseInt(ReviewCount1)+1; 
                        ReviewerRoleData.push(colILReview);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
            }

               }
               ANDAReviewerPending(colILReview);

            } catch (e) {}
         },
         error: function () {}
      });

   }
   
      function ANDAReviewerPending(colILReview) {

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
               
                  for (var i = 0; i <Logg.length; i++) 
            {
               
                for (var j = 0; j < Logg[i].Reviewers.results.length; j++) 
                {
                     var gName=Logg[i].Reviewers.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colANDAReview=parseInt(ReviewCount1)+1; 
                        ReviewerRoleData.push(colANDAReview);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
            }

             //   ReviewerRoleData.push(colANDAReview);  // FOR CAPEX
               }
            } catch (e) {}
         },
         error: function () {}
      });

   }

}





function Reviewerdataforreview() {
   OutlicensingReviewerPending();
	 var z = 0;   
   for (var k = 0; k < ReviewerRoleData.length; k++) {
      z = ReviewerRoleData[k]+ z;
   }
   $("#counter").append(z);   
   
        


}
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
            
             for (var i = 0; i <Logg.length; i++) 
            {
               
                for (var j = 0; j < Logg[i].Validators.results.length; j++) 
                {
                     var gName=Logg[i].Validators.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colOLValidate =parseInt(ValidateCount1)+1;    //var ValidatorRoleData = [];var colOLValidate = {};


                        ValidatorRoleData.push(colOLValidate);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
            }

               //colOLValidate.CaseStatus = Logg.length;
              // ValidatorRoleData.push(colOLValidate);
            }
            InlicensingValidatorPending(colOLValidate)

         } catch (e) {}
      },
      error: function () {}
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
                  for (var i = 0; i <Logg.length; i++) 
            {
               

                 
                    for (var j = 0; j < Logg[i].Validators.results.length; j++) 
                {
                     var gName=Logg[i].Validators.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colILValidate =parseInt(ValidateCount1)+1;    //var ValidatorRoleData = [];var colOLValidate = {};


                        ValidatorRoleData.push(colILValidate);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
                }
            }

               
                AndaValidatorPending(colANDAValidate)

            } catch (e) {}
         },
         error: function () {}
      });
   }
   
   
     function AndaValidatorPending(colANDAValidate) {
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
                for (var i = 0; i <Logg.length; i++) 
            {
               

               
                   for (var j = 0; j < Logg[i].Validators.results.length; j++) 
                {
                     var gName=Logg[i].Validators.results[j].Title;
                     var userExist= getUserInGroup(_spPageContextInfo.webAbsoluteUrl,gName)
                     if(userExist==true)
                     {
                     	//	parseInt(ReviewCount1)++;
                     	colANDAValidate =parseInt(ValidateCount1)+1;    //var ValidatorRoleData = [];var colOLValidate = {};


                        ValidatorRoleData.push(colANDAValidate);
                     //	colOLReview.push(ReviewCount1);
                        
                     // console.log(ReviewCount1)
                        // ReviewCount++;
                        //  break;					  
                        
                     //  $scope.ReviewArry.push($scope.ReviewerRoleData[i]);
                        //   break;
                           //alert("TRUE")
                     }
                  

                }
                }

               
               
                 // colANDAValidate.CaseStatus = Logg.length;  //colANDAValidate 
                 // ValidatorRoleData.push(colANDAValidate);
                  // fOR CAPEX AndaValidatorPending(colCAPEXValidate)
               }
            } catch (e) {}
         },
         error: function () {}
      });
   }

}


function ValidatordataforValidate() {
   OutlicensingValidatorPending();
   var e = 0
   //var y=ReviewerRoleData[p].CaseStatus;
   for (var l = 0; l < ValidatorRoleData.length; l++) {
      e = ValidatorRoleData[l]+ e;
   }
   $("#counter2").append(e);
}

//Initiation Data As Initiated  
function OutlicensingInitiatorPending() {
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('OutLicensingBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Initiators/EMail,Validators/Id,Validators/Title,Validators/EMail,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Initiators/EMail)) and CaseStatus eq 'Initiated'&$top=5000&$orderby=ID desc"
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
               colOLInitiate.CaseStatus = Logg.length;
               InitiatorRoleData.push(colOLInitiate);
            }
            InlicensingInitiatorPending(colOLInitiate)

         } catch (e) {}
      },
      error: function () {}
   });

   function InlicensingInitiatorPending(colOLInitiate) {
      var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InLicensingBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Initiators/EMail,Validators/Id,Validators/Title,Validators/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Validators&$filter=(substringof('" + _spPageContextInfo.userEmail + "',Initiators/EMail)) and CaseStatus eq 'Initiated'&$top=5000&$orderby=ID desc"
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
                  colILInitiate.CaseStatus = Logg.length;
                  InitiatorRoleData.push(colILInitiate);
               }
            } catch (e) {}
         },
         error: function () {}
      });
   }
}


function InitiatorInitiatedData() {
   OutlicensingInitiatorPending();
   var u = 0
   for (var s = 0; s < InitiatorRoleData.length; s++) {
      u = InitiatorRoleData[s].CaseStatus + u;
   }
   $("#counter1").append(u);
}








// 

 var getUserInGroup = function (urlValue, Gname) {
            var flag = false;
                var Surl = urlValue + "/_api/web/SiteGroups/GetByName('"+Gname+"')/users";
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
