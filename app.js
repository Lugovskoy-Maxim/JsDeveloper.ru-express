require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const centralizedErrorsHandler = require('./errors/centralizedErrorsHandler');
const { configByEnv } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const rateLimiter = require('./middlewares/ratelimiter');
const { messages } = require('./errors');

const corsMiddleware = require('./middlewares/cors');

const { PORT = 3001, NODE_ENV, MONGO_URL_PROD } = process.env;
const MONGO_URL = NODE_ENV
  ? MONGO_URL_PROD
  : configByEnv.development.MONGO_URL_DEV;

const app = express();
// app.use(helmet);
app.use(rateLimiter);
app.use(corsMiddleware);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_URL);



app.use(errorLogger);
app.use(centralizedErrorsHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `App started ${PORT}, type: ${NODE_ENV ? 'productions' : 'development'} `
  );
});

const stopServer = async () => {
  console.log('Stop database');
  await mongoose.connection.close();
  console.log('Stop server');
  server.close();
  console.log('App stopped successfully');
  process.exit(0);
};

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
