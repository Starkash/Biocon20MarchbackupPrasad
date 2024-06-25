$(document).ready(function () {
  ///GetBannerimage();

 

});

function GetBannerimage() {
   CurrLogUserId1 = _spPageContextInfo.userDisplayName;
   $("#CurrLogUserId").append(CurrLogUserId1);

   var siteUrl = _spPageContextInfo.webAbsoluteUrl;
   var oDataUrl =
      siteUrl +
      "/_api/web/lists/getbytitle('BannerImages')/items?$select=*&$filter=Status eq 'Active'";
   $.ajax({
      url: oDataUrl,
      type: "GET",
      dataType: "json",
      headers: {
         accept: "application/json;odata=verbose",
      },
      success: OnSuccess,
      error: OnFailure,
   });
}

function OnSuccess(data) {
   try {
      $("#menu1").empty();
      $.each(data.d.results, function (key, val) {
         if (val.imageURL != null && val.imageURL != undefined) {
            imgUrl = val.imageURL.Url;
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

      if (template == 'COMMERCIALS') {

      //  window.open("../SitePages/ELTCommercialsRBClp.aspx");
        location.href ="../SitePages/ELTCommercialsRBClp.aspx"

       //  window.location.replace("../SitePages/ELTCommercialsRBClp.aspx");
        // window.open("../SitePages/ELTCommercialsRBClp.aspx");
      
      }
      else if (template == 'ANDA') {

         
        
         //location.href ="../SitePages/BusinessCase.aspx#!/ELTReviewerILVsInHouseDash";

        // location.href ="../SitePages/ELTANDARBClp.aspx"
         //location.href ="https://biocon.sharepoint.com/sites/SPCustomApplDev/BusinessCaseAutomation/SitePages/ELTANDARBClp.aspx"


         // var url = _spPageContextInfo.webAbsoluteUrl+ "../SitePages/ELTANDARBClp.aspx";
         // window.location.href = url;
         location.href ="../SitePages/ELTANDARBClp.aspx"


      }

      else if (template == 'API') {
        // location.href ="../SitePages/ELTAPIRBClp.aspx"

         // var url = _spPageContextInfo.webAbsoluteUrl+ "../SitePages/ELTAPIRBClp.aspx";
         // window.location.href = url;

         location.href ="../SitePages/ELTAPIRBClp.aspx"


      
       //  window.open("../SitePages/ELTAPIRBClp.aspx");


      }

      else if (template == 'CAPEX') {
   

         location.href ="../SitePages/ELTCAPEXRBClp.aspx"

         
         // var url = _spPageContextInfo.webAbsoluteUrl+ "../SitePages/ELTCAPEXRBClp.aspx";
         // window.location.href = url;

        // window.open("../SitePages/ELTCAPEXRBClp.aspx");


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




