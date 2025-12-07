# Quick Start Guide

## Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account

## Installation & Running

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Install Client Dependencies
```bash
cd ../client
npm install
cd ..
```

### 3. Start Server (Terminal 1)
```bash
cd server
npm start
```
Expected output:
```
Server running on port 5000
MongoDB connected
Employees seeded
Orders seeded
```

### 4. Start Client (Terminal 2)
```bash
cd client
npm start
```
Expected output:
```
Compiled successfully!
You can now view llm-router-client in the browser.
http://localhost:3000
```

## Testing the System

### Weather Query
Input: "Tell me the weather in San Francisco"
Expected: "The weather in San Francisco is 18°C with clear skies."

### Database Query
Input: "How many employees joined last month"
Expected: "1 employee(s) joined last month: Michael Chen."

### Order Query
Input: "List all orders over 500"
Expected: "Found 4 order(s) over $500: ORD001 ($750), ORD002 ($1200), ORD004 ($580), ORD005 ($2100)."

### Average Salary
Input: "What is the average salary"
Expected: "The average salary is $95000."

## API Testing with cURL

```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in Tokyo"}'
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI in `.env` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### HuggingFace API Errors
- Verify HF_API_KEY in `.env`
- Check API quota limits
- Ensure internet connection

### Port Already in Use
- Change PORT in `.env` for server
- Adjust proxy in client `package.json`

## Project Structure

```
LLMRouter/
├── server/
│   ├── models/
│   │   ├── Employee.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── llmRoutes.js
│   │   ├── weatherRoutes.js
│   │   └── databaseRoutes.js
│   ├── tools/
│   │   ├── llmRouter.js
│   │   ├── weatherTool.js
│   │   └── databaseTool.js
│   ├── controllers/
│   │   └── llmController.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Features

✅ Natural language query processing
✅ Automatic query classification (weather/database)
✅ Weather tool with mock data
✅ Database tool with employee & order management
✅ MongoDB Atlas integration
✅ HuggingFace LLM integration
✅ Clean, readable responses
✅ Full-stack MERN application
✅ Responsive React UI
