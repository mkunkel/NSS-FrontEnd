var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');
var _ = require('lodash');

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
    console.log(genres);
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
      Genre.find().where('_id').in(song.genres).exec(function(err, genres) {
        for (var i = 0; i < genres.length; i++) {
          genres[i].songs.push(song.id);
          genres[i].save();
        }
        res.redirect('/songs');
      });
      //   for (var i = 0; i < req.body.genres.length; i++) {
      //     return req.body.genres[i];
      //   }
      // });
    }
  });
};

// GET /songs/:id/edit
exports.edit = function(req, res){
  Song.findById(req.params.id, function(err, song) {
    Genre.find(function(genreErr, genres) {
      console.log(genres);
      res.render('songs/edit', {title: 'Edit Song', song: song, genres: genres, _: _});
    });
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
  // Song.findById(req.params.id, function(err, song) {
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