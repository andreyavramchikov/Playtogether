var app = angular.module('playTogether');


app.service('UserService', function($http){

    this.getUsers = function(){
        return $http.get('/api/v1/user');
    };

});