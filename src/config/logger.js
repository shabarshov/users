const winston = require("winston")
const { logFilePaths } = require("#constants")

const sequelizeLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: logFilePaths.sequelize.info,
      level: "debug",
      eol: "\n\n",
    }),
  ],
})

const nodeLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePaths.node.errors,
      level: "error",
      eol: "\n\n",
    }),
  ],
})

module.exports = { sequelizeLogger, nodeLogger }
