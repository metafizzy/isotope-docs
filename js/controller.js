/*!
 * Masonry Docs site scripts
 */

( function( window, $ ) {

'use strict';

// global namespace, MD = Isotope Docs
var ID = window.ID = {};
// hash of modules
ID.modules = {};
var notifElem;

// -------------------------- page controller -------------------------- //

docReady( function() {
  // get some elements
  notifElem = document.querySelector('#notification');

  $('.js-radio-button-group').radioButtonGroup();

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

})( window, jQuery );
