'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Add' , function () {

    it('should throw an error when addind units with different dimensions', function () {
        expect(function () {
            Qty.Length().add(Qty.Mass());
        }).to.throwError();
    });
    it('can add quantities with same unit', function () {
        var q = Qty('1m');
        q.add(1, 'm');

        expect(q.value()).to.be(2);
        expect(q.format('0u')).to.be('2m');
    });
    it('can add quantities with different units but same dimension', function () {
        expect(Qty('1m').add(1, 'km').format('0,0u')).to.be('1,001m');
    });
});
