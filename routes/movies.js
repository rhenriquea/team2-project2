const { Router } = require('express');

const movies = require('../data/movies');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ data: movies });
});

module.exports = router;
