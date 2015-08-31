'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Subtract' , function () {

    it('should throw an error when subtracting units with different dimensions', function () {
        expect(function () {
            Qty.Length().subtract(Qty.Mass());
        }).to.throwError();
    });
    it('can subtract quantities with same unit', function () {
        var q = Qty('1m');
        q.subtract(1, 'm');

        expect(q.value()).to.be(0);
        expect(q.format('0u')).to.be('0m');
    });
    it('can subtract quantities with different units but same dimension', function () {
        var q = Qty('1m');
        q.subtract('1 km');

        expect(q.value()).to.be(-999);
        expect(q.format('0u')).to.be('-999m');
    });
    it('can chain subtractions', function () {
        expect(Qty('2m').subtract('1m').subtract('1m').value()).to.be(0);
    });
});
