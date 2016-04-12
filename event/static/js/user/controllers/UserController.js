"use strict";

var app = angular.module('playTogether');

app.controller('UserController', ['$scope', '$rootScope', '$stateParams',
    'UserService', 'ActivityService', 'EventService', '_',
    function ($scope, $rootScope, $stateParams, UserService, ActivityService, EventService, _) {

        $scope.eventId = $stateParams.eventId;

        if (!$scope.eventId) {
            UserService.getUsers().then(function (response) {
                $scope.users = response.data;
            });
        }

        ActivityService.getActivities().then(function (response) {
            $scope.activities = response.data;
        });

        //copy past
        var _getFilterData = function () {
            var selectedActivity = _.filter($scope.activities, function (activity) {
                    return activity.selected;
                }),
                male = $scope.male,
                female = $scope.female,
                selectedActivityIds = null,
                sex = null;

            if (female && !male) {
                sex = female;
            } else if (male && !female) {
                sex = male;
            }

            if (selectedActivity.length > 0) {
                selectedActivityIds = _.map(selectedActivity, 'id');
            }

            var data = [
                {name: "selected_activity_ids", value: selectedActivityIds},
                {name: "sex", value: sex},
                {name: "event_id", value: $scope.eventId}
            ];
            return $.param(data);
        };

        removeSelfFromUsers = function (users) {
            _.filter(users, function (user) {
                return user.id !== $rootScope.authenticatedUser.id;
            });
            return users;
        };

        filterUsers = function () {
            UserService.filterUsers(_getFilterData()).then(function (response) {
                $scope.users = removeSelfFromUsers(response.data);
            });
        };

        $scope.$watchGroup(['male', 'female', 'eventId'], function () {
            filterUsers();
        });

        $scope.$watch('activities', function () {
            filterUsers();
        }, true);


        //SHOULD BE CHANGED TO JUST SEND EMAIL OF INVITATION
        $scope.inviteToEvent = function (userId, index) {
            EventService.updateEventUsers({
                event_id: $scope.eventId,
                user_id: userId,
                action: 'create'
            }).then(function () {
                $scope.users[index].come_to_event = true;
            });
        };

        //SHOULD BE CHANGED TO JUST SEND EMAIL OF INVITATION
        $scope.removeFromEvent = function (userId, index) {
            EventService.updateEventUsers({
                event_id: $scope.eventId,
                user_id: userId,
                action: 'delete'
            }).then(function () {
                $scope.users[index].come_to_event = false;
            });
        };
    }]);