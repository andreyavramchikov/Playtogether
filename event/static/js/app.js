var app = angular.module('playTogether',['ui.router','infinite-scroll',
    'authentication', 'ui-rangeSlider',
    'ui.mask', 'ui.bootstrap']);

app.run(function($http, $filter, $rootScope, AuthenticationService) {
    //for csrf protection
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

    angular.element(document).on("click", function(e) {
		$rootScope.$broadcast("documentClicked", angular.element(e.target));
	});

    //when url changes then dynamicly change the title
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });

    //update rootscope to get everywhere dates
    var day_offset = 24 * 60 * 60 * 1000,
        today = new Date(),
        tomorrow = new Date(today.getTime() + day_offset),
        after_tomorrow = new Date(tomorrow + day_offset),
        later = new Date(tomorrow - 1000 * day_offset);

    $rootScope.TODAY_DATE = $filter('date')(today, 'yyyy-MM-dd'),
    $rootScope.TOMORROW_DATE = $filter('date')(tomorrow, 'yyyy-MM-dd'),
    $rootScope.AFTER_TOMORROW_DATE = $filter('date')(after_tomorrow, 'yyyy-MM-dd'),
    $rootScope.LATER_DATE = $filter('date')(later, 'yyyy-MM-dd');

    $rootScope.IS_AUTHENTICATED = AuthenticationService.isAuthenticated();

});