var request = require("request");
var utils = require("../libs/utils.js");
var base_url = "http://localhost:3000/"

describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });
});

describe("Decode", function() {
    it("returns original number after decoding", function() {
        var originalNumber = 10001;
        var resultString = utils.encode(originalNumber);
        var decodedNumber = utils.decode(resultString);
        expect(decodedNumber).toBe(originalNumber);
    });
});