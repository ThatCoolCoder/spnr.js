# About the spnr.js user docs

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

Spnr.js uses JSDoc to produce user documentation, which is then hosted on a Github pages site. The pages site updates automatically using a workflow.

To build the documentation, you'll first need to install JSDoc and the theme: (yes, one must be installed globally and the other locally)
```
npm install -g jsdoc
npm install 
```

Then just run `scripts/gendocs.sh`.

It's preferred if you only generate docs when making a release so to minimise the size of commits.