var app = angular.module('authentication');

app.controller('LoginController', function ($http, $scope, $location, $window, AuthenticationService) {
    $scope.login = function(){
        AuthenticationService.login($scope.user.email, $scope.user.password).then(function(response){
            AuthenticationService.setAuthenticatedAccount(response.data);
            window.location = '/';
        });
    };
});

