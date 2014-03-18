/**
 * appendix page
 */

( function( window ) {

'use strict';

var ID = window.ID;

var transitionProp = getStyleProperty('transition');
var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProp ];

// -------------------------- appendix -------------------------- //

ID.appendix = function() {

  // ----- animate item size ----- //

  ( function() {
    var $container = $('#animate-item-size .isotope').isotope({
      masonry: {
        columnWidth: 60
      }
    });
  
    $container.on( 'click', '.item', function() {
      $(this).toggleClass('is-expanded');
      $container.isotope('layout');
    });
  
  })();

  // ----- animate item size responsive ----- //

  ( function() {

    var $container = $('#animate-item-size-responsive .isotope').isotope({
      itemSelector: '.item',
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $container.on( 'click', '.item-content', function() {
      var target = this;
      var previousContentSize = getSize( target );
      // disable transition
      target.style[ transitionProp ] = 'none';
      // set current size
      target.style.width = previousContentSize.width + 'px';
      target.style.height = previousContentSize.height + 'px';

      var itemElem = target.parentNode;
      classie.toggleClass( itemElem, 'is-expanded' );

      // force redraw
      var redraw = target.offsetWidth;
      // renable default transition
      target.style[ transitionProp ] = '';

      // reset 100%/100% sizing after transition end
      if ( transitionProp ) {
        var onTransitionEnd = function() {
          target.style.width = '';
          target.style.height = '';
          target.removeEventListener( transitionEndEvent, onTransitionEnd, false );
        };
        target.addEventListener( transitionEndEvent, onTransitionEnd, false );
      }

      // set new size
      var size = getSize( itemElem );
      target.style.width = size.width + 'px';
      target.style.height = size.height + 'px';
      redraw = null; // for JSHint

      $container.isotope('layout');
    });

  })();

};

})( window );
