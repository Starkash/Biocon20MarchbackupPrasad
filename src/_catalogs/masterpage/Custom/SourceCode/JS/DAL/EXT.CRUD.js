(function () {
    var batchGuid;
    var extRequestHeader = {
        getHeader: {
            'headers': {
                'X-RequestDigest': undefined,
                'accept': 'application/json;odata=verbose',
                'content-type': 'application/json;odata=verbose',
                'Cache-Control' : 'no-cache'
            }
        },
        postHeader: {
            'headers': {
                'X-RequestDigest': null,
                'content-type': 'application/json;odata=verbose',
                'accept': 'application/json;odata=verbose'
            }
        },
        deleteHeader: {
            'headers': {
                'X-RequestDigest': null,
                'accept': 'application/json;odata=verbose',
                'content-type': 'application/json;odata=verbose',
                'IF-MATCH': '*'
            }
        },
        updateHeader: {
            'headers': {
                'X-RequestDigest': null,
                'content-type': 'application/json;odata=verbose',
                'accept': 'application/json;odata=verbose',
                'IF-MATCH': '*',
                'X-HTTP-Method': 'MERGE'
            }
        },
        postFileHeader: {
            'headers': {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': null,
                'content-type': 'application/json;odata=verbose',
                'Content-Length': 'dataLength'
            }
        },
        batchHeader: {
            'headers': {
                'X-RequestDigest': null,
                'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
            }
        }
        // ,batchUpdateHeader: {
        //     'headers': {
        //         'X-RequestDigest': null,
        //         'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"',
        //         'Content-Length': 'dataLength',
        //         'Content-Transfer-Encoding': 'binary'
        //     }
        // }
    };

    angular.element(document).ready(function () {
        for (var p in extRequestHeader) {
            if (extRequestHeader.hasOwnProperty(p)) {
                //extRequestHeader[p].headers["X-RequestDigest"] = angular.element(document.querySelector('#__REQUESTDIGEST')).val();
            }
        }
    });

    //RequestHeader for get,post,update,delete
    //A service can have dependency on another service – Here we’ve used $http service
    var CRUD_EXT = function ($http, $q) {
        //Defining Function with parameter, 
        //same number of parameter we use when we invoke this function    

        var getData = function (urlValue) {
            return $http.get(urlValue, extRequestHeader.getHeader)
                .then(function (response) {
                    return response;
                });
        };

        var addData = function (urlValue, data) {
            return $http.post(urlValue, data, extRequestHeader.postHeader)
                .then(function (response) {
                    return response;
                }, function (response, status) {
                    return response;
                });
        };

        var deleteData = function (urlValue) {
            return $http.delete(urlValue, extRequestHeader.deleteHeader)
                .then(function (response) {
                    return response;
                });
        };

        var updateData = function (urlValue, data) {
            return $http.post(urlValue, data, extRequestHeader.updateHeader)
                .then(function (response) {
                    return response;
                });
        };

        var transactBulkData = function (urlValue, data) {
            return $http.post(urlValue, data, extRequestHeader.batchtHeader)
                .then(function (response) {
                    return response;
                });
        };

        var uploadFile = function (urlValue, data) {
            extRequestHeader.postFileHeader.headers["Content-Length"] = data.length;
            var deferred = $q.defer();

            $http({
                url: urlValue,
                method: "POST",
                data: new Uint8Array(data),
                transformRequest: [],
                processData: false,
                headers: extRequestHeader.postFileHeader.headers
            })
                .success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (result, status) {
                    deferred.reject(status);
                });

            return deferred.promise;
        };

        //When someone invokes this CRUD_SP function
        //then it'll return an Object that is of CRUD_SP
        return {
            //Pick up the Public API
            //name: function_name to call
            getData: getData,
            addData: addData,
            updateData: updateData,
            deleteData: deleteData,
            uploadFile: uploadFile,
            transactBulkData: transactBulkData
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
    module.factory('CRUD_EXT', CRUD_EXT);
}());