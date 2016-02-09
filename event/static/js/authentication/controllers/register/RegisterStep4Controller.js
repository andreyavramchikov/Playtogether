var app = angular.module('authentication');

app.controller('RegisterStep4Controller', function ($http, $scope, $location, $state,
                                                    $stateParams, AuthenticationService,
                                                    ActivityService) {

    var _getData = function () {
        return _.filter($scope.activities, function (activity) {
            return activity.selected;
        });
    };

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data.results;
    });

    //VERY BAD IMPLEMENTATION - MUST BE REFACTORED
    $scope.registerStep4 = function () {
        var userId = $stateParams.userId;
        console.log(_getData());
        _(_getData()).forEach(function (activity) {
            //AuthenticationService.registerStep4(32, activity.id);
        });
        $state.go('registerStep5', {'userId': userId});
    }
});

