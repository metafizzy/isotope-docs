
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('bower_components/isotope/js/isotope.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Isotope', 'Isotope PACKAGED' );
  })();

  grunt.initConfig({

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    concat: {
      js: {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/isotope-docs.js'
      },
      pkgd: {
        // src will be set in package-sources task
        dest: 'build/isotope.pkgd.js',
        options: {
          banner: banner
        }
      },
      css: {
        src: [ 'bower_components/normalize-css/normalize.css', 'css/*.css', '!css/isotope-docs.css' ],
        dest: 'build/css/isotope-docs.css'
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
      js: {
        files: {
          // 'build/js/isotope-site.min.js' will be set in bower-list-map
        }
      }
    },

    // ----- handlebars templating ----- //
    hbarz: {
      docs: {
        files: {
          'build/': 'content/*'
        },
        options: {
          templates: 'templates/*.mustache',
          defaultTemplate: 'page',
          dataFiles: "data/*.json"
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
        src: [ 'components/jquery/jquery.min.js' ],
        dest: 'build/'
      }
    },


    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'bower-list-map', 'hbarz' ]
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
  // load all tasks in tasks/
  grunt.loadTasks('tasks/');

  grunt.registerTask( 'default', [
    'jshint',
    'bower-list-map',
    'package-sources',
    'concat',
    'uglify',
    'hbarz',
    'copy'
  ]);

};
