'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Area' , function () {
    it('should evaluate empty input as 0m²', function () {
        var zero = Qty.Area();
        expect(zero.value()).to.be(0);
        expect(zero.isArea()).to.be.ok();
        expect(zero.isLength()).not.to.be.ok();
    });

    it('can convert hectares to m²', function () {
        expect(Qty.Area('2.5ha').convertTo('hm^2').value()).to.be(2.5);
    });
});
