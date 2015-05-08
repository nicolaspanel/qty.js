'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Substance' , function () {

    it('should evaluate empty input as 0mole', function () {
        var zero = Qty.Substance();
        expect(zero.value()).to.be(0);
        expect(zero.isSubstance()).to.be.ok();
    });

    it('should evaluate numerical input as mole', function () {
        expect(Qty.Substance(1).value()).to.be(1);
    });

    describe('mmole', function () {
        it('can be obtain from mol', function () {
            expect(Qty('1mol').to('mmole').value()).to.be(1e3);
        });
        it('can be converted to mole', function () {
            expect(Qty('1mmol').toSI().value()).to.be(1e-3);
        });
        it('should be a substance', function () {
            expect(Qty('1mmol').isSubstance()).to.be.ok();
        });
    });
});
