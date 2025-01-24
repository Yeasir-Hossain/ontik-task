import axios from 'axios';
import { HttpResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiResponse {
	data: HttpResponse[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	}
}

export const fetchResponses = async (page = 1, limit = 10) => {
	const response = await axios.get<ApiResponse>(`${API_BASE_URL}/responses`, {
		params: { page, limit }
	});
	return response.data;
};