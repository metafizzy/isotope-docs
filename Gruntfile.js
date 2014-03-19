/*jhint node: true, usued: true, undef: true */

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  grunt.initConfig({
    // ----- global settings ----- //
    namespace: 'isotope',
    dataDir: 'tasks/data',

    // ----- tasks settings ----- //

    jshint: {
      docs: [ 'js/controller.js', 'js/pages/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    concat: {
      'docs-js': {
        src: [
          'js/vendor/*.js',
          // docs js
          'js/controller.js',
          'js/pages/*.js'
        ],
        dest: 'build/js/isotope-docs.js'
      },

      'docs-css': {
        src: [ 'css/*.css', '!css/isotope-docs.css' ],
        dest: 'build/css/isotope-docs.css'
      }

    },

    uglify: {
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
          'build/': 'content/**/*.*'
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
      pkgd: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'bower_components/isotope/dist/', // set cwd, excludes it in build path
            src: [ '*' ],
            dest: 'build/'
          }
        ]
      },
      bowerSources: {
        // additional sources will be set in bower-list-map
        src: [
          'bower_components/jquery/jquery.min.js'
        ],
        dest: 'build/'
      }
    },


    watch: {
      content: {
        files: [ 'content/**/*.*', 'templates/*.mustache' ],
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
  grunt.loadNpmTasks('grunt-fizzy-docs');

  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'jshint',
    'int-bower',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
