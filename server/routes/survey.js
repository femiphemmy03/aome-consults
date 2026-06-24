import express from 'express';
import { submitSurvey, listSurveysAdmin } from '../controllers/surveyController.js';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitSurvey);
router.get('/admin/all', requireAdminAuth, listSurveysAdmin);

export default router;
