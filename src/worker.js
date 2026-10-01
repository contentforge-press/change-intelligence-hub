// Change Intelligence — company hub (root of pixharvest.com). Zero-dependency Worker.
import { MATRIX_B64 } from './trust.js';
import { FAVICON } from './favicon.const.js';

const PRODUCTS = [
    { key: 'shopify', name: 'Shopify Intel', what: 'Products, prices & inventory', url: 'https://s-shopify.pixharvest.com', tag: 'e-commerce',
      card: 'allbirds.com · 200 products tracked', sample: '$25–$140 · 75% in stock' },
    { key: 'github', name: 'GitHub Intel', what: 'Releases, stars & issues', url: 'https://s-github.pixharvest.com', tag: 'open source',
      card: 'facebook/react · 250,860 ★', sample: 'v19.3.0 · 51k forks' },
    { key: 'app', name: 'App Store Intel', what: 'Versions, ratings & reviews', url: 'https://s-app.pixharvest.com', tag: 'mobile',
      card: 'Instagram · 29.5M ratings', sample: 'v448.0.0 · 4.69 avg' },
    { key: 'hiring', name: 'Hiring Intel', what: 'Open roles & hiring velocity', url: 'https://s-hiring.pixharvest.com', tag: 'talent',
      card: 'Airbnb · 157 open roles', sample: '22 remote · 41 engineers' },
    { key: 'hn', name: 'HackerNews Intel', what: 'Keyword mentions & momentum', url: 'https://s-hn.pixharvest.com', tag: 'buzz',
      card: 'openai · 29,306 mentions', sample: '876 / 30d · Rising' },
];

const CSS = `
:root{--bg:#0b0e14;--card:#141925;--line:#222a3a;--txt:#e8ecf4;--mut:#8b95a7;--acc:#5b8cff;--ok:#56d364}
*{box-sizing:border-box}
body{margin:0;font:16px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--txt)}
.wrap{max-width:1080px;margin:0 auto;padding:0 22px}
header{padding:64px 0 28px}
h1{font-size:44px;line-height:1.1;margin:0 0 14px;letter-spacing:-.5px}
.grad{background:linear-gradient(90deg,#7aa2ff,#56d364);-webkit-background-clip:text;background-clip:text;color:transparent}
p.sub{font-size:19px;color:#c2cad8;max-width:720px;margin:0 0 22px}
.badges{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}
.badge{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:6px 14px;font-size:13px;color:var(--mut)}
.cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}
button,.btn{background:var(--acc);color:#fff;border:0;border-radius:10px;padding:13px 22px;font-size:16px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block}
.btn.ghost{background:transparent;border:1px solid var(--line);color:var(--txt)}
section{padding:36px 0}
h2{font-size:28px;margin:0 0 6px;letter-spacing:-.3px}
.lead{color:var(--mut);margin:0 0 24px;max-width:680px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.pcard{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;text-decoration:none;color:var(--txt);display:block;transition:border-color .15s,transform .15s}
.pcard:hover{border-color:var(--acc);transform:translateY(-2px)}
.pcard .tag{font-size:12px;color:var(--acc);text-transform:uppercase;letter-spacing:.5px}
.pcard h3{margin:6px 0 2px;font-size:20px}
.pcard .what{color:var(--mut);font-size:14px;margin:0 0 14px}
.pcard .stat{font-size:14px;font-weight:600}
.pcard .smp{font-size:13px;color:var(--mut)}
.pcard .go{margin-top:14px;font-size:14px;color:var(--acc)}
.flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
.step{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px}
.step b{color:var(--acc)}
.prices{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.price{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;text-align:center}
.price.hl{border-color:var(--acc);background:linear-gradient(180deg,rgba(91,140,255,.12),var(--card))}
.price .amt{font-size:30px;font-weight:700}
.price .per{color:var(--mut);font-size:13px}
.price ul{list-style:none;padding:0;margin:14px 0 0;font-size:13px;color:var(--mut);text-align:left}
.matrix img{width:100%;border:1px solid var(--line);border-radius:16px}
.how{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px}
code,pre{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
pre{background:#0a0d13;border:1px solid var(--line);border-radius:10px;padding:14px;overflow:auto;font-size:13px;color:#c9d4e8}
footer{border-top:1px solid var(--line);padding:30px 0;color:var(--mut);font-size:13px}
footer a{color:var(--mut)}
@media(max-width:720px){h1{font-size:32px}.prices{grid-template-columns:repeat(2,1fr)}}
`;

