var app = angular.module('playTogether');

app.controller('CreateEventController', function ($scope, $http, $timeout, EventService, ActivityService, PlaceService) {
    var getPostData = function () {
        var data = {
            activity: $scope.selectedActivity,
            start_date: $scope.start_date,
            min_people: $scope.min_people
        };
        return data;
    };

    //$("#dtBox").DateTimePicker();
    $scope.errors = {};
    $scope.createEvent = function () {
        var data = getPostData();
        EventService.createEvent(data).then(function (response) {
            console.log(response);
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

