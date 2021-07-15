const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const User = require('../../models/user');
const Movie = require('../../models/movie');

const deleteImage = (filePath) => {
  // eslint-disable-next-line no-param-reassign
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.error(err));
};

exports.getAdminMovies = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 3;
  let count = 0;

  try {
    count = await Movie.find({ creator: req.userId }).countDocuments();
    const movies = await Movie.find({ creator: req.userId })
      .populate('creator')
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

exports.postMovie = async (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();

  if (hasErrors) {
    const { title: err } = errors.mapped();
    const error = new Error(`${err.msg} on field ${err.param}`);
    error.statusCode = 422;
    next(error);
  }

  // Check for file uploads
  if (!req.file) {
    const error = new Error('Cover image is required');
    error.statusCode = 422;
    next(error);
  }

  const { title, description, genres, actors, rating, year } = req.body;
  const cover = req.file.path.replace(/ /g, '');

  const movie = new Movie({
    title,
    cover,
    description,
    genres: genres.split(','),
    actors: actors.split(','),
    rating,
    year,
    creator: req.userId,
  });

  try {
    await movie.save();
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    user.movies.push(movie);
    await user.save();

    res.status(201).json({
      message: 'Movie created successfully',
      movie,
      creator: {
        _id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editMovie = async (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();

  if (hasErrors) {
    const error = new Error('Validation failed. Incorrect payload provided');
    error.statusCode = 422;
    throw error;
  }

  const { id } = req.params;
  const { title, description, genres, actors, rating, year } = req.body;
  let { cover } = req.body;

  if (req.file) {
    cover = req.file.path;
  }

  // Check for file uploads
  if (!cover) {
    const error = new Error('Cover image is required');
    error.statusCode = 422;
    throw error;
  }

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      const error = new Error('Movie not found.');
      error.statusCode = 404;
      throw error;
    }

    // Check if user was the creator
    if (movie.creator.toString() !== req.userId) {
      const error = new Error('Not authorized');
      error.statusCode = 403;
      throw error;
    }

    if (cover !== movie.cover) {
      deleteImage(movie.cover);
    }

    movie.title = title;
    movie.cover = cover;
    movie.description = description;
    movie.genres = genres.split(',');
    movie.actors = actors.split(',');
    movie.rating = rating;
    movie.year = year;

    await movie.save();
    res.status(200).json({ message: 'Movie updated!', movie });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      const error = new Error('Movie not found.');
      error.statusCode = 404;
      throw error;
    }

    if (!movie.creator) {
      await Movie.findByIdAndRemove(id);
      res.status(200).json({ message: 'Movie deleted!' });
      return;
    }

    // Check if user was the creator
    if (movie.creator.toString() !== req.userId) {
      const error = new Error('Not authorized');
      error.statusCode = 403;
      throw error;
    }

    // Delete local image
    deleteImage(movie.cover);

    // Delete movie from DB
    await Movie.findByIdAndRemove(id);

    // Delete movie from User movies list
    const user = await User.findById(req.userId);
    user.movies.pull(id);
    await user.save();

    // Send response to user
    res.status(200).json({ message: 'Movie deleted!' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
