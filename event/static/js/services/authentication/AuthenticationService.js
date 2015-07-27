var app = angular.module('playTogether');

app.service('AuthenticationService', function($http, $cookies){
    this.register = function(email, username, password){
        return $http.post('/api/v1/accounts/', {
            username: username,
            password: password,
            email: email
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
    }


});