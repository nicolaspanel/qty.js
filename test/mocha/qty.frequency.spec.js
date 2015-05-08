'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Frequency' , function () {

    it('should evaluate empty input as 0 Newton', function () {
        var zero = Qty.Frequency();
        expect(zero.value()).to.be(0);
        expect(zero.isFrequency()).to.be.ok();
    });

    it('should evaluate numerical input as Newton', function () {
        expect(Qty.Frequency(1).toSI().value()).to.be(1);
    });

    describe('MHz', function () {
        it('can be obtain from Hertz', function () {
            expect(Qty('1e6Hz').to('MHz').value()).to.be(1);
        });
        it('can be converted to Hz', function () {
            expect(Qty('1e-6 megahertz').toSI().value()).to.be(1);
        });
        it('should be a frequency', function () {
            expect(Qty('1MHz').isFrequency()).to.be.ok();
        });
    });
});
