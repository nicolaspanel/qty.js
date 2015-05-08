'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Pressure' , function () {

    it('should evaluate empty input as 0Pa', function () {
        var zero = Qty.Pressure();
        expect(zero.value()).to.be(0);
        expect(zero.isPressure()).to.be.ok();
    });

    it('should evaluate numerical input as Pa', function () {
        expect(Qty.Pressure(1).value()).to.be(1);
    });

    it('can convert MPa to Pa', function () {
        expect(Qty('2.5MPa').toSI().value()).to.be(2.5 * 1e6);
    });

    describe('bar', function () {
        it('can be obtain from Pa', function () {
            expect(Qty('1Pa').to('bar').value()).to.be(1e-5);
        });
        it('can be convert to Pa (SI)', function () {
            expect(Qty('1bar').toSI().value()).to.be(1e5);
        });
        it('should be a pressure', function () {
            expect(Qty('1bar').isPressure()).to.be.ok();
        });
    });
    describe('atmosphere', function () {
        it('can be obtain from Pa', function () {
            expect(Qty('1Pa').to('atm').value()).to.be(1/101325);
        });
        it('can be convert to Pa (SI)', function () {
            expect(Qty('1atm').toSI().value()).to.be(101325);
        });
        it('should be a pressure', function () {
            expect(Qty('1atm').isPressure()).to.be.ok();
        });
    });
    describe('psi', function () {
        it('can be obtain from Pa', function () {
            expect(Qty('1Pa').to('psi').value()).to.be(1/6894.76);
        });
        it('can be convert to Pa (SI)', function () {
            expect(Qty('1psi').toSI().value()).to.be(6894.76);
        });
        it('should be a pressure', function () {
            expect(Qty('1psi').isPressure()).to.be.ok();
        });
    });
});
