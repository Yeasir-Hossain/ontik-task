import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { EventEmitter } from 'events';
import { config } from './config';
import { logger } from './utils/logger';

// internal imports
import routes from './routes';
import { MonitoringService } from './services/monitor/service';

export const createApp = async () => {
	const app = express();
	const httpServer = createServer(app);
	console.log(config.corsOrigin);
	const io = new Server(httpServer, {
		cors: {
			origin: config.corsOrigin,
			methods: ['GET', 'POST'],
			credentials: true
		}
	});

	// Middleware
	app.use(cors({
		origin: config.corsOrigin,
		credentials: true,
		methods: "GET,PUT,PATCH,POST,DELETE"
	}));
	app.use(express.json());

	app.get('/', (_req: Request, res: Response) => {
		res.status(404).send({
			message: "Hello, its me",
		});
	});

	// Routes
	app.use(routes);

	// Handle undefined reoutes
	app.use("*", (_req: Request, res: Response) => {
		res.status(404).send({
			message: "Page not found",
		});
	});

	// Event handling for real-time updates
	const eventEmitter = new EventEmitter();
	const monitoringService = new MonitoringService(eventEmitter);

	// Socket.IO connection handling
	io.on('connection', (socket) => {
		logger.info('Client connected');
		socket.on('disconnect', () => {
			logger.info('Client disconnected');
		});
	});

	// Broadcast new responses to connected clients
	eventEmitter.on('newResponse', (response) => {
		io.emit('newResponse', response);
	});

	// Start monitoring
	setInterval(() => {
		monitoringService.monitorEndpoint();
	}, config.httpbin.interval);

	// Initial monitoring call
	monitoringService.monitorEndpoint();

	return { app, httpServer };
};