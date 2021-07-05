## Code Writing Conventions for spnr.js

[Back to README](/README.md)  
[Back to editor documentation contents](MAIN.md)

#### Simple guidelines
- 4 spaces indentation
- Don't sacrifice readibility unless you HAVE TO for efficiency (include a more readable but functionally identical copy in a block comment above with a note)
- If you have to leave a piece of code half-baked for some reason, put a comment near it that contains ```!FIXME``` so it can be found in a search-and-replace and fixed
- As JavaScript has no method of declaring functions and methods private, prefix private methods/functions with an underscore. If you are unsure whether to make something public or private, choose public as some people may need to use it.


#### Spnr.js 'modules'
Each object/thing in the form ```spnr.<something>``` can be considered a module. These modules can either be objects with methods (eg: ```spnr.arr```) or classes (eg: ```spnr.NeuralNetwork```). No spnr modules should be considered private. Some are primarily designed to be used by other modules (eg: ```spnr.Neuron``` is designed for use with ```spnr.NeuralNetwork```), however, some users might still find it handy to manipulate neurons themselves instead of a network.
