var app = angular.module('authentication');

app.service('AuthenticationService', function($http, $cookies, $rootScope){
    this.registerStep1 = function(email, password){
        return $http.post('/api/v1/accounts/', {
            password: password,
            email: email
        });
    };

    this.updateProfile = function(userId, data){
        return $http.put('api/v1/accounts/' + userId + '/', data);
    };

    this.registerStep2 = function(userId, data){
        return $http.put('api/v1/accounts/' + userId + '/', data);
    };

    this.registerStep3 = function(userId, data){
        return $http.put('api/v1/accounts/' + userId + '/', data);
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

    this.getUserId = function(){
        var account = $cookies.authenticatedAccount;
        if (account){
            return JSON.parse(account).id;
        } else return;
    };

    this.forgotPassword = function(data){
        return $http.post('/api/v1/forgot_password/', data);
    };

    this.resetConfirm = function(data){
        return $http.post('/api/v1/reset-confirm/', data);
    }

});