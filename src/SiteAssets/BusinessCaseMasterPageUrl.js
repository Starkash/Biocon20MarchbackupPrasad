 $(document).ready(function() {
 tableurldata();
 

      
    });
 
  
 // var  hasFunctionBeenCalled = false;
  
         function tableurldata() {
         
       //  if (!hasFunctionBeenCalled) {
         //      hasFunctionBeenCalled = true;
               
            var listApiUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('URLMasterList')/items?$select=*&$filter=Status eq 'Active'&$orderby=ID &$top=5000";

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
                  var counter=1;
                  Logg.forEach(item => {
                  var $tableBody = $("#sharepoint-list tbody");
                     var row = $("<tr>");
                     row.html(`
                     <td>${counter++}</td>
                     <td>${item.Title}</td>
                     <td><a href="${item.UrlLink}" target="_blank"><i class="fa fa-eye"></i></a></td>`);//<i class="fa fa-eye"></i>
                     $tableBody.append(row);
                     

                  });         
                  
                  } catch (e) {}
               
               },
               error: function () {

               }
            });

         //}
      }


     function onClickHome(){  
    var url = _spPageContextInfo.webServerRelativeUrl+"/SitePages/BusinessCaseLP.aspx"; //BusinessCaseTemplate/Forms/AllItems.aspx
        $(location).attr('href', url);
       return false;

      }
    

    
    
   