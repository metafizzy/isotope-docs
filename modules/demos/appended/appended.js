/**
 * appended
 */

ID.modules.appended = function( elem ) {
  'use strict';

  var $demo = $( elem );
  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    }
  });

  $demo.find('.append-button').on( 'click', function() {
    // create new item elements
    var $items = $([
      ID.getItemElement(),
      ID.getItemElement(),
      ID.getItemElement()
    ]);
    // append elements to container
    $grid.append( $items )
      // add and lay out newly appended elements
      .isotope( 'appended', $items );
  });

};
