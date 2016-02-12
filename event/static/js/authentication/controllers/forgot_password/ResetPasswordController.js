var app = angular.module('authentication');

app.controller('ResetPasswordController', function ($http, $scope, $state, $stateParams, AuthenticationService) {
    $scope.reset = function () {
        var data = {
            'uidb64': $stateParams.uidb64,
            'token': $stateParams.token,
            'password': $scope.user.password,
            'confirm_password': $scope.user.confirm_password
        };
        AuthenticationService.resetConfirm(data).then(function (response) {
            $state.go('login');
            alert('successfully updated');
        }, function(response){
            console.log(response);
        });
    }


});

