/**
 * destroy demo
 */

ID.modules['destroy'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var isoOptions = {
    masonry: {
      columnWidth: 50
    }
  };
  // initialize Isotope
  var $grid = $demo.find('.grid').isotope( isoOptions );
  var isActive = true;

  $demo.find('.toggle-button').on( 'click', function() {
    if ( isActive ) {
      $grid.isotope('destroy'); // destroy
    } else {
      $grid.isotope( isoOptions ); // re-initialize
    }
    // set flag
    isActive = !isActive;
  });

};
