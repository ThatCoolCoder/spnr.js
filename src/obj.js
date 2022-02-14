/**
 * spnr.js Object operations
 * @namespace
 */
spnr.obj = {};

/**
 * Get an array of the keys of an object.
 * @param {Object} obj
 * @returns {string[]} keys of the object
 */
spnr.obj.keys = function(obj) {
    return Object.keys(obj);
}

/**
 * Get an array of the values of an object.
 * @param {Object} obj
 * @returns {string[]} values of the object
 */
spnr.obj.values = function(obj) {
    return Object.values(obj);
}

/**
 * Change the values of an object without changing the keys.
 * Assumes that the length of the values is greater than or equal to the amount of keys in the object.
 * @param {Object} obj
 * @param {any[]} values - values to set the keys to 
 */
spnr.obj.setValues = function(obj, values) {
    // change the values of an object without changing the keys
    // assumes that keys and values are same length, etc
    var keys = spnr.obj.keys(obj);
    keys.forEach((key, i) => {
        obj[key] = values[i];
    });
}

/**
 * Shallow copy an object (copy one level but don't deep copy properties).
 * @param {Object} obj - object to copy
 * @returns {Object}
 */
spnr.obj.oneLevelCopy = function(obj) {
    var newObj = {};
    var keys = spnr.obj.keys(obj);
    keys.forEach(key => {
        newObj[key] = obj[key];
    });
    return newObj;
}

/**
 * Whether the object has any keys
 * @param {object} obj 
 * @returns {boolean}
 */
spnr.obj.isEmpty = function(obj) {
    if (! obj) return true;
    return Object.keys(obj).length == 0;
}

/**
 * Create an enum-like object from another object.
 * Useful because you might be too lazy to have distinct keys on the original object so you create it like:
 * ```
 * {a : 0, b : 0, c : 0}
 * ```
 * and this function returns:
 * ```
 * {a : 1, b : 1, c : 1} or {a : 'a', b : 'b', c : 'c'}
 * ```
 * Takes an object as an input and not a string of keys because that way intellisense can tell there's an object there
 * @param {object} obj - object to convert to an enum (is modified)
 * @param {boolean} stringKeys - whether the keys of the enum should be numbers (0, 1, 2) or strings (the keys of the object)
 */
spnr.obj.toEnum = function(obj, stringKeys=false) {
    var counter = 0;
    for (var key of Object.keys(obj)) {
        obj[key] = stringKeys ? key : counter;
        counter ++;
    }
}