/* global angular */
"use strict";

angular.module("bahmni.common.i18n")
    .run(["$rootScope", "$translate", "rtlService", function ($rootScope, $translate, rtlService) {
        // Initialize RTL support when the app starts
        rtlService.initialize();

        // Listen for translation changes globally
        $rootScope.$on("$translateChangeSuccess", function (event, data) {
            rtlService.setDirection(data.language);
        });

        // Add RTL helper methods to rootScope for templates
        $rootScope.isRTL = function () {
            return rtlService.isRTL();
        };

        $rootScope.getDirection = function () {
            return rtlService.getCurrentDirection();
        };
    }]);
