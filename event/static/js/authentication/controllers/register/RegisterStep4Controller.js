"use strict";

var app = angular.module('authentication');

app.controller('RegisterStep4Controller', function ($scope, $state,
                                                    $stateParams, ActivityService) {

    var getData = function () {
        var selectedActivities =
            _.filter($scope.activities, function (activity) {
                return activity.selected;
            }),
            activities = selectedActivities.map(function (activity) {
                return {
                    'id': activity.id,
                    'level': activity.id
                };
            });
        return {'activities': activities};
    };

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data;
    });

    //VERY BAD IMPLEMENTATION - MUST BE REFACTORED
    $scope.registerStep4 = function () {
        var userId = $stateParams.userId;
        ActivityService.updateUserActivities(getData());
        $state.go('register-step-5', {'userId': userId});
    };
});
