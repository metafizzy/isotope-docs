// init, final script
( function() {
'use strict';

// init module instance for all elements with data-module attributes
$('[data-js-module]').each( function( i, elem ) {
  var moduleName = elem.getAttribute('data-js-module');
  var module = ID.modules[ moduleName ];
  if ( module ) {
    module( elem );
  }
});

// -------------------------- radioButtonGroup -------------------------- //

// add is-checked classes to labels

$('.js-radio-button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.find(':checked').parent().addClass('is-checked');
  $buttonGroup.on( 'click', 'input, button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    var $this = $( this );
    var $clickedButton = $this.hasClass('button') ? $this :
      $this.parents('.button');
    $clickedButton.addClass('is-checked');
  });
});

})();
