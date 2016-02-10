var app = angular.module('authentication');

app.controller('RegisterStep5Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {

    $scope.registerStep5 = function () {
        var _getData = function () {
            return {
                'email_notification': $scope.email_notification,
                'sms_notification': $scope.sms_notification,
                'phone': $scope.phone
            };
        };

        AuthenticationService.registerStep5($stateParams.userId, _getData()).then(function (response) {
            $state.go('events');
        });

    }
});