/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

var $window = $(window);

ID['layout-modes'] = function() {

  // demo at the top
  ( function() {
    var $container = $('#layout-modes-demo .isotope').isotope({
      itemSelector: '.element-item',
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

    var isHorizontal = false;

    var $codeDisplay = $('#layout-modes-demo .code-display code');

    $('#layout-modes-demo .button-group').on( 'click', 'button', function() {
      // adjust container sizing if layout mode is changing from vertical or horizontal
      var $this = $(this);
      var isHorizontalMode = !!$this.attr('data-is-horizontal');
      if ( isHorizontal !== isHorizontalMode ) {
        var containerStyle = isHorizontalMode ? {
          height: $window.height() * 0.7
        } : {
          width: 'auto'
        };
        $container.css( containerStyle );
        isHorizontal = isHorizontalMode;
      }
      // change layout mode
      var layoutModeValue = $this.attr('data-layout-mode-value');
      $container.isotope({ layoutMode: layoutModeValue });
      $codeDisplay.displayIsotopeCode( 'layoutMode', layoutModeValue );
    });

  })();


};

})( window, jQuery );