const ANALYTICS_JS = `
(function(){try{
var uid=document.cookie.match(/(?:^|; )_uid=([^;]+)/);
if(!uid){uid='a'+Date.now().toString(36)+Math.random().toString(36).slice(2,10);document.cookie='_uid='+uid+';path=/;max-age=31536000;SameSite=Lax';}else uid=uid[1];
function send(o){o.uid=uid;try{navigator.sendBeacon&&navigator.sendBeacon('/__beacon',new Blob([JSON.stringify(o)],{type:'application/json'}));}catch(e){fetch('/__beacon',{method:'POST',keepalive:true,headers:{'content-type':'application/json'},body:JSON.stringify(o)});}}
send({type:'pv',path:location.pathname+location.search,ref:document.referrer||''});
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('a,button');if(!t)return;var h=(t.getAttribute('href')||'');if(h.indexOf('s-')===0)send({type:'event',name:'open_product'});},true);
}catch(e){}})();`;

function page() {
    const cards = PRODUCTS.map(p => `
<a class="pcard" href="${p.url}" data-key="${p.key}">
  <div class="tag">${p.tag}</div>
  <h3>${p.name}</h3>
  <p class="what">${p.what}</p>
  <div class="stat">${p.card}</div>
  <div class="smp">${p.sample}</div>
  <div class="go">Open product →</div>
</a>`).join('');

    return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Change Intelligence — one key, five AI intelligence feeds</title>
<meta name="description" content="Change Intelligence: five production APIs for autonomous AI agents — Shopify, GitHub, App Store, hiring and HackerNews monitoring. Free snapshot, paid change reports; USDC on Base via x402. One key works across all five. Plans from $9/mo.">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:type" content="website"><meta property="og:title" content="Change Intelligence — one key, five AI intelligence feeds">
<meta property="og:description" content="Free snapshot, paid change reports for AI agents. USDC on Base via x402. One key across five feeds.">
<meta property="og:image" content="/matrix.png"><meta name="twitter:card" content="summary_large_image">
<style>${CSS}</style></head><body>

<header><div class="wrap">
  <h1>Change Intelligence,<br>for <span class="grad">autonomous AI agents</span></h1>
  <p class="sub">Five production monitoring APIs across e-commerce, open source, mobile, talent and buzz. Free public snapshot; paid change reports settle in <b>USDC on Base</b> via the native <b>x402</b> protocol — no platform account, no payment processor, <b>0% commission</b>.</p>
  <div class="badges">
    <span class="badge">5 live products</span><span class="badge">One key, all five</span>
    <span class="badge">USDC · Base · x402</span><span class="badge">4/5 in official MCP Registry</span>
  </div>
  <div class="cta">
    <a class="btn" href="https://s-shopify.pixharvest.com/v1/snapshot?store=allbirds.com" target="_blank">Try a free snapshot</a>
    <a class="btn ghost" href="#pricing">See pricing</a>
  </div>
</div></header>

<section><div class="wrap">
  <h2>The five feeds</h2>
  <p class="lead">Each product runs independently and shares one billing layer. Click any card to open the live service.</p>
  <div class="grid">${cards}</div>
</div></section>

<section class="matrix"><div class="wrap">
  <h2>One key, five intelligence feeds</h2>
  <p class="lead">Generate one access key and call every product. Agents without a key get a 402 challenge and can settle per call automatically.</p>
  <a href="/matrix.png" target="_blank"><img src="/matrix.png" alt="Change Intelligence matrix overview" loading="lazy"></a>
</div></section>

<section><div class="wrap">
  <h2>How agents pay</h2>
  <p class="lead">A four-level path from free data to a distilled answer.</p>
  <div class="flow">
    <div class="step"><b>1 · Free</b><br><span class="smp">Public snapshot of any target</span></div>
    <div class="step"><b>2 · 402 challenge</b><br><span class="smp">Paid route returns x402 payment requirements</span></div>
    <div class="step"><b>3 · Settle</b><br><span class="smp">Agent pays USDC on Base, verified by the facilitator</span></div>
    <div class="step"><b>4 · Answer</b><br><span class="smp">Changes / intel / batch / landscape returned</span></div>
  </div>
  <div class="how" style="margin-top:20px">
    <b>Quick example — Shopify</b>
    <pre># free
GET https://s-shopify.pixharvest.com/v1/snapshot?store=allbirds.com

# paid: $0.05 per call, agent settles USDC via x402
GET https://s-shopify.pixharvest.com/v1/changes?store=allbirds.com
# → 402 Payment Required  (PAYMENT-REQUIRED: base64 challenge)</pre>
  </div>
</div></section>

<section id="pricing"><div class="wrap">
  <h2>Simple pricing</h2>
  <p class="lead">Same four tiers on every product. One key works across the family. Monthly, cancel anytime.</p>
  <div class="prices">
    <div class="price"><div class="amt">$9</div><div class="per">Hobby / month</div><ul><li>Paid tools, no attribution</li><li>Higher limits</li></ul></div>
    <div class="price hl"><div class="amt">$99</div><div class="per">Pro / month</div><ul><li>Continuous monitoring</li><li>Email alerts</li></ul></div>
    <div class="price"><div class="amt">$499</div><div class="per">Business / month</div><ul><li>Batch & landscape</li><li>High volume</li></ul></div>
    <div class="price"><div class="amt">$2000</div><div class="per">Enterprise / month</div><ul><li>Unlimited</li><li>Custom integration</li></ul></div>
  </div>
</div></section>

<footer><div class="wrap">
  Change Intelligence · PixHarvest · Built for the agent economy<br>
  <a href="https://s-shopify.pixharvest.com/pricing" target="_blank">pricing</a> ·
  <a href="mailto:contentforge.press@outlook.com">contact</a> ·
  <a href="https://github.com/contentforge-press" target="_blank">github</a>
</div></footer>

<script>${ANALYTICS_JS}</script>
</body></html>`;
}

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });
const png = (b64) => new Response(Uint8Array.from(atob(b64), c => c.charCodeAt(0)), { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' } });

// --- minimal KV analytics (same key shape as product analytics) ---
const DAY = 86400;
async function bump(kv, key, field, n = 1) {
    if (!kv) return;
    let obj = (await kv.get(key, 'json')) || {};
    obj[field] = (obj[field] || 0) + n;
    await kv.put(key, JSON.stringify(obj), { expirationTtl: 62 * DAY });
}
async function beacon(kv, body) {
    const d = new Date().toISOString().slice(0, 10);
    if (body.uid) {
        const uk = `__an_uids__:${d}`;
        let set = (await kv.get(uk, 'json')) || [];
        if (!set.includes(body.uid)) { if (set.length < 50000) set.push(body.uid); await kv.put(uk, JSON.stringify(set), { expirationTtl: 40 * DAY }); await bump(kv, `__an_stat__:${d}`, 'uv'); }
    }
    if (body.type === 'pv') {
        const path = (body.path || '/').split('?')[0] || '/';
        await bump(kv, `__an_pv__:${d}`, path);
        let dom = ''; try { dom = new URL(body.ref || '').hostname.replace(/^www\./, ''); } catch {}
        if (dom && !dom.endsWith('pixharvest.com')) await bump(kv, `__an_ref__:${d}`, dom);
        await bump(kv, `__an_stat__:${d}`, 'pv');
    } else if (body.type === 'event') {
        await bump(kv, `__an_ev__:${d}`, String(body.name || 'x'));
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const p = url.pathname;
        const kv = env.SHARED_KV;
        if (p === '/' ) return new Response(page(), { headers: { 'content-type': 'text/html; charset=utf-8' } });
        if (p === '/health') return json({ ok: true });
        if (p === '/favicon.png') return png(FAVICON);
        if (p === '/matrix.png') return png(MATRIX_B64);
        if (p === '/robots.txt') return new Response('User-agent: *\nAllow: /\n', { headers: { 'content-type': 'text/plain' } });
        if (p === '/__beacon') {
            if (request.method !== 'POST') return json({ error: 'method' }, 405);
            let b = {}; try { b = await request.json(); } catch {}
            await beacon(kv, b);
            return new Response('', { status: 204 });
        }
        if (p === '/v1/admin/stats') {
            const days = Math.min(parseInt(url.searchParams.get('days') || '7'), 30);
            if ((request.headers.get('x-admin-key') || url.searchParams.get('key')) !== 'ba951afdb936eecd4ffb9ddfb1b44b25f47bbab1dfc391ac') return json({ error: 'forbidden' }, 403);
            const totals = {};
            for (let i = 0; i < days; i++) {
                const d = new Date(Date.now() - i * DAY).toISOString().slice(0, 10);
                for (const kind of ['stat', 'pv', 'ref', 'ev']) {
                    const o = (await kv.get(`__an_${kind}__:${d}`, 'json')) || {};
                    for (const k in o) totals[`${kind}:${k}`] = (totals[`${kind}:${k}`] || 0) + o[k];
                }
            }
            return json({ ok: true, days, totals });
        }
        return new Response(page(), { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } });
    },
};
