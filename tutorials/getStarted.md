# Get started with spnr.js

[Back to tutorials](index.md)

## Installation

There are a few different ways to include spnr.js in your project, depending on the environment your project operates in.

#### In the browser - regular JS

This is the method recommended for beginners. You have two options for linking the script: from a CDN or manually downloading it. For general website use, it is recommended to link to a CDN as this ensures that spnr.js will be up to date.

To link to a CDN, add a script tag like this to your HTML document. (it doesn't matter where it goes as long as it is before your other scripts)

```html
<script src="https://cdn.jsdelivr.net/npm/spnr/cdn/latest/spnr.min.js"></script>
```

If you want to target a specific version, replace `latest` with a version such as `1.5.0`. Note that the earliest version in the CDN is `1.5.0`. If for some reason you don't want the minified version, replace `spnr.min.js` with `spnr.js`.

If instead you want to download spnr.js, stable versions can be found at the [GitHub release page](https://github.com/That-Cool-Coder/spnr.js/releases/). Select a release, scroll down to the assets section and download `spnr.js`.

#### Node JS

You should be able to add it through npm, then you can import it like so:

```js
var spnr = require('spnr');
```

You can of course download the file and put in the full path manually.

#### ES6 module (.mjs) - browser or node

The urls for the ES6 modules are the same as the others but end in `.mjs`. Note that ES6 modules are only available for spnr versions >= 1.8.0

```js
import { spnr } from 'https://cdn.jsdelivr.net/npm/spnr/cdn/latest/spnr.mjs';
```

If you are using a library that requires non-mjs spnr but you want to use mjs for your code, it should work to just include the `.js` version before your script.

## First project

To start, create an empty HTML file and JavaScript file. In the HTML file, we'll put the general boilerplate.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>spnr.js example</title>
        <meta charset="utf-8">
    </head>

    <body>
    </body>
    
    <script src="https://unpkg.com/spnr/cdn/latest/spnr.min.js"></script>
</html>
```

If you open this file in a browser and open the console, you should see a spnr.js greeting. Most of the functions of `spnr.js` are single utility functions and can be learned from the API reference, hosted at [https://thatcoolcoder.github.io/spnr.js](https://thatcoolcoder.github.io/spnr.js).