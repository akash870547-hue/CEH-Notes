<div class="ceh-hero" markdown="1">
<span class="ceh-eyebrow">:material-shield-check: CEH PRACTICAL • FIELD NOTES</span>

# Find the signal. Capture the proof.

<p class="ceh-lead">A fast, searchable workspace for CEH Practical and CEHv13 Engage revision. Jump straight to the artifact, run a focused check, and capture the exact field the task asks for.</p>

<div class="ceh-hero-actions">
<a class="md-button md-button--primary" href="01-recon-scanning/">Explore field notes</a>
<a class="md-button" href="existing-notes/">Browse the full library</a>
<button class="md-button" type="button" data-ceh-copy-link aria-label="Copy page link">Copy page link</button>
</div>
</div>

<div class="ceh-metrics">
  <div class="ceh-metric"><strong>05</strong><span>Focused topic tracks</span></div>
  <div class="ceh-metric"><strong>20</strong><span>Existing CEH module notes</span></div>
  <div class="ceh-metric"><strong>⌕</strong><span>Search commands and fields</span></div>
  <div class="ceh-metric"><strong>24/7</strong><span>Local preview, dark mode, copy code</span></div>
</div>

!!! warning "Use the assigned scope"
    Commands are templates for authorized iLabs / cyber-range targets and supplied artifacts. Replace placeholders with exact values from the objective. Tool versions and paths vary; never assume a target or flag format.

## Choose your workflow

<p class="ceh-section-intro">Start with what the task gives you. Every module follows the same pattern: trigger → quick reference → command syntax → output interpretation → filters / parsing → troubleshooting.</p>

<div class="ceh-module-toolbar" role="search" aria-label="Filter CEH topic tracks">
  <label for="ceh-module-search">Find a topic track</label>
  <div class="ceh-module-filter-controls">
    <input id="ceh-module-search" type="search" placeholder="Try Nmap, PCAP, SQL, hash, ADB..." autocomplete="off" aria-describedby="ceh-filter-status">
    <button class="md-button" type="button" data-ceh-clear-search disabled>Clear</button>
  </div>
  <p id="ceh-filter-status" class="ceh-filter-status" role="status" aria-live="polite">6 tracks available</p>
</div>

<div class="grid cards ceh-track-grid" markdown>

- :material-radar: **01 · Recon & Scanning**

    ---

    **Start here for:** host IPs, subnets, open ports, NetBIOS, SMB signing, SMTP, MSSQL and service versions.

    [Open module →](01-recon-scanning.md)

- :material-wifi: **02 · PCAP & Traffic**

    ---

    **Start here for:** cleartext protocol evidence, SYN / ICMP patterns, ARP changes, RPC endpoints, MQTT topics and exported objects.

    [Open module →](02-pcap-traffic.md)

- :material-web: **03 · Web & Databases**

    ---

    **Start here for:** response headers, SQL parameters, database/table/column names, WASC categories and web response behavior.

    [Open module →](03-web-databases.md)

- :material-fingerprint: **04 · Hashes, Crypto & Stego**

    ---

    **Start here for:** MD5 / SHA-256 comparisons, container triage, hidden payloads, metadata, entropy and file signatures.

    [Open module →](04-hashes-crypto.md)

- :material-cellphone-key: **05 · System & Mobile**

    ---

    **Start here for:** ADB identity / logs, synthetic lab contacts, Procmon PML export, APK structure and per-entry CRC32.

    [Open module →](05-system-mobile.md)

- :material-bookshelf: **Full CEH library**

    ---

    Use the original 20 topic modules and individual tool guides when a task needs deeper syntax or background.

    [Open notes library →](existing-notes.md)

</div>

## Start with the artifact

<div class="grid cards" markdown>

- **:material-lan: An IP or subnet**

    1. Confirm the assigned scope.
    2. Discover hosts, then open ports.
    3. Enumerate only services that respond.

    [Recon & Scanning →](01-recon-scanning.md)

- **:material-file-document-outline: A PCAP file**

    1. Read capture time range and protocol hierarchy.
    2. Filter the protocol / packet pattern.
    3. Save frame number, timestamp and exact field.

    [PCAP & Traffic →](02-pcap-traffic.md)

