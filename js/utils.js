( function( window ) {
'use strict';

// ----- filterBindEvent ----- //

// adds event listener and filters for selector
window.filterBindEvent = function( elem, eventName, selector, listener ) {
  elem.addEventListener( eventName, function( event ) {
    if ( matchesSelector( event.target, selector ) ) {
      listener.call( event.target, event );
    }
  });
};

// --------------------------  -------------------------- //

// disable class prefix on highlight.js
hljs.configure({ classPrefix: '' });

window.displayIsotopeCode = function( elem, key, value ) {
  // add quotes for string value
  value = typeof value === 'string' && value.indexOf('function') === -1 ?
    "'" + value + "'" : value;
  var codeHTML = "$grid.isotope({ " +
    key + ": " + value + " })";
  // syntax highlight
  codeHTML = hljs.highlight( 'js', codeHTML ).value;
  elem.innerHTML = codeHTML;
};

})( window );
