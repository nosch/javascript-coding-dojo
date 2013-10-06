/**
 * CodingDojo
 * @module potter
 * @public
 * @author nosch
 */
Application.modules.potter = function (app) {
    'use strict';

    var bookIds = [1, 2, 3, 4, 5];

    var price = 8.00;

    var basket = [];

    /**
     * Adding a "Harry Potter" book to the basket.
     * @private
     * @param {object} book A single book as a basket item,
     *                      e.g. {id: 2, quantity: 3}
     * @returns {boolean}
     */
    var addBook = function (book) {
        if (!book ||
                book.constructor.prototype.toString() !== '[object Object]' ||
                bookIds.indexOf(book.id) === -1 ||
                !book.quantity ||
                book.quantity < 0 ||
                typeof book.quantity !== 'number' ||
                !isFinite(book.quantity)) {
            return false;
        }

        var i, bookCount = getBookCount();

        for (i = 0; i < bookCount; i += 1) {
            if (basket[i].id === book.id) {
                basket[i].quantity += book.quantity;
                return false;
            }
        }

        basket.push(book);

        return true;
    };

    /**
     * Removing a book from the basket and returning the removed book object.
     * @private
     * @param  {number} id The id of the book.
     * @returns {mixed} object|boolean
     */
    var removeBook = function (id) {
        var bookCount = getBookCount();

        var removed = {};

        var i;

        for (i = 0; i < bookCount; i += 1) {
            if (basket[i].id === id) {
                return basket.splice(i, 1)[0];
            }
        }

        return false;
    };

    /**
     * Calculating the total amount of the basket.
     * @private
     * @returns {number}
     */
    var getTotal = function () {
        var bookCount = getBookCount();

        var copyCount = getCopyCount();

        var total = 0, discount;

        // Calculate simple total and discount.
        if (bookCount === copyCount) {
            switch (bookCount) {
            case 2:
                // 5%
                discount = 0.95;
                break;
            case 3:
                // 10%
                discount = 0.9;
                break;
            case 4:
                // 20%
                discount = 0.8;
                break;
            case 5:
                // 25%
                discount = 0.75;
                break;
            default:
                discount = 1;
                break;
            }

            return bookCount * price * discount;
        }

        // Calculate complex  total and discount.
        if (copyCount > bookCount) {
            switch (bookCount) {
            case 2:
                discount = 0.95;
                if (basket[0].quantity === basket[1].quantity) {
                    total = (copyCount / 2) * (bookCount * price * discount);
                } else {
                    total = ((copyCount - bookCount) *  price) + (bookCount * price * discount);
                }
                break;
            case 3:
                discount = 0.9;
                break;
            case 4:
                discount = 0.8;
                total = (price * 2 * 0.95) + (bookCount * price * discount);
                break;
            case 5:
                discount = 0.75;
                break;
            default:
                discount = 1;
                total = copyCount * price * discount;
            }

            return total;
        }
    };

    /**
     * Getting the number of books in the basket.
     * @private
     * @returns {number}
     */
    var getBookCount = function () {
        return basket.length;
    };

    /**
     * Getting the number of book copies in the basket.
     * @private
     * @returns {number}
     */
    var getCopyCount = function () {
        var bookCount = getBookCount();

        var copyCount = 0, i;

        for (i = 0; i < bookCount; i += 1) {
            copyCount += basket[i].quantity;
        }

        return copyCount;
    };

    /**
     * Purging the basket and returning the updated number of items.
     * @private
     * @returns {number}
     */
    var purgeBasket = function () {
        basket = [];

        return getBookCount();
    };

    /**
     * Getting the discount rate according to the number of books.
     * @private
     * @param  {number} bookCount The number of books.
     * @returns {number}
     */
    var getDiscount = function (bookCount) {
        var discount;

        switch (bookCount) {
        case 2:
            // 5%
            discount = 0.95;
            break;
        case 3:
            // 10%
            discount = 0.9;
            break;
        case 4:
            // 20%
            discount = 0.8;
            break;
        case 5:
            // 25%
            discount = 0.75;
            break;
        default:
            discount = 1;
            break;
        }

        return discount;
    };

    // Reveal the public API.
    app.potter = {
        addBook: addBook,
        removeBook: removeBook,
        getTotal: getTotal,
        purgeBasket: purgeBasket,
        getBookCount: getBookCount,
        getCopyCount: getCopyCount,
        getBasket: function () {
            return basket;
        }
    };
};
