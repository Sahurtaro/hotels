const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
    maxlength: [40, 'A hotel name must have less or equal than 40 characters'],
    minlength: [10, 'A hotel name must have more or equal than 10 characters'],
    unique: true,
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'A hotel must have a city'],
    maxlength: [30, 'A city name must have less or equal than 40 characters'],
    minlength: [4, 'A city name must have more or equal than 10 characters'],
  },
  region: {
    type: String,
    trim: true,
    required: [true, 'A hotel must have a region'],
    maxlength: [30, 'A region must have less or equal than 40 characters'],
    minlength: [5, 'A region must have more or equal than 10 characters'],
  },
  zone: {
    type: String,
    trim: true,
    required: [
      true,
      'A hotel must have a zone: centro, sur, norte, este u oeste',
    ],
    enum: ['centro', 'sur', 'norte', 'este', 'oeste'],
  },
  category: {
    type: String,
    enum: ['hotel', 'hostal'],
    required: [true, "A hotel must have a type: 'hotel' or 'hostal'"],
  },
  type: {
    type: String,
    enum: ['urbano', 'rural'],
    trim: true,
    required: [true, "A hotel must have a type: 'urbano' or 'rural'"],
  },
  web: {
    type: String,
    trim: true,
    maxlength: [40, 'A web name must have less or equal than 40 characters'],
    minlength: [10, 'A web name must have more or equal than 10 characters'],
    unique: true,
  },
  images: {
    type: [String],
    trim: true,
    default: 'default.jpg',
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'A hotel must have an address'],
    maxlength: [40, 'An address must have less or equal than 40 characters'],
    minlength: [10, 'An address must have more or equal than 10 characters'],
    unique: true,
  },
  coordinates: {
    type: Object,
    required: [true, 'A hotel must have coordinates'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
