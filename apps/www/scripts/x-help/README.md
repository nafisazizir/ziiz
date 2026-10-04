# X help pipeline

How the article data under `components/help-x/data` and
`components/money-x/data/docs` was produced from help.x.com and money.x.com
(2026-10-04), so it can be re-scraped when the sites change.

1. `scrape.mjs` opens the five category pages of help.x.com, collects every
   article they link, then saves each article's settled markup to
   `<work>/raw/help/<category>/<slug>.json`, the category pages to
   `<work>/raw/categories`, and money.x.com's FAQ and legal documents (from
   its sitemap) to `<work>/raw/money`. Device tabs and accordions mount only
   the open panel, so each one is clicked through and captured. help.x.com
   sits behind Cloudflare: curl gets a challenge, and so does a second
   browser, so the run uses one browser context with three tabs. A page
   already on disk is skipped; rerun to resume.
2. `convert.mjs` reduces that markup to the block list in
   `components/business-x/doc.ts`: one JSON file per article and document,
   plus `categories.json` (each category's titled runs of links) and
   `search.json` (title, route and category of every article). Links between
   the scraped pages become clone routes (`/help-x/...`, `/money-x/...`);
   every other link stays absolute. Images and videos keep their dimensions
   only. The three pages help.x.com still serves in its older design
   (cookies, glossary, accessibility) go through the same converter by their
   rich-text components.

`<work>` defaults to `apps/www/.x-help` (gitignored); set `X_HELP_WORK` to
move it. Playwright comes from the global npm root (`NPMROOT`). The data is
compact JSON and is excluded from prettier.
