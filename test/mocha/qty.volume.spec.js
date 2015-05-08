'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Volume' , function () {

    it('should evaluate empty input as 0m³', function () {
        var zero = Qty.Volume();
        expect(zero.value()).to.be(0);
        expect(zero.isVolume()).to.be.ok();
        expect(zero.isLength()).not.to.be.ok();
    });

    it('should evaluate numerical input as 1 m³', function () {
        expect(Qty.Volume(1).value()).to.be(1);
    });
    it('can convert 1m³ to liter', function () {

    });

    describe('Liter', function () {
        it('can be obtain for m³', function () {
            expect(Qty.Volume(1).convertTo('L').value()).to.be(1e3);
        });
        it('can be converted to m³', function () {
            expect(Qty('1000.0 L').toSI().value()).to.be(1);
        });
        it('should be properly formatted', function () {
            expect(Qty(3.14, 'l').format()).to.be('3.14l');
        });
    });
    describe('centilitre', function () {
        it('can be obtain for liter', function () {
            expect(Qty.Volume(1, 'l').convertTo('cl').value()).to.be(1e2);
        });
        it('can be converted to liter', function () {
            expect(Qty('100.0 cL').to('l').value()).to.be(1);
        });
        it('should be properly formatted', function () {
            expect(Qty(3.14, 'cl').format()).to.be('3.14cl');
        });
    });

    describe('floz', function () {
        it('can be converted to mL', function () {
            expect(Qty.Volume('1 floz').convertTo('mL').value()).to.be(29.5735297);
        });

    });
});
