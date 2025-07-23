/* global angular */
"use strict";

angular.module("bahmni.common.i18n")
    .service("rtlService", ["$translate", "$document", function ($translate, $document) {
        var self = this;

        // List of RTL languages
        var RTL_LANGUAGES = ["fa", "ar", "he", "ur"];

        var isRTLLanguage = function (languageCode) {
            return RTL_LANGUAGES.indexOf(languageCode) !== -1;
        };

        var applyRTLDirection = function (languageCode) {
            var htmlElement = $document[0].documentElement;
            var bodyElement = $document[0].body;

            if (isRTLLanguage(languageCode)) {
                // Apply RTL direction
                htmlElement.setAttribute("dir", "rtl");
                htmlElement.setAttribute("lang", languageCode);
                bodyElement.setAttribute("dir", "rtl");

                // Add RTL class for additional styling
                angular.element(htmlElement).addClass("rtl-layout");
                angular.element(bodyElement).addClass("rtl-layout");
            } else {
                // Apply LTR direction
                htmlElement.setAttribute("dir", "ltr");
                htmlElement.setAttribute("lang", languageCode);
                bodyElement.setAttribute("dir", "ltr");

                // Remove RTL class
                angular.element(htmlElement).removeClass("rtl-layout");
                angular.element(bodyElement).removeClass("rtl-layout");
            }
        };

        var initializeDirection = function () {
            var currentLanguage = $translate.use() || "en";
            applyRTLDirection(currentLanguage);
        };

        // Public methods
        self.isRTL = function (languageCode) {
            return isRTLLanguage(languageCode || $translate.use());
        };

        self.setDirection = function (languageCode) {
            applyRTLDirection(languageCode);
        };

        self.getCurrentDirection = function () {
            return isRTLLanguage($translate.use()) ? "rtl" : "ltr";
        };

        self.initialize = initializeDirection;

        // Listen for language changes
        self.setupLanguageWatcher = function ($scope) {
            $scope.$on("$translateChangeSuccess", function (event, data) {
                applyRTLDirection(data.language);
            });
        };

        return self;
    }]);
