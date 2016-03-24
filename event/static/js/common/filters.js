"use strict";

var filters = angular.module('filters', []);


/*
    incoming value format 20-11-2016
    return format 20/11
*/
filters.filter('dateFormatFilter', function () {
    return function (value) {
        value = value.slice(0, -5); //removed -year
        value = value.replace('-', '/');
        value = value.replace(/((0)([0-9]))/g, '$3'); // replaced 0 if it comes before number
        return value;
    };
});


// presentation filter
filters.filter('weekDayFilter', function () {
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


/*
    presentation filter for time left on progress bar
*/
filters.filter('timeRangeFilter', function () {
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


// presentation filter
filters.filter('boolPresentationFilter', function(){
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

//presentation of array with separator
filters.filter('join', function () {
    return function join(array, separator, prop) {
        if (!Array.isArray(array)) {
            return array; // if not array return original
        }
        return (!!prop ? array.map(function (item) {
            return item;
        }) : array).join(separator);
    };
});

