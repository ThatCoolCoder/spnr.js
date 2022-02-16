// You'll notice that a lot of the functions in this file could use the other ones
// But this carries a severe speed penalty, so I've put things inline if that speeds it up
// Vector operations are often the slowest thing in an application,
// so making them fast is critical

/**
 * Three-dimensional vector class. Not a real class in that you can't instantiate one directly - instead use spnr.v(x, y, z).
 * @typedef {Object} Vector
 * @memberof spnr
 * @property {number} x - The x component of the vector
 * @property {number} y - The y component of the vector
 * @property {number} z - The z component of the vector
 */


/**
 * Create a new spnr.js vector
 * @namespace
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {spnr.Vector}
 */
spnr.v = function(x, y, z=0) {
    // simple and (hopefully) fast
    return {x : x, y : y, z : z};
}

/**
 * Set all of the axis of the vector to zero. Modifies the vector.
 * @param {spnr.Vector} v 
 */
spnr.v.makeZero = function(v) {
    v.x = 0;
    v.y = 0;
    v.z = 0;
}

/**
 * Create a new vector with random values inside a certain range. The x val of the new vector will be between min.x and max.x, the same applies for the other axes.
 * @param {spnr.Vector} min - vector containing minimum values for each dimension
 * @param {spnr.Vector} max - vector containing maximum values for each dimension
 * @param {boolean} [floatsAllowed=true] - whether values of the vector can be floats.
 * @returns {spnr.Vector}
 */
spnr.v.random = function(min, max, floatsAllowed=true) {
    if (floatsAllowed) {
        return new spnr.v(spnr.randflt(min.x, max.x),
            spnr.randflt(min.y, max.y),
            spnr.randflt(min.z, max.z));
    }
    else {
        return new spnr.v(spnr.randint(min.x, max.x),
            spnr.randint(min.y, max.y),
            spnr.randint(min.z, max.z));
    }
}

/**
 * Deep copy the vector
 * @param {spnr.Vector} v - vector to copy
 * @returns {spnr.Vector}
 */
spnr.v.copy = function(v) {
    return spnr.v(v.x, v.y, v.z);
}

/**
 * Format a vector as a string, mainly for debugging
 * @param {spnr.Vector} v - vector to format
 * @param {boolean} [verbose=false]
 * @returns {string}
 */
spnr.v.prettyPrint = function(v, verbose=false) {
    if (verbose) {
        return `spnr.v: {x : ${v.x}, y : ${v.y}, z : ${v.z}}`;
    }
    else {
        return `{x:${v.x},y:${v.y},z:${v.z}}`;
    }
}
/**
 * Whether the values of two vectors are equal
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {boolean}
 */
spnr.v.equal = function(v1, v2) {
    return (v1.x == v2.x && v1.y == v2.y && v1.z == v1.z);
}

/**
 * Add v2 to v1. Modifies v1.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 */
spnr.v.add = function(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
}

/**
 * Add v2 to a copy of v1. Doesn't modify v1 or v2.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {spnr.Vector}
 */
spnr.v.copyAdd = function(v1, v2) {
    var v3 = spnr.v(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z);
    return v3;
}

/**
 * Subtract v2 from v1. Modifies v1.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 */
spnr.v.sub = function(v1, v2) {
    v1.x -= v2.x;
    v1.y -= v2.y;
    v1.z -= v2.z;
}

/**
 * Subtract v2 from a copy of v1. Doesn't modify v1 or v2.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {spnr.Vector}
 */
spnr.v.copySub = function(v1, v2) {
    var v3 = spnr.v(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z);
    return v3;
}

/**
 * Multiply a vector by a scalar value. Modifies the vector.
 * @param {spnr.Vector} v 
 * @param {number} amount 
 */
spnr.v.mult = function(v, amount) {
    v.x *= amount;
    v.y *= amount;
    v.z *= amount;
}

/**
 * Multiply a vector by a scalar value. Doesn't modify the vector.
 * @param {spnr.Vector} v 
 * @param {number} amount 
 * @returns {spnr.Vector}
 */
spnr.v.copyMult = function(v, amount) {
    var v2 = spnr.v(
        v.x * amount,
        v.y * amount,
        v.z * amount);
    return v2;
}

/**
 * Divide a vector by a scalar value. Modifies the vector.
 * @param {spnr.Vector} v 
 * @param {number} amount 
 */
spnr.v.div = function(v, amount) {
    v.x /= amount;
    v.y /= amount;
    v.z /= amount;
}

/**
 * Divide a vector by a scalar value. Doesn't modify the vector.
 * @param {spnr.Vector} v 
 * @param {number} amount 
 * @returns {spnr.Vector}
 */
spnr.v.copyDiv = function(v, amount) {
    var v2 = spnr.v(
        v.x / amount,
        v.y / amount,
        v.z / amount);
    return v2;
}

/**
 * Get the magnitude (length) of the vector.
 * @param {spnr.Vector} v 
 * @returns {number}
 */
spnr.v.magSq = function(v) {
    return v.x ** 2 + v.y ** 2 + v.z ** 2;
}

/**
 * Get the magnitude (length) squared of the vector.
 * @param {spnr.Vector} v 
 * @returns {number}
 */
