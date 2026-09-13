# Threat model

Protected assets are imported search queries, URLs, performance metrics, and generated recommendations. Threats considered: accidental upload, third-party tracking, dependency compromise, spreadsheet-formula injection, malformed CSV resource exhaustion, and misleading cross-engine aggregation.

Controls: no runtime dependencies/network code, CSP blocking connections, formula-prefix escaping in CSV, strict numeric validation, capped warnings, 100 MB UI file limit, Web Worker isolation, engine-preserving data model, and provenance. Residual risks: very large expanded plain CSV can exhaust memory; filenames can reveal information on screen; malicious browser extensions or builds can bypass application controls. ZIP is unsupported in MVP, avoiding archive bombs.
