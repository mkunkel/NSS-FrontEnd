require('colors');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('home.index'.italic.underline.bold.magenta);
  // console.log(req.session);
  Todo.where('user', req.session.userId).exec(function(err, todos) {
    res.render('home/index', {title: 'Express', user: res.locals.user, userId: req.session.userId, todos: todos});
  });
};
