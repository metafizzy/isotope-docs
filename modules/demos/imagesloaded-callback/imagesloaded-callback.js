/**
 * imagesloaded-callback
 */

IsotopeDocs['imagesloaded-callback'] = function( elem ) {
  'use strict';

  var $grid = $( elem ).imagesLoaded( function() {
    // init Isotope after all images have loaded
    $grid.isotope({
      itemSelector: '.grid-image-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
  });

};
