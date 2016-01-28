var app = angular.module('authentication');

app.controller('LogoutController', function ($http, $scope, $rootScope, $location, $state, AuthenticationService) {
    AuthenticationService.logout().then(function(response){
        AuthenticationService.unauthenticate();
        $state.go('registerStep2');
        alert('Successfully logout');
    }, function(){

    });
});
