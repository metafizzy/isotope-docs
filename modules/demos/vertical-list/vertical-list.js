/**
 * vertical-list
**/

ID.modules['vertical-list'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var $list = $demo.find('.vertical-list').isotope({
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

  $demo.find('.button-group').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $list.isotope({ sortBy: sortByValue });
  });

};
