/**
 * layout-demo
 */

ID.modules['layout-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  // change size of item by toggling gigante class
  $grid.on( 'click', '.grid-item', function() {
    $(this).toggleClass('grid-item--gigante');
    $grid.isotope('layout');
  });

};
