// spnr.js v1.4.0
// Protected under GNU General Public License v3.0

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
    spnr.VERSION = 'v1.4.0';
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