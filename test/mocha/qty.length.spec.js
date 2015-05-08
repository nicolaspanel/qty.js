'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Length', function(){

    it('should evaluate empty input as 0 meter', function () {
        var zero = Qty.Length();
        expect(zero.value()).to.be(0);
        expect(zero.isLength()).to.be.ok();
    });

    it('should evaluate number input as meters', function () {
        expect(Qty.Length(2.5).value()).to.be(2.5);
    });

    it('should evaluate "2.5" input as 2.5 meters', function () {
        expect(Qty.Length('2.5').value()).to.be(2.5);
    });
    it('should understand "2.5m"', function () {
        expect(Qty('2.5m').value()).to.be(2.5);
    });
    it('should understand "2 m"', function () {
        var length = Qty.Length('2 m');
        expect(length.value()).to.be(2);
    });


    describe('km', function () {
        it('can be obtain from meter', function () {
            expect(Qty('1000m').to('km').value()).to.be(1);
        });
        it('can be converted to meter', function () {
            expect(Qty(2.5, 'km').toSI().value()).to.be(2500);
        });
        it('can be properly formatted', function () {
            expect(Qty('2.5km').format()).to.be('2.50km');
        });
    });

    describe('cm', function () {
        it('can be obtain from meter', function () {
            expect(Qty(1e-2, 'm').to('cm').value()).to.be(1);
        });
        it('can be converted to meter', function () {
            expect(Qty(2.5, 'cm').toSI().value()).to.be(2.5e-2);
        });
        it('can be properly formatted', function () {
            expect(Qty('2.5 cm').format()).to.be('2.50cm');
        });
    });
});
