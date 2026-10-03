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
    { key: 'hn', name: 'HackerNews Intel', what: 'Topic trends & developer conversation signals', url: 'https://s-hn.pixharvest.com', tag: 'buzz',
      card: 'AI coding tools · 8,412 discussions', sample: 'Top · Rising / 30d' },
    { key: 'tariff', name: 'Tariff & Trade Data API', what: 'US HTS rates, duty estimates & trade data', url: 'https://contentforge-press.github.io/us-tariff-data/', tag: 'trade data',
      card: '2026 US tariff & landed-cost · 1,000+ pages', sample: 'Free tier · REST + MCP' },
];

// --- purchase buttons: Dodo Payments checkout (URLs filled after verification approval; custom stays mailto) ---
const BUY = {
    // NOTE: checkout URLs (Dodo) are pasted here after merchant verification; until then buttons point to email so no dead links.
    standard: 'mailto:contentforge.press@outlook.com?subject=PixHarvest%20Standard%20(%2419%2Fmo)',
    pro: 'mailto:contentforge.press@outlook.com?subject=PixHarvest%20Pro%20(%2479%2Fmo)',
    business: 'mailto:contentforge.press@outlook.com?subject=PixHarvest%20Enterprise%20(%24499%2Fmo)',
    hts: 'mailto:contentforge.press@outlook.com?subject=HTS%20Tariff%20Snapshot%20(%2449)',
    hiring: 'mailto:contentforge.press@outlook.com?subject=Hiring%20Intelligence%20Dataset%20(%24199)',
    custom: 'mailto:contentforge.press@outlook.com?subject=Custom%20dataset%20request%20%E2%80%94%20PixHarvest',
};

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
.price .buy{margin-top:12px;display:block;text-align:center;font-size:14px;padding:10px 16px}
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
.leadform{display:grid;gap:10px;max-width:580px;margin:18px 0 6px}
.leadform input,.leadform select,.leadform textarea{background:#0a0d13;border:1px solid var(--line);border-radius:10px;padding:10px 12px;color:var(--txt);font:inherit;font-size:14px}
.leadform textarea{min-height:88px;resize:vertical}
.leadok{font-size:13px;color:var(--ok);min-height:18px;margin-top:2px}
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


const USDC_PAY_JS = `
const USDC_ORDER = 'https://s-github.pixharvest.com';
function usdcPay(plan){
  const box=document.getElementById('usdc-box');
  document.getElementById('usdc-status').textContent='Creating order…';
  box.style.display='block'; box.scrollIntoView({behavior:'smooth'});
  fetch(USDC_ORDER+'/v1/order?plan='+encodeURIComponent(plan)).then(function(r){return r.json();}).then(function(o){
    if(o.error){ document.getElementById('usdc-status').textContent='Order error: '+o.error; return; }
    document.getElementById('usdc-amount').textContent=o.amountUsd+' USDC';
    document.getElementById('usdc-addr').textContent=o.payTo;
    document.getElementById('usdc-tx').textContent='Base network (eip155:8453) · '+o.asset.slice(0,10)+'… · order '+o.orderId+' · expires in 60 min';
    let n=0;
    const t=setInterval(function(){
      fetch(USDC_ORDER+'/v1/order/check?id='+encodeURIComponent(o.orderId)).then(function(r){return r.json();}).then(function(s){
        if(s.status==='paid'){ clearInterval(t); document.getElementById('usdc-status').innerHTML='<b style="color:#1a7f37">✓ Payment confirmed!</b> Your access key: <code>'+s.accessKey+'</code><br>Use it as ?key=… on any PixHarvest endpoint (one key, all five feeds).'; }
        else if(s.status==='expired'){ clearInterval(t); document.getElementById('usdc-status').textContent='Order expired after 60 minutes. Click Pay again to create a new order.'; }
        else { n++; document.getElementById('usdc-status').textContent='Waiting for payment… ('+n+' checks). Send the exact amount to the address above on Base.'; }
      }).catch(function(){});
    },10000);
  }).catch(function(e){ document.getElementById('usdc-status').textContent='Network error: '+e; });
}
`;
const LEAD_JS = `
(function(){try{
var ok=document.getElementById('leadok');if(!ok)return;
window.leadSubmit=function(ev){ev.preventDefault();var f=ev.target;var d={};[].forEach.call(f.querySelectorAll('input,select,textarea'),function(el){if(!el.name)return;d[el.name]=el.value;});
if(d.website){ok.textContent='Thanks!';f.reset();return;}
fetch('/api/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)}).then(function(r){return r.json();}).then(function(r){if(r.ok){ok.textContent='Message sent - we reply within 24h.';f.reset();}else{ok.textContent='Send failed - please email contentforge.press@outlook.com.';}}).catch(function(){ok.textContent='Send failed - please email contentforge.press@outlook.com.';});return false;};
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
<title>Change Intelligence — one key, five data intelligence feeds</title>
<meta name="description" content="Change Intelligence: five production data APIs for autonomous AI agents — Shopify, GitHub, App Store, HackerNews and US tariff data. Free snapshot, paid change reports; USDC on Base via x402; card checkout. One key works across all five. Plans from $19/mo.">
<link rel="icon" type="image/png" href="/favicon.png">
<meta property="og:type" content="website"><meta property="og:title" content="Change Intelligence — one key, five AI intelligence feeds">
<meta property="og:description" content="Free snapshot, paid change reports for AI agents. USDC on Base via x402. One key across five feeds.">
<meta property="og:image" content="/matrix.png"><meta name="twitter:card" content="summary_large_image">
<style>${CSS}.usdc-row{margin-top:8px}.usdc-row .btn{display:inline-block;padding:7px 12px;border-radius:8px;font-size:13px;text-decoration:none;cursor:pointer;margin-top:4px}
</style></head><body>

<header><div class="wrap">
  <h1>Change Intelligence,<br>for <span class="grad">autonomous AI agents</span></h1>
  <p class="sub">Five production data APIs across e-commerce, open source, mobile, developer conversations and US trade data. Free public snapshot; paid change reports settle in <b>USDC on Base</b> via the native <b>x402</b> protocol — no platform account, no payment processor, <b>0% commission</b>. Human buyers can also pay by card.</p>
  <div class="badges">
    <span class="badge">5 live products</span><span class="badge">One key, all five</span>
    <span class="badge">USDC · Base · x402</span><span class="badge">4/5 in official MCP Registry</span>
  </div>
  <div class="cta">
    <a class="btn" href="/try">Try a live demo</a>
    <a class="btn ghost" href="#pricing">See pricing</a>
  </div>
  <div class="badges" style="margin-top:14px">
    <a href="#about" style="color:var(--mut);text-decoration:none">About</a> ·
    <a href="#roadmap" style="color:var(--mut);text-decoration:none">Roadmap</a> ·
    <a href="#contact" style="color:var(--mut);text-decoration:none">Contact</a>
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
  <p class="lead">Three subscription tiers on every product. One key works across the family. Monthly, cancel anytime.</p>
  <div class="prices">
    <div class="price"><div class="amt">$19</div><div class="per">Starter / month</div><ul><li>500 API calls / month</li><li>All five feeds</li></ul><a class="btn buy" href="${BUY.standard}" data-buy="standard">Buy · $19/mo card</a><div class="usdc-row">or <a class="btn ghost" onclick="usdcPay('hobby')">Pay · $9/mo USDC</a></div></div>
    <div class="price hl"><div class="amt">$79</div><div class="per">Pro / month</div><ul><li>5,000 API calls / month</li><li>Full dataset coverage</li></ul><a class="btn buy" href="${BUY.pro}" data-buy="pro">Buy · $79/mo card</a><div class="usdc-row">or <a class="btn ghost" onclick="usdcPay('pro')">Pay · $99/mo USDC</a></div></div>
    <div class="price"><div class="amt">$499</div><div class="per">Enterprise / month</div><ul><li>Unlimited calls</li><li>Custom endpoints &amp; SLA</li></ul><a class="btn buy" href="${BUY.business}" data-buy="business">Buy · $499/mo card</a><div class="usdc-row">or <a class="btn ghost" onclick="usdcPay('business')">Pay · $499/mo USDC</a></div></div>
  </div>
  <p class="lead" style="font-size:14px;margin-top:10px">Card billing goes live on Dodo right after review (auto-renewal). Until then, pay in USDC on Base — your key activates automatically within minutes.</p>
  <div id="usdc-box" style="display:none;margin:18px auto 0;max-width:560px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:12px;padding:18px;text-align:left;font-size:14px">
    <div style="font-weight:700;margin-bottom:10px">Pay in USDC on Base</div>
    <div style="line-height:1.8">
      <div>Amount: <b id="usdc-amount"></b></div>
      <div>Send to: <code id="usdc-addr" style="word-break:break-all;display:inline-block;background:#fff;border:1px solid #d0d7de;border-radius:6px;padding:4px 8px"></code></div>
      <div id="usdc-tx" style="color:#57606a"></div>
    </div>
    <div id="usdc-status" style="margin-top:10px;color:#57606a;min-height:20px">Creating order…</div>
    <div style="margin-top:10px;font-size:12px;color:#57606a">One key unlocks all five feeds. Same key as card billing — <a href="#pricing" style="color:#0369a1">how it works</a>.</div>
  </div>
</div></section>

<section id="one-time"><div class="wrap">
  <h2>One-time data products</h2>
  <p class="lead">Buy once, keep forever. Delivered by email within 24 hours.</p>
  <div class="grid">
    <div class="pcard">
      <div class="tag">trade data</div>
      <h3>HTS Tariff Snapshot (2026)</h3>
      <p class="what">Full US HTS schedule — CSV + JSON</p>
      <div class="stat">$49 · one-time</div>
      <div class="smp">1,000+ product pages covered</div>
      <a class="btn buy" href="${BUY.hts}" data-buy="hts">Buy · $49</a>
    </div>
    <div class="pcard">
      <div class="tag">hiring intelligence</div>
      <h3>Hiring Intelligence Dataset</h3>
      <p class="what">13,716 verified job postings · 77 tech companies — CSV + JSON</p>
      <div class="stat">$199 · one-time</div>
      <div class="smp">Role, seniority, remote policy, salary band, stack</div>
      <a class="btn buy" href="${BUY.hiring}" data-buy="hiring">Buy · $199</a>
    </div>
  </div>
</div></section>

<section id="about"><div class="wrap">
  <h2>Why we built this</h2>
  <p class="lead">Software is increasingly written and run by autonomous agents — but agents still struggle to answer one simple question: <i>"did the thing I care about change?"</i> Change Intelligence gives every agent a reliable way to ask, with a price attached to the answer.</p>
  <p class="lead">We are a small, independent team building the boring, dependable plumbing of the agent economy. No venture money, no lock-in, no surveillance: every endpoint speaks open standards (MCP + x402), settles peer-to-peer, and can be replaced. We make money only when our data saves your agent real work.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
    <span class="badge">Open standards</span><span class="badge">Independent &amp; self-funded</span><span class="badge">0% payment commission</span><span class="badge">Global, remote</span>
  </div>
</div></section>

<section id="roadmap"><div class="wrap">
  <h2>Roadmap</h2>
  <div class="prices">
    <div class="price"><div class="per">Shipped</div><ul><li>Five live intelligence APIs</li><li>x402 v1 + v2, Base mainnet</li><li>Official MCP Registry (4/5)</li><li>Email alerts &amp; dashboards</li></ul></div>
    <div class="price hl"><div class="per">Next</div><ul><li>HN in official Registry</li><li>On-chain agent directory (The Spawn)</li><li>Weekly public data briefings</li><li>Wallet-based pay sessions</li></ul></div>
    <div class="price"><div class="per">Later</div><ul><li>More data sources on request</li><li>Team &amp; audit workspaces</li><li>Custom private feeds</li><li>SOC 2 / enterprise contracts</li></ul></div>
  </div>
</div></section>

<section id="custom"><div class="wrap">
  <h2>Need trade, product or engineering data we don't publish?</h2>
  <p class="lead">Custom datasets from <b>$499</b> per project — pricing, product, trade and software-engineering data in CSV / JSON / Parquet, delivered in 3-5 days. We do not sell contact lists or marketing data.</p>
  <a class="btn" href="${BUY.custom}" data-buy="custom">Request a custom dataset →</a>
</div></section>

<section id="contact"><div class="wrap">
  <h2>Talk to a human</h2>
  <p class="lead">Building an agent fleet, need a custom feed, an SLA, an invoice or a pilot? We answer every message.</p>
  <form class="leadform" onsubmit="leadSubmit(event)">
    <input name="name" placeholder="Your name" autocomplete="name">
    <input name="email" type="email" placeholder="Work email (we reply here)" required autocomplete="email">
    <input name="company" placeholder="Company (optional)">
    <select name="product"><option value="">Which data feed are you interested in?</option><option>Shopify Intel</option><option>GitHub Intel</option><option>App Store Intel</option><option>HackerNews Intel</option><option>Tariff &amp; Trade Data</option><option>Hiring Intelligence Dataset</option><option>Custom dataset</option></select>
    <textarea name="message" placeholder="What do you need? Volume, SLA, timeline..." required></textarea>
    <input name="website" tabindex="-1" autocomplete="off" style="display:none" aria-hidden="true">
    <div><button type="submit" class="btn">Send message</button></div>
    <div class="leadok" id="leadok"></div>
  </form>
  <p class="lead">
    <a href="mailto:contentforge.press@outlook.com" style="color:var(--acc)">contentforge.press@outlook.com</a><br>
    <a href="https://github.com/contentforge-press" target="_blank" style="color:var(--acc)">github.com/contentforge-press</a>
    &nbsp;·&nbsp; <span style="color:var(--mut)">Response within 24h, worldwide · remote</span>
  </p>
</div></section>

<footer><div class="wrap">
  Change Intelligence · PixHarvest · Built for the agent economy<br>
  <a href="https://s-shopify.pixharvest.com/pricing" target="_blank">pricing</a> ·
  <a href="/terms">terms</a> ·
  <a href="/privacy">privacy</a> ·
  <a href="/refunds">refunds</a> ·
  <a href="mailto:contentforge.press@outlook.com">contact</a> ·
  <a href="https://github.com/contentforge-press" target="_blank">github</a>
</div></footer>

<script>${ANALYTICS_JS}
${LEAD_JS}
${USDC_PAY_JS}</script>
</body></html>`;
}

