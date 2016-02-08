var app = angular.module('authentication');

app.service('AuthenticationService', function($http, $cookies, $rootScope){
    this.register = function(email, password){
        return $http.post('/api/v1/accounts/', {
            password: password,
            email: email
        });
    };

    this.registerStep2 = function(userId, data){
        return $http.put('api/v1/accounts/' + userId + '/', data);
    };

    this.registerStep3 = function(id, sex){
        return $http.put('api/v1/accounts/' + id + '/', {
            'sex': 'tmp'
        });
    };

    this.registerStep4 = function(userId, activityId){
        return $http.post('api/v1/user_activities', {
            user: {id: userId},
            activity: {id: activityId}
        });
    };

    this.registerStep5 = function(userId, data){
        return $http.put('api/v1/accounts/' + userId + '/', data);
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


    this.getUser = function(){
        return $http.get('/api/v1/getuser/');
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