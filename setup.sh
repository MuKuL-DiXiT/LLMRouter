#!/bin/bash

echo "=========================================="
echo "LLM Router - Project Setup"
echo "=========================================="
echo ""

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install server dependencies"
  exit 1
fi
echo "✓ Server dependencies installed"
echo ""

# Install client dependencies
echo "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install client dependencies"
  exit 1
fi
echo "✓ Client dependencies installed"
echo ""

cd ..

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Open Terminal 1 and run: cd server && npm start"
echo "2. Open Terminal 2 and run: cd client && npm start"
echo "3. Visit http://localhost:3000 in your browser"
echo ""
echo "Note: Make sure .env file in server/ has correct MongoDB URI and HF API Key"
echo "=========================================="
