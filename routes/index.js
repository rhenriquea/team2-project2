const { Router } = require('express');

const routes = Router();

routes.use('/movies', require('./movies'));
routes.use('/auth', require('./auth'));
routes.use('/admin', require('./admin'));

module.exports = routes;
