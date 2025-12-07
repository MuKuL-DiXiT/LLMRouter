# LLM Router - Natural Language Query Processing System

A full-stack application that processes natural-language queries through an LLM-based routing system, supporting weather queries and database operations.

## Architecture

- **Backend**: Express.js with MongoDB
- **Frontend**: React with Axios
- **LLM**: HuggingFace API (Llama 2)
- **Database**: MongoDB Atlas

## Features

- Natural language query processing
- Automatic query classification (weather, database, general)
- Weather tool for real-time weather information
- Database tool for employee and order data
- Clean, human-readable responses

## Setup Instructions

### Server Setup

```bash
cd server
npm install
```

Create or update `.env` file:
```
MONGO_URI=mongodb+srv://mukuldixit086:khatarnakkhiladi24@cluster0.dc6aanv.mongodb.net/LLMRouter
PORT=5000
HF_API_KEY=your_huggingface_api_key
```

Start the server:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Client Setup

```bash
cd client
npm install
```

Start the client:
```bash
npm start
```

Client runs on `http://localhost:3000`

## API Endpoints

### POST /api/llm/query
Main endpoint for processing natural language queries.

Request:
```json
{
  "query": "Tell me the weather in San Francisco"
}
```

Response:
```json
{
  "userQuery": "Tell me the weather in San Francisco",
  "response": "The weather in San Francisco is 18°C with clear skies."
}
```

### GET /api/weather/:city
Get weather for a specific city.

### POST /api/database/query
Execute a database query.

### GET /api/database/init
Initialize database with sample data.

## Query Examples

Weather Queries:
- "Tell me the weather in San Francisco"
- "What's the weather in Tokyo?"
- "Is it raining in London?"

Database Queries:
- "How many employees joined last month?"
- "List all orders over 500"
- "What is the average salary?"
- "Show employees in Engineering department"
- "What is the total revenue?"

## Database Schema

### Employees
- name: String
- position: String
- department: String
- salary: Number
- joinDate: Date
- email: String

### Orders
- orderId: String
- customerName: String
- amount: Number
- status: String
- createdDate: Date
- items: String

## Technologies Used

- Node.js & Express.js
- MongoDB with Mongoose
- React 18
- Axios
- HuggingFace API
- CORS
- Dotenv

## System Flow

1. User submits a natural language query
2. LLM classifies the query (weather/database/general)
3. Appropriate tool is executed based on classification
4. Results are processed and formatted
5. Human-readable response is returned to user
