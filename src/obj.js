spnr.obj = {};

spnr.obj.keys = function(obj) {
    return Object.keys(obj);
}

spnr.obj.values = function(obj) {
    return Object.values(obj);
}

spnr.obj.setValues = function(obj, values) {
    // change the values of an object without changing the keys
    // assumes that keys and values are same length, etc
    var keys = spnr.obj.keys(obj);
    keys.forEach((key, i) => {
        obj[key] = values[i];
    });
}

spnr.obj.oneLevelCopy = function(obj) {
    var newObj = {};
    var keys = spnr.obj.keys(obj);
    keys.forEach(key => {
        newObj[key] = obj[key];
    });
    return newObj;
}