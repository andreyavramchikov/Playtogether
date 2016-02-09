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



