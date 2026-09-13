# Privacy architecture

Files enter through the browser File API, are passed to a module Web Worker, analyzed in memory, and exported through local Blob URLs. No imported content or result is intentionally transmitted or persisted. There is no account, OAuth, telemetry, analytics, AI API, remote font, CDN runtime dependency, or network client.

The HTML CSP sets `connect-src 'none'`. A build check rejects outbound URL literals and common network APIs. Users needing stronger assurance should download a checksummed release, disconnect the network, or self-host.

Trust boundary exclusions include the hosting server serving altered assets, browser extensions, the browser/OS itself, and user-installed malware. CSP is defense-in-depth, not proof against a malicious host response.