// --- legal / policy pages (required by payment providers for website verification) ---
const POLICIES = {
    terms: {
        title: 'Terms of Service',
        blocks: [
            ['1. Service', 'Change Intelligence ("the Service") is a set of data APIs and datasets operated by PixHarvest for developers, businesses and autonomous AI agents. By accessing the Service you agree to these Terms.'],
            ['2. Subscriptions & payment', 'Subscription plans are billed monthly through Dodo Payments. You may cancel at any time; access continues until the end of the paid period. Prices are in USD and may change with notice.'],
            ['3. API usage', 'Each plan has rate limits and usage quotas as documented. You may integrate our data into your own products, but may not resell or redistribute raw feeds as a competing data service without a written license.'],
            ['4. One-time data products', 'One-time datasets (CSV/JSON/Parquet) are delivered by email within 24 hours and licensed for internal business use.'],
            ['5. Disclaimer', 'Data is sourced from public third-party services and is provided "as is" without warranty of accuracy, completeness or fitness for a particular purpose.'],
            ['6. Limitation of liability', 'To the maximum extent permitted by law, PixHarvest is not liable for indirect, incidental or consequential damages arising from use of the Service.'],
            ['7. Contact', 'Questions: contentforge.press@outlook.com'],
        ],
    },
    privacy: {
        title: 'Privacy Policy',
        blocks: [
            ['1. What we collect', 'Our website stores only anonymous analytics: page views, referrer hostname, and a first-party cookie (_uid) used for visitor counting. API usage is logged by target, endpoint and timestamp for metering and abuse prevention.'],
            ['2. Payments', 'Payments are processed by Dodo Payments, a third-party payment provider (Merchant of Record). We never see or store your card details. Dodo Payments\u2019 privacy policy applies to payment data.'],
            ['3. Cookies', 'We set one first-party analytics cookie (_uid) with a one-year lifetime. No third-party advertising cookies are used.'],
            ['4. Data sharing', 'We do not sell personal data. Logged data is used only to operate, meter and improve the Service.'],
            ['5. Your rights', 'You may contact us to request access to or deletion of personal data we hold. Contact: contentforge.press@outlook.com'],
        ],
    },
    refunds: {
        title: 'Refund Policy',
        blocks: [
            ['1. Subscriptions', 'Subscription plans can be cancelled at any time from your Dodo Payments dashboard (or by emailing us). If the Service is unusable due to our fault, we will refund the most recent charge within 7 days of the charge date.'],
            ['2. One-time data products', 'One-time datasets qualify for a full refund within 14 days of purchase if the file was not delivered or is materially defective. After successful download and delivery, no refund applies unless the data is materially wrong.'],
            ['3. How to request', 'Email contentforge.press@outlook.com with your payment reference. Refunds are issued to the original payment method within 5-10 business days.'],
        ],
    },
};

