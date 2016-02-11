var app = angular.module('playTogether');

app.config(function($locationProvider, $httpProvider, $interpolateProvider, $stateProvider, $urlRouterProvider){

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    $stateProvider
        .state('registerStep1', {
            url : '/register/step-1/',
            controller: 'RegisterStep1Controller',
            templateUrl: '/static/pages/authentication/register_step_1.html',
            title: 'Регистрация'
        })
        .state('registerStep2', {
            url : '/register/step-2/:userId',
            controller: 'RegisterStep2Controller',
            templateUrl: '/static/pages/authentication/register_step_2.html',
            title: 'Регистрация шаг 2'
        })
        .state('registerStep3', {
            url : '/register/step-3/:userId',
            controller: 'RegisterStep3Controller',
            templateUrl: '/static/pages/authentication/register_step_3.html',
            title: 'Регистрация шаг 3'
        })
        .state('registerStep4', {
            url : '/register/step-4/:userId',
            controller: 'RegisterStep4Controller',
            templateUrl: '/static/pages/authentication/register_step_4.html',
            title: 'Регистрация шаг 4'
        })
        .state('registerStep5', {
            url : '/register/step-5/:userId',
            controller: 'RegisterStep5Controller',
            templateUrl: '/static/pages/authentication/register_step_5.html',
            title: 'Регистрация шаг 5'
        })
        .state('login', {
            url : '/login/',
            controller: 'LoginController',
            templateUrl: '/static/pages/authentication/login.html',
            title: 'Войти',
            loginRequired: false
        })
        .state('profile', {
            url : '/profile/',
            controller: 'ProfileController',
            templateUrl: '/static/pages/authentication/profile.html',
            title: 'Аккаунт',
            loginRequired: true
        })
        .state('logout', {
            url : '/logout',
            controller: 'LogoutController',
            title: 'Выйти',
            loginRequired: true
        })
        .state('events', {
            url : '/events/',
            controller: 'EventController',
            templateUrl: '/static/pages/events.html',
            title: 'События'
        })
        .state('createevent', {
            url : '/createevent/',
            controller: 'CreateEventController',
            templateUrl: '/static/pages/create_event.html',
            title: 'Создай событие',
            loginRequired: true
        })
        .state('places', {
            url : '/places/',
            controller: 'PlaceController',
            templateUrl: '/static/pages/places.html',
            title: 'Места'
        })
        .state('teams', {
            url : '/teams/',
            controller: 'TeamController',
            templateUrl: '/static/pages/teams.html',
            title: 'Команды'
        })
        .state('landing', {
            url : '/landing/',
            controller: 'LandingController',
            templateUrl: '/static/pages/landing/landing.html',
            title: 'Старт'
        })
        .state('users', {
            url : '/users/',
            controller: 'UserController',
            templateUrl: '/static/pages/users.html',
            title: 'Участники'
        });

        //this is for avoiding # in urls, this is not work in all browsers
        //need to refactored to switch to basic behavior if browser not allow HTML5 history
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
});