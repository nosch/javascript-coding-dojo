/**
 * CodingDojo
 * @module romanNumerals
 * @public
 * @author nosch
 */
Application.modules.romanNumerals = function (app) {
    'use strict';

    /**
     * Veryfies that a given value is a numnber.
     * @private
     * @param   {mixed}  num The value to check.
     * @returns {boolean}
     */
    var isNumber = function (num) {
        if (num === undefined) {
            return false;
        }

        return typeof num === 'number' && isFinite(num);
    };

    /**
     * Converts a number to a roman numeral.
     * @private
     * @param   {number} num The number to convert.
     * @returns {string}     The roman numeral.
     */
    var toNumeral = function (num) {
        if (num === undefined || num === '' || !isNumber(num)) {
            return 'No digit provided.';
        }

        var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        var arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

        var digit =  Math.floor(num);

        var range = arabic.length;

        var limit = 3000, numeral = '', value = 0, i = 0;

        if (digit < 1 || digit > limit) {
            return 'Minimum is 1, maximum is 3000.';
        }

        while (i < range) {
            value = arabic[i];

            while (digit >= value) {
                digit -= value;
                numeral += roman[i];
            }

            if (digit === 0) {
                return numeral;
            }

            i += 1;
        }
    };

    /**
     * Converts a roman numeral to a number.
     * @private
     * @param   {string} numeral The numeral to convert.
     * @returns {number}         The number.
     */
    var toNum = function (numeral) {
        if (!numeral || typeof numeral !== 'string') {
            return 'No numeral provided.';
        }

        numeral = numeral.toUpperCase();

        var subtractions = ['IV', 'IX', 'XL', 'XC', 'CD', 'CM'];

        var numbers = {
            M: 1000,
            D: 500,
            C: 100,
            L: 50,
            X: 10,
            V: 5,
            I: 1
        };

        var sum = 0, limit = 3000, subtraction, max, i;

        for (i = 0, max = subtractions.length; i < max; i += 1) {
            subtraction = subtractions[i];

            if (numeral.match(subtraction)) {
                sum -= 2 * numbers[subtraction.charAt(0)];
            }
        }

        for (i = 0, max = numeral.length; i < max; i += 1) {
            sum += numbers[numeral.charAt(i)];
        }

        if (sum > limit) {
            return 'Limit is MMM.';
        }

        return sum;
    };

    // Reveal public API.
    app.romanNumerals = {
        isNumber: isNumber,
        toNumeral: toNumeral,
        toNum: toNum
    };
};
