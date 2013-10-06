/**
 * Test: CodingDojo.romanNumerals
 * @module test
 * @author nosch
 */
describe('CodingDojo.romanNumerals', function () {
    'use strict';

    describe('toNumeral()', function () {
        it('should print "No digit provided" if digit is undefined, an empty string or not a number', function () {
            var expected = 'No digit provided.';

            expect(CodingDojo.romanNumerals.toNumeral()).toEqual(expected);
            expect(CodingDojo.romanNumerals.toNumeral('')).toEqual(expected);
            expect(CodingDojo.romanNumerals.toNumeral('xyz')).toEqual(expected);
        });

        it('should print "Minimum is 1, maximum is 3000" if digit is < 1 and >= 3000', function () {
            var expected = 'Minimum is 1, maximum is 3000.';

            expect(CodingDojo.romanNumerals.toNumeral(0)).toEqual(expected);
            expect(CodingDojo.romanNumerals.toNumeral(3001)).toEqual(expected);
        });

        it('should convert both integers and decimals to numerals', function () {
            var expected1 = 'LXVI',
                expected2 = 'CMXCIX';

            expect(CodingDojo.romanNumerals.toNumeral(66)).toEqual(expected1);
            expect(CodingDojo.romanNumerals.toNumeral(66.66)).toEqual(expected1);
            expect(CodingDojo.romanNumerals.toNumeral(999)).toEqual(expected2);
            expect(CodingDojo.romanNumerals.toNumeral(999.99)).toEqual(expected2);
        });
    });

    describe('toNum()', function () {
        it('should print "No numeral provided" if numeral is undefined or an empty string', function () {
            var expected = 'No numeral provided.';

            expect(CodingDojo.romanNumerals.toNum()).toEqual(expected);
            expect(CodingDojo.romanNumerals.toNum('')).toEqual(expected);
            expect(CodingDojo.romanNumerals.toNum(666)).toEqual(expected);
        });

        it('should print "Limit is MMM" if numeral is greater than 3000', function () {
            var expected = 'Limit is MMM.';

            expect(CodingDojo.romanNumerals.toNum('MMMI')).toEqual(expected);
        });

        it('should convert single numerals to digits', function () {
            expect(CodingDojo.romanNumerals.toNum('I')).toEqual(1);
            expect(CodingDojo.romanNumerals.toNum('V')).toEqual(5);
            expect(CodingDojo.romanNumerals.toNum('X')).toEqual(10);
            expect(CodingDojo.romanNumerals.toNum('L')).toEqual(50);
            expect(CodingDojo.romanNumerals.toNum('C')).toEqual(100);
            expect(CodingDojo.romanNumerals.toNum('D')).toEqual(500);
            expect(CodingDojo.romanNumerals.toNum('M')).toEqual(1000);
        });

        it('should compute additive numerals', function () {
            expect(CodingDojo.romanNumerals.toNum('VI')).toEqual(6);
            expect(CodingDojo.romanNumerals.toNum('CX')).toEqual(110);
            expect(CodingDojo.romanNumerals.toNum('XVI')).toEqual(16);
            expect(CodingDojo.romanNumerals.toNum('LXVI')).toEqual(66);
        });

        it('should compute subtractive numerals', function () {
            expect(CodingDojo.romanNumerals.toNum('XL')).toEqual(40);
            expect(CodingDojo.romanNumerals.toNum('XLII')).toEqual(42);
            expect(CodingDojo.romanNumerals.toNum('IV')).toEqual(4);
            expect(CodingDojo.romanNumerals.toNum('CDXLIV')).toEqual(444);
            expect(CodingDojo.romanNumerals.toNum('CMXCIX')).toEqual(999);
        });
    });

    describe('isNumber()', function () {
        it('should return true if the provided argument is a number', function () {
            expect(CodingDojo.romanNumerals.isNumber(42)).toBe(true);
            expect(CodingDojo.romanNumerals.isNumber(3688.89)).toBe(true);
        });

        it('should return false if the provided argument is not a number', function () {
            expect(CodingDojo.romanNumerals.isNumber(NaN)).toBe(false);
            expect(CodingDojo.romanNumerals.isNumber('666')).toBe(false);
        });

        it('should return false if no argument is passed', function () {
            expect(CodingDojo.romanNumerals.isNumber()).toBe(false);
        });
    });
});
