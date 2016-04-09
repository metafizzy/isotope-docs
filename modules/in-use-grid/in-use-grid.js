/**
 * in-use-grid
 */

ID.modules['in-use-grid'] = function( elem ) {
  'use strict';

  var $grid = $(elem);
  // hide items by default
  $grid.find('.in-use-grid__item').hide();

  $grid.isotope({
    // select none
    itemSelector: 'none',
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    }
  });

  // now select items
  $grid.isotope( 'option', { itemSelector: '.in-use-grid__item' } );

  $grid.imagesLoaded().progress( function( imgLoad, image ) {
    var $item = $( image.img ).parents( '.in-use-grid__item' );
    // un-hide item
    $item.show();
    // isotope does its thing
    $grid.isotope( 'appended', $item );
  });

};
