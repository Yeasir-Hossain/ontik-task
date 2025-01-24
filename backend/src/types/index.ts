export interface HttpResponse {
	id: string;
	timestamp: Date;
	requestPayload: Record<string, any>;
	responseData: {
		args: Record<string, any>;
		data: string;
		files: Record<string, any>;
		form: Record<string, any>;
		headers: {
			[key: string]: string;
		};
		json: any;
		method: string;
		origin: string;
		url: string;
	};
	statusCode: number;
	responseTime: number;
}