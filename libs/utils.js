var utils = module.exports = {},
    reader = require('pyspreadsheet').SpreadsheetReader,
    MongoClient = require('mongodb').MongoClient,
    MONGO_URL = 'mongodb://localhost:27017/AppNexus',
    mongoose = require('mongoose').connect(MONGO_URL),
    RateLimiter = require('limiter').RateLimiter,
    limiter = new RateLimiter(1, 1000);

var Client = require('./client')
appNexusClient = new Client("vsingh", "D3vilM@yCry");

var publisherSchema = new mongoose.Schema(
    {
        adTag: String,
        adTagName: String,
        totalRevenue: String,
        name: String,
        currency: String,
        code: Number,
        expose_domains: Boolean,
        reselling_exposure: String,
        ad_quality_advanced_mode_enabled: Boolean,
        managed_cpc_bias_pct: Number,
        managed_cpa_bias_pct: Number,
        processed: Boolean
    }
);

var PublisherModel = mongoose.model('publishers', publisherSchema);
var publisherQuery = PublisherModel.find({ processed: false });

utils.parseExcelAndInsertPublishersInMongo = function(sheetPath, collectionName, res) {
  var databaseObjects = Array();

  reader.read(sheetPath, function (err, workbook) {
    console.log(workbook.sheets[0].name);
    workbook.sheets[0].rows.forEach(function(row) {
      var databaseObject = {
        name: row[1].value,
        currency: "USD",
        code: row[0].value,
        expose_domains: true,
        reselling_exposure: "public",
        ad_quality_advanced_mode_enabled: true,
        managed_cpc_bias_pct: 100,
        managed_cpa_bias_pct: 100,
        processed: false
      };
      databaseObjects.push(databaseObject);
    });

    mongoInsert(databaseObjects, collectionName, res);
  });
};

var placementSchema = new mongoose.Schema(
    {
        name: String,
        code: Number,
        state: String,
        height: Number,
        width: Number
    }
);

var PlacementModel = mongoose.model('placements', publisherSchema);
var placementQuery = PlacementModel.find({ processed: false });

utils.parseExcelAndInsertPlacementsInMongo = function(sheetPath, collectionName, res) {
    var databaseObjects = Array();

    reader.read(sheetPath, function (err, workbook) {
        console.log(workbook.sheets[1].name);
        workbook.sheets[1].rows.forEach(function(row) {
            var databaseObject = {
                adTag: row[2].value,
                adTagName: row[3].value,
                totalRevenue: row[5].value,
                name: row[1].value,
                currency: "USD",
                code: row[0].value,
                expose_domains: true,
                reselling_exposure: "public",
                ad_quality_advanced_mode_enabled: true,
                managed_cpc_bias_pct: 100,
                managed_cpa_bias_pct: 100,
                processed: false
            };
            databaseObjects.push(databaseObject);
        });

        mongoInsert(databaseObjects, collectionName, res);
    });
};

var createPublisher = function(appNexusClient, publisher) {
  appNexusClient.addPublisher(publisher, function(err, publisher){
    limiter.removeTokens(1, function() {
      publisher.addPublisher(function(err, data){
        console.log(err);
      });
    });
  });
};

var createPlacementForAPublisher = function(appNexusClient, publisher) {
  appNexusClient.createPlacement(publisher, function(err, placement) {
    placement.create(function(err, data) {
      console.log(data)
    })
  })
};

// Appnexus has a 60 req / minute limit for api requests.
utils.createPublishers = function(res) {
  var publisherPromise = publisherQuery.exec();
  // var publishersArray = [];
  publisherPromise.then(function(publisherArray) {
    publisherArray.forEach(function(publisherObject) {
      var publisher = {
        name: publisherObject.name,
        currency: publisherObject.currency,
        code: publisherObject.code,
        expose_domains: publisherObject.expose_domains,
        reselling_exposure: publisherObject.reselling_exposure,
        ad_quality_advanced_mode_enabled: publisherObject.ad_quality_advanced_mode_enabled,
        managed_cpc_bias_pct: publisherObject.managed_cpc_bias_pct,
        managed_cpa_bias_pct: publisherObject.managed_cpa_bias_pct
      };
      // publishersArray.push(publisher);
      createPublisher(appNexusClient, publisher);
    });
    res.send("Publishers created on AppNexus");
  })
};

var mongoInsert = function(data, collectionName, res) {
  MongoClient.connect(MONGO_URL, function(err, db) {
    console.log("Connected correctly to server");
    var collection = db.collection(collectionName);

    collection.insert(data, function(err, result) {
      db.close();
    });

    res.send("Data inserted");
  });
};

utils.extractHeightAndWidthFromString = function(inputString) {
    var WidthAndHeight = inputString.split("x")
    return WidthAndHeight
};
