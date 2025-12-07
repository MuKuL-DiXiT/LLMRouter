# System Health Check Guide

## Pre-Startup Checklist

### 1. Verify File Structure
```bash
cd /Users/mukuldixit/Desktop/LLMRouter
ls -la
```
Expected output should show:
- server/ directory
- client/ directory
- README.md
- QUICKSTART.md
- ARCHITECTURE.md

### 2. Verify Server Files
```bash
ls -la server/
```
Expected:
- package.json
- server.js
- .env
- controllers/
- models/
- routes/
- tools/

### 3. Verify Client Files
```bash
ls -la client/
```
Expected:
- package.json
- public/
- src/

---

## Installation Check

### Step 1: Install Server Dependencies
```bash
cd server
npm install
```

Check for:
- ✅ express installed
- ✅ mongoose installed
- ✅ axios installed
- ✅ cors installed
- ✅ dotenv installed

### Step 2: Install Client Dependencies
```bash
cd ../client
npm install
```

Check for:
- ✅ react installed
- ✅ axios installed
- ✅ react-scripts installed

---

## Startup Verification

### Terminal 1: Start Server
```bash
cd server
npm start
```

✅ You should see:
```
Server running on port 5000
MongoDB connected
Employees seeded
Orders seeded
```

### Terminal 2: Start Client
```bash
cd client
npm start
```

✅ You should see:
```
Compiled successfully!
You can now view llm-router-client in the browser.
```

✅ Browser opens automatically at http://localhost:3000

---

## Functionality Tests

### Test 1: Web UI Opens
- ✅ Visit http://localhost:3000
- ✅ You see "LLM Router" title
- ✅ Input field is visible
- ✅ Example buttons are displayed

### Test 2: Simple Weather Query
Using the browser UI:
1. Click example: "Tell me the weather in San Francisco"
2. Click Send button
3. ✅ See response: "The weather in San Francisco is 18°C with clear skies."

### Test 3: Database Query
Using the browser UI:
1. Click example: "How many employees joined last month"
2. Click Send button
3. ✅ See response about Michael Chen

### Test 4: Order Query
Using the browser UI:
1. Click example: "List all orders over $500"
2. Click Send button
3. ✅ See response with 4 orders listed

### Test 5: Manual Query
Using the browser UI:
1. Type: "What is the weather in Tokyo"
2. Click Send
3. ✅ See response about Tokyo weather

---

## API Endpoint Tests (Using curl)

### Test 1: Initialize Database
```bash
curl http://localhost:5000/api/database/init
```
✅ Expected: `{"message":"Database initialized"}`

### Test 2: Weather Endpoint
```bash
curl http://localhost:5000/api/weather/london
```
✅ Expected: Weather data for London

### Test 3: Main Query Endpoint
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}'
```
✅ Expected: Response with weather for San Francisco

### Test 4: Employee Query
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How many employees joined last month"}'
```
✅ Expected: Response about Michael Chen

### Test 5: Order Query
```bash
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "List all orders over 500"}'
```
✅ Expected: Response with 4 orders

---

## Port Check

### Verify Port Availability
```bash
lsof -i :5000    # Check if port 5000 is in use
lsof -i :3000    # Check if port 3000 is in use
```

If ports are in use:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## Network Connectivity

### Check MongoDB Connection
If server doesn't connect to MongoDB:
1. Verify internet connection
2. Check MongoDB URI in .env is correct
3. Ensure MongoDB Atlas IP whitelist includes your IP

### Check HuggingFace API
If LLM queries fail:
1. Verify HF_API_KEY in .env
2. Check your API quota at huggingface.co
3. Ensure internet connection is stable

---

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Run `npm install` again in that directory

### Issue: "ECONNREFUSED"
**Solution:** Check if server is running (should see messages in Terminal 1)

### Issue: "MongoDB connection error"
**Solution:** 
- Check internet connection
- Verify .env MongoDB URI
- Restart server

### Issue: "HuggingFace API Error"
**Solution:**
- Check HF_API_KEY in .env
- Restart server
- Try again

### Issue: "Port already in use"
**Solution:** Kill the process using the port (see Port Check section)

---

## Performance Metrics

### Expected Response Times
- Weather query: < 2 seconds
- Database query: < 2 seconds
- Simple question: < 3 seconds

### Resource Usage
- Server: ~50-100 MB RAM
- Client: ~100-150 MB RAM
- Network: ~100-200 KB per query

---

## Data Verification

### Employees in Database
```bash
curl -X POST http://localhost:5000/api/database/query \
  -H "Content-Type: application/json" \
  -d '{"queryType": "employees_by_department", "params": {"department": "Engineering"}}'
```
✅ Should return 3 engineers: John Smith, Michael Chen, David Brown

### Orders in Database
```bash
curl -X POST http://localhost:5000/api/database/query \
  -H "Content-Type: application/json" \
  -d '{"queryType": "orders_over_amount", "params": {"amount": 500}}'
```
✅ Should return 4 orders

---

## Complete System Verification Checklist

- [ ] Server starts without errors
- [ ] Client starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] UI loads with all elements visible
- [ ] Example buttons are clickable
- [ ] Weather query returns proper response
- [ ] Employee query returns proper response
- [ ] Order query returns proper response
- [ ] Manual input works
- [ ] No raw SQL/data in responses
- [ ] All responses are in English
- [ ] No technical jargon in responses
- [ ] Error handling works (try empty query)
- [ ] curl API tests work
- [ ] Database is initialized with sample data

---

## Deployment Readiness

Your system is ready for deployment if:
- ✅ All tests above pass
- ✅ No error messages in terminals
- ✅ Responses are clean and human-readable
- ✅ No raw data/SQL exposed
- ✅ All 5 example queries work

---

## Final Verification

Run this test sequence:
```bash
# Terminal 1: Server
cd server && npm start

# Terminal 2: Client
cd client && npm start

# Terminal 3: Quick tests
curl -X POST http://localhost:5000/api/llm/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me the weather in San Francisco"}'
```

Expected final output:
```json
{
  "userQuery": "Tell me the weather in San Francisco",
  "response": "The weather in San Francisco is 18°C with clear skies."
}
```

**If you see this, your system is fully operational! ✅**

---

## Support

If verification fails:
1. Review the troubleshooting section
2. Check terminal error messages
3. Verify all files are in correct locations
4. Restart both server and client
5. Ensure dependencies are installed

Once all checks pass, you're ready to use LLM Router!
