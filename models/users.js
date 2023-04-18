const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const { schemaEmail } = require('../validators/users')
const { messages } = require('../errors/index');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  nickName: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 18,
    validate: {
      validator: (value) => /[a-zA-Z0-9_]/gm.test(value),
      message: () => messages.app.notNickName,
    },
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
            // throw notFoundError;
          }
          return bcrypt.compare(password, user.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                // throw unauthorizedError;
              }
              const { password: removed, ...fields } = user.toObject();
              return fields;
            });
        });
    },
  },
});

export const User = mongoose.model('User', schema);