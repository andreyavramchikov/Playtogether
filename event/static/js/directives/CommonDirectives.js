var app = angular.module('playTogether');

app.directive("customSelect", function(){
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/custom-select.html',
        scope: {
            elements: '=elements',
            selected: '=ngModel',
            placeholder: '@placeholder'
        },
        replace: true,
        link: function(scope){

        }
    }
});

//Directive to create custom beautiful dropdown
app.directive("dropdown", function ($rootScope) {
    return {
        restrict: "E",
        templateUrl: "/static/pages/utils/dropdown.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function (scope) {
            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function (item) {
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.isSelected = function (item) {
                return item[scope.property] === scope.selected[scope.property];
            };

            scope.show = function () {
                scope.listVisible = true;
            };

            $rootScope.$on("documentClicked", function (inner, target) {
                if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
                    scope.$apply(function () {
                        scope.listVisible = false;
                    });
            });

            scope.$watch("selected", function (value) {
                //custom changes - before was scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.isPlaceholder = ((scope.selected[scope.property] === undefined) || (scope.selected[scope.property] === null) );
                scope.display = scope.selected[scope.property];
            });
        }
    }
});

app.directive('collapseBlock', function(){
    return function (scope, element, attrs) {
        element.on('click', function () {
            scope.$apply(function () {
                scope[attrs.model] = scope[attrs.model] == true ? false : true;
            });
        });
    }
});

//updated title of the tabs around all sites - required param 'title' in ui-router
app.directive('updateTitle', function($rootScope, $timeout){
    return {
      link: function(scope, element) {

        var listener = function(event, toState) {

          var title = 'Playtogether.by';
          if (toState.title){
            title = toState.title;
          }

          $timeout(function() {
            element.text(title);
          }, 0, false);
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
});
