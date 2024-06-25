
$(document).ready(function () {
 //  var LoggedUserId=_spPageContextInfo.userDisplayName
     //    GetUserinfo();
        // GetRoleuser();
         });
         
                 
   function GetUserinfo() {
   
    userInfo =_spPageContextInfo.userDisplayName;
    $("#CurrLogUserId").append('<span>' + userInfo + '</span>');
   
    
   }
         
 
   
  