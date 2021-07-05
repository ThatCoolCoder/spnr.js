spnr.uniqueId = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + spnr.random().toString(36).substr(2, 9);
}

spnr.randBoolean = function() {
    // Randomly return true or false

    return spnr.random() > 0.5;
}

spnr.doNothing = function() {
    // do nothing
}

spnr.constrain = function(num, min, max) {
    // Constrain num between min and max

    return Math.max(min, Math.min(num, max))
}

spnr.wrapAround = function(num, min, max) {
    // Make num wrap around from min to max and max to min if it goes over
    // Not complete !FIXME! if num < min is not correct! and it's also wrong if num > max

    var diff = max - min;
    if (num > max) num = num % diff + min;
    if (num < min) num = max;
    return num;
}

spnr.doNTimes = function(n, func) {
    // Run func n times, with the loop counter as a parameter
    for (var i = 0; i < n; i ++) {
        func(i);
    }
}

spnr.mapNum = function(num, oldMin, oldMax, newMin, newMax) {
    // Map num from the range [oldMin, oldMax] to the range [newMin, newMaxs]
    var slope = (newMax -  newMin) / (oldMax - oldMin);
    var output = newMin + slope * (num - oldMin);
    return output;
}