/**
 * in-use-grid
 */

ID.modules['in-use-grid'] = function( elem ) {
  'use strict';

  // hide items by default
  var items = elem.querySelectorAll('.in-use-grid__item');
  for ( var i=0; i < items.length; i++ ) {
    items[i].style.display = 'none';
  }

  var iso = new Isotope( elem, {
    // select none
    itemSelector: 'none',
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    }
  });

  // now select items
  iso.option({ itemSelector: '.in-use-grid__item' });

  imagesLoaded( elem ).on( 'progress', function( imgLoad, image ) {
    // un-hide item
    var item = image.img.parentNode;
    image.img.parentNode.style.display = 'block';
    // isotope does its thing
    iso.appended( item );
  });

};
