import express from 'express';
import { getWeather } from '../tools/weatherTool.js';

const router = express.Router();

router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const result = await getWeather(city);
    res.json({ city, result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
