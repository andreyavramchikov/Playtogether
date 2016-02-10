var app = angular.module('playTogether');

app.controller('UserController', function ($scope, UserService, ActivityService) {
    UserService.getUsers().then(function(response){
        $scope.users = response.data;
    });

    ActivityService.getActivities().then(function(response){
        $scope.activities = response.data;
    });

    _getFilterData = function(){
        var selectedActivity = _.filter($scope.activities, function(activity){
            return activity.selected;}),
            male = $scope.male,
            female = $scope.female,
            data = [],
            selectedActivityIds = null,
            sex = null;

        if (female && !male) {
            sex = female;
        } else if (male && !female) {
            sex = male;
        }

        if (selectedActivity.length > 0) {
            selectedActivityIds = _.map(selectedActivity, 'id')
        }
        data = [
            {name : "selected_activity_ids", value: selectedActivityIds},
            {name : "sex", value: sex}
        ];
        return $.param(data);
    };

    _filterUsers = function(){
        UserService.filterUsers(_getFilterData()).then(function(response){
            $scope.users = response.data;
        });
    };

    $scope.$watchGroup(['male', 'female'], function(newValues, oldValues, scope) {
        _filterUsers();
    });

    $scope.$watch('activities', function(newValue, oldValue, scope){
        _filterUsers();
    }, true);

});