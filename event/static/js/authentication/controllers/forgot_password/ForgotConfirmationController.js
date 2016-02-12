var app = angular.module('authentication');

app.controller('ForgotConfirmationController', function ($http, $scope, $stateParams) {
    $scope.email = $stateParams.email;
});

