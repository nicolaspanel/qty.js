'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Luminosity' , function () {

    it('should evaluate empty input as 0 candela', function () {
        var zero = Qty.Luminosity();
        expect(zero.value()).to.be(0);
        expect(zero.isLuminosity()).to.be.ok();
    });

    it('should evaluate numerical input as candela', function () {
        expect(Qty.Luminosity(1).toSI().value()).to.be(1);
    });
});
