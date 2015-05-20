var fs = require('fs');
var glob = require('glob');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');

// ----- getGlobPaths ----- //

/**
 * takes glob src and returns expanded paths
 * @param {Array} src
 * @returns {Array} paths
 */
function getGlobPaths( src ) {
  var paths = [];
  // replace all glob paths with expanded paths
  src.forEach( function( filepath ) {
    if ( glob.hasMagic( filepath ) ) {
      var files = glob.sync( filepath );
      // replace glob with paths
      paths = paths.concat( files );
    } else {
      paths.push( filepath );
    }
  });
  return paths;
}

// ----- prod assets ----- //

gulp.task( 'fonts', function() {
  return gulp.src( 'fonts/*.*', { base: '.' } )
    .pipe( gulp.dest('build') );
});

gulp.task( 'assets', function() {
  return gulp.src('assets/**/*.*')
    .pipe( gulp.dest('build') );
});

// copy over bower files for use in CodePens
gulp.task( 'bower-files', function() {
  return gulp.src('bower_components/**/*.js')
    .pipe( gulp.dest('build/bower_components') );
});

// copy prod assets
gulp.task( 'prod-assets', [ 'fonts', 'assets', 'bower-files' ] );

// ----- dist ----- //

// copy isotope dist to build/
gulp.task( 'dist', function() {
  gulp.src( 'bower_components/isotope/dist/*.*' )
    .pipe( gulp.dest('build') );
});

// ----- js ----- //

var jsSrc = [
  // isotope dependencies
  'bower_components/get-style-property/get-style-property.js',
  'bower_components/get-size/get-size.js',
  'bower_components/matches-selector/matches-selector.js',
  'bower_components/eventEmitter/EventEmitter.js',
  'bower_components/eventie/eventie.js',
  'bower_components/doc-ready/doc-ready.js',
  'bower_components/classie/classie.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/jquery-bridget/jquery.bridget.js',
  'bower_components/outlayer/item.js',
  'bower_components/outlayer/outlayer.js',
  // isotope
  'bower_components/isotope/js/layout-mode.js',
  'bower_components/isotope/js/item.js',
  'bower_components/isotope/js/isotope.js',
  'bower_components/isotope/js/layout-modes/fit-rows.js',
  'bower_components/isotope/js/layout-modes/vertical.js',
  // isotope masonry
  'bower_components/masonry/masonry.js',
  'bower_components/isotope/js/layout-modes/masonry.js',
  // layout modes
  'bower_components/isotope-cells-by-column/cells-by-column.js',
  'bower_components/isotope-cells-by-row/cells-by-row.js',
  'bower_components/isotope-fit-columns/fit-columns.js',
  'bower_components/isotope-horizontal/horizontal.js',
  'bower_components/isotope-masonry-horizontal/masonry-horizontal.js',
  // isotope packery
  'bower_components/packery/js/rect.js',
  'bower_components/packery/js/packer.js',
  'bower_components/packery/js/item.js',
  'bower_components/packery/js/packery.js',
  'bower_components/isotope-packery/packery-mode.js',
  // imagesloaded
  'bower_components/imagesloaded/imagesloaded.js',
  // docs
  'js/vendor/*.js',
  'js/controller.js',
  // modules
  'modules/**/*.js'
];


// concat & minify js
gulp.task( 'js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('isotope-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

// ----- hint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src( [ 'js/**/*.js', '!js/vendor/*.js' ] )
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-tasks', function() {
  return gulp.src([ 'gulpfile.js', 'tasks/*.js' ])
    .pipe( jshint() )
    .pipe( jshint.reporter('default') );
});

gulp.task( 'hint', [ 'hint-js', 'hint-tasks' ]);

// ----- css ----- //

var cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // modules
  'modules/**/*.css',
  // docs
  'css/*.css'
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('isotope-docs.css') )
    .pipe( gulp.dest('build/css') );
});

// ----- data ----- //

// add all data/*.json to siteData
// file.json => siteData.file: {json}
var dataSrc = 'data/*.json';

var siteData = {
  // get isotope version from its bower.json
  isotope_version: JSON.parse( fs.readFileSync('bower_components/isotope/bower.json') ).version,
  css_paths: getGlobPaths( cssSrc ),
  js_paths: getGlobPaths( jsSrc )
};

