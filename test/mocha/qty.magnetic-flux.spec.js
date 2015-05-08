'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('MagneticFlux' , function () {

    it('should evaluate empty input as 0 weber', function () {
        var zero = Qty.MagneticFlux();
        expect(zero.value()).to.be(0);
        expect(zero.isMagneticFlux()).to.be.ok();
    });

    it('should evaluate numerical input as weber', function () {
        expect(Qty.MagneticFlux(1).toSI().value()).to.be(1);
    });

    describe('milliweber', function () {
        it('can be obtain from weber', function () {
            expect(Qty('1e-3Wb').to('mWb').value()).to.be(1);
        });
        it('can be converted to weber', function () {
            expect(Qty('1e3 milliweber').toSI().value()).to.be(1);
        });
        it('should be a magnetic flux', function () {
            expect(Qty('1mWb').isMagneticFlux()).to.be.ok();
        });
    });

    describe('maxwell', function () {
        it('can be obtain from weber', function () {
            expect(Qty('1e-8Wb').to('Mx').value()).to.be(1);
        });
        it('can be converted to weber', function () {
            expect(Qty('1e8 maxwells').toSI().value()).to.be(1);
        });
        it('should be a magnetic flux', function () {
            expect(Qty('1Mx').isMagneticFlux()).to.be.ok();
        });
    });
});
