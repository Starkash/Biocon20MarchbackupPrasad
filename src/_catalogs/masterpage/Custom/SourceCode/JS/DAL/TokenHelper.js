(function () {
    var TokenHelper = function ($http, $q, Utilities) {

        var tenantID = "f87a5f5e-f97e-4aec-bab8-6e4187ef4f1c";
        var principalID = "00000003-0000-0ff1-ce00-000000000000";
        var accessControlUrl = "https://accounts.accesscontrol.windows.net/"+tenantID+"/tokens/OAuth/2";
        var clientID = "b2b93ba7-8ace-4c92-a6a0-ee0929e3bfb0";
        var clientSecret = "Cy/BgsSJuno/gbf6sT1Aox8RmxWtRe/oqYcfYgJa1F4=";
        
        var getAccessToken = function(siteUrl){
            //var headers = getRealmNtenantID(siteUrl);
            var domain = getDomain();
            Utilities.requestHeader.postHeader = {
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            var data = {
                grant_type: 'client_credentials',
                client_id: getFormattedPrincipal(clientID, false, tenantID),
                client_secret: clientSecret,
                resource: getFormattedPrincipal(principalID, domain, tenantID)
            };
            return $http.post(accessControlUrl, data, Utilities.requestHeader.postHeader)
                .then(function (response) {
                    return response;
                }, function (response, status) {
                    return response;
            });
        };

        var getDomain = function(){
            var spWebAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl.split('://')[1];
            var start = spWebAbsoluteUrl.indexOf('/');
            return spWebAbsoluteUrl.substring(0, start);        
        }

        var getFormattedPrincipal = function(principalName, hostName, realm){
            var name;
            if (hostName) {
                name = principalName + "/" + hostName + "@" + realm;
            } else {
                name = principalName + "@" + realm;
            }
            return name;        
        }

        var getRealmNtenantID = function(urlValue){
            Utilities.requestHeader.getHeader = {
                'headers': {
                    'Authorization': 'Bearer',
                    'X-RequestDigest': null,
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose'
                }
            };
            return $http.get(urlValue+"/_vti_bin/client.svc/", Utilities.requestHeader.getHeader)
                .then(function (response) {
                    return response;
                });
        }

        return{
            getAccessToken: getAccessToken
        }
    }

    var module = angular.module("AppZone");

    module.factory('TokenHelper', TokenHelper);
}());


// var request = require('request');
// var jwt = require('jsonwebtoken');
// var q = require('q');

// module.exports = {
//     GetAccessTokenFromContextTokenRequest: GetAccessTokenFromContextTokenRequest
// }
// /**
//  * Private
//  */
// function GetContextTokenFromRequest(obj) {
//     return obj.refreshtoken;
// }
// function GetFormattedPrincipal(principalName, hostName, realm) {
//     var name;
//     if (hostName) {
//         name = principalName + "/" + hostName + "@" + realm;
//     } else {
//         name = principalName + "@" + realm
//     }
//     console.log('Formated princial :', name)
//     return name
// }
// /**
//  * Public
//  */
// function GetAccessTokenFromContextTokenRequest(spInfo, client_ID, appSecret) {
//     var defer = q.defer()
//     var decoded = jwt.decode(spInfo.SPAppToken, appSecret);
//     decoded.appctx = JSON.parse(decoded.appctx);
//     var domain = getDomain(spInfo.SPSiteUrl);
//     var appctx = decoded.appctx
//     var params = decoded['appctxsender'].split('@')
//     var form = {
//         "grant_type": "refresh_token",
//         "client_id": GetFormattedPrincipal(client_ID, false, params[1]),
//         "client_secret": appSecret,
//         "refresh_token": decoded.refreshtoken,
//         "resource": GetFormattedPrincipal(params[0], domain, params[1])
//     }
//     var headers = { "Content-Type": "application/x-www-form-urlencoded" }
//     var options = {
//         headers: headers,
//         form: form
//     }
//     var callback = function (erro,response) {
//         defer.resolve({erro:erro, body: response.body, domain: domain,spInfo:spInfo });
//     };
//     request.post(appctx.SecurityTokenServiceUri, options, callback);
//     return defer.promise;
// }
// function getDomain(SPSiteUrl) {
//     SPSiteUrl = SPSiteUrl.split('://')[1];
//     var start = SPSiteUrl.indexOf('/');
//     return SPSiteUrl.substring(0, start)
// }
// function getSite(url) {
//     url = url.split('://')[1];
//     return url
// }