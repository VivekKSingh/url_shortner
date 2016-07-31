var sqlLite = require('sqlite3').verbose(),
    db = new sqlLite.Database(':memory:'),
    INITIAL_COUNTER = 10000,
    utils = require('../libs/utils.js'),
    database = module.exports = {};


database.initialize = function () {
   db.serialize(function() {
       db.run("CREATE TABLE urls (id INTEGER, url TEXT, platform TEXT, short_id TEXT)");
       db.run("CREATE TABLE url_counter (counter INTEGER)");
       db.run("INSERT INTO url_counter VALUES (?)", INITIAL_COUNTER);
   });
};

database.createShortUrl = function (request, response) {
    db.get("SELECT * FROM url_counter", function(err, row) {
        var currentCounter = row.counter;
        var shortId = utils.encode(currentCounter);
        console.log(shortId);
        console.log(utils.decode(shortId));
        var updatedUrlCounter = currentCounter + 1;
        var url = request.query.url;
        var platform = request.query.platform;
        insertUrl(updatedUrlCounter, url, platform, shortId, response);
    });
};

database.getOriginalUrl = function (request) {
    db.get("SELECT * FROM urls WHERE short_id = ?", [request.params.shortId], function(err, row) {
        response.redirect(row.url);
    });
}

database.logTable = function() {
    db.each("SELECT * FROM urls", function(err, row) {
        console.log(row.id + ": " + row.short_id + ": " + row.url);
    });
};

function getShortUrl(url, platform, response) {
    db.get("SELECT * FROM urls WHERE url = ? AND platform = ?", [url, platform], function(err, row) {
        response.send("The short url is: " + row.short_id);
    });
}

function insertUrl(urlCounter, url, platform, shortId, response) {
    db.run("SELECT * FROM urls WHERE url = ? AND platform = ?", [url, platform], function(err, row){
        if (row == undefined) {
            db.run("INSERT INTO urls VALUES (?, ?, ?, ?)", urlCounter, url, platform, shortId);
            updateUrlCounter(urlCounter);
            getShortUrl(url, platform, response);
        } else {
            response.send("The short url is: " + "http://localhost:3000/" + row.short_id);
        }
    })
};

function updateUrlCounter(updatedCounter) {
    db.run("UPDATE url_counter SET counter = ?", updatedCounter);
};

