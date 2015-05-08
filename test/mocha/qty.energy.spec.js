'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Energy' , function () {

    it('should evaluate empty input as 0 joule', function () {
        var zero = Qty.Energy();
        expect(zero.value()).to.be(0);
        expect(zero.isEnergy()).to.be.ok();
    });

    it('should evaluate numerical input as joule', function () {
        expect(Qty.Energy(1).toSI().value()).to.be(1);
    });

    describe('MegaJoule', function () {
        it('can be obtain from Joule', function () {
            expect(Qty('1e6J').to('MJ').value()).to.be(1);
        });
        it('can be converted to joule', function () {
            expect(Qty('1e-6 megajoules').toSI().value()).to.be(1);
        });
        it('should be an energy', function () {
            expect(Qty('1MJ').isEnergy()).to.be.ok();
        });
    });
    describe('calorie', function () {
        it('can be obtain from Joule', function () {
            expect(Qty('4.184J').to('cal').value()).to.be(1);
        });
        it('can be converted to joule', function () {
            expect(Qty('1cal').toSI().value()).to.be(4.184);
        });
        it('should be an energy', function () {
            expect(Qty('1cal').isEnergy()).to.be.ok();
        });
    });
    describe('Calorie', function () {
        it('can be obtain from Joule', function () {
            expect(Qty('4184.00J').to('Cal').value()).to.be(1);
        });
        it('can be converted to joule', function () {
            expect(Qty('1Cal').toSI().value()).to.be(4184);
        });
        it('should be an energy', function () {
            expect(Qty('1Cal').isEnergy()).to.be.ok();
        });
    });
});
