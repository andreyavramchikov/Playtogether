var app = angular.module('authentication');

app.controller('RegisterController', function ($http, $scope) {
    //weird angular-tabs not working without ng-repeat in template, that's why I use here tabs list'
    $scope.tabs = [{ title:'Dynamic Title 1',content:'Dynamic content 1' }];
});




