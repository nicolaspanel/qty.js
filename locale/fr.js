'use strict';

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Qty'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../qty')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : window).Qty); // node or other global
    }
}(function (Qty) {
    return Qty.defineLocale('fr', {
        units: {
            /* prefixes rem ain the same */

            /* length units */
            '<meter>': ['m', 'mètre', 'mètres'],
            '<inch>': ['"', 'pouce', 'pouces', 'po'],
            '<foot>': ['\'', 'pied', 'pieds', 'ft'],
            '<yard>': ['yd', 'yard', 'yards'],
            '<mile>': ['mi', 'mille', 'milles'],
            '<naut-mile>': ['nmi', 'mille nautique', 'milles nautiques'],
            /* area */
            '<hectare>': ['ha', 'hectare', 'hectares'],
            '<are>': ['a', 'are', 'ares'],
            '<acre>': ['acre', 'acre', 'acres'],
            /* volume */
            '<liter>': ['l', 'litre', 'litres', 'L'],
            '<gallon>': ['gal', 'gallon', 'gallons'],
            '<fluid-ounce>': ['floz', 'once liquide', 'once liquide', 'fl oz'],

            /* time */
            '<second>': ['s', 'seconde', 'secondes', 'sec', 'secs'],
            '<minute>': ['min', 'minute', 'minutes', 'mins'],
            '<hour>': ['h', 'heure', 'heures'],
            '<day>': ['j', 'jour', 'jours'],
            '<week>': ['sem', 'semaine', 'semaines'],
            '<year>': ['an', 'an', 'ans', 'année', 'années'],
            '<decade>': ['décénie', 'décénie', 'décénies'],
            '<century>': ['siècle', 'siècle', 'siècles'],

            /* speed */
            '<kph>': ['km/h', 'Kilomètre heure', 'Kilomètres heure', 'kph'],
            '<mph>': ['mph', 'Mille par heure', 'Milles par heure'],
            '<fps>': ['fps', 'Pied par seconde', 'Pieds par seconde'],
            /* acceleration */
            '<gee>': ['g', 'g', 'g'],

            /* mass */
            '<kilogram>': ['kg', 'kilogramme', 'kilogrammes'],
            '<metric-ton>': ['tonne', 'tonne', 'tonnes'],
            '<carat>': ['ct', 'carat', 'carats'],
            '<pound>': ['lbs', 'livre', 'livres', 'lb', '#'],
            '<ounce>': ['oz', 'once', 'onces'],
            '<gram>': ['g', 'gramme', 'grammes'],
            '<grain>': ['gr', 'grain', 'grains'],

            /* temperature diff */
            '<kelvin>': ['K', 'kelvin', 'kelvins', 'degK'],
            '<celsius>': [ '\u00B0' + 'C', 'celsius', 'celsius', 'degC', 'centigrade'],
            '<fahrenheit>': [ '\u00B0' + 'F', 'fahrenheit', 'degF'],
            '<rankine>': [ '\u00B0' + 'Ra', 'rankine', 'rankine', 'degR']
        },
        format: {
            thousands: ' ',
            decimal: ',',
            divideShort:'/',
            divideLong: ' par ',
            multiplyShort: '*',
            multiplyLong: ' '
        }
    });
}));