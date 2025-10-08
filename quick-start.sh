#!/bin/bash

# Stack Online Tools - Quick Start Script
# This script helps fix common setup issues and gets you running quickly

echo "🧰 Stack Online Tools - Quick Start"
echo "===================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js $NODE_VERSION installed"
else
    echo "❌ Node.js not found. Please install Node.js 18.17 or higher"
    echo "   Download: https://nodejs.org/"
    exit 1
fi

# Fix npm permissions (macOS/Linux)
echo ""
echo "🔧 Fixing npm permissions..."
if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Running: sudo chown -R \$(whoami) ~/.npm"
    sudo chown -R $(whoami) ~/.npm
    if [ $? -eq 0 ]; then
        echo "✅ npm permissions fixed"
    else
        echo "⚠️  Could not fix permissions automatically"
        echo "   Please run manually: sudo chown -R \$(whoami) ~/.npm"
    fi
else
    echo "⏭️  Skipping permission fix (Windows detected)"
fi

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
elif command -v yarn &> /dev/null; then
    echo "Using yarn..."
    yarn install
else
    echo "Using npm..."
    npm install
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo ""
    echo "❌ Installation failed. Please try:"
    echo "   1. npm cache clean --force"
    echo "   2. rm -rf node_modules package-lock.json"
    echo "   3. npm install"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📖 Then open: http://localhost:3000"
echo ""
echo "📝 For more information, see:"
echo "   - README.md - Full documentation"
echo "   - SETUP.md - Detailed setup guide"
echo "   - PROJECT_STATUS.md - Current project status"
echo ""
echo "Happy coding! 🎨"

