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
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Movie', schema);
