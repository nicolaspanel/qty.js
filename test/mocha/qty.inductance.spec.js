'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Inductance' , function () {

    it('should evaluate empty input as 0 Henry', function () {
        var zero = Qty.Inductance();
        expect(zero.value()).to.be(0);
        expect(zero.isInductance()).to.be.ok();
    });

    it('should evaluate numerical input as Henry', function () {
        expect(Qty.Inductance(1).toSI().value()).to.be(1);
    });

    describe('millihenry', function () {
        it('can be obtain from Henry', function () {
            expect(Qty('1H').to('mH').value()).to.be(1e3);
        });
        it('can be converted to H', function () {
            expect(Qty('1millihenry').toSI().value()).to.be(1e-3);
        });
        it('should be an inductance', function () {
            expect(Qty('1mH').isInductance()).to.be.ok();
        });
    });
});
