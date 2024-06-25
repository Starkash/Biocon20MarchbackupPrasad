var rss2JsonURL = "https://api.rss2json.com/v1/api.json?rss_url=";
var rss2JsonApiKey = "&api_key=mge7g63hb4q4lxfgh3qvjelbaq6pwfwocnyqi3lm";

var appOperations = angular.module("AppZone", ['ngRoute', 'ngTouch', 'ngResource', 'ngSanitize', 'ngAnimate', 'ngTable', 'ui.bootstrap', 'chart.js', 'dialogs', 'angularjs-dropdown-multiselect', 'angular.filter', 'ngFileUpload'])

    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript|im|callto|#|ms-excel|ms-word):/);
    }]);

(function () {
    appOperations.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
        $routeProvider.when("/BusinessCaseInitiation", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCase/AddBusinessCaseInitiation.html",
            controller: "AddBusinessCaseInitiationCtrl"
        }).when("/EditBusinessCaseInitiation", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCase/EditBusinessCaseInitiation.html",
            controller: "EditBusinessCaseInitiationCtrl"
        }).when("/ChangeStageBusinessCaseInitiation", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCase/ChangeStageBusinessCaseInitiation.html",
            controller: "ChangeBusinessCaseInitiationCtrl"
        }).when("/ViewBusinessCaseRequestInitiation", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCase/ViewBusinessCaseRequest.html",
            controller: "ViewBusinessCaseInitiationCtrl"
        }).when("/InitiatorDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCase/InitiatorDashboard.html",
            controller: "InitiatorCtrl"
        }).when("/ReviewerDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseReviewer/ReviewerDashboard.html",
            controller: "ReviewerDashboardCtrl"
        }).when("/BusinessCaseReviewer", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseReviewer/BusinessCaseReviewer.html",
            controller: "ReviewerCtrl"
        }).when("/BusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseReviewer/ReviewerView.html",
            controller: "ViewReviewerCtrl"
        }).when("/ValidatorDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseValidator/ValidatorDashboard.html",
            controller: "ValidatorDashboardCtrl"
        }).when("/BusinessCaseValidator", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseValidator/BusinessCaseValidator.html",
            controller: "ValidatorCtrl"
        }).when("/BusinessCaseValidatorView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/BusinessCaseValidator/ViewValidator.html",
            controller: "ViewValidatorCtrl"
        }).when("/AddOLBusinessCase/", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/AddOutLicensingBusinessCase.html",
            controller: "AddOutLicensingBusinessCaseCtrl"
        }).when("/InitiatorLP", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InitiatorLP.HTML",
            controller: "InitiatorLPctrl"
        }).when("/ViewOutLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/OutLicensingBusinessCaseView.HTML",
            controller: "ViewOLCtrl"
        }).when("/ViewOutLicensing/:initiationID/:bussCaseDocID", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/OutLicensingBusinessCaseView.HTML",
            controller: "ViewOLCtrl"
        }).when("/OutLicensingLP", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/OutLicensingBusinessCaseLP.HTML",
            controller: "OutLicensingctrl"
        }).when("/ViewInLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InLicensingBusinessCase/InLicensingBusinessCaseView.HTML",
            controller: "ViewILCtrl"
        }).when("/ViewInLicensing/:initiationID/:bussCaseDocID", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InLicensingBusinessCase/InLicensingBusinessCaseView.HTML",
            controller: "ViewILCtrl"
        }).when("/ViewCapexLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/CapexLicensingBusinessCase/CapexLicensingBusinessCaseView.HTML",
            controller: "ViewCapexCtrl"
        }).when("/ViewCapexLicensing/:initiationID/:bussCaseDocID", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/CapexLicensingBusinessCase/CapexLicensingBusinessCaseView.HTML",
            controller: "ViewCapexCtrl"
        }).when("/ViewAndaLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/AndaLicensingBusinessCaseView.HTML",  //arv
            controller: "ViewAndaCtrl"
        }).when("/ViewAndaLicensing/:initiationID/:bussCaseDocID", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/AndaLicensingBusinessCaseView.HTML",
            controller: "ViewAndaCtrl"
        }).when("/ChangeStageOutLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/OutLicensingBusinessCaseChangeStage.HTML",
            controller: "ChangeStageOLCtrl"
        }).when("/ChangeStageInLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InLicensingBusinessCase/InLicensingBusinessCaseChangeStage.HTML",
            controller: "ChangeStageILCtrl"
        }).when("/ChangeStageCapex", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/CapexLicensingBusinessCase/CapexLicensingBusinessCaseChangeStage.HTML",
            controller: "ChangeStageCapexCtrl"
        }).when("/AddCapexBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/CapexLicensingBusinessCase/AddCapexLicensingBusinessCase.HTML",
            controller: "AddCapexBusinessCaseCtrl"
        }).when("/ChangeStageAndaLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/AndaLicensingBusinessCaseChangeStage.HTML",  //
            controller: "ChangeStageAndaCtrl"
        }).when("/AddAndaBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/AddAndaLicensingBusinessCase.html",
            controller: "AddAndaLicensingBusinessCaseCtrl"
        }).when("/ReviewerLP", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/ReviewerLPage.html",
            controller: "ReviewerLPCtrl"
        }).when("/ReviewerOutLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/OutLicensingBusinessCase/ReviewerOutLicensingBusinessCaseView.html",
            controller: "ReviewerOutLicensingBusinessCaseViewCtrl"
        }).when("/ReviewerReviewOutLicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/OutLicensingBusinessCase/ReviewerReviewOutLicensingBusinessCase.html",
            controller: "ReviewerReviewOutLicensingBusinessCaseCtrl"
        }).when("/ReviewerInLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/InLicensingBusinessCase/ReviewerInLicensingBusinessCaseView.html",
            controller: "ReviewerInLicensingBusinessCaseViewCtrl"
        }).when("/ReviewerReviewInLicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/InLicensingBusinessCase/ReviewerReviewInLicensingBusinessCase.html",
            controller: "ReviewerReviewInLicensingBusinessCaseCtrl"
        }).when("/ReviewerReviewAndaLicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/AndaLicensingBusinessCase/ReviewerReviewANDALicensingBusinessCase.html",
            controller: "ReviewerReviewAndaLicensingBusinessCaseCtrl"
        }).when("/ReviewerAndaLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/AndaLicensingBusinessCase/ReviewerANDALicensingBusinessCaseView.html",
            controller: "ReviewerAndaLicensingBusinessCaseViewCtrl"
        }).when("/ReviewerReviewCapexLicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/CapexLicensingBusinessCase/ReviewerReviewCapexLicensingBusinessCase.html",
            controller: "ReviewerReviewCapexLicensingBusinessCaseCtrl"
        }).when("/ReviewerCapexLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/CapexLicensingBusinessCase/ReviewerCapexLicensingBusinessCaseView.HTML",
            controller: "ReviewerCapexLicensingBusinessCaseViewCtrl"
        }).when("/ValidatorLP", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/ValidatorLPage.html",
            controller: "ValidatorLPCtrl"
        }).when("/ValidatorOutLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/OutLicensingBusinessCase/ValidatorOutLicensingBusinessCaseView.HTML",
            controller: "ValidatorOutLicensingBusinessCaseViewCtrl"
        }).when("/ValidateOL", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/OutLicensingBusinessCase/ValidatorValidateOutLicensingBusinessCase.html",
            controller: "ValidatorValidateOutLicensingBusinessCaseCtrl"
        }).when("/ValidatorInLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/InLicensingBusinessCase/ValidatorInLicensingBusinessCaseView.html",
            controller: "ValidatorInLicensingBusinessCaseViewCtrl"
        }).when("/ValidateIL", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/InLicensingBusinessCase/ValidatorValidateInLicensingBusinessCase.html",
            controller: "ValidatorValidateInLicensingBusinessCaseCtrl"
        }).when("/ValidateANDA", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/AndaLicensingBusinessCase/ValidatorValidateANDALicensingBusinessCase.html",
            controller: "ValidatorValidateANDABusinessCaseCtrl"
        }).when("/ValidatorValidateANDABusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/AndaLicensingBusinessCase/ValidatorANDALicensingBusinessCaseView.html",
            controller: "ValidatorValidateANDABusinessCaseCtrl"
        }).when("/ValidateCapex", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/CapexLicensingBusinessCase/ValidatorValidateCapexLicensingBusinessCase.html",
            controller: "ValidateCapexCtrl"
        }).when("/ValidatorValidateCapexBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/CapexLicensingBusinessCase/ValidatorCapexLicensingBusinessCaseView.HTML",
            controller: "ValidatorValidateCapexBusinessCaseViewCtrl"
        }).when("/AddILBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InLicensingBusinessCase/AddInLicensingBusinessCase.html",
            controller: "AddInLicensingBusinessCaseCtrl"
        }).when("/EditOL", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/OutLicensingBusinessCase/EditOutLicensingBusinessCase.html",
            controller: "EditOutLicensingBusinessCaseCtrl"
        }).when("/EditIL", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/InLicensingBusinessCase/EditInLicensingBusinessCase.html",
            controller: "EditInLicensingBusinessCaseCtrl"
        }).when("/EditAnda", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/EditAndaLicensingBusinessCase.html",
            controller: "EditAndaLicensingBusinessCaseCtrl"
        }).when("/EditCapex", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/CapexLicensingBusinessCase/EditCapexLicensingBusinessCase.html",
            controller: "EditCapexLicensingBusinessCaseCtrl"
        }).when("/ViewUSAndaLicensing", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/USAndaLicensingBusinessCase/USAndaLicensingBusinessCaseView.HTML",
            controller: "ViewUSAndaCtrl"
        }).when("/ViewUSAndaLicensing/:initiationID/:bussCaseDocID", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/USAndaLicensingBusinessCase/USAndaLicensingBusinessCaseView.HTML",
            controller: "ViewUSAndaCtrl"
        }).when("/ChangeStageUSAnda", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/USAndaLicensingBusinessCase/USAndaLicensingBusinessCaseChangeStage.HTML",
            controller: "ChangeStageUSAndaCtrl"
        }).when("/AddUSAndaBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/USAndaLicensingBusinessCase/AddUSAndaLicensingBusinessCase.HTML",
            controller: "AddUSAndaBusinessCaseCtrl"
        }).when("/ReviewerReviewUSAndaLicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/USAndaLicensingBusinessCase/ReviewerReviewUSAndaLicensingBusinessCase.html",
            controller: "ReviewerReviewUSAndaLicensingBusinessCaseCtrl"
        }).when("/ReviewerUSAndaLicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/USAndaLicensingBusinessCase/ReviewerUSAndaLicensingBusinessCaseView.HTML",
            controller: "ReviewerUSAndaLicensingBusinessCaseViewCtrl"
        }).when("/ValidateUSAnda", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/USAndaLicensingBusinessCase/ValidatorValidateUSAndaLicensingBusinessCase.html",
            controller: "ValidateUSAndaCtrl"
        }).when("/ValidatorValidateUSAndaBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/USAndaLicensingBusinessCase/ValidatorUSAndaLicensingBusinessCaseView.HTML",
            controller: "ValidatorValidateUSAndaBusinessCaseViewCtrl"
        }).when("/EditUSAnda", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/USAndaLicensingBusinessCase/EditUSAndaLicensingBusinessCase.html",
            controller: "EditUSAndaLicensingBusinessCaseCtrl"


        }).when("/InitiatorOLDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/OLDashboard/OLDashboard.HTML",
            controller: "InitiatorOLDashCtrl"
        }).when("/ReviewerOLDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/OLDashboard/ReviewerOLDashboard.html",
            controller: "ReviewerOLDashCtrl"
        }).when("/ValidatorOLDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/OLDashboard/ValidatorOLDashboard.html",
            controller: "ValidatorOLDashCtrl"
        }).when("/InitiatorILDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILDashboard/ILDashboard.HTML",
            controller: "InitiatorILDashCtrl"
        }).when("/ReviewerILDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILDashboard/ReviewerILDashboard.html",
            controller: "ReviewerILDashCtrl"
        }).when("/ValidatorILDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILDashboard/ValidatorILDashboard.html",
            controller: "ValidatorILDashCtrl"
        }).when("/InitiatorCAPEXDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/CAPEXDashboard/CAPEXDashboard.HTML",
            controller: "InitiatorCAPEXDashCtrl"
        }).when("/ReviewerCAPEXDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/CAPEXDashboard/ReviewerCAPEXDashboard.html",
            controller: "ReviewerCAPEXDashCtrl"
        }).when("/ValidatorValidateAPI", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/API/ValidatorValidateAPI.HTML",
            controller: "ValidatorValidateAPICtrl"
        }).when("/ValidatorCAPEXDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/CAPEXDashboard/ValidatorCAPEXDashboard.html",
            controller: "ValidatorCAPEXDashCtrl"

        }).when("/InitiatorUSANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDADashboard/USANDADashboard.HTML",
            controller: "InitiatorUSANDADashCtrl"
        }).when("/ReviewerUSANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDADashboard/ReviewerUSANDADashboard.html",
            controller: "ReviewerUSANDADashCtrl"
        }).when("/ValidatorUSANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDADashboard/ValidatorUSANDADashboard.html",
            controller: "ValidatorUSANDADashCtrl"


        }).when("/InitiatorUSMOWANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USMOWANDADashboard/USMOWANDADashboard.HTML",
            controller: "InitiatorUSMOWANDADashCtrl"
        }).when("/ReviewerUSMOWANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USMOWANDADashboard/ReviewerUSMOWANDADashboard.html",
            controller: "ReviewerUSMOWANDADashCtrl"
        }).when("/ValidatorUSMOWANDADash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USMOWANDADashboard/ValidatorUSMOWANDADashboard.html",
            controller: "ValidatorUSMOWANDADashCtrl"

            // SINGLE TENDER BID
        }).when("/InitiatorSingDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/SingleTenderBidDashboard/InitiatorSingleTenderBidDash.html",
            controller: "InitiatorSingDashCtrl"
        }).when("/ReviewerSingDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/SingleTenderBidDashboard/ReviewerSingleTenderBidDash.html",
            controller: "ReviewerSingDashCtrl"
        }).when("/ValidatorSingDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/SingleTenderBidDashboard/ValidatorSingleTenderBidDash.html",
            controller: "ValidatorSingDashCtrl"
        }).when("/AddSingleTenderBid", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/SingleTenderBid/AddSingleTenderBid.html",
            controller: "AddSingleTenderBidCtrl"
        }).when("/ViewSingleBid", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/SingleTenderBid/ViewSingleTenderBid.html",
            controller: "ViewSingleBidCtrl"
        }).when("/ChangeStgSingleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/SingleTenderBid/ChangeStageSingleTenderBid.html",
            controller: "ChangeStageSingleTenderCtrl"
        }).when("/ReviewSingleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/SingleTenderBid/ReviewerReviewSingleTenderBid.html",
            controller: "ReviewerReviewSingleTenderBidCtrl"
        }).when("/ReviewSingleTenderView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/SingleTenderBid/ReviewerReviewSingleTenderBidView.html",
            controller: "ReviewSingleTenderViewCtrl"
        }).when("/EditSingleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/SingleTenderBid/EditSingleTenderBid.html",
            controller: "EditSingleTenderCtrl"
        }).when("/ValidateSingleTenderView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/SingleTenderBid/ValidatorValidateSingleTenderBidView.html",
            controller: "ValidateSingleTenderViewCtrl"
        }).when("/ValidateSingleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/SingleTenderBid/ValidatorValidateSingleTenderBid.html",
            controller: "ValidatorValidateSingleTenderBidCtrl"
            // SINGLE TENDER BID END       

            //Multiple TENDER BID
        }).when("/InitiatorMultipleDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/MultipleTenderBidDashboard/InitiatorMultipleTenderBidDash.html",
            controller: "InitiatorMultipleDashCtrl"
        }).when("/ReviewerMultipleDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/MultipleTenderBidDashboard/ReviewerMultipleTenderBidDash.html",
            controller: "ReviewerMultipleDashCtrl"
        }).when("/ValidatorMultipleDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/MultipleTenderBidDashboard/ValidatorMultipleTenderBidDash.html",
            controller: "ValidatorMultipleDashCtrl"
        }).when("/AddMultipleTenderBid", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/MultipleTenderBid/AddMultipleTenderBid.html",
            controller: "AddMultipleTenderBidCtrl"
        }).when("/ChangeStgMultipleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/MultipleTenderBid/ChangeStageMultipleTenderBid.html",
            controller: "ChangeStageMultipleTenderCtrl"

        }).when("/EditMultipleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/MultipleTenderBid/EditMultipleTenderBid.html",
            controller: "EditMultipleTenderCtrl"


        }).when("/ViewMultipleBid", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/MultipleTenderBid/ViewMultipleTenderBid.html",
            controller: "ViewMultipleBidCtrl"
        }).when("/ReviewMultipleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/MultipleTenderBid/ReviewerReviewMultipleTenderBid.html",
            controller: "ReviewerReviewMultipleTenderBidCtrl"
        }).when("/ReviewMultipleTenderView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/MultipleTenderBid/ReviewerReviewMultipleTenderBidView.html",
            controller: "ReviewMultipleTenderViewCtrl"
        }).when("/ValidateMultipleTender", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/MultipleTenderBid/ValidatorValidateMultipleTenderBid.html",
            controller: "ValidatorValidateMultipleTenderBidCtrl"

        }).when("/ValidatorMultipleTenderView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/MultipleTenderBid/ValidatorValidateMultipleTenderBidView.html",
            controller: "ValidatorMultipleTenderViewCtrl"

            //  //Multiple TENDER BID END
        }).when("/AddAndaUMELicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaUMELicensingBusinessCase/AddAndaUMELicensingBusinessCase.html",
            controller: "AddAndaUMELicensingBusinessCaseCtrl"
        }).when("/ChangeStageAndaUME", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaUMELicensingBusinessCase/AndaUMELicensingBusinessCaseChangeStage.HTML",
            controller: "ChangeStageAndaUMECtrl"
        }).when("/ViewAndaUME", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaUMELicensingBusinessCase/AndaUMELicensingBusinessCaseView.HTML",
            controller: "ViewAndaUMECtrl"
        }).when("/EditAndaUMELicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/AndaLicensingBusinessCase/EditAndaLicensingBusinessCase.html",
            controller: "EditAndaUMELicensingBusinessCaseCtrl"
        }).when("/ReviewerAndaUMELicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/AndaUMELicensingBusinessCase/ReviewerAndaUMELicensingBusinessCaseView.HTML",
            controller: "ReviewerAndaUMELicensingBusinessCaseViewCtrl"
        }).when("/ReviewerReviewAndaUMELicensingBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/AndaUMELicensingBusinessCase/ReviewerReviewAndaUMELicensingBusinessCase.html",
            controller: "ReviewerReviewAndaUMELicensingBusinessCaseCtrl"
        }).when("/ValidatorAndaUMELicensingBusinessCaseView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/AndaUMELicensingBusinessCase/ValidatorAndaUMELicensingBusinessCaseView.HTML",
            controller: "ValidatorAndaUMELicensingBusinessCaseViewCtrl"
        }).when("/ValidatorValidateANDAUMEBusinessCase", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/AndaUMELicensingBusinessCase/ValidatorValidateAndaUMELicensingBusinessCase.html",
            controller: "ValidatorValidateANDAUMEBusinessCaseCtrl"
        }).when("/InitiatorUSANDAUMEDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDAUMEDashboard/ANDAUMEDashboard.HTML",
            controller: "InitiatorUSANDAUMEDashCtrl"
        }).when("/ReviewerUSANDAUMEDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDAUMEDashboard/ReviewerANDAUMEDashboard.html",
            controller: "ReviewerUSANDAUMEDashCtrl"
        }).when("/ValidatorUSANDAUMEDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/USANDAUMEDashboard/ValidatorANDAUMEDashboard.html",
            controller: "ValidatorUSANDAUMEDashCtrl"
            //InLicenseVsInHouse
        }).when("/InitiatorILVsIHDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILVsInHouseDashboard/InitiatorILVsInHouseDash.html",
            controller: "InitiatorILVsIHDashCtrl"
        }).when("/ReviewerILVsIHDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILVsInHouseDashboard/ReviewerILVsInHouseDash.html",
            controller: "ReviewerILVsIHDashCtrl"
        }).when("/ValidatorILVsIHDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/ILVsInHouseDashboard/ValidatorILVsInHouseDash.html",
            controller: "ValidatorILVsIHDashCtrl"
        }).when("/AddILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/ILVsInHouseBusinessCase/AddILVsIH.html",
            controller: "AddILVsIHCtrl"
        }).when("/EditILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/ILVsInHouseBusinessCase/EditILVsIH.html",
            controller: "EditILVsIHCtrl"
        }).when("/ChngStgILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/ILVsInHouseBusinessCase/ChangeStageILVsIH.html",
            controller: "ChngStgILVsIHCtrl"
        }).when("/ReviewerReviewILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/ILVsInHouseBusinessCase/ReviewerReviewILVsIH.html",
            controller: "ReviewerReviewILVsIHCtrl"
        }).when("/ValidatorValidateILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/ILVsInHouseBusinessCase/ValidatorValidateILVsIH.html",
            controller: "ValidatorValidateILVsIHCtrl"
            //    
            //API START

        }).when("/InitiatorAPIDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/APIDashboard/InitiatorAPIDash.html",
            controller: "InitiatorAPIDashCtrl"
        }).when("/ReviewerAPIDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/APIDashboard/ReviewerAPIDash.html",
            controller: "ReviewerAPIDashCtrl"
        }).when("/ValidatorAPIDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Dashboard/APIDashboard/ValidatorAPIDash.html",
            controller: "ValidatorAPIDashCtrl"
        }).when("/AddAPI", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/API/AddAPI.html",
            controller: "AddAPICtrl"
        }).when("/EditAPI", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/API/EditAPI.html",
            controller: "EditAPICtrl"
        }).when("/ChngStgAPI", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/API/ChangeStageAPI.html",
            controller: "ChngStgAPICtrl"
        }).when("/ReviewAPI", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/API/ReviewerReviewAPI.html",
            controller: "ReviewAPICtrl"

        }).when("/ValidatorViewILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/ILVsInHouseBusinessCase/ValidatorILVsIHView.HTML",
            controller: "ValidatorViewILVsIHCtrl"
        }).when("/APIValidatorView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Validator/API/ValidatorAPIView.HTML",
            controller: "APIValidatorViewCtrl"

        }).when("/ReviewerViewILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/ILVsInHouseBusinessCase/ReviewerILVsIHView.HTML",
            controller: "ReviewerViewILVsIHCtrl"
        }).when("/APIReviewerView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Reviewer/API/ReviewerAPIView.HTML",
            controller: "APIReviewerViewCtrl"
        }).when("/APIInitiatorView", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/API/APIView.HTML",
            controller: "APIInitiatorViewCtrl"
        }).when("/InitiatorViewILVsIH", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/Biocon/Initiator/ILVsInHouseBusinessCase/ILVsIHView.html",
            controller: "InitiatorViewILVsIHCtrl"


            ///******ELT Reviewer Dashboard**** */
       
        }).when("/ELTReviewerAPIDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTAPIDashboard/ELTReviewerAPIDash.html",
            controller: "ELTReviewerAPIDashCtrl"
       
        }).when("/ELTReviewerCAPEXDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTCAPEXDashboard/ELTReviewerCAPEXDashboard.html",
            controller: "ELTReviewerCAPEXDashboardCtrl"

        }).when("/ELTReviewerILVsInHouseDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTILnIHDashboard/ELTReviewerILVsInHouseDash.html",
            controller: "ELTReviewerILVsInHouseDashCtrl"


        }).when("/ELTReviewerILDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTInLicensingDashboard/ELTReviewerILDashboard.html",
            controller: "ELTReviewerILDashboardCtrl"
       
        }).when("/ELTReviewerMultipleTenderBidDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTMultipleTenderBidDashboard/ELTReviewerMultipleTenderBidDash.html",
            controller: "ELTReviewerMultipleTenderBidDashCtrl"

        }).when("/ELTReviewerOLDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTOutLicensingDashboard/ELTReviewerOLDashboard.html",
            controller: "ELTReviewerOLDashboardCtrl"



        }).when("/ELTReviewerSingleTenderBidDash", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTSingleTenderBidDashboard/ELTReviewerSingleTenderBidDash.html",
            controller: "ELTReviewerSingleTenderBidDashCtrl"
       
        }).when("/ELTReviewerANDAUMEDashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUMEANDADashboard/ELTReviewerANDAUMEDashboard.html",
            controller: "ELTReviewerANDAUMEDashboardCtrl"

        }).when("/ELTReviewerUSANDADashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUSANDADashboard/ELTReviewerUSANDADashboard.html",
            controller: "ELTReviewerUSANDADashboardCtrl"

        }).when("/ELTReviewerUSMOWANDADashboard", {
            templateUrl: "../_catalogs/masterpage/Custom/SourceCode/HTML/TEMPLATES/ELTDashboard/ELTUSMOWANDADashboard/ELTReviewerUSMOWANDADashboard.html",
            controller: "ELTReviewerUSMOWANDADashboardCtrl"
       
         
///******ELT Reviewer Dashboard**** */
            
       
        }).otherwise({
            redirectTo: "/InitiatorLP"

        });









    }]);
})();