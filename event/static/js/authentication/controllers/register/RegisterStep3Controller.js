var app = angular.module('authentication');

app.controller('RegisterStep3Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {
    $scope.registerStep3 = function () {
        var _getData = function () {
            return {'schedule_to_play': $scope.schedule};
        };

        var userId = $stateParams.userId;
        AuthenticationService.registerStep3(userId, _getData()).then(function (response) {
            $state.go('registerStep4', {'userId': userId});
        }, function (response) {
            console.log('Error');
        });

    }
});