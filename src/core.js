/*! (exclamation mark preserves comment)
spnr.js v1.6.0

MIT License

Copyright (c) 2021 That-Cool-Coder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Setup spnr instance

if (window.spnr !== undefined) {

    // If spnr is already defined, try to use the internal warner to say so
    // In the case that spnr refers to something other than this lib,
    // ...just use normal console.warn
    const message = 'An instance of spnr.js is already running';
    try {
        spnr.internalWarn(message);
    }
    catch {
        console.warn(message);
    }
}
else {
    var spnr = {}; // Create an object to be the basis of spnr
    spnr.VERSION = 'v1.6.0';
    spnr.consoleLogHeader = '  🔧🔧 ';
    spnr.consoleLogStyling = 'background-color: #9cc8ff; display: block';
    window.spnr = spnr; // Make it global

    // Make a 'hello' message
    console.log(`%c  \n${spnr.consoleLogHeader} spnr.js ${spnr.VERSION}  \n  `,
        spnr.consoleLogStyling);

    // Load the 'consts' from math
    Object.getOwnPropertyNames(Math).forEach(key => {
        spnr[key] = Math[key];
    });
}

spnr.internalLog = function(message) {
    var fullMessage = '%c' + spnr.consoleLogHeader + message;
    console.log(fullMessage, spnr.consoleLogStyling);
}

spnr.internalWarn = function(message) {
    var fullMessage = `${spnr.consoleLogHeader} spnr.js warning:\n  ${message}`;
    console.warn(fullMessage);
}