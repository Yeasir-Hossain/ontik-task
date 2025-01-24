import mongoose, { Schema, Document } from 'mongoose';
import { HttpResponse } from '../types';

const ResponseSchema = new Schema({
	timestamp: { type: Date, required: true },
	requestPayload: { type: Schema.Types.Mixed, required: true },
	responseData: {
		args: { type: Schema.Types.Mixed, default: {} },
		data: { type: String, default: '' },
		files: { type: Schema.Types.Mixed, default: {} },
		form: { type: Schema.Types.Mixed, default: {} },
		headers: { type: Schema.Types.Mixed, default: {} },
		json: { type: Schema.Types.Mixed, default: null },
		method: { type: String, required: true },
		origin: { type: String, required: true },
		url: { type: String, required: true }
	},
	statusCode: { type: Number, required: true },
	responseTime: { type: Number, required: true },
}, {
	timestamps: true,
});

const ResponseModel = mongoose.model<HttpResponse & Document>('Response', ResponseSchema);
export default ResponseModel;