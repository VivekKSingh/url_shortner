var request = require("request");
var frisby = require('frisby');
var utils = require("../libs/utils.js");
var config = require("../libs/config.js");
var db = require("../libs/db.js");

// Long url sent to the /shorten endpoint returns a short url.
frisby.create('GET back short url from a url')
  .get('http://localhost:5656/shorten?url=http://google.com&platform=desktop')
  .expectStatus(200)
  .expectJSON({ success: true, shortUrl: "http://localhost:5656/cL7"})
.toss();

// Short url navigates to the original url.
frisby.create('Redirect to original url when provided a short url')
  .get('http://localhost:5656/cL7')
  .expectStatus(200)
.toss();

// Test for decode and encode utility functions for creating short urls.
describe("Decode", function() {
    it("returns original number after decoding", function() {
        var originalNumber = 10001;
        var resultString = utils.encode(originalNumber);
        var decodedNumber = utils.decode(resultString);
        expect(decodedNumber).toBe(originalNumber);
    });
});
