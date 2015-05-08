'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Angle' , function () {

    it('should evaluate empty input as 0 radian', function () {
        var zero = Qty.Angle();
        expect(zero.value()).to.be(0);
        expect(zero.isAngle()).to.be.ok();
    });

    it('should evaluate numerical input as Radian', function () {
        expect(Qty.Angle(1).toSI().value()).to.be(1);
    });

    describe('degree', function () {
        it('can be obtain from radian', function () {
            expect(Qty('1rad').to('deg').value()).to.be(360 / (2 * Math.PI));
        });
        it('can be converted to radian', function () {
            expect(Qty('360degree').toSI().value()).to.be((2 * Math.PI));
        });
        it('should be a frequency', function () {
            expect(Qty('1deg').isAngle()).to.be.ok();
        });
    });
});
