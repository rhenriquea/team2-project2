const {
    Router
} = require('express');

const controller = require('../controllers/movies');

const router = Router();

router.get('/movies', controller.getMovies);
router.post('/movies', controller.postMovies);
router.get('/:id', controller.getMovie);


router.put('/:id', controller.updateMovie);
router.delete('/:id', controller.deleteMovie);
module.exports = router;