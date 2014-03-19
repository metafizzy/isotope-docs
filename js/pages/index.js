/**
 * methods page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;


ID.index = function() {

  ( function() {
    var $container = $('#hero .isotope').isotope({
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
    });

    var filterFns = {
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      ium: function() {
  var name = $(this).find('.name').text();
  return name.match( /ium$/ );
}
    };

    $('#hero .sort-by').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $container.isotope({ sortBy: sortByValue });
      displayCode( 'sortBy', sortByValue );
    });

    $('#hero .filters').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
      displayCode( 'filter', filterValue );
    });

    var $codeDisplay = $('#hero .code-display code');

    function displayCode( key, value ) {
      value = typeof value === 'string' ? "'" + value + "'" : value;
      $codeDisplay.text( "$container.isotope({ " +
        key + ": " + value + " })" );
    }

  })();

};

})( window, jQuery );