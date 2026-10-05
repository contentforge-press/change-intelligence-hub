# GovContract Radar — Never Miss a Federal Contract Opportunity

Hourly-synced intelligence on new U.S. federal contract opportunities from **SAM.gov** (the official government system of record). Built for small federal contractors, BD teams and AI agents.

**Posted-to-radar latency ≤ 60 minutes** — hourly sync, 24/7. Data is 100% public domain (SAM.gov + USAspending.gov).

- 🕐 Live radar: https://pixharvest.com/gov/daily
- 📊 Weekly industry ranking: https://pixharvest.com/gov/rank
- 🤖 MCP server for AI agents: `https://gov.pixharvest.com/mcp`
- 🔓 **Public API — no key required** (see below)

---

## 🔓 Public API (no key, no login, CORS-enabled)

Pull the latest federal contract opportunities in one call — no registration, no key, works from the browser, curl, or an AI agent:

```bash
curl https://pixharvest.com/api/gov/today.json
```

Response — the 15 most recent opportunities from the last 7 days, refreshed hourly:

```json
{
  "ok": true,
  "source": "SAM.gov (public domain)",
  "note": "Deadlines, full descriptions and NAICS filtering are available to subscribers",
  "count": 15,
  "opportunities": [
    {
      "title": "36CES Vehicle and Aircraft Wash Rack Maintenance Services",
      "agency": "DEPT OF DEFENSE...PACIFIC AIR FORCES",
      "type": "Sources Sought",
      "naics": ["811310"],
      "setAside": "Small Business Set Aside - Total",
      "postedAt": "2026-10-04T06:45:21Z",
      "url": "https://sam.gov/opp/FA5240..."
    }
  ]
}
```

**What's free:** a live sample of the latest federal opportunities, so you can verify the data is real, fresh and traceable to SAM.gov.

> 💻 **Ready-to-run code:** see [examples/](examples/) for curl, Python and MCP-client snippets.

## 📡 Live proof — real data, updated hourly

This repo is not a mockup. [**LIVE.md**](LIVE.md) is a real snapshot pulled from the live public API — real federal opportunities, real SAM.gov links, real timestamps. For the always-live version, open the [live radar page](https://pixharvest.com/gov/daily) or hit the API yourself: `curl https://pixharvest.com/api/gov/today.json`.

**[→ Open the live data feed](LIVE.md) · [→ Live radar page](https://pixharvest.com/gov/daily)**

**What requires a subscription:** deadlines, full descriptions, NAICS filtering, set-aside filtering, webhooks, daily digests and historical search. See [pricing](https://pixharvest.com/#pricing).

---
- 🖥️ **Live demo — no signup, no login:** https://pixharvest.com/demo — see today's real SAM.gov opportunities and which contracts are expiring soon in your NAICS (recompete windows with named incumbents)
- 💰 **Pay by card instantly:** https://pixharvest.com/pay (Dodo checkout, annual saves 2 months) or invoice via Payoneer


## 🤖 MCP Server (for AI agents)

Model Context Protocol server exposing live federal opportunity data to any MCP-compatible agent (Claude, Cursor, Windsurf, etc.).

**Endpoint:** `https://gov.pixharvest.com/mcp` (Streamable HTTP, JSON-RPC)

### Tools

| Tool | Purpose |
|---|---|
| `gov.search` | Research any opportunity — combine NAICS, keyword, set-aside, posting window |
| `gov.digest` | Daily briefing for one NAICS code — latest postings with deadlines |
| `gov.near_expiry` | Deadline-driven triage — opportunities closing within N days, sorted by urgency |

### Connect in Cursor / Claude / any MCP client

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

Also published on the **official MCP Registry** (Glama, Smithery). No API key needed to explore; subscriptions unlock full filtering and alerting.

---

## ⚡ Features

- **Hourly sync from SAM.gov** — new solicitations, presolicitations, special notices and awards
- **NAICS code filtering** — exactly your line of business (e.g. 541511 IT services)
- **Set-aside filtering** — 8(a), WOSB, HUBZone, SDVOSB, SBA
- **Early-signal Special Notices** — opportunities before they become formal solicitations
- **Deadline alerts** — never lose a bidding window
- **Recompete radar** — expiring contracts you can take over (Radar+)
- **Signal AI summaries** — what each opportunity actually means for you (Pro+)
- **Award intelligence** — who won, from USAspending.gov

## 🚀 Start Free

7-day free trial, no card required — https://pixharvest.com/#trial

Prefer invoice / bank transfer (Payoneer wire or ACH)? https://pixharvest.com/pay

## 📋 Data & Compliance

- Sources: **SAM.gov** (official contracting system of record) + **USAspending.gov**
- 100% public-domain data — fully compliant to read, use and republish
- We never scrape non-public systems and never resell personal data

## ✉️ Contact

contentforge.press@outlook.com — we answer every message within 24 hours, worldwide.
