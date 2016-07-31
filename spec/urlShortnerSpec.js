var request = require("request");
var utils = require("../libs/utils.js");
var config = require("../libs/config.js")
var base_url = config.webhost + ":" + config.webport

describe("Url Shortner", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("GET /shorten", function() {
    it("returns a shortened url", function() {
        request.get(base_url, function(error, response, body) {
            expect(response).toBe();
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