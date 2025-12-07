import express from 'express';
import { queryDatabase, initializeDatabase } from '../tools/databaseTool.js';

const router = express.Router();

router.get('/init', async (req, res) => {
  try {
    await initializeDatabase();
    res.json({ message: 'Database initialized' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/query', async (req, res) => {
  try {
    const { queryType, params } = req.body;
    const result = await queryDatabase(queryType, params || {});
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
