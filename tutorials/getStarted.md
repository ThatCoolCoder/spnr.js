# Get started with spnr.js

[Back to tutorials](index.md)

## Installation
To use spnr.js in your project there are two options: link to a CDN (content delivery network) or download a copy of spnr.js. For beginners, it is recommended to link to a CDN as this ensures that spnr.js will be up to date.

#### Linking to a CDN

To link to a CDN, add a script tag like this to your HTML document. (it doesn't matter where it goes as long as it is before your other scripts)

```html
<script src="https://cdn.jsdelivr.net/npm/spnr/cdn/latest/spnr.min.js"></script>
```

If you want to target a specific version, replace `latest` with a version such as `1.5.0`. Note that the earliest version in the CDN is `1.5.0`. If for some reason you don't want the minified version, replace `spnr.min.js` with `spnr.js`.

#### Downloading spnr.js

To download a stable version of spnr.js, go to the [GitHub release page](https://github.com/That-Cool-Coder/spnr.js/releases/) and click on a release. Scroll down to the assets section and download `spnr.js`.

## First project

Create a HTML page and write this in it:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>spnr.js example</title>
        <meta charset="utf-8">
    </head>

    <body>
        <h1>spnr.js example</h1>
        <p id="output1"></p>
        <p id="output2"></p>
    </body>
    
    <script src="https://unpkg.com/spnr/cdn/latest/spnr.min.js"></script>
    <script>
        // Say hello
        spnr.internalLog('spnr.js example');

        // Write some random symbols to the document
        var para = spnr.dom.id('output1');
        para.innerText = spnr.str.randomSymbols(50);

        // Display the mouse position on the page;
        var mouseWatcher = new spnr.MouseWatcher();
        setInterval(() => {
            var position = mouseWatcher.position;
            var para = spnr.dom.id('output2');
            para.innerText = `Mouse position: ${spnr.v.prettyPrint(position)}`;
        }, 250);
    </script>

</html>
```
