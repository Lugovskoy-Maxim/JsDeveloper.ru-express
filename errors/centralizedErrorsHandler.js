const { HTTP_STATUS } = require('../utils/constants');
const { messages } = require('../errors/index.js');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || messages.app.unknown;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;