'use strict';

(function() {

    /*******************************
     *          CONSTANTS
     ******************************/
    var BASES = {
        M    : '<kilogram>', // mass
        T    : '<second>',   // time
        L    : '<meter>',    // length
        K    : '<kelvin>',   // temperature
        I    : '<ampere>',   // current
        N    : '<mole>',     // amount of substance
        J    : '<candela>',  // luminosity
        '<1>': null,     // no dimension
        // Custom
        Memory: '<byte>',
        Angle: '<radian>',
        Percentage: '<%>'
    };
    var DIMENSIONS = {
        Scalar: [[],[]], 
        Length: [[BASES.L], []],
        Area: [[BASES.L, BASES.L], []],
        Volume: [[BASES.L, BASES.L, BASES.L], []],
        Duration: [[BASES.T], []],
        Speed : [[BASES.L], [BASES.T]],
        Acceleration: [[BASES.L], [BASES.T, BASES.T]],
        Temperature: [[BASES.K],[]],
        Mass: [[BASES.M], []],
        Pressure: [[BASES.M],[BASES.L,BASES.T,BASES.T]],
        Memory: [[BASES.Memory],[]],
        Current: [[BASES.I],[]],
        Substance: [[BASES.N],[]],
        Capacitance: [[BASES.T, BASES.T, BASES.T, BASES.T, BASES.I, BASES.I],[BASES.L, BASES.L, BASES.M]],
        Charge: [[BASES.I, BASES.T], []],
        Conductance: [[BASES.T,BASES.T, BASES.T, BASES.I, BASES.I],[BASES.M, BASES.L, BASES.L]],
        Inductance: [[BASES.L, BASES.L, BASES.M], [BASES.T, BASES.T, BASES.I, BASES.I]],
        Potential: [[BASES.L,BASES.L,BASES.M], [BASES.T,BASES.T,BASES.T,BASES.I]],
        Resistance: [[BASES.L,BASES.L,BASES.M],[BASES.T,BASES.T,BASES.T,BASES.I,BASES.I]],
        MagneticFlux: [[BASES.M,BASES.L,BASES.L], [BASES.T,BASES.T,BASES.I]],
        MagneticFluxDensity: [[BASES.M], [BASES.T,BASES.T,BASES.I]],
        Energy: [[BASES.L,BASES.L,BASES.M], [BASES.T,BASES.T]],
        Force: [[BASES.M,BASES.M], [BASES.T,BASES.T]],
        Frequency: [[], [BASES.T]],
        Angle: [[BASES.Angle],[]],
        AngularVelocity: [[BASES.Angle],[BASES.T]],
        Luminosity: [[BASES.J],[]],
        Power: [[BASES.M,BASES.L,BASES.L], [BASES.T,BASES.T,BASES.T]],

        Percentage: [[BASES.Percentage],[]]
    };
    var UNITS =  {
        /* prefixes */
        '<googol>'      :  [1e100, DIMENSIONS.Scalar, 'prefix'],
        '<kibi>'        :  [Math.pow(2,10), DIMENSIONS.Scalar, 'prefix'],
        '<mebi>'        :  [Math.pow(2,20), DIMENSIONS.Scalar, 'prefix'],
        '<gibi>'        :  [Math.pow(2,30), DIMENSIONS.Scalar, 'prefix'],
        '<tebi>'        :  [Math.pow(2,40), DIMENSIONS.Scalar, 'prefix'],
        '<pebi>'        :  [Math.pow(2,50), DIMENSIONS.Scalar, 'prefix'],
        '<exi>'         :  [Math.pow(2,60), DIMENSIONS.Scalar, 'prefix'],
        '<zebi>'        :  [Math.pow(2,70), DIMENSIONS.Scalar, 'prefix'],
        '<yebi>'        :  [Math.pow(2,80), DIMENSIONS.Scalar, 'prefix'],
        '<yotta>'       :  [1e24, DIMENSIONS.Scalar, 'prefix'],
        '<zetta>'       :  [1e21, DIMENSIONS.Scalar, 'prefix'],
        '<exa>'         :  [1e18, DIMENSIONS.Scalar, 'prefix'],
        '<peta>'        :  [1e15, DIMENSIONS.Scalar, 'prefix'],
        '<tera>'        :  [1e12, DIMENSIONS.Scalar, 'prefix'],
        '<giga>'        :  [1e9, DIMENSIONS.Scalar, 'prefix'],
        '<mega>'        :  [1e6, DIMENSIONS.Scalar, 'prefix'],
        '<kilo>'        :  [1e3, DIMENSIONS.Scalar, 'prefix'],
        '<hecto>'       :  [1e2, DIMENSIONS.Scalar, 'prefix'],
        '<deca>'        :  [1e1, DIMENSIONS.Scalar, 'prefix'],
        '<deci>'        :  [1e-1, DIMENSIONS.Scalar, 'prefix'],
        '<centi>'       :  [1e-2, DIMENSIONS.Scalar, 'prefix'],
        '<milli>'       :  [1e-3, DIMENSIONS.Scalar, 'prefix'],
        '<micro>'       :  [1e-6, DIMENSIONS.Scalar, 'prefix'],
        '<nano>'        :  [1e-9, DIMENSIONS.Scalar, 'prefix'],
        '<pico>'        :  [1e-12, DIMENSIONS.Scalar, 'prefix'],
        '<femto>'       :  [1e-15, DIMENSIONS.Scalar, 'prefix'],
        '<atto>'        :  [1e-18, DIMENSIONS.Scalar, 'prefix'],
        '<zepto>'       :  [1e-21, DIMENSIONS.Scalar, 'prefix'],
        '<yocto>'       :  [1e-24, DIMENSIONS.Scalar, 'prefix'],

        /* length units */
        '<meter>'       :  [1, DIMENSIONS.Length, 'length'],
        '<inch>'        :  [0.0254, DIMENSIONS.Length, 'length'],
        '<foot>'        :  [0.3048, DIMENSIONS.Length, 'length'],
        '<yard>'        :  [0.9144, DIMENSIONS.Length, 'length'],
        '<mile>'        :  [1609.344, DIMENSIONS.Length, 'length'],
        '<naut-mile>'   :  [1852, DIMENSIONS.Length, 'length'],
        '<league>'      :  [4828, DIMENSIONS.Length, 'length'],
        '<angstrom>'    :  [1e-10, DIMENSIONS.Length, 'length'],
        '<light-year>'  :  [9460528000000000, DIMENSIONS.Length, 'length'],
        /* area */
        '<hectare>'     :  [1e4, DIMENSIONS.Area, 'area'],
        '<are>'         :  [1e2, DIMENSIONS.Area, 'area'],
        '<acre>'        :  [4046.85642, DIMENSIONS.Area, 'area'],
        '<sqft>'        :  [1, DIMENSIONS.Area, 'area'],
        /* volume */
        '<liter>'       :  [1e-3, DIMENSIONS.Volume, 'volume'],
        '<gallon>'      :  [0.0037854118, DIMENSIONS.Volume, 'volume'],
        '<quart>'       :  [0.00094635295, DIMENSIONS.Volume, 'volume'],
        '<pint>'        :  [0.000473176475, DIMENSIONS.Volume, 'volume'],
        '<cup>'         :  [0.000236588238, DIMENSIONS.Volume, 'volume'],
        '<fluid-ounce>' :  [2.95735297e-5, DIMENSIONS.Volume, 'volume'],
        '<tablespoon>'  :  [1.47867648e-5, DIMENSIONS.Volume, 'volume'],
        '<teaspoon>'    :  [4.92892161e-6, DIMENSIONS.Volume, 'volume'],
        '<bushel>'      :  [0.035239072, DIMENSIONS.Volume, 'volume'],

        /* time units */
        '<second>'      :  [1, DIMENSIONS.Duration, 'duration'],
        '<minute>'      :  [60,DIMENSIONS.Duration, 'duration'],
        '<hour>'        :  [3600,DIMENSIONS.Duration, 'duration'],
        '<day>'         :  [3600*24, DIMENSIONS.Duration, 'duration'],
        '<week>'        :  [7*3600*24, DIMENSIONS.Duration, 'duration'],
        '<fortnight>'   :  [1209600, DIMENSIONS.Duration, 'duration'],
        '<year>'        :  [31556926, DIMENSIONS.Duration, 'duration'],
        '<decade>'      :  [315569260, DIMENSIONS.Duration, 'duration'],
        '<century>'     :  [3155692600, DIMENSIONS.Duration, 'duration'],

        /* speed */
        '<kph>'         :  [0.277777778, DIMENSIONS.Speed, 'speed'],
        '<mph>'         :  [0.44704, DIMENSIONS.Speed, 'speed'],
        '<knot>'        :  [0.514444444, DIMENSIONS.Speed, 'speed'],
        '<fps>'         :  [0.3048, DIMENSIONS.Speed, 'speed'],
        /* acceleration */
        '<gee>'         :  [9.80665, DIMENSIONS.Acceleration, 'acceleration'],

        /* mass */
        '<kilogram>'    :  [1.0, DIMENSIONS.Mass, 'mass'],
        '<metric-ton>'  :  [1000, DIMENSIONS.Mass, 'mass'],
        '<carat>'       :  [0.0002, DIMENSIONS.Mass, 'mass'],
        '<pound>'       :  [0.45359237, DIMENSIONS.Mass, 'mass'],
        '<ounce>'       :  [0.0283495231, DIMENSIONS.Mass, 'mass'],
        '<gram>'        :  [ 1e-3, DIMENSIONS.Mass, 'mass'],
        '<grain>'       :  [6.479891e-5, DIMENSIONS.Mass, 'mass'],

        /* temperature diff */
        '<kelvin>'      :  [1.0, DIMENSIONS.Temperature,'temperature'],
        '<celsius>'     :  [[function(c){ return c + 273.15; }, /* °C -> K */ function(k){ return k - 273.15; } /* K -> °C */], DIMENSIONS.Temperature,'temperature'],
        '<fahrenheit>'  :  [[function(f){ return (f - 32) / 1.8 + 273.15; }, /* °F -> K */ function(k){ return (k - 273.15) * 1.8 + 32; }  /* K -> °F */], DIMENSIONS.Temperature,'temperature'],
        '<rankine>'     :  [1/1.8, DIMENSIONS.Temperature, 'temperature'],

        /* pressure */
        '<pascal>'      : [1.0, DIMENSIONS.Pressure, 'pressure'],
        '<bar>'         : [100000, DIMENSIONS.Pressure, 'pressure'],
        '<atm>'         : [101325, DIMENSIONS.Pressure, 'pressure'],
        '<psi>'         : [6894.76, DIMENSIONS.Pressure, 'pressure'],

        /* memory */
        '<byte>'        : [1.0, DIMENSIONS.Memory, 'memory'],
        '<bit>'         : [0.125, DIMENSIONS.Memory, 'memory'],

        /* current */
        '<ampere>'      : [1.0, DIMENSIONS.Current, 'current'],

        /* substance */
        '<mole>'        : [1.0, DIMENSIONS.Substance, 'substance'],

        /* capacitance */
        '<farad>'       : [1.0, DIMENSIONS.Capacitance, 'capacitance'],
        /* charge */
        '<coulomb>'     : [1, DIMENSIONS.Charge, 'charge'],
        '<franklin>'    : [0.8576, DIMENSIONS.Charge, 'charge'],

        /* conductance */
        '<siemens>'     : [1, DIMENSIONS.Conductance, 'conductance'],

        /* inductance */
        '<henry>'       : [1, DIMENSIONS.Inductance, 'inductance'],

        /* potential */
        '<volt>'        : [1, DIMENSIONS.Potential, 'potential'],

        /* resistance */
        '<ohm>'         : [1, DIMENSIONS.Resistance, 'resistance'],
        /* magnetism */
        '<weber>'       : [1.0, DIMENSIONS.MagneticFlux, 'magnetic-flux'],
        '<maxwell>'     : [1e-8, DIMENSIONS.MagneticFlux, 'magnetic-flux'],
        '<tesla>'       : [1.0, DIMENSIONS.MagneticFluxDensity, 'magnetic-flux-density'],
        '<gauss>'       : [1e-4, DIMENSIONS.MagneticFluxDensity, 'magnetic-flux-density'],

        /* energy */
        '<joule>'       : [1.0, DIMENSIONS.Energy, 'energy'],
        '<calorie>'     : [4.184, DIMENSIONS.Energy, 'energy'],
        '<Calorie>'     : [4184.00, DIMENSIONS.Energy, 'energy'],
        /* force */
        '<newton>'      : [1.0, DIMENSIONS.Force, 'force'],
        /* frequency */
        '<hertz>'       : [1.0, DIMENSIONS.Frequency, 'frequency'],

        /* angle */
        '<radian>'      : [1.0, DIMENSIONS.Angle, 'angle'],
        '<degree>'      : [Math.PI / 180.0, DIMENSIONS.Angle, 'angle'],
        '<rpm>'         : [Math.PI / 30, DIMENSIONS.AngularVelocity, 'angular_velocity'],

        /* luminosity */
        '<candela>'     : [1.0, DIMENSIONS.Luminosity, 'luminosity'],

        /* power */
        '<watt>'        : [1.0, DIMENSIONS.Power, 'power'],
        '<horsepower>'  : [745.699872, DIMENSIONS.Power, 'power'],

        /* other */
        '<%>'           : [0.01, DIMENSIONS.Percentage, 'percentage'],
    };

    /*******************************
     *          Utils
     ******************************/
    var __hasModule = (typeof module !== 'undefined' && module.exports);
    var __ = __hasModule? require('underscore'): _;
    var stringFormat = (function() {
        /* jshint ignore:start */
        var __slice = [].slice;
        function lookup(object, key) {
            var match;
            if (!/^(\d+)([.]|$)/.test(key)) {
                key = '0.' + key;
            }
            while (match = /(.+?)[.](.+)/.exec(key)) {
                object = resolve(object, match[1]);
                key = match[2];
            }
            return resolve(object, key);
        }
        function resolve (object, key) {
            var value;
            value = object[key];
            if (typeof value === 'function') {
                return value.call(object);
            } else {
                return value;
            }
        }
        var implicitToExplicit = 'cannot switch from implicit to explicit numbering',
            explicitToImplicit = 'cannot switch from explicit to implicit numbering';

        return function() {
            var template = arguments[0],
                args = arguments.length >1 ? __slice.call(arguments, 1) : [],
                idx = 0,
                explicit = false,
                implicit = false,
                message = 'cannot switch from {} to {} numbering';

            return template.replace(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g, function(match, literal, key, transformer) {
                var value, _ref, _ref1;
                if (literal) {
                    return literal;
                }
                if (key.length) {
                    if (implicit) {
                        throw new Error(implicitToExplicit);
                    }
                    explicit = true;
                    value = (_ref = lookup(args, key)) != null ? _ref : '';
                } else {
                    if (explicit) {
                        throw new Error(explicitToImplicit);
                    }
                    implicit = true;
                    value = (_ref1 = args[idx++]) != null ? _ref1 : '';
                }
                return value;
            });
        };
        /* jshint ignore:end */
    })();
    var numberFormat = (function() {
        function toFixed (value, precision, roundingFunction, optionals) {
            var power = Math.pow(10, precision),
                optionalsRegExp,
                output;

            //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
            // Multiply up by precision, round accurately, then divide and use native toFixed():
            output = (roundingFunction(value * power) / power).toFixed(precision);

            if (optionals) {
                optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
                output = output.replace(optionalsRegExp, '');
            }

            return output;
        }

        return function(value, format, roundingFunction) {

            var negP = false,
                signed = false,
                optDec = false,
                w,
                precision,
                thousands,
                d = '',
                neg = false,
                locale = LOCALES[CURRENT_LOCALE];
            roundingFunction = roundingFunction || Math.round;
            format = format || locale.format.default;

            format = format.replace(/(\s|u|U)/g, '');

            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }


            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    d = locale.format.decimal + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.format.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }
            return stringFormat('{start}{neg}{signed}{w}{d}{end}', {
                start: (negP && neg) ? '(' : '',
                neg : (!negP && neg) ? '-' : '',
                signed : (!neg && signed) ? '+' : '',
                w: w,
                d: d,
                end : (negP && neg) ? ')' : ''
            });
        };
    })();
    function getQty(input){
        var match = QTY_STRING_REGEX.exec(input),
            q = match[1];
        return parseFloat((q || '0').replace(/\s/g, ''));
    }

    /* set prefixes/unities regex according to current local */
    function resetRegexes(){
        var locale = LOCALES[CURRENT_LOCALE] || LOCALES.en;
        PREFIX_MAP = __.chain(UNITS)
            .pairs()
            .filter(function (pair) { return pair[1][2] === 'prefix' && locale.units[pair[0]]; }) // make sure prefix is supported by current locale
            .map(function (pair) { return [pair[0], locale.units[pair[0]]]; })
            .reduce(function(memo, pair){ return memo.concat(pair[1].map(function (p) { return [p, pair[0]]; })); }, [])
            .object()
            .value();

        PREFIX_REGEX = __.chain(PREFIX_MAP)
            .keys()
            .sortBy(function (k) { return -1 * k.length; })
            .value()
            .join('|');

        UNIT_MAP = __.chain(UNITS)
            .pairs()
            .reject(function (pair) {
                return pair[1][2] === 'prefix' || !locale.units[pair[0]];
            }) // make sure not a prefix and supported by current locale
            .map(function (pair) { return [pair[0], locale.units[pair[0]]]; })
            .reduce(function(memo, pair){ return memo.concat(pair[1].map(function (p) { return [p, pair[0]]; })); }, [])
            .object()
            .value();
        UNIT_REGEX = __.chain(UNIT_MAP)
            .keys()
            .sortBy(function (k) { return -1 * k.length; })
            .value()
            .join('|');

        UNIT_MATCH = stringFormat('({0})??({1})(?:{2})', PREFIX_REGEX, UNIT_REGEX, BOUNDARY_REGEX);
        UNIT_MATCH_REGEX = new RegExp(UNIT_MATCH, 'g'); // g flag for multiple occurences
        UNIT_TEST_REGEX = new RegExp(stringFormat('^\\s*({0}\\s*\\*?\\s*)+$', UNIT_MATCH));
        PREFIXED_UNIT_MATCH = stringFormat('({0})_\\*_({1})', PREFIX_REGEX, UNIT_REGEX);
        PREFIXED_UNIT_MATCH_REGEX = new RegExp(PREFIXED_UNIT_MATCH, 'g');
    }

    /*******************************
     *          REGEX
     ******************************/
    var SIGN = '[+-]';
    var INTEGER = '\\d+';
    var SIGNED_INTEGER = stringFormat('{0}?{1}', SIGN, INTEGER);
    var FRACTION = stringFormat('\\.{0}', INTEGER);
    var FLOAT = stringFormat('(?:{0}(?:{1})?)|(?:{1})', INTEGER, FRACTION);
    var EXPONENT = stringFormat('[Ee]{0}', SIGNED_INTEGER);
    var SCI_NUMBER = stringFormat('(?:{0})(?:{1})?', FLOAT, EXPONENT);
    var SIGNED_NUMBER =  stringFormat('{0}?\\s*{1}', SIGN, SCI_NUMBER);
    var QTY_STRING_REGEX = new RegExp(stringFormat('^({0})?\\s*([^/]*)(?:\/(.+))?$', SIGNED_NUMBER));
    var POWER_OP = '\\^|\\*{2}';
    var TOP_REGEX = new RegExp (stringFormat('([^ \\*]+?)(?:{0})?(-?\\d+)', POWER_OP));
    var BOTTOM_REGEX = new RegExp(stringFormat('([^ \\*]+?)(?:{0})?(\\d+)', POWER_OP));
    var BOUNDARY_REGEX = '\\b|$';

    var PREFIX_MAP, UNIT_MAP,
        PREFIX_REGEX, UNIT_REGEX,
        UNIT_MATCH, UNIT_MATCH_REGEX, UNIT_TEST_REGEX,
        PREFIXED_UNIT_MATCH, PREFIXED_UNIT_MATCH_REGEX;

    var UNIT_FORMAT_REGEX = /(?:(\S+))(?:(\s+))?(?:(u|U))/;
    /*******************************
     *          Unit class
     ******************************/
    function Unit(dim) {
        if (typeof this === 'undefined'){
            return new Unit(dim);
        }
        if (__.isString(dim)){
            this.num = [dim];
            this.den = [];
        }
        else {
            this.num = __.isString(dim[0])? [dim[0]]: dim[0] || [];
            this.den = __.isString(dim[1])? [dim[1]]: dim[1] || [];
        }
    }
    Unit.prototype.dim = function () {
        var numDims = __.chain(this.num)
            .reject(function(u){ return  u === BASES.Percentage; })
            .reduce(function (memo, u) {
                var baseDim = UNITS[u][1];
                return [
                    memo[0].concat(baseDim[0]),
                    memo[1].concat(baseDim[1])
                ];
            }, [[], []])
            .value();
        var denDims = __.chain(this.den)
            .reject(function(u){ return  u === BASES.Percentage; })
            .reduce(function (memo, u) {
                var baseDim = UNITS[u][1];
                return [
                    memo[0].concat(baseDim[1]),
                    memo[1].concat(baseDim[0])
                ];
            }, [[], []])
            .value();

        var counts = {
            num: __(numDims[0].concat(denDims[0])).countBy(function(u){ return u;}),
            den: __(numDims[1].concat(denDims[1])).countBy(function(u){ return u;})
        };

        var reduced = __.chain(__.union(numDims[0], numDims[1], denDims[0], denDims[1]))
            .map(function (u) {
                var n = counts.num[u] || 0,
                    d = counts.den[u] || 0,
                    reduced ={ num:  n > d ? n - d : 0, den: d > n? d - n: 0};
                return [
                    ['num', __.range(reduced.num).map(function(){ return u; })],
                    ['den', __.range(reduced.den).map(function(){ return u; })]
                ];
            })
            .flatten(true)
            .reduce(function(memo, item){
                memo[item[0]] = memo[item[0]] || [];
                memo[item[0]] = memo[item[0]].concat(item[1]);
                return memo;
            }, {})
            .value();
        return new Unit([reduced.num || [], reduced.den || []]);
    };
    Unit.prototype.compatibleWith = function(dimension){
        var selfDim = this.dim();
        var expected = Unit.get(dimension);
        var expectedDim = expected.dim();
        return (
            selfDim.num.length === expectedDim.num.length &&
            selfDim.den.length === expectedDim.den.length &&
            __.isEmpty(__.difference(selfDim.num, expectedDim.num)) &&
            __.isEmpty(__.difference(expectedDim.num, selfDim.num)) &&
            __.isEmpty(__.difference(selfDim.den, expectedDim.den)) &&
            __.isEmpty(__.difference(expectedDim.den, selfDim.den)) );
    };
    Unit.prototype.assertCompatibleWith = function(input){
        var inputUnit = Unit.get(input);

        if (!this.compatibleWith(inputUnit)) {
            var selfDim = this.dim();
            var expectedDim = inputUnit.dim();
            throw new Error(stringFormat('Incompatible dimensions.\nActual: {actual}\nExpected: {expected}', {
                actual: stringFormat('({})/({})', selfDim.num.join('*') || 1, selfDim.den.join('*') || 1),
                expected: stringFormat('({})/({})', expectedDim.num.join('*') || 1, expectedDim.den.join('*') || 1)
            }));
        }
    };
    Unit.prototype.computeSI = function(q){
        if (this.compatibleWith(Unit(DIMENSIONS.Temperature))){
            if (this.num.length !== 1 || this.den.length > 0){
                // TODO: manage case where multiple conversion required
                throw new Error('not supported');
            }
            var conversion = UNITS[this.num[0]][0];
            if (__.isNumber(conversion)){
                return q * conversion;
            }
            else {
                // assume array
                return conversion[0](q);
            }
        }
        var num = __(this.num).reduce(function(memo, u){ return memo * UNITS[u][0]; },1),
            den = __(this.den).reduce(function(memo, u){ return memo * UNITS[u][0]; },1);
        return q * num / den;
    };
    Unit.prototype.computeValue = function(si){
        if (this.compatibleWith(Unit(DIMENSIONS.Temperature))){
            // TODO: manage case where multiple conversion required
            if (this.num.length !== 1 || this.den.length > 0){
                throw new Error('not supported');
            }
            var conversion = UNITS[this.num[0]][0];
            if (__.isNumber(conversion)){
                return si / conversion;
            }
            else {
                // assume array
                return conversion[1](si);
            }
        }
        var num = __(this.num).reduce(function(memo, u){ return memo * UNITS[u][0]; },1),
            den = __(this.den).reduce(function(memo, u){ return memo * UNITS[u][0]; },1);
        return si * den / num;
    };

    Unit.prototype.format = function(format, plural){
        if (!UNIT_FORMAT_REGEX.test(format)){
            return ''; // no unit expected
        }
        var match = UNIT_FORMAT_REGEX.exec(format);
        var short = match[3] === 'u',
            separator = match[2] || '';
        plural = !!plural;
        var locale = LOCALES[CURRENT_LOCALE] || LOCALES.en;
        var num, den;
        var multSeparator = short? locale.format.multiplyShort: locale.format.multiplyLong,
            divSeparator = short? locale.format.divideShort: locale.format.divideLong;
        if (this.num.length){
            num = __.chain(this.num)
                .countBy(function (u) { return u; })
                .pairs()
                .map(function(pair){
                    var u = pair[0],
                        count = pair[1],
                        unitString = short ? locale.units[u][0]: plural? locale.units[u][2]: locale.units[u][1];
                    return count === 1? unitString : stringFormat('{0}^{1}', unitString, count); })
                .value()
                .join('_*_')
                .replace(PREFIXED_UNIT_MATCH_REGEX, '$1$2')
                .replace(/(_\*_)/g, multSeparator);
        }
        if (this.den.length){
            den = __.chain(this.den)
                .countBy(function (u) { return u; })
                .pairs()
                .map(function(pair){
                    var u = pair[0],
                        count =pair[1],
                        unitString = short ? locale.units[u][0]:locale.units[u][1]; // no pluralization
                    return count === 1? unitString : stringFormat('{0}^{1}', unitString, count); })
                .value()
                .join('_/_')
                .replace(PREFIXED_UNIT_MATCH_REGEX, '$1$2')
                .replace(/(_\/_)/g, multSeparator);
        }
        if (num && den){
            return stringFormat('{0}{1}{2}{3}', separator, num, divSeparator , den);
        }
        else if (den){
            return stringFormat('{0}{1}{2}', separator, divSeparator, den);
        }
        else if (num) {
            return separator + num;
        }
        else {
            return '';
        }
    };

    var PARSED_UNITS_CACHE = {};
    Unit.get = function (input) {
        if (input instanceof Unit){
            return input;
        }
        else if (!__.isString(input)) {
            input = (input || '').toString();
        }
        var match = QTY_STRING_REGEX.exec(input),
            top = match[2],
            bottom = match[3];

        var n, x, nx;
        while((match = TOP_REGEX.exec(top))) {
            n = parseFloat(match[2]);
            if(__.isNaN(n)) {
                // Prevents infinite loops
                throw new Error('Unit exponent is not a number');
            }
            // Disallow unrecognized unit even if exponent is 0
            if(n === 0 && !UNIT_TEST_REGEX.test(match[1])) {
                throw new Error('Unit not recognized');
            }
            x = match[1] + ' ';
            nx = '';
            for(var i = 0; i < Math.abs(n) ; i++) {
                nx += x;
            }
            if(n >= 0) {
                top = top.replace(match[0], nx);
            }
            else {
                bottom = bottom ? bottom + nx : nx;
                top = top.replace(match[0], '');
            }
        }

        while((match = BOTTOM_REGEX.exec(bottom))) {
            n = parseFloat(match[2]);
            if(isNaN(n)) {
                // Prevents infinite loops
                throw new Error('Unit exponent is not a number');
            }
            // Disallow unrecognized unit even if exponent is 0
            if(n === 0 && !UNIT_TEST_REGEX.test(match[1])) {
                throw new Error('Unit not recognized');
            }
            x = match[1] + ' ';
            nx = '';
            for(var j = 0; j < n ; j++) {
                nx += x;
            }

            bottom = bottom.replace(match[0], nx, 'g');
        }

        function __parse(unitsString){
            if (PARSED_UNITS_CACHE[unitsString]){
                return PARSED_UNITS_CACHE[unitsString];
            }
            var unitMatch, normalizedUnits = [];
            if(!UNIT_TEST_REGEX.test(unitsString)) {
                throw new Error(stringFormat('Unit "{0}" not recognized', unitsString));
            }
            while((unitMatch = UNIT_MATCH_REGEX.exec(unitsString))) {
                normalizedUnits.push(unitMatch.slice(1));
            }

            var res = __.chain(normalizedUnits)
                .map(function (item) {
                    var hasPrefix = !!PREFIX_MAP[item[0]];
                    if (hasPrefix){
                        return [PREFIX_MAP[item[0]], UNIT_MAP[item[1]]];
                    }
                    else {
                        return [UNIT_MAP[item[1]]];
                    }
                })
                .flatten()
                .value();
            PARSED_UNITS_CACHE[unitsString] = res;
            return res;
        }
        return new Unit([top? __parse(top.trim()) : [], bottom? __parse(bottom.trim()) : []]);
    };

    /*******************************
     *          Qty class
     ******************************/
    function Qty(input, unit){
        if (typeof this === 'undefined' || !(this instanceof Qty)){
            return new Qty(input, unit);
        }
        if (input instanceof Qty){
            return input.clone();
        }
        else if (!__.isString(input)) {
            input = (input || 0).toString();
        }
        input = input.trim();
        var u = Unit.get(input);
        if (u.compatibleWith(new Unit(DIMENSIONS.Scalar)) && unit){
            // override unity
            u = Unit.get(unit);
        }
        this._u = u;
        this._si = u.computeSI(getQty(input || 0), u);
    }
    Qty.prototype.value = Qty.prototype.valueOf = function () {
        return this._u.computeValue(this._si);
    };

    Qty.prototype.format = function(format){
        var locale = LOCALES[CURRENT_LOCALE];
        format = format || locale.format.default;
        var value = this.value(),
            plural = value > 1;
        return stringFormat('{num}{unit}', {
            num: numberFormat(value, format),
            unit: this._u.format(format, plural)
        }).trim();
    };

    Qty.prototype.convertTo =  function(unit){
        var newUnit = Unit.get(unit);
        this._u.assertCompatibleWith(newUnit);
        this._u = newUnit;
        return this;
    };
    Qty.prototype.to = Qty.prototype.convertTo;
    Qty.prototype.convertToSI =  function(){
        this._u = this._u.dim();
        return this;
    };
    Qty.prototype.toSI = Qty.prototype.convertToSI;
    Qty.prototype.clone  = function(){
        return Qty(this.value(), new Unit([this._u.num, this._u.den]));
    };
    Qty.new = function(input, unit){
        return new Qty(input, unit);
    };

    Qty.prototype.compatibleWith = function(dimension){
        return this._u.compatibleWith(dimension);
    };
    // shorcut for each dimension
    __.keys(DIMENSIONS).forEach(function(dim){
        var methodName = stringFormat('is{0}', dim);
        Qty.prototype[methodName] = function(){
            return this._u.compatibleWith(new Unit(DIMENSIONS[dim]));
        };
        Qty[dim] = function(input, unit){
            var q = new Qty(input, unit || new Unit(DIMENSIONS[dim]));
            if (!q.compatibleWith(Unit(DIMENSIONS[dim]))){
                throw Error(stringFormat('"{0}" cannot be interpreted as a {1}', input, dim));
            }
            return q;
        };
    });

    /*******************************
     *        LOCALE manager
     ******************************/
    var DEFAULT_TRANSLATIONS = {
        /* prefixes */
        '<googol>'      : ['googol'],
        '<kibi>'        : ['Ki','kibi','kibi','Kibi'],
        '<mebi>'        : ['Mi','mebi','mebi','Mebi'],
        '<gibi>'        : ['Gi','gibi','gibi','Gibi'],
        '<tebi>'        : ['Ti','tebi','tebi','Tebi'],
        '<pebi>'        : ['Pi','pebi','Pebi'],
        '<exi>'         : ['Ei','exi','exi','Exi'],
        '<zebi>'        : ['Zi','zebi','zebi','Zebi'],
        '<yebi>'        : ['Yi','yebi','yebi','Yebi'],
        '<yotta>'       : ['Y','yotta','yotta','Yotta'],
        '<zetta>'       : ['Z','zetta','zetta','Zetta'],
        '<exa>'         : ['E','exa','exa','Exa'],
        '<peta>'        : ['P','peta','peta','Peta'],
        '<tera>'        : ['T','tera','tera','Tera'],
        '<giga>'        : ['G','giga','giga','Giga'],
        '<mega>'        : ['M','mega','mega','Mega'],
        '<kilo>'        : ['k','kilo','kilo','kilo'],
        '<hecto>'       : ['h','Hecto','Hecto','hecto'],
        '<deca>'        : ['da','deca','deca','Deca','deka'],
        '<deci>'        : ['d','deci','deci','Deci'],
        '<centi>'       : ['c','centi','centi','Centi'],
        '<milli>'       : ['m','milli','Milli'],
        '<micro>'       : ['\u03BC'/*µ greek*/,'micro','micro','u','\u00B5'/*µ sign*/,'Micro','mc'],
        '<nano>'        : ['n','nano','Nano'],
        '<pico>'        : ['p','pico','pico','Pico'],
        '<femto>'       : ['f','femto','femto','Femto'],
        '<atto>'        : ['a','atto','atto','Atto'],
        '<zepto>'       : ['z','zepto','zepto','Zepto'],
        '<yocto>'       : ['y','yocto','yocto','Yocto'],

        /* length units */
        '<meter>'       : ['m','meter','meters'],
        '<inch>'        : ['"','inch','inches','in'],
        '<foot>'        : ['\'','foot','feet','ft'],
        '<yard>'        : ['yd','yard','yards'],
        '<mile>'        : ['mi','mile','miles'],
        '<naut-mile>'   : ['nmi', 'nautical mile', 'nautical miles'],
        '<angstrom>'    : ['ang','angstrom','angstroms'],
        '<light-year>'  : ['ly','light-year', 'ligth-years'],
        /* area */
        '<hectare>'     : ['ha', 'hectare', 'hectares'],
        '<are>'         : ['a', 'are', 'ares'],
        '<acre>'        : ['acre','acre','acres'],
        '<sqft>'        : ['sqft', 'sqft', 'sqft'],
        /* volume */
        '<liter>'       : ['l','liter','liters','L'],
        '<gallon>'      : ['gal','gallon','gallons'],
        '<quart>'       : ['qt','quart','quarts'],
        '<pint>'        : ['pt','pint','pints'],
        '<cup>'         : ['cu','cup','cups'],
        '<fluid-ounce>' : ['floz','fluid-ounce','fluid-ounces', 'fl oz'],
        '<tablespoon>'  : ['tbs','tablespoon','tablespoons'],
        '<teaspoon>'    : ['tsp','teaspoon','teaspoons'],
        '<bushel>'      : ['bu','bsh','bushel','bushels'],

        /* time */
        '<second>'      : ['s','second','seconds', 'sec','secs'],
        '<minute>'      : ['min','minute','minutes','min'],
        '<hour>'        : ['h','hour','hours','hr','hrs'],
        '<day>'         : ['d','day','days'],
        '<week>'        : ['wk','week','weeks'],
        '<fortnight>'   : ['fortnight','fortnight','fortnights'],
        '<year>'        : ['y','year','years','annum','yr'],
        '<decade>'      : ['decade','decade','decades'],
        '<century>'     : ['century','century','centuries'],

        /* speed */
        '<kph>'         : ['kph', 'kilometer per hour', 'kilometers per hour'],
        '<mph>'         : ['mph', 'mile per hour', 'miles per hour'],
        '<knot>'        : ['kt','knot','knots','kn','kts'],
        '<fps>'         : ['fps', 'foot per second', 'feet per second'],
        /* acceleration */
        '<gee>'         : ['gee','gee','gees','g'],

        /* mass */
        '<kilogram>'    : ['kg','kilogram','kilograms'],
        '<metric-ton>'  : ['tonne','tonne','tonnes'],
        '<carat>'       : ['ct','carat','carats'],
        '<pound>'       : ['lbs','pound','pounds','lb','#'],
        '<ounce>'       : ['oz','ounce','ounces'],
        '<gram>'        : ['g','gram','grams','gramme','grammes'],
        '<grain>'       : ['gr', 'grain','grains'],

        /* temperature diff */
        '<kelvin>'      : ['K','kelvin', 'kelvins','degK'],
        '<celsius>'     : [ '\u00B0' + 'C','celsius','celsius','degC','centigrade'],
        '<fahrenheit>'  : [ '\u00B0' + 'F','fahrenheit', 'degF'],
        '<rankine>'     : [ '\u00B0' + 'Ra','rankine','rankine', 'degR'],

        /* pressure */
        '<pascal>'      : ['Pa','pascal','pascal'],
        '<bar>'         : ['bar','bar','bars'],
        '<atm>'         : ['atm','atmosphere','atmospheres','ATM'],
        '<psi>'         : ['psi'],

        /* memory */
        '<byte>'        : ['B','byte', 'bytes'],
        '<bit>'         : ['b','bit','bits'],

        /* current */
        '<ampere>'      : ['A','ampere','amperes','amp','amps'],

        /* substance */
        '<mole>'        : ['mol','mole','moles'],

        /* capacitance */
        '<farad>'       : ['F','farad','farads','Farad','Farads'],
        /* charge */
        '<coulomb>'     : ['C','coulomb','coulombs','Coulombs'],

        /* conductance */
        '<siemens>'     : ['S','siemens','siemens','Siemens'],

        /* inductance */
        '<henry>'       : ['H','henry','henry','Henry'],

        /* potential */
        '<volt>'        : ['V','volt','volts','Volt','Volts'],

        /* resistance */
        '<ohm>'         : ['\u2126'/*Ω as ohm sign*/, 'ohm','ohms','Ohm','Ohms','\u03A9'/*Ω as greek letter*/],

        /* magnetism */
        '<weber>'       : ['Wb','weber', 'webers', 'Weber', 'Webers'],
        '<maxwell>'     : ['Mx','maxwell','maxwells','Maxwell','Maxwells'],
        '<tesla>'       : ['T','tesla', 'teslas', 'Tesla','Teslas'],
        '<gauss>'       : ['G','gauss','gauss','Gauss'],

        /* energy */
        '<joule>'       : ['J','joule','joules','Joule','Joules'],
        '<calorie>'     : ['cal','calorie','calories'],
        '<Calorie>'     : ['Cal','Calorie','Calories'],
        /* force */
        '<newton>'      : ['N','newton','newtons','Newton','Newtons'],
        /* frequency */
        '<hertz>'       : ['Hz','hertz','hertz','Hertz'],

        /* angle */
        '<radian>'      : ['rad','radian','radians','Radian','Radians'],
        '<degree>'      : ['deg','degree','degrees','Degree','Degrees'],
        '<rpm>'         : ['rpm', 'round per minute', 'rounds per minute'],

        /* luminosity */
        '<candela>'     : ['cd','candela','candelas'],

        /* power */
        '<watt>'        : ['W','watt','watts','Watt','Watts'],
        '<horsepower>'  : ['hp','horsepower','horsepower','Horsepower'],
        /* other */
        '<%>'           : ['%','percent','percents'],
    };
    var DEFAULT_FORMAT_OPTIONS = {
        thousands: ',',
        decimal: '.',
        divideShort:'/',
        divideLong: ' per ',
        multiplyShort: '*',
        multiplyLong: ' ',
        default: '0,0[.]00u'
    };
    var LOCALES = {
        en: {
            units: __.clone(DEFAULT_TRANSLATIONS),
            format: __.clone(DEFAULT_FORMAT_OPTIONS)
        }
    };
    var CURRENT_LOCALE = 'en';
    Qty.defineLocale  = function (key, values) {
        if (!__.isString(key) || !__.isObject(values)){
            throw new Error('bad arguments');
        }

        if (LOCALES[key]){
            // extend existing locale with given config
            _.extend(LOCALES[key].units, values.units || {});
            _.extend(LOCALES[key].format, values.format || {});
        }
        else {
            // create new locale from default
            LOCALES[key] = {
                units: __.extend({}, DEFAULT_TRANSLATIONS, values.units || {}),
                format: __.extend({}, DEFAULT_FORMAT_OPTIONS, values.format || {})
            };
            return LOCALES[key];
        }
    };
    Qty.locale = function(key){
        if (!key){ // locale getter
            return CURRENT_LOCALE;
        }
        else {
            if (!LOCALES[key]){
                throw new Error(stringFormat('Unknown language "{0}"', key));
            }
            CURRENT_LOCALE = key;
            resetRegexes();
            return LOCALES[key];
        }
    };

    // ---------------------------

    resetRegexes();

    /**** Exposing Qty             ****/

    // CommonJS module is defined
    if (__hasModule) {
        module.exports = Qty;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.Qty = Qty;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Qty;
        });
    }
}).call(this);