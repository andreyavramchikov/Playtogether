var app = angular.module('playTogether');

app.controller('DateFilterController', function ($scope, $http) {

    DAYS_IN_WEEK = 7;
    $scope.dates = [];
    $scope.currentweek = moment();
    $scope.currentDate = ({'name': $scope.currentweek.format('dddd'),
                    'value': $scope.currentweek.format('DD-MM-YYYY')});

    $scope.$watch('currentDate', function(newValue, oldValue, scope){
        $scope.$parent.currentDate = $scope.currentDate;
    }, true);

    var _generateDates = function (startDate) {
        _.times(DAYS_IN_WEEK, function (index) {
            var date = moment(startDate, "DD-MM-YYYY").add(index, 'days');
            $scope.dates.push(  {'name': date.locale("ru").format('dddd'),
                                'value': date.locale("ru").format('DD-MM-YYYY')}
            );
        });
    };
    _generateDates(moment());
});