  const mongoose = require('mongoose');

  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String}
  }, { timestamps: true });

  module.exports = mongoose.model('300357444-deepaks', bookSchema);
