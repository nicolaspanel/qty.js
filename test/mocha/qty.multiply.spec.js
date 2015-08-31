'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Multiply' , function () {
    describe('Length', function () {
        it('can be multiplied with scalar', function () {
            expect(Qty('100m').times(10).format('0u')).to.be('1000m');
        });

        it('can be multiplied with another Length', function () {
            expect(Qty('1m').times('1m').format('0u')).to.be('1m^2');
        });

        it('should become an area once multiplied with another Length', function () {
            expect(Qty('1m').times('1m').isArea()).to.be.ok();
        });
    });
});
