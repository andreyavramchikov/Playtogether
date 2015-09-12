var app = angular.module('playTogether');

app.controller('CreateEventController', function ($scope, $http, $timeout, EventService, ActivityService, PlaceService) {

    $scope.modelka = '';


    var getPostData = function(){
        var data = {
            activity: $scope.selectedActivity,
            place: $scope.selectedPlace,
            start_date: $scope.start_date,
            end_date: $scope.end_date,
            min_people: $scope.min_people,
            max_people: $scope.max_people
        };
        return data;
    };

    $scope.createEvent = function(){
        var data = getPostData();
        EventService.createEvent(data).then(function(response){
            console.log(response);
        });
    };

    ActivityService.getActivities().then(function(response){
        $scope.activities = response.data.results;
    });

    PlaceService.getPlaces().then(function(response){
        $scope.places = response.data.results;
    });
});

