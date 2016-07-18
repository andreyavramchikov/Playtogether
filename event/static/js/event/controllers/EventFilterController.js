var app = angular.module('playTogether');

app.controller('EventFilterController',['$scope', 'EventService', 'ActivityService', '_', 'moment', function (
    $scope, EventService, ActivityService, _, moment) {
    moment();
     //// CODE FOR SLIDER RANGE - all calculations in minutes
    $scope.minTime = 4 * 60;
    $scope.maxTime = 24 * 60;
    // default the user's values to the available range
    $scope.userMinTime = 4 * 60;
    $scope.userMaxTime = 24 * 60;
    ///// END OF SLIDER RANGE CODE

    ActivityService.getActivities().then(function (response) {
        $scope.activities = response.data;
        if ($scope.activityChecked){
            // if this page opens after landing page and user choose some activity
            _($scope.activities).forEach(function(activity, index) {
                if (activity.id == $scope.activityChecked){
                    $scope.activities[index].selected = true;
                    // manually force to update events related to filter
                    getFilteredEvents();
                }
            });
        }

    });

    var query_params = [];
    $scope.getQueryString = function () {
        //COPY PAST FROM USER - SHOULD BE CHANGED
        var selectedActivity = _.filter($scope.activities, function(activity){
            return activity.selected;}),
            selectedActivityIds = null;

        selectedActivityIds = _.map(selectedActivity, 'id');
        query_params = [
            {name : "selected_activity_ids", value: selectedActivityIds}
        ];

        if ($scope.selectedActivity != undefined && $scope.selectedActivity != null) {
            query_params.activity__name = $scope.selectedActivity;
        }

        if ($scope.date.currentDate != undefined && $scope.date.currentDate != null) {
            query_params.push({name: 'start_date', value: $scope.date.currentDate['value']})
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
        if (queryString) {
            EventService.getEvents(queryString).then(function(response){
                $scope.$parent.events = EventService.filterEventsByUser(response.data);
            });
        }
    };

    // MUST CHANGE IT TO NG-CHANGE DIRECTIVES !!!!!
    $scope.$watchGroup(['date.currentDate'],
        function (newValue, oldValue, scope) {
                getFilteredEvents();
        }
    );

    //since upper function somehow not working I use it
    $scope.changedActivities = function () {
        getFilteredEvents();
    };

}]);


