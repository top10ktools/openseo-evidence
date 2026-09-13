# OpenSEO Evidence

Free, open-source, local-first analysis of Google Search Console and Bing Webmaster Tools CSV exports. It creates an evidence-ranked backlog without uploading imported data or results.

## What it finds

- striking-distance queries and pages
- cross-engine consensus and divergence without blending Google and Bing metrics
- query cannibalization when query + page dimensions are available
- conservative performance decay when dated coverage is sufficient
- evidence confidence, provenance, data-quality warnings, and actionable explanations
- local CSV, JSON, and Markdown exports

## Run

Requires Node 20+ only for checks/build; the app has zero runtime dependencies.

```sh
npm test
npm run check
python3 -m http.server 8080 -d dist
```

Open `http://localhost:8080`. Static hosting must preserve the included CSP; no backend is required.

## Privacy properties

- Browser-only File API + Web Worker processing
- `connect-src 'none'`
- no account, OAuth, analytics, telemetry, CDN, remote font, or AI API
- CSV/JSON/Markdown exports generated locally
- full source under Apache-2.0

See [`docs/privacy-architecture.md`](docs/privacy-architecture.md), [`docs/threat-model.md`](docs/threat-model.md), and [`docs/methodology.md`](docs/methodology.md).

## Verify a release

```sh
npm run check
(cd dist && sha256sum -c SHA256SUMS)
```

The optional Chromium gate in `scripts/browser-network-check.mjs` verifies that import, analysis, and all exports make no external or unapproved requests. CI validates the dependency-free test/build/privacy gates on every change.

## MVP limitations

- CSV only; ZIP is deliberately unsupported (avoids archive-bomb and dependency complexity).
- Input must contain Clicks and Impressions. Query, Page, Position, and Date features activate only when present.
- Decay requires at least 14 ISO-dated observations and compares contiguous halves; explicit period selection and seasonality controls remain future work.
- Header aliases cover common English exports plus a small Vietnamese set, not every localized GSC/Bing UI.
- 100 MB per-file UI guard; processing remains memory-bound.
- Static checks complement browser network interception and independent review; they do not prove the browser or hosting platform itself is trustworthy.

Maintained by Top10k Tools. No ranking or traffic outcome is promised.
