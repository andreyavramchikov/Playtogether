var app = angular.module('playTogether');

app.directive('dateFilter', function ($rootScope) {
    return {
        link: function (scope, elem, attr) {
            elem.on('click', function(){
                var date = elem.data('date');
                scope.$apply(function () {
                    switch (date) {
                        case 'today':
                            scope.event_date = $rootScope.TODAY_DATE;
                            break;
                        case 'tomorrow':
                            scope.event_date = $rootScope.TOMORROW_DATE;
                            break;
                        case 'after_tomorrow':
                            scope.event_date = $rootScope.AFTER_TOMORROW_DATE;
                            break;
                        case 'later':
                            scope.event_date = $rootScope.LATER_DATE;
                            break;
                    }
                });
            });
        }
    }
});

//need to be refactored to more elegant way + adding error messages + styles
//app.directive('validateEmail', function() {
//  var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
//  return {
//    link: function(scope, elm) {
//      elm.on("blur",function(){
//            var isMatchRegex = EMAIL_REGEXP.test(elm.val());
//            if( isMatchRegex && elm.hasClass('warning') || elm.val() == ''){
//                elm.removeClass('warning');
//            } else if(isMatchRegex == false && !elm.hasClass('warning')){
//                elm.addClass('warning');
//            }
//      });
//    }
//  }
//});

//app.directive('validate', function(){
//    return {
//        link: function(scope, element){
//            element.on('blur', function(){
//
//            });
//        }
//    }
//});

app.directive('customDatepicker', function(){
    return {
        replace: false,
        templateUrl: '/static/pages/utils/datepicker.html',
        link: function(scope, element, attrs, ctrl) {
            var $datepicker =  $(element).find('.datetimepicker');
            $datepicker.datetimepicker({
                locale: 'ru'
            });
            $datepicker.on("dp.change", function (e) {
                //need to change for more elegant way
                scope[attrs.ngModel] = moment(e.date._d).format('DD-MM-YYYY HH:mm');
                //ctrl.$setViewValue();
                //ctrl.$render();
            });
        }
    };
});


//we can use controller scope in directive if its directive just for one kind of data
//if we want to create directive for multiple kind of data such as for places, events, activities
//we must pass elements from template to directive(to use these elements in the directive_template_url later)
app.directive('customObjectsDropdown', function () {
    return {
        require: 'ngModel',
        replace: true,
        transclude: true, // must read what it means
        //MUST READ A LOT OF THE BELOW FUNCTIONALITY
        scope: {
            elements: "=",
            title: "@"
        },
        templateUrl: '/static/pages/utils/objects_dropdown.html',
        link: function (scope, element, attrs, ngModel) {
            scope.dropdownitemselected = function (element) {
                //hack - MUST BE REFACTORED but maybe not need to think
                scope.selectedElement = element;  // just for ui button text presentation
                scope.$parent[attrs.ngModel] = element;
            };
            ngModel.$render = function () {
                scope.selectedElement = ngModel.$viewValue;
                scope.$parent[attrs.ngModel] = ngModel.$viewValue;
            };
        }
    };
});//Best Practice: Use the scope option to create isolate scopes when making components that you want to reuse throughout your app.


//MUST OR NEED TO COMBINE THESE TWO DIRECTIVES INTO ONE.
app.directive('customTextDropdown', function () {
    return {
        replace: false,
        transclude: false, // must read what it means
        require: 'ngModel',
        //MUST READ A LOT OF THE BELOW FUNCTIONALITY
        scope: {
            elements: "=",
            title: "@"
        },
        templateUrl: '/static/pages/utils/text_dropdown.html',
        link: function (scope, element, attrs, ngModel) {
            scope.dropdownitemselected = function (element) {
                //hack - MUST BE REFACTORED but maybe not need to think
                scope.selectedElement = element;  // just for ui button text presentation
                scope.$parent[attrs.ngModel] = element;
            };

             ngModel.$render = function () {
                scope.selectedElement = ngModel.$viewValue;
                scope.$parent[attrs.ngModel] = ngModel.$viewValue;
            };

        }
    };
});