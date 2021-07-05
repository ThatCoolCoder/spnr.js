## Minifying spnr.js

[Back to README](/README.md)
[Back to editor documentation contents](MAIN.md)

#### Overview

Due to some of the advanced syntax used in `spnr.GameEngine`, most mainstream JS minifiers will not be able to minify spnr.js. Fortunately, [rjsmin.py](https://github.com/ndparker/rjsmin) works. To use, install rjsmin with `pip install rjsmin` and run `/minifier.py` with Python >= 3.4.

#### Advanced use

By default, `/minifier.py` will source spnr from `/spnr.js` and write to `/spnr.min.js`. If you want to use different input/output files, you can specify them using command line arguments like so: 
```python minifier.py inputFile.js outputFile.min.js```

You can specify an input file but output to the default file like this:
```python minifier.py inputFile.js```

There is no way to use default input file but specific output file.