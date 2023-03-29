const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NotAuthorizedError } = require('../helpers/error');
const User = require('../db/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(
        new NotAuthorizedError(
          'Please, provide a token in request authorization header',
        ),
      );
    }

    const [, token] = authorization.split(' ');
    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'));
    }

    const payload = jwt.decode(token, process.env.JWT_SECRET);

    if (!payload) {
      next(new NotAuthorizedError('Invalid token'));
    }

    const { id } = payload;

    const user = await User.findById(id);

    if (!user && token !== user.token) {
      next(new NotAuthorizedError('Not authorized'));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Not authorized'));
  }
};

module.exports = authMiddleware;
