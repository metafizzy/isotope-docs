/**
 * methods page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.methods = function() {

  // ----- destroy demo ----- //

  ( function() {
    var $demo = $('#destroy-demo');
    var isoOptions = {
      masonry: {
        columnWidth: 50
      }
    };
    var $container = $demo.find('.isotope').isotope( isoOptions );
    var isActive = true;

    $demo.find('button').on( 'click', function() {
      if ( isActive ) {
        $container.isotope('destroy');
      } else {
        $container.isotope( isoOptions );
      }
      isActive = !isActive;
    });
  })();

};

})( window, jQuery );
