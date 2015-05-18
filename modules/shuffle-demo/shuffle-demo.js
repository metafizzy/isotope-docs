/**
 * shuffle-demo
 */

ID.modules['shuffle-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  $demo.find('.shuffle-button').on( 'click', function() {
    $grid.isotope('shuffle');
  });

};
