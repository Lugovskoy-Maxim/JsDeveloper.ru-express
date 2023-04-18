const cors = require('cors');
const { NODE_ENV} = process.env;
const allowedOrigins = ['http://localhost:3000'];

const corsMiddleware = cors({
  origin: NODE_ENV ? allowedOrigins : '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = corsMiddleware;

