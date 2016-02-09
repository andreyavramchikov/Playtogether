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