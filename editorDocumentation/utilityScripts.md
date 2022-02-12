# Utility scripts

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

There are a number of utility scripts used in spnr.js. They are located in the `/scripts/` directory. To make them read the correct files, they must be run from the root directory of spnr.js.

## Compiling

spnr.js is written in vanilla JavaScript with no fancy buildsystem. Instead it's "compiled" by a small Python program - `/scripts/compile.py`. It reads a list of files to append to each other from `/scripts/inputFiles.txt`. While doing this, it also replaces all instances of `$$spnr-version$$` with the version from `package.json` It will write the compiled library to `/build/spnr.js`.

## Minifying

spnr.js uses uglify-js to minify, so install that first with `npm install -g uglify-js`. Then use the script `/scripts/minify.sh`. It will input `/build/spnr.js` and write to `/build/spnr.min.js`.

## Generating docs

spnr.js hasn't fully moved over to jsdoc yet, but the script that will be used to generate docs with jsdoc is `/scripts/gendocs.sh`. It's a shell file but people on windows can just paste the contents as it does essentially the same thing