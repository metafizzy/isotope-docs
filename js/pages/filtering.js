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

    var filterFnsDisplay = {
      numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
      ium: 'function() {\n  var name = $(this).find(\'.name\').text();\n  return name.match( /ium$/ );\n}'
    };

    var $codeDisplay = $('#filtering-demo .code-display code');

    $('#filtering-demo .button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      var isoFilterValue = filterFns[ filterValue ] || filterValue;
      var displayFilterValue = filterFnsDisplay[ filterValue ] || filterValue;
      $container.isotope({ filter: isoFilterValue });
      $codeDisplay.displayIsotopeCode( 'filter', displayFilterValue );
    });

  })();

  // ----- combination filters ----- //

  ( function() {

    var $demo = $('#combination-filters-demo');

    var $container = $demo.find('.isotope').isotope({
      itemSelector: '.color-shape',
      columnWidth: 80,
      transitionDuration: '0.6s'
    });

    var $codeDisplay = $demo.find('pre code');

    // store filter for each group
    var filters = {};

    $demo.on( 'click', '.button', function() {
      var $this = $(this);
      var $buttonGroup = $this.parents('.button-group');
      var filterGroup = $buttonGroup.attr('data-filter-group');
      // set filter for the group
      filters[ filterGroup ] = $this.attr('data-filter');
      // combine filters
      var filterValue = '';
      for ( var prop in filters ) {
        filterValue += filters[ prop ];
      }

      $container.isotope({ filter: filterValue });
      $codeDisplay.displayIsotopeCode( 'filter', filterValue );
    });

  })();

};

})( window, jQuery );
