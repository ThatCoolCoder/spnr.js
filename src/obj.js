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