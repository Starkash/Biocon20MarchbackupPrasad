$(document).ready(function () {
   
   GetBannerimage();
   CapexValidatorPending();


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




var boolReviewerRole = 'false';
var boolValidatorRole = 'false';

var boolInitiatorRole = 'false';

var boolReviewerRole = 'false';

var boolValidatorRole = 'false';

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


function GetValidatorRole(abc) {

   var ReviewerRoleData = [];
   var col2 = {};
   var requestUri =_spPageContextInfo.webAbsoluteUrl +"/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Role,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=(Role eq 'Validator' or Role eq 'SuperAdmin')&$orderby=ID desc&$top=5000";
  
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

               
               var filteredData = $.grep(Logg, function (item) {
                  return item.TemplateType === abc;
               });
               console.log(filteredData);
      
               for (var p = 0; p < filteredData.length; p++) {
      
                  var gName = filteredData[p].UserGroup.Title;
                  var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
                  
                  
               if (userExist == true) {
                  ValidatorRoleCounter++;
                  ValidatorrNot = true;
      
                  if (ValidatorrNot == true) {
                
                    if (abc == "Capex") {
                      var url =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/BusinessCase.aspx#!/ValidatorCAPEXDash";
                      window.location.href = url;
                    }
        
                   
        
                  }
               }

      
               }

              


               if (ValidatorrNot== false && ValidatorRoleCounter == 0) {
                  alert('You are not authorized to access  Please contact your IT administrator.')
                  return false;

               }

            }

         } catch (e) { }
      },
      error: function () {

      }
   });

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
                          
                           colCAPEXValidate = parseInt(ValidateCount1) + 1;    //var ValidatorRoleData = [];var colOLValidate = {};


                           ValidatorRoleData.push(colCAPEXValidate);

                           arvind = true
                        }


                     }

                     if (arvind == true) {

                        $("#ValCapexcounter").empty();
                        $("#ValCapexcounter").append(Logg.length);


                     }

                  }
               }
            } catch (e) { }
         },
         error: function () { }
      });
   }


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
