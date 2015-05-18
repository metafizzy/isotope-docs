/**
 * prepended-demo
 */

ID.modules['prepended-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );
  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  $demo.find('.prepend-button').on( 'click', function() {
    // create new item elements
    var $items = $([
      ID.getItemElement(),
      ID.getItemElement(),
      ID.getItemElement()
    ]);
    // prepend elements to container
    $grid.prepend( $items )
      // add and lay out newly prepended elements
      .isotope( 'prepended', $items );
  });

};
