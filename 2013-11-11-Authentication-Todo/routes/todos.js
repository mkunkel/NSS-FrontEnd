require('colors');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var User = mongoose.model('User');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.create = function(req, res){
  console.log('todos.create'.italic.underline.bold.magenta);
  // console.log(req.session);
  var todo = new Todo();
  todo.title = req.body.title;
  todo.category = req.body.category;
  todo.dueDate = req.body.dueDate;
  todo.user = req.session.userId;
  todo.save(function(err, todo) {
    res.send(todo);
  });
};

// PUT /todos/:id
exports.update = function(req, res){
  console.log('todos.update'.italic.underline.bold.magenta);
  console.log(req.params.id);
  Todo.findById(req.params.id, function(err, todo) {
    todo.isComplete = !todo.isComplete;
    todo.save(function(err, todo) {
      res.send({status: 'ok', isComplete: todo.isComplete});
    });
  });
};