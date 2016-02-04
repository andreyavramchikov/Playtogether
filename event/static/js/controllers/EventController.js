var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $http, EventService, AuthenticationService) {
    var account = AuthenticationService.getAuthenticatedAccount();
    if (account){
        $scope.userId = account.id;
    }

    EventService.getEvents().then(function(response){
        $scope.events = response.data.results;
        //_.each($scope.events, function(event, index){
        //    if ( _.some(event.event_users, function (event_user) {
        //      return event_user === $scope.userId;
        //    })) {
        //        $scope.events[index].user_done = true;
        //    }
        //
        //});
    });

    $scope.goToEvent = function(eventId, index){
        $http.post('api/v1/updateeventusers', {event_id: eventId }).then(function(response){
            $scope.events[index].user_done = true;
        });
    }
});

app.filter('filterUserEvents', function () {
  return function (items, userId) {
     _.each(items, function(event, index){
            if ( _.some(event.event_users, function (event_user) {
              return event_user === userId;
            })) {
                items[index].user_done = true;
            }
        });
      return items;
  };
});