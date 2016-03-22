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

app.directive('customCheckbox', function () {
    return {
        restrict: 'E',
        template: '<div class="custom-checkbox left" ng-class="{\'checked\': isChecked}" ng-click="toggle()" ng-change="change()"></div>',
        replace: true,
        scope: {
            changeFn: '&' // example how to call function of controller from the directive
        },
        require: 'ngModel',
        link: function (scope, element, attrs, model) {

            model.$formatters.unshift(function (value) {
                scope.isChecked = value == true;
                return value;
            });

            scope.toggle = function () {
                scope.isChecked = !scope.isChecked; // for UI
                // update model - I mean activity.selected = true/false
                model.$setViewValue(scope.isChecked);
            };

            scope.change = function () {
                scope.changeFn(); // actually calling changedActivities() function from EventFilterController.js
            };
        }
    };
});

app.directive('eventDateupdate', function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/event-date-update.html',
        scope: {
            event: '=event'
        },
        link: function (scope, element, attr) {
            scope.edit = function () {
                scope.show = !scope.show;
                $("#dtBox2").DateTimePicker({
                    isPopup: false,
                    dateFormat: "yyyy-MM-dd", // this parameter not working with ru.localization of Datetimepicker.js.
                    // Overrided in source code of this lib DateTimePicker-i18n-ru.js
                    language: "ru"
                });
            };
            scope.save = function () {
                //var data = {'phone': scope.account.phone,
                //'sms_notification': scope.account.sms_notification};
                //AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                //    scope.show = false;
                //});
            };
        }
    };
});

app.directive('eventPlaceupdate', function () {
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

app.directive('eventPriceupdate', function () {
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