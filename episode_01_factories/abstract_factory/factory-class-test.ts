import { LoggerFactory } from "./factory-class";

const logger = LoggerFactory.createLogger();
process.env.NODE_ENV = 'production';
logger.info("This is an info message");
logger.debug("This is a debug message");
logger.warn("This is a warn message");
logger.error("This is a error message");