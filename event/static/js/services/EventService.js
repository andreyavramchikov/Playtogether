var app = angular.module('playTogether');

app.service('EventService', function($http){

    this.getEvents = function(data){
        return $http.get('/api/v1/event?' + data);
    };

    this.createEvent = function(data){
        return $http.post('/api/v1/event/create', data);
    };

    this.updateEventUsers = function(data){
        return $http.post('api/v1/updateeventusers/', data);
    }

});