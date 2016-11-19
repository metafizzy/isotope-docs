/**
 * combination-filters
 */

IsotopeDocs['combination-filters'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    itemSelector: '.color-shape',
    columnWidth: 80,
    transitionDuration: '0.6s'
  });

  var $codeDisplay = $demo.find('.code-display code');

  // store filter for each group
  var filters = {};

  $demo.on( 'click', '.button', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = concatValues( filters );
    $grid.isotope({ filter: filterValue });
    $codeDisplay.displayIsotopeCode( 'filter', filterValue );
  });

  // flatten object by concatting values
  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }

};
