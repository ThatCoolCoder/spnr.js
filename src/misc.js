/**
 * I'm not really sure exactly what this does, kept for legacy support.
 * @returns {string}
 */
spnr.uniqueId = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + spnr.random().toString(36).substr(2, 9);
}

/**
 * Generate a random true or false value
 * @returns {boolean}
 */
spnr.randBoolean = function() {
    // Randomly return true or false

    return spnr.random() > 0.5;
}

/**
 * Do nothing. Was created before I realised you can just do void(0). Only kept for backwards compatibility
 */
spnr.doNothing = function() {
    // do nothing
}

/**
 * Like a for loop mixed with a foreach.
 * @param {number} n - loop from 0 to n - 1.
 * @param {Function} func - function to run each loop cycle with n as a parameter.
 */
spnr.doNTimes = function(n, func) {
    for (var i = 0; i < n; i ++) {
        func(i);
    }
}