/**
 * Created by aaronrussell on 1/1/16.
 */


'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                // the files to concatenate
                src: ['app/scripts/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/{,*/}*',
                        '!dist/.git{,*/}*'
                    ]
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
