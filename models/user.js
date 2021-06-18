const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'New',
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('User', schema);
