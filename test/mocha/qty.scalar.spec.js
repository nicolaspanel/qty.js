'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Scalar', function(){

    it('should evaluate empty input as 0 meter', function () {
        var zero = Qty.Scalar();
        expect(zero.value()).to.be(0);
        expect(zero.valueOf()).to.be(0);
        expect(zero.isScalar()).to.be.ok();
    });

    it('can be created using Qty.new', function () {
        expect(Qty.new().isScalar()).to.be.ok();
    });

    it('can be created using Qty ctr', function () {
        expect(new Qty().isScalar()).to.be.ok();
    });

    it('can be created by call Qty function', function () {
        expect(Qty().isScalar()).to.be.ok();
    });

    it('should parse string inputs if Integer', function () {
        var one = new Qty('3');
        expect(one.value()).to.be(3);
        expect(one.isScalar()).to.be.ok();
    });

    it('should parse string inputs if float with point (".") separator', function () {
        var one = new Qty('3.1');
        expect(one.value()).to.be(3.1);
        expect(one.isScalar()).to.be.ok();
    });

    it('cannot be converted to Length', function () {
        var scalar = Qty.Scalar();
        expect(function () {
                scalar.convertTo('m');
        }).to.throwError();
    });

    it('can be multiplied by another scalar', function () {
        expect(Qty(1).times(2).format()).to.be('2');
    });

    it('can be divided by another scalar', function () {
        expect(Qty(2).by(2).format()).to.be('1');
    });

    describe('percentage', function () {
        it('can be obtain from scalar', function () {
            expect(Qty(1).to('%').value()).to.be(100);
        });
        it('can be converted to scalar', function () {
            expect(Qty('50%').toSI().value()).to.be(0.5);
        });
        it('should be a Percentage', function () {
            expect(Qty('1%').isPercentage()).to.be.ok();
        });
        it('should be a Scalar', function () {
            expect(Qty('1%').isScalar()).to.be.ok();
        });
    });


    describe('formatting', function () {
        it('should render integers', function () {
            expect(Qty(1).format()).to.be('1');
        });
        it('can format floats without any param', function () {
            expect(Qty(Math.PI).format()).to.be('3.14');
        });
        it('should enable custom format', function () {
            expect(Qty(Math.PI * 1000).format('0,0.[00]')).to.be('3,141.59');
        });
        it('should remove optional zero at the end', function () {
            expect(Qty(1/2).format('0.[000]')).to.be('0.5');
        });
        it('should properly display unities', function () {
            expect(Qty('100 km/h').format()).to.be('100km/h');
        });

    });
});