var app = angular.module('playTogether');

app.controller('CreateEventController', function ($scope, $rootScope, $http, $state, $timeout, EventService, ActivityService, PlaceService) {
    $scope.selectedActivity = [];

    //to broadcast event of click into dropdown directive - to close dropdown on the page after clicking on any position;
    $('#create-event').on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });

    var getPostData = function () {
        var data = {
            activity: $scope.selectedActivity.id,
            start_date: $scope.start_date,
            min_people: $scope.min_people
        };
        return data;
    };
    $("#dtBox").DateTimePicker();
    $scope.errors = {};
    $scope.createEvent = function () {
        var data = getPostData();
        EventService.createEvent(data).then(function (response) {
            $state.go('events');
        }, function (response) {
            var errors = response.data;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    };

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data.results;
    });

    PlaceService.getPlaces().then(function (response) {
        $scope.places = response.data.results;
    });
});


//Directive to create custom beautiful dropdown
app.directive("dropdown", function ($rootScope) {
    return {
        restrict: "E",
        templateUrl: "/static/pages/utils/dropdown.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function (scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function (item) {
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.isSelected = function (item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function () {
                scope.listVisible = true;
            };

            $rootScope.$on("documentClicked", function (inner, target) {
                console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
                if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
                    scope.$apply(function () {
                        scope.listVisible = false;
                    });
            });

            scope.$watch("selected", function (value) {
                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
            });
        }
    }
});
