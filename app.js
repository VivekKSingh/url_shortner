var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    Client = require('./libs/client'),
    utils = require('./libs/utils');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/getPublisher/:publisherId', function(req, res) {
  var appNexusClient = new Client("vsingh", "D3vilM@yCry");

  var publisher = {
    id: req.params.publisherId
  };

  appNexusClient.getPublisher(publisher, function(err, publisher){
    publisher.getInfo(function(err, data){
      res.json(data);
    })
 });
});

app.get('/createPublisher', function(req, res) {
  res.render('publisher/createForm');
});

app.get('/createPlacement', function(req, res) {
    res.render('publisher/createPlacementForm');
});

app.post('/createPublisher', function(req, res) {
  var appNexusClient = new Client("vsingh", "D3vilM@yCry");
  var newPublisher = {
    name: req.body.name,
    currency: "USD",
    code: req.body.code,
    expose_domains: true,
    reselling_exposure: "public",
    ad_quality_advanced_mode_enabled: true,
    managed_cpc_bias_pct: 100,
    managed_cpa_bias_pct: 100
  };

  appNexusClient.addPublisher(newPublisher, function(err, publisher){
    publisher.addPublisher(function(err, data){
      req.params.data = data
      res.redirect('/createSuccess')
    })
  });
});

app.post('/createPlacement', function(req, res) {
    var appNexusClient = new Client("vsingh", "D3vilM@yCry");
    var heightAndWidth = utils.extractHeightAndWidthFromString(req.body.size);

    var newPlacement = {
        name: req.body.name,
        code: req.body.code,
        state: "active",
        height: parseInt(heightAndWidth[1]),
        width: parseInt(heightAndWidth[0])
    };

    var publisher = {
        id: req.body.publisherId
    };

    appNexusClient.createPlacement(newPlacement, publisher, function(err, placement){
        placement.create(function(err, data){
            req.params.data = data;
            res.json(data);
        })
    });
});

app.get('/createSuccess', function(req, res) {
  res.render('publisher/createSuccess', req.params.data);
});

app.get('/parse', function(req, res) {
  utils.parseExcelAndInsertPublishersInMongo('publishers_test.xlsx', 'publishers', res);
});

app.get('/createPublishers', function(req, res) {
  utils.createPublishers(res);
});

app.get('/upload', function(req, res) {
  res.render('publisher/uploadExcel');
});

app.get('/getDefaultSite/:publisherId', function(req, res) {
  var appNexusClient = new Client("vsingh", "D3vilM@yCry");

  var publisher = {
    id: req.params.publisherId
  };

  appNexusClient.getDefaultSite(publisher, function(err, publisher){
    publisher.getDefaultSite(function(err, data){
      res.json(data);
    })
  });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Application listening on port: " + app.get('port'));
});