'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Mass', function(){

    it('should evaluate empty input as 0 kg', function () {
        var zero = Qty.Mass();
        expect(zero.value()).to.be(0);
        expect(zero.isMass()).to.be.ok();
    });
    describe('kilograms', function () {
        it('can be obtained form string', function () {
            expect(Qty(2.5, 'kg').isMass()).to.be.ok();
            expect(Qty('2.5kg').isMass()).to.be.ok();
        });
        it('can be formatted with shorthand', function () {
            expect(Qty('2.5kg').format()).to.be('2.50kg');
        });
        it('can be formatted with longhand', function () {
            expect(Qty('2.5kg').format('0.[00] U')).to.be('2.5 kilograms');
        });
        it('can be obtained from grams', function () {
            expect(Qty(1000, 'g').toSI().value()).to.be(1);
            expect(Qty(1000, 'g').to('kg').value()).to.be(1);
        });
    });

    describe('grams', function () {
        it('can be obtained form string', function () {
            expect(Qty(2.5, 'g').value()).to.be(2.5);
            expect(Qty('2.5g').isMass()).to.be.ok();
        });
        it('can be converted to kg', function () {
            expect(Qty(Qty(2500, 'g')).convertToSI().value()).to.be(2.5);
            expect(Qty(Qty(2500, 'g')).to('kg').value()).to.be(2.5);
        });
        it('can be obtained from kg', function () {
            expect(Qty('2.5kg').to('g').value()).to.be(2500);
        });
    });

    describe('pounds', function () {
        it('can be obtained from kg', function () {
            expect(Qty('1kg').to('pounds').value()).to.be(1/0.45359237);
        });
        it('can be converted to kg', function(){
            expect(Qty('1#').toSI().value()).to.be(0.45359237);
            expect(Qty('1 pound').to('kg').value()).to.be(0.45359237);
        });
    });
});
