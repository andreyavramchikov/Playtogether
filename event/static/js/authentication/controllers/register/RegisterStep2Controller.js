var app = angular.module('authentication');

app.controller('RegisterStep2Controller', function ($http, $scope, $location, $state, $cookies, $stateParams, AuthenticationService, ActivityService) {
    $("#dtBox").DateTimePicker( {isPopup : false,dateFormat: "yyyy-MM-dd"});

    $scope.errors = [];

    var _getData = function(){
        return {'sex': $scope.sex, 'date_of_birth': $scope.date_of_birth};
    };

    $scope.registerStep2 = function(){
        var userId = $stateParams.userId;
        AuthenticationService.registerStep2(userId, _getData()).then(function(response){
            $state.go('registerStep3', {'userId' : userId});
        }, function(response){
            var errors = response.data;
            if (errors) {
                _.each(errors, function (value, key) {
                    $scope.errors[key] = value[0];
                });
            }
        });
    };
});