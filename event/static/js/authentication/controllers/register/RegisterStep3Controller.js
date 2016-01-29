var app = angular.module('authentication');

app.controller('RegisterStep3Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {
    $scope.register = function () {
        var _getData = function () {
            return {'schedule_to_play': $scope.schedule};
        };

        $scope.register = function () {
            var userId = $stateParams.userId;
            AuthenticationService.registerStep3(userId, _getData()).then(function (response) {
                $state.go('registerStep4', {'userId': userId});
            }, function (response) {
                console.log('Error');
            });
        };
    }
});

app.directive('userSchedule', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            scope.$apply(function () {
                scope.schedule = element.data('schedule');
            });
        });
    }
});