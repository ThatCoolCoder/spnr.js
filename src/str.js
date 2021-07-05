spnr.str = {};

spnr.str.lowerAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

spnr.str.upperAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

spnr.str.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

spnr.str.symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
    '=', '+', '[', '{', ']', '}', '\\', '|', ';', ':', '\'', '"', ',', '<', '.', '>', '/', '?'];

spnr.str.randomFromArray = function(length=1, charsToUse=[]) {
    // Create a random string using the chars in charsToUse
    
    var result = '';
    for (var i = 0; i < length; i ++) {
        result += spnr.arr.choose(charsToUse);
    }
    return result;
}

spnr.str.random = function(length=1, lowercaseAllowed=true, uppercaseAllowed=true,
    digitsAllowed=true, symbolsAllowed=true) {
    
    var charsToUse = [];
    if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet);
    if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet);
    if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits);
    if (symbolsAllowed) charsToUse = charsToUse.concat(spnr.str.symbols);

    return spnr.str.randomFromArray(length, charsToUse);
}

spnr.str.randomLetters = function(length=1, lowercaseAllowed=true, uppercaseAllowed=true) { 
    var charsToUse = spnr.str.symbols;
    if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet);
    if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet);
    
    return spnr.str.randomFromArray(length, charsToUse);
}

spnr.str.randomSymbols = function(length=1, digitsAllowed=false) { 
    var charsToUse = spnr.str.symbols;
    if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits);
    
    return spnr.str.randomFromArray(length, charsToUse);
}

spnr.str.randomDigits = function(length=1) {
    return spnr.str.randomFromArray(length, spnr.str.digits);
}

spnr.str.breakHtmlTags = function(str) {
    return str.replace(/</g, '<\u200c');
}

spnr.str.mult = function(str, amount) {
    // return str repeated amount times
    var result = '';
    for (var i = 0; i < amount; i ++) {
        result += str;
    }
    return result;
}

spnr.str.replaceAll = function(str, pattern, replacement='') {
    // If string.replaceAll is supported, use it
    if (typeof str.replaceAll == 'function') {
        return str.replaceAll(pattern, replacement);
    }
    // Else do it the lazy way
    else {
        while (str.includes(pattern)) {
            str = str.replace(pattern, replacement);
        }
        return str;
    }
}