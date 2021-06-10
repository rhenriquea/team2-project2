const { Router } = require('express');

const controller = require('../controllers/movies');

const router = Router();

router.get('/', controller.getMovies);

module.exports = router;
