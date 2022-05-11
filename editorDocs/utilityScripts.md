# Utility scripts

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

There are a number of utility scripts used in spnr.js. They are located in the `/scripts/` directory. To make them read the correct files, they must be run from the root directory of spnr.js.

## Compiling

spnr.js is written in vanilla JavaScript with no fancy buildsystem. Instead it's "compiled" by a small Python program - `/scripts/compile.py`. To support the variety of JavaScript import options available, we create a both a `.js` file and `.mjs` file, which differ mostly in exports. The `.js` file is used in regular browser script tags and `require()` imports in node. If it's in node then it sets `module.exports`. The `.mjs` file is used by browsers and node for module JS things. In both exports, browser features are disabled at runtime if the window object is not found.

While doing this, it also replaces all instances of `$$spnr-version$$` with the version from `package.json` It will write the compiled library to `/build/spnr.js` and `/build/spnr.mjs`.

## Minifying

spnr.js uses uglify-js to minify, so install that first with `npm install -g uglify-js`. Then use the script `/scripts/minify.sh`. It will input `/build/spnr.js` and write to `/build/spnr.min.js`.

## Generating user docs

To generate docs with JSDoc, run `/scripts/gendocs.sh`. It's a shell file but people on windows can just paste the contents into a terminal. You'll need to install some things first - see [about user docs](userDocsInfo.md) for information.