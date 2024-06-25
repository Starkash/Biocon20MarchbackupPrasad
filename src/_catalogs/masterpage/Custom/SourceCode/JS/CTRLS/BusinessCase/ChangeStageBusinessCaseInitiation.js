/*appOperations.controller("BioconMainCtrl", function ($scope, $http, $filter, $q, $window, $timeout, $route, $routeParams, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {
    // $scope.routeReload = function () {
    //     $route.reload();
    // }
});*/
appOperations.controller("ChangeBusinessCaseInitiationCtrl", function ($scope, $http, $filter, $q, $timeout, $route, $interval, NgTableParams, Logics, Utilities, $uibModal, $uibModalStack, $rootScope, $location, $dialogs) {

    if (Logics.getSharedData() == undefined) {
        $location.path('/InitiatorDashboard');
    } else {
        $scope.BcInitiateDetails = Logics.getSharedData();
        $scope.IntiateID = $scope.BcInitiateDetails.Id;
    }

    var peoplePickerUsers = [];
    $scope.AllpeoplePickerUsers = [];
    Utilities.initializePeoplePickerMul('MultiplepeoplePickerNotify');
    var strMarketUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('MarketMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strTemplateNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseTemplateName')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strTreatmentCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('TreatmentCategoryMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strInnovatorUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('InnovatorMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strCountryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('CountryMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strBrandUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BrandMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strStrengthUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('StrengthMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strBcReqUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseRequests')/items?&$select=AttachmentFiles,Modified,Id,Title,GenericisationScenario,Site,InitiatorComments,FilingType,AttachmentFiles,Title,Strategy,PartnerFilingStrategy,BioconfilingDate,API,GenericFilers,Yearofgeneralisation,MfgSite,OBApprovals,NoofUSDMF,BusinessCaseTemplateId,BusinessCaseTemplate/Title,CFTuserId,CFTuser/Title,CFTuser/EMail,Market/Id,Market/Title,Country/Id,Country/Title,BrandName/Id,BrandName/Title,Classification,Innovator/Id,Innovator/Title,MoleculeName/Id,MoleculeName/Title,Strength/Id,Strength/Title,PackSize,Dosage,Sector,ProductName/Id,ProductName/Title,ProductCategory/Id,ProductCategory/Title,DateofInitiation,Worksheet,TreatmentCategory/Id,TreatmentCategory/Title,CurrentDevelopmentStatus,BusinessCaseStages,BusinessCaseID&$expand=BusinessCaseTemplate,AttachmentFiles,CFTuser,Market,Country,BrandName,Innovator,MoleculeName,Strength,ProductCategory,ProductName,TreatmentCategory&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc"
    //var strBcReqUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('BusinessCaseRequests')/items?&$select=Id,BusinessCaseName,Title,GenericisationScenario,Site,BusinessCaseTemplateId,BusinessCaseTemplate/Title,CFTuserId,CFTuser/Title,CFTuser/EMail,Market/Id,Market/Title,Country/Id,Country/Title,BrandName/Id,BrandName/Title,Classification,Innovator/Id,Innovator/Title,MoleculeName/Id,MoleculeName/Title,Strength/Id,Strength/Title,PackSize,Dosage,Sector,ProductName/Id,ProductName/Title,ProductCategory/Id,ProductCategory/Title,DateofInitiation,Worksheet,TreatmentCategory/Id,TreatmentCategory/Title,CurrentDevelopmentStatus,BusinessCaseStages,BusinessCaseID&$expand=BusinessCaseTemplate,CFTuser,Market,Country,BrandName,Innovator,MoleculeName,Strength,ProductCategory,ProductName,TreatmentCategory&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc"
    //var strProductNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strProductCategoryUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('ProductCategoryMaster')/items?&$select=*&$top=5000&$orderby=ID desc";
    var strProductNameUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProductMaster')/items?$select=ProductCategoryName/Title,ProductCategoryName/Id&$expand=ProductCategoryName&$top=5000&$orderby=ID desc"; /// cascading
    var strAttachement = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('BusinessCaseRequests')/items?$select=*,AttachmentFiles,Title&$expand=AttachmentFiles&$filter=ID eq '" + $scope.IntiateID + "'&$top=5000&$orderby=ID desc";
    var strBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseDocument')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";
    var strBusinessCaseDocumentLinkUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseDocument')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title,File/Name,File/ServerRelativeUrl&$expand=File,BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=ID desc&$top=1";


    var urlColl = [strMarketUrl, strTemplateNameUrl, strTreatmentCategoryUrl, strInnovatorUrl, strCountryUrl, strBrandUrl, strStrengthUrl, strBcReqUrl, strProductCategoryUrl, strProductNameUrl, strAttachement, strBusinessCaseDocumentUrl, strBusinessCaseDocumentLinkUrl];

    Logics.getBatchedData(_spPageContextInfo.webAbsoluteUrl, urlColl).then(function (batchedData) {
        $scope.MarketColl = batchedData[0].d.results;
        $scope.TemplateNameColl = batchedData[1].d.results;
        $scope.TreatmentCategoryColl = batchedData[2].d.results;
        $scope.InnovatorColl = batchedData[3].d.results;
        $scope.CountryColl = batchedData[4].d.results;
        $scope.BrandColl = batchedData[5].d.results;
        $scope.StrengthColl = batchedData[6].d.results;
        $scope.BcRquestColl = batchedData[7].d.results;
        $scope.ProductMasterColl = batchedData[8].d.results;
        $scope.ProductCategoryColl = batchedData[9].d.results;
        $scope.AttachementsColl = batchedData[10].d.results;        
        $scope.businessCaseDocumentColl = batchedData[11].d.results;
        $scope.BusinessCaseDocumentLinkColl = batchedData[12].d.results;

        // $.ajax({
        //     url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers",
        //     type: "GET",
        //     headers: {
        //         "Accept": "application/json;odata=verbose"
        //     },
        //     success: function (data) {
        //         AllpeoplePickerUsers = data.d.results;
        //         $scope.AllpeoplePickerUsers = AllpeoplePickerUsers;
        //         console.log(AllpeoplePickerUsers);
        //         for (var i = 0; i < AllpeoplePickerUsers.length; i++) {
        //             var property = AllpeoplePickerUsers[i].Title;
        //             var usrEmil = AllpeoplePickerUsers[i].Email;
        //             peoplePickerUsers.push(property);
        //         }
        //         console.log(peoplePickerUsers);
        //     },
        //     error: function (error) {
        //         alert(JSON.stringify(error));
        //     }
        // });

        $scope.bindCommo = function (ddlProductCategory) {
            $scope.getProductame = $scope.ProductMasterColl.filter(function (item) {
                return (item.ProductCategoryNameId == $scope.ddlProductCategory);
            });
        }
        $scope.isLoading = false;
        if ($scope.BcRquestColl.length > 0) {

            if ($scope.BcRquestColl[0].BioconfilingDate != null && $scope.BcRquestColl[0].BioconfilingDate != '' && $scope.BcRquestColl[0].BioconfilingDate != undefined) {
                $scope.Bioconfillingdate = new Date($scope.BcRquestColl[0].BioconfilingDate);
            }
            if ($scope.BcRquestColl[0].Yearofgeneralisation != null && $scope.BcRquestColl[0].Yearofgeneralisation != '' && $scope.BcRquestColl[0].Yearofgeneralisation != undefined) {
                $scope.Yearofgen = new Date($scope.BcRquestColl[0].Yearofgeneralisation);
            }
            $scope.Businesscasename = $scope.BcRquestColl[0].Title;
            $scope.ddltreatmentcategory = $scope.BcRquestColl[0].TreatmentCategory.Title;
            $scope.ddlbrand = $scope.BcRquestColl[0].BrandName.Title;
            $scope.ddltemplatename = $scope.BcRquestColl[0].BusinessCaseTemplate.Title;
            $scope.ddlInnovator = $scope.BcRquestColl[0].Innovator.Title;
            $scope.genscenario = $scope.BcRquestColl[0].GenericisationScenario;
            $scope.site = $scope.BcRquestColl[0].Site;
            $scope.FillingType = $scope.BcRquestColl[0].FilingType;
            $scope.PartnerFillingStrategy = $scope.BcRquestColl[0].PartnerFilingStrategy;
            $scope.API = $scope.BcRquestColl[0].API;
            $scope.GenericFilers = $scope.BcRquestColl[0].GenericFilers;
            $scope.MfgSite = $scope.BcRquestColl[0].MfgSite;
            $scope.Strategy = $scope.BcRquestColl[0].Strategy;
            $scope.ObApproval = $scope.BcRquestColl[0].OBApprovals;
            $scope.NoofUSDMF = $scope.BcRquestColl[0].NoofUSDMF;
            $scope.DateofInitiation = new Date($scope.BcRquestColl[0].DateofInitiation);
            $scope.CurrentDevlopStatus = $scope.BcRquestColl[0].CurrentDevelopmentStatus;
            $scope.ddlCountry = $scope.BcRquestColl[0].Country.Title;
            $scope.ddlmarket = $scope.BcRquestColl[0].Market.Title;
            $scope.Businesscaseid = $scope.BcRquestColl[0].BusinessCaseID;
            $scope.ddlProductCategory = $scope.BcRquestColl[0].ProductCategory.Title;
            $scope.ddlProductName = $scope.BcRquestColl[0].ProductName.Title;
            $scope.BusinesscaseStage = $scope.BcRquestColl[0].BusinessCaseStages;
            $scope.InitiatorComments1 = $scope.BcRquestColl[0].InitiatorComments;
            $scope.Modified = $scope.BcRquestColl[0].Modified;


            if($scope.businessCaseDocumentColl.length>0){
                $scope.MajorV= Math.floor($scope.businessCaseDocumentColl[0].CaseVersion);
                $scope.MinorV= parseFloat($scope.businessCaseDocumentColl[0].CaseVersion).toFixed(1);
                if( $scope.MajorV==$scope.MinorV){
                    $scope.VersionFlag="Major Version";
    
                }
                else{
                    $scope.VersionFlag="Minor Version";
                }
            }

            if ($scope.BusinessCaseDocumentLinkColl.length > 0) {
                for (var s = 0; s < $scope.BusinessCaseDocumentLinkColl.length; s++) {
                    $scope.BusinessCaseDocumentLinkColl[s].DocID = $scope.BusinessCaseDocumentLinkColl[s].ID;
                    $scope.BusinessCaseDocumentLinkColl[s].Fname = $scope.BusinessCaseDocumentLinkColl[s].File.Name;
                    $scope.BusinessCaseDocumentLinkColl[s].ServRel = location.origin + $scope.BusinessCaseDocumentLinkColl[0].File.ServerRelativeUrl;

                }
            } else {
                $scope.BusinessCaseDocumentLinkColl = "";
            }


            // for (var z = 0; z < $scope.BcRquestColl[0].CFTuser.results.length; z++) {
            //     $scope.pickmul = $scope.BcRquestColl[0].CFTuser.results[z].EMail
            //     Utilities.SetUserFieldValue('MultiplepeoplePickerNotify', $scope.pickmul);

            // }

            $scope.selectDosage = ['Cap', 'Oral'];
            $scope.check = false;
            for (var z = 0; z < $scope.BcRquestColl[0].Dosage.results.length; z++) {
                var pickmul = $scope.BcRquestColl[0].Dosage.results[z];
                if (pickmul == $scope.selectDosage[0]) {
                    $scope.capChecked = true;
                }
                if (pickmul == $scope.selectDosage[1]) {
                    $scope.oralChecked = true;
                }
            }

        }
    

    });
    var fileCounter = 0;

    $scope.onInitiationSubmit = function () {
       // $scope.InitatorIDS.push(_spPageContextInfo.userId);


        if ($scope.InitiatorComments == '' || $scope.InitiatorComments == undefined) {
            alert("Please Enter Initiator Comments ")
            return false;
        }
        
        if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined) {
            alert("Please Select Stage ")
            return false;
        }
        

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.BusinessCaseRequestsListItem"
            },
            BusinessCaseStages: $scope.ChagneBusinesscaseStage,

            InitiatorComments: $scope.InitiatorComments
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse) {
            console.log(Changeresponse);

            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/BusinessCaseDocument/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (Math.floor($scope.businessCaseDocumentColl[0].CaseVersion) + 1).toFixed(1).toString() + ".xlsb";
            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.businessCaseDocumentColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseDocument')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title&$expand=BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.BusinessCaseDocumentItem"
                        },
                        CaseVersion: (Math.floor($scope.businessCaseDocumentColl[0].CaseVersion) + 1).toFixed(1)
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseDocument')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {

                            $scope.UploadAttachment($scope.IntiateID).then(function (Vresponse) {
                                alert("Business Case Updated Successfully");
                                $location.path("/InitiatorDashboard");

                            });
                        } else {
                            alert("Business Case Updated Successfully");
                            $location.path("/InitiatorDashboard");
                        }
                    });
                });
            });

        });

    }


    $scope.onCreateVersion = function () {

   
        
        if ($scope.ChagneBusinesscaseStage == '' || $scope.ChagneBusinesscaseStage == undefined) {
            alert("Please Select Stage ")
            return false;
        }
        if ($scope.InitiatorComments == '' || $scope.InitiatorComments == undefined) {
            alert("Please Enter Initiator Comments ")
            return false;
        }

        var BcChangeStage = {

            __metadata: {
                type: "SP.Data.BusinessCaseRequestsListItem"
            },
             BusinessCaseStages: $scope.ChagneBusinesscaseStage,

            InitiatorComments: $scope.InitiatorComments
        }

        var updateBusinessCaseRequestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + $scope.IntiateID + ")";
        Logics.updateData(updateBusinessCaseRequestUrl, BcChangeStage).then(function (Changeresponse) {
            console.log(Changeresponse);
            //$scope.UploadAttachment($scope.IntiateID);




            // var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
            // if ($scope.preQScoreFile != null && $scope.preQScoreFile != undefined && $scope.preQScoreFile != "") {
            //     $scope.uploadAttachments($scope.IntiateID);
            // }

            var strNewBusinessCaseDocumentRelativeUrl = _spPageContextInfo.siteServerRelativeUrl + "/BusinessCaseDocument/" + $scope.Businesscaseid + "-" + $scope.Businesscasename + "-V" + (parseFloat($scope.businessCaseDocumentColl[0].CaseVersion) + 0.1).toFixed(1) + ".xlsb";
            var strCopyBusinessCaseDocumentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + $scope.businessCaseDocumentColl[0].File.ServerRelativeUrl + "')/copyto(strnewurl='" + strNewBusinessCaseDocumentRelativeUrl + "',boverwrite=true)";
            Logics.addData(strCopyBusinessCaseDocumentUrl, null).then(function (response) {
                console.log(response);

                var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('BusinessCaseDocument')/items?$select=Id,Title,CaseVersion,BusinessCaseId,BusinessCase/Title&$expand=BusinessCase&$filter=BusinessCaseId eq " + $scope.IntiateID + "&$orderby=Id desc&$top=1";

                Logics.getData(strBusinessCaseDocumentVersionUrl).then(function (docResponse) {
                    var newBusinessCaseDocID = docResponse.data.d.results[0].Id;

                    var BcVersion = {
                        __metadata: {
                            type: "SP.Data.BusinessCaseDocumentItem"
                        },
                        CaseVersion: (parseFloat($scope.businessCaseDocumentColl[0].CaseVersion) + 0.1).toFixed(1).toString()
                    };

                    var strBusinessCaseDocumentVersionUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseDocument')/items(" + newBusinessCaseDocID + ")";

                    Logics.updateData(strBusinessCaseDocumentVersionUrl, BcVersion).then(function (Vresponse) {
                        console.log(Vresponse);
                        alert("Business Case Updated Successfully");
                        $location.path("/InitiatorDashboard");

                    });
                });
            });

        });

    }

    var deferred = $q.defer();
    $scope.UploadAttachment = function (IntiateID) {
        if ($scope.BcAttachFileNew != null && $scope.BcAttachFileNew != undefined && $scope.BcAttachFileNew != "") {
            var BCReqAttachmentUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + IntiateID + ")/AttachmentFiles/add(FileName='" + ((new Date().getTime() * 10000) + 621355968000000000).toString() + $scope.BcAttachFileNew[fileCounter].name + "')";
            Logics.uploadFile(BCReqAttachmentUrl, $scope.BcAttachFileNew[fileCounter]).then(function (BCAttachmentResponse) {

                console.log(BCAttachmentResponse);
                fileCounter++;
                if (fileCounter < $scope.BcAttachFileNew.length) {
                    $scope.UploadAttachment(IntiateID)
                } else {
                    deferred.resolve(null);
                }
            });

        } else {
            deferred.resolve(null);
        }
        return deferred.promise;
    }




    // var fileName = '';
    // var fileName1 = '';
    // $scope.UploadAttachment = function (objCarPremiumID) {
    //     fileInput = $('#uploadFile');
    //     if (fileInput[0].files.length == 0) {
    //         fileName = '';
    //     } else {
    //         fileName = fileInput[0].files[0].name;
    //         $scope.fileInputFile = fileInput[0].files[0];
    //         if ($scope.AttachementsColl.length > 0) {
    //             $scope.count = 0;
    //             for (var j = 0; j < $scope.AttachementsColl[0].AttachmentFiles.results.length; j++) {
    //                 fileName1 = $scope.AttachementsColl[0].AttachmentFiles.results[j].FileName;
    //                 if (fileName == fileName1) {
    //                     fileName = ($scope.count) + "_" + fileName1;
    //                 } else {}
    //                 $scope.count++;
    //             }
    //         }
    //         var digest = "";
    //         $.ajax({
    //             url: "/_api/contextinfo",
    //             method: "POST",
    //             async: false,
    //             headers: {
    //                 "ACCEPT": "application/json;odata=verbose",
    //                 "content-type": "application/json;odata=verbose"
    //             },
    //             success: function (data) {
    //                 digest = data.d.GetContextWebInformation.FormDigestValue;
    //             },
    //             error: function (data) {}
    //         }).done(function () {
    //             var reader = new FileReader();
    //             reader.onload = function (e) {
    //                 var fileData = e.target.result;
    //                 var res11 = $.ajax({
    //                     url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('BusinessCaseRequests')/items(" + objCarPremiumID + ")/AttachmentFiles/add(FileName='" + fileName + "')",
    //                     method: "POST",
    //                     binaryStringRequestBody: true,
    //                     data: fileData,
    //                     processData: false,
    //                     async: false,
    //                     headers: {
    //                         "ACCEPT": "application/json;odata=verbose",
    //                         "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
    //                         "content-length": fileData.byteLength
    //                     },
    //                     success: function (data) {
    //                         console.log(data);
    //                         // alert("Item Added!!");
    //                         $("#uploadFile").empty();
    //                         $("#uploadFile").val('');
    //                     },
    //                     error: function (data) {
    //                         console.log("Error occured." + data.responseText);
    //                     }
    //                 });
    //             };
    //             reader.readAsArrayBuffer($scope.fileInputFile);

    //         });
    //     }
    // }
    $scope.onInitiationCancel = function () {
        $location.path("/InitiatorDashboard");

    }

});