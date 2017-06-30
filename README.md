# Isotope Docs

Documentation for Isotope, the filtering & sorting magical layout library.

This project does _not_ include the source for Isotope. That's over in [github.com/metafizzy/isotope](https://github.com/metafizzy/isotope).

## Build

Building these docs requires [Bower](https://bower.io), [Gulp](http://gulpjs.com/) and [NPM](https://npmjs.com).

``` bash
npm install
bower install
gulp
```

This will build the docs in `build/`.

Watch for updates to rebuild docs on the fly.

``` bash
gulp default watch

gulp watch-dev
```

## Isotope vs Masonry vs Packery

                     Masonry Isotope Packery
    Masonry Layouts     x        x       x
    no gaps                              x
    draggable                            x
    filtering                    x
    sorting                      x
    multiple layout              x
