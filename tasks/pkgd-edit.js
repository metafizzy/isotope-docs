// additional edits to isotope.pkgd.js to make RequireJS work
module.exports = function( grunt ) {
  grunt.registerTask( 'pkgd-edit', function() {
    var outFile = grunt.config.get('requirejs.pkgd.options.out');
    var contents = grunt.file.read( outFile );
    // get requireJS definition code
    var definitionRE = /define\(\s*'isotope\/js\/isotope'(.|\n)+isotopeDefinition\s*\)/;
    var definition = contents.match( definitionRE )[0];
    // remove name module
    var fixDefinition = definition.replace( "'isotope/js/isotope',", '' )
      // ./item -> isotope/js/item
      .replace( /'.\//g, "'isotope/js/" );
    contents = contents.replace( definition, fixDefinition );
    grunt.file.write( outFile, contents );
    grunt.log.writeln( 'Edited ' + outFile );
  });
};
