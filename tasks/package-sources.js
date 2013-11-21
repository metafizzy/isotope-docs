/**
 * package sources
 * creates isotope.pkgd.js
 * built with RequireJS
 */

var requirejs = require('requirejs');
var getBannerComment = require('./utils/get-banner-comment.js');

var config = {
  baseUrl: 'bower_components',
  include: [
    "isotope/js/isotope",
    'isotope/js/layout-modes/masonry',
    'isotope/js/layout-modes/fit-rows',
    'isotope/js/layout-modes/cells-by-row',
    'isotope/js/layout-modes/vertical'
  ],
  out: 'build/isotope.pkgd.js',
  optimize: 'none',
  wrap: {}
};

module.exports = function( grunt ) {
  // get banner comment at top of package file
  config.wrap.start = getBannerComment( grunt );

  // create isotope.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    var done = this.async();
    requirejs.optimize( config, function() {
      done();
    }, function( err ) {
      grunt.log( err );
      done();
    });
  });

};
