// Setup spnr instance

var spnrInBrowser = typeof window !== 'undefined';
var spnrAlreadyDefined = spnrAsMjs
    ? false
    : spnrInBrowser
        ? window.spnr !== undefined
        : false;

if (spnrAlreadyDefined) {

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
    /** Namespace containing all of spnr.js
     * @namespace
     */
    var spnr = {}; // Create an object to be the basis of spnr
    spnr.VERSION = 'v$$spnr-version$$';
    spnr.consoleLogHeader = '  🔧🔧 ';
    spnr.consoleLogStyling = 'background-color: #9cc8ff; display: block';
    if (spnrInBrowser && spnrAsMjs) window.spnr = spnr; // Make it global

    // Make a 'hello' message
    console.log(`%c  \n${spnr.consoleLogHeader} spnr.js ${spnr.VERSION}  \n  `,
        spnr.consoleLogStyling);

    // Load the consts & functions from math
    Object.getOwnPropertyNames(Math).forEach(key => {
        spnr[key] = Math[key];
    });
}

/** Log to console with spnr.js styling
 * @param {string} message
*/
spnr.internalLog = function(message) {
    var fullMessage = '%c' + spnr.consoleLogHeader + message;
    console.log(fullMessage, spnr.consoleLogStyling);
}

/** Warn to console with spnr.js styling 
 * @param {string} message
*/
spnr.internalWarn = function(message) {
    var fullMessage = `${spnr.consoleLogHeader} spnr.js warning:\n  ${message}`;
    console.warn(fullMessage);
}