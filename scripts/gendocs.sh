rm -r userDocs/*
jsdoc build/spnr.js -d userDocs -c jsdoc.conf.json -t ./node_modules/ink-docstrap/template
cp docsIndex.html userDocs/index.html