/**
 * layout-modes-demo
 */

ID.modules['layout-modes-demo'] = function( elem ) {
  'use strict';

  var $window = $(window);

  var $demo = $( elem );

  var $grid = $demo.find('.isotope-demo').isotope({
    itemSelector: '.grid-splash-item',
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

  var $codeDisplay = $demo.find('.code-display code');

  $demo.find('.button-group').on( 'click', 'button', function() {
    // adjust container sizing if layout mode is changing from vertical or horizontal
    var $this = $(this);
    var isHorizontalMode = !!$this.attr('data-is-horizontal');
    if ( isHorizontal != isHorizontalMode ) {
      var containerStyle = isHorizontalMode ? {
        height: $window.height() * 0.7
      } : {
        width: 'auto'
      };
      $grid.css( containerStyle );
      isHorizontal = isHorizontalMode;
    }
    // change layout mode
    var layoutModeValue = $this.attr('data-layout-mode');
    $grid.isotope({ layoutMode: layoutModeValue });
    $codeDisplay.displayIsotopeCode( 'layoutMode', layoutModeValue );
  });


};
