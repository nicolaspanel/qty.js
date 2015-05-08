'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Memory' , function () {

    it('should evaluate empty input as 0Byte', function () {
        var zero = Qty.Memory();
        expect(zero.value()).to.be(0);
        expect(zero.isMemory()).to.be.ok();
    });

    it('should evaluate numerical input as Byte', function () {
        expect(Qty.Memory(1).value()).to.be(1);
    });

    it('can convert MB to B', function () {
        expect(Qty('2.5MB').toSI().value()).to.be(2.5 * 1e6);
    });

    describe('bit', function () {
        it('can be obtain from Bytes', function () {
            expect(Qty('1B').to('b').value()).to.be(8);
        });
        it('can be converted to Bytes', function () {
            expect(Qty('8b').to('B').value()).to.be(1);
        });
        it('should be a memory', function () {
            expect(Qty('1b').isMemory()).to.be.ok();
        });
    });
    describe('1MiB', function () {
        it('can be obtain from kB', function () {
            expect(Qty('1024KiB').to('MiB').value()).to.be(1);
        });
        it('can be converted to Bytes', function () {
            expect(Qty('1MiB').toSI().value()).to.be(Math.pow(2,20));
        });
        it('should be a memory', function () {
            expect(Qty('MiB').isMemory()).to.be.ok();
        });
    });

});
