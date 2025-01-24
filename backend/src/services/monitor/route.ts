import { Router } from 'express';
import ResponseModel from '../../models/Response';
import { logger } from '../../utils/logger';

const router = Router();

router.get('/responses', async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const responses = await ResponseModel.find()
			.sort({ timestamp: -1 })
			.limit(Number(limit))
			.skip((Number(page) - 1) * Number(limit));

		const total = await ResponseModel.countDocuments();

		res.json({
			data: responses,
			pagination: {
				total,
				page: Number(page),
				pages: Math.ceil(total / Number(limit))
			}
		});
	} catch (error) {
		logger.error('Error fetching responses', { error });
		res.status(500).json({ error: 'Internal server error' });
	}
});

export const responseRoutes = router;