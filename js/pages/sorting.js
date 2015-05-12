/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.sorting = function() {

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
