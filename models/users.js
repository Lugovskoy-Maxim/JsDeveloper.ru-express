const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const { schemaEmail } = require('../validators/users')
const { messages } = require('../errors/index');
const { Schema } = mongoose;
const { AuthError } = require('../errors/index');
const { ERROR_404_USER, ERROR_401_BAD_REQ_MESSAGE } = require('../utils/constants');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 18,
    // validate: {
    //   validator: (value) => /[a-zA-Z0-9_]/gm.test(value),
    //   message: () => messages.app.notNickName,
    // },
  },
  savedPost: {
    type: Array,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'moder'],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => !schemaEmail.validate(value).error,
      message: () => messages.app.notEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
  },
}, {
  versionKey: false,
  statics: {
    findOneAndValidatePassword({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((user) => {
          if (!user) {
            throw new AuthError(ERROR_401_BAD_REQ_MESSAGE);
          }
          return bcrypt.compare(password, user.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new AuthError(ERROR_401_BAD_REQ_MESSAGE);
              }
              const { password: removed, ...fields } = user.toObject();
              return fields;
            });
        });
    },
  },
});

module.exports = mongoose.model('User', userSchema);