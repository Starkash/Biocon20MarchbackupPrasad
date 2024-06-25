$(document).ready(function () {

   GetBannerimage();
  

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





// }).when("/ELTReviewerAPIDash", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTAPIDashboard/ELTReviewerAPIDash.html",
//    controller: "ELTReviewerAPIDashCtrl"

// }).when("/ELTReviewerCAPEXDashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTCAPEXDashboard/ELTReviewerCAPEXDashboard.html",
//    controller: "ELTReviewerCAPEXDashboardCtrl"

// }).when("/ELTReviewerILVsInHouseDash", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTILnIHDashboard/ELTReviewerILVsInHouseDash.html",
//    controller: "ELTReviewerILVsInHouseDashCtrl"


// }).when("/ELTReviewerILDashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTInLicensingDashboard/ELTReviewerILDashboard.html",
//    controller: "ELTReviewerILDashboardCtrl"

// }).when("/ELTReviewerMultipleTenderBidDash", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTMultipleTenderBidDashboard/ELTReviewerMultipleTenderBidDash.html",
//    controller: "ELTReviewerMultipleTenderBidDashCtrl"

// }).when("/ELTReviewerOLDashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTOutLicensingDashboard/ELTReviewerOLDashboard.html",
//    controller: "ELTReviewerOLDashboardCtrl"



// }).when("/ELTReviewerSingleTenderBidDash", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTSingleTenderBidDashboard/ELTReviewerSingleTenderBidDash.html",
//    controller: "ELTReviewerSingleTenderBidDashCtrl"

// }).when("/ELTReviewerANDAUMEDashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUMEANDADashboard/ELTReviewerANDAUMEDashboard.html",
//    controller: "ELTReviewerANDAUMEDashboardCtrl"

// }).when("/ELTReviewerUSANDADashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUSANDADashboard/ELTReviewerUSANDADashboard.html",
//    controller: "ELTReviewerUSANDADashboardCtrl"

// }).when("/ELTReviewerUSMOWANDADashboard", {
//    templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUSMOWANDADashboard/ELTReviewerUSMOWANDADashboard.html",
//    controller: "ELTReviewerUSMOWANDADashboardCtrl"





function CheckELTGroup(template) {

   var gName = 'ELTReviewer';
   var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
   if (userExist == true) {

      if (template == 'Capex') {

         location.href ="../SitePages/BusinessCase.aspx#!/ELTReviewerCAPEXDashboard"

        //window.open("../SitePages/BusinessCase.aspx#!/ELTReviewerCAPEXDashboard");
       
      }
    


   }
   else {
      alert('You do not have access !! Please Contact with Administrator!!');
      return false
   }

}



var getUserInGroup = function (urlValue, Gname) {
   var flag = false;
   var Surl = urlValue + "/_api/web/SiteGroups/GetByName('" + Gname + "')/users";
   $.ajax({
      url: Surl,
      type: "GET",
      async: false,
      headers: {
         accept: "application/json;odata=verbose",
         "content-type": "application/json;odata=verbose",
         "X-RequestDigest": $("#_REQUESTDIGEST").val(),
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
      },
   });

   return flag;
};
