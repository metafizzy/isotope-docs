/**
 * page-nav
**/

( function() {
'use strict';

ID.modules['page-nav'] = function( elem ) {

  var navHeight = getSize( elem ).outerHeight;

  // only activate if over 768px window width
  // don't proceed if navHeight is bigger than window
  if ( window.innerWidth < 768 || navHeight >= window.innerHeight ) {
    return;
  }

  new Stickeroo( elem );

};


var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

// -------------------------- Stickeroo -------------------------- //

// sticky elements, like the page nav
function Stickeroo( element ) {
  this.element = element;
  this.originalY = this.element.getBoundingClientRect().top + window.pageYOffset;
  eventie.bind( window, 'scroll', this );
  this.isFixed = false;
  this.onscroll();
}

Stickeroo.prototype.handleEvent = function( event ) {
  var methodName = 'on' + event.type;
  if ( this[ methodName ] ) {
    this[ methodName ]( event );
  }
};


function throttleProto( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    if ( this[ timeoutName ] ) {
      return;
    }

    method.apply( this, arguments );
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, arguments );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
}

Stickeroo.prototype.onscroll = function() {
  var isFixed = window.pageYOffset >= this.originalY;
  if ( isFixed === this.isFixed ) {
    return;
  }

  classie.toggle( this.element, 'is-fixed' );
  this.isFixed = isFixed;
};

throttleProto( Stickeroo, 'onscroll', 50 );

})();
