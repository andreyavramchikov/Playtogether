var app = angular.module('playTogether');

app.config(function($locationProvider, $httpProvider, $interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('VenueController', function ($scope, $http) {

});


 app.filter("isStatus ", function() { // register new filter
     return function(user, secondParam, thirdParam) { // filter arguments

       return user.status == $scope.status; // implementation
    };
 });
