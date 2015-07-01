/**
 * layout-complete-demo
 */

ID.modules['layout-complete-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  // bind listener
  $grid.on( 'layoutComplete', function( event, laidOutItems ) {
    ID.notify( 'Isotope layout completed on ' + laidOutItems.length + ' items' );
  });

  $grid.on( 'click', '.grid-item', function() {
    // change size of item via class
    $( this ).toggleClass('grid-item--gigante');
    $grid.isotope('layout');
  });

};