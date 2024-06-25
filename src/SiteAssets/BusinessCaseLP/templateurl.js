$(document).ready(function () {
   tableurldata();



});


// var  hasFunctionBeenCalled = false;

function tableurldata() {

   //  if (!hasFunctionBeenCalled) {
   //      hasFunctionBeenCalled = true;

   //var listApiUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseTemplate')/items?$select=*&$orderby=ID &$top=5000";
  // var listApiUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseTemplate')/items?$select=File/Name,File/ServerRelativeUrl&$expand=File&$orderby=ID &$top=5000";
   var listApiUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseTemplate')/items?$select=File/Name,File/ServerAbsoluteUrl&$expand=File&$orderby=ID &$top=5000";
  
 var requestHeaders = {
      "accept": "application/json;odata=verbose"
   };
   $.ajax({
      url: listApiUrl,
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      async: false,
      cache: false,
      method: "GET",
      success: function (data) {
         var Logg = data.d.results;
         try {

            var counter = 1;
         /*   Logg.forEach(item => {
               var $tableBody = $("#template-list tbody");
               var row = $("<tr>");
row.html(`
    <td>${counter++}</td>
    <td>${item.File.Name}</td>                  
    <td><a href="${item.File.ServerRelativeUrl}"><i class="fa fa-eye"></i></a></td>`);
               $tableBody.append(row);

            }); */
            
            var $tableBody = $("#template-list tbody");
/*for (var i = 0; i < Logg.length; i++) {
    var item = Logg[i];
    
    var row = $("<tr>");

    row.html(`
        <td>${counter++}</td>
        <td>${item.File.Name}</td>                  
        <td><a href="${item.File.ServerRelativeUrl}"><i class="fa fa-eye"></i></a></td>`);*/
        
        
        for (var i = 0; i < Logg.length; i++) {
    var item = Logg[i];
     var excel ='ms-excel:ofv|u|';
    var root ='https://biocon.sharepoint.com';
   
     
  //  var new=item.File.ServerRelativeUrl;
    
      // var total=root+excel+new;
       
    var row = $("<tr>");

    row.html(`
        <td>${counter++}</td>
        <td>${item.File.Name}</td>                  
        <td><a href="ms-excel:ofv|u|${item.File.ServerAbsoluteUrl}"><i class="fa fa-eye"></i></a></td>`);
    
    $tableBody.append(row);
}







         } catch (e) { }

      },
      error: function () {

      }
   });

   //}
}


function onClickHome() {
   var url = _spPageContextInfo.webServerRelativeUrl + "/SitePages/BusinessCaseLP.aspx"; //BusinessCaseTemplate/Forms/AllItems.aspx
   $(location).attr('href', url);
   return false;

}




