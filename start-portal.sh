#!/usr/bin/env bash
# Launch script for Product 2: Enterprise Organization Portal Frontend
set -e

echo "=========================================================="
echo " Starting Enterprise Organization Management Portal...   "
echo " URL: http://localhost:5174                               "
echo "=========================================================="

cd "$(dirname "$0")/enterprise-org-portal/frontend"
npm run dev -- --host 0.0.0.0 --port 5174
