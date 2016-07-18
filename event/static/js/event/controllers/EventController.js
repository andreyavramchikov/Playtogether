"use strict";

var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $stateParams, EventService) {
    $scope.eventId = $stateParams.eventId;
    EventService.getEvent($scope.eventId).then(function(response){
        $scope.event = response.data[0];
    });
});