// hacking gulp-build
// https://github.com/tjeastmond/gulp-build/blob/master/index.js

var through2 = require('through2');
var hbs = require('handlebars');
var path = require('path');

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

module.exports = function(data, config) {
  var options = extend({
    layout: null,
    partials: {},
    helpers: {},
    rootPathBase: ''
  }, config );

  data = data || {};

  var build = function(file, encoding, callback) {
    // register helpers
    for ( var helperName in options.helpers ) {
      var helper = options.helpers[ helperName ];
      hbs.registerHelper( helperName, helper );
    }
    // register partials
    for ( var partialName in options.partials ) {
      var partial = options.partials[ partialName ];
      hbs.registerPartial( partialName, partial );
    }

    var fileContents = file.contents.toString();
    var template = '';
    if ( typeof options.layout == 'string' ) {
      hbs.registerPartial( 'body', fileContents );
      template = hbs.compile( options.layout );
    } else {
      template = hbs.compile( fileContents );
    }

    // add file data, front matter data to data obj
    data.page = file.frontMatter;
    data.file_path = path.relative( file.cwd, file.path );
    data.root_path = path.relative( file.path, file.cwd + options.rootPathBase )
      .replace( /\.\.$/, '' );
    data.basename = path.basename( file.path, path.extname( file.path ) );

    file.contents = new Buffer( template( data ) );

    return callback( null, file );
  };

  return through2.obj( build );
};
