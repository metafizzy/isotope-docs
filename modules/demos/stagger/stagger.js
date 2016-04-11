ID.modules.stagger = function( elem ) {
  'use strict';

  var $demo = $( elem );
  var $grid = $demo.find('.grid').isotope({
    layoutMode: 'fitRows',
    stagger: 30
  });

  $demo.find('.button-group').on( 'click', '.button', function( event ) {
    var filterValue = $( event.currentTarget ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

};
