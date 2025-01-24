import axios, { AxiosInstance } from 'axios';
import { faker } from '@faker-js/faker';
import ResponseModel from '../../models/Response';
import { config } from '../../config';
import { logger } from '../../utils/logger';
import { EventEmitter } from 'events';

export class MonitoringService {
	private eventEmitter: EventEmitter;
	private request: AxiosInstance;

	constructor(eventEmitter: EventEmitter) {
		this.eventEmitter = eventEmitter;
		this.request = axios.create({
			baseURL: config.httpbin.baseUrl
		});
	}

	private generateRandomPayload(): Record<string, any> {
		return {
			randomData: {
				id: faker.string.uuid(),
				name: faker.person.fullName(),
				email: faker.internet.email(),
				details: {
					city: faker.location.city(),
					country: faker.location.country(),
				}
			}
		};
	}

	async monitorEndpoint(): Promise<void> {
		const startTime = Date.now();
		const payload = this.generateRandomPayload();

		try {
			const response = await this.request.post(
				config.httpbin.endpoint,
				JSON.stringify(payload),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			const responseTime = Date.now() - startTime;

			const monitoringData = {
				timestamp: new Date(),
				requestPayload: payload,
				responseData: response.data,
				statusCode: response.status,
				responseTime,
			};

			const savedResponse = await ResponseModel.create(monitoringData);
			this.eventEmitter.emit('newResponse', savedResponse);

			logger.info('Successfully monitored endpoint', {
				statusCode: response.status,
				responseTime,
			});
		} catch (error) {
			logger.error('Error monitoring endpoint', { error });
			throw error;
		}
	}
}