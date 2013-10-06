/**
 * Test: CodingDojo.potter
 * @module test
 * @author nosch
 */
describe('CodingDojo.potter', function () {
    'use strict';

    describe('purgeBasket()', function () {
        it('should always return 0', function () {
            expect(CodingDojo.potter.purgeBasket()).toBe(0);
        });
    });

    describe('addBook()', function () {
        // Setup
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();
        });

        it('should return false if no book was added to basket', function () {
            expect(CodingDojo.potter.addBook()).toBe(false);
        });

        it('should return false if a book was added to basket, but it is not an object', function () {
            expect(CodingDojo.potter.addBook(666)).toBe(false);
            expect(CodingDojo.potter.addBook('Haha!')).toBe(false);
            expect(CodingDojo.potter.addBook([1, 2, 3])).toBe(false);
        });

        it('should return false if an book with an illegal ID was added to basket', function () {
            var book01 = {id: 666, quantity: 1},
                book02 = {id: -1, quantity: 1},
                book03 = {id: '1', quantity: 1};

            expect(CodingDojo.potter.addBook(book01)).toBe(false);
            expect(CodingDojo.potter.addBook(book02)).toBe(false);
            expect(CodingDojo.potter.addBook(book03)).toBe(false);
        });

        it('should return false if a book without a quantity, a book with a quantity of 0, a book with a quantity less than 1 and a book with a quantity of (string) 2 were added to the basket', function () {
            var nan = 1 * 'drei',
                book01 = {id: 1},
                book02 = {id: 2, quantity: 0},
                book03 = {id: 3, quantity: -1},
                book04 = {id: 4, quantity: '2'},
                book05 = {id: 5, quantity: nan};

            expect(CodingDojo.potter.addBook(book01)).toBe(false);
            expect(CodingDojo.potter.addBook(book02)).toBe(false);
            expect(CodingDojo.potter.addBook(book03)).toBe(false);
            expect(CodingDojo.potter.addBook(book04)).toBe(false);
            expect(CodingDojo.potter.addBook(book05)).toBe(false);
        });

        it('should return true if one book with a quantity of 1 was added to basket', function () {
            var book = {id: 1, quantity: 1};

            expect(CodingDojo.potter.addBook(book)).toBe(true);
        });

        it('should return true if one book with a quantity of 2 was added to basket', function () {
            var book = {id: 2, quantity: 2};

            expect(CodingDojo.potter.addBook(book)).toBe(true);
        });

        it('should return true if one book was added and return false if the same book was added twice to basket', function () {
            var book01 = {id: 3, quantity: 1},
                book02 = {id: 3, quantity: 1};

            expect(CodingDojo.potter.addBook(book01)).toBe(true);
            expect(CodingDojo.potter.addBook(book02)).toBe(false);
        });
    });

    describe('removeBook()', function (params) {
        // Setup
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();

            CodingDojo.potter.addBook({id: 1, quantity: 3});
            CodingDojo.potter.addBook({id: 2, quantity: 2});
            CodingDojo.potter.addBook({id: 3, quantity: 1});
        });

        it('should return false if the basket is empty', function () {
            CodingDojo.potter.purgeBasket();
            expect(CodingDojo.potter.removeBook(1)).toBe(false);
        });

        it('should return false if a book was removed from the basket without passing an id', function () {
            expect(CodingDojo.potter.removeBook()).toBe(false);
        });

        it('should return false if a book was removed from the basket by passing not a number as id', function () {
            expect(CodingDojo.potter.removeBook('1')).toBe(false);
        });

        it('should return false if a book was removed from the basket that does not exist in the basket', function () {
            expect(CodingDojo.potter.removeBook(4)).toBe(false);
        });

        it('should return the removed book as an object if a book - here: {id: 1, quantity: 3} - was removed from the basket', function () {
            var removed = CodingDojo.potter.removeBook(1);

            expect(removed.id).toBe(1);
            expect(removed.quantity).toBe(3);
        });

    });

    describe('getBookCount()', function () {
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();

            CodingDojo.potter.addBook({id: 1, quantity: 2});
            CodingDojo.potter.addBook({id: 2, quantity: 1});
        });

        it('should return 0 if the basket is empty', function () {
            CodingDojo.potter.purgeBasket();
            expect(CodingDojo.potter.getBookCount()).toBe(0);
        });

        it('should return 2 if two books are in the basket, regardless of the book quantity', function () {
            expect(CodingDojo.potter.getBookCount()).toBe(2);
        });
    });

    describe('getCopyCount()', function () {
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();

            CodingDojo.potter.addBook({id: 1, quantity: 2});
            CodingDojo.potter.addBook({id: 2, quantity: 1});
        });

        it('should return 0 if the basket is empty', function () {
            CodingDojo.potter.purgeBasket();
            expect(CodingDojo.potter.getCopyCount()).toBe(0);
        });

        it('should return 3 if two books are in the basket, one with a quantity of 2, the other with a quantity of 2', function () {
            expect(CodingDojo.potter.getCopyCount()).toBe(3);
        });

        it('should return 103  if three books are in the basket, one with a quantity of 2, the other with a quantity of 2 and another with a quantity of hundred', function () {
            CodingDojo.potter.addBook({id: 3, quantity: 100});
            expect(CodingDojo.potter.getCopyCount()).toBe(103);
        });
    });

    describe('getTotal() - no discount -', function () {
        // Setup
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();
        });

        it('should return 0.00 if no book is in basket', function () {
            expect(CodingDojo.potter.getTotal()).toBe(0.00);
        });

        it('should return 8.00 if one book with a quantity of 1 is in basket', function () {
            var book = {id: 1, quantity: 1};

            CodingDojo.potter.addBook(book);
            expect(CodingDojo.potter.getTotal()).toBe(8.00);
        });

        it('should return 16.00 if one book with a quantity of 2 is in basket', function () {
            var book = {id: 2, quantity: 2};

            CodingDojo.potter.addBook(book);
            expect(CodingDojo.potter.getTotal()).toBe(8.00 * 2);
        });

        it('should return 24.00 if three identical books each with a quantity of 1 are in basket', function () {
            var book01 = {id: 3, quantity: 1},
                book02 = {id: 3, quantity: 1},
                book03 = {id: 3, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);

            expect(CodingDojo.potter.getTotal()).toBe(8.00 * 3);
        });
    });

    describe('getTotal() - simple discount -', function () {
        // Setup
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();
        });

        it('should return 15.20 (5% discount) if two different books are in basket, each with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 1},
                book02 = {id: 2, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 2 * 0.95);
        });

        it('should return 21.60 (10% discount) if three different books are in basket, each with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 1},
                book02 = {id: 2, quantity: 1},
                book03 = {id: 3, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 3 * 0.9);
        });

        it('should return 25.60 (20% discount) if four different books are in basket, each with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 1},
                book02 = {id: 2, quantity: 1},
                book03 = {id: 3, quantity: 1},
                book04 = {id: 4, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);
            CodingDojo.potter.addBook(book04);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 4 * 0.8);
        });

        it('should return 30.00 (25% discount) if five different books are in basket, each with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 1},
                book02 = {id: 2, quantity: 1},
                book03 = {id: 3, quantity: 1},
                book04 = {id: 4, quantity: 1},
                book05 = {id: 5, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);
            CodingDojo.potter.addBook(book04);
            CodingDojo.potter.addBook(book05);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 5 * 0.75);
        });
    });

    describe('getTotal() - complex discounts - ', function () {
        // Setup
        beforeEach(function () {
            CodingDojo.potter.purgeBasket();
        });

// ----------------------------------------------------------------------

        it('2er-Sets I', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 2};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe((8 * 2 * 0.95) * 2);
        });

        it('2er-Sets II', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe((8 * 2 * 0.95) + 8);
        });

        it('2er-Sets III', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 3};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe((2 * (8 * 2 * 0.95)) + 8);
        });

        xit('3er-Sets', function () {
            var book01 = {id: 1, quantity: 5},
                book02 = {id: 2, quantity: 4},
                book03 = {id: 3, quantity: 2}; // => Anzahl der 3er-Sets

                // Ergebnis: 2 x 3er-Set
                //           1 x 2er-Set
                //           1 x Rest 1

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);

            expect(CodingDojo.potter.getTotal()).toBe((8 * 3 * 0.9) + 8);
        });

        xit('4er-Sets', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 2},
                book03 = {id: 3, quantity: 1},
                book04 = {id: 4, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);
            CodingDojo.potter.addBook(book04);

            expect(CodingDojo.potter.getTotal()).toBe('???');
        });
