'use strict';

angular.module('qty', [])
    .value('Qty', window.Qty)
    .filter('qtyFormat', ['Qty', function(Qty){
        return function(qty, format){
            return Qty.new(qty).format(format);
        };
    }])
    .filter('qtyConvertTo', ['Qty', function(Qty){
        return function(qty, newUnit){
            return Qty.new(qty).to(newUnit);
        };
    }])
    .filter('qtyConvertToSI', ['Qty', function(Qty){
        return function(qty){
            return Qty.new(qty).toSI();
        };
    }])
    .directive('qtyBind', ['$log', 'Qty', function ($log, Qty) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var $elt = angular.element(element[0]);

                scope.$watch(function () {
                    var val = scope.$eval(attrs.qtyBind) || 0;
                    var unit = scope.$eval(attrs.qtyUnit) || 0;
                    var qty = Qty(val, unit);

                    if (attrs.qtyConvertTo){
                        var conversion = scope.$eval(attrs.qtyConvertTo);
                        try {
                            qty.convertTo(conversion);
                        }
                        catch(err){
                            $log.warn(err);
                        }

                    }
                    $elt.text(qty.format(scope.$eval(attrs.qtyFormat)));
                });
            }
        };
    }]);