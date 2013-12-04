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

    $('#hero .sort-by').on( 'click', 'input', function() {
      $container.isotope({ sortBy: this.value });
    });

    $('#hero .filters').on( 'click', 'input', function() {
      var filtr = filterFns[ this.value ] || this.value;
      $container.isotope({ filter: filtr });
    });

  })();

};

})( window, jQuery );