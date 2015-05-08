'use strict';

(function() {
    describe('qtyFormat filter', function () {
        beforeEach(module('qty'));

        var qtyFormatFilter, Qty;
        beforeEach(inject(function(_qtyFormatFilter_, _Qty_){
            Qty = _Qty_;
            qtyFormatFilter  =  _qtyFormatFilter_;
        }));

        it('can format integer', function(){
            expect(qtyFormatFilter(1)).toBe('1');
        });
        it('can format floats', function(){
            expect(qtyFormatFilter(Math.PI)).toBe('3.14');
        });
        it('can format floats with custom template', function(){
            expect(qtyFormatFilter(Math.PI, '0.000')).toBe('3.142');
        });
        it('can format lengths', function(){
            expect(qtyFormatFilter(Qty.Length(1))).toBe('1m');
        });
        it('can format speed', function(){
            expect(qtyFormatFilter(Qty.Speed())).toBe('0m/s');
        });
    });
})();