var mongoose = require('mongoose');
var moment = require('moment');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');

// GET /todos
exports.index = function(req, res){
  Priority.find(function(priorityErr, priorities) {
    Todo.find().populate('priority').exec(function(todoErr, todos) {
      res.render('todos/index', {title: 'Express', priorities: priorities, todos: todos, moment: moment});
    });
  });
};

// POST /todos
exports.create = function(req, res) {
  // req.body.dueDate = moment(req.body.dueDate).format('dddd, MMMM Do YYYY');
  new Todo(req.body).save(function(err, todo, count){
    if (err) {
      console.log(err);
    } else {
      Todo.findById(todo.id).populate('priority').exec(function(err, todo){

        res.send(todo);
      });

    }
  });
};

// DELETE /todos/:id
exports.delete = function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err) {
    res.send(err);
  });
};

// PUT /todos/:id
exports.update = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    todo.completed = !todo.completed;
    todo.save();
    res.send({todo: todo.completed});
  });
};