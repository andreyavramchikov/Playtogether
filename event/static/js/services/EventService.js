var app = angular.module('playTogether');

app.service('EventService', function($http, AuthenticationService){

    this.getEvents = function(data){
        return $http.get('/api/v1/event?' + data);
    };

    this.createEvent = function(data){
        return $http.post('/api/v1/event/create', data);
    };

    this.updateEventUsers = function(data){
        return $http.post('api/v1/updateeventusers/', data);
    }

    this.filterEventsByUser = function(events){
        var userId = AuthenticationService.getUserId();
        _.each(events, function(event, index){
            if ( _.some(event.event_users, function (event_user) {
              return event_user === userId;
            })) {
                events[index].user_done = true;
            }
        });
        return events;
    }

});