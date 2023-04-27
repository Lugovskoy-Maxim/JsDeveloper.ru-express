const HTTP_METHOD = Object.freeze({
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

const ROUTE = Object.freeze({
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  POST: '/post',
  PROFILE: '/profile',
  ABOUT: '/about',
  ADDPOST: '/addpost',
  EDITPOST: '/editpost',
});

const HTTP_STATUS = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST_ERROR: 400,
  UNAUTORIZED_ERROR: 401,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND_ERROR: 404,
  CONFLICT_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500,
}

const ERROR_401_BAD_REQ_MESSAGE = 'Неверный логин или пароль, проверте правильность введёных данных и попторите попытку снова';
const ERROR_404_USER = 'Неверный логин или пароль, проверте правильность введёных данных и попторите попытку снова';

module.exports = {
  HTTP_STATUS,
  ROUTE,
  HTTP_METHOD,
  ERROR_401_BAD_REQ_MESSAGE,
  ERROR_404_USER,

};