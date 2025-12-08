import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes.js';
import databaseRoutes from './routes/databaseRoutes.js';
import llmRoutes from './routes/llmRoutes.js';
import { initializeDatabase } from './tools/databaseTool.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI ;

mongoose.connect(MONGO_URI).then(async () => {
  console.log('MongoDB connected');
  await initializeDatabase();
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

app.use('/api/weather', weatherRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/llm', llmRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
