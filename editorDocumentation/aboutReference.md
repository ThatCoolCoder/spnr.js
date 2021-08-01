# About the spnr.js reference

[Back to README](../README.md)

[Back to editor documentation contents](README.md)

## Overview
The spnr.js user reference is stored in `/userReference`. Every public feature or constant of spnr.js is documented here. The basic reference is stored as a series of text files in `/userReference/rawReferenceSections`. Each of the text files corresponds roughly to one JS source file. These seperate files are then appended together using `/userReference/rawReferenceSections/rawReferenceCompiler.py`. From here, different programs can be used to make reference manuals in different formats, eg HTML or markdown.

## Editing the raw reference
1. Find the file in `/userReference/rawReferenceSections/` that corresponds to the feature that you are documenting.
2. Add the feature, following the syntax in [Reference syntax](#reference-syntax)
3. Make sure that the raw reference file you edited in is listed in `/userReference/rawReferenceFiles.txt`
4. Run `/userReference/rawReferenceCompiler.py` to join all of the sections together

## Updating the html reference

1. Make sure that `/userReference/rawReference.txt` is up to date by following the instructions above.
2. Update the version number in `/userReference/htmlContentsTemplate.html` to the current spnr version
3. Run `/userReference/htmlReferenceMaker.py`

## Reference syntax
At its most basic, the reference is stored as a series of text files in `/reference/rawReferenceSections/`. Each one corresponds roughly to a JS source file. The files are made up of sections.

Each section in the files is one feature/function of spnr.js. The sections are seperated by 
```
(empty line, don't actually write this in the reference)
NEXTSECTION
(empty line, don't actually write this in the reference)
```

The sections are divided into parts, too. The parts are seperated by a line break. The parts are:
- feature/function name
- feature function name with args (if it's a variable or has no args juts repeat the name, show optional args and their default values)
- example with args
- description
- file defined
- link to a full reference page on that item (not implemented yet, may never be implemented - instead might be added by the compiler, using its own page system)

To make code sections, put three backticks on either size of the block (` ``` `).

Example:
```
spnr.NeuralNetwork()
spnr.NeuralNetwork()
var network = new spnr.NeuralNetwork()
A generic neural network class
/src/machineLearning/neuralNetwork.js
nolink

NEXTSECTION

spnr.NeuralNetwork.createInputLayer()
spnr.NeuralNetwork.createInputLayer(size)
network.addInputLayer(5)
Create the input layer for the neural network with ```size``` neurons. Will overwrite an existing input layer if there is one in that network already.
src/machineLearning/neuralNetwork.js
nolink
```