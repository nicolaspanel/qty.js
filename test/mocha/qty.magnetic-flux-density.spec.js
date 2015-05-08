'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('MagneticFluxDensity' , function () {

    it('should evaluate empty input as 0 tesla', function () {
        var zero = Qty.MagneticFluxDensity();
        expect(zero.value()).to.be(0);
        expect(zero.isMagneticFluxDensity()).to.be.ok();
    });

    it('should evaluate numerical input as tesla', function () {
        expect(Qty.MagneticFluxDensity(1).toSI().value()).to.be(1);
    });

    describe('millitesla', function () {
        it('can be obtain from tesla', function () {
            expect(Qty('1e-3T').to('mT').value()).to.be(1);
        });
        it('can be converted to tesla', function () {
            expect(Qty('1e3 millitesla').toSI().value()).to.be(1);
        });
        it('should be a magnetic flux density', function () {
            expect(Qty('1mT').isMagneticFluxDensity()).to.be.ok();
        });
    });
    describe('Gauss', function () {
        it('can be obtain from tesla', function () {
            expect(Qty('1e-4T').to('G').value()).to.be(1);
        });
        it('can be converted to tesla', function () {
            expect(Qty('1e4 gauss').toSI().value()).to.be(1);
        });
        it('should be a magnetic flux density', function () {
            expect(Qty('1G').isMagneticFluxDensity()).to.be.ok();
        });
    });
});
