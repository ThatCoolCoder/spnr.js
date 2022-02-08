/**
 * Type representing Euler angles.
 * @typedef {Object} Attitude
 * @property {number} heading - The heading of the attitude 
 * @property {number} pitch - The pitch of the attitude
 * @property {number} roll - The roll of the attitude
 */

/**
 * Create a new attitude (Euler angles) object.
 * @namespace
 * @param {number} heading - heading of the new attitude
 * @param {number} pitch - heading of the new attitude
 * @param {number} roll - heading of the new attitude
 * @returns {Attitude}
 */
spnr.attitude = function(heading, pitch, roll) {
    return {heading : heading, pitch : pitch, roll : roll};
}

/**
 * Deep-copy an attitude object
 * @param {Attitude} a 
 * @returns {Attitude}
 */
spnr.attitude.copy = function(a) {
    return spnr.attitude(a.heading, a.pitch, a.roll);
}

/**
 * Add the components of a2 to a1. Modifies a1
 * @param {Attitude} a1 
 * @param {Attitude} a2 
 */
spnr.attitude.add = function(a1, a2) {
    a1.heading += a2.heading;
    a1.pitch += a2.pitch;
    a1.roll += a2.roll;
}

/**
 * Add the components of a2 to a1. Doesn't modify either attitude
 * @param {Attitude} a1 
 * @param {Attitude} a2
 * @returns {Attitude} a new attitude equalling a1 + a2
 */
spnr.attitude.copyAdd = function(a1, a2) {
    var a3 = spnr.attitude.copy(a1);
    spnr.attitude.add(a3, a2);
    return a3;
}

/**
 * Subtract the components of a2 from a1. Modifies a1
 * @param {Attitude} a1 
 * @param {Attitude} a2 
 */
spnr.attitude.sub = function(a1, a2) {
    a1.heading -= a2.heading;
    a1.pitch -= a2.pitch;
    a1.roll -= a2.roll;
}

/**
 * Subtract the components of a2 from a1. Doesn't modify either attitude
 * @param {Attitude} a1 
 * @param {Attitude} a2
 * @returns {Attitude} a new attitude equalling a1 - a2
 */
spnr.attitude.copySub = function(a1, a2) {
    var a3 = spnr.attitude.copy(a1);
    spnr.attitude.sub(a3, a2);
    return a3;
}

/**
 * k an attitude by a scalar value. Modifies a.
 * @param {Attitude} a 
 * @param {number} amount 
 */
spnr.attitude.mult = function(a, amount) {
    a.heading *= amount;
    a.pitch *= amount;
    a.roll *= amount;
}

/**
 * Multiply an attitude by a scalar value. Doesn't modify a.
 * @param {Attitude} a 
 * @param {number} amount 
 * @returns {Attitude} a new attitude equalling a * amount
 */
spnr.attitude.copyMult = function(a, amount) {
    var a2 = spnr.attitude.copy(a);
    spnr.attitude.mult(a2, amount);
    return a2;
}

/**
 * Divide an attitude by a scalar value. Modifies a.
 * @param {Attitude} a 
 * @param {number} amount 
 */
spnr.attitude.div = function(a, amount) {
    a.heading /= amount;
    a.pitch /= amount;
    a.roll /= amount;
}

/**
 * Divide an attitude by a scalar value. Doesn't modify a.
 * @param {Attitude} a 
 * @param {number} amount 
 * @returns {Attitude} a new attitude equalling a / amount
 */
spnr.attitude.copyDiv = function(a, amount) {
    var a2 = spnr.attitude.copy(a);
    spnr.attitude.div(a2, amount);
    return a2;
}