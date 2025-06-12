// logger.ts
import { createLogger, Logger } from 'winston';
import loggerConfig from './logger.config';

const logger: Logger = createLogger(loggerConfig);

export default logger;