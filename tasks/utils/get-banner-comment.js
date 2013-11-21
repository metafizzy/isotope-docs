/**
 * get the banner comment from isotope.js
 */

module.exports = function( grunt ) {
  var src = grunt.file.read('bower_components/isotope/js/isotope.js');
  var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
  var matches = src.match( re );
  var banner = matches[0].replace( 'Isotope', 'Isotope PACKAGED' );
  return banner;
};
