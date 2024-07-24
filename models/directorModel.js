const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: [true, 'A board director needs a name'],
    maxlength: [
      40,
      'A board director name must have less or equal than 40 characters',
    ],
    minlength: [
      10,
      'A board director name must have more or equal than 10 characters',
    ],
  },
  city: {
    type: String,
    required: [true, 'A board director needs a city'],
    maxlength: [
      40,
      'A board director city must have less or equal than 40 characters',
    ],
    minlength: [
      4,
      'A board director city must have more or equal than 10 characters',
    ],
  },
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;
