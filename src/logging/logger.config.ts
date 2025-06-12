// logger.config.ts
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, json } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const loggerConfig = {
  level: 'info',
  format: combine(
    label({ label: 'Sample agent instrumentation app' }),
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log', level: 'info' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
  ]
};

export default loggerConfig;