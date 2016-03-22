"use strict";

var app = angular.module('playTogether');

app.directive('updateEmail', function (AuthenticationService) {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/update-email.html',
        scope: {
            field: '=ngModel',
            label: '@',
            defaultEmail: '='
        },
        replace: true,
        link: function (scope, element, attr) {
            scope.editClick = function () {

            };
            scope.save = function () {
                var data = {};
                data[attr.name] = scope.field;
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function (response) {
                    scope.show = false;
                    scope.defaultEmail = response.data.email;
                });
            };

            scope.cancel = function () {
                scope.show = false;
                // revert to initial value of email field
                scope.field = scope.defaultEmail;
            };
        }
    };
});

app.directive('updateChoicefield', function (AuthenticationService) {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/update-choicefield.html',
        scope: {
            field: '=ngModel',
            label: '@label',
            defaultValue: '=',
            placeholders: '@placeholders',
            choices: '=choices'
        },
        link: function (scope, element, attr) {
            scope.save = function () {
                var data = {};
                data[attr.name] = scope.field.name;
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function (response) {
                    scope.show = false;
                    scope.defaultValue = {'name': response.data[attr.name]};
                });
            };

            scope.cancel = function () {
                scope.show = false;
                // revert to initial value of email field
                scope.field = scope.defaultValue;
            };
        }
    };
});

app.directive('updatePhone', function (AuthenticationService) {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/update-phone.html',
        scope: {
            account: '=account'
        },
        link: function (scope, element, attr) {
            scope.save = function () {
                var data = {
                    'phone': scope.account.phone,
                    'sms_notification': scope.account.sms_notification
                };
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function () {
                    scope.show = false;
                });
            };
        }
    };
});

app.directive('updateActivities', function (ActivityService) {
    var _getData = function (scope) {
        //copy past register-step-4
        var activities = scope.account.activity_users.map(function (user_activity) {
            return {
                'id': user_activity.activity.id,
                'level': user_activity.level
            };
        });
        return {'activities': activities};
    };

    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/update-activities.html',
        scope: {
            account: '=account'
        },
        link: function (scope, element, attr) {
            scope.save = function () {

                ActivityService.updateUserActivities(_getData(scope)).then(function () {
                    scope.show = false;
                });
            }
        }
    };
});