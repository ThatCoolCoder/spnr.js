## The cdn folder of spnr.js

[Back to README](/README.md)

[Back to editor documentation contents](MAIN.md)

#### Brief Description
The ```/cdn``` folder is a folder for a repl-based cdn. It holds subfolders which correspond to the github spnr.js releases. Each subfolder should be names along the lines of ```0.1.0```. Don't put a 'v' at the start of the folder name. There should also be a subfolder called `latest` which contains the most recent release of spnr.js. Each subfolder should hold a file called ```spnr.js```, which is the main compiled file. It should be identical to the version on the github release. There should also be a file called ```spnr.min.js```, which is a minified version (see [minifying spnr.js](minifying.md)) of ```spnr.js```, also identical to the github release.