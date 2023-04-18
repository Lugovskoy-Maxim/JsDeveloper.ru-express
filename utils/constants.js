const configByEnv = {
  production: {
    env: 'production',
    apiMainBaseURL: 'http://#',
  },
  development: {
    env: 'development',
    apiMainBaseURL: 'http://localhost:3001',
    MONGO_URL_DEV: 'mongodb://localhost:27017/jsdevDB',
  }
}

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

const ERROR_500_MESSAGE = 'На сервере произошла ошибка';

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

module.exports = {
  configByEnv,
  HTTP_STATUS,
  ROUTE,
  HTTP_METHOD,
  ERROR_500_MESSAGE,
};