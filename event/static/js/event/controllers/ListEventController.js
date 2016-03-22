"use strict";

var app = angular.module('playTogether');

app.controller('ListEventController', ['$scope', '$state', '$stateParams', '$rootScope', 'EventService',
    function ($scope, $state, $stateParams, $rootScope, EventService) {

        $scope.activityChecked = $stateParams.activityId;
        $scope.date = {'currentDate': null}; // then if date.currentDate update in EventFilterController here we can get
        // updated value and run watcher in child controller

        $scope.goToEvent = function (eventId, index) {
            //Copy past
            if (!$rootScope.IS_AUTHENTICATED) {
                return $state.go('login');
            }

            EventService.updateEventUsers({
                event_id: eventId,
                user_id: $rootScope.authenticatedUser.id,
                action: 'create'
            }).then(function () {
                $scope.events[index].user_done = true;
                $scope.events[index].count_of_members += 1;
            });
        };

        $scope.goFromEvent = function (eventId, index) {
            //Copy past
            if (!$rootScope.IS_AUTHENTICATED) {
                return $state.go('login');
            }
            EventService.updateEventUsers({
                event_id: eventId,
                user_id: $rootScope.authenticatedUser.id,
                action: 'delete'
            }).then(function () {
                $scope.events[index].user_done = false;
                $scope.events[index].count_of_members -= 1;
            });
        };

        $scope.inviteToEvent = function (eventId) {
            //Copy past
            if (!$rootScope.IS_AUTHENTICATED) {
                return $state.go('login');
            }
            $state.go('users-to-event', {'eventId': eventId});
        };

        $scope.openEvent = function (eventId) {
            $state.go('event', {'eventId': eventId});
        };
    }]);