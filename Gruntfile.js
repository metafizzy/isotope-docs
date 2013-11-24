
var getBannerComment = require('./tasks/utils/get-banner-comment.js');

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var banner = getBannerComment( grunt );

  grunt.initConfig({
    // ----- global settings ----- //
    namespace: 'isotope',
    dataDir: 'tasks/data',

    // ----- tasks settings ----- //

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            'isotope/js/isotope',
            'isotope/js/layout-modes/masonry',
            'isotope/js/layout-modes/fit-rows',
            'isotope/js/layout-modes/cells-by-row',
            'isotope/js/layout-modes/vertical'
          ],
          out: 'isotope.require.js',
          optimize: 'none'
        }
      }
    },

    concat: {
      'docs-js': {
        src: [
          // additional layout modes
          'bower_components/isotope/js/layout-modes/masonry-horizontal.js',
          'bower_components/isotope/js/layout-modes/fit-columns.js',
          'bower_components/isotope/js/layout-modes/cells-by-column.js',
          'bower_components/isotope/js/layout-modes/horizontal.js',
          // docs js
          'js/controller.js',
          'js/pages/*.js'
        ],
        dest: 'build/js/isotope-docs.js'
      },

      'docs-css': {
        src: [ 'css/*.css', '!css/isotope-docs.css' ],
        dest: 'build/css/isotope-docs.css'
      },

      pkgd: {
        src: [
          'bower_components/jquery-bridget/jquery.bridget.js',
          'isotope.require.js'
        ],
        dest: 'build/isotope.pkgd.js',
        options: {
          banner: banner
        }
      }
    },

    uglify: {
      pkgd: {
        files: {
          'build/isotope.pkgd.min.js': [ 'build/isotope.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      },
      'docs': {
        files: {
          'build/js/isotope-docs.min.js': [ 'build/js/isotope-docs.js' ]
        }
      }
    },

    // ----- handlebars templating ----- //
    template: {
      docs: {
        files: {
          'build/': 'content/*'
        },
        options: {
          templates: 'templates/*.mustache',
          defaultTemplate: 'page',
          dataFiles: "data/*.json",
          partialFiles: {
            'submitting-issues': 'bower_components/isotope/CONTRIBUTING.mdown'
          },
          helpers: {
            firstValue: function( ary ) {
              return ary[0];
            },
            plusOne: function( str ) {
              return parseInt( str, 10 ) + 1;
            }
          }
        }
      }
    },

    // ----- copy ----- //
    copy: {
      "public": {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'public/', // set cwd, excludes it in build path
            src: [ '**', '!.htaccess' ],
            dest: 'build/'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'css/', // set cwd, excludes it in build path
            src: [ '*' ],
            dest: 'build/css/'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'js/', // set cwd, excludes it in build path
            src: [ '**' ],
            dest: 'build/js/'
          }
        ]
      },
      bowerSources: {
        // additional sources will be set in bower-list-map
        src: [
          'bower_components/jquery/jquery.min.js',
          'bower_components/isotope/js/layout-modes/masonry-horizontal.js',
          'bower_components/isotope/js/layout-modes/fit-columns.js',
          'bower_components/isotope/js/layout-modes/cells-by-column.js',
          'bower_components/isotope/js/layout-modes/horizontal.js'
        ],
        dest: 'build/'
      }
    },


    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'template' ]
      },
      "public": {
        files: [ 'public/**' ],
        tasks: [ 'copy:public' ]
      },
      css: {
        files: [ 'css/*' ],
        tasks: [ 'copy:css' ]
      },
      js: {
        files: [ 'js/**' ],
        tasks: [ 'copy:js' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-fizzy-docs');

  grunt.registerTask( 'default', [
    'jshint',
    'requirejs',
    'int-bower',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
