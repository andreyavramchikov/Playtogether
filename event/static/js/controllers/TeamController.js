var app = angular.module('playTogether');

app.controller('TeamController', function ($scope, TeamService) {
    TeamService.getTeams().then(function(response){
        $scope.teams = response.datas;
    });
});