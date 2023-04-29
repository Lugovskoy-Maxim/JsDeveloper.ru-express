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

const ERROR_401_MESSAGE = 'Недостаточно прав, вы не авторизированы!'
const DELETE_DATE = 'Ваш профиль будет удален через 7 дней,  вы можете отменить удаление в профиле аккаунта. Назначенная дата уделения аккаутна:'
const ERROR_400_MESSAGE = 'Плохой запрос, проверте введные данные и отправте снова!';
const ERROR_401_BAD_REQ_MESSAGE = 'Неверный логин или пароль, проверте правильность введёных данных и повторите попытку снова';
const ERROR_404_USER_MESSAGE = 'Пользователь не найден';
const ERROR_404_USER_BAD_ID_MESSAGE = 'Пользователь с указаным _id не найден, проверте правильность введёных данных и повторите попытку снова';
const ERROR_409_EMAIL_MESSAGE = 'При создании возник конфликт с базой данных, пожалуйста измените поле:';

module.exports = {
  HTTP_STATUS,
  ROUTE,
  HTTP_METHOD,
  DELETE_DATE,
  ERROR_400_MESSAGE,
  ERROR_401_MESSAGE,
  ERROR_401_BAD_REQ_MESSAGE,
  ERROR_404_USER_MESSAGE,
  ERROR_404_USER_BAD_ID_MESSAGE,
  ERROR_409_EMAIL_MESSAGE,

};