const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A provider must have a name'],
    minlenght: [10, 'A provider must have at least 10 characters'],
    maxlength: [40, 'A provider must have 40 characters at most'],
  },
  image: String,
  web: String,
  cretedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
