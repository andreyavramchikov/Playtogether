var app = angular.module('playTogether',['ngRoute', 'ngCookies', 'infinite-scroll']);
app.config(function($locationProvider, $interpolateProvider, $routeProvider){

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    $routeProvider
        .when('/', {
            templateUrl: 'static/pages/main.html',
            controller: 'MainController',
            title: 'Home'
        })
        .when('/register', {
            controller: 'RegisterController',
            templateUrl: '/static/pages/authentication/register.html',
            title: 'Register'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: '/static/pages/authentication/login.html',
            title: 'Login'
        })
        .when('/events', {
            controller: 'EventController',
            templateUrl: '/static/pages/events.html',
            title: 'Events'
        })
        .when('/places', {
            controller: 'PlaceController',
            templateUrl: '/static/pages/places.html',
            title: 'Places'
        })
        .when('/teams', {
            controller: 'TeamController',
            templateUrl: '/static/pages/teams.html',
            title: 'Teams'
        })
        .when('/users', {
            controller: 'UserController',
            templateUrl: '/static/pages/users.html',
            title: 'Users'
        })
        .otherwise({ redirectTo: '/' });

//        this is for avoiding # in urls, this is not work in all browsers
//        need to refactored to switch to basic behavior if browser not allow HTML5 history
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
});

app.filter('cityPrefix', function() {
    return function(city) {
        return 'г. ' + city;
    }
});

app.filter('isPaidString', function() {
    return function(is_paid) {
        if (is_paid) {
            return 'Платно'
        } else {
            return 'Бесплатно'
        }
    }
});


app.run(function($http, $rootScope) {
//  for csrf protection
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

//    when url changes then dynamicly change the title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });

});