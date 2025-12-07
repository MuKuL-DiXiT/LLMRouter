import { classifyQuery, generateResponse } from '../tools/llmRouter.js';
import { getWeather } from '../tools/weatherTool.js';
import { queryDatabase } from '../tools/databaseTool.js';

export const processQuery = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({ error: 'Query is required and must be a non-empty string' });
    }

    const classification = await classifyQuery(query);

    let toolResult = '';

    if (classification.type === 'weather') {
      const city = classification.params.city;
      toolResult = await getWeather(city);
    } else if (classification.type === 'database') {
      const intent = classification.params.intent || classification.intent;
      const params = classification.params;
      toolResult = await queryDatabase(intent, params);
    } else {
      toolResult = 'I can help you with weather queries or database questions. What would you like to know?';
    }

    const finalResponse = await generateResponse(query, toolResult);

    res.json({
      userQuery: query,
      response: finalResponse
    });
  } catch (error) {
    console.log('Error processing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
