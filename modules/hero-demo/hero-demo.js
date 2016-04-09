/**
 * hero-demo
 */

ID.modules['hero-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');
  var iso = new Isotope( grid, {
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.5s',
    stagger: 33,
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = itemElem.querySelector('.weight').textContent;
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });

  var filterFns = {
    numberGreaterThan50: function( i, itemElem ) {
      var number = itemElem.querySelector('.number').textContent;
      return parseInt( number, 10 ) > 50;
    },
    ium: function( i, itemElem ) {
      var name = itemElem.querySelector('.name').textContent;
      return name.match( /ium$/ );
    }
  };

  var filterFnsDisplay = {
    numberGreaterThan50: "function() {\n  var number = $(this).find('.number').text();\n  return parseInt( number, 10 ) > 50;\n}",
    ium: 'function() {\n  var name = $(this).find(\'.name\').text();\n  return name.match( /ium$/ );\n}'
  };

  var codeDisplay = elem.querySelector('.code-display code');

  var sortByElem = elem.querySelector('.sort-by');
  filterBindEvent( sortByElem, 'click', 'button', function( event ) {
    var sortByValue = event.target.getAttribute('data-sort-by');
    iso.arrange({ sortBy: sortByValue });
    displayIsotopeCode( codeDisplay, 'sortBy', sortByValue );
  });

  var filtersElem = elem.querySelector('.filters');
  filterBindEvent( filtersElem, 'click', 'button', function( event ) {
    var filterValue = event.target.getAttribute('data-filter');
    var isoFilterValue = filterFns[ filterValue ] || filterValue;
    var displayFilterValue = filterFnsDisplay[ filterValue ] || filterValue;
    iso.arrange({ filter: isoFilterValue });
    displayIsotopeCode( codeDisplay, 'filter', displayFilterValue );
  });

};
