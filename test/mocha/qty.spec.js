'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Qty', function(){

    it('should be defined globally', function(){
        expect(typeof Qty).not.to.be('undefined');
    });

    it('should use "en" locale as default', function(){
        expect(Qty.locale()).to.be('en');
    });

    describe('when set locale to "fr"', function () {
        beforeEach(function () {
            require('../../locale/fr');
            Qty.locale('fr');
        });
        afterEach(function () {
            Qty.locale('en');
        });
        it('should use "fr" locale', function () {
            expect(Qty.locale()).to.be('fr');
        });
        it('should use fr delimiters', function(){
            expect(Qty(1234.6789).format()).to.be('1 234,68');
        });
    });

    describe('formatting', function () {
        it('can format without unity', function () {
            expect(Qty(Math.PI, 'km').format('0')).to.be('3');
        });
        it('can format with short unity and without separator', function () {
            expect(Qty(Math.PI, 'km').format('0u')).to.be('3km');
        });
        it('can format with short unity and with separator', function () {
            expect(Qty(Math.PI, 'km').format('0[.]00 u')).to.be('3.14 km');
        });
        it('can format simple units with long unity text', function () {
            expect(Qty(Math.PI, 'm').format('0[.]00 U')).to.be('3.14 meters');
            expect(Qty(1, 'm').format('0 U')).to.be('1 meter');
        });
        it('can format composed units with long unity text', function () {
            expect(Qty(Math.PI, 'km').format('0[.]00 U')).to.be('3.14 kilometers');
            expect(Qty(Math.PI, 'm/s').format('0[.]00 U')).to.be('3.14 meters per second');
        });
    });

});