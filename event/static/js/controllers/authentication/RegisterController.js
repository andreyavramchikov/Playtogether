var app = angular.module('playTogether');

app.controller('RegisterController', function ($http, $scope, $location, AuthenticationService) {
    $scope.register = function(){
        var email = $scope.email,
            username = $scope.username,
            password = $scope.password;

        AuthenticationService.register(email, username, password).then(function(response){
            var data = response.data;
            AuthenticationService.login(data.email, data.password).then(function(){
                window.location = '/';
            });
        });
    };
});




