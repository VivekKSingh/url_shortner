var database = require("../libs/db.js");

var appRouter = function(app, utils) {

    app.get('/shorten', function (req, res) {
       database.createShortUrl(req, res)
    });

    app.get('/get/allShortUrls', function(req, res) {
       database.logTable();
    })

    app.get('/:shortId', function(req, res){
       database.getOriginalUrl(req);
    });
}

module.exports = appRouter;