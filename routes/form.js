/*
 * GET home page.
 */

exports.form = function(req, res){
  res.render('form', { title: 'Express', foo: {bar:'baz'} });
};
