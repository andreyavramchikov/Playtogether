"use strict";

/**
 * Best practices how to connect Global dependencies
 * From - https://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make
 */
var lodash = angular.module('lodash', []);
lodash.factory('_', function () {
    return window._; //lodash must already be loaded on the page
});

var momentModule = angular.module('moment', []);
momentModule.factory('moment', function () {
    return moment;
});


var app = angular.module('playTogether', ['ui.router', 'infinite-scroll',
    'ui-rangeSlider', 'ui.mask',
    'ui.bootstrap', 'angucomplete',
    'lodash','moment', 'authentication','filters'
]);

app.run(function ($http, $rootScope, $state, AuthenticationService) {
    //for csrf protection
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

    //when url changes then dynamicly change the title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.loginRequired && !fromState.name) {
            // if we refresh the page then we need huck because .getUser not complited when self function called so
            // we need to recall it here
            AuthenticationService.getUser().then(function (){

            }, function () {
                // if error - means that is not authenticated user
                $rootScope.returnToState = toState.name; // this parameter for history (example: if we go to protected - loginrequired url and we are not authenticated then after we logged in we want automatically come back to the original url
                $state.transitionTo("login");
                event.preventDefault();
            });
        } else {
            if (toState.loginRequired && !AuthenticationService.isAuthenticated() ) {
                // User isn’t authenticated
                $rootScope.returnToState = toState.name;
                $state.transitionTo("login");
                event.preventDefault();
            }
        }
    });
    $rootScope.authenticatedUser = {};
    AuthenticationService.getUser().then(function (response) {
        AuthenticationService.setAuthenticatedAccount(response.data);
        $rootScope.authenticatedUser = response.data;
        $rootScope.IS_AUTHENTICATED = true;
    }, function () {
        $rootScope.IS_AUTHENTICATED = false;
    });

});