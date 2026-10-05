#!/usr/bin/env python3
"""
Demand Intel — HN (Hacker News) demand signal scanner for GovContract Radar.

Searches the free HN Algolia API for recent posts/comments where people are
actively asking about federal contracting pain points (finding opportunities,
NAICS codes, SAM.gov, set-asides, proposal writing). Outputs a markdown report
that GitHub Actions pushes to the repo as DEMAND.md — every row is a real,
clickable HN discussion.

No key needed. Rate: 10k requests/hour limit, we make < 15.
"""
import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

QUERIES = [
    '"government contracting"',
    '"federal contract"',
    '"federal contracts"',
    '"government contracts"',
    '"SAM.gov"',
    '"8(a) certification"',
    '"8(a) company"',
    '"set-aside contract"',
    '"set-aside" "federal"',
    '"govcon"',
    '"RFP response"',
    '"federal proposal"',
    '"federal contractor"',
    '"contracting officer"',
    '"federal procurement"',
]

HIT_LIMIT = 10
HOURS_BACK = 168
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126.0 Safari/537.36"
BASE = "https://hn.algolia.com/api/v1/search"

# titles/comments that are clearly off-topic for govcon demand signals
NOISE = ["qwen", "llama", "quantiz", "gpu", "diffusion", "gemini", "claude", "openai", "chatgpt",
         "electrician", "household", "michelson", "electricity", "weed", "pavement", "circuit"]


def fetch(query, hours_back):
    since = int(time.time()) - hours_back * 3600
    params = urllib.parse.urlencode({
        "query": query,
        "tags": "(story,comment)",
        "numericFilters": f"created_at_i>{since}",
        "hitsPerPage": HIT_LIMIT,
        "advancedSyntax": "true",
    })
    req = urllib.request.Request(f"{BASE}?{params}", headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def hn_url(hit):
    if hit.get("story_id"):
        return f"https://news.ycombinator.com/item?id={hit.get('story_id')}"
    return f"https://news.ycombinator.com/item?id={hit.get('objectID')}"


def main():
    now = datetime.now(timezone.utc)
    report = []
    seen = set()
    for q in QUERIES:
        try:
            data = fetch(q, HOURS_BACK)
        except Exception as e:
            report.append(f"- ⚠️ query `{q}` failed: {e}")
            continue
        for hit in data.get("hits", []):
            oid = hit.get("objectID")
            if oid in seen:
                continue
            title = (hit.get("title") or hit.get("comment_text") or "").strip().replace("\n", " ")[:110]
            low = title.lower()
            if any(n in low for n in NOISE):
                continue
            seen.add(oid)
            author = hit.get("author", "?")
            pts = hit.get("points", 0)
            ncom = hit.get("num_comments", 0)
            ts = datetime.fromtimestamp(hit.get("created_at_i", 0), tz=timezone.utc).strftime("%m-%d %H:%M")
            kind = "story" if hit.get("title") else "comment"
            report.append(f"- **[{title}]({hn_url(hit)})** · {kind} · {author} · ⬆{pts} 💬{ncom} · {ts} UTC · q=`{q}`")

    lines = [
        "# Demand Signals — Hacker News\n",
        f"> Auto-scanned every hour by GitHub Actions via the free HN Algolia API. Only **real discussions** from the last {HOURS_BACK}h where people talk about federal contracting pain points. Updated {now.strftime('%Y-%m-%d %H:%M UTC')}.\n",
        f"**Signals found:** {len([l for l in report if not l.startswith('- ⚠️')])} · queries: {', '.join(QUERIES)}\n",
        "## Discussions\n",
    ]
    if report:
        lines += report
    else:
        lines.append("_No matching discussions in the window. This is normal between business cycles._\n")
    lines.append("\n---\n")
    lines.append("*GovContract Radar surfaces the *new opportunities* these people need. See https://pixharvest.com/ · API: https://pixharvest.com/api/gov/today.json*\n")
    open("DEMAND.md", "w", encoding="utf-8").write("\n".join(lines))
    print("\n".join(lines[:20]))
    print(f"\n[done] total rows: {len(report)}")


if __name__ == "__main__":
    main()
