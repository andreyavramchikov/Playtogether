var app = angular.module('playTogether',['ui.router','infinite-scroll',
    'authentication', 'ui-rangeSlider',
    'ui.mask', 'ui.bootstrap']);

app.run(function($http, $filter, $rootScope, $state, AuthenticationService) {
    //for csrf protection
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

    //when url changes then dynamicly change the title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (!fromState.name){
            // if we refresh the page then we need huck because .getUser not complited when self function called so
            // we need to recall it here
            AuthenticationService.getUser().then(function(response){}, function(){
                $state.transitionTo("login");
                event.preventDefault();
            });
        }else {
            if (toState.loginRequired && !AuthenticationService.isAuthenticated()) {
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        }
    });

    AuthenticationService.getUser().then(function(response){
        AuthenticationService.setAuthenticatedAccount(response.data);
        $rootScope.authenticatedUser = response.data;
        $rootScope.IS_AUTHENTICATED = true;
    }, function(){
        $rootScope.IS_AUTHENTICATED = false;
    });

});