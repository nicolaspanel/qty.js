Parse, manipulate, format and validate physical dimensions.

[![NPM](https://nodei.co/npm/qty.png)](https://nodei.co/npm/qty/)
[![Build Status](https://travis-ci.org/nicolaspanel/qty.js.png)](https://travis-ci.org/nicolaspanel/qty.js) [![Coverage Status](https://coveralls.io/repos/nicolaspanel/qty.js/badge.png)](https://coveralls.io/r/nicolaspanel/qty.js)

# Install

## Browser

```sh
$ bower install --save qty
```


Include  __Qty.js__ and its dependencies in your html:
```html
<script src="components/underscore/underscore.js"></script> 
<!-- or <script src="components/lodash/lodash.js"></script> --> 
<script src="components/qty/min/qty.min.js"></script>
```


## nodejs or iojs

```sh
$ npm install --save qty
```

```js
var Qty = require('qty');
// ...
```

## [AngularJS](https://angularjs.org/) support (optional)

 - Add reference to `angular-qty.js` 
 
 ```html
 <script src="components/underscore/underscore.js"></script> 
 <!-- or <script src="components/lodash/lodash.js"></script> --> 
 <script src="components/angular/angular.js"></script>
 <script src="components/qty/min/qty.min.js"></script>
 <script src="components/qty/min/angular-qty.min.js"></script>
```

 - Include `qty` into application's dependencies
 
 ```
 angular.module('app', [..., 'qty']);
 ```


# Basic usage

## Parse

```js
Qty('2.54cm').value();              // 2.54
Qty('1 oz').value();                // 1
Qty('100 mph').value();             // 100
Qty('1MB').value();                 // 1
```

## Manipulate

### Conversions

```js
Qty('2.54cm').to('inch').value();   // 1
Qty('1 oz').toSI().value();         // 0.0283... 
Qty('100 mph').to('km/h').value();  // 160.934...
Qty('1MiB').to('bit').value();      // 8388608 (=== 8 x 2²⁰)
```

__Note__: 
 * `Qty#toSI` function refers to [International System of Units](http://en.wikipedia.org/wiki/International_System_of_Units).
 * Both quantities must have the same [dimensions](#dimensions)

 
### Additions

```js
Qty('1m').add(1, 'km').format('0u') // 1001m
```


### Subtractions

```js
Qty('1m').subtract('2km').format('0u') // -1999m
```


### Multiplications

```js
Qty('2m').times('2m').format('0u') // 4m^2
Qty('2m').times('2m').isArea()     // true
```


### Divisions

```js
Qty('1m').by('1s').format('0u') // 1m/s
Qty('1m').by('1s').isSpeed()    // true
```


## Format

```js
Qty(Math.PI).format('0.00000');             // 3.14159
Qty(1/4).format('0.[000]');                 // 0.25
Qty(1/4).to('%').format('0u');              // 25%
Qty(1/4).to('%').format('0 U');             // 25 percents
Qty('2.54cm').to('inch').format();          // 1"
Qty('1 oz').toSI().format();                // 0.03kg
Qty('100 mph').to('km/h').format();         // 160.93km/h
Qty('100 mph').to('km/h').format('0 U');    // 161 kilometers per hour
Qty('1TiB').toSI().format();                // 1,099,511,627,776B
```

__Note__: default format is `0,0[.]00u`

## Validate

```js
Qty(Math.PI).isScalar();    // true
Qty('2.54cm').isScalar();   // false
Qty('2.54cm').isLength();   // true
Qty('1 oz').isMass();       // true
Qty('100 mph').isSpeed();   // true
Qty('1024KiB').isMemory();  // true
...
```

__Note__: all possible dimensions are listed in [Doc/Dimensions](#dimensions)


# Doc

## Locale

Default locale is 'en' (US-English).

You can import existing languages by referencing locale file:
 
```html
...   
<script src="components/qty/locale/__LOCALE_KEY__.js"></script>
```

Note: Use 'Qty.locale(__LOCALE_KEY__)' to enable the language.

You can also setup a new language using:
```js
Qty.defineLocale(__LOCALE_KEY__, {
    units: {
       __KEY_0__: [__VAL_0__, __VAL_1__, ...],
       __KEY_1__: [__VAL_0__, __VAL_1__, ...],
       ...
    },
    format: {
        thousands: ',',
        decimal: '.',
        unit: '',
        divideShort:'/',
        divideLong: ' per ',
        multiplyShort: '*',
        multiplyLong: ' '
    }
});
```

__Note__: see `locale/fr.js` for an example. 


## Formats

General syntax: `Qty().format(__FORMAT_TEMPLATE__)`

Examples: 
```js
// value only
Qty(1e4).format('0,0.0000');        //  10,000.0000
Qty(1e4 * Math.PI).format('0,0');   //  31,416
Qty(1e4 * Math.PI).format('+0,0');  // +31,416
Qty(1e4 * Math.PI).format('0,0.0'); //  31,415.9
Qty(1e4 * Math.PI).format('0.000'); //  31415.927
Qty(123.456).format('0[.]00000');   //  123.45600
Qty(-123.456).format('(0,0.0000)'); // (123.4560)
Qty(-123.456).format('0.0[0000]');  // -123.456

// value with unit
Qty(123.123, 'mph').format('0u');   // 123mph
Qty(123.123, 'mph').format('0 u');  // 123 mph
Qty(123.123, 'mph').format('0 U');  // 123 miles per hour
```

__Note__: default format is `0,0[.]00u`


## Dimensions

Supported dimensions are :

 - Scalar (no unit),
 - Length (L),
 - Area (L²),
 - Volume (L³),
 - Duration: (T),
 - Speed : (L/T),
 - Acceleration: (L / T²),
 - Temperature: (K),
 - Mass: (M),
 - Pressure: (M / L / T²),
 - Memory: (bytes)
 - Current: (I)
 - Substance: (N)
 - Capacitance: (T⁴ * I² / L² / M),
 - Charge: (I * T),
 - Conductance (T³ * I² / L² / M),
 - Inductance (L² * M / T² / I²),
 - Potential (L² * M / T³ / I),
 - Resistance (L² * M / T³ / I²)
 - MagneticFlux (M * L² / T² / I) 
 - MagneticFluxDensity (M / T² / I) 
 - Energy: (L² * M / T²) 
 - Force: M² / T² 
 - Frequency: (1 / T),
 - Angle (angle),
 - AngularVelocity: (angle / T),
 - Luminosity (J),
 - Power: (M * L² / T³)


## AngularJS

## `qtyBind` directive

The `qty-bind` attribute tells angular to replace the text content of the 
specified HTML element with the formatted value of the `qty`

### Usage

```html
<ANY qty-bind="qtyExpr"></ANY>
<ANY qty-bind="qtyExpr" qty-convert-to="unitExpression"></ANY>
<ANY qty-bind="qtyExpr" qty-format="formatValue"></ANY>
<ANY qty-bind="qtyExpr" qty-unit="unitValue"></ANY>
```


### Arguments

Param        | type        | Details
-------------|-------------|---------------
qtyBind      | expression  | Can be a `Qty`, a `String` or a `Number`
qtyConvertTo | expression  | Must resolve to a `String`
qtyFormat    | expression  | Must resolve to a `String`. See [Doc / formats](#formats) for formatting options
qtyUnit      | expression  | Must resolve to a `String`


## `qtyConvertTo` & `qtyConvertToSI` filters

### Usage

```html
{{ qty | qtyConvertTo: unit }}
{{ qty | qtyConvertToSI: format }}
```

### Arguments

Param  | type        | Details
-------|-------------|---------------------
qty    | expression  | Can be a `Qty`, a `String` or a `Number`
unit   | expression  | Must resolve to a `String`


## `qtyFormat` filter

### Usage

```html
{{ qty | qtyFormat: format }}
```

### Arguments

Param  | type        | Details
-------|-------------|---------------------
qty    | expression  | Can be a `Qty`, a `String` or a `Number`
format | string      | See [Doc / formats](#formats)


# Tests

```sh
grunt test
```

__Note__: use` grunt exec:coveralls` for coverage report


# Credits

__Qty.js__ was inspired by (and heavily borrowed from) :
 - [moment.js](http://momentjs.com/)
 - [numeral.js](http://numeraljs.com/)
 - [js-quantities](http://gentooboontoo.github.io/js-quantities/)


# License

The MIT License

Copyright (c) 2015 SEN.SE
Copyright (c) 2015 Nicolas Panel


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.