/**
 * CodingDojo
 * @module romanCalculator
 * @public
 * @author nosch
 */
Application.modules.romanCalculator = function (app) {
    'use strict';

    /**
     * Converts and verify two operands.
     * @private
     * @param   {string} a First operand.
     * @param   {string} b Second operand.
     * @returns {string}   Result of the operation.
     */
    var convert = function (a, b) {
        if (!a || !b) {
            return 'Provide two operands.';
        }

        if (typeof a !== 'string' || typeof b !== 'string') {
            return 'Only numerals are allowed.';
        }

        var operand1 = app.romanNumerals.toNum(a);

        var operand2 = app.romanNumerals.toNum(b);

        if (!app.romanNumerals.isNumber(operand1) ||
            !app.romanNumerals.isNumber(operand2)
        ) {
            return 'Provide roman numerals.';
        }

        return {
            operand1: operand1,
            operand2: operand2
        };
    };

    /**
     * Sums up two roman numerals.
     * @private
     * @param {string} a First summand.
     * @param {string} b Second summand.
     * @returns {string} Result of the addition.
     */
    var add = function (a, b) {
        var operands = convert(a, b);

        return app.romanNumerals.toNumeral(operands.operand1 + operands.operand2);
    };

    /**
     * Subtracts two roman numerals
     * @private
     * @param   {string} a The minuend.
     * @param   {string} b The subtrahend.
     * @returns {string}   Result of the subtraction.
     */
    var substract = function (a, b) {
        var operands = convert(a, b);

        if (operands.operand1 < operands.operand2) {
            return 'First operand must be greater than or equal the second.';
        }

        return app.romanNumerals.toNumeral(operands.operand1 - operands.operand2);
    };

    /**
     * Multiplies two roman numerals
     * @private
     * @param   {string} a The multiplier.
     * @param   {string} b The multiplicand.
     * @returns {string}   Result of the multiplication.
     */
    var multiply = function (a, b) {
        var operands = convert(a, b);

        return app.romanNumerals.toNumeral(operands.operand1 * operands.operand2);
    };

    // Reveal public API.
    app.romanCalculator = {
        convert: convert,
        add: add,
        substract: substract,
        multiply: multiply
    };
};
