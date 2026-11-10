#!/usr/bin/env bash
# Launch script for Product 1: DPS Junior Public Website
set -e

echo "=========================================================="
echo " Starting DPS Junior Public School Official Website...   "
echo " URL: http://localhost:5173                               "
echo "=========================================================="

cd "$(dirname "$0")/dps-junior-website"
npm run dev -- --host 0.0.0.0 --port 5173

