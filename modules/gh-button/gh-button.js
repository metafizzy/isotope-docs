ID.modules['gh-button'] = function( elem ) {

  var user = 'metafizzy';
  var repo = 'isotope';

  // get data
  var callbackName = 'ghButtonCallback' + Math.floor( Math.random() * 10000 );

  window[ callbackName ] = function( response ) {
    var starText = addCommas( response.data.stargazers_count );
    elem.querySelector('.gh-button__stat__text').textContent = starText;
  };

  function addCommas( num ) {
    return num.toString().replace( /(\d)(?=(\d{3})+$)/g, '$1,' );
  }

  var script = document.createElement('script');
  script.src = 'https://api.github.com/repos/' + user + '/' + repo + '?callback=' + callbackName;
  document.head.appendChild( script );

};
