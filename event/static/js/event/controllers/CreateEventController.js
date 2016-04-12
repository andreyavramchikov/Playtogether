"use strict";

var app = angular.module('playTogether');

app.controller('CreateEventController', ['$scope', '$rootScope', '$state', '_', 'EventService', 'ActivityService',
    function ($scope, $rootScope, $state, _, EventService, ActivityService) {

        $scope.selectedActivity = [];
        $scope.errors = {};

        var getPostData = function () {
            var data = {
                activity: $scope.selectedActivity.id,
                start_date: $scope.start_date,
                min_people: $scope.min_people
            };
            return data;
        };

        //to broadcast event of click into dropdown directive
        //to close dropdown on the page after clicking on any position;
        $('#create-event').on("click", function (e) {
            $rootScope.$broadcast("documentClicked", angular.element(e.target));
        });

        $scope.createEvent = function () {
            var data = getPostData();
            EventService.createEvent(data).then(function (response) {
                $state.go('events');
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
            $scope.activities = response.data;
        });
    }]);



