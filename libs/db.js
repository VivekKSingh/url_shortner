var sqlLite = require('sqlite3').verbose(),
    db = new sqlLite.Database(':memory:'),
    utils = require('../libs/utils.js'),
    config = require('../libs/config.js'),
    database = module.exports = {};


database.initialize = function () {
   db.serialize(function() {
       db.run("CREATE TABLE urls (id INTEGER, url TEXT, platform TEXT, short_id TEXT)");
       db.run("CREATE TABLE url_counter (counter INTEGER)");
       db.run("INSERT INTO url_counter VALUES (?)", config.initialCounter);
   });
};

database.createShortUrl = function (request, response) {
    db.get("SELECT * FROM url_counter", function(err, row) {
        var currentCounter = row.counter;
        var shortId = utils.encode(currentCounter);
        var updatedUrlCounter = currentCounter + 1;
        var url = request.query.url;
        var platform = request.query.platform;
        insertUrl(updatedUrlCounter, url, platform, shortId, response);
    });
};

database.getOriginalUrl = function (request, response) {
    db.get("SELECT * FROM urls WHERE short_id = ?", [request.params.shortId], function(err, row) {
        if(row == undefined) {
            response.redirect("/")
        } else {
            response.redirect(row.url);
        }
    });
};

database.getAllShortUrls = function (response) {
    db.all("SELECT * FROM urls", function(err, rows) {
        if (rows.length > 0) {
            response.json(rows);
        } else {
            response.redirect("/")
        }
    });
}

function getShortUrl(url, platform, response) {
    db.get("SELECT * FROM urls WHERE url = ? AND platform = ?", [url, platform], function(err, row) {
        if (row == undefined) {
            response.json( { success: false } );
        } else {
            response.json( { success: true, "shortUrl": createShortUrlString(row.short_id)} );
        }
    });
};

function insertUrl(urlCounter, url, platform, shortId, response) {
    db.get("SELECT * FROM urls WHERE url = ? AND platform = ?", [url, platform], function(err, row){
        if (row == undefined) {
            db.run("INSERT INTO urls VALUES (?, ?, ?, ?)", [urlCounter, url, platform, shortId], function (err) {
                if (err == null ) {
                   updateUrlCounter(urlCounter);
                } else {
                   response.json({ success: false})
                }
            });
            getShortUrl(url, platform, response);
        } else {
            response.json({success: true, "shortUrl": createShortUrlString(row.short_id)});
        }
    })
};

function updateUrlCounter(updatedCounter) {
    db.run("UPDATE url_counter SET counter = ?", updatedCounter);
};

function createShortUrlString(shortId) {
    return config.webhost + ":" + config.webport + "/" + shortId;
};
