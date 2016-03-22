var app = angular.module('playTogether');

app.controller('BodyController', function ($scope, $rootScope) {
    $scope.closeMobileMenu = function(){
       $('#mobile-menu-input').attr('checked', false);
    }
});
