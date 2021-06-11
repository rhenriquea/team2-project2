const Movie = require('../models/movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({
    data: movies
  });
};

exports.getAddMovies = (req, res) => {
  res.render('/add-movie'), {
    title: ' Add Movie',
    path: 'add-movie'
  }
}

exports.postMovies = (req, res) => {

  const movies = new Movie({
    title: req.body.title,
    cover: req.body.cover,
    description: req.body.description,
    genres: [req.body.genres],
    actors: [req.body.actors],
    rating: req.body.rating,
    year: req.body.year
  });

  movies.save(function (err, movies) {
    if (err) {
      return next(err)
    }
    res.json(201, movies)
  })


};