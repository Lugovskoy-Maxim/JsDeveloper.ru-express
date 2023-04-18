// const { AppError } = require('./AppError.js');
// const { HTTPError } = require('./HTTPError.js');
// const { ServerError } = require('./ServerError.js');
// const { ConflictError } = require('./ConflictError.js');
// const { NotFoundError } = require('./NotFoundError.js');
// const { ForbiddenError } = require('./ForbiddenError.js');
// const { BadRequestError } = require('./BadRequestError.js');
// const { UnauthorizedError } = require('./UnauthorizedError.js');

const mongoNotUniqueCode = 11000;
const messages = {
  app: {
    unknown: 'Неизвестная ошибка',
    configNotFound: 'Не найден конфиг для этого окружения',
    rateLimit: 'Превышел лимит запросов, пожалуйста подождите',
    unauthorized: 'Необходима авторизация',
    noPage: 'Запрашиваемая страница не найдена',
    notURL: 'Ссылка должна быть http(s)-URL',
    notNickName: 'Никнейм должен состоять ьлдбкл из латинских букв или цифр',
    notEmail: 'Почта должна быть вида example@domain.ru',
  },
  user: {
    alreadyExist: 'Пользователь с такой почтой уже существует',
    validation: 'Некорректные данные для пользователя.',
    notFound: 'Запрашиваемый пользователь не найден',
    conflict: 'Данные принадлежат другому пользователю',
    incorrect: 'Неправильная почта или пароль',
  },
  post: {
    validation: 'Некорректные данные для поста.',
    notFound: 'Запрашиваемый пост не найден',
    anotherOwner: 'Это действие выполнить можно только со своими постами',
  },
};

module.exports = {
  messages,
}