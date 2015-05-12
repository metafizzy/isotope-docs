/**
 * multiple-sort-by
 */

ID.modules['multiple-sort-by'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  function getMultiSortBy( val ) {
    return val.split(',');
  }

  var $buttonGroup = $demo.find('.button-group');

  var $grid = $demo.find('.isotope-demo').isotope({
    layoutMode: 'fitRows',
    itemSelector: '.grid-multi-item',
    getSortData: {
      color: '[data-color]',
      number: '.number parseInt'
    },
    sortBy: [ 'color', 'number' ]
    // sortBy: getMultiSortBy( $buttonGroup.find(':checked').val() )
  });

  $buttonGroup.on( 'click', 'button', function() {
    $grid.isotope({
      sortBy: getMultiSortBy( this.getAttribute('data-sort-by') )
    });
  });

};
