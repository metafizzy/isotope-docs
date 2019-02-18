/**
 * arrange-complete
 */

IsotopeDocs['arrange-complete'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  // bind listener
  $grid.on( 'arrangeComplete', function( event, filteredItems ) {
    IsotopeDocs.notify( 'Isotope arrange completed on ' + filteredItems.length + ' items' );
  });

  $demo.find('.button-group').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

};