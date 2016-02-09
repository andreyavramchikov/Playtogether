var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $http, EventService, AuthenticationService) {


    EventService.getEvents().then(function(response){
        //$scope.events = response.data.results;
    });

    $scope.goToEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, action: 'create' }).then(function(){
            $scope.events[index].user_done = true;
            $scope.events[index].count_of_members += 1;
        });
    };

    $scope.goFromEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, action: 'delete' }).then(function(){
            $scope.events[index].user_done = false;
            $scope.events[index].count_of_members -= 1;
        });
    };
});