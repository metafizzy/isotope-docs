var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // isotope dependencies
  'bower_components/get-size/get-size.js',
  'bower_components/desandro-matches-selector/matches-selector.js',
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/fizzy-ui-utils/utils.js',
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
  'js/utils.js',
  'js/controller.js',
  // modules
  'modules/**/*.js'
];

// concat & minify js
gulp.task( 'docs-js', function() {
  gulp.src( jsSrc )
    .pipe( uglify() )
    .pipe( concat('isotope-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'js', [ 'docs-js' ] );

module.exports = function( site ) {

  site.data.js_paths = getGlobPaths( jsSrc );

};
