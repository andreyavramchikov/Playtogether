var app = angular.module('authentication');

app.controller('RegisterStep4Controller', function ($http, $scope, $location, $state,
                                                    $stateParams, AuthenticationService,
                                                    ActivityService) {

    var _getData = function () {
        var selectedActivities = _.filter($scope.activities, function (activity) {
            return activity.selected;
        });
        var activities = selectedActivities.map(function (activity) {
            return {
                'id': activity['id'],
                'level': activity['level']
            }
        });
        return {'activities': activities};
    };

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data;
    });

    //VERY BAD IMPLEMENTATION - MUST BE REFACTORED
    $scope.registerStep4 = function () {
        var userId = $stateParams.userId;
        ActivityService.updateUserActivities(_getData());
        $state.go('registerStep5', {'userId': userId});
    }
});
