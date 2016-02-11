var app = angular.module('playTogether');

app.filter('cityPrefix', function () {
    return function (city) {
        return 'г. ' + city;
    }
});

app.filter('isPaidString', function () {
    return function (is_paid) {
        if (is_paid) {
            return 'Платно'
        } else {
            return 'Бесплатно'
        }
    }
});

app.filter('dateFormatFilter', function () {
    return function (value) {
        return value.substring(0, value.length - 5).replace('-', '/').replace(/0/g, ''); //regular expression to delete all 0 from string
    };
});

app.filter('weekDayFilter', function () {
    return function (value) {
        switch (value) {
            case 'Понедельник':
                return 'Пн';
            case 'Вторник':
                return 'Вт';
            case 'Среда':
                return 'Ср';
            case 'Четверг':
                return 'Чт';
            case 'Пятница':
                return 'Пт';
            case 'Суббота':
                return 'Сб';
            case 'Воскресенье':
                return 'Вс';
            default:
                return value.substring(0, 3);
        }
    }
});

app.filter('timeRangeFilter', function () {
    return function (value, max) {
        if (value == max) {
            return 'All';
        }

        var h = parseInt(value / 60);
        var m = parseInt(value % 60);

        var hStr = (h > 0) ? h + ':' : '';
        var mStr = (m > 0) ? m + '' : '';
        var glue = (hStr && !mStr) ? '00' : '';

        return hStr + glue + mStr;
    };
});