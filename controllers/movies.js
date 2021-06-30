const Movie = require('../models/movie');
var ObjectId = require('mongodb').ObjectID;
const path = require('path');
const fs = require('fs');
//get all movies
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies
  });
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};


//post one movie

exports.postMovies = (req, res) => {

  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;

  }
  const movie = new Movie({
    title: req.body.title,
    cover: req.file.path,
    description: req.body.description,
    genres: req.body.genres,
    actors: req.body.actors,
    rating: req.body.rating,
    year: req.body.year
  });
  movie
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        movie: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};
//get movie by ID
exports.getMovie = (req, res, next) => {
  const movieId = new ObjectId(req.params.id);
  Movie.findById(movieId)
    .then(movie => {
      if (!movie) {
        const error = new Error('Could not find movie');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Movie fetched.',
        movie: movie
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updateMovie = (req, res, next) => {
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }

  const movieId = req.params.id;

  updatedTitle = req.body.title;
  updatedCover = req.file.path;
  updatedDescription = req.body.description;
  updatedGenres = req.body.genres;
  updatedActors = req.body.actors;
  updatedRating = req.body.rating;
  updatedYear = req.body.year;


  Movie.findById(movieId)
    .then(movie => {
      if (!movie) {
        const error = new Error('Could not find movie.');
        error.statusCode = 404;
        throw error;
      }
      if (updatedCover !== movie.cover) {
        clearImage(movie.cover);
      }

      movie.title = updatedTitle;
      movie.cover = updatedCover;
      movie.description = updatedDescription;
      movie.genres = updatedGenres;
      movie.actors = updatedActors;
      movie.rating = updatedRating;
      movie.year = updatedYear;

      return movie
        .save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Movie updated!',
        movie: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  let cover = req.body.path;
  Movie.findById(movieId)
    .then(movie => {
      if (!movie) {
        const error = new Error('Could not find movie.');
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(movie.cover);
      return Movie.findByIdAndRemove(movieId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Deleted Movie.'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};