function policyPage(kind) {
    const p = POLICIES[kind] || POLICIES.terms;
    const body = p.blocks.map(([h, t]) => `<h2>${h}</h2><p>${t}</p>`).join('');
    return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title} — Change Intelligence</title>
<style>body{margin:0;font:16px/1.7 -apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#0b0e14;color:#e8ecf4}.wrap{max-width:760px;margin:0 auto;padding:48px 22px}h1{font-size:30px;margin:0 0 8px}h2{font-size:19px;color:#7aa2ff;margin:28px 0 6px}p{color:#c2cad8;margin:0 0 6px}a{color:#5b8cff}.back{margin-top:40px}</style></head><body>
<div class="wrap"><h1>${p.title}</h1>
${body}
<p class="back"><a href="/">← Back to Change Intelligence</a></p>
</div></body></html>`;
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

function demoPage() {
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Shopify Intel — Live Demo · PixHarvest</title>' +
    '<style>body{margin:0;background:#0b0e14;color:#e8ecf4;font:15px/1.55 -apple-system,Segoe UI,Roboto,Arial,sans-serif}a{color:#7db4ff}.top{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:#141925;border-bottom:1px solid #222a3a;font-size:13px;color:#8b95a7}header{padding:34px 18px 18px;max-width:980px;margin:0 auto}h1{font-size:30px;margin:0 0 8px;letter-spacing:-.5px}h1 span{background:linear-gradient(90deg,#7db4ff,#9d7bff);-webkit-background-clip:text;background-clip:text;color:transparent}p{margin:0 0 18px;color:#b8c0d0}form{display:flex;gap:10px;flex-wrap:wrap}input{flex:1;min-width:220px;padding:12px 14px;border-radius:10px;border:1px solid #2a3348;background:#10151f;color:#e8ecf4;font-size:15px;outline:none}input:focus{border-color:#3b82f6}button{padding:12px 22px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-size:15px;font-weight:600;cursor:pointer}button:disabled{opacity:.5;cursor:wait}#note{font-size:12px;color:#6b7689;margin-top:8px}main{max-width:980px;margin:8px auto 0;padding:0 18px}.ph,.err{background:#141925;border:1px solid #222a3a;border-radius:12px;padding:28px;text-align:center;color:#8b95a7}.err{color:#f59e9e;border-color:#7f1d1d}.sum{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.sum>div{flex:1;min-width:130px;background:#141925;border:1px solid #222a3a;border-radius:12px;padding:14px;text-align:center}.sum b{display:block;font-size:22px;color:#7db4ff}.sum span{font-size:12px;color:#8b95a7}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}.card{display:block;background:#141925;border:1px solid #222a3a;border-radius:12px;padding:14px;color:#e8ecf4;text-decoration:none;transition:border-color .15s}.card:hover{border-color:#3b82f6}.t{font-size:13px;min-height:40px;margin-bottom:10px;color:#c8d0de}.row{display:flex;justify-content:space-between;align-items:center}.px{font-weight:700;color:#7db4ff}.st{font-size:11px;padding:3px 8px;border-radius:999px}.st.ok{background:#123a1f;color:#56d364}.st.no{background:#3a1f12;color:#f59e9e}.note{font-size:12px;color:#6b7689;margin:14px 0 6px}.cta{max-width:980px;margin:26px auto 0;padding:0 18px 40px}.cta h2{font-size:22px;margin:0 0 14px}.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}.plan{background:#141925;border:1px solid #222a3a;border-radius:12px;padding:16px}.plan.hot{border-color:#3b82f6}.plan b{font-size:24px;color:#7db4ff}.plan span{display:block;font-size:12px;color:#8b95a7;margin:6px 0 12px}.plan a{display:block;text-align:center;padding:9px;border-radius:9px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600}</style></head><body>' +
    '<div class="top"><a href="/">pixharvest.com</a><span>Shopify Intel · live demo</span></div>' +
    '<header><h1>See any <span>Shopify store</span>, instantly</h1><p>Type a store domain and get a live product snapshot — real data, free, no sign-up.</p>' +
    '<form id="f"><input id="s" value="allbirds.com" placeholder="e.g. gymshark.com"><button id="b">Load snapshot</button></form>' +
    '<div id="note">Tip: try allbirds.com, gymshark.com, or any store domain that runs on Shopify.</div></header>' +
    '<main id="out"><div class="ph">Enter a store and hit Load snapshot.</div></main>' +
    '<footer class="cta"><h2>Turn this into your data pipeline</h2><div class="plans">' +
    '<div class="plan"><b>$19</b><span>Starter · 1,000 calls / month</span><a href="' + BUY.standard + '">Order starter</a></div>' +
    '<div class="plan hot"><b>$79</b><span>Pro · 10,000 calls / month + change history</span><a href="' + BUY.pro + '">Order pro</a></div>' +
    '<div class="plan"><b>$499</b><span>Custom · dedicated store tracking</span><a href="' + BUY.business + '">Talk to us</a></div>' +
    '</div></footer>' +
    '<script>var form=document.getElementById("f"),inp=document.getElementById("s"),btn=document.getElementById("b"),out=document.getElementById("out");' +
    'function esc(x){return String(x).replace(/[&<>"\']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","\'":"&#39;"}[c];});}' +
    'form.addEventListener("submit",function(e){e.preventDefault();var store=inp.value.trim();if(!store)return;btn.disabled=true;btn.textContent="Loading…";out.innerHTML="<div class=ph>Fetching "+esc(store)+" …</div>";' +
    'fetch("/api/shopify-snapshot?store="+encodeURIComponent(store)).then(function(r){return r.json();}).then(function(d){render(d,store);}).catch(function(){out.innerHTML="<div class=err>Request failed — is that a real Shopify store domain?</div>";}).then(function(){btn.disabled=false;btn.textContent="Load snapshot";});});' +
    'function render(d,store){if(!d||!d.sample||!d.sample.length){out.innerHTML="<div class=err>No products found for "+esc(store)+". Try a Shopify domain like allbirds.com.</div>";return;}' +
    'var prices=d.sample.map(function(p){return p.minPrice||0;}).filter(function(x){return x>0;});var min=Math.min.apply(null,prices),max=Math.max.apply(null,prices);' +
    'var inStock=0,outN=0;d.sample.forEach(function(p){if(p.available)inStock++;else outN++;});' +
    'var cards=d.sample.map(function(p){return "<a class=card href="+esc(p.url||"#")+" target=_blank rel=noopener><div class=t>"+esc(p.title)+"</div><div class=row><span class=px>$"+esc(p.minPrice)+"</span><span class=\"st "+(p.available?"ok":"no")+"\">"+(p.available?"In stock":"Sold out")+"</span></div></a>";}).join("");' +
    'out.innerHTML="<div class=sum><div><b>"+d.productCount+"</b><span>products tracked</span></div><div><b>$"+min+"–$"+max+"</b><span>price range (sample)</span></div><div><b>"+inStock+"/"+(inStock+outN)+"</b><span>in stock (sample)</span></div></div><div class=grid>"+cards+"</div>" +' +
    '"<div class=note>Showing "+d.sample.length+" of "+d.productCount+" products · free public snapshot · <a href=\\"https://s-shopify.pixharvest.com/v1/snapshot?store="+encodeURIComponent(store)+"\\" target=_blank>view raw JSON</a></div>";}' +
    '<\/script></body></html>';
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const p = url.pathname;
        const kv = env.SHARED_KV;
        if (p === '/' || p === '/pricing' || p === '/faq') return new Response(page(), { headers: { 'content-type': 'text/html; charset=utf-8' } });
        if (p === '/try' ) return new Response(demoPage(), { headers: { 'content-type': 'text/html; charset=utf-8' } });
        if (p === '/api/shopify-snapshot') {
            const store = (url.searchParams.get('store') || '').trim();
            if (!store || store.length > 120) return json({ error: 'missing or invalid store' }, 400);
            try {
                const up = await fetch('https://s-shopify.pixharvest.com/v1/snapshot?store=' + encodeURIComponent(store), { signal: AbortSignal.timeout(15000) });
                const body = await up.text();
                return new Response(body, { headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' } });
            } catch (e) {
                return json({ error: 'upstream failed: ' + String(e && e.message || e) }, 502);
            }
        }
        if (p === '/api/lead') {
            if (request.method !== 'POST') return json({ error: 'method' }, 405);
            let b = {}; try { b = await request.json(); } catch {}
            if (!b.email || !b.message || String(b.email).length > 200 || String(b.message).length > 4000) return json({ error: 'bad input' }, 400);
            if (b.website) return json({ ok: true }); // honeypot
            const rec = { ts: new Date().toISOString(), name: String(b.name || '').slice(0, 100), email: String(b.email).trim().slice(0, 200), company: String(b.company || '').slice(0, 100), product: String(b.product || '').slice(0, 60), message: String(b.message).slice(0, 4000), ip: request.headers.get('cf-connecting-ip') || '', ua: (request.headers.get('user-agent') || '').slice(0, 120) };
            await kv.put('__lead:' + Date.now().toString(36) + ':' + Math.random().toString(36).slice(2, 8), JSON.stringify(rec));
            return json({ ok: true });
        }
        if (p === '/api/leads' || p === '/api/cursor') {
            if ((request.headers.get('x-admin-key') || url.searchParams.get('key')) !== 'ba951afdb936eecd4ffb9ddfb1b44b25f47bbab1dfc391ac') return json({ error: 'forbidden' }, 403);
            if (p === '/api/cursor') {
                if (request.method === 'POST') { let b = {}; try { b = await request.json(); } catch {} if (b.ts) await kv.put('__lead_cursor', String(b.ts)); return json({ ok: true }); }
                return json({ ok: true, ts: (await kv.get('__lead_cursor')) || null });
            }
            const after = url.searchParams.get('after') || '';
            const list = await kv.list({ prefix: '__lead:' });
            let items = [];
            for (const k of list.keys) { const v = await kv.get(k.name, 'json'); if (v) items.push(v); }
            items.sort((a, b) => (a.ts < b.ts ? 1 : -1));
            if (after) items = items.filter(x => x.ts > after);
            return json({ ok: true, count: items.length, items });
        }
        if (p === '/health') return json({ ok: true });
        if (p === '/terms' || p === '/privacy' || p === '/refunds') return new Response(policyPage(p.slice(1)), { headers: { 'content-type': 'text/html; charset=utf-8' } });
        if (p === '/sitemap.xml') return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://pixharvest.com/</loc></url>\n  <url><loc>https://pixharvest.com/pricing</loc></url>\n  <url><loc>https://pixharvest.com/try</loc></url>\n  <url><loc>https://pixharvest.com/terms</loc></url>\n  <url><loc>https://pixharvest.com/privacy</loc></url>\n  <url><loc>https://pixharvest.com/refunds</loc></url>\n</urlset>\n', { headers: { 'content-type': 'application/xml' } });
        if (p === '/favicon.png') return png(FAVICON);
        if (p === '/matrix.png') return png(MATRIX_B64);
        if (p === '/robots.txt') return new Response('User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\nSitemap: https://pixharvest.com/sitemap.xml\n', { headers: { 'content-type': 'text/plain' } });
        if (p === '/__beacon') {
            if (request.method !== 'POST') return json({ error: 'method' }, 405);
            let b = {}; try { b = await request.json(); } catch {}
            await beacon(kv, b);
            return new Response('', { status: 204 });
        }
        if (p === '/v1/admin/issue-key') {
            // 人工补发 access key 的保险端点（链上已到账但自动链路未识别时，核对后手动发 key）
            if ((request.headers.get('x-admin-key') || url.searchParams.get('key')) !== 'ba951afdb936eecd4ffb9ddfb1b44b25f47bbab1dfc391ac') return json({ error: 'forbidden' }, 403);
            if (request.method !== 'POST') return json({ error: 'method' }, 405);
            const plan = ['hobby', 'pro', 'business', 'enterprise'].includes(url.searchParams.get('plan')) ? url.searchParams.get('plan') : 'hobby';
            const note = String(url.searchParams.get('note') || '').slice(0, 120);
            const bytes = new Uint8Array(24); crypto.getRandomValues(bytes);
            const accessKey = 'sci_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
            const now = Date.now();
            const expiresAt = new Date(now + 30 * 86400000).toISOString();
            await kv.put('sub-' + accessKey, JSON.stringify({ accessKey, plan, payer: note || 'manual-issue', startedAt: new Date(now).toISOString(), expiresAt, priceUsd: 0, source: 'manual' }));
            return json({ ok: true, accessKey, plan, expiresAt, note });
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
