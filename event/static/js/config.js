var app = angular.module('playTogether');

app.config(function ($locationProvider, $httpProvider, $interpolateProvider, $stateProvider) {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    $stateProvider
        .state('register-step-1', {
            url : '/register/step-1/',
            controller: 'RegisterStep1Controller',
            templateUrl: '/static/pages/authentication/register-step-1.html',
            title: 'Регистрация'
        })
        .state('register-step-2', {
            url: '/register/step-2',
            params: {
                userId: null
            },
            controller: 'RegisterStep2Controller',
            templateUrl: '/static/pages/authentication/register-step-2.html',
            title: 'Регистрация шаг 2'
        })
        .state('register-step-3', {
            url: '/register/step-3',
            params: {
                userId: null
            },
            controller: 'RegisterStep3Controller',
            templateUrl: '/static/pages/authentication/register-step-3.html',
            title: 'Регистрация шаг 3'
        })
        .state('register-step-4', {
            url: '/register/step-4',
            params: {
                userId: null
            },
            controller: 'RegisterStep4Controller',
            templateUrl: '/static/pages/authentication/register-step-4.html',
            title: 'Регистрация шаг 4'
        })
        .state('register-step-5', {
            url: '/register/step-5',//without slash because we have params
            params: {
                userId: null
            },
            controller: 'RegisterStep5Controller',
            templateUrl: '/static/pages/authentication/register-step-5.html',
            title: 'Регистрация шаг 5'
        })
        .state('login', {
            url: '/login/',
            controller: 'LoginController',
            templateUrl: '/static/pages/authentication/login.html',
            title: 'Войти',
            loginRequired: false
        })
        .state('profile', {
            url: '/profile/',
            controller: 'ProfileController',
            templateUrl: '/static/pages/authentication/profile.html',
            title: 'Аккаунт',
            loginRequired: true
        })
        .state('logout', {
            url: '/logout/',
            controller: 'LogoutController',
            title: 'Выйти',
            loginRequired: true
        })
        .state('events', {
            url: '/events/',
            params: {
                activityId: null
            },
            controller: 'ListEventController',
            templateUrl: '/static/pages/events.html',
            title: 'События'
        })
        .state('event', {
            url: '/event/:eventId/',
            controller: 'EventController',
            templateUrl: '/static/pages/event.html',
            title: 'Событие'
        })
        .state('createevent', {
            url: '/createevent/',
            controller: 'CreateEventController',
            templateUrl: '/static/pages/create-event.html',
            title: 'Создай событие',
            loginRequired: true
        })
        .state('places', {
            url: '/places/',
            controller: 'PlaceController',
            templateUrl: '/static/pages/places.html',
            title: 'Места'
        })
        .state('landing', {
            url: '/landing/',
            controller: 'LandingController',
            templateUrl: '/static/pages/landing/landing.html',
            title: 'Старт'
        })
        .state('users-to-event', {
            url: '/users/:eventId',
            controller: 'UserController',
            templateUrl: '/static/pages/users.html',
            title: 'Участники'
        })
        .state('users', {
            url: '/users/',
            controller: 'UserController',
            templateUrl: '/static/pages/users.html',
            title: 'Участники'
        })
        .state('forgot-password', {
            url: '/forgot_password/',
            controller: 'ForgotPasswordController',
            templateUrl: '/static/pages/authentication/forgot_password/forgot-password.html',
            title: 'Забыли пароль'
        })
        .state('forgot-password-confirmation', {
            url: '/forgot_confirmation/:email/',
            controller: 'ForgotConfirmationController',
            templateUrl: '/static/pages/authentication/forgot_password/forgot-password-confirmation.html',
            title: 'Забыли пароль'
        })
        .state('reset-password-confirm', {
            url: '/account/reset_password_confirm/:uidb64;:token/',
            controller: 'ResetPasswordController',
            templateUrl: '/static/pages/authentication/forgot_password/reset-password-confirm.html',
            title: 'Сменить пароль'
        });

        //this is for avoiding # in urls, this is not work in all browsers
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
});