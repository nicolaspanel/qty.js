'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Duration' , function () {

    it('should evaluate empty input as 0 s', function () {
        var zero = Qty.Duration();
        expect(zero.value()).to.be(0);
        expect(zero.isDuration()).to.be.ok();
    });

    it('should evaluate numerical input as second', function () {
        expect(Qty.Duration(1).convertToSI().value()).to.be(1);
    });
    it('can convert hours to minutes', function () {
        expect(Qty.Duration('2.5h').convertTo('min').value()).to.be(2.5 * 60);
    });

    describe('minutes', function () {
        it('can be obtain from string', function () {
            var qty = Qty('1min');
            expect(qty.value()).to.be(1);
            expect(qty.isDuration()).to.be.ok();
            expect(qty.toSI().value()).to.be(60);
        });

        it('can be formatted with short unity', function () {
            expect(Qty(Math.PI, 'min').format('0.00u')).to.be('3.14min');
        });
        it('can be formatted with long unity', function () {
            expect(Qty(Math.PI, 'min').format('0.00 U')).to.be('3.14 minutes');
            expect(Qty(1, 'min').format('0 U')).to.be('1 minute');
        });
    });

    describe('seconds', function () {
        it('can be obtain from string', function () {
            var qty = Qty('1s');
            expect(qty.value()).to.be(1);
            expect(qty.isDuration()).to.be.ok();
        });
        it('can be build', function () {
            var qty = Qty(1, 's');
            expect(qty.value()).to.be(1);
            expect(qty.isDuration()).to.be.ok();
        });
        it('can be formatted with short unity', function () {
            expect(Qty(Math.PI, 's').format('0.00u')).to.be('3.14s');
        });
        it('can be formatted with long unity', function () {
            expect(Qty(Math.PI, 's').format('0.00 U')).to.be('3.14 seconds');
            expect(Qty(1, 's').format('0 U')).to.be('1 second');
        });
    });
});
