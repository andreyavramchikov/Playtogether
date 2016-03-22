"use strict";

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
        link: function (scope) {

        }
    };
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


app.directive('openstreetSearch', function($http, $timeout){
    var OPENSTREETURL = 'https://nominatim.openstreetmap.org/search' +
        '?q=минск&' +
        'format=json&' +
        'addressdetails=1&' +
        'countrycodes=by&' +
        'limit=10&' +
        'accept-language=ru';
    return {
        restrict: 'E',
        templateUrl: "/static/pages/utils/openstreetsearchinput.html",
        scope: {
            model: '=ngModel'
        },
        require: 'ngModel',
        replace: true,

        link: function(scope, element, attrs, ngModel){
            scope._timeout  = null;
            var addCustomPlaceName = function(data){
                _(data).forEach(function (item, index) {
                    var itemCustomName = [],
                        address=item.address;
                    if (address != null){
                        if (address.city){
                            itemCustomName.push(address.city);
                        }
                        if (address.road){
                            itemCustomName.push(address.road);
                        }
                        if (address.house_number){
                            itemCustomName.push(address.house_number);
                        }
                        if (address.suburb){
                            itemCustomName.push(address.suburb);
                        }
                        data[index].itemCustomName =  itemCustomName;
                    }
                });
                return data;
            };

            //should be run this function just when user finished typing - that's why used timer'
            scope.search = function(){
                if(scope._timeout){ //if there is already a timeout in process cancel it
                  $timeout.cancel(scope._timeout);
                }
                scope._timeout = $timeout(function () {
                    //scope._timeout = null; - don't understand why I should use this line
                    var searchUrl = OPENSTREETURL.replace('?q=минск', '?q=' + ngModel.$viewValue);
                    $http.get(searchUrl).then(function (response) {
                        scope.items = addCustomPlaceName(response.data);
                    });
                }, 1000);
            }
        }
    }
});


// please check autocomplete.js to more info and to expand more functionality
app.directive("customAutocomplete", function () {
    return {
        restrict: 'E',
        templateUrl: '/static/pages/utils/custom-autocomplete.html',
        scope: {
            items: '=',
            selectedObject: "=",// maybe for future purpose
            selectedName: "="
        },
        replace: true,
        link: function (scope) {
            scope.hideResults = function() {
                scope.showDropdown = false;
            };

            scope.hoverRow = function(index) {
                scope.currentIndex = index;
            };

            scope.selectItem = function(item) {
                scope.selectedObject = item;
                scope.selectedName = item.itemCustomName;
                scope.showDropdown = false;
                scope.items = [];
            }

        }
    }
});

app.directive('starRating', function () {
    return {
        restrict: 'E',
        template: '<ul class="star-rating {{mode}}">' +
        '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
        '    <i class="fa fa-star"></i>' + // or &#9733
        '  </li>' +
        '</ul>',
        scope: {
            ratingValue: '=ngModel',
            mode: '@mode'
        },
        link: function (scope, element, attr) {
            function updateStars() {
                scope.stars = [];
                for (var i = 0; i < 5; i++) {
                    scope.stars.push({filled: i < scope.ratingValue});
                }
            }

            scope.ratingValue = attr.initialRating;
            scope.toggle = function (index) {
                if (attr.mode != 'read') {
                    scope.ratingValue = index + 1;
                }
            };

            scope.$watch('ratingValue', function (oldValue, newValue) {
                if (newValue) {
                    updateStars();
                }
            });

        }
    };
});

app.directive('datetimeBox', function () {
    return {
        restrict: 'E',
        link: function (scope, element) {
            element.DateTimePicker({
                isPopup: false,
                dateFormat: "yyyy-MM-dd", // this parameter not working with ru.localization of Datetimepicker.js.
                // Overrided in source code of this lib DateTimePicker-i18n-ru.js
                language: "ru"
            });
        }
    }
});