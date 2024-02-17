// middleware/logger.js

const morgan = require('morgan');

// Logger middleware
const loggerMiddleware = morgan('dev');

module.exports = loggerMiddleware;
