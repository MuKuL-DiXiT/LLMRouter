# Complete User Manual - LLM Router

## Welcome to LLM Router

This is your complete guide to using the LLM Router system.

---

## 🎯 What is LLM Router?

LLM Router is a natural language query processing system that:
- Listens to your natural language questions
- Automatically classifies your query
- Routes it to the appropriate tool (Weather or Database)
- Returns clean, human-readable answers

No SQL, no technical jargon, just English.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd /Users/mukuldixit/Desktop/LLMRouter
npm install --prefix server
npm install --prefix client
```

### Step 2: Start Server
```bash
cd server
npm start
```
You should see:
```
Server running on port 5000
MongoDB connected
Employees seeded
Orders seeded
```

### Step 3: Start Client
Open a new terminal:
```bash
cd client
npm start
```
Browser opens automatically at `http://localhost:3000`

### Step 4: Start Querying!
Type your questions in the input field and press Send.

---

## 💬 Query Examples

### Weather Queries

#### Example 1: San Francisco Weather
```
Input: "Tell me the weather in San Francisco"
Output: "The weather in San Francisco is 18°C with clear skies."
```

#### Example 2: Tokyo Weather
```
Input: "What's the weather in Tokyo?"
Output: "The weather in Tokyo is 12°C with partly cloudy."
```

#### Example 3: Dubai Weather
```
Input: "How is the weather in Dubai"
Output: "The weather in Dubai is 32°C with sunny."
```

#### Available Cities
- San Francisco (18°C, clear skies)
- New York (5°C, cloudy with snow)
- London (8°C, rainy)
- Tokyo (12°C, partly cloudy)
- Sydney (25°C, sunny)
- Paris (6°C, overcast)
- Dubai (32°C, sunny)
- Mumbai (28°C, humid with clouds)

---

### Employee Queries

#### Example 1: Employees Joined Last Month
```
Input: "How many employees joined last month?"
Output: "1 employee(s) joined last month: Michael Chen."
```

#### Example 2: Engineering Department
```
Input: "Show me employees in the Engineering department"
Output: "3 employee(s) in Engineering: John Smith, Michael Chen, David Brown."
```

#### Example 3: Average Salary
```
Input: "What is the average salary?"
Output: "The average salary is $95000."
```

#### Available Employee Information
- John Smith: Software Engineer, Engineering, $95,000
- Sarah Johnson: Product Manager, Product, $85,000
- Michael Chen: DevOps Engineer, Engineering, $100,000 (Recent hire)
- Emma Williams: Data Analyst, Analytics, $75,000
- David Brown: Senior Engineer, Engineering, $120,000

---

### Order Queries

#### Example 1: Orders Over $500
```
Input: "List all orders over 500"
Output: "Found 4 order(s) over $500: ORD001 ($750), ORD002 ($1200), ORD004 ($580), ORD005 ($2100)."
```

#### Example 2: Total Revenue
```
Input: "What is the total revenue from all orders?"
Output: "Total revenue from all orders is $4980."
```

#### Available Orders
- ORD001: $750 (Completed)
- ORD002: $1,200 (Completed)
- ORD003: $350 (Pending)
- ORD004: $580 (Completed)
- ORD005: $2,100 (Completed)

---

## 🎮 UI Features

### Input Field
- Type your question naturally
- Press "Send" or hit Enter
- System shows "Processing..." while working

### Example Buttons
Click these pre-filled queries for quick testing:
1. "Tell me the weather in San Francisco"
2. "How many employees joined last month"
3. "List all orders over $500"
4. "What is the average salary"
5. "What is the weather in Tokyo"

### Response Box
Shows the clean, English response from the system.

### Error Messages
Red error box appears if:
- You submit an empty query
- Server is not running
- Network error occurs

---

## 🔍 How It Works Behind the Scenes

```
You Ask Question
    ↓
Question Sent to Server
    ↓
LLM Analyzes Question
    ↓
System Routes to:
  └─ Weather Tool (if about weather)
  └─ Database Tool (if about employees/orders)
  └─ General Response (for other questions)
    ↓
Tool Executes Query
    ↓
LLM Creates English Response
    ↓
You See Clean Answer
```

---

## 🛠️ Troubleshooting

