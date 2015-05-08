'use strict';

(function() {
    describe('qtyConvertToSI filter', function () {
        beforeEach(module('qty'));

        var qtyConvertToSIFilter, Qty;
        beforeEach(inject(function(_qtyConvertToSIFilter_, _Qty_){
            Qty = _Qty_;
            qtyConvertToSIFilter  =  _qtyConvertToSIFilter_;
        }));

        it('can convert string inputs', function(){
            expect(qtyConvertToSIFilter('1cm').value()).toBe(1e-2);
        });
        it('can convert qty inputs', function(){
            expect(qtyConvertToSIFilter(Qty('1km')).value()).toBe(1e3);
        });
    });
})();