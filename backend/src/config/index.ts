import dotenv from 'dotenv';

dotenv.config();

export const config = {
	port: process.env.PORT || 3000,
	mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/http-monitor',
	corsOrigin: process.env.CORS_ORIGIN?.split(",")
		.map(origin => origin)
		.filter(Boolean),
	httpbin: {
		baseUrl: 'https://httpbin.org',
		endpoint: '/anything',
		interval: 60 * 1000,
	},
	logging: {
		level: process.env.LOG_LEVEL || 'info',
	},
};