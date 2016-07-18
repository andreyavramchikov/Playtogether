var app = angular.module('playTogether');

app.service('UserService', function($http){
    this.getUsers = function(){
        return $http.get('/api/v1/user');
    };

    this.filterUsers = function(data) {
        return $http.get('/api/v1/user?' + data);
    }
});