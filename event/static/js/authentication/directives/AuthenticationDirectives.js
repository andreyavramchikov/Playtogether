"use strict";

var app = angular.module('authentication');

app.directive('userSex', function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            element.on('click', function () {
                scope.$apply(function () {
                    scope.sex = element.data('sex');
                });
            });
        }
    };
});

app.directive('userSchedule', function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            element.on('click', function () {
                scope.$apply(function () {
                    scope.schedule = element.data('schedule');
                });
            });
        }
    };
});

app.directive('kindActivities', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/kind-of-activities.html',
        scope: {
            activities: '=activities',
            kind: '@kind',
            kindru: '@kindru'
        },
        link: function (scope) {

        }
    };
});
