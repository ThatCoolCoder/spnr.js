/**
 * spnr.js string operations
 * @namespace
 */
spnr.str = {};

/**
 * Array of letters in the lowercase ASCII alphabet
 * @type {string[]}
 */
spnr.str.lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
/**
 * Array of letters in the uppercase ASCII alphabet
 * @type {string[]}
 */
spnr.str.upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
/**
 * Array of letters in the lowercase and uppercase ASCII alphabet
 * @type {string[]}
 */
spnr.str.alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
/**
 * Array of digits 0-9 (as strings, not numbers)
 * @type {string[]}
 */
spnr.str.digits = '0123456789'.split('');
/**
 * Array of punctuations in ASCII
 * @type {string[]}
 */
spnr.str.symbols = '~`!@#$%^&*()-_,=+[{]}\\|;:\",<.>/?'.split('');

/**
 * Create a random string from a certain set of letters
 * @param {number} length - length of the string to create
 * @param {string[]} charsToUse - characters to use to create the string
 * @returns {string}
 */
spnr.str.randomFromArray = function(length=1, charsToUse=[]) {
    // Create a random string using the chars in charsToUse
    
    var result = '';
    for (var i = 0; i < length; i ++) {
        result += spnr.arr.choose(charsToUse);
    }
    return result;
}

/**
 * Create a random string.
 * @param {number} length 
 * @param {boolean} lowercaseAllowed - whether lowercase letters will be included in produced string
 * @param {boolean} uppercaseAllowed - whether uppercase letters will be included in produced string
 * @param {boolean} digitsAllowed - whether digits will be included in produced string
 * @param {boolean} symbolsAllowed - whether symbols will be included in produced string
 * @returns {string}
 */
spnr.str.random = function(length=1, lowercaseAllowed=true, uppercaseAllowed=true,
    digitsAllowed=true, symbolsAllowed=true) {
    
    var charsToUse = [];
    if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet);
    if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet);
    if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits);
    if (symbolsAllowed) charsToUse = charsToUse.concat(spnr.str.symbols);

    return spnr.str.randomFromArray(length, charsToUse);
}

/**
 * Create a random string using letters only
 * @param {number} length 
 * @param {boolean} lowercaseAllowed - whether lower case letters will be included in produced string
 * @param {boolean} uppercaseAllowed - whether upper case letters will be included in produced string
 * @returns {string}
 */
spnr.str.randomLetters = function(length=1, lowercaseAllowed=true, uppercaseAllowed=true) { 
    var charsToUse = spnr.str.symbols;
    if (lowercaseAllowed) charsToUse = charsToUse.concat(spnr.str.lowerAlphabet);
    if (uppercaseAllowed) charsToUse = charsToUse.concat(spnr.str.upperAlphabet);
    
    return spnr.str.randomFromArray(length, charsToUse);
}

/**
 * Generate a string of random symbols and optionally numbers
 * @param {number} length 
 * @param {boolean} digitsAllowed - whether to include digits in the produced string 
 * @returns {string}
 */
spnr.str.randomSymbols = function(length=1, digitsAllowed=false) { 
    var charsToUse = spnr.str.symbols;
    if (digitsAllowed) charsToUse = charsToUse.concat(spnr.str.digits);
    
    return spnr.str.randomFromArray(length, charsToUse);
}

/**
 * Generate a random string of digits.
 * @param {number} length 
 * @returns {string}
 */
spnr.str.randomDigits = function(length=1) {
    return spnr.str.randomFromArray(length, spnr.str.digits);
}

/**
 * Break ("safen") HTML tags so that they won't do bad things when displayed in the DOM.
 * Adds invisible characters after all opening tags.
 * @param {string} str - string containing tags to break
 * @returns {string}
 */
spnr.str.breakHtmlTags = function(str) {
    return str.replace(/</g, '<\u200c');
}

/**
 * Repeat a string a certain amount of times. Was created before I know what ''.repeat was. Only kept for backwards compabitility
 * @param {string} str - string to repeat
 * @param {number} amount - amount of times to repeat something
 * @returns {string}
 */
spnr.str.mult = function(str, amount) {
    // return str repeated amount times
    var result = '';
    for (var i = 0; i < amount; i ++) {
        result += str;
    }
    return result;
}

/**
 * Replace all instances of a substring in a string. If String.replaceAll is found it will use that. Otherwise it will use a workaround.
 * @param {string} str - string to replace in.
 * @param {string|RegExp} pattern - string or regex to find bits to replace.
 * @param {string} replacement - string to insert into issues.
 * @returns {string} 
 */
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

/**
 * Return a shuffled copy of the string
 * @param {string} str 
 * @returns 
 */
spnr.str.shuffle = function(str) {
    return spnr.arr.shuffle(str.split('')).join('');
}