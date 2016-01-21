var app = angular.module('authentication');

app.controller('RegisterStep5Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {
    $scope.register = function(){
         $state.go('registerStep5');
    }
});

