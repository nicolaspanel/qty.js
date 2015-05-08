'use strict';

(function() {
    describe('Qty', function(){
        var Qty = window.Qty;
        it('should be defined globally', function(){
            expect(typeof Qty !== 'undefined').toBeTruthy();
        });

        it('should use "en" locale as default', function(){
            expect(Qty.locale()).toBe('en');
        });

        it('should throw an error if conversion is invalid', function () {
            expect(function () {
                Qty('1km').to('s');
            }).toThrow();
        });


        it('can cvrt km to inches', function(){
            expect(Qty('2.54cm').to('inch').value()).toBeCloseTo(1, 4);
        });

        describe('once translated to french', function () {
            beforeEach(function () {
                Qty.locale('fr');
            });
            afterEach(function () {
                Qty.locale('en');
            });
            it('should have locale set to french', function () {
                expect(Qty.locale()).toBe('fr');
            });
        });

    });

}());