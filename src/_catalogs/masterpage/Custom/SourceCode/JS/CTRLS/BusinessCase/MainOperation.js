angular.module("AppZone").requires.push('angularjs-dropdown-multiselect');

appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location) {
    $scope.currentSiteUrl = _spPageContextInfo.webAbsoluteUrl;
    var currentISODateTime = new Date().toISOString();
 //   var strEmpProfileURL = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + _spPageContextInfo.userLoginName + "'";
    var strRollURL = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('RoleMaster')/items?$select=*,Member/Title,Member/Name,Member/EMail&$expand=Member&$filter=Member/EMail eq '" + _spPageContextInfo.userEmail + "'&$orderby=ID desc&$top=5000";
    //Logics..getEmployeeProfile(strEmpProfileURL).then(function(userData) {
     // alert("hi");
      var urlColl = [strRollURL];
   //  Logics.getRolltData( strRollURL ).then(function (batchedData) 
   //    Logics.getRolltData( strRollURL )
   //   {
   //   // $location.path("/InitiatorDashboard");

   //   }
    
   // });
});
