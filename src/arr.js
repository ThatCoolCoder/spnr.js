// Create an empty object to add methods to
spnr.arr = {};

spnr.arr.removeItem = function(array, item) {
    var index = array.indexOf(item);
    if (index == -1) {
        spnr.internalWarn(`Could not remove item ${item} from array as it is not in the array`);
    }
    else {
        spnr.arr.removeIndex(array, index);
    }
}

spnr.arr.removeIndex = function(array, index) {
    if (index < 0 || index >= array.length) {
        spnr.internalWarn(`Could not remove item at ${index} from array as the index is out of bounds`);
    }
    else {
        array.splice(index, 1);
    }
}

spnr.arr.highestIndex = function(array=[]) {
    // Find the index of the highest number in the array
    // (only intended for numbers)

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

spnr.arr.lowestIndex = function(array=[]) {
    // Find the index of the lowest number in the array
    // (only intended for numbers)

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

spnr.arr.choose = function(array=[]) {
    // Choose a random item from the array
    // (only intended for numbers)

    return array[spnr.randint(0, array.length)];
}

spnr.arr.sum = function(array=[]) {
    // Get the total of all of the items in the array added together
    // (only intended for numbers)

    var sum = array.reduce(function(a, b){
        return a + b;
    }, 0);
    return sum;
}

spnr.arr.product = function(array=[]) {
    // Get the total of all of the items in the array multiplied together
    // (only intended for numbers)

    var product = array.reduce(function(a, b){
        return a * b;
    }, 1);
    return product;
}

spnr.arr.mean = function(array=[]) {
    // Get the mean (average) value of all of the items in the array
    // (only intended for numbers)

    var sum = spnr.arr.sum(array);
    var mean = sum / array.length;
    return mean;
}

spnr.arr.median = function(array=[]) {
    // Get the item in the middle of the array
    // (only intended for numbers)

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

spnr.arr.mode = function(array=[]) {
    // Get the most common item(s) in the array
    // Returns an array of the most common items,
    // an empty array if the input is empty
    
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