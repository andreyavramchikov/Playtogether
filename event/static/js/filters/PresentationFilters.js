var app = angular.module('playTogether');

app.filter('cityPrefix', function() {
    return function(city) {
        return 'г. ' + city;
    }
});

app.filter('isPaidString', function() {
    return function(is_paid) {
        if (is_paid) {
            return 'Платно'
        } else {
            return 'Бесплатно'
        }
    }
});