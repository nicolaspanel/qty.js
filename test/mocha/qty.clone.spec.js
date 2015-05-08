'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Qty ', function(){

    it('can be cloned using Qty#clone', function () {
        var obj = Qty.new(1, 'm'),
            clone = obj.clone();

        obj.convertTo('cm');
        clone.convertTo('mm');
        expect(obj.value()).to.be(1e2);
        expect(clone.value()).to.be(1e3);
    });

    it('can be cloned using Qty.new', function () {
        var obj = Qty.new(1, 'm'),
            clone = Qty.new(obj);

        obj.convertTo('cm');
        clone.convertTo('mm');
        expect(obj.value()).to.be(1e2);
        expect(clone.value()).to.be(1e3);
    });
});