'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Potential' , function () {

    it('should evaluate empty input as 0 Henry', function () {
        var zero = Qty.Potential();
        expect(zero.value()).to.be(0);
        expect(zero.isPotential()).to.be.ok();
    });

    it('should evaluate numerical input as Volt', function () {
        expect(Qty.Potential(1).toSI().value()).to.be(1);
    });

    describe('millivolt', function () {
        it('can be obtain from Volt', function () {
            expect(Qty('1e-3V').to('mV').value()).to.be(1);
        });
        it('can be converted to V', function () {
            expect(Qty('1e3millivolt').toSI().value()).to.be(1);
        });
        it('should be a potential', function () {
            expect(Qty('1mV').isPotential()).to.be.ok();
        });
    });
});
