var database = require('../modules/database.js');
var strings = require('../modules/strings.js')
/*
 * GET todo page.
 */

exports.index = function(req, res){
  var actions = database.read(__dirname + '/../databases/database.json');
  res.render('list/index', { title: 'To Do | Index', actions: actions, strings: strings});
};

// POST todo
exports.create = function(req, res){
  var actions = database.read(__dirname + '/../databases/database.json');
  var request = req.body;
  var action = {};
  for (property in request) {
    action[property] = request[property];
  }
  // action.task = req.body.task;
  // action.due = req.body.due;
  actions.push(action);
  database.write(__dirname + '/../databases/database.json', actions);
  res.redirect('list');
};

// GET /todo/new
exports.new = function(req, res){
  res.render('list/new', { title: 'To Do | New' });
};
