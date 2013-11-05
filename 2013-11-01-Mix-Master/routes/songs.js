var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');

// GET /songs
exports.index = function(req, res){
  Song.find(function(err, songs) {
    console.log(songs);
    res.render('songs/index', {title: 'Songs', songs: songs});
  });
};

// GET /songs/new
exports.new = function(req, res){
  Genre.find(function(err, genres) {
    res.render('songs/new', {title: 'Add Song', genres: genres});
  });
};

// POST /songs
exports.create = function(req, res){

  new Song(req.body).save(function(err, song, count) {
    if (err) {
      console.log(err);
      Genre.find(function(err,genres){
        res.render('songs/new', {title: 'New Song', errors: [], song: new Song(), genres: genres});
      });
    } else {


        res.redirect('/songs');


    }
  });
};

// GET /songs/:id/edit
exports.edit = function(req, res){
  Song.findById(req.params.id, function(err, song) {
    res.render('songs/edit', {title: 'Edit Song', song: song});
  });
};

// PUT /songs/:id
exports.update = function(req, res){
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song) {
    res.redirect('/songs');
  });
};

// GET /songs/:id
exports.show = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(err, song) {
    res.render('songs/show', {title: 'show page', song: song});
  });
};

// DELETE /songs/:id
exports.delete = function(req, res){
  console.log('delete');
  Song.findByIdAndRemove(req.params.id, function(err){
    res.redirect('/songs');
  });
};