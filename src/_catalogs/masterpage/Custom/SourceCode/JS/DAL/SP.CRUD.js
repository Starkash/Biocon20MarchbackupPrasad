(function () {

    //RequestHeader for get,post,update,delete
    //A service can have dependency on another service – Here we’ve used $http service
    var CRUD_SP = function ($http, $q, Utilities, TokenHelper) {
        //Defining Function with parameter, 
        //same number of parameter we use when we invoke this function   

        var getFormDigest = function () {
            return $http.post(_spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo", null, Utilities.requestHeader.getContextHeader)
                .then(function (response) {
                    return response;
                }, function (response, status) {
                    return response;
                });
        };

        var getListData = function (urlValue) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.getHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.get(urlValue, Utilities.requestHeader.getHeader)
                    .then(function (response) {
                        return response;
                    }, function (response, status) {
                        return response;
                    });
            })
        };

        var getListDataCAML = function (urlValue, data) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.postHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.post(urlValue, data, Utilities.requestHeader.postHeader)
                    .then(function (response) {
                        return response;
                    });
            });
        };

        var addListData = function (urlValue, data) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.postHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.post(urlValue, data, Utilities.requestHeader.postHeader)
                    .then(function (response) {
                        return response;
                    }, function (response, status) {
                        return response;
                    });
            });
        };

        var deleteListData = function (urlValue) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.deleteHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.delete(urlValue, Utilities.requestHeader.deleteHeader)
                    .then(function (response) {
                        return response;
                    });
            });
        };

        var updateListData = function (urlValue, data) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.updateHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.post(urlValue, data, Utilities.requestHeader.updateHeader)
                    .then(function (response) {
                        return response;
                    });
            });
        };

        var transactBulkListData = function (urlValue, data) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.batchtHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                return $http.post(urlValue, data, Utilities.requestHeader.batchtHeader)
                    .then(function (response) {
                        return response;
                    });
            });
        };

        var uploadFile = function (urlValue, fileData) {
            return getFormDigest().then(function (contextResponse) {
                Utilities.requestHeader.postFileHeader.headers["X-RequestDigest"] = contextResponse.data.d.GetContextWebInformation.FormDigestValue;
                var deferred = $q.defer();
                var getFile = Utilities.getFileBuffer(fileData);
                getFile.done(function (arrayBuffer) {
                    //Utilities.requestHeader.postFileHeader.headers["Content-Length"] = arrayBuffer.byteLength;
                    $http({
                        url: urlValue,
                        method: "POST",
                        data: new Uint8Array(arrayBuffer),
                        transformRequest: [],
                        processData: false,
                        headers: Utilities.requestHeader.postFileHeader.headers
                    }).then(function (response) {
                        deferred.resolve(response);
                    }, function (response, status) {
                        deferred.reject(response);
                    });
                });



                return deferred.promise;
            });
        };

        var getAppContextListData = function (urlValue) {
            return TokenHelper.getAccessToken(urlValue);
        };
        var getUserInGroup = function (urlValue, Gname) {
            var flag = false;
            var Surl = urlValue + "/_api/web/SiteGroups/GetByName('" + Gname + "')/users";
            $.ajax({
                url: Surl,
                type: "GET",
                async: false,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#_REQUESTDIGEST").val()
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
                }
            });

            return flag;
        };
        //When someone invokes this CRUD_SP function
        //then it'll return an Object that is of CRUD_SP
        return {
            //Pick up the Public API
            //name: function_name to call
            getFormDigest: getFormDigest,
            getListData: getListData,
            getListDataCAML: getListDataCAML,
            addListData: addListData,
            updateListData: updateListData,
            deleteListData: deleteListData,
            uploadFile: uploadFile,
            transactBulkListData: transactBulkListData,
            getAppContextListData: getAppContextListData,
            getUserInGroup: getUserInGroup
        };
    };

    //Creating the reference to "AppZone" which we defined in Config.js and 
    //No 2nd parameter, bcz I'm not trying to create a Module
    //rest of the code goes above this module.
    var module = angular.module("AppZone");

    //Registering our service, so that Angular will use this
    //There are various ways to Register the service
    //This is simple and straightforward way,
    //Make use of method called 'factory('Name of the service', function name that returs an object)'
    module.factory('CRUD_SP', CRUD_SP);
}());