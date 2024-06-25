(function () {

    var Logics = function ($http, CRUD_SP, CRUD_EXT, SP_BatchUtil, $q, $filter, Utilities) {
        //Defining Function with parameter, 
        //same number of parameter we use when we invoke this function
        var getData = function (urlValue) {
            return CRUD_SP.getListData(urlValue);
        };

        //         var getRolltData = function (urlValue) {

        //            // return CRUD_SP.getListData(urlValue);
        //          CRUD_SP.getListData(urlValue).then(function (test) 
        //      	{
        //      	 var RoleColl =test.data.d.results[0];// test.d.results;
        //      if(RoleColl)
        //      {
        //     var CurrentLoggedRole=RoleColl.Role;
        //      if(CurrentLoggedRole=='Initiator')
        //      {
        //     // return "/InitiatorDashboard";
        //       window.location.href =_spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCase.aspx#!/InitiatorLP";
        //       //https://sharepointistech.sharepoint.com/sites/Biocon/SitePages/BusinessCase.aspx#!/InitiatorDashboard

        //      }
        //      else  if(CurrentLoggedRole=='Reviewer')
        //      {
        //      window.location.href =_spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCase.aspx#!/ReviewerLP";
        //  //return "/ReviewerDashboard";


        //      }
        //      else  if(CurrentLoggedRole=='Validator')
        //      {
        //      var abc="/ValidatorDashboard";
        //       //return 
        //        window.location.href =_spPageContextInfo.webAbsoluteUrl +"/SitePages/BusinessCase.aspx#!/ValidatorLP";


        //      }
        //      }
        //      else
        //      {
        //     window.location.href = _spPageContextInfo.webAbsoluteUrl;

        //      }

        //      	 });


        //         };



        var getExtData = function (urlValue) {
            return CRUD_EXT.getData(urlValue);
        };

        var getDataCAML = function (urlValue, objCAMLQuery) {
            return CRUD_SP.getListDataCAML(urlValue, objCAMLQuery);
        };

        var getEmployeeProfile = function (urlValue) {
            if (_spPageContextInfo.userData == null || _spPageContextInfo.userData == undefined || _spPageContextInfo.userData == "") {
                _spPageContextInfo.userData = CRUD_SP.getListData(urlValue);
            }
            return _spPageContextInfo.userData;
        };

        var addData = function (urlValue, data) {
            return CRUD_SP.addListData(urlValue, data);
        };

        var updateData = function (urlValue, data) {
            return CRUD_SP.updateListData(urlValue, data);
        };

        var deleteData = function (urlValue) {
            return CRUD_SP.deleteListData(urlValue);
        };

        var getBatchedData = function (urlValue, tranUrlColl) {
            //return SP_BatchUtil.makeBatchRequests(urlValue, tranUrlColl, angular.element(document.querySelector('#__REQUESTDIGEST')).val());
            return SP_BatchUtil.makeBatchRequests(urlValue, tranUrlColl, false);
        };

        var queryUrl;
        var bulkData;

        var dfd;
        var proms = []
        var getDataForThresholdHandling = function (fillData, filterConditions, inDex) {
            if (dfd == undefined) {
                dfd = $q.defer();
            }
            getData(queryUrl).then(function (response) {
                //response.data.d.results.concat(response.data.d.results);
                fillData.d.results = fillData.d.results.concat(response.data.d.results);
                // for (let l = 0; l < response.d.results.length; l++) {
                //     fillData.d.results.push(response.d.results[l]);
                // }
                if (response.data.d.__next) {
                    queryUrl = response.data.d.__next;
                    var prom = getDataForThresholdHandling(fillData, filterConditions, inDex);
                    proms.push(prom);
                } else {
                    //fillData.d.results = response.data.d.results;
                    //$q.all(proms).then(function(){
                    var allFilteredData = $filter('filter')(fillData.d.results, function (value) {
                        return value.EmployeeID.ID == filterConditions.EmployeeID.EmployeeID;//12231
                    });
                    bulkData[inDex].d.results = allFilteredData;
                    fillData.d.results = allFilteredData;
                    dfd.resolve(allFilteredData);
                    //return fillData;
                    //});      
                }
            });
            return dfd.promise;
        }

        var getBatchedDataThresholdHandled = function (urlValue, tranUrlColl, onThresholdFailUrlColl, onThresholdFailFilterColl) {
            var promises = [];
            var deferred = $q.defer();
            //SP_BatchUtil.makeBatchRequests(urlValue, tranUrlColl, angular.element(document.querySelector('#__REQUESTDIGEST')).val()).then(function (queryData) {
            SP_BatchUtil.makeBatchRequests(urlValue, tranUrlColl, false).then(function (queryData) {
                bulkData = queryData;
                for (var n = 0; n < bulkData.length; n++) {
                    if (bulkData[n]["odata.error"] != undefined) {
                        if (bulkData[n]["odata.error"].code == "-2147024860, Microsoft.SharePoint.SPQueryThrottledException") {
                            queryUrl = onThresholdFailUrlColl[n];
                            bulkData[n].d = { "results": [] };
                            var promise = getDataForThresholdHandling(bulkData[n], onThresholdFailFilterColl[n], n).then(function (allData) {
                                // var allFilteredData = $filter('filter')(allData.d.results, function(value) {
                                //     return value.EmployeeID.EmployeeID == onThresholdFailFilterColl[n].EmployeeID.EmployeeID;
                                // });
                                //bulkData[n].d.results = allData;
                            });
                            promises.push(promise);
                        }
                    }
                }
                $q.all(promises).then(function () {
                    //return bulkData;
                    deferred.resolve(bulkData);
                });
            });
            return deferred.promise;
        };

        var postBatchedData = function (urlValue, tranUrlColl) {
            //return SP_BatchUtil.makePostBatchRequests(urlValue, tranUrlColl, angular.element(document.querySelector('#__REQUESTDIGEST')).val());
            return SP_BatchUtil.makePostBatchRequests(urlValue, tranUrlColl, false);
        };

        var getAppContextData = function (urlValue) {
            return CRUD_SP.getAppContextListData(urlValue);
        };

        var sharedData;

        var setSharingData = function (data) {
            sharedData = data;
        }

        var getSharedData = function () {
            return sharedData;
        }
		
		    /// new changes by Arvind-- Handle Redirection of view page on multiple condition//
    var setSharingDataTwoDash = function (data,a) {
        sharedData = [data,a];
       //DashShareDate=a;
    }
    var getSharedDataTwoDash = function () {
        return sharedData;
    }
/// new changes by Arvind--


        var uploadFile = function (urlValue, fileData) {
            return CRUD_SP.uploadFile(urlValue, fileData);
        }

        var getUserInGroup = function (urlValue, fileData) {
            return CRUD_SP.getUserInGroup(urlValue, fileData);
        }

        // ARVIND    
        var openDocumentVersionHistory = function (docData) {
            var docLibUri = docData.__metadata.uri
            var docLibGuid = docLibUri.substring(docLibUri.lastIndexOf("guid") + 5).split('\'')[0];
            var options =
            {
                title: 'Version History - ' + docData.File.Name,
                url: _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/Versions.aspx?list={' + docLibGuid + '}&ID=' + docData.Id + '&IsDlg=1',
                width: 900
            }

            SP.UI.ModalDialog.showModalDialog(options);
            setTimeout(function () {
                document.getElementById("dlgTitleBtns").style.marginRight = '0px';
            }, 1000)
        }
        //ARVIND
        var numberOfGroups = 0;
        var groupColl = [];
        var emailAddress = [];
        var emailDeferred = $q.defer();

        var sendEmailToGroups = function (toGroupsColl, ccGroupsColl, subject, body) {
            groupColl = toGroupsColl;
            var toEmailAddress = [];
            emailDeferred = $q.defer();
            return getGroupMembersEmail(numberOfGroups).then(function (resp) {
                toEmailAddress.push(...resp);

                numberOfGroups = 0;
                groupColl = ccGroupsColl;
                emailAddress = [];

                var ccEmailAddress = [];
                emailDeferred = $q.defer();
                return getGroupMembersEmail(numberOfGroups).then(function (resp) {
                    ccEmailAddress.push(...resp);
                    groupColl = [];
                    numberOfGroups = 0;
                    emailAddress = [];

                    return Utilities.sendEmail(_spPageContextInfo.webAbsoluteUrl + "/_api/SP.Utilities.Utility.SendEmail", _spPageContextInfo.userEmail, toEmailAddress, ccEmailAddress, subject, body);
                });
            });
        }

        var getGroupMembersEmail = function (groupNumber) {
            if (groupColl.length > 0) {
                CRUD_SP.getListData(_spPageContextInfo.webAbsoluteUrl + "/_api/web/SiteGroups/GetByName('" + groupColl[groupNumber] + "')/users").then(function (response) {
                    numberOfGroups++;
                    for (var i = 0; i < response.data.d.results.length; i++) {
                        emailAddress.push(response.data.d.results[i].Email);
                    }
                    if (numberOfGroups <= groupColl.length - 1) {
                        getGroupMembersEmail(numberOfGroups);
                    }
                    else {
                        emailDeferred.resolve(emailAddress);
                    }
                }, function (response, status) {
                    emailDeferred.reject(response);
                });
            }
            else {
                emailDeferred.resolve(emailAddress);
            }
            return emailDeferred.promise;
        }

        return {
            //name: function_name to call
            getData: getData,
            //  getRolltData:getRolltData,
            getExtData: getExtData,
            getDataCAML: getDataCAML,
            getEmployeeProfile: getEmployeeProfile,
            addData: addData,
            updateData: updateData,
            deleteData: deleteData,
            postBatchedData: postBatchedData,
            getBatchedData: getBatchedData,
            getBatchedDataThresholdHandled: getBatchedDataThresholdHandled,
            setSharingData: setSharingData,
            getSharedData: getSharedData,
            getAppContextData: getAppContextData,
            uploadFile: uploadFile,
            openDocumentVersionHistory: openDocumentVersionHistory, //ARV
            getUserInGroup: getUserInGroup,
            sendEmailToGroups: sendEmailToGroups,
			setSharingDataTwoDash:setSharingDataTwoDash,
			getSharedDataTwoDash:getSharedDataTwoDash
			
        };
    };


    var module = angular.module("AppZone");

    module.factory('Logics', Logics);
}());

