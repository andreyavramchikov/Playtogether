var app = angular.module('playTogether');

app.controller('EventController', function ($scope, $http, EventService, AuthenticationService) {
    var account = AuthenticationService.getAuthenticatedAccount();
    if (account){
        $scope.userId = account.id;
    }

    EventService.getEvents().then(function(response){
        $scope.events = response.data.results;
        _.each($scope.events, function(event, index){
            if ( _.some(event.event_users, function (event_user) {
              return event_user === $scope.userId;
            })) {
                $scope.events[index].user_done = true;
            }
        });
    });

    $scope.goToEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, action: 'create' }).then(function(){
            $scope.events[index].user_done = true;
            $scope.events[index].count_of_members += 1;
        });
    };

    $scope.goFromEvent = function(eventId, index){
        EventService.updateEventUsers({event_id: eventId, action: 'delete' }).then(function(){
            $scope.events[index].user_done = false;
            $scope.events[index].count_of_members -= 1;
        });
    };



    $scope.colours = [{
		name: "Red",
		hex: "#F21B1B"
	}, {
		name: "Blue",
		hex: "#1B66F2"
	}, {
		name: "Green",
		hex: "#07BA16"
	}];
	$scope.colour = "";

});



app.directive("dropdown", function($rootScope) {
	return {
		restrict: "E",
		templateUrl: "/static/pages/utils/dropdown.html",
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@"
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;

			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};

			$rootScope.$on("documentClicked", function(inner, target) {
				console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
				if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
					scope.$apply(function() {
						scope.listVisible = false;
					});
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
			});
		}
	}
});