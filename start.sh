#!/usr/bin/env bash
# Launch script for DPS Junior Public School Website
set -e

echo "=========================================================="
echo " Starting DPS Junior Public School Official Website...   "
echo " URL: http://localhost:5173                               "
echo "=========================================================="

npm run dev -- --host 0.0.0.0 --port 5173
