const { Router } = require('express');

const routes = Router();

routes.use('/movies', require('./movies'));

module.exports = routes;
