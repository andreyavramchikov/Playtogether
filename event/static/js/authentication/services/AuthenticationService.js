var app = angular.module('authentication');

app.service('AuthenticationService', function($http, $cookies, $rootScope){
    this.register = function(email, password){
        return $http.post('/api/v1/accounts/', {
            password: password,
            email: email
        });
    };

    this.registerStep2 = function(id, sex){
        return $http.put('api/v1/accounts/' + id + '/', {
            'sex': sex
        });
    };

    this.registerStep3 = function(id, sex){
        return $http.put('api/v1/accounts/' + id + '/', {
            'sex': 'tmp'
        });
    };

    this.login = function(email, password){
        return $http.post('/api/v1/auth/login/', {
            password: password,
            email: email
        });
    };

    this.logout = function(){
        return $http.post('/api/v1/auth/logout/');
    };

    this.getAuthenticatedAccount = function () {
        if (!$cookies.authenticatedAccount) {
            return;
        }
        return JSON.parse($cookies.authenticatedAccount);
    };


    this.isAuthenticated = function(){
        return !!$cookies.authenticatedAccount;
    };

    this.setAuthenticatedAccount = function(account){
        $cookies.authenticatedAccount = JSON.stringify(account);
    };

    this.unauthenticate = function() {
      delete $cookies.authenticatedAccount;
    };
});