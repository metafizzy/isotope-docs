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

  // ----- appended ----- //

  ( function() {
    var $demo = $('#insert-demo');
    var $container = $demo.find('.isotope').isotope({
      masonry: {
        columnWidth: 50
      },
      // filter items with odd numbers
      filter: function( itemElem ) {
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
      // append elements to container
      $container.append( elems )
        // insert in isotope instance
        .isotope( 'insert', elems );
    });
  })();


  // ----- layout demo ----- //

  ( function() {
    var container = document.querySelector('#layout-demo .isotope');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // change size of item via class
      classie.toggle( event.target, 'gigante' );
      // trigger layout
      msnry.layout();
    });
  })();

  // ----- prepended ----- //

  ( function() {
    var demo = document.querySelector('#prepended-demo');
    var container = demo.querySelector('.masonry');
    var button = demo.querySelector('button');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    eventie.bind( button, 'click', function() {
      // create new item elements
      var elems = [];
      var fragment = document.createDocumentFragment();
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        fragment.appendChild( elem );
        elems.push( elem );
      }
      // prepend elements to container
      container.insertBefore( fragment, container.firstChild );
      // add and lay out newly prepended elements
      msnry.prepended( elems );
    });
  })();


  // ----- stamp demo ----- //

  ( function() {
    var demo = document.querySelector('#stamp-demo');
    var stampElem = demo.querySelector('.stamp');
    var button = demo.querySelector('button');
    var msnry = new Masonry( demo.querySelector('.masonry'), {
      columnWidth: 60,
      itemSelector: '.item'
    });
    var isStamped = false;

    eventie.bind( button, 'click', function() {
      // stamp or unstamp element
      if ( isStamped ) {
        msnry.unstamp( stampElem );
      } else {
        msnry.stamp( stampElem );
      }
      // trigger layout
      msnry.layout();
      isStamped = !isStamped;
    });
  })();

  // ----- remove demo ----- //

  ( function() {
    var container = document.querySelector('#remove-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      msnry.remove( event.target );
      // layout remaining item elements
      msnry.layout();
    });
  })();

};

})( window, jQuery );