// ----------------------------------------------------------------------


        xit('should return 23.20 (5% discount) if two different books are in basket, one book with a quantity of 2, one with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 2 * 0.95 + 8);
        });

        xit('should return 39.20 (5% discount) if two different books are in basket, one book with a quantity of 2, one with a quantity of 3', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 3};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 2 * 0.95 + (3 * 8));
        });

        xit('should return 831.2 (5% discount) if two different books are in basket, one book with a quantity of 100, one with a quantity of 5 ', function () {
            var book01 = {id: 1, quantity: 100},
                book02 = {id: 2, quantity: 5};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe(8 * 2 * 0.95 + (103 * 8));
        });

        xit('should return 30.40 (2 x 5% discount) if two different books are in basket, each with a quantity of 2', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 2};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);

            expect(CodingDojo.potter.getTotal()).toBe(2 * (8 * 2 * 0.95));
        });

        xit('should return 40.80 (20% + 5% discount) if four different books are in basket, two books with a quantity of 2 and two books with a quantity of 1', function () {
            var book01 = {id: 1, quantity: 2},
                book02 = {id: 2, quantity: 1},
                book03 = {id: 3, quantity: 2},
                book04 = {id: 4, quantity: 1};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);
            CodingDojo.potter.addBook(book04);

            expect(CodingDojo.potter.getTotal()).toBe((8 * 4 * 0.8) + (8 * 2 * 0.95));
        });

        xit('should return 33.6 (20%  discount) if four different books are in basket, three books with a quantity of 2 and on books with a quantity of 2', function () {
            var book01 = {id: 1, quantity: 1},
                book02 = {id: 2, quantity: 1},
                book03 = {id: 3, quantity: 1},
                book04 = {id: 4, quantity: 2};

            CodingDojo.potter.addBook(book01);
            CodingDojo.potter.addBook(book02);
            CodingDojo.potter.addBook(book03);
            CodingDojo.potter.addBook(book04);

            expect(CodingDojo.potter.getTotal()).toBe((8 * 4 * 0.8) + 8);
        });
    });
});
