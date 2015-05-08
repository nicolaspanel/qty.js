'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('AngularVelocity' , function () {

    it('should evaluate empty input as 0 rad/s', function () {
        var zero = Qty.AngularVelocity();
        expect(zero.value()).to.be(0);
        expect(zero.isAngularVelocity()).to.be.ok();
    });

    it('should evaluate numerical input as Radian', function () {
        expect(Qty.AngularVelocity(1).toSI().value()).to.be(1);
    });

    describe('round per minute', function () {
        it('can be obtain from radian/s', function () {
            expect(Qty(Math.PI/30,'rad/s').to('rpm').value()).to.be(1);
        });
        it('can be converted to rad/s', function () {
            expect(Qty('1rpm').toSI().value()).to.be(Math.PI/30);
        });
        it('should be a frequency', function () {
            expect(Qty('1rpm').isAngularVelocity()).to.be.ok();
        });
    });
});
