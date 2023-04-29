const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const centralizedErrorsHandler = require('./errors/centralizedErrorsHandler');
const { CONFIG_ENV } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const rateLimiter = require('./middlewares/ratelimiter');
const corsMiddleware = require('./middlewares/cors');
const indexRouter = require('./routes/index');

const app = express();
// app.use(helmet);
app.use(requestLogger);
app.use(rateLimiter);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(CONFIG_ENV.MONGO_URL);
app.use(indexRouter);



app.use(errorLogger);
app.use(centralizedErrorsHandler);
app.listen(CONFIG_ENV.PORT, () => {
  console.log(
    `Приложение заупущено на порту: ${CONFIG_ENV.PORT}, режим: ${CONFIG_ENV.NODE_ENV} `
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
