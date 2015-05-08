'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Power' , function () {

    it('should evaluate empty input as 0 watt', function () {
        var zero = Qty.Power();
        expect(zero.value()).to.be(0);
        expect(zero.isPower()).to.be.ok();
    });

    it('should evaluate numerical input as watt', function () {
        expect(Qty.Power(1).toSI().value()).to.be(1);
    });

    describe('horse power', function () {
        it('can be obtain from watt', function () {
            expect(Qty('745.699872W').to('hp').value()).to.be(1);
        });
        it('can be converted to watt', function () {
            expect(Qty('1horsepower').toSI().value()).to.be(745.699872);
        });
        it('should be a power', function () {
            expect(Qty('1hp').isPower()).to.be.ok();
        });
    });
});
