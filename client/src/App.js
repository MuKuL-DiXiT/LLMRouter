import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a query');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await axios.post('/api/llm/query', { query });
      setResponse(result.data.response);
    } catch (err) {
      setError('Failed to process query. Please try again.');
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    'Tell me the weather in San Francisco',
    'How many employees joined last month',
    'List all orders over 500',
    'What is the average salary',
    'What is the weather in Tokyo'
  ];

  return (
    <div className="app-container">
      <div className="app-card">
        <h1>LLM Router</h1>
        <p className="subtitle">Natural Language Query Processing System</p>

        <form onSubmit={handleSubmit} className="query-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... (e.g., weather, employees, orders)"
            className="query-input"
            disabled={loading}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Send'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {response && (
          <div className="response-box">
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}

        <div className="examples">
          <h4>Try these queries:</h4>
          <div className="example-buttons">
            {exampleQueries.map((example, idx) => (
              <button
                key={idx}
                className="example-btn"
                onClick={() => setQuery(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
