const { Router } = require('express');

const controller = require('../../controllers/movies');

const { movieValidator } = require('../../middlewares/validators');

const router = Router();

router.get('/', controller.getMovies);
router.post('/', movieValidator, controller.postMovie);
router.get('/:id', controller.getMovie);
router.put('/:id', movieValidator, controller.editMovie);
router.delete('/:id', controller.deleteMovie);

module.exports = router;
