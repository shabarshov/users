const { createLogger, transports, format } = require("winston")
const { logFilePaths } = require("#constants")

const sequelizeLogger = createLogger({
  format: format.simple(),
  transports: [
    new transports.File({
      filename: logFilePaths.sequelize.info,
      level: "debug",
      eol: "\n\n",
    }),
  ],
})

const nodeLogger = createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        return `${timestamp}\n${level}: ${message}\n${stack}\n`
      }
      return `${timestamp}\n${level}: ${message}\n`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: logFilePaths.node.errors,
      level: "error",
    }),
  ],
})

module.exports = {
  sequelizeLogger,
  nodeLogger,
}
