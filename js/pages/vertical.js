/**
 * vertical layout mode page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.vertical = function() {

  ( function() {
    var $container = $('#vertical-feature-demo .isotope').isotope({
      itemSelector: 'li',
      layoutMode: 'vertical',
      transitionDuration: '0.6s',
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '.category',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    });
    
    $('#vertical-feature-demo .button-group').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $container.isotope({ sortBy: sortByValue });
    });
  })();

};

})( window, jQuery );
