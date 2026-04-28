# PaintCell SEO/GEO Two-Week Execution Plan

Owner: SEO/GEO lead
Date: 2026-04-28
Primary market: English-language international buyers for robotic painting systems, paint booth automation, and industrial coating integration.

## Current Baseline

PaintCell already has a strong technical SEO foundation:

- Locale-prefixed public routes under `/en`.
- Generated `sitemap.xml` from static routes, solution data, industry data, topic clusters, videos, and published CMS rows.
- Prerender validation that checks canonical, Open Graph metadata, sitemap coverage, and generated HTML files.
- Topic clusters for ATEX spray booths, flame treatment, paint booth design, paint robot selection, robotic painting, furniture coating, and metal parts finishing.
- `llms.txt` and an AI presales knowledge base generated from solution and industry data.
- Existing priority page brief covering solution hubs, ATEX pages, furniture/metal pages, and automation comparison pages.

Main gaps to close in the next two weeks:

- No single clean execution plan that assigns weekly SEO/GEO priorities.
- AI-facing answer routing is still mostly implicit in page links and content, not a structured question-to-authority map.
- Several high-intent buyer questions need answer-first treatment across `llms.txt`, the generated knowledge base, and public machine-readable assets.
- Validation should keep proving route, prerender, sitemap, canonical, and noindex behavior together, not as separate assumptions.

## North Star For The Next 14 Days

Make PaintCell easier for both search engines and AI answer engines to cite as the authoritative source for practical robotic painting system decisions.

The focus is not more generic blog volume. The focus is answer ownership for buying-stage questions:

- What is a robotic painting system?
- When does robotic painting make sense?
- How much does a robotic painting system cost?
- How do I choose a painting robot?
- What changes in an ATEX spray booth project?
- Should I build a new paint booth or retrofit an existing one?
- Which coating automation approach fits metal parts, furniture panels, or automotive components?
- What information is needed before requesting a quote?

## Week 1: Authority Map, Technical Confidence, And Internal Links

### Day 1-2: GEO Authority Map

Deliverables:

- Create a structured GEO authority map with high-intent buyer questions, short answers, canonical pages, and related pages.
- Publish it as a machine-readable JSON asset.
- Add it to the AI presales knowledge base generation flow.
- Add a concise version to `llms.txt`.

Acceptance checks:

- `public/geo-answer-map.json` exists and contains canonical `/en/...` URLs.
- `npm run generate-geo-answer-map` succeeds.
- `npm run generate-kb` includes the GEO authority section.
- `llms.txt` lists the main question-to-page map.

### Day 3-4: Prerender And Sitemap Confidence

Deliverables:

- Run sitemap generation and targeted prerender validation on the highest priority SEO/GEO pages.
- Confirm canonical URLs, Open Graph URLs, and sitemap URLs agree on `/en`.
- Confirm no public sitemap URL is missing prerendered HTML for the sampled high-intent set.

Priority sample:

- `/en/solutions/robotic-painting-system`
- `/en/solutions/paint-booth-automation`
- `/en/resources/knowledge/robotic-painting-cost-guide`
- `/en/resources/knowledge/how-to-choose-paint-robot`
- `/en/resources/standards-compliance/atex-zone-classification-spray-painting-booth`
- `/en/resources/topics/robotic-painting`
- `/en/industries/metal-parts-finishing`
- `/en/industries/furniture-woodwork`

Acceptance checks:

- `npm run generate-sitemap` succeeds.
- `npm run prerender` succeeds for the target set or the full set.
- `npm run validate-prerendered-seo` passes for sampled pages.

### Day 5-7: Answer-First Page Improvements

Deliverables:

- Add or refine above-the-fold answer blocks on three highest-value pages if missing:
  - Robotic painting system integration.
  - Paint booth automation.
  - Robotic painting cost guide.
- Add internal links from answer blocks to the authority map's related pages.
- Ensure JSON-LD on FAQ/article pages remains valid after content updates.

Acceptance checks:

- Target pages expose clear H1, meta description, canonical, and visible answer-first copy.
- Related pages are linked from each priority answer.
- Prerendered HTML contains the answer text, not only client-side placeholders.

## Week 2: Cluster Expansion And Conversion Support

### Day 8-10: Buyer Decision Cluster

Deliverables:

- Strengthen the robotic painting decision cluster:
  - Manual vs semi-auto vs robotic painting systems.
  - When robotic paint automation makes sense.
  - Paint robot selection.
  - Robotic painting cost guide.
- Add consistent CTA routing to quote/RFQ pages.

Acceptance checks:

- Each decision page links to the solution page, quote page, and at least two related guides.
- `llms.txt` and the GEO map include the canonical decision pages.

### Day 11-12: Industry Cluster Refinement

Deliverables:

- Strengthen metal parts and furniture coating clusters with clearer buyer scenarios.
- Add direct links from industry pages to related solution and decision pages.
- Confirm sitemap coverage for cluster hub, FAQ, glossary, and scenario pages.

Acceptance checks:

- Industry pages have visible links to related solution pages and planning guides.
- Topic cluster routes are in sitemap and prerender output.

### Day 13-14: Final Validation And Handoff

Deliverables:

- Run full or sampled SEO validation depending on build runtime.
- Record route/sitemap/prerender proof in a short status note.
- Prepare next backlog: content pages worth adding after the two-week plan.

Acceptance checks:

- Generated files are current.
- Sitemap and `llms.txt` reflect the same canonical URL policy.
- No claim of full launch readiness is made unless the full build/prerender validation passes.

## First Implementation Batch

This batch is implemented immediately:

- Add `src/data/geoAuthorityMap.ts` as the canonical source for answer routing.
- Add `scripts/generate-geo-answer-map.ts`.
- Add `public/geo-answer-map.json`.
- Add GEO authority output to `scripts/generate-kb.ts`.
- Add the high-intent question map to `public/llms.txt`.

## Operating Rules

- Keep `/en` as the canonical indexable public locale unless the SEO policy changes.
- Verify routes, sitemap, prerender output, and Vercel routing together for public SEO pages.
- Prefer improving authoritative existing pages before creating thin new pages.
- Do not index private/admin/thank-you/catalog utility pages.
- Treat AI answer engines as citation systems: short answer, canonical page, related evidence, and clear business context must stay aligned.
