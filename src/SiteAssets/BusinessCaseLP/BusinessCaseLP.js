var vItemID;
var vTotalDocLength = 0;
var fileArray = [];
var otherfileArray=[];
var AttchLength=0;
var arraycount = 0;

$(document).ready(function () {
 
 /*$('title').text('NS Approver Form');
   

     vItemID= GetQueryStingValue()["Item"];
  var vTaskID= GetQueryStingValue()["Task"];
        TaxMaster(vItemID);
      SOEMaster(vItemID);
     RateMster();
RegionMaster();
getOtherDocDataForElIMaker(vItemID);
getOtherDocDataLatest(vItemID);
getOtherDocDataForNSChecker(vItemID);

     bindCGApplicationData(vItemID);
    // getOtherDocDataLatest(vItemID)
     $('#fileAttachInvoice').multifile();
     
     */
     
RoleMaster()
});


var GetMasterColl;
function RoleMaster() {
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";

   var requestHeaders = { "accept": "application/json;odata=verbose" };
   $.ajax({
       url: requestUri,
       contentType: "application/json;odata=verbose",
       headers: requestHeaders,
       async: false,
       cache: false,
       success: function (data) {
           RoleMasterColl= data.d.results;
       },
       error: function () {
           console.log("error");
       }
   });
}

/*
var RateMasterColl;
function RateMster() {
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RateMaster')//items?$top=500&$select=*,Title,ID&$orderby=ID asc";
   var requestHeaders = { "accept": "application/json;odata=verbose" };
   $.ajax({
       url: requestUri,
       contentType: "application/json;odata=verbose",
       headers: requestHeaders,
       async: false,
       cache: false,
       success: function (data) {
           RateMasterColl = data.d.results;
       },
       error: function () {
           console.log("error");
       }
   });
}

var SOEMasterColl;

function SOEMaster()
{
   var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('RenewalSOEDetails')//items?$top=500&$select=*&$orderby=ID asc";
   var requestHeaders = { "accept": "application/json;odata=verbose" };
   $.ajax({
       url: requestUri,
       contentType: "application/json;odata=verbose",
       headers: requestHeaders,
       async: false,
       cache: false,
       success: function (data) {
           SOEMasterColl = data.d.results;
       },
       error: function () {
           console.log("error");
       }
   });
}
var ToatalSanctionAmt=0;
var ExcludingCurrSanctionAmt=0;
var CGApplPANColl;
function CGApplPANCollData(vPANNo,CGColl) {
    //var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+vPANNo+"' and (Status eq 'Review by NABSaranrakshan' or Status eq 'Approved by NABSaranrakshan' or Status eq 'Payment Processed by ELI' or Status eq 'Payment Confirmed by NABSaranrakshan' or Status eq 'Payment Inititated by ELI' or Status eq 'Guarantee Issued'))";
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CGApplications')//items?$top=500&$select=*,FPOActivities111/FPOActivity,RegionOfFPO/Region,FPOState/State,BusinessFPOState/State,ELIChecker/Title&$expand=ELIChecker,RegionOfFPO,FPOActivities111,FPOState,BusinessFPOState&$filter=(PANFPO eq '"+vPANNo+"' and (Status eq 'Approved by NABSaranrakshan' or Status eq 'Payment Processed by ELI' or Status eq 'Payment Confirmed by NABSaranrakshan' or Status eq 'Payment Inititated by ELI' or Status eq 'Guarantee Issued' or Status eq 'Payment Inititated'))";
   var requestHeaders = { "accept": "application/json;odata=verbose" };
   $.ajax({
       url: requestUri,
       contentType: "application/json;odata=verbose",
       headers: requestHeaders,
       async: false,
       cache: false,
       success: function (data) {
           CGApplPANColl = data.d.results;
           if(CGApplPANColl.length>0)
           {
           
            for(var i=0;i<CGApplPANColl.length; i++)
                    {
                    var SOEDate=new Date(CGApplPANColl[i].SOEGeneratedDate)
                    var CurrDate=new Date();
                    var difference = SOEDate.getTime() - CurrDate.getTime();
                    var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
console.log(difference);
                    if(CGApplPANColl[i].Status=="Approved by NABSaranrakshan" && TotalDays > 60)
                    {
                    if(CGApplPANColl[i].SanctionedAmount!=null && CGApplPANColl[i].SanctionedAmount!='')
                    {
                    ToatalSanctionAmt=ToatalSanctionAmt+parseFloat(CGApplPANColl[i].SanctionedAmount);
                    }
                    }
                    else if(CGApplPANColl[i].Status!="Approved by NABSaranrakshan")
                    {
                    if(CGApplPANColl[i].SanctionedAmount!=null && CGApplPANColl[i].SanctionedAmount!='')
                    {
                    ToatalSanctionAmt=ToatalSanctionAmt+parseFloat(CGApplPANColl[i].SanctionedAmount);
                    }

                    }
                   
                    }
                    ExcludingCurrSanctionAmt=ToatalSanctionAmt;
                    if(CGColl[0].SanctionedAmount!='' && CGColl[0].SanctionedAmount!=null)
                    {
                    ToatalSanctionAmt=parseFloat(CGColl[0].SanctionedAmount) + parseFloat(ToatalSanctionAmt);
                    }

           }
           else{
            ToatalSanctionAmt=CGColl[0].SanctionedAmount;
           }
           
       },
       */
       error: function () {
           console.log("error");
       }
   });
}

