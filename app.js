var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    utils = require('./libs/utils');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +  '/public'));

var routes = require("./routes/routes.js")(app, utils);
var database = require("./libs/db.js");
database.initialize();

app.get('/', function(req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Application listening on port: " + app.get('port'));
});
