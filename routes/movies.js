const {
    Router
} = require('express');

const controller = require('../controllers/movies');

const router = Router();

router.get('/', controller.getMovies);
router.post('/postmovie', controller.postMovies);
router.get('/:movieId', controller.getMovie);
router.put('/:movieId', controller.updateMovie);
router.delete('/:movieId', controller.deleteMovie);
module.exports = router;