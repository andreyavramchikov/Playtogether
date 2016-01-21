var app = angular.module('authentication');

app.controller('RegisterStep3Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService) {
    $scope.register = function(){
         $state.go('registerStep4');
    }
});

//var userId = $stateParams.userId;
//    console.log(userId);
//    $scope.registerStep3 = function () {
//        AuthenticationService.registerStep3(userId).then(
//            function (response) {
//                console.log('Step 3 is Success');
//                $state.go('home');
//            },
//            function (response) {
//                console.log('Step 3 is Failure');
//                var errors = response.data.errors;
//                if (errors) {
//                    _.each(errors, function (value, key) {
//                        $scope.errors[key] = value[0];
//                    });
//                }
//            });
//    };