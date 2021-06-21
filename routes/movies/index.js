const { Router } = require('express');

const controller = require('../../controllers/movies');

const router = Router();

router.get('/', controller.getMovies);
router.get('/:id', controller.getMovie);

module.exports = router;
