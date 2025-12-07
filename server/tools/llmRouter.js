import axios from 'axios';

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-hf';

export const classifyQuery = async (userQuery) => {
  try {
    const prompt = `You are a query classifier. Based on the user input, determine if it's a weather query, database query, or general query.

User input: "${userQuery}"

Respond with ONLY a JSON object in this format (no other text):
{"type": "weather" | "database" | "general", "intent": "brief description", "params": {"key": "value"}}

Examples:
- "Tell me the weather in San Francisco" -> {"type": "weather", "intent": "get weather", "params": {"city": "San Francisco"}}
- "How many employees joined last month" -> {"type": "database", "intent": "employees_joined_last_month", "params": {}}
- "List all orders over 500" -> {"type": "database", "intent": "orders_over_amount", "params": {"amount": 500}}`;

    const response = await axios.post(HF_MODEL_URL, {
      inputs: prompt,
      parameters: {
        max_length: 300,
        temperature: 0.1
      }
    }, {
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data[0]?.generated_text || '';
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    }

    return { type: 'general', intent: 'unknown', params: {} };
  } catch (error) {
    console.log('LLM classification error:', error.message);
    return { type: 'general', intent: 'unknown', params: {} };
  }
};

export const generateResponse = async (userQuery, toolResult) => {
  try {
    const prompt = `You are a helpful assistant. The user asked: "${userQuery}"

Based on the following tool result, provide a clear and friendly response:
"${toolResult}"

Respond with ONLY a natural, human-readable answer (no metadata, no JSON, no raw data).`;

    const response = await axios.post(HF_MODEL_URL, {
      inputs: prompt,
      parameters: {
        max_length: 300,
        temperature: 0.7
      }
    }, {
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data[0]?.generated_text || '';
    const lines = generatedText.split('\n');
    const answer = lines[lines.length - 1]?.trim() || toolResult;
    
    return answer || toolResult;
  } catch (error) {
    console.log('LLM response generation error:', error.message);
    return toolResult;
  }
};
