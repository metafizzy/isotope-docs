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

    var filterFnsDisplay = {
      numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
      ium: 'function() {\n  var name = $(this).find(\'.name\').text();\n  return name.match( /ium$/ );\n}'
    };

    var $codeDisplay = $('#hero .code-display code');

    $('#hero .sort-by').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $container.isotope({ sortBy: sortByValue });
      $codeDisplay.displayIsotopeCode( 'sortBy', sortByValue );
    });

    $('#hero .filters').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      var isoFilterValue = filterFns[ filterValue ] || filterValue;
      var displayFilterValue = filterFnsDisplay[ filterValue ] || filterValue;
      $container.isotope({ filter: isoFilterValue });
      $codeDisplay.displayIsotopeCode( 'filter', displayFilterValue );
    });

  })();

};

})( window, jQuery );