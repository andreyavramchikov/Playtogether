var app = angular.module('playTogether');


app.service('ActivityService', function($http){

    this.getActivities = function(){
        return $http.get('/api/v1/activity');
    };

    this.createActivity = function(data){
        return $http.post('/api/v1/activity', data)
    };

    this.updateUserActivities = function(data) {
      return $http.post('/api/v1/updateuseractivities/', data);
    }

});