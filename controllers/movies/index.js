const { validationResult } = require('express-validator');

const Movie = require('../../models/movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ data: movies });
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

exports.postMovie = async (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();

  if (hasErrors) {
    const error = new Error('Validation failed. Incorrect payload provided');
    error.statusCode = 422;
    throw error;
  }

  const { title, cover, description, genres, actors, rating, year } = req.body;

  const movie = new Movie({
    title,
    cover,
    description,
    genres,
    actors,
    rating,
    year,
  });

  try {
    const addedMovie = await movie.save();
    res.status(201).json({
      message: 'Movie created successfully',
      movie: addedMovie,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editMovie = (req, res) => {
  const { title, cover, description, genres, actors, rating, year } = req.body;
};

exports.deleteMovie = (req, res) => {};
