#!/usr/bin/env bash
# GovContract Radar — curl example (no API key needed for public feed)
set -euo pipefail

# 1) Public feed — 15 latest federal opportunities, refreshed hourly
echo "== Public feed =="
curl -sS --max-time 15 https://pixharvest.com/api/gov/today.json | python3 -m json.tool

# 2) Just the titles
echo ""
echo "== Latest opportunity titles =="
curl -sS --max-time 15 https://pixharvest.com/api/gov/today.json \
  | python3 -c "
import json, sys
d = json.load(sys.stdin)
for o in d['opportunities']:
    print(f\"[{o['type']}] {o['title'][:80]} — {', '.join(o['naics'])}\")
"
