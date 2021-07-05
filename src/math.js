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

// Should this be in math? !FIXME
spnr.mean = function(a, b) {
    return (a + b) / 2;
}