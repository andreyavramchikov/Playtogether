var app = angular.module('authentication');

app.controller('RegisterStep5Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {

    $scope.register = function () {
        var _getData = function () {
            var email_notification = $scope.email_notification,
                sms_notification = $scope.sms_notification,
                phone = $scope.phone;
            var data = {'email_notification': email_notification,
                'sms_notification': sms_notification,
                'phone': phone};
            return data;
        };

        $scope.register = function () {
            var userId = $stateParams.userId,
                data = _getData();
            AuthenticationService.registerStep5(userId, data).then(function (response) {
                $state.go('home');
            }, function (response) {
                console.log('Error');
            });
        };
    }
});