### Issue: "Failed to process query"
**Solution:**
1. Check if server is running (Terminal 1 should show no errors)
2. Make sure you're connected to internet (HuggingFace API needs connection)
3. Try again

### Issue: Server crashes with MongoDB error
**Solution:**
1. Check your internet connection
2. Verify .env file has correct MongoDB URI
3. Restart the server

### Issue: Port 5000 or 3000 already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: No employees showing up
**Solution:**
1. Server was not initialized properly
2. Make a database query to trigger initialization
3. Or manually visit: http://localhost:5000/api/database/init

---

## 📊 Query Categories

### Weather Queries
System recognizes:
- "weather in [city]"
- "temperature in [city]"
- "[city] weather"
- "Is it [raining/sunny] in [city]"

### Employee Queries
System recognizes:
- "employees joined [time period]"
- "[department] employees"
- "salary [calculation]"
- "employee list"

### Order Queries
System recognizes:
- "orders [condition]" (e.g., over $500)
- "total [revenue/orders]"
- "revenue"
- "order [status]"

---

## 🎨 UI Navigation

### Main Page Components
1. **Header**
   - Title: "LLM Router"
   - Subtitle: "Natural Language Query Processing System"

2. **Query Form**
   - Text input for your questions
   - Send button to submit
   - Loading indicator during processing

3. **Response Area**
   - Shows the clean answer
   - Updates after each query

4. **Example Section**
   - 5 pre-filled example queries
   - Click to instantly populate the input field

---

## 💡 Pro Tips

1. **Natural Language Works**: You don't need exact phrasing
   - "How many people in engineering?" also works
   - "Show me the weather in NY" works (even with abbreviations)

2. **Multiple Queries**: Ask follow-up questions
   - First: "How many employees?"
   - Then: "What's the average salary?"

3. **Combine Concepts**: Ask about different domains
   - Weather then employees
   - Orders then weather
   - System handles context switching

4. **Date Flexibility**: Various date formats work
   - "last month"
   - "this month"
   - "recently"

---

## 📱 Mobile Usage

The system works on mobile devices:
- Responsive design adapts to screen size
- Touch-friendly buttons and input
- Works on phones, tablets, desktops

---

## 🔐 Data Privacy

- All queries are processed in real-time
- No query history is stored
- MongoDB stores only sample employee/order data
- No personal user data is collected

---

## ❓ FAQ

**Q: What if I ask something not about weather or database?**
A: The system will respond with "I can help you with weather queries or database questions."

**Q: Can I add more cities/employees/orders?**
A: The frontend doesn't support this yet, but you can modify the backend code in:
- `server/tools/weatherTool.js` (for cities)
- `server/tools/databaseTool.js` (for sample data)

**Q: How accurate is the weather?**
A: The weather data is mock/sample data for demonstration. In production, you could integrate real weather APIs.

**Q: What happens if the LLM API fails?**
A: The system falls back to raw results from the database/weather tool.

**Q: Can I deploy this online?**
A: Yes! See ARCHITECTURE.md for deployment guidance.

---

## 🎓 Learning Resources

### For Developers
- `ARCHITECTURE.md` - System design
- `API-TESTING.md` - API documentation
- Code is well-organized and commented

### Project Structure
```
server/
  ├─ tools/           (Weather, Database, LLM Logic)
  ├─ routes/          (API endpoints)
  ├─ controllers/     (Business logic)
  ├─ models/          (MongoDB schemas)
  └─ server.js        (Main server)

client/
  ├─ src/
  │  ├─ App.js       (Main component)
  │  └─ App.css      (Styling)
  └─ public/          (HTML)
```

---

## 🚀 Next Steps

1. ✅ Open http://localhost:3000
2. ✅ Try the example queries
3. ✅ Ask your own natural language questions
4. ✅ Explore the API with curl commands (see API-TESTING.md)
5. ✅ Review the code and learn from it

---

## 📞 Support

If something doesn't work:
1. Check the troubleshooting section above
2. Verify both server and client are running
3. Check browser console for errors (F12)
4. Review terminal output for server errors
5. Restart both server and client

---

**You're all set! Start asking questions!** 🎉

Visit http://localhost:3000 and begin using LLM Router now.
