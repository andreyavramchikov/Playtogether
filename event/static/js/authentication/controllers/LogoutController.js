var app = angular.module('authentication');

app.controller('LogoutController', function ($http, $scope, $rootScope, $location, $state, AuthenticationService) {
    AuthenticationService.logout().then(function(response){
        AuthenticationService.unauthenticate();

        //this two lines duplicate cookie functionality - maybe I should delete all cookie functionality
        // and use just rootScope to detect whether user logged or not
        $rootScope.authenticatedUser = {};
        $rootScope.IS_AUTHENTICATED = false;

        $state.go('events');
    });
});
