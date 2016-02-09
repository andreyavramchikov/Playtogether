var app = angular.module('playTogether');

app.controller('EventFilterController', function ($scope, $http, EventService, AuthenticationService) {

     //// CODE FOR SLIDER RANGE - all calculations in minutes
    $scope.minTime = 4 * 60;
    $scope.maxTime = 24 * 60;
    // default the user's values to the available range
    $scope.userMinTime = 4 * 60;
    $scope.userMaxTime = 24 * 60;
    ///// END OF SLIDER RANGE CODE

    $http.get('/api/v1/activity').then(function (response) {
        $scope.activities = response.data.results;
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

    _filterEvents = function(events){
        var userId = AuthenticationService.getUserId();
        _.each(events, function(event, index){
            if ( _.some(event.event_users, function (event_user) {
              return event_user === userId;
            })) {
                events[index].user_done = true;
            }
        });
        return events;
    };

    _getFilteredEvents = function () {
        var queryString = $scope.getQueryString();
        if (queryString) {
            EventService.getEvents(queryString).then(function(response){
                $scope.$parent.events = _filterEvents(response.data.results);
            });
        }
    };

    //I use debounce just for the slider purpose, to avoid every milisecond run http call to server
    // MUST CHANGE IT TO NG-CHANGE DIRECTIVES !!!!!
    $scope.$watchGroup(['currentDate'],
        function(newValue, oldValue, scope){
            if (newValue != oldValue){
                _.debounce(_getFilteredEvents(), 300);
            }
        });

    //since upper function somehow not working I use it
    $scope.changedActivities = function(){
        _getFilteredEvents();
    };

});


