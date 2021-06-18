const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  const { API_TOKEN } = process.env;
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, API_TOKEN);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error('Validation failed. Incorrect payload provided');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
