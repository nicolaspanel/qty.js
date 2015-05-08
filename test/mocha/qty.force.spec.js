'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Force' , function () {

    it('should evaluate empty input as 0 Newton', function () {
        var zero = Qty.Force();
        expect(zero.value()).to.be(0);
        expect(zero.isForce()).to.be.ok();
    });

    it('should evaluate numerical input as Newton', function () {
        expect(Qty.Force(1).toSI().value()).to.be(1);
    });

    describe('decanewton', function () {
        it('can be obtain from Newton', function () {
            expect(Qty('1e1N').to('daN').value()).to.be(1);
        });
        it('can be converted to Newton', function () {
            expect(Qty('1e-1 decaNewtons').toSI().value()).to.be(1);
        });
        it('should be a force', function () {
            expect(Qty('1daN').isForce()).to.be.ok();
        });
    });
});
