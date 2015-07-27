var app = angular.module('playTogether');

app.controller('UserController', function ($scope, UserService) {
    UserService.getUsers().then(function(data){
        $scope.users = data.data.results;
    });
});