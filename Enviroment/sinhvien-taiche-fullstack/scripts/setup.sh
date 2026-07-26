#!/bin/bash

# ============================================
# SV Tái Chế - Setup Script
# ============================================

set -e

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   🚀 SV Tái Chế - Project Setup             ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Check for required tools
echo "🔍 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "   ✅ Node.js $(node --version)"
echo "   ✅ npm $(npm --version)"

# Copy env files if not exist
if [ ! -f backend/.env ]; then
    echo ""
    echo "📝 Creating backend/.env from .env.example..."
    cp .env.example backend/.env
    echo "   ✅ backend/.env created"
else
    echo "   ⏭️  backend/.env already exists"
fi

if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env from .env.example..."
    cp .env.example frontend/.env
    echo "   ✅ frontend/.env created"
else
    echo "   ⏭️  frontend/.env already exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

echo "   Installing backend dependencies..."
cd backend && npm install && cd ..

echo "   Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "✅ Dependencies installed!"

# Run database migration
echo ""
echo "🗄️  Setting up database..."

if command -v psql &> /dev/null; then
    echo "   Running migrations..."
    cd backend && npm run migrate && cd ..
    echo "   Running seed data..."
    cd backend && npm run seed && cd ..
    echo "   ✅ Database setup complete"
else
    echo "   ⚠️  PostgreSQL client not found. Please run migrations manually:"
    echo "      cd backend && npm run migrate"
fi

# Build frontend
echo ""
echo "🏗️  Building frontend..."
cd frontend && npm run build && cd ..
echo "   ✅ Frontend build complete"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   🎉 Setup Complete!                         ║"
echo "║                                              ║"
echo "║   Run locally:                               ║"
echo "║   - Backend:  cd backend && npm run dev      ║"
echo "║   - Frontend: cd frontend && npm run dev     ║"
echo "║                                              ║"
echo "║   Or with Docker:                            ║"
echo "║   docker-compose -f docker/docker-compose.yml up -d ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

