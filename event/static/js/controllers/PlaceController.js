var app = angular.module('playTogether');

app.controller('PlaceController', function ($scope, PlaceService) {
    PlaceService.getPlaces().then(function(data){
        $scope.places = data.data.results;
    });

    $scope.getMoreItems = function(){
        PlaceService.getPlaces().then(function(data){
            var results = data.data.results[0];
            $scope.places.push(results);
//            angular.forEach(results, function (place) {
//                $scope.places.push(place);
//            });
        });
    }
});