/**
 * methods page
 */

( function( window, $ ) {

'use strict';

var ID = window.ID;

function getItemElement() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.8 ? 'w3' : wRand > 0.6 ? 'w2' : '';
  var heightClass = hRand > 0.8 ? 'h3' : hRand > 0.5 ? 'h2' : '';
  elem.className = 'mini-item ' + widthClass + ' ' + heightClass;
  return elem;
}

ID.methods = function() {

  // ----- appended ----- //

  ( function() {
    var $demo = $('#appended-demo');
    var $container = $demo.find('.isotope').isotope({
      masonry: {
        columnWidth: 50
      }
    });

    $demo.find('button').on( 'click', function() {
      // create new item elements
      var elems = [];
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        elems.push( elem );
      }
      // append elements to container
      $container.append( elems )
        // add and lay out newly appended elements
        .isotope( 'appended', elems );
    });
  })();

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

  // ----- insert ----- //

  ( function() {
    var $demo = $('#insert-demo');
    var $container = $demo.find('.isotope').isotope({
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

    $demo.find('button').on( 'click', function() {
      // create new item elements
      var elems = [];
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        // set number
        var number = Math.floor( Math.random() * 100 );
        $( elem ).append( '<p class="number">' + number + '</p>' );
        elems.push( elem );
      }
      // insert new elements
      $container.isotope( 'insert', elems );
    });
  })();


  // ----- layout demo ----- //

  ( function() {
    var $container = $('#layout-demo .isotope').isotope({
      masonry: {
        columnWidth: 50
      }
    });
    // change size of item by toggling gigante class
    $container.on( 'click', '.mini-item', function() {
      $(this).toggleClass('gigante');
      $container.isotope('layout');
    });
  })();

  // ----- prepended ----- //

  ( function() {
    var $demo = $('#prepended-demo');
    var $container = $demo.find('.isotope').isotope({
      masonry: {
        columnWidth: 50
      }
    });

    $demo.find('button').on( 'click', function() {
      // create new item elements
      var elems = [];
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        elems.push( elem );
      }
      // prepend elements to container
      $container.prepend( elems )
        // add and lay out newly prepended elements
        .isotope( 'prepended', elems );
    });
  })();


  // ----- stamp demo ----- //

  ( function() {
    var $demo = $('#stamp-demo');
    var $container = $demo.find('.isotope').isotope({
      itemSelector: '.mini-item',
      masonry: {
        columnWidth: 50
      }
    });
    var $stampElem = $demo.find('.stamp');
    var isStamped = false;

    $demo.find('button').on( 'click', function() {
      // stamp or unstamp element
      if ( isStamped ) {
        $container.isotope( 'unstamp', $stampElem );
      } else {
        $container.isotope( 'stamp', $stampElem );
      }
      // trigger layout
      $container.isotope('layout');
      isStamped = !isStamped;
    });
  })();

  // ----- remove demo ----- //

  ( function() {
    var $container = $('#remove-demo .isotope').isotope({
      masonry: {
        columnWidth: 50
      }
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
