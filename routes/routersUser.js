const router = require('express').Router();
// const {
//   validateUserInfo,
//   // validateUserId
// } = require('../middlewares/validation');

const {
  findUserById,
  updateUser,
  getUserInfo,
  deleteWithDelay,
  savePost,
  // deleteSavePost,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.get('/users/:id', findUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/savedPost', savePost);
// router.delete('/users/savedPost', deleteSavePost);
router.delete('/users/:id', deleteWithDelay);

module.exports = router;
