"use strict";

var app = angular.module('authentication');

app.controller('LoginController', function ($scope, $rootScope, $state, $timeout, AuthenticationService) {
    $scope.login = function () {
        AuthenticationService.login($scope.user.email, $scope.user.password).then(function (response) {
            AuthenticationService.setAuthenticatedAccount(response.data);
            $rootScope.authenticatedUser = response.data;
            $rootScope.IS_AUTHENTICATED = true;
            if ($rootScope.returnToState) {
                //$location.go($rootScope.returnToState);
                $state.go($rootScope.returnToState);
            } else {
                $state.go('landing');
            }
        },
            //COPY PAST FROM REGISTER
            // I should think about little framework related to error handling
            function (response) {
                $scope.errors = response.data.message;
                //hide errors after time
                $timeout(function () {
                    $scope.errors = null;
                }, 3000);
        });
    };
});

