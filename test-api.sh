#!/bin/bash

# LLM Router API Testing Script

API_URL="http://localhost:5000/api"

echo "=========================================="
echo "LLM Router API Testing"
echo "=========================================="
echo ""

# Test 1: Weather Query
echo "Test 1: Weather Query"
echo "Query: Tell me the weather in San Francisco"
curl -s -X POST "$API_URL/llm/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}' | jq .
echo ""
echo ""

# Test 2: Employee Query
echo "Test 2: Employee Join Query"
echo "Query: How many employees joined last month"
curl -s -X POST "$API_URL/llm/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "How many employees joined last month"}' | jq .
echo ""
echo ""

# Test 3: Orders Query
echo "Test 3: Orders Over Amount Query"
echo "Query: List all orders over 500"
curl -s -X POST "$API_URL/llm/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "List all orders over 500"}' | jq .
echo ""
echo ""

# Test 4: Salary Query
echo "Test 4: Average Salary Query"
echo "Query: What is the average salary"
curl -s -X POST "$API_URL/llm/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the average salary"}' | jq .
echo ""
echo ""

# Test 5: Weather in Different City
echo "Test 5: Weather in Tokyo"
echo "Query: What is the weather in Tokyo"
curl -s -X POST "$API_URL/llm/query" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the weather in Tokyo"}' | jq .
echo ""
echo ""

# Test 6: Direct Weather API
echo "Test 6: Direct Weather API"
echo "GET /api/weather/london"
curl -s -X GET "$API_URL/weather/london" | jq .
echo ""
echo ""

# Test 7: Database Init
echo "Test 7: Initialize Database"
echo "GET /api/database/init"
curl -s -X GET "$API_URL/database/init" | jq .
echo ""
echo ""

echo "=========================================="
echo "Testing Complete"
echo "=========================================="
