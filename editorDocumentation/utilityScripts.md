# Utility scripts

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

There are a number of utility scripts used in spnr.js. They are located in the `/scripts/` directory. To make them read the correct files, they must be run from the root directory of spnr.js.

## Compiling

spnr.js is written in vanilla JavaScript with no fancy buildsystem. Instead it's "compiled" by a small Python program - `/scripts/compiler.py`. It reads a list of files to append to each other from `/scripts/inputFiles.txt`. While doing this, it also replaces all instances of `$$spnr-version$$` with the version from `package.json` It will write the compiled library to `/build/spnr.js`.

## Minifying

To minify spnr.js, use the script `/scripts/minifier.py`.

Due to some of the advanced syntax used in `spnr.GameEngine`, most mainstream JS minifiers will not be able to minify spnr.js. Fortunately, [rjsmin.py](https://github.com/ndparker/rjsmin) works. To use, install rjsmin with `pip install rjsmin` and run `/scripts/minifier.py` with Python >= 3.4.

By default, this script will source spnr from `/build/spnr.js` and write to `/build/spnr.min.js`. If you want to use different input/output files, you can specify them using command line arguments like so: 
```python scripts/minifier.py inputFile.js outputFile.min.js```

You can specify an input file but output to the default file like this:
```python scripts/minifier.py inputFile.js```

There is no way to use default input file but specific output file.