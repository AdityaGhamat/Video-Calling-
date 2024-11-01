import { createLogger, format, transports } from "winston";
const { printf, combine, timestamp } = format;
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level}: ${message}`;
});
const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});
export default logger;