spnr._180DIVPI = 180 / spnr.PI; // speeds up degrees -> radians and vice versa

spnr.round = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.round(numToRound) / 10**decimalPlaces;
}

spnr.floor = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.floor(numToRound) / 10**decimalPlaces;
}

spnr.ceiling = function(num, decimalPlaces=0) {
    var numToRound = num * 10**decimalPlaces;
    return Math.ceil(numToRound) / 10**decimalPlaces;
}

spnr.randflt = function(min, max) {
    // Create a random float between min and max [min, max)
    var diff = max - min;
    return Math.random() * diff + min;
}

spnr.randint = function(min, max) {
    // Create a random integer between min and max [min, max)
    return Math.floor(spnr.randflt(min, max));
}

spnr.sigmoid = function(x) {
    // Do sigmoid
    return 1 / (1 + Math.exp(-x)); // f(x) = 1 / (1 + e^(-x))
}

spnr.invSigmoid = function(x) {
    // Do inverse sigmoid
    return spnr.sigmoid(x) * (1 - spnr.sigmoid(x)); // f'(x) = f(x) * (1 - f(x))
}

spnr.degrees = function(radians) {
    // Convert an angle in radians to degrees

    return radians * spnr._180DIVPI;
}

spnr.radians = function(degrees) {
    // Convert an angle in degrees to radians

    return degrees / spnr._180DIVPI;
}

spnr.mean = function(a, b) {
    return (a + b) / 2;
}

spnr.constrain = function(num, min, max) {
    // Constrain num between min and max

    return Math.max(min, Math.min(num, max))
}

spnr.convergeValue = function(num, target, maxIncrement) {
    // Converge num towards target by taking a step of size maxIncrement
    // If the distance to target is less than maxIncrement, num is set to target

    var delta = target - num;
    if (spnr.abs(delta) > spnr.abs(maxIncrement)) {
        return num + spnr.sign(delta) * spnr.abs(maxIncrement);
    }
    else return num;
}

spnr.wrapAround = function(num, min, max) {
    // Make num wrap around from min to max and max to min if it goes over
    // Not complete !FIXME! if num < min is not correct! and it's also wrong if num > max

    var diff = max - min;
    if (num > max) num = num % diff + min;
    if (num < min) num = max;
    return num;
}

spnr.mapNum = function(num, oldMin, oldMax, newMin, newMax) {
    // Map num from the range [oldMin, oldMax] to the range [newMin, newMaxs]
    var slope = (newMax -  newMin) / (oldMax - oldMin);
    var output = newMin + slope * (num - oldMin);
    return output;
}