'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Current' , function () {

    it('should evaluate empty input as 0Byte', function () {
        var zero = Qty.Current();
        expect(zero.value()).to.be(0);
        expect(zero.isCurrent()).to.be.ok();
    });

    it('should evaluate numerical input as A', function () {
        expect(Qty.Current(1).toSI().value()).to.be(1);
    });

    describe('mA', function () {
        it('can be obtain from A', function () {
            expect(Qty('1A').to('mA').value()).to.be(1e3);
        });
        it('can be converted to A', function () {
            expect(Qty('1mA').toSI().value()).to.be(1e-3);
        });
        it('should be a current', function () {
            expect(Qty('1mA').isCurrent()).to.be.ok();
        });
    });
});
