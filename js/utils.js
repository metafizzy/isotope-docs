( function() {
'use strict';

// -------------------------- helpers -------------------------- //

ID.getItemElement = function() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.8 ? 'grid-item--width3' :
    wRand > 0.6 ? 'grid-item--width2' : '';
  var heightClass = hRand > 0.8 ? 'grid-item--height3' :
    hRand > 0.5 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
  return elem;
};

// -------------------------- displayIsotopeCode -------------------------- //

// disable class prefix on highlight.js
hljs.configure({ classPrefix: '' });

$.fn.displayIsotopeCode = function( key, value ) {
  // add quotes for string value
  value = typeof value === 'string' && value.indexOf('function') === -1 ?
    "'" + value + "'" : value;
  var codeHTML = "$grid.isotope({ " + key + ": " + value + " })";
  // syntax highlight
  codeHTML = hljs.highlight( 'js', codeHTML ).value;
  this.html( codeHTML );
};

})();
