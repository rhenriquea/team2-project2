const { Router } = require('express');

const controller = require('../../controllers/admin');
const { movieValidator } = require('../../middlewares/validators');
const isLoggedIn = require('../../middlewares/auth/is-logged');

const router = Router();

router.get('/movies', isLoggedIn, controller.getAdminMovies);
router.post('/movies', isLoggedIn, movieValidator, controller.postMovie);
router.put('/movies/:id', isLoggedIn, controller.editMovie);
router.delete('/movies/:id', isLoggedIn, controller.deleteMovie);

module.exports = router;
