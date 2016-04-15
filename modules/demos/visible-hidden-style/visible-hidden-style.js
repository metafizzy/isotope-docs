ID.modules['visible-hidden-style'] = function( elem ) {
  'use strict';

  var $demo = $( elem );
  var $grid = $demo.find('.grid').isotope({
    layoutMode: 'fitRows',
    // disable scale transform
    visibleStyle: {
      opacity: 1
    },
    hiddenStyle: {
      opacity: 0
    }
  });

  $demo.find('.button-group').on( 'click', '.button', function( event ) {
    var filterValue = $( event.currentTarget ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

};
