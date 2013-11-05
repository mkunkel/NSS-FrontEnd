var mongoose = require('mongoose');

var Song = mongoose.Schema({
  title:     {type: String,
              required: [true, 'You must provide a title'],
              match: [/^[a-z0-9- ]+$/i, '{VALUE} is not a valid title']
            },
  duration:  Number,
  genres:    [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art:       String,
  filename:  String,
  lyrics:    String,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Song', Song);