gulp.task( 'data', function() {
  var addJsonData = through2.obj( function( file, enc, callback ) {
    var basename = path.basename( file.path, path.extname( file.path ) );
    siteData[ basename ] = JSON.parse( file.contents.toString() );
    this.push( file );
    callback();
  });

  return gulp.src( dataSrc )
    .pipe( addJsonData );
});


// ----- content ----- //

var contentSrc = [
  'content/**/*.html',
  'content/**/*.mustache'
];
var highlightCodeBlock = require('./tasks/highlight-code-block');
var build = require('./tasks/build');
var frontMatter = require('gulp-front-matter');
// var gulpFilter = require('gulp-filter');
var path = require('path');
var through2 = require('through2');

var partialsSrc = [
  'templates/partials/*.*',
  'modules/**/*.mustache'
];
var partials = {};

gulp.task( 'partials', function() {
  var addPartial = through2.obj( function( file, enc, callback ) {
    var partialName = path.basename( file.path, path.extname( file.path ) );
    partials[ partialName ] = file.contents.toString();
    this.push( file );
    callback();
  });

  return gulp.src( partialsSrc )
    .pipe( addPartial );
});

// ----- buildContent ----- //

var rename = require('gulp-rename');
var pageNav = require('./tasks/page-nav');
var gulpFilter = require('gulp-filter');

var pageTemplateSrc = 'templates/page.mustache';

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// handlebar helpers
var helpers = {
  firstValue: function( ary ) {
    return ary[0];
  },
  plusOne: function( str ) {
    return parseInt( str, 10 ) + 1;
  },
  slug: function( str ) {
    return str.replace( /[^\w\d]+/gi, '-' ).toLowerCase();
  }
};

function buildContent( dataOptions ) {
  dataOptions = dataOptions || {};
  var pageTemplate = fs.readFileSync( pageTemplateSrc, 'utf8' );
  // exclude 404 if export
  var filterQuery = dataOptions.is_export ? [ '**/*', '!**/404.*'] : '**/*';

  // gulp task
  return function() {
    var data = extend( siteData, dataOptions );
    data.source_url_path = data.is_export ? '' :
      'http://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/' + data.isotope_version + '/';
    var filter = gulpFilter( filterQuery );

    var buildOptions = {
      layout: pageTemplate,
      partials: partials,
      helpers: helpers,
      rootPathBase: '/content/'
    };

    gulp.src( contentSrc )
      .pipe( filter )
      .pipe( frontMatter({
        property: 'frontMatter',
        remove: true
      }) )
      .pipe( build( data, buildOptions ) )
      .pipe( highlightCodeBlock() )
      .pipe( pageNav() )
      .pipe( rename({ extname: '.html' }) )
      .pipe( gulp.dest('build') );
  };
}

var dependencyTasks = [ 'partials', 'data' ];

gulp.task( 'content', dependencyTasks, buildContent() );

gulp.task( 'content-dev', dependencyTasks, buildContent({ is_dev: true }) );

gulp.task( 'content-export', dependencyTasks, buildContent({ is_export: true }) );

// ----- default ----- //

gulp.task( 'default', [
  'hint',
  'content',
  'js',
  'css',
  'dist',
  'prod-assets'
] );

// ----- dev ----- //

gulp.task( 'dev', [
  'hint',
  'content-dev'
] );

// ----- export ----- //

// version of site used in isotope-docs.zip

gulp.task( 'export', [
  'hint',
  'content-export',
  'js',
  'css',
  'dist'
] );

// ----- watch ----- //

gulp.task( 'watch', [ 'default' ], function() {
  gulp.watch( contentSrc, [ 'content' ] );
  gulp.watch( partialsSrc, [ 'content' ] );
  gulp.watch( pageTemplateSrc, [ 'content' ] );
  gulp.watch( dataSrc, [ 'content' ] );
  gulp.watch( 'css/*.css', [ 'css' ] );
});


gulp.task( 'watch-dev', [ 'dev' ], function() {
  gulp.watch( contentSrc, [ 'content-dev' ] );
  gulp.watch( partialsSrc, [ 'content-dev' ] );
  gulp.watch( pageTemplateSrc, [ 'content-dev' ] );
  gulp.watch( dataSrc, [ 'content-dev' ] );
});
