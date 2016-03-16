
/*
 * GET home page.
 */
 // var Client = require('../client');
 // var appNexusClient = new Client("vsingh", "D3vilM@yCry");

exports.index = function(req, res){
 //  appNexusClient.getPublisher("182106", function(err, publisher){
 //      publisher.getInfo(function(err, data){
 //        res.render('index', data);
 //      })
 // });
  // res.render('index', { title: 'Express', foo: {bar:'baz'} });
};

exports.form = function(req, res){
  res.render('form', { title: 'Express', foo: {bar:'baz'} });
};
