const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A training must have a name'],
    maxlength: [60, 'A training name must have less or equal to 60 characters'],
    minlength: [10, 'A training name must have at least 10 characters'],
  },
  image: {
    type: [String],
    required: [true, 'A training must have an image'],
  },
  registartionLink: {
    type: String,
    required: [true],
  },
  createdAt: {
    type: Date,
  },
  default: Date.now(),
  city: {
    type: String,
    required: [true, 'A training must have a city'],
    maxlength: [30, 'A training city must have 30 characters or less'],
    minlength: [10, 'A training city must have at least 10 characters'],
  },
  region: {
    type: String,
    trim: true,
    required: [true, 'A training must have a region'],
    maxlength: [30, 'A training region must have 30 characters or less'],
    minlength: [10, 'A training region must have at least 10 characters'],
  },
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
