"use strict";

var app = angular.module('playTogether');

app.controller('ProfileController', function ($scope, $rootScope, AuthenticationService) {

    $scope.schedule_choices = [
        {name: 'ВСЕГДА'},
        {name: 'БУДНИ'},
        {name: 'ВЫХОДНЫЙ'}
    ];

    $scope.sex_choices = [
        {name: 'МУЖСКОЙ'},
        {name: 'ЖЕНСКИЙ'}
    ];

    AuthenticationService.getUser().then(function(response) {
        $scope.account = response.data;
        $scope.account.defaultEmail = $scope.account.email;
        $scope.account.sex = {'name': $scope.account.sex}; //because dropdown directive use this format {'name': 'value'}
        $scope.account.defaultSex = $scope.account.sex;
        $scope.account.schedule_to_play = {'name': $scope.account.schedule_to_play};
        $scope.account.defaultSchedule = $scope.account.schedule_to_play;
    });

    $('#wrapper-profile').on("click", function (e) {
        $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });

});