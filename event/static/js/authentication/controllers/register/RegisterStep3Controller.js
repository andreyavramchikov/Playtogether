"use strict";

var app = angular.module('authentication');

app.controller('RegisterStep3Controller', function ($scope, $state,
    $stateParams, AuthenticationService) {
    $scope.registerStep3 = function () {
        var getData = function () {
            return {'schedule_to_play': $scope.schedule};
        },
            userId = $stateParams.userId;

        AuthenticationService.registerStep3(userId, getData()).then(function () {
            $state.go('register-step-4', {'userId': userId});
        }, function () {
            console.log('Error');
        });
    };
});