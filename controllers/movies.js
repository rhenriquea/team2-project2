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




  // res.status(201).json({
  //   data: {
  //     id: new Date().toISOString(),
  //     title: req.body.title,
  //     cover: req.body.cover,
  //     description: req.body.description,
  //     genres: [req.body.genres],
  //     actors: [req.body.actors],
  //     rating: req.body.rating,
  //     year: req.body.year
  //   }
  // })
};