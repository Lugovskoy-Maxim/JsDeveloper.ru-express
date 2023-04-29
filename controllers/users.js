const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const {
  HTTP_STATUS,
  ERROR_400_MESSAGE,
  ERROR_404_USER_MESSAGE,
  ERROR_404_USER_BAD_ID_MESSAGE,
  ERROR_409_EMAIL_MESSAGE,
  DELETE_DATE,
} = require('../utils/constants');
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
      const { password, savedPost, expireAt, ...fields } = user.toObject();
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

module.exports.signout = (req, res) => {
  res.clearCookie('auth').send({ message: messages.notification.signout });
}

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(ERROR_404_USER_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(ERROR_404_USER_BAD_ID_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports.findUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(new NotFoundError(ERROR_404_USER_MESSAGE))
    .then((user) => {
      const { savedPost, expireAt, password, ...fields } = user.toObject();
      res.send({ user: fields });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(ERROR_404_USER_BAD_ID_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email, nickname, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email, nickname, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_400_MESSAGE));
        return;
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError(ERROR_409_EMAIL_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports.deleteWithDelay = (req, res, next) => {
  const today = new Date().valueOf();
  const daysToRemove = 7;
  const deleteDate = new Date(today + 24 * 60 * 60 * 1000 * daysToRemove); // желаемая дата
  User.findByIdAndUpdate(
    req.user._id,
    { expireAt: deleteDate },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ message: DELETE_DATE + deleteDate }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_400_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports.savePost = (req, res, next) => {
  const { postId, postOwner, category } = req.body;
  User.findById(req.user._id)
    .orFail(new NotFoundError(ERROR_404_USER_MESSAGE))
    .then((user) => {
      const newSavedPosts = [{postId: postId, date: new Date(), postOwner: postOwner, category: category}, ...user.savedPost];
      User.findByIdAndUpdate(
        req.user._id,
        { savedPost: newSavedPosts },
        { new: true, runValidators: true }
      )
        .then((user) => {
          console.log(user);
        })
        .catch((err) => console.log('err1' + err));
    })
    .catch((err) => console.log('err2' + err));
    next(err);
};
