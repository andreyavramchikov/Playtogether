var app = angular.module('playTogether');


app.service('PlaceService', function($http){

    this.getPlaces = function(){
        return $http.get('/api/v1/place');
    };

});