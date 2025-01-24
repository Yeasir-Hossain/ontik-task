import mongoose from 'mongoose';
import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const startServer = async () => {
	try {
		await mongoose.connect(config.mongoUri);
		logger.info('Connected to MongoDB');

		const { httpServer } = await createApp();

		httpServer.listen(config.port, () => {
			logger.info(`Server is running on port ${config.port}`);
		});
	} catch (error) {
		logger.error('Error starting server', { error });
		process.exit(1);
	}
};

startServer();