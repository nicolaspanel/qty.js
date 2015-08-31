'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        simplemocha: {
            options: {
                reporter: 'spec',
                timeout: '5000'
            },
            full: {
                src: ['test/mocha/**/*.spec.js']
            },
            short: {
                options: {
                    reporter: 'dot'
                },
                src: ['test/**/*.spec.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'test/**/*.js',
                'locale/**/*.js',
                '*.js',
                '!*.min.js'
            ]
        },
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %>#<%= pkg.version %> */\n'
                },
                files: {
                    'min/qty.min.js': 'qty.js',
                    'min/angular-qty.min.js': 'angular-qty.js',
                    'min/locale/fr.min.js': 'locale/fr.js'
                }
            }
        },
        copy: {
            tag: {
                files: [
                    { src: 'README.md',      dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'package.json',   dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'bower.json',     dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'qty.js',         dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'angular-qty.js', dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'locale/*.js',    dest: '../tags/v<%= pkg.version %>/', expand: true },
                    { src: 'min/**/*.js',    dest: '../tags/v<%= pkg.version %>/', expand: true }
                ]
            }
        },
        karma: {
            options: {
                frameworks: ['jasmine'],
                reporters: ['dots'],
                // web server port
                port: 9876,
                colors: true,
                logLevel: 'WARN',
                autoWatch: false,
                browsers: ['PhantomJS'],
                singleRun: true
            },
            min: {
                options: {
                    files: [
                        'bower_components/underscore/underscore.js',
                        'bower_components/angular/angular.js',
                        // tested files
                        'min/qty.min.js',
                        'min/angular-qty.min.js',
                        'min/locale/*.min.js',
                        // test lib
                        'bower_components/angular-mocks/angular-mocks.js',
                        //tests files
                        'test/karma/**/*.spec.js'
                    ]
                }
            },
            underscore: {
                options: {
                    files: [
                        'bower_components/underscore/underscore.js',
                        'bower_components/angular/angular.js',
                        'qty.js',
                        'angular-qty.js',
                        'locale/*.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'test/karma/**/*.spec.js'
                    ]
                }
            },
            lodash: {
                options: {
                    files: [
                        'bower_components/lodash/lodash.js',
                        'bower_components/angular/angular.js',
                        'qty.js',
                        'angular-qty.js',
                        'locale/*.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'test/karma/**/*.spec.js'
                    ]
                }
            }
        },
        exec: {
            coveralls: {
                command: 'STRICT_REQUIRE=1 node node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R dot test/mocha/**/*.spec.js && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls && rm -rf ./coverage'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('test', ['jshint', 'simplemocha:full', 'karma:underscore', 'karma:lodash', 'uglify', 'karma:min']);
    grunt.registerTask('travis', ['test', 'exec:coveralls']);
    grunt.registerTask('default', 'watch');
};