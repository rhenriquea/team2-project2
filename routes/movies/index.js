const { Router } = require('express');

const controller = require('../../controllers/movies');

const { moviePostValidator } = require('../../middlewares/validators');

const router = Router();

router.get('/', controller.getMovies);
router.get('/:id', controller.getMovie);
router.post('/add', moviePostValidator, controller.postMovie);
router.put('/edit', controller.editMovie);
router.delete('/delete', controller.deleteMovie);

module.exports = router;
