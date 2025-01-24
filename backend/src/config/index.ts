import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/http-monitor',
	httpbin: {
		baseUrl: 'https://httpbin.org',
		endpoint: '/anything',
		interval: 5 * 60 * 1000, // 5 minutes in milliseconds
	},
	logging: {
		level: process.env.LOG_LEVEL || 'info',
	},
};