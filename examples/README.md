# GovContract Radar — API Examples

Three ways to try GovContract Radar in under 2 minutes. No key needed for the public feed.

## 1. curl (any terminal)

```bash
# Public feed — 15 latest federal opportunities, no key, no login
curl https://pixharvest.com/api/gov/today.json

# Pretty-print titles and NAICS codes
curl -s https://pixharvest.com/api/gov/today.json \
  | python3 -m json.tool \
  | grep -E '"title"|"naics"' | head -30
```

## 2. Python (requests)

```python
import requests

# Public feed — no key required
r = requests.get("https://pixharvest.com/api/gov/today.json", timeout=15)
data = r.json()

print(f"{data['count']} opportunities, source: {data['source']}")
for opp in data["opportunities"]:
    print(f"- [{opp['type']}] {opp['title'][:70]}")
    print(f"    NAICS: {', '.join(opp['naics'])} · Agency: {opp['agency'][:50]}")
    print(f"    SAM.gov: {opp['url']}")
```

## 3. AI agent — MCP server

Connect any MCP-compatible agent (Claude Desktop, Cursor, Windsurf…):

```json
{
  "mcpServers": {
    "gov-radar": {
      "type": "http",
      "url": "https://gov.pixharvest.com/mcp"
    }
  }
}
```

Then ask your agent:

> "What federal opportunities are open this week for NAICS 541511 (IT services)?"

The agent calls `gov.search` / `gov.digest` / `gov.near_expiry` automatically.

---

## What needs a subscription?

| Capability | Free | Starter $19/mo | Pro $79/mo |
|---|---|---|---|
| Live sample feed | ✅ | — | — |
| NAICS filtering | — | 1 code | up to 5 codes |
| Daily email digest | — | ✅ | ✅ |
| Hourly refresh + webhooks | — | — | ✅ |
| Set-aside filtering | — | — | ✅ |
| Signal AI summaries | — | — | ✅ |
| Deadlines + full descriptions | — | ✅ | ✅ |
| Recompete radar | — | — | Radar+ $149/mo |

7-day free trial, no card required: https://pixharvest.com/#trial
