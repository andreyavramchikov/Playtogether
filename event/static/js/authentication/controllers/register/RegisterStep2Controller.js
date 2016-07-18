"use strict";

var app = angular.module('authentication');

app.controller('RegisterStep2Controller', function ($scope, $state,
                                                    $stateParams, AuthenticationService) {

    $scope.errors = [];

    var getData = function () {
        return {
            'sex': $scope.sex,
            'date_of_birth': $scope.date_of_birth
        };
    };

    $scope.registerStep2 = function () {
        var userId = $stateParams.userId;
        AuthenticationService.registerStep2(userId, getData()).then(function () {
            $state.go('register-step-3', {'userId' : userId});
        }, function (response) {
            var errors = response.data;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    };
});