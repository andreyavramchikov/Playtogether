var app = angular.module('playTogether');

app.controller('EventFilterController', function ($scope, $http) {

     //// CODE FOR SLIDER RANGE - all calculations in minutes
    $scope.minTime = 4 * 60;
    $scope.maxTime = 24 * 60;
    // default the user's values to the available range
    $scope.userMinTime = 4 * 60;
    $scope.userMaxTime = 24 * 60;
    ///// END OF SLIDER RANGE CODE

    DAYS_IN_WEEK = 7;
    $scope.dates = [];
    $scope.currentweek = moment();

    $http.get('/api/v1/activity').then(function (response) {
        $scope.activities = response.data.results;
    });
    var query_params = [];

    $scope.getQueryString = function () {
        //COPY PAST FROM USER - SHOULD BE CHANGED
        var selectedActivity = _.filter($scope.activities, function(activity){
            return activity.selected;}),
            selectedActivityIds = null;

        if (selectedActivity.length > 0) {
            selectedActivityIds = _.map(selectedActivity, 'id');
            query_params = [
                {name : "selected_activity_ids", value: selectedActivityIds}
            ];
        }

        if ($scope.selectedCity != undefined && $scope.selectedCity != null) {
            query_params.city = $scope.selectedCity;
        }
        if ($scope.is_paid != undefined && $scope.is_paid != null) {
            query_params.is_paid = $scope.is_paid;
        }

        if ($scope.selectedActivity != undefined && $scope.selectedActivity != null) {
            query_params.activity__name = $scope.selectedActivity;
        }

        if ($scope.currentDate != undefined && $scope.currentDate != null) {
            //query_params.start_date = $scope.currentDate['value'];
            query_params.push({name: 'start_date', value: $scope.currentDate['value']})
        }

        if ($scope.userMinPrice != undefined && $scope.userMinPrice != null) {
            query_params.userMinPrice = $scope.userMinPrice;
        }

        if ($scope.userMaxPrice != undefined && $scope.userMaxPrice != null) {
            query_params.userMaxPrice = $scope.userMaxPrice;
        }

        return $.param(query_params);
    };

    getFilteredEvents = function () {
        var queryString = $scope.getQueryString();
        console.log(queryString);
        if (queryString) {
            $http.get("/api/v1/event?" + queryString).then(function (response) {
                $scope.$parent.events = response.data.results;
            });
        }
    };

    //I use debounce just for the slider purpose, to avoid every milisecond run http call to server
    $scope.$watchGroup(['selectedCity', 'is_paid', 'selectedActivity', 'event_date', 'userMinPrice', 'userMaxPrice', 'currentDate'],
        _.debounce(getFilteredEvents, 300));

    $scope.$watch('activities', function(newValue, oldValue, scope){
        getFilteredEvents();
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


app.filter('timeRangeFilter', function () {
    return function (value, max) {
        if (value == max) { return 'All'; }

        var h = parseInt(value / 60);
        var m = parseInt(value % 60);

        var hStr = (h > 0) ? h + ':'  : '';
        var mStr = (m > 0) ? m + '' : '';
        var glue = (hStr && !mStr) ? '00' : '';

        return hStr + glue + mStr;
    };
});


app.directive('collapseBlock', function(){
    return function (scope, element, attrs) {
        element.on('click', function () {
            scope.$apply(function () {
                scope[attrs.model] = scope[attrs.model] == true ? false : true;
            });
        });
    }
});