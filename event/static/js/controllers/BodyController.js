var app = angular.module('playTogether');

app.controller('BodyController', function ($scope) {

    $scope.menuitems = [
        {label: 'Войти', url: '/login/'},
        {label: 'Регистрация', url: '/register/step-1/'},
        {label: 'Аккаунт', url: '/profile/'},
        {label: 'События', url: '/events/'},
        {label: 'Новое', url: '/createevent/'},
        {label: 'Участники', url: '/users/'}
    ];
});

app.directive('mobileMenu', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            menuitems: '='
        },
        templateUrl: '/static/pages/mobile_menu.html',
        link: function(scope) {
            scope.closeMenu = function(){
                $('#mobile-menu-input').attr('checked', false);
            }
        }
    }
});