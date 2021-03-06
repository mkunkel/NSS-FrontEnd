var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

// GET /genres
exports.index = function(req, res){
  Genre.find(function(err, genres) {
    res.render('genres/index', {title: 'Genres', genres: genres, errors: null});
  })
};

// GET /genres/new
exports.new = function(req, res){
  var genre = new Genre();
  res.render('genres/new', {title: 'Add Genre', genre: new Genre()});
};

// POST /genres
exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count) {
    if (err) {
      res.render('genres/new', {title: 'New Genre', errors: err.errors, genre: new Genre()});
    } else {
    res.redirect('/genres');
  }
  });
};

// GET /genres/:id/edit
exports.edit = function(req, res){
  Genre.findById(req.params.id, function(err, genre) {
    res.render('genres/edit', {title: 'Edit Genre', genre: genre});
  });
};

// PUT /genres/:id
exports.update = function(req, res){
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre) {
    res.redirect('/genres');
  });
};