var app = angular.module('authentication');

app.controller('RegisterStep4Controller', function ($http, $scope, $location, $state,
                                                    $stateParams, AuthenticationService, ActivityService) {

    var _getData = function () {
        var activities = $scope.activities,
            selectedActivities = _.filter(activities, function (activity) {
                return activity.selected;
            });

        return selectedActivities;
    };

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data.results;
    });


    //VERY BAD IMPLEMENTATION - MUST BE REFACTORED
    $scope.register = function () {
        var userId = $stateParams.userId,
            activities = _getData();
        _(activities).forEach(function (activity) {
            //AuthenticationService.registerStep4(32, activity.id);
        });

        $state.go('registerStep5', {'userId': userId});
    }
});


app.directive('chooseActivity', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            scope.$apply(function () {
                scope[attrs.kind] = scope[attrs.kind] == true ? false : true;
            });
        });
    }
});
