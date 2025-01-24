export interface HttpResponse {
	_id: string;
	timestamp: Date;
	requestPayload: Record<string, any>;
	responseData: {
		method: string;
		url: string;
		origin: string;
		headers: Record<string, string>;
	};
	statusCode: number;
	responseTime: number;
}