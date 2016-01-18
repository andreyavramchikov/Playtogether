var app = angular.module('playTogether');

app.config(function($locationProvider, $httpProvider, $interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('TestController', function ($scope, $http) {
    $scope.products = [
        { name: "Apples", category: "Fruit", price: 1.20, expiry: 10 },
        { name: "Bananas", category: "Fruit", price: 2.42, expiry: 7 },
        { name: "Pears", category: "Fruit", price: 2.02, expiry: 6 }
    ];

    $scope.incrementPrices = function () {
        for (var i = 0; i < $scope.products.length; i++) {
            $scope.products[i].price++;
        }
    }

});



 app.filter("isStatus ", function() { // register new filter
     return function(user, secondParam, thirdParam) { // filter arguments

       return user.status == $scope.status; // implementation
    };
 });
