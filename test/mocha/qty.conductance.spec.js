'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Conductance' , function () {

    it('should evaluate empty input as 0 siemens', function () {
        var zero = Qty.Conductance();
        expect(zero.value()).to.be(0);
        expect(zero.isConductance()).to.be.ok();
    });

    it('should evaluate numerical input as siemens', function () {
        expect(Qty.Conductance(1).toSI().value()).to.be(1);
    });

    describe('Decasiemens', function () {
        it('can be obtain from Farad', function () {
            expect(Qty('1S').to('daS').value()).to.be(1e-1);
        });
        it('can be converted to S', function () {
            expect(Qty('1daS').toSI().value()).to.be(1e1);
        });
        it('should be a capacitance', function () {
            expect(Qty('1daS').isConductance()).to.be.ok();
        });
    });
});
