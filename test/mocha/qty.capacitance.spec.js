'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Capacitance' , function () {

    it('should evaluate empty input as 0 Farad', function () {
        var zero = Qty.Capacitance();
        expect(zero.value()).to.be(0);
        expect(zero.isCapacitance()).to.be.ok();
    });

    it('should evaluate numerical input as farad', function () {
        expect(Qty.Capacitance(1).toSI().value()).to.be(1);
    });

    describe('Millifarad', function () {
        it('can be obtain from Farad', function () {
            expect(Qty('1F').to('mF').value()).to.be(1e3);
        });
        it('can be converted to F', function () {
            expect(Qty('1mF').toSI().value()).to.be(1e-3);
        });
        it('should be a capacitance', function () {
            expect(Qty('1mF').isCapacitance()).to.be.ok();
        });
    });
});
