var app = angular.module('authentication');

app.controller('LoginController', function ($http, $scope, $rootScope, $location, $state, $window, AuthenticationService) {
    $scope.login = function(){
        AuthenticationService.login($scope.user.email, $scope.user.password).then(function(response){
            AuthenticationService.setAuthenticatedAccount(response.data);
            $rootScope.authenticatedUser = response.data;
            $rootScope.IS_AUTHENTICATED = true;
            $state.go('landing');

        });
    };
});

