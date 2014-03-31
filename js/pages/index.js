/**
 * methods page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.index = function() {

  // ----- hero ----- //

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

  // ----- in use ----- //

  ( function() {

    var $container = $('#in-use-container');
    // hide by default
    $container.find('.in-use-item').hide();

    $container.isotope({
      // select none
      itemSelector: 'none',
      masonry: {
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer'
      }
    });

    $container.isotope( 'option', { itemSelector: '.in-use-item' } );

    $container.imagesLoaded().progress( function( imgLoad, image ) {
      var $item = $( image.img ).parents( '.in-use-item' );
      // un-hide item
      $item.show();
      // masonry does its thing
      $container.isotope( 'appended', $item );
    });
  })();

};

})( window, jQuery );