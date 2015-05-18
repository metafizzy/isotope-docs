/**
 * insert-demo
 */

ID.modules['insert-demo'] = function( elem ) {
  'use strict';


  console.log('hi');
  var $demo = $( elem );
  
  var $grid = $demo.find('.grid').isotope({
    masonry: {
      columnWidth: 50
    },
    // filter items with odd numbers
    filter: function() {
      var number = $( this ).find('.number').text();
      return parseInt( number, 10 ) % 2;
    },
    // sort by number
    sortBy: 'number',
    getSortData: {
      'number': '.number parseInt'
    }
  });

  $demo.find('.insert-button').on( 'click', function() {
    // create new item elements
    var elems = [];
    for ( var i = 0; i < 3; i++ ) {
      var elem = ID.getItemElement();
      // set number
      var num = Math.floor( Math.random() * 100 );
      $( elem ).append( '<p class="number">' + num + '</p>' );
      elems.push( elem );
    }
    // insert new elements
    $grid.isotope( 'insert', elems );
  });

};
