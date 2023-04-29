// const AppError = require('./AppError.js');
const AuthError = require('./AuthError');
// const HTTPError = require('./HTTPError.js');
// const ServerError = require('./ServerError.js');
const ConflictError = require('./ConflictError.js');
const NotFoundError = require('./NotFoundError');
// const ForbiddenError = require('./ForbiddenError.js');
const BadRequestError = require('./BadRequestError.js');
// const UnauthorizedError = require('./UnauthorizedError.js');

module.exports = {
  AuthError,
  NotFoundError,
  ConflictError,
  BadRequestError,
}