const { Router } = require('express');

const controller = require('../controllers/movies');

const router = Router();

router.get('/', controller.getMovies);
router.get('/add-movie', controller.getAddMovies);
router.post('/add-movie', controller.postMovies);
router.post('/postLogin', controller.postLogin);
router.post('/postSignup', controller.postSignup);

module.exports = router;
