'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Speed' , function () {

    it('should evaluate empty input as 0m/s', function () {
        var zero = Qty.Speed();
        expect(zero.value()).to.be(0);
        expect(zero.isSpeed()).to.be.ok();
    });

    it('should evaluate numerical input as 1 m/s', function () {
        expect(Qty.Speed(1).convertToSI().value()).to.be(1);
    });
    it('can convert m/s to km/h', function () {
        expect(Qty.Speed(10).convertTo('km/h').value()).to.be(36);
    });
    it('can convert km/h to mph', function () {
        expect(Qty.Speed('120km/h').convertTo('mph').value()).to.be(120/1.609344);
    });

    describe('mph', function () {
        it('can be obtain from Joule', function () {
            expect(Qty('4184.00J').to('Cal').value()).to.be(1);
        });
        it('can be converted to joule', function () {
            expect(Qty('1Cal').toSI().value()).to.be(4184);
        });
        it('should be a speed', function () {
            expect(Qty('100 mph').isSpeed()).to.be.ok();
        });
        it('should not be a length', function () {
            expect(Qty('100 mph').isLength()).not.to.be.ok();
        });
        it('can be formatted with short unity', function () {
            expect(Qty('100 mph').format('0 u')).to.be('100 mph');
        });
        it('can be formatted with long unity', function () {
            expect(Qty('100 mph').format('0 U')).to.be('100 miles per hour');
        });
    });
});
