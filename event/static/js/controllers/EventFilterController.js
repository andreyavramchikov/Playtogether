var app = angular.module('playTogether');

app.controller('EventFilterController', function ($scope, $http) {


    //// CODE FOR SLIDER RANGE, JUST EXAMPLE; NEED TO BE REFACTORED ALL
    // set available range
    $scope.minPrice = 100;
    $scope.maxPrice = 999;
    // default the user's values to the available range
    $scope.userMinPrice = $scope.minPrice;
    $scope.userMaxPrice = $scope.maxPrice;
    ///// END OF SLIDER RANGE CODE

    $http.get('/api/v1/city').then(function(response){
        $scope.cities = response.data.results;
    });

    $http.get('/api/v1/activity').then(function(response){
        $scope.activities = response.data.results;
    });

    var query_params = {};
    $scope.getQueryString = function() {
        if ($scope.selectedCity != undefined && $scope.selectedCity != null){
            query_params.city = $scope.selectedCity;
        }
        if ($scope.is_paid != undefined && $scope.is_paid != null) {
            query_params.is_paid = $scope.is_paid;
        }

        if ($scope.selectedActivity != undefined && $scope.selectedActivity != null) {
            query_params.activity__name = $scope.selectedActivity;
        }

        if ($scope.event_date != undefined && $scope.event_date != null) {
            query_params.start_date = $scope.event_date;
        }

        if ($scope.userMinPrice != undefined && $scope.userMinPrice != null) {
            query_params.userMinPrice = $scope.userMinPrice;
        }

        if ($scope.userMaxPrice != undefined && $scope.userMaxPrice != null) {
            query_params.userMaxPrice = $scope.userMaxPrice;
        }

        return $.param(query_params);
    };

    getFilteredEvents = function(){
        var queryString = $scope.getQueryString();
        console.log(queryString);
        if (queryString){
            $http.get("/api/v1/event?" + queryString).then(function(response){
                $scope.$parent.events =  response.data.results;
            });
        }
    };

    //I use debounce just for the slider purpose, to avoid every milisecond run http call to server
    $scope.$watchGroup(['selectedCity', 'is_paid', 'selectedActivity', 'event_date', 'userMinPrice', 'userMaxPrice'],
        _.debounce(getFilteredEvents, 300));


});

