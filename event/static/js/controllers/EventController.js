var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $state,$rootScope, $http, EventService, AuthenticationService) {


    EventService.getEvents().then(function(response){
        //$scope.events = response.data;
    });

    $scope.goToEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, user_id: $rootScope.authenticatedUser.id, action: 'create' })
            .then(function(){
                $scope.events[index].user_done = true;
                $scope.events[index].count_of_members += 1;
        });
    };

    $scope.goFromEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, user_id: $rootScope.authenticatedUser.id, action: 'delete' })
            .then(function(){
                $scope.events[index].user_done = false;
                $scope.events[index].count_of_members -= 1;
        });
    };

    $scope.inviteToEvent = function(eventId){
        $state.go('users-to-event', {'eventId': eventId})
    }
});