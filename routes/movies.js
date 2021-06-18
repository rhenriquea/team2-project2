const {
    Router
} = require('express');

const controller = require('../controllers/movies');

const router = Router();

router.get('/', controller.getMovies);
router.post('/postmovie', controller.postMovies);

module.exports = router;