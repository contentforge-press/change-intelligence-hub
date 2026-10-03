# -*- coding: utf-8 -*-
"""生成主站 /tools/ 工具矩阵 200 页主题（关税互补型长尾）"""
import json

calc = [
    ("us-tariff-calculator", "US Tariff Calculator 2026", "Calculate US import duty for any product from any country: base HTS rate + Section 301 + MPF + HMF, with landed-cost example."),
    ("landed-cost-calculator", "Landed Cost Calculator", "Estimate total landed cost: FOB + freight + insurance + duty + MPF + HMF + brokerage for imports into the US."),
    ("duty-calculator-2026", "Import Duty Calculator 2026", "Free 2026 import duty calculator for US-bound shipments: duty rate lookup by HS code and country of origin."),
    ("mpf-calculator", "MPF Calculator (Merchandise Processing Fee)", "Calculate US MPF: 0.3464% of value, min $31.67, max $614.35 for formal entries."),
    ("section-301-calculator", "Section 301 Tariff Calculator", "Calculate Section 301 China tariffs by HTS subheading: 7.5% / 25% lists, stacked on base duty."),
    ("hmf-calculator", "HMF Calculator (Harbor Maintenance Fee)", "Estimate Harbor Maintenance Fee: 0.125% on most commercial cargo entering US ports."),
    ("vat-vs-duty-calculator", "VAT vs Duty Calculator", "Compare EU VAT and US import duty on the same product to price international shipments correctly."),
]
hs = [
    ("hs-code-lookup", "HS Code Lookup", "Free HS code lookup: search HTS 2026 by product keyword to find the correct 6-digit HS classification."),
    ("hts-code-search", "HTS Code Search", "Search the 2026 US HTS schedule by product name or chapter. Get duty rates per country of origin."),
    ("hts-chapter-1", "HTS Chapter 1: Live Animals", "HTS Chapter 1 duty rates for live animals imported into the US, with stacked Section 301 estimates."),
    ("hts-chapter-2", "HTS Chapter 2: Meat", "HTS Chapter 2 meat import duty rates to the US: beef, pork, poultry and processed meat, per country."),
    ("hts-chapter-3", "HTS Chapter 3: Fish and Seafood", "US import duties for fish and seafood (HTS Chapter 3) by origin country, 2026 rates."),
    ("hts-chapter-4", "HTS Chapter 4: Dairy", "HTS Chapter 4 dairy import duty rates: milk, cheese, butter, eggs entering the US."),
    ("hts-chapter-5", "HTS Chapter 5: Animal Products", "US HTS Chapter 5 duties for animal-origin products (hides, wool, bristles) in 2026."),
    ("hts-chapter-6", "HTS Chapter 6: Live Plants", "US import duty for live trees, plants, bulbs and cut flowers under HTS Chapter 6."),
    ("hts-chapter-7", "HTS Chapter 7: Vegetables", "US HTS Chapter 7 vegetable import duties, fresh and frozen, by country of origin."),
    ("hts-chapter-8", "HTS Chapter 8: Fruit and Nuts", "US import duties on fruit and nuts (HTS Chapter 8): bananas, apples, almonds, pistachios."),
    ("hts-chapter-9", "HTS Chapter 9: Coffee and Spices", "HTS Chapter 9 duties for coffee, tea, spices and pepper imported into the US."),
    ("hts-chapter-10", "HTS Chapter 10: Cereals", "US HTS Chapter 10 cereal import duties: wheat, rice, corn, barley, oats."),
    ("hts-chapter-11", "HTS Chapter 11: Milling Products", "US import duty on flour, malt and starch under HTS Chapter 11."),
    ("hts-chapter-12", "HTS Chapter 12: Oil Seeds", "HTS Chapter 12 US import duties for oil seeds, soybeans, sunflower and medicinal plants."),
    ("hts-chapter-13", "HTS Chapter 13: Gums and Resins", "US duties for lac, gums, resins and vegetable saps under HTS Chapter 13."),
    ("hts-chapter-14", "HTS Chapter 14: Vegetable Plaiting", "HTS Chapter 14 US import duty rates for vegetable materials used in basketwork."),
    ("hts-chapter-15", "HTS Chapter 15: Fats and Oils", "US HTS Chapter 15 import duties on animal and vegetable fats, oils and waxes."),
    ("hts-chapter-16", "HTS Chapter 16: Prepared Meat", "US import duties on prepared meat, fish and seafood (HTS Chapter 16), 2026."),
    ("hts-chapter-17", "HTS Chapter 17: Sugar", "US HTS Chapter 17 sugar and confectionery import duties with tariff-rate quotas."),
    ("hts-chapter-18", "HTS Chapter 18: Cocoa", "US HTS Chapter 18 cocoa, chocolate and cocoa preparation import duty rates."),
    ("hts-chapter-19", "HTS Chapter 19: Cereal Preparations", "US import duty on bread, pastry, pasta and cereal preparations under HTS Chapter 19."),
    ("hts-chapter-20", "HTS Chapter 20: Prepared Vegetables", "US HTS Chapter 20 duties for prepared vegetables, jams, juices and sauces."),
    ("hts-chapter-21", "HTS Chapter 21: Miscellaneous Food", "US HTS Chapter 21 import duties: sauces, soups, ice cream, yeast and extracts."),
    ("hts-chapter-22", "HTS Chapter 22: Beverages", "US import duty on beverages under HTS Chapter 22: water, juice, beer, wine, spirits."),
    ("hts-chapter-23", "HTS Chapter 23: Animal Feed", "US HTS Chapter 23 duties for animal feed, brans and residues."),
    ("hts-chapter-24", "HTS Chapter 24: Tobacco", "US HTS Chapter 24 tobacco import duties and federal excise tax for imports."),
    ("hts-chapter-25", "HTS Chapter 25: Salt and Sulfur", "US HTS Chapter 25 import duties: salt, sulfur, cement and stone."),
    ("hts-chapter-26", "HTS Chapter 26: Ores", "US HTS Chapter 26 import duty rates for ores, slag and ash."),
    ("hts-chapter-27", "HTS Chapter 27: Fuels", "US HTS Chapter 27 import duties on coal, petroleum and gas products."),
    ("hts-chapter-28", "HTS Chapter 28: Inorganic Chemicals", "US import duties on inorganic chemicals under HTS Chapter 28."),
    ("hts-chapter-29", "HTS Chapter 29: Organic Chemicals", "US HTS Chapter 29 import duty rates for organic chemicals."),
    ("hts-chapter-30", "HTS Chapter 30: Pharmaceuticals", "US HTS Chapter 30 pharmaceutical import duties: medicaments, vaccines, bandages."),
    ("hts-chapter-31", "HTS Chapter 31: Fertilizers", "US HTS Chapter 31 fertilizer import duty rates."),
    ("hts-chapter-32", "HTS Chapter 32: Paints and Dyes", "US HTS Chapter 32 import duties on paints, inks, dyes and pigments."),
    ("hts-chapter-33", "HTS Chapter 33: Cosmetics", "US HTS Chapter 33 cosmetic and perfume import duty rates."),
    ("hts-chapter-34", "HTS Chapter 34: Soap", "US HTS Chapter 34 import duties: soap, detergents, waxes and candles."),
    ("hts-chapter-35", "HTS Chapter 35: Starches and Glues", "US HTS Chapter 35 import duties for albumin, dextrins and glues."),
    ("hts-chapter-36", "HTS Chapter 36: Explosives", "US HTS Chapter 36 import duties: pyrotechnics, matches and propellants."),
    ("hts-chapter-37", "HTS Chapter 37: Photography", "US HTS Chapter 37 import duties on photographic film and plates."),
    ("hts-chapter-38", "HTS Chapter 38: Miscellaneous Chemicals", "US HTS Chapter 38 import duty rates for miscellaneous chemical products."),
    ("hts-chapter-39", "HTS Chapter 39: Plastics", "US HTS Chapter 39 plastics import duty rates, 2026."),
    ("hts-chapter-40", "HTS Chapter 40: Rubber", "US HTS Chapter 40 rubber import duty rates."),
    ("hts-chapter-41", "HTS Chapter 41: Hides and Skins", "US HTS Chapter 41 import duties on raw hides and skins."),
    ("hts-chapter-42", "HTS Chapter 42: Leather Goods", "US HTS Chapter 42 leather goods import duty rates: bags, luggage, belts."),
    ("hts-chapter-43", "HTS Chapter 43: Furskins", "US HTS Chapter 43 furskin import duty rates."),
    ("hts-chapter-44", "HTS Chapter 44: Wood", "US HTS Chapter 44 wood import duty rates: lumber, plywood, flooring."),
    ("hts-chapter-45", "HTS Chapter 45: Cork", "US HTS Chapter 45 cork import duty rates."),
    ("hts-chapter-46", "HTS Chapter 46: Straw Products", "US HTS Chapter 46 import duties for straw and basketwork products."),
    ("hts-chapter-47", "HTS Chapter 47: Wood Pulp", "US HTS Chapter 47 wood pulp import duty rates."),
    ("hts-chapter-48", "HTS Chapter 48: Paper", "US HTS Chapter 48 paper import duty rates: paper, board, packaging."),
    ("hts-chapter-49", "HTS Chapter 49: Printed Matter", "US HTS Chapter 49 import duties on printed books, newspapers and media."),
    ("hts-chapter-50", "HTS Chapter 50: Silk", "US HTS Chapter 50 silk import duty rates."),
    ("hts-chapter-51", "HTS Chapter 51: Wool", "US HTS Chapter 51 wool import duty rates."),
    ("hts-chapter-52", "HTS Chapter 52: Cotton", "US HTS Chapter 52 cotton import duty rates: yarn, fabric, denim."),
    ("hts-chapter-53", "HTS Chapter 53: Vegetable Fibers", "US HTS Chapter 53 import duties on vegetable textile fibers."),
    ("hts-chapter-54", "HTS Chapter 54: Man-Made Filaments", "US HTS Chapter 54 man-made filament import duty rates."),
    ("hts-chapter-55", "HTS Chapter 55: Man-Made Staple Fibers", "US HTS Chapter 55 man-made staple fiber import duty rates."),
    ("hts-chapter-56", "HTS Chapter 56: Wadding", "US HTS Chapter 56 import duties: wadding, felt, nonwovens."),
    ("hts-chapter-57", "HTS Chapter 57: Carpets", "US HTS Chapter 57 carpet and rug import duty rates."),
    ("hts-chapter-58", "HTS Chapter 58: Special Woven Fabrics", "US HTS Chapter 58 import duties for special woven fabrics."),
    ("hts-chapter-59", "HTS Chapter 59: Coated Textiles", "US HTS Chapter 59 import duty rates for coated and impregnated textiles."),
    ("hts-chapter-60", "HTS Chapter 60: Knitted Fabrics", "US HTS Chapter 60 knitted fabric import duty rates."),
    ("hts-chapter-61", "HTS Chapter 61: Knit Apparel", "US HTS Chapter 61 knitted apparel import duty rates."),
    ("hts-chapter-62", "HTS Chapter 62: Woven Apparel", "US HTS Chapter 62 woven apparel import duty rates."),
    ("hts-chapter-63", "HTS Chapter 63: Textile Articles", "US HTS Chapter 63 import duties: blankets, towels, curtains, rags."),
    ("hts-chapter-64", "HTS Chapter 64: Footwear", "US HTS Chapter 64 footwear import duty rates by type."),
    ("hts-chapter-65", "HTS Chapter 65: Headgear", "US HTS Chapter 65 hat and headgear import duty rates."),
    ("hts-chapter-66", "HTS Chapter 66: Umbrellas", "US HTS Chapter 66 import duties: umbrellas, canes, walking sticks."),
    ("hts-chapter-67", "HTS Chapter 67: Feathers", "US HTS Chapter 67 import duties: feathers, artificial flowers, wigs."),
    ("hts-chapter-68", "HTS Chapter 68: Stone and Cement", "US HTS Chapter 68 import duties: stone, cement, asbestos, mica articles."),
    ("hts-chapter-69", "HTS Chapter 69: Ceramics", "US HTS Chapter 69 ceramic import duty rates."),
    ("hts-chapter-70", "HTS Chapter 70: Glass", "US HTS Chapter 70 glass import duty rates."),
    ("hts-chapter-71", "HTS Chapter 71: Pearls and Metals", "US HTS Chapter 71 import duties: pearls, precious stones, jewelry."),
    ("hts-chapter-72", "HTS Chapter 72: Iron and Steel", "US HTS Chapter 72 iron and steel import duty rates, including Section 232."),
    ("hts-chapter-73", "HTS Chapter 73: Steel Articles", "US HTS Chapter 73 import duties for articles of iron and steel."),
    ("hts-chapter-74", "HTS Chapter 74: Copper", "US HTS Chapter 74 copper import duty rates."),
    ("hts-chapter-75", "HTS Chapter 75: Nickel", "US HTS Chapter 75 nickel import duty rates."),
    ("hts-chapter-76", "HTS Chapter 76: Aluminum", "US HTS Chapter 76 aluminum import duty rates, including Section 232."),
    ("hts-chapter-78", "HTS Chapter 78: Lead", "US HTS Chapter 78 lead import duty rates."),
    ("hts-chapter-79", "HTS Chapter 79: Zinc", "US HTS Chapter 79 zinc import duty rates."),
    ("hts-chapter-80", "HTS Chapter 80: Tin", "US HTS Chapter 80 tin import duty rates."),
    ("hts-chapter-81", "HTS Chapter 81: Base Metals", "US HTS Chapter 81 import duties for other base metals."),
    ("hts-chapter-82", "HTS Chapter 82: Tools", "US HTS Chapter 82 import duties: hand tools, knives, cutlery."),
    ("hts-chapter-83", "HTS Chapter 83: Metal Articles", "US HTS Chapter 83 import duties for miscellaneous metal articles."),
    ("hts-chapter-84", "HTS Chapter 84: Machinery", "US HTS Chapter 84 machinery import duty rates: engines, computers, pumps."),
    ("hts-chapter-85", "HTS Chapter 85: Electronics", "US HTS Chapter 85 electronics import duty rates: phones, PCs, semiconductors."),
    ("hts-chapter-86", "HTS Chapter 86: Railway", "US HTS Chapter 86 import duties: locomotives, rail vehicles, signals."),
    ("hts-chapter-87", "HTS Chapter 87: Vehicles", "US HTS Chapter 87 vehicle import duty rates: cars, trucks, bikes, parts."),
    ("hts-chapter-88", "HTS Chapter 88: Aircraft", "US HTS Chapter 88 aircraft and spacecraft import duty rates."),
    ("hts-chapter-89", "HTS Chapter 89: Ships", "US HTS Chapter 89 ship and boat import duty rates."),
    ("hts-chapter-90", "HTS Chapter 90: Instruments", "US HTS Chapter 90 import duties: optical, medical, measuring instruments."),
    ("hts-chapter-91", "HTS Chapter 91: Clocks", "US HTS Chapter 91 watch and clock import duty rates."),
    ("hts-chapter-92", "HTS Chapter 92: Musical Instruments", "US HTS Chapter 92 musical instrument import duty rates."),
    ("hts-chapter-93", "HTS Chapter 93: Arms", "US HTS Chapter 93 import duties: weapons and ammunition."),
    ("hts-chapter-94", "HTS Chapter 94: Furniture", "US HTS Chapter 94 furniture import duty rates: beds, lamps, mattresses."),
    ("hts-chapter-95", "HTS Chapter 95: Toys", "US HTS Chapter 95 toy and game import duty rates."),
    ("hts-chapter-96", "HTS Chapter 96: Miscellaneous", "US HTS Chapter 96 import duties: brooms, pens, zippers, buttons."),
    ("hts-chapter-97", "HTS Chapter 97: Art", "US HTS Chapter 97 import duties: art, antiques, collectibles."),
]
guides = [
    ("how-to-calculate-import-duty", "How to Calculate US Import Duty", "Step-by-step guide to calculating US import duty: HTS rate, valuation, MPF, HMF and total landed cost."),
    ("us-customs-broker-guide", "US Customs Broker Guide", "When you need a licensed customs broker, what it costs, and how to clear US imports without delays."),
    ("incoterms-guide", "Incoterms 2026 Guide", "Plain-English guide to Incoterms: EXW, FOB, CIF, DDP — and how each shifts duty and risk responsibility."),
    ("tariff-vs-tax", "Import Tariff vs Tax", "The difference between import tariffs, customs duties and taxes, and which one applies to your shipment."),
    ("what-is-section-301", "What Is Section 301", "Section 301 explained: why the US added China tariffs, which lists apply, and how to estimate your rate."),
    ("section-232-guide", "Section 232 Tariffs Guide", "Section 232 national-security tariffs on steel, aluminum and autos — who pays and how to calculate."),
    ("china-tariff-guide", "China US Tariff Guide 2026", "Complete guide to US tariffs on imports from China: Section 301 lists, stacked duty and how to estimate cost."),
    ("vietnam-tariff-guide", "Vietnam US Tariff Guide 2026", "US import duty on goods from Vietnam: base HTS rates, FTA status and how they compare to China."),
    ("india-tariff-guide", "India US Tariff Guide 2026", "US import duty on goods from India: HTS rates by product and India-specific trade remedies."),
    ("eu-tariff-guide", "EU to US Tariff Guide", "US import duty on goods from EU countries: base HTS rates and how EU-origin goods are treated."),
    ("mexico-tariff-guide", "Mexico US Tariff Guide 2026", "US import duty on goods from Mexico: USMCA rates, rules of origin and steel/aluminum treatment."),
    ("fta-guide-us", "US Free Trade Agreements Guide", "Which US FTAs cut your import duty to zero: USMCA, KORUS, AUSFTA, Chile, Peru and more."),
    ("de-minimis-rule", "De Minimis Rule Explained", "The $800 de minimis exemption: what qualifies, section 321 entry, and 2026 rule changes."),
    ("drawback-claim", "US Duty Drawback Claims", "How to get a refund of US import duties via drawback when you re-export, destroy or use imported goods."),
    ("mpf-fee-guide", "MPF Fee Guide", "Merchandise Processing Fee explained: rate, minimum, maximum and who must pay it."),
    ("hmf-fee-guide", "Harbor Maintenance Fee Guide", "HMF explained: the 0.125% port cargo fee, when it applies and who pays."),
    ("bond-requirements", "US Customs Bond Requirements", "When you need a single-entry or continuous customs bond for US imports, and what they cost."),
    ("isF-to-ddp", "ISF vs DDP: Shipping Terms", "Importer Security Filing and DDP delivery explained for first-time US importers."),
    ("tariff-classification-guide", "Tariff Classification Guide", "How to classify your product for US customs: HTS structure, rulings and common mistakes."),
    ("rules-of-origin-guide", "Rules of Origin Guide", "How rules of origin determine your US tariff rate and whether an FTA applies."),
    ("valuation-methods", "US Customs Valuation Methods", "The five customs valuation methods and how to value imports to avoid penalties."),
    ("import-license-guide", "US Import License Guide", "Which imports into the US need permits or licenses: FDA, EPA, CPSC, USDA."),
    ("ecommerce-import-guide", "Ecommerce Import Guide", "What online sellers must know about US import duty, ISF and shipping carriers."),
    ("dropshipping-duty-guide", "Dropshipping Duty Guide", "Who pays import duty on dropshipped orders into the US and how to price for it."),
]
compare = [
    ("us-vs-eu-tariffs", "US vs EU Tariffs", "Side-by-side comparison of US and EU import duty rates on common consumer goods."),
    ("china-vs-vietnam-tariffs", "China vs Vietnam Tariffs", "Compare US import duty on the same product made in China vs Vietnam — and the real cost delta."),
    ("china-vs-mexico-tariffs", "China vs Mexico Tariffs", "Compare US import duty for identical goods from China vs Mexico, with USMCA advantage."),
    ("china-vs-india-tariffs", "China vs India Tariffs", "US import duty comparison for goods from China vs India in 2026."),
    ("china-vs-turkey-tariffs", "China vs Turkey Tariffs", "Compare US tariffs on goods from China and Turkey for sourcing decisions."),
    ("china-vs-thailand-tariffs", "China vs Thailand Tariffs", "US import duty comparison for goods from China vs Thailand."),
    ("china-vs-taiwan-tariffs", "China vs Taiwan Tariffs", "US import duty comparison for semiconductors and electronics from China vs Taiwan."),
    ("china-vs-japan-tariffs", "China vs Japan Tariffs", "US import duty comparison for goods from China vs Japan."),
    ("china-vs-korea-tariffs", "China vs Korea Tariffs", "US import duty comparison for goods from China vs South Korea, with KORUS FTA."),
    ("china-vs-malaysia-tariffs", "China vs Malaysia Tariffs", "US import duty comparison for goods from China vs Malaysia."),
    ("tariff-vs-tariff-301", "Base Duty vs Section 301", "Understand the difference between base HTS duty and stacked Section 301 China tariffs."),
    ("fob-vs-cif-duty", "FOB vs CIF for Duty", "How Incoterms FOB and CIF change the customs value your US duty is calculated on."),
    ("duty-vs-freight-cost", "Duty vs Freight Cost", "Is import duty or freight the bigger cost for your product? A data-backed comparison."),
    ("air-vs-sea-duty", "Air vs Sea Freight Duty", "Does shipping by air or sea change your US import duty? (Hint: value, not route)."),
    ("new-vs-used-duty", "New vs Used Goods Duty", "How US import duty differs for new vs used goods, and where used goods are duty-free."),
]
faq = [
    ("tariff-faq", "US Import Tariff FAQ", "Answers to the most common US import tariff questions: rates, fees, exemptions and who pays."),
    ("hs-code-faq", "HS Code FAQ", "What is an HS code, how many digits do you need, and what happens if you classify wrong."),
    ("china-tariff-faq", "China Tariff FAQ", "US tariffs on China in 2026: Section 301, stacking, exclusions and how to estimate your rate."),
    ("duty-payment-faq", "Import Duty Payment FAQ", "How and when US import duty is paid: by importer, broker or carrier."),
    ("customs-hold-faq", "Customs Hold FAQ", "Why customs holds your shipment and how to fix missing paperwork, valuation or classification issues."),
    ("tariff-rate-faq", "Tariff Rate FAQ", "Where US tariff rates come from, why they change, and how often HTS updates."),
    ("section-301-faq", "Section 301 FAQ", "Section 301 China tariffs: which products, which lists, stacked rates and exclusion history."),
    ("usmca-faq", "USMCA Tariff FAQ", "USMCA duty-free rules: certificates, rules of origin and common compliance mistakes."),
    ("eori-faq", "EORI and US Import FAQ", "EU companies importing to the US: do you need EORI, and what US importer requirements apply."),
    ("vat-import-faq", "Import VAT vs Duty FAQ", "When is import VAT charged and how it differs from customs duty for US-bound shipments."),
]

