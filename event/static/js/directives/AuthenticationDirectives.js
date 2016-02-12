var app = angular.module('playTogether');

app.directive('userSex', function(){
    return function (scope, element, attrs) {
        element.on('click', function(){
            scope.$apply(function() {
              scope.sex = element.data('sex');
           });
        });
    }
});

app.directive('userSchedule', function () {
    return function (scope, element, attrs) {
        element.on('click', function () {
            scope.$apply(function () {
                scope.schedule = element.data('schedule');
            });
        });
    }
});

app.directive('updateEmail', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_email.html',
        scope: {
            field: '=ngModel',
            label: '@label'
        },
        replace: true,
        link: function (scope, element, attr) {
            scope.editClick = function(){

            };
            scope.save = function(){
                var data = {};
                data[attr.name] = scope.field;
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});

app.directive('updateChoicefield', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_choicefield.html',
        scope: {
            field: '=ngModel',
            label: '@label',
            placeholders: '@placeholders',
            choices: '=choices'
        },
        link: function (scope, element, attr) {
            scope.save = function(){
                var data = {};
                data[attr.name] = scope.field['name'];
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});

app.directive('updatePhone', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_phone.html',
        scope: {
            account: '=account'
        },
        link: function (scope, element, attr) {
            scope.save = function(){
                var data = {'phone': scope.account.phone,
                'sms_notification': scope.account.sms_notification};
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});