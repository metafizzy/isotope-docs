/**
 * animate-item-size
 */


IsotopeDocs['animate-item-size'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 60
    }
  });

  $grid.on( 'click', '.animate-item-size-item', function() {
    $(this).toggleClass('is-expanded');
    $grid.isotope('layout');
  });

};
