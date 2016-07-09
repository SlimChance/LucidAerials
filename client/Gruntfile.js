'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        lucid: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= lucid.app %>/scripts/{,*/}*.js'],
                tasks: ['browserify:server'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= lucid.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= lucid.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= lucid.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= lucid.dist %>'
                }
            }
        },

        // babel: {
        //     options: {
        //       sourceMap: true,
        //       compact: false
        //     },
        //     dist: {
        //       files: {
        //         '<%= lucid.dist %>/scripts/scripts.js': '<%= lucid.dist %>/scripts/scripts.js'
        //       }
        //     },
        //     server: {
        //         files: {
        //             src: '<%= lucid.app %>/scripts/**/*.js'
        //         }
        //     }
        // },

        browserify: {
            options: {
                noParse: ['jquery'],
                cache: true,
                detectGlobals: true,
                insertGlobals: true
            },
            server: {
                src: '<%= lucid.app %>/scripts/app.js',
                dest: '.tmp/scripts/scripts.js'
            },
            dist: {
                src: '<%= lucid.app %>/scripts/app.js',
                dest: '.tmp/scripts/scripts.js'
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= lucid.dist %>/{,*/}*',
                        '!<%= lucid.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= lucid.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            sass: {
                src: ['<%= lucid.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= lucid.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= lucid.app %>/images',
                javascriptsDir: '<%= lucid.app %>/scripts',
                fontsDir: '<%= lucid.app %>/styles/fonts',
                importPath: './bower_components', // need node???
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= lucid.dist %>/images/generated' // need to transfer css???
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= lucid.dist %>/scripts/{,*/}*.js',
                    '<%= lucid.dist %>/styles/{,*/}*.css',
                    '<%= lucid.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= lucid.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        // useminPrepare: {
        //     html: '<%= lucid.app %>/index.html',
        //     options: {
        //         dest: '<%= lucid.dist %>',
        //         flow: {
        //             html: {
        //                 steps: {
        //                     js: [],
        //                     css: ['cssmin']
        //                 },
        //                 post: {}
        //             }
        //         }
        //     }
        // },

        // Performs rewrites based on filerev and the useminPrepare configuration
        // usemin: {
        //     html: ['<%= lucid.dist %>/{,*/}*.html'],
        //     css: ['<%= lucid.dist %>/styles/{,*/}*.css'],
        //     options: {
        //         assetsDirs: ['<%= lucid.dist %>', '<%= lucid.dist %>/images']
        //     }
        // },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= lucid.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },

        uglify: {
          dist: {
            files: {
              src: '.tmp/scripts/scripts.js',
              dest: '.tmp/scripts/scripts.js'
            }
          }
        },

        concat: {
          dist: {
            src: '<%= lucid.dist %>/scripts/scripts.js',
            dest: '<%= lucid.dist %>/scripts/scripts.js'
          }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= lucid.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= lucid.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= lucid.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= lucid.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= lucid.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= lucid.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        /* ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        }, */

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= lucid.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= lucid.app %>',
                    dest: '<%= lucid.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'images/{,*/}*.{webp}',
                        'fonts/{,*/}*.*',
                        'data/'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= lucid.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= lucid.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= lucid.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            scripts: {
                src: '.tmp/scripts/scripts.js',
                dest: '<%= lucid.dist %>/scripts/scripts.js'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            // dist: [
            //     'compass:dist',
            //     //'imagemin:dist',
            //     //'svgmin'
            // ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        // if (target === 'dist') {
        //     return grunt.task.run(['build', 'connect:dist:keepalive']);
        // }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'browserify:server',
            'connect:livereload',
            'watch'
        ]);
    });

    // grunt.registerTask('test', [
    //     'clean:server',
    //     'concurrent:test',
    //     'autoprefixer',
    //     'connect:test',
    //     'karma'
    // ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'autoprefixer',
        'browserify:dist',
        'uglify:dist',
        'copy:scripts',
        'copy:dist',
        'cssmin',
        'filerev',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
