/*!
 * Masonry Docs site scripts
 */

( function( window, $ ) {

'use strict';

// global namespace, MD = Isotope Docs
var ID = window.ID = {};
// hash of page controllers
ID.pages = {};
var notifElem;

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
  // ex7.appendChild( fragment );
  // return
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

ID.notify = function( message, isGonnaHide ) {
  setText( notifElem, message );

  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'none';
  }
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  // hide the notification after a second
  if ( isGonnaHide ) {
    if ( notifyTimeout ) {
      clearTimeout( notifyTimeout );
    }

    notifyTimeout = setTimeout( ID.hideNotify, hideTime );
  }
};

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

})( window, jQuery );
