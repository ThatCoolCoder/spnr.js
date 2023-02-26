
/**
 * 180 divided by pi. Used to convert between degrees and radians (but don't use directly, there are functions for that)
 */
spnr._180DIVPI = 180 / spnr.PI; // speeds up degrees -> radians and vice versa

/**
 * Round a number to an amount of decimal places
 * @param {number} num - Number to round
 * @param {number} [decimalPlaces=0] - Amount of decimal places to round to. If it is zero, rounds to whole number. If it is negative, rounds to a power of 10.
 * @returns {number} rounded number
 */
spnr.round = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.round(numToRound) / 10**decimalPlaces;
}

/**
 * Floor (round down) a number to an amount of decimal places
 * @param {number} num - Number to floor
 * @param {number} [decimalPlaces=0] - Amount of decimal places to floor to. If it is zero, floors to whole number. If it is negative, floors to a power of 10.
 * @returns {number} floored number
 */
spnr.floor = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.floor(numToRound) / 10**decimalPlaces;
}

/**
 * Round up a number to an amount of decimal places
 * @param {number} num - Number to round up
 * @param {number} [decimalPlaces=0] - Amount of decimal places to round to. If it is zero, rounds up to whole number. If it is negative, rounds up to a power of 10.
 * @returns {number} rounded number
 */
spnr.ceiling = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.ceil(numToRound) / 10**decimalPlaces;
}

/**
 * Generate a random float in a given range
 * @param {number} min - lower bound of the range (inclusive)
 * @param {number} max - upper bound of the range (exclusive)
 * @returns {number}
 */
spnr.randflt = function(min, max) {
    var diff = max - min;
    return Math.random() * diff + min;
}

/**
 * Generate a random integer in a given range
 * @param {number} min - lower bound of the range (inclusive)
 * @param {number} max - upper bound of the range (exclusive)
 * @returns {number}
 */
spnr.randint = function(min, max) {
    return Math.floor(spnr.randflt(min, max));
}

/**
 * Calculate sigmoid of a value
 * @param {number} x 
 * @returns {number}
 */
spnr.sigmoid = function(x) {
    // Do sigmoid
    return 1 / (1 + Math.exp(-x)); // f(x) = 1 / (1 + e^(-x))
}

/**
 * Calculate inverse sigmoid of a value
 * @param {number} x 
 * @returns {number}
 */
spnr.invSigmoid = function(x) {
    // Do inverse sigmoid
    return spnr.sigmoid(x) * (1 - spnr.sigmoid(x)); // f'(x) = f(x) * (1 - f(x))
}

/**
 * Convert an angle in radians to degrees
 * @param {number} radians - value to convert
 * @returns {number}
 */
spnr.degrees = function(radians) {
    return radians * spnr._180DIVPI;
}

/**
 * Convert an angle in degrees to radians
 * @param {number} degrees - value to convert
 * @returns {number}
 */
spnr.radians = function(degrees) {
    return degrees / spnr._180DIVPI;
}

/**
 * Calculate the mean of two numbers
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
spnr.mean = function(a, b) {
    return (a + b) / 2;
}

/**
 * Constrain a value to be no lesser than min and no greater than max
 * @param {number} num 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
spnr.constrain = function(num, min, max) {

    return Math.max(min, Math.min(num, max))
}

/**
 * Calculate the factorial of a number. Throws an error if the number is not a positive integer
 * @param {number} num 
 * @returns {number}
 */
spnr.factorial = function(num) {
    if (num <= 0 && num % 1 != 0) throw new Error('Attempted to compute factorial of a number which is not a positive integer');

    var result = 1;
    for (var i = 2; i < num + 1; i ++) {
        result *= i;
    }
    return result;
}

/**
 * Converge a number one step towards a target by taking a step of a certain increment.
 * If num > target, decresases num. If num < target, increases num
 * If the distance to target is less than that increment, returns the target (avoids overshooting)
 * @param {number} num 
 * @param {number} target 
 * @param {number} maxIncrement - maximum value to increment the number by each step.
 * @returns {number} stepped value
 */
spnr.convergeValue = function(num, target, maxIncrement) {
    var delta = target - num;
    if (spnr.abs(delta) > spnr.abs(maxIncrement)) {
        return num + spnr.sign(delta) * spnr.abs(maxIncrement);
    }
    else return num;
}

/**
 * Does not work, do not use
 */
spnr.wrapAround = function(num, min, max) {
    // Make num wrap around from min to max and max to min if it goes over
    // Not complete !FIXME! if num < min is not correct! and it's also wrong if num > max

    var diff = max - min;
    if (num > max) num = num % diff + min;
    if (num < min) num = max;
    return num;
}

/**
 * Map a number from one range to another.
 * @param {number} num - number to map
 * @param {number} oldMin - minimum of old range
 * @param {number} oldMax - maximum of old range
 * @param {number} newMin - minimum of new range
 * @param {number} newMax - maximum of new range
 * @returns {number} the mapped number
 */
spnr.mapNum = function(num, oldMin, oldMax, newMin, newMax) {
    var slope = (newMax -  newMin) / (oldMax - oldMin);
    var output = newMin + slope * (num - oldMin);
    return output;
}