var gulp = require('gulp');
var getTransform = require('./utils/get-transform');
var path = require('path');

var dataSrc = 'data/*.json';

module.exports = function( site ) {

  gulp.task( 'json-data', function() {
    return gulp.src( dataSrc )
      .pipe( getTransform( function( file, enc, next ) {
        var basename = path.basename( file.path, path.extname( file.path ) );
        site.data[ basename ] = JSON.parse( file.contents.toString() );
        next( null, file );
      }) );
  });

  gulp.task( 'isotope-version', function() {
    return gulp.src('bower_components/isotope/.bower.json')
      .pipe( getTransform( function( file, enc, next ) {
        // site.data.isotopeVersion = '3.0.0';
        // site.data.isotopeMinorVersion = '3.0';
        var json = JSON.parse( file.contents.toString() );
        site.data.isotopeVersion = json.version;
        site.data.isotopeMinorVersion = json.version.match(/^\d\.\d+/)[0];
        next( null, file );
      }));
  });

  gulp.task( 'data', [ 'json-data', 'isotope-version' ] );

  site.watch( dataSrc, [ 'content' ] );

};
