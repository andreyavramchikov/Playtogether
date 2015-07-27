var app = angular.module('playTogether');


app.service('EventService', function($http){

    this.getEvents = function(){
        return $http.get('/api/v1/event/');
    };

});