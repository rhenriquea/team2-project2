const jwt = require('jsonwebtoken');

const { API_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, API_SECRET);
  } catch (error) {
    const validation = new Error('INVALID_TOKEN');
    error.statusCode = 500;
    throw validation;
  }

  if (!decodedToken) {
    const error = new Error('Validation failed. Incorrect payload provided');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};