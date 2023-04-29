const { verify } = require('jsonwebtoken');
const { AuthError } = require('../errors/index'); // ошибка 401
const { CONFIG_ENV } = require('../utils/config');
const { ERROR_401_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    throw new AuthError(ERROR_401_MESSAGE);
    return;
  }
  let payload;
  try {
    payload = verify(token, CONFIG_ENV.JWT_SECRET); // если не продакшен то используется JWT_DEV
  } catch (err) {
    throw new AuthError(ERROR_401_MESSAGE);
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};

module.exports = auth;