# LLM Router

A full-stack application that processes natural language queries through an intelligent routing system powered by AI, enabling seamless integration with weather data and database operations.

## Overview

LLM Router is a MERN (MongoDB, Express, React, Node.js) stack application that accepts natural language user input, processes it through a Large Language Model (LLM), and routes requests to appropriate tools (Weather API or MongoDB database) to provide clean, human-readable responses.

## Features

- **Natural Language Processing**: Accept any natural language query from users
- **Intelligent Routing**: LLM-based system that classifies queries and routes them appropriately
- **Weather Integration**: Real-time weather data fetching with clean English responses
- **Database Operations**: Query MongoDB using natural language and receive summarized results
- **Clean Responses**: All outputs are formatted as single, aggregated English statements without technical jargon

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Axios** - HTTP client for API calls
- **HuggingFace API** - Free LLM inference

### Frontend
- **React** - UI framework
- **Axios** - HTTP client
- **CSS3** - Styling

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- HuggingFace API key (free)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/LLMRouter.git
cd LLMRouter
cd server
npm install
```
CREATE AN ENV FILE WITH 

PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/LLMRouter
HUGGINGFACE_API_KEY=your_api_key_here

``` bash
cd ../client
npm install
cd server
npm start

cd client
npm start
```
