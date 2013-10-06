/**
 * CodingDojo
 * @module fizzBuzz
 * @public
 * @author nosch
 */
Application.modules.fizzBuzz = function (app) {
    'use strict';

    /**
     * Play the fizz-buzz game.
     * @private
     * @returns {string}
     */
    var play = function () {
        var num, fizz, buzz, output = [];

        for (num = 1; num <= 100; num += 1) {
            fizz = (num % 3 === 0);
            buzz = (num % 5 === 0);

            output.push(fizz ? buzz ? 'FizzBuzz' : 'Fizz' : buzz ? 'Buzz' : num);
        }

        return output;
    };

    // Reveal public API.
    app.fizzBuzz = {
        play: play
    };
};
