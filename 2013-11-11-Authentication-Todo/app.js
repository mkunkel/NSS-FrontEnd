var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var todos = require('./routes/todos');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/authtodo');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.post('/users', users.create);
app.put('/login', users.login);
app.delete('/logout', users.logout);
app.get('/makemeanadmin', users.makemeanadmin);
app.get('/admin', middleware.admin, users.admin);
app.delete('/admin/:id', middleware.admin, users.delete);
app.put('/admin/:id', middleware.admin, users.update);
app.post('/todos', todos.create);
app.put('/todos/:id', todos.update);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
