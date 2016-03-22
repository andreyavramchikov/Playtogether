"use strict";

var app = angular.module('playTogether');

app.filter('isPaidString', function () {
    return function (is_paid) {
        if (is_paid === undefined) {
            return '';
        }
        if (is_paid) {
            return 'Платно';
        }
        return 'Бесплатно';
    };
});

app.filter('dateFormatFilter', function () {
    return function (value) {
        //regular expression to delete all 0 from string - not correct
        return value.substring(0, value.length - 5).replace('-', '/').replace(/0/g, '');
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
    };
});

app.filter('timeRangeFilter', function () {
    return function (value, max) {
        if (value === max) {
            return 'All';
        }
        var h = parseInt(value / 60, 10),
            m = parseInt(value % 60, 10),
            hStr = (h > 0) ? h + ':' : '',
            mStr = (m > 0) ? m + '' : '',
            glue = (hStr && !mStr) ? '00' : '';

        return hStr + glue + mStr;
    };
});

app.filter('boolPresentationFilter', function(){
    return function (value) {
        if (value === false) {
            return 'Нет';
        }
        if (value === true) {
            return 'Да';
        }
        return value;
    };
});

app.filter('getActivityRating', function() {
    return function (items, name) {
        //COPY PAST FROM USER - SHOULD BE CHANGED
        var activity = _.filter(items, function (item) {
            return item.activity.name === name;
        });
        return activity ? activity.level : 0;
    };
});


app.filter('join', function () {
    return function join(array, separator, prop) {
        if (!Array.isArray(array)) {
            return array; // if not array return original - can also throw error
        }
        return (!!prop ? array.map(function (item) {
            return item;
        }) : array).join(separator);
    };
});

