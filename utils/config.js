require('dotenv').config();
const { PORT = 3001, NODE_ENV, MONGO_URL_PROD, JWT_SECRET } = process.env;

const configByEnv = {
  production: {
    NODE_ENV: NODE_ENV,
    MONGO_URL: MONGO_URL_PROD,
    PORT: PORT,
    JWT_SECRET: JWT_SECRET,
  },
  development: {
    NODE_ENV: 'development',
    MONGO_URL: 'mongodb://localhost:27017/jsdevDB',
    PORT: 3002,
    JWT_SECRET: 'Secret_key',
  }
}

const CONFIG_ENV =
  NODE_ENV === 'production'
  ? configByEnv.production
  : configByEnv.development


module.exports = {
  CONFIG_ENV
}