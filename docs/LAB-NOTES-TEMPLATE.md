# CEH v13 — Practical Evidence Template + Troubleshooting

Use one copy per scenario. Follow the lab's required answer format; this template is for your own working notes, not necessarily the submission format.

## Capture every practical
```text
Module / task / scenario:
Required output format:
Authorized target and scope:
Start time / timezone:
Local interface / route (if relevant):
Tool, version and OS:
Command or UI path:
Key output / status:
Interpretation:
What it proves:
What it does NOT prove:
Cross-check or validation:
Evidence filename:
Secrets / tokens / personal data redacted:
Exact submitted value:
Confidence: confirmed / likely / unverified
Defensive fix or lesson:
```

## Troubleshooting matrix
| Symptom | Check first | Next useful check |
|---|---|---|
| Host seems down | Lab started, target and interface | Route, DNS, permitted alternate signal |
| Scan shows no ports | Correct IP/scope/protocol | Filtering, privileges, service state |
| Port filtered | Firewall/ACL may block probes | Route/path and lab guide; don't call it closed |
| DNS answer unexpected | Record type and resolver | Cache, split DNS, TTL and hostname spelling |
| Web redirect | Exact scheme/path/status | Location header, login/session state, SNI |
| 401 vs 403 | Authentication vs authorization | Login state, role, credentials and policy |
| Scanner reports CVE | Affected host/port/version evidence | Preconditions, patch/backport, safe validation |
| Packet capture empty | Correct interface, permissions, traffic | VM networking, capture/display filter |
| Tool not found | Installation/PATH/version | Tool help and lab-approved alternative |
| Output contradicts itself | Full output and command flags | Tool version, cached data, firewall and second signal |
| Flag rejected | Exact case/prefix/whitespace/format | Correct challenge step and required field |

## Evidence and information handling
- Retain the smallest relevant excerpt rather than full dumps.
- Never commit passwords, API keys, private keys, session cookies, live tokens, unredacted pcap or real personal data.
- Keep the original artifact/hash when forensic integrity matters; analyze a copy.
- Record uncertainty rather than converting a guess into a finding.

## Recommended finding format
**Title → affected asset → evidence → reproduction in the lab → impact → limitations → remediation → retest.**

## Exam discipline
Read objective → scope target → collect minimal evidence → validate → submit exact result → stop. Avoid guessing based on remembered IPs or old walkthroughs.