/**
 * imagesloaded-progress
 */

IsotopeDocs['imagesloaded-progress'] = function( elem ) {
  'use strict';

  // init Isotope
  var $grid = $( elem ).isotope({
    itemSelector: '.grid-image-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });

};