- **:material-link-variant: A URL or database task**

    1. Capture status and response headers.
    2. Identify the real method and parameter.
    3. Request only required database fields.

    [Web & Databases →](03-web-databases.md)

- **:material-file-search-outline: A hash or unknown file**

    1. Record file type and baseline hash.
    2. Inspect metadata and embedded signatures.
    3. Use a format-specific tool only after identification.

    [Hashes & Forensics →](04-hashes-crypto.md)

- **:material-android: An Android / PML / APK artifact**

    1. Confirm the device serial or exact file.
    2. Export a bounded evidence set.
    3. Distinguish APK CRC32 from whole-file SHA-256.

    [System & Mobile →](05-system-mobile.md)

</div>

## Six-hour execution loop

<ol class="ceh-steps">
  <li><strong>Parse the deliverable.</strong> Is the answer an IP, port, version, domain, WASC ID, packet field, row, hash, path or flag?</li>
  <li><strong>Observe before testing.</strong> Inspect the supplied file, response headers, capture summary, device identity or existing scan.</li>
  <li><strong>Run one focused check.</strong> Replace placeholders and keep the target, port, parameter or artifact in scope.</li>
  <li><strong>Verify the exact output.</strong> Correlate frame / timestamp / row / path where the answer might be ambiguous.</li>
  <li><strong>Submit and move on.</strong> Copy the requested value, confirm acceptance, and leave a short lead for any unfinished task.</li>
</ol>

??? tip "The five-minute reset"
    Re-read the task. Verify the target route, path, installed tool and syntax. Remove unnecessary options and reduce scope. If the next command produces no new evidence, record your current lead and switch to another objective.

## Common placeholder syntax

| Placeholder | Replace with |
|---|---|
| `<TARGET_IP>` | One assigned lab host |
| `<TARGET_CIDR>` | Exact authorized subnet |
| `<TARGET_URL>` | Full lab URL, scheme and required path |
| `<PORTS>` | Discovered / task-specified ports |
| `<PCAP_FILE>` | Supplied capture path |
| `<WORDLIST>` | Existing local wordlist confirmed in the image |
| `<SERIAL>` | ADB serial for the designated emulator / device |
| `<APK_FILE>`, `<PML_FILE>` | Exact supplied artifact path |

## Search and keyboard shortcuts

| Key / control | Use |
|---|---|
| `/` | Focus site search in supported browsers |
| `↑` / `↓` | Move through visible search suggestions |
| `Enter` | Open selected result or submit a search |
| `Esc` | Close the active search overlay / drawer |
| Code-copy icon | Copy a command block |
| Left sidebar | Switch module |
| Right table of contents | Jump to a section on the current page |

Try precise terms such as `NetBIOSDomainName`, `smb2-security-mode`, `mqtt.topic`, `WASC-19`, `CRC32`, or `/OpenLog`.

## Go deeper

<div class="ceh-path">
  <span class="ceh-path-icon" aria-hidden="true">▤</span>
  <div class="ceh-path-content">
    <p><strong><a href="existing-notes/">Existing CEH modules and tools</a></strong></p>
    <p>Original 20 module notes, individual tool guides, quick references and cross-module workflows.</p>
  </div>
</div>
<div class="ceh-path">
  <span class="ceh-path-icon" aria-hidden="true">⌘</span>
  <div class="ceh-path-content">
    <p><strong><a href="local-preview/">Preview the site locally</a></strong></p>
    <p>Run MkDocs, check navigation and validate your changes before the pull request.</p>
  </div>
</div>
<div class="ceh-path">
  <span class="ceh-path-icon" aria-hidden="true">⑂</span>
  <div class="ceh-path-content">
    <p><strong><a href="branches-notes/">Branch and PR workflow</a></strong></p>
    <p>Keep the published site stable while adding pages on a feature branch.</p>
  </div>
</div>

## Accuracy and evidence rules

- An open port is not a CVE. A banner or OS fingerprint is not proof of exploitability.
- A SYN / ICMP packet is not by itself evidence of DoS; compare source diversity, rate, destination and timeline.
- CRC32 is a ZIP-entry checksum, not a cryptographic authenticity check. Use SHA-256 for whole-file comparison.
- PCAP analysis and ADB queries must use supplied or explicitly authorized lab material.
- No guide can guarantee a 100% score or predict exact live challenge values. The task objective and official lab rules take precedence.
