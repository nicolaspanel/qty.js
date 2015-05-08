'use strict';

/* jshint ignore:start */
var expect = require('expect.js');
/* jshint ignore:end */
var Qty = require('../../qty');

describe('Temperature' , function () {
    it('should evaluate empty input as 0 K', function () {
        var zero = Qty.Temperature();
        expect(zero.value()).to.be(0);
        expect(zero.isTemperature()).to.be.ok();
    });
    it('should evaluate numerical input as K', function () {
        expect(Qty.Temperature(1).value()).to.be(1);
    });
    it('can convert K to °C', function () {
        expect(Qty.Temperature(0).convertTo('°C').value()).to.be(-273.15);
    });
    it('can convert °C to K', function () {
        expect(Qty.Temperature('-273.15°C').convertToSI().value()).to.be(0);
    });
    it('can convert K to °F', function () {
        var F = Qty.Temperature(0).convertTo('°F').value();
        expect(Math.round(F*100)/100).to.be(-459.67);
    });
    it('can convert °F to K', function () {
        expect(Qty.Temperature('32°F').convertToSI().value()).to.be(273.15);
    });
    it('can convert K to °Ra', function () {
        expect(Qty.Temperature(0).convertTo('°Ra').value()).to.be(0);
    });
    it('can convert °Ra to K', function () {
        var K = Qty.Temperature('491.67°Ra').convertToSI().value();
        expect(Math.round(K*100)/100).to.be(273.15);
    });
});