"use strict";

var app = angular.module('authentication');

app.controller('RegisterStep5Controller', function ($scope, $state, $stateParams,
                                                    AuthenticationService) {
    $scope.registerStep5 = function () {
        var getData = function () {
            return {
                'email_notification': $scope.email_notification,
                'sms_notification': $scope.sms_notification,
                'phone': $scope.phone
            };
        };
        AuthenticationService.registerStep5($stateParams.userId, getData()).then(function () {
            $state.go('events');
        });
    };
});