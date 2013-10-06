/**
 * Test: CodingDojo.romanCalculator
 * @module test
 * @author nosch
 */
describe('CodingDojo.romanCalculator', function () {
    'use strict';

    describe('convert()', function () {
        it('should print "Provide two operands" if operands are undefined or empty strings', function () {
            var expected = 'Provide two operands.';

            expect(CodingDojo.romanCalculator.convert()).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert('I')).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert('I', '')).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert('', '')).toEqual(expected);
        });

        it('should print "Only numerals are allowed" if operands are not strings', function () {
            var expected = 'Only numerals are allowed.';

            expect(CodingDojo.romanCalculator.convert(1, 'I')).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert(2.5, 2.5)).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert('LXVII', true)).toEqual(expected);
            expect(CodingDojo.romanCalculator.convert([], {})).toEqual(expected);
        });

        it('should print "Provide roman numerals"', function () {
            var expected = 'Provide roman numerals.';

            expect(CodingDojo.romanCalculator.convert('one hundred', 'C')).toEqual(expected);
        });
    });

    describe('add()', function () {
        it('should add two numerals and return correct result', function () {
            expect(CodingDojo.romanCalculator.add('I', 'V')).toBe('VI');
            expect(CodingDojo.romanCalculator.add('C', 'XIV')).toBe('CXIV');
            expect(CodingDojo.romanCalculator.add('XL', 'CMXVI')).toBe('CMLVI');
            expect(CodingDojo.romanCalculator.add('XIV', 'LX')).toBe('LXXIV');
        });
    });
});
