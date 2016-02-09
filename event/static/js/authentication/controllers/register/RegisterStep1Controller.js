var app = angular.module('authentication');

app.controller('RegisterStep1Controller', function ($http, $scope, $rootScope, $location, $state, AuthenticationService) {

    $scope.errors = [];
    $scope.registerStep1 = function () {
        var email = $scope.user.email,
            password = $scope.user.password;

        AuthenticationService.registerStep1(email, password).then(function (response) {
            var data = response.data;
            AuthenticationService.login(data.email, data.password).then(function (response) {
                    var data = response.data,
                        userId = data.id;
                    AuthenticationService.setAuthenticatedAccount(data);  //MUST TO THIN TO REFACTORED THIS LINE BECAUSE REPEATED IN SOME PLACES
                    //MUST TO MOVE IT AND MAYBE THE LINE ABOVE INTO SERVICE
                    $rootScope.IS_AUTHENTICATED = true;
                    $state.go('registerStep2', {'userId' : userId});
                }
            );
        }, function (response) {
            var errors = response.data.errors;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    }
});
