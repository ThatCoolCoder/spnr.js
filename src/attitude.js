spnr.attitude = function(heading, pitch, roll) {
    return {heading : heading, pitch : pitch, roll : roll};
}

spnr.attitude.copy = function(a) {
    return spnr.attitude(a.heading, a.pitch, a.roll);
}

spnr.attitude.add = function(a1, a2) {
    a1.heading += a2.heading;
    a1.pitch += a2.pitch;
    a1.roll += a2.roll;
}

spnr.attitude.copyAdd = function(a1, a2) {
    var a3 = spnr.attitude.copy(a1);
    spnr.attitude.add(a3, a2);
    return a3;
}

spnr.attitude.sub = function(a1, a2) {
    a1.heading -= a2.heading;
    a1.pitch -= a2.pitch;
    a1.roll -= a2.roll;
}

spnr.attitude.copySub = function(a1, a2) {
    var a3 = spnr.attitude.copy(a1);
    spnr.attitude.sub(a3, a2);
    return a3;
}

spnr.attitude.mult = function(a, amount) {
    a.heading *= amount;
    a.pitch *= amount;
    a.roll *= amount;
}

spnr.attitude.copyMult = function(a, amount) {
    var a2 = spnr.attitude.copy(a);
    spnr.attitude.mult(a2, amount);
    return a2;
}

spnr.attitude.div = function(a, amount) {
    a.heading /= amount;
    a.pitch /= amount;
    a.roll /= amount;
}

spnr.attitude.copyDiv = function(a, amount) {
    var a2 = spnr.attitude.copy(a);
    spnr.attitude.div(a2, amount);
    return a2;
}