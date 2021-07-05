// You'll notice that a lot of the functions in this file could use the other ones
// But this carries a severe speed penalty, so I've put things inline if that speeds it up
// Vector operations are often the slowest thing in an application,
// so making them fast is critical

spnr.v = function(x, y, z=0) {
    // simple and (hopefully) fast
    return {x : x, y : y, z : z};
}

spnr.v.makeZero = function(v) {
    v.x = 0;
    v.y = 0;
    v.z = 0;
}

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

spnr.v.copy = function(v) {
    return spnr.v(v.x, v.y, v.z);
}

spnr.v.prettyPrint = function(v, verbose=false) {
    if (verbose) {
        return `spnr.v: {x : ${v.x}, y : ${v.y}, z : ${v.z}}`;
    }
    else {
        return `{x:${v.x},y:${v.y},z:${v.z}}`;
    }
}

spnr.v.equal = function(v1, v2) {
    return (v1.x == v2.x && v1.y == v2.y && v1.z == v1.z);
}

spnr.v.add = function(v1, v2) {
    v1.x += v2.x;
    v1.y += v2.y;
    v1.z += v2.z;
}

spnr.v.copyAdd = function(v1, v2) {
    var v3 = spnr.v(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z);
    return v3;
}

spnr.v.sub = function(v1, v2) {
    v1.x -= v2.x;
    v1.y -= v2.y;
    v1.z -= v2.z;
}

spnr.v.copySub = function(v1, v2) {
    var v3 = spnr.v(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z);
    return v3;
}

spnr.v.mult = function(v, amount) {
    v.x *= amount;
    v.y *= amount;
    v.z *= amount;
}

spnr.v.copyMult = function(v, amount) {
    var v2 = spnr.v(
        v.x * amount,
        v.y * amount,
        v.z * amount);
    return v2;
}

spnr.v.div = function(v, amount) {
    v.x /= amount;
    v.y /= amount;
    v.z /= amount;
}

spnr.v.copyDiv = function(v, amount) {
    var v2 = spnr.v(
        v.x / amount,
        v.y / amount,
        v.z / amount);
    return v2;
}

spnr.v.magSq = function(v) {
    return v.x ** 2 + v.y ** 2 + v.z ** 2;
}

spnr.v.mag = function(v) {
    return spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
}

spnr.v.distSq = function(v1, v2) {
    var displacementX = v2.x - v1.x;
    var displacementY = v2.y - v1.y;
    var displacementZ = v2.z - v1.z;
    return displacementX ** 2 + displacementY ** 2 + displacementZ ** 2;
}

spnr.v.dist = function(v1, v2) {
    var displacementX = v2.x - v1.x;
    var displacementY = v2.y - v1.y;
    var displacementZ = v2.z - v1.z;
    return spnr.sqrt(displacementX ** 2 + displacementY ** 2 + displacementZ ** 2);
}

spnr.v.mean = function(v1, v2) {
    var halfDisplacementX = (v2.x - v1.x) / 2;
    var halfDisplacementY = (v2.y - v1.y) / 2;
    var halfDisplacementZ = (v2.z - v1.z) / 2;

    return spnr.v(
        v1.x + halfDisplacementX,
        v1.y + halfDisplacementY,
        v1.z + halfDisplacementZ);
}

spnr.v.normalize = function(v) {
    var mag = spnr.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2)
    v.x /= mag;
    v.y /= mag;
    v.z /= mag;
}

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

spnr.v.heading = function(v, useDegrees=false) {
    var heading = spnr.atan2(v.y, v.x);
    if (useDegrees) heading *= spnr._180DIVPI;
    return heading;
}

spnr.v.dot = function(v1, v2) {
    var result = v1.x * v2.x;
    result += v1.y * v2.y;
    result += v1.z * v2.z;
    return result;
}

spnr.v.cross = function(v1, v2) {
    var crossP = spnr.v(0, 0, 0);
    crossP.x = v1.y * v2.z - v1.z * v2.y;
    crossP.y = v1.z * v2.x - v1.x * v2.z;
    crossP.z = v1.x * v2.y - v1.y * v2.x;
    return crossP;
}