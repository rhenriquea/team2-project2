const Movie = require('../../models/movie');

exports.getMovies = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 3;
  let count = 0;

  try {
    count = await Movie.find().countDocuments();
    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ data: movies, count });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      const error = new Error('Movie not found.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Success', movie });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
