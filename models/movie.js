const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: { type: String, required: true },
  cover: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], required: true },
  actors: { type: [String], required: true },
  rating: { type: Number },
  year: { type: Number },
});

module.exports = model('Movie', schema);
