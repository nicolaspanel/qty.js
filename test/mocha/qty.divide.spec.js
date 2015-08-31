'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Divide' , function () {
    describe('Length', function () {
        it('can be divided with scalar', function () {
            expect(Qty('10km').by(10).isLength).to.be.ok();
        });

        it('should still be a length once divided by a scalar', function () {
            expect(Qty('1km').by(Math.PI).isLength()).to.be.ok();
        });

        it('should become a scalar once divided with another Length', function () {
            expect(Qty('1m').by('1m').isScalar()).to.be.ok();
        });

        it('should become a speed once divided with duration', function () {
            var q  = Qty('1m');
            expect(q.isLength()).to.be.ok();
            expect(q.by('1s').format()).to.be('1m/s');
            expect(q.isSpeed()).to.be.ok();
        });

        it('should support non-metric units', function () {
             expect(Qty('1mile').by('1h').format()).to.be('1mph');
        });
    });

});