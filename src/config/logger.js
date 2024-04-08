const winston = require("winston")
const generateSequelizeLogFilename = require("#utils/sequelizeLogger")

const sequelizeLogger = winston.createLogger({
  level: "debug" || "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: generateSequelizeLogFilename() }),
  ],
})

module.exports = sequelizeLogger
