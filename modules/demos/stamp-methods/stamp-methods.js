/**
 * stamp-methods
 */

ID.modules['stamp-methods'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    itemSelector: '.grid-item',
    masonry: {
      columnWidth: 50
    }
  });

  var $stampElem = $grid.find('.stamp');
  var isStamped = false;

  $demo.find('.stamp-button').on( 'click', function() {
    // stamp or unstamp element
    if ( isStamped ) {
      $grid.isotope( 'unstamp', $stampElem );
    } else {
      $grid.isotope( 'stamp', $stampElem );
    }
    // trigger layout
    $grid.isotope('layout');
    isStamped = !isStamped;
  });

};
