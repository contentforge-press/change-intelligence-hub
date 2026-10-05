"""GovContract Radar — Python example (no API key needed for public feed)."""
import requests

# Public feed — 15 latest federal opportunities from SAM.gov, refreshed hourly
r = requests.get("https://pixharvest.com/api/gov/today.json", timeout=15)
r.raise_for_status()
data = r.json()

print(f"{data['count']} opportunities · source: {data['source']}")
print(f"note: {data.get('note', '')}\n")

for opp in data["opportunities"]:
    print(f"- [{opp['type']}] {opp['title'][:70]}")
    print(f"    NAICS: {', '.join(opp['naics'])}")
    print(f"    Agency: {opp['agency'][:60]}")
    print(f"    Posted: {opp.get('postedAt', 'n/a')}")
    print(f"    SAM.gov: {opp['url']}")
    print()
