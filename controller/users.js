const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const { HTTP_STATUS } = require('../utils/constants');
const { CONFIG_ENV } = require('../utils/config');
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require('../errors/index');
const { messages } = require('../utils/messages');

module.exports.registrations = (req, res, next) => {
  const { name, email, password, nickname } = req.body;
  console.log(name, email, password, nickname);
  bcrypt
    .hash(password, 8)
    .then((hash) =>
      User.create({
        name,
        email,
        nickname,
        password: hash,
      })
    )
    .then((user) => {
      const registerDateOnly = user.registerDate.getDate;
      const {
        password: removed,
        savedPost: remove,
        ...fields
      } = user.toObject();
      res
        .status(HTTP_STATUS.CREATE)
        .send({ user: fields, message: registerDateOnly });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err));
        return;
      }
      if (err.code === 11000) {
        const regexpKey = /{([^}]+)}/g; // для поиска ключа ошибки 409
        const regexpFormater = /[{}"']/g; // удаление символов
        const conflictKey = err.toString().match(regexpKey);
        const conflictMessage = conflictKey
          .toString()
          .replace(regexpFormater, '');
        next(
          new ConflictError(messages.error.ERROR_409 + ' ' + conflictMessage)
        );
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOneAndValidatePassword({ password, email })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CONFIG_ENV.JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('auth', token, {
          maxAge: 3600000 * 24 * 7,
          // httpOnly: true,
          // secure: true,
        })
        .send({ message: messages.notification.login });
    })
    .catch(next);
};