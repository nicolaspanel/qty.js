'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Charge' , function () {

    it('should evaluate empty input as 0 coulomb', function () {
        var zero = Qty.Charge();
        expect(zero.value()).to.be(0);
        expect(zero.isCharge()).to.be.ok();
    });

    it('should evaluate numerical input as coulomb', function () {
        expect(Qty.Charge(1).toSI().value()).to.be(1);
    });

    describe('Centicoulomb', function () {
        it('can be obtain from C', function () {
            expect(Qty('1C').to('cC').value()).to.be(1e2);
        });
        it('can be converted to F', function () {
            expect(Qty('1cC').toSI().value()).to.be(1e-2);
        });
        it('should be a charge', function () {
            expect(Qty('1cC').isCharge()).to.be.ok();
        });
    });
});
