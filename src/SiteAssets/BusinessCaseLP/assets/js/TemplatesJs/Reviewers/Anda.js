$(document).ready(function () {
  GetBannerimage();
  MOWANDAReviewerPending();

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

var boolReviewerRole = "false";
var boolValidatorRole = "false";

var boolInitiatorRole = "false";

var boolReviewerRole = "false";

var boolValidatorRole = "false";

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

function GetReviewerRole(abc) {
  var ReviewerRoleData = [];
  var col2 = {};

  var r = $("#Reviewer option:selected").text();

  var requestUri =_spPageContextInfo.webAbsoluteUrl +"/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Role,Member/EMail,TemplateType,UserGroup/Id,UserGroup/Title&$expand=Member,UserGroup&$filter=(Role eq 'Reviewer' or Role eq 'SuperAdmin')&$orderby=ID desc&$top=5000";

  var requestHeaders = {
    accept: "application/json;odata=verbose",
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

          var filteredData = $.grep(Logg, function (item) {
            return item.TemplateType === abc;
         });
         console.log(filteredData);
          var userExist

         for (var p = 0; p < filteredData.length; p++) {

            var gName = filteredData[p].UserGroup.Title;
            userExist = getUserInGroup(_spPageContextInfo.webAbsoluteUrl, gName);
            
            

            ReviewerRoleCounter++;
            ReviewerNot = true;

                     if (userExist == true) {

            if (ReviewerNot == true) {
          
              if (abc == "ANDA - Inhouse US") {
                var url =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/BusinessCase.aspx#!/ReviewerUSANDADash";
                window.location.href = url;
              }
  
              if (abc == "ANDA - Inhouse US + MoW") {
                var url =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/BusinessCase.aspx#!/ReviewerUSMOWANDADash";
                window.location.href = url;
              }
  
              if (abc == "ANDA - Inhouse US +EU + MOW") {
                var url =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/BusinessCase.aspx#!/ReviewerUSANDAUMEDash";
                window.location.href = url;
              }
  
            }
         
}
         }

         

          if (ReviewerNot == false && ReviewerRoleCounter == 0) {
            alert(
              "You are not authorized to access  Please contact your IT administrator."
            );
            return false;
          }
        }
      } catch (e) {}
    },
    error: function () {},
  });
}

//ARVIND PAL  //Initiation Data As REVIEWED

function MOWANDAReviewerPending() {
  var requestUri =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc";

  var requestHeaders = {
    accept: "application/json;odata=verbose",
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
              var userExist = getUserInGroup(
                _spPageContextInfo.webAbsoluteUrl,
                gName
              );
              if (userExist == true) {
                //	parseInt(ReviewCount1)++;
                colANDAReview = parseInt(ReviewCount1) + 1;
                ReviewerRoleData.push(colANDAReview);
                arvind = true;
              }

              if (arvind == true) {
                $("#USAndaMOWcounter").empty();

                $("#USAndaMOWcounter").append(Logg.length);
              }
            }
          }
          USANDAReviewerPending(colANDAReview);

          //   ReviewerRoleData.push(colANDAReview);  // FOR CAPEX
        } else {
          USANDAReviewerPending(colANDAReview);
        }
      } catch (e) {}
    },
    error: function () {},
  });

  function USANDAReviewerPending(colANDAReview) {
    //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
    //  var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AndaBusinessCase')/items?$select=Id,CaseStatus,Title,InitiationDate,BusinessCaseName,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,Initiators/Title,Initiators/Id,Validators/Title,Validators/Id,Reviewers/Id,Reviewers/Title,Reviewers/EMail,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title&$expand=Strategy,SubStrategy,DosageForm,ProductName,CaseStage,Initiators,Reviewers,Validators&$filter= (substringof('" + _spPageContextInfo.userEmail + "',Reviewers/EMail)) and CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc"
    var requestUri =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/GetByTitle('USAndaBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc";

    var requestHeaders = {
      accept: "application/json;odata=verbose",
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
                var userExist = getUserInGroup(
                  _spPageContextInfo.webAbsoluteUrl,
                  gName
                );
                if (userExist == true) {
                  //	parseInt(ReviewCount1)++;
                  colUSANDAReview = parseInt(ReviewCount1) + 1;
                  ReviewerRoleData.push(colUSANDAReview);
                  arvind = true;
                }

                if (arvind == true) {
                  $("#USAndacounter").empty();
                  $("#USAndacounter").append(Logg.length);
                }
              }
            }
            ANDAUMEReviewerPending(colUSANDAReview);
          } else {
            ANDAUMEReviewerPending(colUSANDAReview);
          }
        } catch (e) {}
      },
      error: function () {},
    });
  }

  function ANDAUMEReviewerPending(colUSANDAReview) {
    var requestUri =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/GetByTitle('AndaUMEBusinessCase')/items?$select=Id,Title,BusinessCaseName,InitiationDate,Initiators/Title,Initiators/Id,Reviewers/Id,Reviewers/Title,DosageForm/Id,DosageForm/Title,Strategy/Id,Strategy/Title,SubStrategy/Id,SubStrategy/Title,ProductName/Id,ProductName/Title,CaseStage/Id,CaseStage/Title,CaseStatus&$expand=Strategy,CaseStage,SubStrategy,DosageForm,ProductName,Initiators,Reviewers&$filter=CaseStatus eq 'Under Internal Review'&$top=5000&$orderby=ID desc";

    var requestHeaders = {
      accept: "application/json;odata=verbose",
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
                var userExist = getUserInGroup(
                  _spPageContextInfo.webAbsoluteUrl,
                  gName
                );
                if (userExist == true) {
                  colANDAUMEReview = parseInt(ReviewCount1) + 1;
                  ReviewerRoleData.push(colANDAUMEReview);
                  arvind = true;
                }

                if (arvind == true) {
                  $("#AndaEMUcounter").empty();

                  $("#AndaEMUcounter").append(Logg.length);
                }
              }
            }
          }
        } catch (e) {}
      },
      error: function () {},
    });
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
