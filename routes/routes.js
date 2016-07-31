var database = require("../libs/db.js");

var appRouter = function(app, utils) {

    app.get('/shorten', function (req, res) {
       database.createShortUrl(req, res)
    });

    app.get('/all/shorturls', function(req, res) {
       database.getAllShortUrls(res);
    })

    app.get('/:shortId', function(req, res){
       database.getOriginalUrl(req, res);
    });
}

module.exports = appRouter;