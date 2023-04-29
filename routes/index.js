const router = require('express').Router();
const auth = require('../middlewares/auth');
const { messages } = require('../utils/messages');
const { NotFoundError } = require('../errors/index');
const { registrations, login, signout } = require('../controllers/users');
const routesUser = require('./routersUser');

router.use('/signin', login);
router.use('/signup', registrations);

router.use(auth);

router.get('/signout', signout);
router.use(routesUser);
router.use('*', () => {throw new NotFoundError(messages.error.ERROR_404_PAGE)}); // при переходе на несуществующий адресc

module.exports = router;