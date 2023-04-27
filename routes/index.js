const router = require('express').Router();
const { messages } = require('../utils/messages');
const { NotFoundError } = require('../errors/index');
const { registrations, login } = require('../controller/users');
const routesUser = require('./routersUser');

router.use('/signin', login);
router.use('/signup', registrations);

// router.use(auth);

router.get('/signout', (req, res) => {
  res.clearCookie('auth').send({ message: messages.notification.signout });
});
router.use(routesUser);
router.use('*', () => {throw new NotFoundError(messages.error.ERROR_404_PAGE)}); // при переходе на несуществующий адресc

module.exports = router;