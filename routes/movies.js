const {
    Router
} = require('express');

const controller = require('../controllers/movies');

const router = Router();

//General Route
router.get('/movies', controller.getMovies);
router.get('/:id', controller.getMovie);

//Admin (In Progress)
//Get Single Movie

//Create
router.post('/movies', controller.postMovies);
//Update
router.put('/:id', controller.updateMovie);
//Delete
router.delete('/:id', controller.deleteMovie);

module.exports = router;