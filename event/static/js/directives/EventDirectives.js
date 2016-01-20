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