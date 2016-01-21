var app = angular.module('authentication');

app.controller('RegisterStep1Controller', function ($http, $scope, $rootScope, $location, $state, AuthenticationService) {
    $scope.register = function () {
        var email = $scope.user.email,
            password = $scope.user.password;

        AuthenticationService.register(email, password).then(function (response) {
            var data = response.data;
            AuthenticationService.login(data.email, data.password).then(function (response) {
                    AuthenticationService.setAuthenticatedAccount(response.data);  //MUST TO THIN TO REFACTORED THIS LINE BECAUSE REPEATED IN SOME PLACES
                    //MUST TO MOVE IT AND MAYBE THE LINE ABOVE INTO SERVICE
                    $rootScope.IS_AUTHENTICATED = true;
                    $state.go('registerStep2');
                }
            );
        }, function (response) {
            var errors = response.data.errors;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    }
});


//
//$scope.errors = {};
//
//    $scope.register = function(){
//        var username = $scope.username,
//            email = $scope.email,
//            password = $scope.password,
//            phone = $scope.phone,
//            sendSMS = $scope.send_sms;
//
//        AuthenticationService.register(email, username, password, phone, sendSMS).then(
//            function(response){
//                var data = response.data,
//                    userId = data.pk;
//
//                AuthenticationService.login(data.email, data.password).then(function(response){
//                    AuthenticationService.setAuthenticatedAccount(response.data);  //MUST TO THIN TO REFACTORED THIS LINE BECAUSE REPEATED IN SOME PLACES
//                    //MUST TO MOVE IT AND MAYBE THE LINE ABOVE INTO SERVICE
//                    $rootScope.IS_AUTHENTICATED = true;
//                    $state.go('registerStep2', {'userId' : userId});
//                });
//            },
//            function(response){
//                var errors = response.data.errors;
//                if (errors){
//                    _.each(errors, function (value, key) {
//                        $scope.errors[key] = value[0];
//                    });
//                }
//            });
//    };