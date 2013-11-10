/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID['layout-modes'] = function() {

  // demo at the top
  ( function() {
    var $container = $('#layout-modes-demo .isotope').isotope({
      itemSelector: '.item',
      layoutMode: 'masonry',
      transitionDuration: '0.6s',
      masonry: {
        columnWidth: 110
      },
      cellsByRow: {
        columnWidth: 220,
        rowHeight: 220
      },
      masonryHorizontal: {
        rowHeight: 110
      },
      cellsByColumn: {
        columnWidth: 220,
        rowHeight: 220
      
      }
    });


    $('#layout-modes-demo .button-group').on( 'click', 'input', function() {
      var $this = $(this);
      var isHorizontal = $this.attr('data-is-horizontal');
      $container[ isHorizontal ? 'addClass' : 'removeClass' ]('is-horizontal');
      $container.isotope({ layoutMode: this.value });
    });
  })();


};

})( window, jQuery );
