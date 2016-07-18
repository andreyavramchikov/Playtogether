"use strict";

var app = angular.module('authentication');

app.controller('ForgotConfirmationController', function ($scope, $stateParams) {
    $scope.email = $stateParams.email;
});

