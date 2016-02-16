var app = angular.module('playTogether');

app.controller('ProfileController', function ($scope, $rootScope, TeamService, AuthenticationService) {
    AuthenticationService.getUser().then(function(response){
        $scope.account = response.data;
        $scope.account.sex = {'name': $scope.account.sex}; //because dropdown directive use this format {'name': 'value'}
        $scope.account.schedule_to_play = {'name': $scope.account.schedule_to_play};
    });

    $('#profile').on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });

    $scope.schedule_choices = [{name: 'ВСЕГДА'},
        {name: 'БУДНИ'},
        {name: 'ВЫХОДНЫЕ'}];

    $scope.sex_choices = [{name: 'МУЖСКОЙ'},
        {name: 'ЖЕНСКИЙ'}];

});