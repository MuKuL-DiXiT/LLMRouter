# LLM Router System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      React Frontend (Client)                     │
│                    (Port: 3000)                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Input Field → Form Submission → API Call (axios)        │   │
│  │  Response Display                                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTP POST
                      │ /api/llm/query
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Express.js Backend (Server)                      │
│                    (Port: 5000)                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Route: POST /api/llm/query                               │   │
│  │ Controller: llmController.processQuery()                 │   │
│  │                                                          │   │
│  │ 1. Receive user query                                    │   │
│  │ 2. Send to LLM Router for classification               │   │
│  │ 3. Execute appropriate tool                             │   │
│  │ 4. Generate final response                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────┬──────────────┬──────────────┬──────────────────────────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐  ┌──────────────┐  ┌──────────────┐
    │   LLM   │  │   Weather    │  │  Database    │
    │ Router  │  │    Tool      │  │    Tool      │
    │         │  │              │  │              │
    │HuggingF │  │Mock Weather  │  │MongoDB Atlas │
    │ ace API │  │Data for:     │  │Operations:   │
    │         │  │- SF: 18°C    │  │- Query Empl. │
    │-Classif │  │- NY: 5°C     │  │- Query Orders│
    │  queries│  │- London: 8°C │  │- Aggregation │
    │-Generate│  │- Tokyo: 12°C │  │- Summarize   │
    │response │  │- Sydney: 25°C│  │              │
    └─────────┘  │- Paris: 6°C  │  └──────────────┘
                 │- Dubai: 32°C │
                 │- Mumbai: 28°C│
                 └──────────────┘
                        │
                        ▼
                  ┌──────────────┐
                  │   MongoDB    │
                  │    Atlas     │
                  │              │
                  │ Collections: │
                  │- Employees   │
                  │- Orders      │
                  └──────────────┘
```

## Data Flow

### Query Processing Flow

1. **Input**: User enters natural language query
2. **Routing**: Query sent to `/api/llm/query` endpoint
3. **Classification**: LLM Router analyzes query
   - Weather query → Weather Tool
   - Database query → Database Tool
   - General query → Default response
4. **Execution**: Tool executes and returns raw data
5. **Response Generation**: LLM generates human-readable response
6. **Output**: Clean English response sent to user

## Component Details

### LLM Router (llmRouter.js)
- **classifyQuery()**: Uses HuggingFace Llama 2 to classify queries
  - Returns: { type, intent, params }
- **generateResponse()**: Converts tool results to natural language
  - Input: user query + tool result
  - Output: Human-readable English text

### Weather Tool (weatherTool.js)
- **getWeather(city)**: Fetches mock weather data
- Mock cities: San Francisco, New York, London, Tokyo, Sydney, Paris, Dubai, Mumbai
- Returns: "The weather in [city] is [temp]°C with [condition]."

### Database Tool (databaseTool.js)
- **initializeDatabase()**: Seeds MongoDB with sample data
  - 5 employees in different departments
  - 5 orders with varying amounts
- **queryDatabase(queryType, params)**: Executes specific queries
  - employees_joined_last_month
  - orders_over_amount
  - employees_by_department
  - average_salary
  - total_revenue

### Models

**Employee Schema**
```javascript
{
  name: String,
  position: String,
  department: String,
  salary: Number,
  joinDate: Date,
  email: String
}
```

**Order Schema**
```javascript
{
  orderId: String,
  customerName: String,
  amount: Number,
  status: String,
  createdDate: Date,
  items: String
}
```

## API Reference

### POST /api/llm/query
Main endpoint for natural language processing.

**Request:**
```json
{
  "query": "Tell me the weather in San Francisco"
}
```

**Response:**
```json
{
  "userQuery": "Tell me the weather in San Francisco",
  "response": "The weather in San Francisco is 18°C with clear skies."
}
```

**Error Response:**
```json
{
  "error": "Query is required and must be a non-empty string"
}
```

### GET /api/weather/:city
Get weather for a specific city.

**Response:**
```json
{
  "city": "San Francisco",
  "result": "The weather in San Francisco is 18°C with clear skies."
}
```

### POST /api/database/query
Execute database query directly.

**Request:**
```json
{
  "queryType": "orders_over_amount",
  "params": { "amount": 500 }
}
```

**Response:**
```json
{
  "result": "Found 4 order(s) over $500: ORD001 ($750), ORD002 ($1200), ORD004 ($580), ORD005 ($2100)."
}
```

### GET /api/database/init
Initialize database with sample data.

**Response:**
```json
{
  "message": "Database initialized"
}
```

## Sample Queries & Responses

### Weather Queries
1. Input: "What's the weather in Tokyo?"
   Output: "The weather in Tokyo is 12°C with partly cloudy."

2. Input: "Tell me about Dubai weather"
   Output: "The weather in Dubai is 32°C with sunny."

### Database Queries
1. Input: "How many employees joined last month?"
   Output: "1 employee(s) joined last month: Michael Chen."

2. Input: "Show me orders over 500 dollars"
   Output: "Found 4 order(s) over $500: ORD001 ($750), ORD002 ($1200), ORD004 ($580), ORD005 ($2100)."

3. Input: "What's the average salary?"
   Output: "The average salary is $95000."

4. Input: "List engineers in the company"
   Output: "3 employee(s) in Engineering: John Smith, Michael Chen, David Brown."

5. Input: "What is the total revenue from all orders?"
   Output: "Total revenue from all orders is $4980."

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 18.2.0 |
| Frontend HTTP | Axios | 1.6.0 |
| Backend | Express.js | 4.18.2 |
| Database | MongoDB Atlas | - |
| ORM | Mongoose | 8.0.0 |
| LLM API | HuggingFace | Llama 2 |
| Auth | dotenv | 16.3.1 |

## Key Features

✅ **Natural Language Processing**: Accept any user query
✅ **Intelligent Routing**: Automatic classification of query type
✅ **Weather Tool**: Mock weather data for 8 cities
✅ **Database Tool**: CRUD operations on employees and orders
✅ **MongoDB Integration**: Real database with sample data
✅ **LLM Integration**: HuggingFace Llama 2 for classification and response generation
✅ **Clean Output**: No raw data, SQL, or debug information in responses
✅ **Full Stack**: Complete MERN application with modern React UI
✅ **Error Handling**: Comprehensive error management
✅ **Responsive Design**: Mobile-friendly interface

## Deployment Considerations

- MongoDB URI is stored in `.env`
- HuggingFace API key required for LLM operations
- CORS enabled for frontend-backend communication
- Express runs on port 5000
- React development server on port 3000
- Proxy configured in client package.json for API calls
