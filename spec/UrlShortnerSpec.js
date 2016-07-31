var frisby = require('frisby');
var utils = require("../libs/utils.js");

// Long url sent to the /shorten endpoint returns a short url.
frisby.create('GET back short url from a url')
  .get('http://localhost:5656/shorten?url=http://google.com&platform=desktop')
  .after(function(err, res, body) {
      // Get request to a short url leads to its long url.
      frisby.create('Redirect to original url when provided a short url')
        .get('http://localhost:5656/cLs', {followRedirect: false})
        .expectStatus(302)
        .expectHeaderContains('location', "http://google.com")
      .toss()
   })
  .expectStatus(200)
  .expectJSON({ success: true, shortUrl: "http://localhost:5656/cLs"})
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
