const mongoose = require('mongoose');

const pilarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A pilar must have a name'],
    maxlength: [40, 'A pilar name must have less or equal than 40 characters'],
    minlength: [8, 'A pilar name must have more or equal than 10 characters'],
  },
  description: {
    type: String,
    required: [true, 'A pilar must have a representativity'],
    maxlength: [
      500,
      'A pilar description must have less or equal than 120 characters',
    ],
    minlength: [
      10,
      'A pilar representativity must have more or equal than 10 characters',
    ],
  },

  // tourism_promotion: {
  //   type: String,
  //   required: [true, 'A pilar must have a tourism_promotion'],
  //   maxlength: [
  //     40,
  //     'A pilar tourism_promotion must have less or equal than 40 characters',
  //   ],
  //   minlength: [
  //     10,
  //     'A pilar tourism_promotion must have more or equal than 10 characters',
  //   ],
  // },
  // statistics: {
  //   type: String,
  //   required: [true, 'A pilar must have statistics'],
  //   maxlength: [
  //     40,
  //     'A pilar statistics must have less or equal than 40 characters',
  //   ],
  //   minlength: [
  //     10,
  //     'A pilar statistics must have more or equal than 10 characters',
  //   ],
  // },
  // competitivity: {
  //   type: String,
  //   required: [true, 'A pilar must have competitivity'],
  //   maxlength: [
  //     40,
  //     'A pilar competitivity must have less or equal than 40 characters',
  //   ],
  //   minlength: [
  //     10,
  //     'A pilar competitivity must have more or equal than 10 characters',
  //   ],
  // },
});

const Pilar = mongoose.model('Pilar', pilarSchema);

module.exports = Pilar;
