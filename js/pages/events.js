/**
 * events page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;


// -------------------------- notify -------------------------- //

function timeStamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

function notify( message ) {
  ID.notify( message + ' at ' + timeStamp(), true );
}

ID.events = function() {

  // ----- layoutComplete demo ----- //

  ( function() {
    var $container = $('#layout-complete-demo .isotope').isotope({
      masonry: {
        columnWidth: 50
      }
    });
    // bind listener
    $container.isotope( 'on', 'layoutComplete', function( isoInstance, laidOutItems ) {
      notify( 'Isotope layout completed on ' + laidOutItems.length + ' items' );
    });

    $container.on( 'click', '.mini-item', function() {
      // change size of item via class
      $( this ).toggleClass('gigante');
      $container.isotope('layout');
    });
  })();

  // ----- removeComplete demo ----- //

  ( function() {
    var $container = $('#remove-complete-demo .isotope').isotope({
      masonry: {
        columnWidth: 50
      }
    });
    // bind listener
    $container.isotope( 'on', 'removeComplete', function( isoInstance, removedItems ) {
      notify( 'Removed ' + removedItems.length + ' items' );
    });

    $container.on( 'click', '.mini-item', function() {
      // remove clicked element
      $container.isotope( 'remove', this )
        // layout remaining item elements
        .isotope('layout');
    });
  })();

};

})( window, jQuery );
