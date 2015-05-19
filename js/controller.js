/*!
 * Masonry Docs site scripts
 */

( function( window, $ ) {

'use strict';

// global namespace, MD = Isotope Docs
var ID = window.ID = {};
// hash of page controllers
// ID.pages = {};
// hash of modules
ID.modules = {};
var notifElem;

var getSize = window.getSize;

// make $().isotope() plugin
var Isotope = window.Isotope;
$.bridget( 'isotope', Isotope );

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

// -------------------------- page controller -------------------------- //

docReady( function() {
  // get some elements
  notifElem = document.querySelector('#notification');

  $('.js-radio-button-group').radioButtonGroup();

  // get name of page
  var pageAttr = document.body.getAttribute('data-page');
  // trigger controller if there
  if ( pageAttr && typeof ID[ pageAttr ] === 'function' ) {
    ID[ pageAttr ]();
  }

  // init stick page nav

  // get conditional class http://adactio.com/journal/5429/
  var head = document.querySelector('head');
  var condClass = getStyle( head ).fontFamily.replace( /['"]/g, '');
  if ( condClass === 'desktop-ish' || condClass === 'tablet-ish' ) {
    stickifyPageNav();
  }

  // init module instance for all elements with data-module attributes
  $('[data-js-module]').each( function( i, elem ) {
    var moduleName = elem.getAttribute('data-js-module');
    var module = ID.modules[ moduleName ];
    if ( module ) {
      module( elem );
    }
  });

});

// -------------------------- helpers -------------------------- //

ID.getSomeItemElements = function() {
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 3; i++ ) {
    var item = document.createElement('div');
    var wRand = Math.random();
    var widthClass = wRand > 0.85 ? 'w4' :
      wRand > 0.7 ? 'w2' : '';
    var hRand = Math.random();
    var heightClass = hRand > 0.85 ? 'h4' :
      hRand > 0.7 ? 'h2' : '';
    item.className = 'item ' + widthClass + ' ' + heightClass;
    fragment.appendChild( item );
    items.push( item );
  }
};

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

// ----- text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -------------------------- notify -------------------------- //

var transitionProp = getStyleProperty('transition');

var notifyTimeout;
var hideTime = transitionProp ? 1000 : 1500;

ID.notify = function( message ) {
  setText( notifElem, message + ' at ' + getTimestamp() );

  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'none';
  }
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  // hide the notification after a second
  if ( notifyTimeout ) {
    clearTimeout( notifyTimeout );
  }

  notifyTimeout = setTimeout( ID.hideNotify, hideTime );
};

function getTimestamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

ID.hideNotify = function() {
  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'opacity 1.0s';
    notifElem.style.opacity = '0';
  } else {
    notifElem.style.display = 'none';
  }
};

// -------------------------- radioButtonGroup -------------------------- //

// add is-checked classes to labels
$.fn.radioButtonGroup = function() {
  this.each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.find(':checked').parent().addClass('is-checked');
    $buttonGroup.on( 'click', 'input, button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      var $this = $( this );
      var $clickedButton = $this.hasClass('button') ? $this :
        $this.parents('.button');
      $clickedButton.addClass('is-checked');
    });
  });
  return this;
};

// -------------------------- displayIsotopeCode -------------------------- //

// disable class prefix on highlight.js
hljs.configure({ classPrefix: '' });

$.fn.displayIsotopeCode = function( key, value ) {
  // add quotes for string value
  value = typeof value === 'string' && value.indexOf('function') === -1 ?
    "'" + value + "'" : value;
  var codeHTML = "$grid.isotope({ " +
    key + ": " + value + " })";
  // syntax highlight
  codeHTML = hljs.highlight( 'js', codeHTML ).value;
  this.html( codeHTML );
};

// -------------------------- stickynav -------------------------- //

function stickifyPageNav() {
  var pageNav = document.querySelector('.page-nav');
  if ( !pageNav ) {
    return;
  }

  var navHeight = getSize( pageNav ).outerHeight;

  // don't proceed if navHeight is bigger than window
  if ( navHeight >= window.innerHeight ) {
    return;
  }

  new Stickeroo( pageNav );

}

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


})( window, jQuery );
