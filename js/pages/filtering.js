/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.filtering = function() {

  // demo at the top
  ( function() {

    var $container = $('#filtering-demo .isotope').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s'
    });

    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };

    $('#filtering-demo .button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter-value');
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
    });

  })();

};

})( window, jQuery );
