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
      },
      // initial sortBy from button group
      sortBy: $buttonGroup.find(':checked').val()
    });
    
    $buttonGroup.on( 'click', 'input', function() {
      $container.isotope({ sortBy: this.value });
    });

  })();

};

})( window, jQuery );
