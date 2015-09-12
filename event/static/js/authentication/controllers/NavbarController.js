var app = angular.module('authentication');

app.controller('NavbarController', function ($http, $scope, $location, $state, AuthenticationService) {
    $scope.logout = function(){
        AuthenticationService.logout().then(function(response){
            AuthenticationService.unauthenticate();
            //MUST TO MOVE IT AND MAYBE THE LINE ABOVE INTO SERVICE
            $rootScope.IS_AUTHENTICATED = false;
            $state.go('home');
            window.location = '/';
        });
    };
});

