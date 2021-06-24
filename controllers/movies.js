const Movie = require('../models/movie');
var fs = require('fs');
exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies
  });
};

exports.postMovies = (req, res) => {
  const movie = new Movie({
    id: new Date().toISOString(),
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

//GetMovieByID
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