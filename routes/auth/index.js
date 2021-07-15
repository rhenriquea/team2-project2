const { Router } = require('express');

const controller = require('../../controllers/auth');
const { userValidator } = require('../../middlewares/validators');

const router = Router();

router.put('/signup', userValidator.signup, controller.signup);
router.post('/login', userValidator.login, controller.login);

module.exports = router;
