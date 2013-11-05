var mongoose = require('mongoose');

var Genre = mongoose.Schema({
  name:     {type: String,
             required: [true, 'name is required'],
             match: [/^[a-zA-z ]*$/, '{VALUE} is an invalid name.']},
  songs:     [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Genre', Genre);