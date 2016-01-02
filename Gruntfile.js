/**
 * Created by aaronrussell on 1/1/16.
 */


'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    var dependencies = [];

    var bower = grunt.file.readJSON('bower.json');

    for (var key in bower.devDependencies) {
        if (bower.devDependencies.hasOwnProperty(key)) {
            dependencies.push('bower_components/' + key + '/dist/' + key + '.js');
        }
    }

    grunt.initConfig({

        pkg: bower,

        concat: {
            libs: {
                src: 'src/lib/**/*.js',
                dest: 'dist/<%= pkg.name %>-libs.js'
            },
            depends: {
                src: dependencies,
                dest: 'dist/<%= pkg.name %>-dependencies.js'
            },
            dist: {
                src: 'src/scripts/**/*.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.depends.dest %>', '<%= concat.libs.dest %>', '<%= concat.dist.dest %>']
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
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
}
;
