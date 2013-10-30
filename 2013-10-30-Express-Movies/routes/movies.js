var db = require('../modules/database.js');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie.js');
var strings = require('../modules/strings.js');
var _ = require('lodash');

// GET /movies
exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){return new Movie(genericMovie);});

  res.render('movies/index', {title: 'Express', movies: movies, strings: strings});
};

// GET movies/new
exports.new = function(req, res){
  res.render('movies/new', {title: 'Express'});
};

// POST /movies
exports.create = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){return new Movie(genericMovie);});
  var movie = {};
  movie.title = req.body.title;
  movie.image = req.body.image;
  movie.color = req.body.color;
  movie.rated = req.body.rated;
  movie.studio = req.body.studio;
  movie.gross = req.body.gross;
  movie.numTheatres = req.body.numTheatres;
  movies.push(movie);
  db.write(file, movies);
  res.redirect('/movies');
};

// DELETE /movies
exports.delete = function(req, res){
  var movies = db.read(file);
  var title = req.params.title;
  movies = _.reject(movies, function(movie) { return movie.title === title});
  db.write(file, movies);
  res.redirect('/movies');
};