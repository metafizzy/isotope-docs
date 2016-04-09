/**
 * filtering-demo
 */

ID.modules['filtering-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $grid = $demo.find('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.5s',
    stagger: 33
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

  var $codeDisplay = $demo.find('.code-display code');

  $demo.find('.filter-button-group').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    var isoFilterValue = filterFns[ filterValue ] || filterValue;
    var displayFilterValue = filterFnsDisplay[ filterValue ] || filterValue;
    $grid.isotope({ filter: isoFilterValue });
    $codeDisplay.displayIsotopeCode( 'filter', displayFilterValue );
  });

};
