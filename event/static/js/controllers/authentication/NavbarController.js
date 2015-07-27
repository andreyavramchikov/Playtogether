var app = angular.module('playTogether');

app.controller('NavbarController', function ($http, $scope, $location, $window, AuthenticationService) {
    $scope.logout = function(){
        AuthenticationService.logout().then(function(response){
            AuthenticationService.unauthenticate();
            window.location = '/';
        });
    };
});

