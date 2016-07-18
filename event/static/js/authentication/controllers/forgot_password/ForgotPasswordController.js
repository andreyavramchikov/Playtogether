"use strict";

var app = angular.module('authentication');

app.controller('ForgotPasswordController', function ($scope, $state, AuthenticationService) {
    $scope.errors = [];
    $scope.forgot = function () {
        AuthenticationService.forgotPassword({'email': $scope.user.email}).then(function () {
            $state.go('forgot-password-confirmation',
                {'email': $scope.user.email});
        }, function (response) {
            var errors = response.data.errors;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value;
                });
            }
        });
    };
});

