var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

// GET /
exports.create = function(req, res){
  console.log('users.create'.italic.underline.bold.magenta);
  var user = new User();
  user.email = req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    user.password = hash;
    user.save(function(err) {
      if (err) {
        res.send({status: 'error'});
      } else {
        res.send({status: 'ok'});
      }
    });
  });
};

//PUT /login
exports.login = function(req, res){
  console.log('users.login'.italic.underline.bold.magenta);
  var email = req.body.email;
  User.findOne({email: email}, function(err, user){
    if (user) {
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if (result) {
          req.session.regenerate(function() {
            req.session.userId = user.id;
            req.session.save(function() {
              res.send({status: 'ok', email: email});
            });
          });
        } else {
          res.send({status: 'error'});
        }
      });
    } else {
      res.send({status: 'error'});
    }

  });
};

//DELETE /logout
exports.logout = function(req, res){
  console.log('users.logout'.italic.underline.bold.magenta);
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};

//GET /makemeanadmin
exports.makemeanadmin = function(req, res){
  console.log('users.makemeanadmin'.italic.underline.bold.magenta);
  if (req.query.password === '12345') {
    res.locals.user.isAdmin = true;
    res.locals.user.save(function(err, user){
      res.send(res.locals.user);
    });
  } else {
    res.send('error');
  }
};

//GET /admin
exports.admin = function(req, res){
  User.find(function(err, users){
    console.log(users);
    res.render('users/admin', {users: users});
  });
};

//DELETE /admin/:id
exports.delete = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err){
    res.send({status: 'ok'});
  });
};

//put /admin/:id
exports.update = function(req, res){
  console.log(req.params.id);
  User.findById(req.params.id, function(err, user) {
    console.log(user);
    user.isAdmin = !user.isAdmin;
    user.save(function(err, user){
      res.send({status: 'ok', isAdmin: user.isAdmin});
    });
  });
};