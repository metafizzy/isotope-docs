/**
 * remove-complete
 */

IsotopeDocs['remove-complete'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  // bind listener
  $grid.on( 'removeComplete', function( event, removedItems ) {
    IsotopeDocs.notify( 'Removed ' + removedItems.length + ' items' );
  });

  $grid.on( 'click', '.grid-item', function() {
    // remove clicked element
    $grid.isotope( 'remove', this )
      // layout remaining item elements
      .isotope('layout');
  });

};
