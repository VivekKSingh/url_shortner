var database = require("../libs/db.js");

var appRouter = function(app, utils) {

    // handle HTTP GET request to shorten a url.
    app.get('/shorten', function (req, res) {
       database.createShortUrl(req, res)
    });

    // handle HTTP GET request to display all short urls.
    app.get('/all/shorturls', function(req, res) {
       database.getAllShortUrls(res);
    })

    // handle HTTP GET request to redirect a short url to its original url.
    app.get('/:shortId', function(req, res){
       database.getOriginalUrl(req, res);
    });
}

module.exports = appRouter;