topics = calc + hs + guides + compare + faq
print("总主题数:", len(topics))
# 生成 JS 数组片段
rows = []
for slug, title, desc in topics:
    rows.append('  ["%s", %s, %s]' % (slug, json.dumps(title), json.dumps(desc)))
js = "var TOOLS_MATRIX = [\n" + ",\n".join(rows) + "\n];"
open("/home/user/Doubao/chats/38445305803728898/ops/change-intelligence-hub/gen/tools_matrix.js", "w", encoding="utf-8").write(js)
print("已写出 tools_matrix.js（", len(js), "字节）")

# 追加：产品 HS 编码页 + 产品国别对比页（补到 200）
products = [
    "smartphone","laptop","tablet","smartwatch","headphones","bluetooth-earbuds","action-camera","dslr-camera",
    "gaming-console","vr-headset","computer-monitor","keyboard","mouse","printer","router","power-bank",
    "electric-scooter","e-bike","sneakers","running-shoes","leather-bag","backpack","suitcase","sunglasses",
    "watch","perfume","skincare-serum","mattress","office-chair","desk-lamp",
]
extra = []
for p in products:
    extra.append(("hs-code-for-" + p, "HS Code for %s" % p.title().replace("-"," "), "Find the correct HTS 2026 HS code for %s and its US import duty rate by country of origin." % p.replace("-"," ")))
countries = ["china","vietnam","india","mexico","japan","korea","taiwan","germany","italy","france","spain","uk","thailand","malaysia","indonesia","turkey"]
for c in countries:
    extra.append(("tariff-by-country-" + c, "US Tariffs on Imports from %s" % c.title(), "2026 US import duty rates for goods from %s: HTS base rates, FTA status and stacked trade remedies." % c.replace("-"," ")))
topics += extra
print("追加后总主题数:", len(topics))
rows = []
for slug, title, desc in topics:
    rows.append('  ["%s", %s, %s]' % (slug, json.dumps(title), json.dumps(desc)))
js = "var TOOLS_MATRIX = [\n" + ",\n".join(rows) + "\n];"
open("gen/tools_matrix.js", "w", encoding="utf-8").write(js)
print("tools_matrix.js 更新:", len(js), "字节,", len(topics), "主题")
