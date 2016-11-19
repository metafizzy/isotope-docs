/**
 * remove
 */

IsotopeDocs['remove'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  $grid.on( 'click', '.grid-item', function() {
    // remove clicked element
    $grid.isotope( 'remove', this )
      // layout remaining item elements
      .isotope('layout');
  });

};
