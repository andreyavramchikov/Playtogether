var app = angular.module('authentication');

app.controller('RegisterStep2Controller', function ($http, $scope, $location, $state, $cookies, $stateParams, AuthenticationService, ActivityService) {
    $("#dtBox").DateTimePicker( {isPopup : false,dateFormat: "yyyy-MM-dd"});

    $scope.errors = [];

    var _getData = function(){
        return {'sex': $scope.sex, 'date_of_birth': $scope.date_of_birth};
    };

    $scope.registerStep2 = function(){
        var userId = $stateParams.userId;
        AuthenticationService.registerStep2(userId, _getData()).then(function(response){
            $state.go('registerStep3', {'userId' : userId});
        }, function(response){
            var errors = response.data;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    };
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