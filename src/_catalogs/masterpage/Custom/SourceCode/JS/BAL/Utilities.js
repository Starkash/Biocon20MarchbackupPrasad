var batchGuid;
(function () {
    'use strict';

    var Utilities = function ($uibModal, $http, $q, $document, $location) {

        var service = this;
        service.spHostUrl = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl;
        service.spWebUrl = _spPageContextInfo.webAbsoluteUrl;
        service.spWebBatchUrl = _spPageContextInfo.webAbsoluteUrl + '/_api/$batch';

        var requestHeader = {
            getContextHeader: {
                'headers': {
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose'
                }
            },
            getHeader: {
                'headers': {
                    'X-RequestDigest': null,
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose'
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
            for (var p in requestHeader) {
                if (requestHeader.hasOwnProperty(p)) {
                    requestHeader[p].headers["X-RequestDigest"] = angular.element(document.querySelector('#__REQUESTDIGEST')).val();
                }
            }
        });

        var getEntityTypeFullName = function (listName) {
            return "SP.Data." + listName.replace(' ', '_x0020_') + "ListItem";
        };

        /*
        * @name generateUUID
        * @description
        * Generates a GUID-like string, used in OData HTTP batches.
        * 
        * @returns {string} - A GUID-like string.
        */
        var generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return uuid;
        };

        var getFileData = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();

            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            }

            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }

            reader.readAsArrayBuffer(file);

            return deferred.promise;
        };

        var buildInsertBatchContent = function (urlValue, data) {
            batchGuid = generateUUID();

            // creating the body  
            var batchContents = new Array();
            var changeSetId = generateUUID();

            // for each record...  
            for (var n = 0; n < data.length; n++) {

                var record = data[n];

                // create the request endpoint  
                var endpoint = urlValue;

                // create the changeset  
                batchContents.push('--changeset_' + changeSetId);
                batchContents.push('Content-Type: application/http');
                batchContents.push('Content-Transfer-Encoding: binary');
                batchContents.push('');
                batchContents.push('POST ' + endpoint + ' HTTP/1.1');
                batchContents.push('Content-Type: application/json;odata=verbose');
                batchContents.push('');
                batchContents.push(JSON.stringify(record));
                batchContents.push('');
            }
            // END changeset to create data  
            batchContents.push('--changeset_' + changeSetId + '--');

            // generate the body of the batch  
            var batchBody = batchContents.join('\r\n');
            // start with a clean array
            batchContents = new Array();

            // create batch for creating items
            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
            batchContents.push('Content-Length: ' + batchBody.length);
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push(batchBody);
            batchContents.push('');

            // create request in batch to get all items after all are created
            endpoint = urlValue + '/items?$orderby=Title';

            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: application/http');
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push('GET ' + endpoint + ' HTTP/1.1');
            batchContents.push('Accept: application/json;odata=verbose');
            batchContents.push('');

            batchContents.push('--batch_' + batchGuid + '--');

            batchBody = batchContents.join('\r\n');

            // create the batch
            console.log(batchBody);
            return batchBody;
        };

        var buildUpdateBatchContent = function (urlValue, data) {
            batchGuid = generateUUID();

            // creating the body  
            var batchContents = new Array();
            var changeSetId = generateUUID();

            // for each record...  
            for (var n = 0; n < data.length; n++) {

                var record = data[n];

                // create the request endpoint  
                var endpoint = urlValue + "/Items(" + record.Id + ")";

                // create the changeset  
                batchContents.push('--changeset_' + changeSetId);
                batchContents.push('Content-Type: application/http');
                batchContents.push('Content-Transfer-Encoding: binary');
                batchContents.push('');
                batchContents.push('PATCH ' + endpoint + ' HTTP/1.1');
                batchContents.push('Content-Type: application/json;odata=verbose');
                batchContents.push('Accept: application/json;odata=verbose');
                batchContents.push('IF-MATCH: *');
                batchContents.push('');
                batchContents.push(JSON.stringify(record));
                batchContents.push('');
            }
            // END changeset to create data  
            batchContents.push('--changeset_' + changeSetId + '--');

            // generate the body of the batch  
            var batchBody = batchContents.join('\r\n');

            // start with a clean array
            batchContents = new Array();

            // create batch for update items
            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
            batchContents.push('Content-Length: ' + batchBody.length);
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push(batchBody);
            batchContents.push('');

            // create request in batch to get all items after update
            endpoint = urlValue + '/items?$orderby=Title';

            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: application/http');
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push('GET ' + endpoint + ' HTTP/1.1');
            batchContents.push('Accept: application/json;odata=verbose');
            batchContents.push('');

            batchContents.push('--batch_' + batchGuid + '--');

            batchBody = batchContents.join('\r\n');

            // create the batch
            console.log(batchBody);

            return batchBody;
        };

        var buildDeleteBatchContent = function (urlValue, data) {
            // generate a batch boundary
            batchGuid = generateUUID();

            // creating the body
            var batchContents = new Array();
            var changeSetId = generateUUID();

            // for each driver...
            for (var n = 0; n < data.length; n++) {

                var record = data[n];

                // create the request endpoint
                var endpoint = urlValue + '/items(' + record.Id + ')';

                // create the changeset
                batchContents.push('--changeset_' + changeSetId);
                batchContents.push('Content-Type: application/http');
                batchContents.push('Content-Transfer-Encoding: binary');
                batchContents.push('');
                batchContents.push('DELETE ' + endpoint + ' HTTP/1.1');
                batchContents.push('If-Match: *');
                batchContents.push('');
            }
            // END changeset to delete data
            batchContents.push('--changeset_' + changeSetId + '--');

            // generate the body of the batch
            var batchBody = batchContents.join('\r\n');

            // start with a clean array
            batchContents = new Array();

            // create batch for deleting items
            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: multipart/mixed; boundary="changeset_' + changeSetId + '"');
            batchContents.push('Content-Length: ' + batchBody.length);
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push(batchBody);
            batchContents.push('');

            // create request in batch to get all items after all are deleted
            endpoint = data + '/items?$orderby=Title';


            batchContents.push('--batch_' + batchGuid);
            batchContents.push('Content-Type: application/http');
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push('GET ' + endpoint + ' HTTP/1.1');
            batchContents.push('Accept: application/json;odata=verbose');
            batchContents.push('');

            batchContents.push('--batch_' + batchGuid + '--');

            batchBody = batchContents.join('\r\n');

            // create the batch
            console.log(batchBody);
        };

        var modalInstance;
        var uibModalInst;
        var openDialogBox = function ($scope, refObj, templateUrl, redirectingTo) {
            modalInstance = $uibModal.open({
                templateUrl: templateUrl,
                scope: $scope,
                size: 'lg',
                backdrop: 'static',
                resolve: {},
                animation: true,
                keyboard: false,
                controller: function ($scope, $uibModalInstance) {
                    uibModalInst = $uibModalInstance;
                    // $('.modal').on('show.bs.modal', function (e) {
                    //     $('.modal .modal-dialog').attr('class', 'modal-dialog flipInX animated');
                    // });
                    // $('.modal').on('hide.bs.modal', function (e) {
                    //     $('.modal .modal-dialog').attr('class', 'modal-dialog flipOutX animated');
                    // });
                    $scope.closeInstance = function () {
                        $uibModalInstance.close(refObj);
                        if (redirectingTo != "" && redirectingTo != null && redirectingTo != undefined) {
                            $location.path(redirectingTo);
                        }
                    };
                    $scope.closeDialogBox = function () {
                        $uibModalInstance.dismiss('cancel');
                        if (redirectingTo != "" && redirectingTo != null && redirectingTo != undefined) {
                            $location.path(redirectingTo);
                        }
                    };
                }
            }).result.catch(function (res) {
                if (!(res === 'cancel' || res === 'escape key press')) {
                    throw res;
                }
            });
        };

        var closeDialogBox = function ($uibModalInstance) {
            uibModalInst.dismiss('cancel');
        };

        var initiateDailogBox = function (scope, response, message, redirectTo) {
            scope.alert = {
                Title: "Information",
                Message: "",
                Type: "Information",
                Error: {
                    Message: "",
                    Status: "",
                    Code: "",
                    Detail: ""
                }
            };



            var templateUrl = _spPageContextInfo.siteAbsoluteUrl + "/_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/AlertBox.html";
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                scope.alert.Message = message;
            }
            else {
                templateUrl = _spPageContextInfo.siteAbsoluteUrl + "/_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ErrorAlertBox.html";
                scope.alert.Title = "Error";
                scope.alert.Message = "";
                scope.alert.Type = "Error";
                scope.alert.Error.Message = "An error has occurred during this transistion. Below are the details, please share it with administrator.";
                scope.alert.Error.Status = response.statusText;
                scope.alert.Error.Code = response.data.error.code;
                scope.alert.Error.Detail = response.data.error.message.value;
            }
            openDialogBox(scope, null, templateUrl, redirectTo);
        };

        var sendEmail = function (url, from, to, cc, subject, body) {
            var data = JSON.stringify({
                'properties': {
                    '__metadata': {
                        'type': 'SP.Utilities.EmailProperties'
                    },
                   // 'From': from,//'BLSPONLPWASVC@BIOCON.COM',//
                    'To': {
                        'results': to
                    },
                    'CC': {
                        'results': cc
                    },
                    'Body': body,
                    'Subject': subject,
                    'AdditionalHeaders': {
                        "__metadata": { "type": "Collection(SP.KeyValue)" },
                        "results":
                            [
                                {
                                    "__metadata": {
                                        "type": 'SP.KeyValue'
                                    },
                                    "Key": "From:",
                                    "Value": from, // here you can change the From
                                    "ValueType": "Edm.String"
                                },
                                {
                                    "__metadata": {
                                        "type": 'SP.KeyValue'
                                    },
                                    "Key": "content-type",
                                    "Value": 'text/html',
                                    "ValueType": "Edm.String"
                                }
                            ]
                    }
                }
            });

            return $http.post(url, data, requestHeader.postHeader)
                .then(function (response) {
                    return response;
                }, function (response, status) {
                    return response;
                });
        };

        var currentFinancialYear = function () {
            var fiscalyear = "";

            var today = new Date();
            if ((today.getMonth() + 1) <= 3) {
                fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
            }
            else {
                fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
            }
            return fiscalyear;
        }

        var previousFinancialYear = function () {
            var fiscalyear = currentFinancialYear();
            var PreYear = fiscalyear.split('-');
            var Year1 = PreYear[0];
            Year1 = parseInt(Year1);
            var Year2 = PreYear[1];
            Year2 = parseInt(Year2);
            var PreviousYear = (Year1 - 1) + "-" + (Year2 - 1);
            return PreviousYear;
        }

        var nextFinancialYear = function () {
            var fiscalyear = currentFinancialYear();
            var NextYear = fiscalyear.split('-');
            var Year1 = NextYear[0];
            Year1 = parseInt(Year1);
            var Year2 = NextYear[1];
            Year2 = parseInt(Year2);
            var NextYear = (Year1 + 1) + "-" + (Year2 + 1);
            return NextYear;
        }

        var getFinancialYear = function (enteredDate) {
            var financialYear;
            var fiscalyear;
            if ((enteredDate.getMonth() + 1) <= 3) {
                fiscalyear = enteredDate.getFullYear();
                financialYear = (fiscalyear - 1) + "-" + fiscalyear
            }
            else {
                fiscalyear = enteredDate.getFullYear();
                financialYear = fiscalyear + "-" + (fiscalyear + 1)
            }

            return financialYear;
        }

        var shuffleArray = function (array) {
            var m = array.length, t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        }

        var getAllWeeksOfMonth = function (year, month) {
            window['moment-range'].extendMoment(moment);
            var startDate = moment.utc([year, month]);
            // Get the first and last day of the month
            var firstDay = moment(startDate).startOf('month');
            var endDay = moment(startDate).endOf('month');

            // Create a range for the month we can iterate through
            var monthRange = moment.range(firstDay, endDay);

            // Get all the weeks during the current month
            var weeks = []
            // for (var mday of monthRange.by('days')) {
            //     if (weeks.indexOf(mday.week()) === -1) {
            //         weeks.push(mday.week());
            //     }
            // }

            // Create a range for each week
            var calendar = []
            for (var index = 0; index < weeks.length; index++) {
                var weeknumber = weeks[index];

                var firstWeekDay = moment().year(year).month(month).week(weeknumber).day(1); //0-Sunday
                var lastWeekDay = moment().year(year).month(month).week(weeknumber).day(7); //7-Saturday
                if (month == 11 && (weeks.length - 1) == index) {
                    firstWeekDay = moment().year(year).month(month).week(weeks[index - 1]).day(1);
                    firstWeekDay.add(7, "day");
                    lastWeekDay = moment().year(year).month(month).week(weeks[index - 1]).day(7);
                    lastWeekDay.add(6, "day");
                }

                // console.log("First day of week", firstWeekDay, weeknumber);
                // console.log("Last day of week", lastWeekDay, weeknumber);

                if (firstWeekDay.isBefore(firstDay)) {
                    firstWeekDay = firstDay;
                }

                if (lastWeekDay.isAfter(endDay)) {
                    lastWeekDay = endDay;
                }
                //console.log("week number: " + index + " day: " + firstWeekDay.format("DD-MM-YYYY") + " to " + lastWeekDay.format("DD-MM-YYYY"));
                //document.write("<br>week number: " + index + " day: " + firstWeekDay.format("DD-MM-YYYY") + " to " + lastWeekDay.format("DD-MM-YYYY"))
                var weekRange = moment.range(firstWeekDay, lastWeekDay);
                calendar.push({ "WeekRange": weekRange, "FirstWeekDay": firstWeekDay, "LastWeekDay": lastWeekDay });
            }
            console.log(calendar);
            return calendar;
        }

        var getAllWeeksOfYear = function (year) {
            window['moment-range'].extendMoment(moment);
            var dates = [];
            var startDate = moment('31-03-' + year, 'DD-MM-YYYY');
            var endDate = moment('31-03-' + (year + 1), 'DD-MM-YYYY');

            var currDate = moment(startDate).startOf('day');
            var lastDate = moment(endDate).startOf('day');

            while (currDate.add(1, 'days').diff(lastDate) <= 0) {
                console.log(currDate.toDate());
                dates.push(currDate.clone().toDate());
            }
            // Get all the weeks of year
            var weeks = []

            for (var i = 0; i < dates.length; i++) {
                var weekRange;
                var w = i + 6;
                if (w <= (dates.length - 1)) {
                    weekRange = moment.range(moment(dates[i]), moment(dates[w]));
                    weeks.push({ "WeekRange": weekRange, "FirstWeekDay": moment(dates[i]), "LastWeekDay": moment(dates[w]) });
                }
                else {
                    weekRange = moment.range(moment(dates[i]), moment(dates[dates.length - 1]));
                    weeks.push({ "WeekRange": weekRange, "FirstWeekDay": moment(dates[i]), "LastWeekDay": moment(dates[dates.length - 1]) });
                }
                i = w;
            }
            console.log(weeks);
            return weeks;
        }

        var getDistinctValues = function (collection, objKey) {
            var newArray = [];

            angular.forEach(collection, function (value, key) {
                var exists = false;
                angular.forEach(newArray, function (val2, key) {
                    if (angular.equals(value[objKey], val2[objKey])) { exists = true };
                });
                if (exists == false && value[objKey] != "") { newArray.push(value); }
            });

            return newArray;
        }

        var getFileBuffer = function (uploadFile) {
            var deferred = jQuery.Deferred();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            }
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            }
            reader.readAsArrayBuffer(uploadFile);
            return deferred.promise();
        }
        //SNEHAL
        var initializePeoplePickerMul = function (peoplePickerElementId) {

            // Create a schema to store picker properties, and set the properties.
            var schema = {};
            schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = true;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = '280px';
            // Render and initialize the picker.
            // Pass the ID of the DOM element that contains the picker, an array of initial
            // PickerEntity objects to set the picker value, and a schema that defines
            // picker properties.
            SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
        };
        var initializePeoplePickerSig = function (peoplePickerElementId) {
            // Create a schema to store picker properties, and set the properties.
            var schema = {};
            schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = false;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = '280px';
            // Render and initialize the picker.
            // Pass the ID of the DOM element that contains the picker, an array of initial
            // PickerEntity objects to set the picker value, and a schema that defines
            // picker properties.
            SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
        };

        // var initializePeoplePickerDef= function (peoplePickerElementId) {
        //     // Create a schema to store picker properties, and set the properties.
        //     var schema = {};
        //     schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        //     schema['SearchPrincipalSource'] = 15;
        //     schema['ResolvePrincipalSource'] = 15;
        //     schema['AllowMultipleValues'] = false;
        //     schema['MaximumEntitySuggestions'] = 50;
        //     schema['Width'] = '280px';
        //     // Render and initialize the picker.
        //     // Pass the ID of the DOM element that contains the picker, an array of initial
        //     // PickerEntity objects to set the picker value, and a schema that defines
        //     // picker properties.

        //     var user=new Array(1);
        //     user[0]=12;
        //     SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, user, schema);
        // };
        var getUserInfo = function (peoplePickerElementId) {
            var UsersID = "";
            var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerElementId + "_TopSpan"];

            if (peoplePicker.HasInputError) return false; // if any error
            else if (!peoplePicker.HasResolvedUsers()) return false; // if any invalid users
            else if (peoplePicker.TotalUserCount > 0) {
                // Get information about all users.
                var users = peoplePicker.GetAllUserInfo();
                //var userInfo = '';
                //var promise = '';
                for (var i = 0; i < users.length; i++) {
                    UsersID += users[i].DisplayText + "\n";
                    UsersID += users[i].EntityData.Email;
                }
                // Get user keys.
                var keys = peoplePicker.GetAllUserKeys();
                var finalusers = new Array();
                for (var i = 0; i < users.length; i++) {
                    var arryuser = users[i];
                    finalusers.push(SP.FieldUserValue.fromUser(arryuser.Key));
                }
                return finalusers;
            }
        };
        var getUrlParameter = function (name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
        var SetUserFieldValue = function (fieldName, LoginName) {

            var _PeoplePicker = $("div[title='" + fieldName + "']");
            var _PeoplePickerTopId = _PeoplePicker.attr('id');
            var _PeoplePickerEditer = $("input[title='" + fieldName + "']");
            var usrObj = { 'Key': LoginName };
            var _PeoplePickerOject = SPClientPeoplePicker.SPClientPeoplePickerDict[_PeoplePickerTopId + "_TopSpan"];
            _PeoplePickerOject.AddUnresolvedUser(usrObj, true);
            //disable the field
            // _PeoplePickerOject.SetEnabledState(false);
            //hide the delete/remove use image from the people picker
            //  $('.sp-peoplepicker-delImage').css('display', 'none');
        };
        //

        return {
            requestHeader: requestHeader,
            getEntityTypeFullName: getEntityTypeFullName,
            generateUUID: generateUUID,
            getFileData: getFileData,
            buildInsertBatchContent: buildInsertBatchContent,
            buildUpdateBatchContent: buildUpdateBatchContent,
            buildDeleteBatchContent: buildDeleteBatchContent,
            openDialogBox: openDialogBox,
            initiateDailogBox: initiateDailogBox,
            closeDialogBox: closeDialogBox,
            sendEmail: sendEmail,
            currentFinancialYear: currentFinancialYear,
            previousFinancialYear: previousFinancialYear,
            nextFinancialYear: nextFinancialYear,
            getFinancialYear: getFinancialYear,
            shuffleArray: shuffleArray,
            getAllWeeksOfMonth: getAllWeeksOfMonth,
            getAllWeeksOfYear: getAllWeeksOfYear,
            getDistinctValues: getDistinctValues,
            getFileBuffer: getFileBuffer,
            initializePeoplePickerMul: initializePeoplePickerMul,
            initializePeoplePickerSig: initializePeoplePickerSig,
            getUserInfo: getUserInfo,
            getUrlParameter: getUrlParameter,
            SetUserFieldValue: SetUserFieldValue
        };
    }

    var module = angular.module("AppZone");

    module.filter('trim', function () {
        return function (value) {
            if (!angular.isString(value)) {
                return value;
            }
            return value.replace(/\s+/g, ''); // you could use .trim, but it's not going to work in IE<9
        };
    });

    module.filter("unique", function () {
        // we will return a function which will take in a collection
        // and a keyname
        return function (collection, keyname) {
            // we define our output and keys array;
            var output = [],
                keys = [];

            // we utilize angular's foreach function
            // this takes in our original collection and an iterator function
            angular.forEach(collection, function (item) {
                // we check to see whether our object exists
                var key = item[keyname];
                // if it's not already part of our keys array
                if (keys.indexOf(key) === -1) {
                    // add it to our keys array
                    keys.push(key);
                    // push this item to our final output array
                    output.push(item);
                }
            });
            // return our array which should be devoid of
            // any duplicates
            return output;
        };
    });

    module.factory('Utilities', Utilities);

}());

