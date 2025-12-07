# API Testing Guide

## Prerequisites
- Server running on http://localhost:5000
- curl installed (for command line testing)

## Quick Test Commands

### Initialize Database
```bash
curl http://localhost:5000/api/database/init
```

---

## Weather Queries

### Test 1: San Francisco Weather
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}'
```

**Expected Response:**
```json
{
  "userQuery": "Tell me the weather in San Francisco",
  "response": "The weather in San Francisco is 18°C with clear skies."
}
```

### Test 2: Tokyo Weather
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the weather in Tokyo"}'
```

### Test 3: London Weather
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How is the weather in London"}'
```

---

## Database Queries - Employees

### Test 4: Employees Joined Last Month
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many employees joined last month"}'
```

**Expected Response:**
```json
{
  "userQuery": "How many employees joined last month",
  "response": "1 employee(s) joined last month: Michael Chen."
}
```

### Test 5: Employees by Department
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Show me employees in Engineering department"}'
```

### Test 6: Average Salary
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the average salary"}'
```

**Expected Response:**
```json
{
  "userQuery": "What is the average salary",
  "response": "The average salary is $95000."
}
```

---

## Database Queries - Orders

### Test 7: Orders Over $500
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "List all orders over 500"}'
```

**Expected Response:**
```json
{
  "userQuery": "List all orders over 500",
  "response": "Found 4 order(s) over $500: ORD001 ($750), ORD002 ($1200), ORD004 ($580), ORD005 ($2100)."
}
```

### Test 8: Total Revenue
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the total revenue from all orders"}'
```

---

## Direct API Endpoints

### Get Weather Directly
```bash
curl http://localhost:5000/api/weather/sydney
```

### Get Weather for Multiple Cities
```bash
curl http://localhost:5000/api/weather/paris
curl http://localhost:5000/api/weather/dubai
curl http://localhost:5000/api/weather/mumbai
```

---

## Additional Test Queries

### General Knowledge (if supported)
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is machine learning"}'
```

### Multiple City Weather
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me weather in New York"}'
```

### Order Queries
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many orders have amount over 1000"}'
```

---

## Using JSON Parsing (with jq)

### Pretty Print Response
```bash
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}' | jq .
```

### Extract Just the Response
```bash
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}' | jq .response
```

---

## Error Handling

### Empty Query
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": ""}'
```

**Response:**
```json
{
  "error": "Query is required and must be a non-empty string"
}
```

### Missing Query Parameter
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Response:**
```json
{
  "error": "Query is required and must be a non-empty string"
}
```

---

## Test All Endpoints Script

Save as `test-all.sh` and run with `bash test-all.sh`:

```bash
#!/bin/bash

echo "Testing LLM Router API..."
echo ""

# Weather Test
echo "1. Weather Query Test:"
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}' | jq .response
echo ""

# Employees Test
echo "2. Employees Test:"
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many employees joined last month"}' | jq .response
echo ""

# Orders Test
echo "3. Orders Test:"
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "List all orders over 500"}' | jq .response
echo ""

# Salary Test
echo "4. Average Salary Test:"
curl -s -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the average salary"}' | jq .response
echo ""

echo "All tests completed!"
```
