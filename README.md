# Isotope Docs

Documentation for Isotope, the filtering & sorting magical layout library.

This project does _not_ include the source for Isotope. That's over in [github.com/metafizzy/isotope](https://github.com/metafizzy/isotope).

## Build

Building these docs requires [Bower](http://bower.io), [Grunt](http://gruntjs.com) and [NPM](http://npmjs.org).

``` bash
npm install
bower install
grunt
```

This will build the docs in `build/`.

Watch for updates to rebuild docs on the fly.

``` bash
grunt default watch
```

Pass `--dev` to build the site with JS and CSS files included separately, un-concatenated, and un-minified.

``` bash
grunt --dev
```
