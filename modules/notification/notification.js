ID.modules.notification = function( elem ) {
  'use strict';

  var docElem = document.documentElement;
  var transitionProp = typeof docElem.style.transition == 'string' ?
    'transition' : 'WebkitTransition';

  var notifyTimeout;

  ID.notify = function( message ) {
    elem.textContent = message + ' at ' + getTimestamp();

    elem.style[ transitionProp ] = 'none';
    elem.style.display = 'block';
    elem.style.opacity = '1';

    // hide the notification after a second
    clearTimeout( notifyTimeout );
    notifyTimeout = setTimeout( hideNotify, 1000 );
  };

  function getTimestamp() {
    var now = new Date();
    var min = leadZero( now.getMinutes() );
    var seconds = leadZero( now.getSeconds() );
    return [ now.getHours(), min, seconds ].join(':');
  }

  function leadZero( time ) {
    return time < 10 ? '0' + time : time;
  }

  function hideNotify() {
    elem.style[ transitionProp ] = 'opacity 1.0s';
    elem.style.opacity = '0';
  }

};
