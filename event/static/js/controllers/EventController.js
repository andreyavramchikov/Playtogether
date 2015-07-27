var app = angular.module('playTogether');

app.controller('EventController', function ($scope, EventService) {
    EventService.getEvents().then(function(data){
        $scope.events = data.data.results;
    });

});

