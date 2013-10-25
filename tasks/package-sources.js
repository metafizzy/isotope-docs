/**
 * package sources
 * creates isotope.pkgd.js
 * concats and minifies all .js for Masonry
 */

var organizeSources = require('./utils/organize-sources');

module.exports = function( grunt ) {

  // create isotope.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    // copy over just the isotope obj
    var bowerMap = grunt.config.get('bowerMap');

    var isotopeSources = organizeSources( bowerMap, 'isotope' );
    // console.log( isotopeSources );
    var srcs = isotopeSources['.js'];
    // filter out minified files, like EventEmitter.min.js
    srcs = srcs.filter( function( src ) {
      return src.indexOf('.min.js') === -1;
    });
    grunt.config.set( 'concat.pkgd.src', srcs );
  });

};
