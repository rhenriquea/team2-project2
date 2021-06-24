const Movie = require('../models/movie');
var fs = require('fs');

//get all movies
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies
  });
};

//post one movie

exports.postMovies = (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    cover: req.body.cover,
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
  const movieId = req.params.movieId;
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
  const movieId = req.params.movieId;

  updatedTitle = req.body.title;
  updatedCover = req.body.cover;
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