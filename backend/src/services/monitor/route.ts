import { Router } from 'express';
import { getResponses } from './entity';
const router = Router();

router.get('/responses', getResponses);

export const responseRoutes = router;