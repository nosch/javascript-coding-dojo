/**
 * Grunt task runner configuration
 */

module.exports = function (grunt) {
    'use strict';

    /**
     * Load all required Grunt plugins listed in package.json.
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * Display the elapsed execution time of all tasks.
     */
    require('time-grunt')(grunt);

   /**
    * Register custom tasks.
    */
    grunt.registerTask('default', [
        'kata'
    ]);

    grunt.registerTask('kata', [
        'jshint',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'karma:watch'
    ]);

    grunt.registerTask('test-run', [
        'karma:run'
    ]);

    grunt.registerTask('analyze', [
        'plato:dev'
    ]);

   /**
    * Configure tasks.
    */
    grunt.initConfig({
        // get npm config
        pkg: grunt.file.readJSON('package.json'),

        /**
         * JS linter "JSHint" tasks.
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true
            },
            common: [
                'src/**/*.js',
                'test/**/*.js',
                'Gruntfile.js'
            ]
        },

        /**
         * JS test runner "karma" tasks.
         */
        karma: {
            watch: {
                configFile: 'test/config/karma.unit.conf.js',
                browsers: ['PhantomJS'],
                autoWatch: true,
                singleRun: false
            },
            run: {
                configFile: 'test/config/karma.unit.conf.js',
                browsers: ['PhantomJS'],
                autoWatch: false,
                singleRun: true
            }
        },

        /**
         * Connect tasks.
         */
        connect: {
            common: {
                options: {
                    base: 'src/',
                    open: true,
                    hostname: 'localhost',
                    port: 6789,
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },

        /**
         * Watch tasks.
         */
        watch: {
            common: {
                options: {
                    livereload: true,
                    spawn: false,
                    interrupt: true
                },
                files: [
                    'src/**/*.js',
                    'src/**/*.html',
                    'test/**/*.js',
                    'Gruntfile.js'
                ],
                tasks: [
                    'jshint'
                ]
            }
        },

        /**
         * Plato task
         */
        plato: {
            dev: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'reports': [
                        'src/**/*.js',
                        'test/unit/**/*.js'
                    ]
                }
            }
        }
    });
};
