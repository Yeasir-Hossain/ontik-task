import winston from 'winston';
import { config } from '../config';

export const logger = winston.createLogger({
	level: config.logging.level,
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
	]
});