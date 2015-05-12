/**
 * sorting page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

ID.filtering = function() {

  // ----- combination filters ----- //

  ( function() {

    var $demo = $('#combination-filters-demo');

    var $container = $demo.find('.isotope').isotope({
      itemSelector: '.color-shape',
      columnWidth: 80,
      transitionDuration: '0.6s'
    });

    var $codeDisplay = $demo.find('pre code');

    // store filter for each group
    var filters = {};

    $demo.on( 'click', '.button', function() {
      var $this = $(this);
      var $buttonGroup = $this.parents('.button-group');
      var filterGroup = $buttonGroup.attr('data-filter-group');
      // set filter for the group
      filters[ filterGroup ] = $this.attr('data-filter');
      // combine filters
      var filterValue = '';
      for ( var prop in filters ) {
        filterValue += filters[ prop ];
      }

      $container.isotope({ filter: filterValue });
      $codeDisplay.displayIsotopeCode( 'filter', filterValue );
    });

  })();

};

})( window, jQuery );
