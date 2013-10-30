
/*
 * GET /
 */

exports.index = function(req, res){
  var colors = ['blue', 'red', 'olive', 'purple', 'green'];
  res.render('colors/index', {title: 'Express', colors: colors});
};
