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




function CheckELTGroup(template) {

   var gName = 'ELTReviewer';
   var userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
   if (userExist == true) {

      if (template == 'API') {

         location.href ="../SitePages/BusinessCase.aspx#!/ELTReviewerAPIDash"


       // window.open("../SitePages/BusinessCase.aspx#!/ELTReviewerAPIDash");
       
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
