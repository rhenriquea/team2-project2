const { body } = require('express-validator');

const validators = [
  body('title').trim().isLength({ min: 5 }),
  body('description').trim().isLength({ max: 150 }),
];

module.exports = validators;
