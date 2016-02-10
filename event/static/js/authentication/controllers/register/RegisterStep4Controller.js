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
        $scope.activities = response.data.results;
    });

    //VERY BAD IMPLEMENTATION - MUST BE REFACTORED
    $scope.registerStep4 = function () {
        var userId = $stateParams.userId;
        ActivityService.updateUserActivities(_getData());
        $state.go('registerStep5', {'userId': userId});
    }
});

app.directive('starRating', function () {
    return {
        restrict: 'EA',
        template: '<ul class="star-rating">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
        scope: {
            ratingValue: '=ngModel',
        },
        link: function (scope, element, attr) {
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < 5; i++) {
                    scope.stars.push({filled: i < scope.ratingValue});
                }
            }
            scope.ratingValue = attr.initialRating;
            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
            };

            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (newValue) {
                    updateStars();
                }
            });

        }
    };
});
