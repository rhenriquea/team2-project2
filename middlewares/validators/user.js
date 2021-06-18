const { body } = require('express-validator');
const User = require('../../models/user');

const validators = {
  signup: [
    body('email')
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail({ gmail_remove_dots: false })
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) throw new Error('User already registered');
      }),
    body(
      'password',
      'Please enter a password with only numbers, text and at least 5 characters'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('name').trim().not().isEmpty(),
  ],
  login: [
    body('email')
      .isEmail()
      .withMessage('Enter a valid email address')
      .normalizeEmail({ gmail_remove_dots: false }),
    body(
      'password',
      'Please enter a password with only numbers, text and at least 5 characters'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
};

module.exports = validators;
