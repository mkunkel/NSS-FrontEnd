var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.findUser = function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function(err, user) {
      if (user) {
        res.locals.user = user;
        next();
      }
    });
  } else {
    next();
  }
}

exports.admin = function(req, res, next) {

  if(res.locals.user && res.locals.user.isAdmin) {
    next();
  } else {
    res.end('Incorrect permissions');
  }
}