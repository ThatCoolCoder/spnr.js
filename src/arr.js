/** spnr.js array operations
 * @namespace
 */
spnr.arr = {};

/** Remove first instance of item from array. If item is not found, writes warning in console.
 * @param {Array} array - array to edit
 * @param {any} item - item to search for and remove
 */
spnr.arr.removeItem = function(array, item) {
    var index = array.indexOf(item);
    if (index == -1) {
        spnr.internalWarn(`Could not remove item ${item} from array as it is not in the array`);
    }
    else {
        spnr.arr.removeIndex(array, index);
    }
}

/** Remove item at index from array
 * @param {Array} array - array to edit
 * @param {number} index - index of item to remove
 */
spnr.arr.removeIndex = function(array, index) {
    if (index < 0 || index >= array.length) {
        spnr.internalWarn(`Could not remove item at ${index} from array as the index is out of bounds`);
    }
    else {
        array.splice(index, 1);
    }
}

/** Find the index of the highest item in the array. If there are multiple equal highest items, returns the index of the last one.
 * @param {number[]} array - array to search in
 * @return {number} the index of the highest item.
 */
spnr.arr.highestIndex = function(array=[]) {
    var highestIdx = null;
    var highestItem = 0;
    array.forEach((item, i) => {
        if (item >= highestItem) {
            highestItem = item;
            highestIdx = i;
        }
    });
    return highestIdx;
}

/**  Find the index of the lowest item in the array. If there are multiple equal lowest items, returns the index of the last one.
 * @param {number[]} array - array to search in
 * @return {number} the index of the lowest item.
 */
spnr.arr.lowestIndex = function(array=[]) {
    var lowestIdx = null;
    var lowestItem = 0;
    array.forEach((item, i) => {
        if (item <= lowestItem) {
            lowestItem = item;
            lowestIdx = i;
        }
    });
    return lowestIdx;
}

/** Choose a random item from the array
 * @param {Array} array - array to choose from
 * @returns {any} a random item
 */
spnr.arr.choose = function(array=[]) {
    return array[spnr.randint(0, array.length)];
}

/** Get the sum of the items in the array
 * @param {number[]} array - array to sum
 * @returns {number} sum of the values in the array
 */
spnr.arr.sum = function(array=[]) {
    var sum = array.reduce(function(a, b){
        return a + b;
    }, 0);
    return sum;
}

/** Get the product (multiplied values) of the items in the array
 * @param {number[]} array - array to multiply
 * @returns {number} product of the values in the array
 */
spnr.arr.product = function(array=[]) {
    var product = array.reduce(function(a, b){
        return a * b;
    }, 1);
    return product;
}

/** Get the mean (average) of the items in the array
 * @param {number[]} array - array to average
 * @returns {number} mean of the values in the array
 */
spnr.arr.mean = function(array=[]) {
    var sum = spnr.arr.sum(array);
    var mean = sum / array.length;
    return mean;
}

/** Get the median (middle value) of the array. If the array has even length, return the mean of the two central elements.
 * @param {number[]} array - array to average
 * @returns {number} median of the values in the array
 */
spnr.arr.median = function(array=[]) {
    // If it's even find the two middle numbers and find their mean
    if (array.length % 2 == 0) {
        var justBelowMiddle = array[array.length / 2 - 1];
        var justOverMiddle = array[array.length / 2];
        return spnr.mean(justBelowMiddle, justOverMiddle);
    }
    // If it's odd find the middle index
    else {
        var middleIndex = array.length / 2 - 0.5;
        return array[middleIndex];
    }
}

/** Get the mode (most common value(s)) of the array. Returns an array of most common values, in case there are multiple modal values
 * @param {any[]} array - array to average
 * @returns {any[]} array of the most common items. If input array is empty, an empty array
 */
spnr.arr.mode = function(array=[]) {
    
    // Because objects can't be used as object keys,
    // use two arrays to emulate an object
    var commonalityKeys = [];
    var commonalityValues = [];
    for (var item of array) {
        if (commonalityKeys.includes(item)) {
            commonalityValues[commonalityKeys.indexOf(item)] ++;
        }
        else {
            commonalityKeys.push(item);
            commonalityValues.push(1);
        }
    }

    var highestCommonalityItems = [];
    var highestCommonality = 0;
    for (var idx = 0; idx < commonalityValues.length; idx ++) {
        var commonalityValue = commonalityValues[idx];
        if (commonalityValue > highestCommonality) {
            highestCommonality = commonalityValue;
            highestCommonalityItems = [];
        }
        if (commonalityValue == highestCommonality) {
            highestCommonalityItems.push(commonalityKeys[idx]);
        }
    }
    return highestCommonalityItems;
}