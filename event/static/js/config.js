var app = angular.module('playTogether');

app.config(function($locationProvider, $httpProvider, $interpolateProvider, $stateProvider, $urlRouterProvider){

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

//    $urlRouterProvider.otherwise('home');

    $stateProvider
        .state('home', {
            url : '/',
            templateUrl: 'static/pages/main.html',
            controller: 'MainController',
            title: 'Home'
        })
        .state('registerStep1', {
            url : '/register/step-1',
            controller: 'RegisterController',
            templateUrl: '/static/pages/authentication/register_step_1.html',
            title: 'Register'
        })
        .state('registerStep2', {
            url : '/register/step-2/:userId',
            controller: 'RegisterStep2Controller',
            templateUrl: '/static/pages/authentication/register_step_2.html',
            title: 'Register-Step-2'
        })
        .state('registerStep3', {
            url : '/register/step-3/:userId',
            controller: 'RegisterStep3Controller',
            templateUrl: '/static/pages/authentication/register_step_3.html',
            title: 'Register-Step-3'
        })
        .state('login', {
            url : '/login',
            controller: 'LoginController',
            templateUrl: '/static/pages/authentication/login.html',
            title: 'Login'
        })
        .state('events', {
            url : '/events/',
            controller: 'EventController',
            templateUrl: '/static/pages/events.html',
            title: 'Events'
        })
        .state('createevent', {
            url : '/createevent/',
            controller: 'CreateEventController',
            templateUrl: '/static/pages/create_event.html',
            title: 'Create Event'
        })
        .state('places', {
            url : '/places/',
            controller: 'PlaceController',
            templateUrl: '/static/pages/places.html',
            title: 'Places'
        })
        .state('teams', {
            url : '/teams/',
            controller: 'TeamController',
            templateUrl: '/static/pages/teams.html',
            title: 'Teams'
        })
        .state('users', {
            url : '/users/',
            controller: 'UserController',
            templateUrl: '/static/pages/users.html',
            title: 'Users'
        })
        .state('test', {
            url : '/test/',
            controller: 'TestController',
            templateUrl: '/static/pages/test.html',
            title: 'Venue'
        });


        //this is for avoiding # in urls, this is not work in all browsers
        //need to refactored to switch to basic behavior if browser not allow HTML5 history
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
});