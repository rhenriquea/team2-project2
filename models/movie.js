const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    actors: {
      type: [String],
      required: true,
    },
    rating: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model('Movie', schema);
