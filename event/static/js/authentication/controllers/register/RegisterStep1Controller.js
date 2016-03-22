"use strict";

var authentication = angular.module('authentication');

authentication.controller('RegisterStep1Controller', function ($scope, $rootScope,
                                                    $state, AuthenticationService) {

    $scope.errors = [];
    $scope.registerStep1 = function () {
        var email = $scope.user.email,
            password = $scope.user.password;

        AuthenticationService.registerStep1(email, password).then(function (response) {
            var account = response.data;
            AuthenticationService.login(account.email, account.password).then(function (response) {
                var data = response.data,
                    userId = data.id;
                AuthenticationService.setAuthenticatedAccount(data);  //MUST TO THIN TO REFACTORED THIS LINE BECAUSE REPEATED IN SOME PLACES
                //MUST TO MOVE IT AND MAYBE THE LINE ABOVE INTO SERVICE
                $rootScope.authenticatedUser = data;
                $rootScope.IS_AUTHENTICATED = true;
                $state.go("register-step-2", {'userId' : userId});
            });
        }, function (response) {
            var errors = response.data.errors;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    };
});
