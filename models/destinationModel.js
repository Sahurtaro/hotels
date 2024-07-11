const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    maxlength: [
      40,
      'A destination name must have less or equal than 40 characters',
    ],
    minlength: [
      10,
      'A destination name must have more or equal than 10 characters',
    ],
  },
  image: {
    type: [String],
    required: [true, 'A destination must have an image'],
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'A destination must have a city'],
    maxlength: [30, 'A city name must have less or equal than 40 characters'],
    minlength: [4, 'A city name must have more or equal than 10 characters'],
  },
  region: {
    type: String,
    trim: true,
    required: [true, 'A destination must have a region'],
    maxlength: [30, 'A region must have less or equal than 40 characters'],
    minlength: [5, 'A region must have more or equal than 10 characters'],
  },
  link: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