spnr.v.mag = function(v) {
    return spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

/**
 * Get the distance squared between two vectors.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {number}
 */
spnr.v.distSq = function(v1, v2) {
    var displacementX = v2.x - v1.x;
    var displacementY = v2.y - v1.y;
    var displacementZ = v2.z - v1.z;
    return displacementX ** 2 + displacementY ** 2 + displacementZ ** 2;
}

/**
 * Get the distance between two vectors.
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {number}
 */
spnr.v.dist = function(v1, v2) {
    var displacementX = v2.x - v1.x;
    var displacementY = v2.y - v1.y;
    var displacementZ = v2.z - v1.z;
    return spnr.sqrt(displacementX ** 2 + displacementY ** 2 + displacementZ ** 2);
}

/**
 * Find the midpoint of the two vectors
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {Vectors}
 */
spnr.v.mean = function(v1, v2) {
    var halfDisplacementX = (v2.x - v1.x) / 2;
    var halfDisplacementY = (v2.y - v1.y) / 2;
    var halfDisplacementZ = (v2.z - v1.z) / 2;

    return spnr.v(
        v1.x + halfDisplacementX,
        v1.y + halfDisplacementY,
        v1.z + halfDisplacementZ);
}

/**
 * Normalize a vector, settings its magnitude to 1 without affecting rotation. Modifies the vector.
 * @param {spnr.Vector} v
 */
spnr.v.normalize = function(v) {
    var mag = spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
    v.x /= mag;
    v.y /= mag;
    v.z /= mag;
}

/**
 * Return a normalied copy of a vector. Does not modify the original vector.
 * @param {spnr.Vector} v 
 * @returns {spnr.Vector}
 */
spnr.v.copyNormalize = function(v) {
    var mag = spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
    return spnr.v(
        v.x / mag,
        v.y / mag,
        v.z / mag
    );
}

/**
 * Rotate a vector by a certain amount. Modifies the vector
 * @param {spnr.Vector} v 
 * @param {number} angle - angle to rotate the vector by
 * @param {boolean} [useDegrees=false] - whether the angle provided is in degrees or radians. If this value is not provided then defaults to radians.
 */
spnr.v.rotate = function(v, angle=0, useDegrees=false) {
    if (useDegrees) {
        angle /= spnr._180DIVPI;
    }
    
    var cos = spnr.cos(angle);
    var sin = spnr.sin(angle);

    // Assign to a temp variable to avoid messing with the v.x below
    var newX = v.x * cos - v.y * sin;
    // Don't assign to a temp variable because v.y isn't used again
    v.y = v.x * sin + v.y * cos;
    // Read from the temp variable
    v.x = newX;
}

/**
 * Get the heading (direction) of the vector
 * @param {spnr.Vector} v 
 * @param {boolean} [useDegrees=false] - whether to return the angle in radians or degrees. Defaults to radians. 
 * @returns {number}
 */
spnr.v.heading = function(v, useDegrees=false) {
    var heading = spnr.atan2(v.y, v.x);
    if (useDegrees) heading *= spnr._180DIVPI;
    return heading;
}

/**
 * Get the dot product of two vectors
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {number}
 */
spnr.v.dot = function(v1, v2) {
    var result = v1.x * v2.x;
    result += v1.y * v2.y;
    result += v1.z * v2.z;
    return result;
}

/**
 * Get the cross product of two vectors
 * @param {spnr.Vector} v1 
 * @param {spnr.Vector} v2 
 * @returns {spnr.Vector}
 */
spnr.v.cross = function(v1, v2) {
    var crossP = spnr.v(0, 0, 0);
    crossP.x = v1.y * v2.z - v1.z * v2.y;
    crossP.y = v1.z * v2.x - v1.x * v2.z;
    crossP.z = v1.x * v2.y - v1.y * v2.x;
    return crossP;
}

/**
 * Map a vectors components to specific ranges. Modifies the vector.
 * @param {spnr.Vector} v 
 * @param {spnr.Vector} oldMin 
 * @param {spnr.Vector} oldMax 
 * @param {spnr.Vector} newMin 
 * @param {spnr.Vector} newMax 
 */
spnr.v.map = function(v, oldMin, oldMax, newMin, newMax) {
    v.x = spnr.mapNum(v.x, oldMin.x, oldMax.x, newMin.x, newMax.x);
    v.y = spnr.mapNum(v.y, oldMin.y, oldMax.y, newMin.y, newMax.y);
    v.z = spnr.mapNum(v.z, oldMin.z, oldMax.z, newMin.z, newMax.z);
}

/**
 * Return a copy of a vector mapped to a specific range. Doesn't modify the vector.
 * @param {spnr.Vector} v 
 * @param {spnr.Vector} oldMin
 * @param {spnr.Vector} oldMax 
 * @param {spnr.Vector} newMin 
 * @param {spnr.Vector} newMax 
 * @returns 
 */
spnr.v.copyMap = function(v, oldMin, oldMax, newMin, newMax) {
    return spnr.v(
        spnr.mapNum(v.x, oldMin.x, oldMax.x, newMin.x, newMax.x),
        spnr.mapNum(v.y, oldMin.y, oldMax.y, newMin.y, newMax.y),
        spnr.mapNum(v.z, oldMin.z, oldMax.z, newMin.z, newMax.z)
    );
}