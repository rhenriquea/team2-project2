const { validationResult } = require('express-validator');
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const { API_SECRET } = process.env;

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const hasErrors = !errors.isEmpty();
  let encryptedPassword = null;
  let user;

  const { email, name, password } = req.body;

  try {
    user = await User.findOne({ email });

    if (user) {
      const error = new Error('User already registered');
      error.statusCode = 403;
      throw error;
    }

    if (hasErrors) {
      const error = new Error('Validation failed. Incorrect payload provided');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    encryptedPassword = await hash(password, 12);

    user = new User({
      email,
      name,
      password: encryptedPassword,
    });

    user = await user.save();
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 401;
      throw error;
    }

    // Check password
    const isValid = await compare(password, user.password);

    if (!isValid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const userId = user._id.toString();

    const token = jwt.sign({ email, userId }, API_SECRET, {
      expiresIn: '10s',
    });

    res.status(200).json({ token, userId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
