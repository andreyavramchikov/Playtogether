var app = angular.module('playTogether');

app.config(function($locationProvider, $httpProvider, $interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('VenueController', function ($scope, $http) {

    $http.get('/api/v1/venues/').then(function(response){
        $scope.venues = response.data;
    });

    $http.get('/api/v1/prepaid-venues/').then(function(response){
         $scope.prepaid_venues = response.data;
    });


    $scope.addToPrepaiment = function(){
        //get all selected venues and add to prepaiment venues and remove them from venues
        var selectedVenues = $scope.data.selectedOption;
        console.log($scope.venues.length);
        _.each(selectedVenues, function(item) {
            $scope.prepaid_venues.push(item);
            $scope.venues = _.reject($scope.venues, function(element){
                return element.pk === item.pk;
            });


        });
        console.log($scope.venues.length);

    };

    $scope.removeFromPrepaiment = function(){
        //get all selected venues and add to prepaiment venues and remove them from venues
        var selectedVenues = $scope.data.selectedOption2;
        console.log($scope.prepaid_venues.length);
        _.each(selectedVenues, function(item) {
            $scope.venues.push(item);
            $scope.prepaid_venues = _.reject($scope.prepaid_venues, function(element){
                return element.pk === item.pk;
            });
        });
        console.log($scope.prepaid_venues.length);
    };

    $scope.clearAll = function(){
        _.each($scope.prepaid_venues, function(item){
            $scope.venues.push(item);
            $scope.prepaid_venues = _.reject($scope.prepaid_venues, function(element){
                return element.pk === item.pk;
            });
        });

    };


    $scope.savePrepaimentVenues = function(){
        var prepaimentIds = [];
        _.each($scope.prepaid_venues, function(item){
            prepaimentIds.push(item.pk);
        });
        var payload = {'prepaimentIds' : prepaimentIds};
        //$http.get('/api/v1/prepaiment/?list=' + prepaimentIds).then(function(response){
        //    alert('Successfully saved prepaiment ids');
        //})

         alert(prepaimentIds);
        $http.post('/api/v1/prepaiment/', payload).then(function(response){
             alert(prepaimentIds);
        });

    }


});


 app.filter("isStatus ", function() { // register new filter
     return function(user, secondParam, thirdParam) { // filter arguments

       return user.status == $scope.status; // implementation
    };
 });
