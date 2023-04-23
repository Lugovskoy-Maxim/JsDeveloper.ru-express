const router = require('express').Router();
const { messages } = require('../utils/messages');
const { NotFoundError } = require('../errors/index');

// router.use('/signin', console.log("login"));
// router.use('/signup', console.log("registration"));

// router.use(auth);

router.get('/signout', (req, res) => {
  res.clearCookie('jwtToken').send({ message: messages.notification.signout });
});
// router.use(routesUser);
router.use('*', () => {throw new NotFoundError(messages.error.ERROR_404_PAGE)}); // при переходе на несуществующий адресc

module.exports = router;