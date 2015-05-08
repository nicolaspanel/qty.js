'use strict';

(function() {
    describe('qtyBind directive', function () {
        beforeEach(module('qty'));

        var scope, $compile, Qty;

        beforeEach(inject(function($rootScope, _$compile_, _Qty_){
            Qty = _Qty_;
            scope = $rootScope.$new();
            $compile = _$compile_;
        }));

        it('should update elt`s txt with the formatted qty', function(){
            var element = angular.element('<span qty-bind="pi"></span>');
            element = $compile(element)(scope);

            scope.$digest(); // call watchers
            expect(element.text()).toBe('0');

            scope.pi = Qty(Math.PI);
            scope.$digest();
            expect(element.text()).toBe('3.14');
        });

        it('should support conversions', function(){
            scope.mass = undefined;
            var element = angular.element('<span qty-bind="mass" qty-convert-to="\'pounds\'"></span>');
            element = $compile(element)(scope);
            scope.$digest();  // call watchers
            expect(element.text()).toBe('0');

            scope.mass = '453.59237 grams';
            scope.$digest();  // call watchers
            expect(element.text()).toBe('1lbs');
        });

        it('should support custom formats', function(){
            scope.pi = Math.PI;
            var element = angular.element('<span qty-bind="pi" qty-format="\'0.000\'"></span>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.text()).toBe('3.142');
        });
        it('should support additional unit', function(){
            scope.pi = Math.PI;
            var element = angular.element('<span qty-bind="pi" qty-unit="\'l\'"></span>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.text()).toBe('3.14l');
        });


    });
})();