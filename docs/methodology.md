# Methodology

OpenSEO Evidence treats each input row as an observation and preserves its search-engine dimension. Clicks and impressions are summed only within their observed scope. CTR is always recomputed as total clicks / total impressions. Position is impression-weighted within one engine; Google and Bing positions or CTRs are never averaged.

The MVP finds: striking-distance query/page pairs (50+ impressions, position 4–20), possible cannibalization only when the same engine export contains both query and page dimensions, and cross-engine consensus/divergence while showing each engine's metrics separately. Cross-engine scores use the weaker (higher-numbered) engine position. With at least 14 distinct ISO dates, it splits a contiguous range into equal halves and requires every query/page candidate to have observations for every day in each half before flagging a 30%+ click decline. Scores are prioritization aids, not forecasts: logarithmic demand plus ranking proximity, multiplied by evidence confidence. Every item retains source file/row provenance.

Automatic decay is conservative but not causal. Explicit period selection and year-over-year seasonality controls remain future work.

Identical selected file content is blocked before analysis. Any identical observation repeated across differently named files has unknowable export scope—even when dated—so conflicting observations are excluded and surfaced as a bounded warning rather than silently summed or deduplicated.
