var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');
var Song = mongoose.model('Song');

// GET /artists
exports.index = function(req, res){
  res.render('artists/index', {title: 'Artists'});
};

// GET /artists/new
exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'Add Artist', songs: songs});
  });
};

// POST /artists
exports.create = function(req, res){
  new Artist(req.body).save(function(err, artist, count){
    console.log('------------------------------------------------------------------------');
    console.log(req.body);
    console.log('------------------------------------------------------------------------');

    res.redirect('/artists');
  });
};