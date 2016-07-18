"use strict";

var app = angular.module('playTogether');

app.controller('EventDateFilterController', ['$scope', '_', 'moment', function ($scope,_, moment) {

    var DAYS_IN_WEEK = 7;
    $scope.dates = [];
    $scope.currentweek = moment();
    $scope.date.currentDate = ({'name': $scope.currentweek.format('dddd'),
                    'value': $scope.currentweek.format('DD-MM-YYYY')});

    var generateDates = function (startDate) {
        _.times(DAYS_IN_WEEK, function (index) {
            var date = moment(startDate, "DD-MM-YYYY").add(index, 'days');
            $scope.dates.push(  {'name': date.locale("ru").format('dddd'),
                                'value': date.locale("ru").format('DD-MM-YYYY')}
            );
        });
    };
    generateDates(moment());
}]);