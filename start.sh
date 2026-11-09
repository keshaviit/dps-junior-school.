#!/bin/bash

# ==========================================================
# DPS JUNIOR PUBLIC SCHOOL - One-Click Local Runner
# ==========================================================

echo "=========================================================="
echo "    Starting DPS JUNIOR PUBLIC SCHOOL (Frontend + Backend) "
echo "=========================================================="

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 1. Check PostgreSQL
echo ""
echo ">> Checking PostgreSQL database..."
if ! pg_isready -q 2>/dev/null; then
  echo ">> Starting PostgreSQL via Homebrew..."
  brew services start postgresql@16 2>/dev/null || brew services start postgresql 2>/dev/null
  sleep 2
fi

if pg_isready -q 2>/dev/null; then
  echo "✓ PostgreSQL is running."
else
  echo "⚠️ Warning: PostgreSQL does not seem to be responding on port 5432."
fi

# 2. Check & Start Backend (Spring Boot on 8080)
echo ""
echo ">> Checking Backend (Spring Boot on port 8080)..."
if lsof -i :8080 >/dev/null 2>&1; then
  echo "✓ Backend is already running on http://localhost:8080"
else
  echo ">> Starting Spring Boot Backend in background..."
  cd "$PROJECT_DIR/backend"
  /Users/keshavgoyal/.maven/apache-maven-3.9.6/bin/mvn spring-boot:run > /tmp/school-backend.log 2>&1 &
  echo "✓ Backend starting in background (logs: /tmp/school-backend.log)"
fi

# 3. Check & Start Frontend (Vite on 5173)
echo ""
echo ">> Checking Frontend (React Vite on port 5173)..."
if lsof -i :5173 >/dev/null 2>&1; then
  echo "✓ Frontend is already running on http://localhost:5173"
else
  echo ">> Starting Frontend dev server..."
  cd "$PROJECT_DIR/frontend"
  npx vite --host 0.0.0.0 --port 5173 &
fi

echo ""
echo "=========================================================="
echo "  🚀 App Ready!"
echo "  • Website & Portal : http://localhost:5173/"
echo "  • Backend API      : http://localhost:8080/api"
echo "  • Admin Login      : admin@school.com / admin123"
echo "=========================================================="

# Open browser if on macOS
if command -v open >/dev/null 2>&1; then
  sleep 1
  open "http://localhost:5173/"
fi

