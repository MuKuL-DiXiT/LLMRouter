import express from 'express';
import { processQuery } from '../controllers/llmController.js';

const router = express.Router();

router.post('/query', processQuery);

export default router;
