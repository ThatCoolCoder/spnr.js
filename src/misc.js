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

spnr.doNTimes = function(n, func) {
    // Run func n times, with the loop counter as a parameter
    for (var i = 0; i < n; i ++) {
        func(i);
    }
}