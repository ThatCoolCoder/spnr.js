/** spnr.js DOM (html) functions
 * @namespace
 */
spnr.dom = {};

spnr.dom.logPara = undefined;

/**
 * A shortening of document.getElementById().
 * @param {string} id - id of element to get
 * @returns {Element|null} element with that id. If element is not found, returns null;
 */
spnr.dom.id = function(id) {
    return document.getElementById(id);
}

/**
 * Get the document viewport width
 * @returns {number} width of the viewport
 */
spnr.dom.viewportWidth = function() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

/**
 * Get the document viewport height
 * @returns {number} height of the viewport
 */
spnr.dom.viewportHeight = function() { 
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

/**
 * Get the document viewport size as a spnr.js vector
 * @returns {Vector} size of the viewport
 */
spnr.dom.viewportSize = function() {
    return spnr.v(spnr.dom.viewportWidth(), spnr.dom.viewportHeight());
}

/**
 * Clear the log paragraph
 */
spnr.dom.clearLogPara = function() {
    if (spnr.dom.logPara !== undefined) {
        spnr.dom.logPara.innerText = '';
    }
}

/**
 * Log data to the DOM. Useful for situations where data is being created fast and it would be unreadable in the console, such as game physics.
 * @param {any} data - data to log
 * @param {string} [d=No Label] label - optional label for the log.
 */
spnr.dom.logToPara = function(data, label='No label') {
    if (spnr.dom.logPara === undefined) {
        spnr.dom.logPara = document.createElement('p');
        document.body.appendChild(spnr.dom.logPara);
    }
    spnr.dom.logPara.innerText += `${label} : ${data}\n`;
}

/**
 * Delete an element by its id. If element is not found, does nothing.
 * @param {string} id - id of element to remove. 
 */
spnr.dom.delete = function(id) {
    var elem = spnr.dom.id(id);
    if (elem != undefined) {
        elem.remove();
    }
}