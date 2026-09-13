# Recommended HTTP headers

Configure the static host to send (not merely embed) `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; worker-src 'self'`, plus `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and HSTS on HTTPS deployments. The meta CSP is a portable fallback; framing policy requires an HTTP header.
