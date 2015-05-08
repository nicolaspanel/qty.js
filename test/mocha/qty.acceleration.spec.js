'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Acceleration' , function () {

    it('should evaluate empty input as 0m/s²', function () {
        var zero = Qty.Acceleration();
        expect(zero.value()).to.be(0);
        expect(zero.isAcceleration()).to.be.ok();
    });
    it('should be properly formatted', function () {
        expect(Qty.Acceleration(Math.PI).format()).to.be('3.14m/s^2');
    });
    it('should evaluate numerical input as 1 m/s', function () {
        expect(Qty.Acceleration(1).value()).to.be(1);
    });

    describe('gee', function () {
        it('can be evaluated from m/s^2', function () {
            expect(Qty.Acceleration(9.80665).convertTo('gee').value()).to.be(1);
        });

        it('can convert gee to m/s^2', function () {
            expect(Qty('1gee').value()).to.be(1);
            expect(Qty('1gee').convertToSI().value()).to.be(9.80665);
        });

        it('should be an acceleration', function () {
            expect(Qty('1gee').isAcceleration()).to.be.ok();
        });

        it('should be properly formatted', function () {
            expect(Qty(Math.PI, 'gee').format()).to.be('3.14gee');
        });
    });
});
