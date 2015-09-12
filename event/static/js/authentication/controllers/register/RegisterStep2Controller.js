var app = angular.module('authentication');

app.controller('RegisterStep2Controller', function ($http, $scope, $location, $state, $stateParams, AuthenticationService, ActivityService) {

    FREQUENCY_CHOICES = ['ALWAYS', 'WORKING_DAYS', 'WEEKEND'];
    ACTIVITY_LEVELS = ['NEW', 'MIDDLE', 'ADVANCED'];

    $scope.frequencies = FREQUENCY_CHOICES;
    $scope.levels = ACTIVITY_LEVELS;

    ActivityService.getActivities().then(
        function(response){
            $scope.activities = response.data.results;
            console.log($scope.activities);
        },
        function(response){
            console.log(response.data);
        });

    $scope.$watchGroup(['newActivity', 'newLevel' ], function(new_value, old_value){
        if ($scope.newActivity != undefined &&  $scope.newLevel != undefined){
            var data = {'selectedActivity': $scope.newActivity,
                'selectedLevel': $scope.newLevel };
            $scope.dropdowns.push(data);
            $scope.newLevel = undefined;
            $scope.newActivity = undefined;
        }
    });

    $scope.dropdowns = [];


    $scope.registerStep2 = function(){
        var sex = $scope.sex,
            userId = $stateParams.userId;

        AuthenticationService.registerStep2(userId, sex).then(
            function(response){
                console.log('Step 2 is Success');
                $state.go('registerStep3', {'userId' : userId});
            },
            function(response){
                console.log('Step 2 is Failure');
                var errors = response.data.errors;
                if (errors){
                    _.each(errors, function (value, key) {
                        $scope.errors[key] = value[0];
                    });
                }
            });
    };
});
