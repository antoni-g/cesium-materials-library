const log4js = require("log4js");
log4js.configure({
  appenders: { 'out': { type: 'stdout', layout: { type: 'colored' } } },
  categories: { default: { appenders: ['out'], level: 'info' } }
});

function getLogger(source) {
  const logger = log4js.getLogger(source);
  logger.level = process.env.LOGGING_LEVEL;
  return logger;
}

module.exports = {
  getLogger: getLogger
}