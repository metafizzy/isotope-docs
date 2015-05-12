/**
 * methods page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.index = function() {

  // ----- in use ----- //

  ( function() {

    var $container = $('#in-use-container');
    // hide by default
    $container.find('.in-use-item').hide();

    $container.isotope({
      // select none
      itemSelector: 'none',
      masonry: {
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer'
      }
    });

    $container.isotope( 'option', { itemSelector: '.in-use-item' } );

    $container.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $( image.img ).parents( '.in-use-item' );
      // un-hide item
      $item.show();
      // masonry does its thing
      $container.isotope( 'appended', $item );
    });
  })();

};

})( window, jQuery );