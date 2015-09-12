var app = angular.module('playTogether');

app.controller('UserController', function ($scope, UserService) {
    UserService.getUsers().then(function(response){
        $scope.users = response.data.results;
    });
});