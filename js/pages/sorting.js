/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.sorting = function() {

  // demo at the top
  ( function() {
    var $buttonGroup = $('#sorting-demo .button-group');

    var $container = $('#sorting-demo .isotope').isotope({
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

    var $codeDisplay = $('#sorting-demo .code-display code');

    $buttonGroup.on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $container.isotope({ sortBy: sortByValue });
      $codeDisplay.displayIsotopeCode( 'sortBy', sortByValue );
    });

  })();

  ( function() {
    function getMultiSortBy( val ) {
      return val.split(',');
    }

    var $buttonGroup = $('#multiple-sort-by-demo .button-group');

    var $container = $('#multiple-sort-by-demo .isotope').isotope({
      layoutMode: 'fitRows',
      itemSelector: '.mini-item',
      getSortData: {
        color: '[data-color]',
        number: '.number parseInt'
      },
      sortBy: [ 'color', 'number' ]
      // sortBy: getMultiSortBy( $buttonGroup.find(':checked').val() )
    });

    $buttonGroup.on( 'click', 'button', function() {
      $container.isotope({
        sortBy: getMultiSortBy( this.getAttribute('data-sort-by') )
      });
    });

  })();

};

})( window, jQuery );
