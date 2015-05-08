'use strict';

(function() {
    describe('qtyConvertTo filter', function () {
        beforeEach(module('qty'));

        var qtyConvertToFilter, Qty;
        beforeEach(inject(function(_qtyConvertToFilter_, _Qty_){
            Qty = _Qty_;
            qtyConvertToFilter  =  _qtyConvertToFilter_;
        }));

        it('can convert string inputs', function(){
            expect(qtyConvertToFilter('1m', 'cm').value()).toBe(100);
        });
        it('can convert qty inputs', function(){
            expect(qtyConvertToFilter(Qty('1km'), 'cm').value()).toBe(1e5);
        });
    });
})();