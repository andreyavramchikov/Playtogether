var app = angular.module('playTogether');


app.service('TeamService', function($http){

    this.getTeams = function(){
        return $http.get('/api/v1/team');
    };

});