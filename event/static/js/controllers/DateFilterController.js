var app = angular.module('playTogether');

app.controller('DateFilterController', function ($scope, $http) {

    DAYS_IN_WEEK = 7;
    $scope.dates = [];
    $scope.currentweek = moment();

    $scope.$watch('currentDate', function(newValue, oldValue, scope){
        $scope.$parent.currentDate = $scope.currentDate;
    }, true);

    var _generateDates = function (startDate) {
        _.times(DAYS_IN_WEEK, function (index) {
            var date = moment(startDate, "DD-MM-YYYY").add(index, 'days');
            $scope.dates.push({'name': date.format('dddd'), 'value': date.format('DD-MM-YYYY')});
        });
    };
    _generateDates(moment());
});


app.directive('weekDate', function () {
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/week_date.html',
        scope: {
            dates: '=dates',
            current: '=ngModel',
            currentweek: '=currentweek'
        },
        link: function (scope, element, attr) {
            scope.dateSelected = function (date) {
                scope.current = date;
            };

            _updateDates = function(action){
                if (action == 'Next') {
                    scope.currentweek = moment(scope.currentweek, "DD-MM-YYYY").add(7, 'days');
                }else if (action == 'Last'){
                    scope.currentweek = moment(scope.currentweek, "DD-MM-YYYY").add(-7, 'days');
                }

                scope.current = ({'name': scope.currentweek.format('dddd'),
                    'value': scope.currentweek.format('DD-MM-YYYY')});

                scope.dates = [];
                _.times(DAYS_IN_WEEK, function (index) {
                    var date = moment(scope.currentweek, "DD-MM-YYYY").add(index, 'days');
                    scope.dates.push({
                        'name': date.format('dddd'),
                        'value': date.format('DD-MM-YYYY')
                    });
                });
            };

            scope.clickNextWeek = function () {
                _updateDates('Next');
            };

            scope.clickLastWeek = function(){
                _updateDates('Last');
            }
        }
    };
});

app.filter('cutYearFilter', function () {
    return function (value) {
        return value.substring(0, value.length - 5);;
    };
});