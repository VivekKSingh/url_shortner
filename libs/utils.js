/*
    Utility functions for the application.
*/

var utils = module.exports = {};

var seed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("")
var base = seed.length

// Function to encode a number and generate a shortId
utils.encode = function(input) {
    if (input === 0) { return seed[0]; }
    var encodedString = ''
    while(input > 0) {
        encodedString += seed[input % base];
        input = parseInt(input / base, 10);
    }
    return encodedString.split("").reverse().join("")
}

// Function to decode a shortId string and get back the original number.
utils.decode = function (inputString) {
    var decodedString = 0;
    while (inputString){
        var index = seed.indexOf(inputString[0]);
        decodedString += index * (Math.pow(base, inputString.length - 1));
        inputString = inputString.substring(1);
    }
    return decodedString;
}
