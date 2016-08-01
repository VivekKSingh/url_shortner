/*
    Files for database Operations.
*/

var sqlLite = require('sqlite3').verbose(),
    db = new sqlLite.Database(':memory:'),
    utils = require('../libs/utils.js'),
    config = require('../libs/config.js'),
    database = module.exports = {};

// Initializes the database with required tables and initial data.
database.initialize = function () {
   db.serialize(function() {
       db.run("CREATE TABLE urls (id INTEGER, url TEXT, platform TEXT, short_url TEXT)");
       db.run("CREATE TABLE url_counter (counter INTEGER)");
       db.run("INSERT INTO url_counter VALUES (?)", config.initialCounter);
   });
};

// Inserts a url to the database with a shortId.
database.createShortUrl = function (url, platform, response) {
    db.get("SELECT * FROM url_counter", function(err, row) {
        var currentCounter = row.counter;
        var updatedUrlCounter = currentCounter + 1;
        var shortId = utils.encode(updatedUrlCounter);
        var shortUrl = createShortUrlString(shortId)
        insertUrl(updatedUrlCounter, url, platform, shortUrl, response);
    });
};

// Redirects to original url by looking up on the short url else redirects to home page.
database.getOriginalUrl = function (shortId, response) {
    var id = utils.decode(shortId)
    db.get("SELECT * FROM urls WHERE id = ?", id, function(err, row) {
        if(row == undefined) {
            response.redirect("/")
        } else {
            response.redirect(row.url);
        }
    });
};

// Returns an array of all short urls in the database
database.getAllShortUrls = function (response) {
    db.all("SELECT * FROM urls", function(err, rows) {
        if (rows.length > 0) {
            response.json(rows);
        } else {
            response.redirect("/")
        }
    });
}

// Returns shortUrl if one exists for the url and platform combination.
function getShortUrl(id, response) {
    db.get("SELECT * FROM urls WHERE id = ?", id, function(err, row) {
        if (row == undefined) {
            response.json( { success: false } );
        } else {
            response.json( { success: true, "shortUrl": row.short_url} );
        }
    });
};

// Inserts a url into the urls table if does not exist else returns existing shortUrl.
function insertUrl(urlCounter, url, platform, shortUrl, response) {
    db.get("SELECT * FROM urls WHERE url = ? AND platform = ?", [url, platform], function(err, row){
        if (row == undefined) {
            db.run("INSERT INTO urls VALUES (?, ?, ?, ?)", [urlCounter, url, platform, shortUrl], function (err) {
                if (err == null) {
                   updateUrlCounter(urlCounter);
                } else {
                   response.json({ success: false})
                }
            });
            getShortUrl(urlCounter, response);
        } else {
            response.json({success: true, "shortUrl": row.short_url});
        }
    })
};

// Updates counter for creating short url.
function updateUrlCounter(updatedCounter) {
    db.run("UPDATE url_counter SET counter = ?", updatedCounter);
};

// Generates short url.
function createShortUrlString(shortId) {
    return config.webhost + ":" + config.webport + "/" + shortId;
};
