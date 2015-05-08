'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Resistance' , function () {

    it('should evaluate empty input as 0 ohm', function () {
        var zero = Qty.Resistance();
        expect(zero.value()).to.be(0);
        expect(zero.isResistance()).to.be.ok();
    });

    it('should evaluate numerical input as ohm', function () {
        expect(Qty.Resistance(1).toSI().value()).to.be(1);
    });

    describe('nanoohm', function () {
        it('can be obtain from Volt', function () {
            expect(Qty('1e-9Ω').to('nΩ').value()).to.be(1);
        });
        it('can be converted to ohm', function () {
            expect(Qty('1e9 nanoohm').toSI().value()).to.be(1);
        });
        it('should be a potential', function () {
            expect(Qty('1nΩ').isResistance()).to.be.ok();
        });
    });
});
