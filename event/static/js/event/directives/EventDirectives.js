"use strict";

var app = angular.module('playTogether');

app.directive('weekDate', function () {
    var DAYS_IN_WEEK = 7;
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/week-date.html',
        scope: {
            dates: '=dates',
            current: '=ngModel',
            currentweek: '=currentweek'
        },
        link: function (scope, element, attr) {
            scope.dateSelected = function (date) {
                scope.current = date;
            };

            var updateDates = function (action) {
                if (action === 'Next') {
                    scope.currentweek = moment(scope.currentweek, "DD-MM-YYYY").add(7, 'days');
                } else if (action === 'Last') {
                    scope.currentweek = moment(scope.currentweek, "DD-MM-YYYY").add(-7, 'days');
                }

                scope.current = ({
                    'name': scope.currentweek.format('dddd'),
                    'value': scope.currentweek.format('DD-MM-YYYY')
                });

                scope.dates = [];
                _.times(DAYS_IN_WEEK, function (index) {
                    var date = moment(scope.currentweek, "DD-MM-YYYY").add(index, 'days');
                    scope.dates.push({
                        'name': date.locale("ru").format('dddd'),
                        'value': date.locale("ru").format('DD-MM-YYYY')
                    });
                });
            };

            scope.clickNextWeek = function () {
                updateDates('Next');
            };

            scope.clickLastWeek = function () {
                updateDates('Last');
            };
        }
    };
});

app.directive('eventdateUpdate', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/event-date-update.html',
        scope: {
            event: '=event'
        },
        link: function (scope, element, attr) {
            scope.edit = function () {
                scope.show = !scope.show;
            };
            scope.save = function () {
                //TODO
            };
        }
    };
});

app.directive('eventplaceUpdate', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/event-place-update.html',
        scope: {
            event: '=event'
        },
        link: function (scope, element, attr) {
            scope.save = function () {

            };
        }
    };
});

app.directive('eventpriceUpdate', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/event-price-update.html',
        scope: {
            event: '=event'
        },
        link: function (scope, element, attr) {
            scope.save = function () {

            };
        }
    };
});

app.directive('userBlock', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/pages/utils/user-block.html',
        scope: {
            user: '=user'
        },
        link: function (scope) {

        }
    };
});