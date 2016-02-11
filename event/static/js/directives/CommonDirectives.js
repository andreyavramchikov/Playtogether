var app = angular.module('playTogether');

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

app.directive('editUpdate', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_model.html',
        scope: {
            field: '=ngModel',
            label: '@label'
        },
        link: function (scope, element, attr) {
            scope.editClick = function(){

            };
            scope.save = function(){
                var data = {};
                data[attr.name] = scope.field;
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});

app.directive('editUpdateselect', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_select.html',
        scope: {
            field: '=ngModel',
            label: '@label',
            placeholders: '@placeholders',
            choices: '=choices'
        },
        link: function (scope, element, attr) {
            scope.save = function(){
                var data = {};
                data[attr.name] = scope.field['name'];
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});

app.directive('updatePhone', function(AuthenticationService){
    return {
        restrict: 'EA',
        templateUrl: '/static/pages/utils/update_phone_info.html',
        scope: {
            account: '=account'
        },
        link: function (scope, element, attr) {
            scope.save = function(){
                var data = {'phone': scope.account.phone,
                'sms_notification': scope.account.sms_notification};
                AuthenticationService.updateProfile(AuthenticationService.getUserId(), data).then(function(){
                    scope.show = false;
                });
            }
        }
    };
});