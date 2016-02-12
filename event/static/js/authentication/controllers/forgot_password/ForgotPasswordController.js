var app = angular.module('authentication');

app.controller('ForgotPasswordController', function ($http, $scope, $state, AuthenticationService) {
    $scope.errors = [];
    $scope.forgot = function(){
        AuthenticationService.forgotPassword({'email': $scope.user.email}).then(function(response){
            $state.go('forgot-password-confirmation', {'email': $scope.user.email});
        }, function(response){
            var errors = response.data.errors;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value;
                });
            }
        });
    };
});

