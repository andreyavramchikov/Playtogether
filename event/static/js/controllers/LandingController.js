var app = angular.module('playTogether');

app.controller('LandingController', function ($scope, $state, ActivityService, EventService) {
    ActivityService.getActivities().then(function(response){
        $scope.activities = response.data;
    });


    EventService.getEvents('limit=6').then(function(response){
        $scope.events = response.data.results;
    });

    $scope.goToActivityEvents = function(id){
        console.log(id);
        $state.go('events', {'activityId': id});
    }

});

