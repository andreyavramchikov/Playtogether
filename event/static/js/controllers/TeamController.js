var app = angular.module('playTogether');

app.controller('TeamController', function ($scope, TeamService) {
    TeamService.getTeams().then(function(data){
        $scope.teams = data.data.results;
    });
});