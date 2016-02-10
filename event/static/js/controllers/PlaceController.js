var app = angular.module('playTogether');

app.controller('PlaceController', function ($scope, PlaceService) {
    PlaceService.getPlaces().then(function(response){
        $scope.places = response.data;
    });

    $scope.getMoreItems = function(){
        PlaceService.getPlaces().then(function(response){
            var results = response.data[0];
            $scope.places.push(results);
        });
    }
});