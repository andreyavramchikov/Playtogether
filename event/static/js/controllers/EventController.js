var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $http, EventService) {
    EventService.getEvents().then(function(response){
        $scope.events = response.data.results;
    });
});

