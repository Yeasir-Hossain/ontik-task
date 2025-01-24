import axios from 'axios';
import { EventEmitter } from 'events';
import { MonitoringService } from '../services/monitor/service';
import ResponseModel from '../models/Response';
import { logger } from '../utils/logger';

// Mock dependencies
jest.mock('axios');
jest.mock('../models/Response');
jest.mock('../utils/logger');

describe('MonitoringService', () => {
	let monitoringService: MonitoringService;
	let eventEmitter: EventEmitter;

	beforeEach(() => {
		// Reset mocks
		jest.clearAllMocks();

		// Create fresh EventEmitter for each test
		eventEmitter = new EventEmitter();

		// Mock axios.create to return a mock implementation
		(axios.create as jest.Mock).mockReturnValue({
			post: jest.fn()
		});

		// Instantiate service
		monitoringService = new MonitoringService(eventEmitter);
	});

	describe('generateRandomPayload', () => {
		it('should generate a payload with required fields', () => {
			// Use reflection to access private method
			const payload = (monitoringService as any).generateRandomPayload();

			expect(payload).toHaveProperty('randomData');
			expect(payload.randomData).toHaveProperty('id');
			expect(payload.randomData).toHaveProperty('name');
			expect(payload.randomData).toHaveProperty('email');
			expect(payload.randomData.details).toHaveProperty('city');
			expect(payload.randomData.details).toHaveProperty('country');
		});
	});

	describe('monitorEndpoint', () => {
		it('should successfully monitor endpoint and save response', async () => {
			// Mock axios response
			const mockedAxiosResponse = {
				status: 200,
				data: {
					method: 'POST',
					origin: '127.0.0.1',
					url: 'https://httpbin.org/anything'
				}
			};

			// Get the mocked axios instance
			const axiosInstance = axios.create();
			(axiosInstance.post as jest.Mock).mockResolvedValue(mockedAxiosResponse);

			// Mock ResponseModel create method
			const mockSavedResponse = {
				_id: 'test-id',
				...mockedAxiosResponse.data
			};
			(ResponseModel.create as jest.Mock).mockResolvedValue(mockSavedResponse);

			// Spy on event emitter
			const emitSpy = jest.spyOn(eventEmitter, 'emit');

			// Execute method
			await monitoringService.monitorEndpoint();

			// Assertions
			expect(ResponseModel.create).toHaveBeenCalledWith(
				expect.objectContaining({
					responseData: mockedAxiosResponse.data,
					statusCode: 200
				})
			);

			expect(emitSpy).toHaveBeenCalledWith(
				'newResponse',
				expect.objectContaining({
					_id: 'test-id',
					...mockedAxiosResponse.data
				})
			);

			expect(logger.info).toHaveBeenCalledWith(
				'Successfully monitored endpoint',
				expect.objectContaining({
					statusCode: 200
				})
			);
		});

		it('should handle endpoint monitoring failure', async () => {
			// Get the mocked axios instance
			const axiosInstance = axios.create();

			// Mock axios to throw an error
			const mockError = new Error('Network Error');
			(axiosInstance.post as jest.Mock).mockRejectedValue(mockError);

			// Expect the method to throw
			await expect(monitoringService.monitorEndpoint()).rejects.toThrow('Network Error');

			// Verify error logging
			expect(logger.error).toHaveBeenCalledWith(
				'Error monitoring endpoint',
				{ error: mockError }
			);
		});
	});
});