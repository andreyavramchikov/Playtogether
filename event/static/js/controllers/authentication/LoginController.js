var app = angular.module('playTogether');

app.controller('LoginController', function ($http, $scope, $location, $window, AuthenticationService) {
    $scope.login = function(){
        AuthenticationService.login($scope.email, $scope.password).then(function(response){
            AuthenticationService.setAuthenticatedAccount(response.data);
            window.location = '/';
        });
    };
});

