/**
 * sorting-demo
 */

ID.modules['sorting-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $buttonGroup = $demo.find('.sort-by-button-group');

  var $grid = $demo.find('.isotope-demo').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.6s',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
    // initial sortBy from button group
    // sortBy: $buttonGroup.find(':checked').val()
  });

  var $codeDisplay = $demo.find('.code-display code');

  $buttonGroup.on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({ sortBy: sortByValue });
    $codeDisplay.displayIsotopeCode( 'sortBy', sortByValue );
  });

};
