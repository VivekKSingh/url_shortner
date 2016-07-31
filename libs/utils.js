var utils = module.exports = {};

var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
var base = alphabet.length

utils.encode = function(input) {
    if (input === 0) { return alphabet[0]; }
    var encodedString = ''
    while(input > 0) {
        encodedString += alphabet[input % base];
        input = parseInt(input / base, 10);
    }
    return encodedString.split("").reverse().join("")
}

utils.decode = function(inputString) {
    var i = 0;
    for (c in inputString) {
      i = i * base + alphabet.indexOf(c);
    }
    return i;
}
