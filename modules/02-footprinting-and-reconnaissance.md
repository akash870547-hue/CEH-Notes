# Module 02 — Footprinting and Reconnaissance

## Exam objective
Collect information from the exact authorized domain/asset, distinguish passive from active methods, and avoid treating an unverified lead as a confirmed fact.

## 1. Passive vs active
- **Passive:** public search results, public documents/metadata and registry information, without directly probing the target.
- **Active:** queries or requests sent to target infrastructure, such as DNS queries or HTTP requests. Even low-impact checks should stay in scope.
- **Validation:** record source and retrieval time; cross-check important facts. Public results can be stale, redacted or unrelated.

## 2. DNS command ladder
```bash
dig <LAB_DOMAIN> A
dig <LAB_DOMAIN> AAAA
dig <LAB_DOMAIN> MX
dig <LAB_DOMAIN> NS
dig <LAB_DOMAIN> TXT
dig +noall +answer <LAB_DOMAIN> A
dig @<LAB_DNS_IP> <LAB_DOMAIN> A
host <LAB_DOMAIN>
nslookup <LAB_DOMAIN>
```
**Read:** record type, answer, TTL and response status. A/AAAA map to IPv4/IPv6, MX lists mail exchangers, NS lists name servers, TXT can hold verification or mail policy values. `ANY` is not a reliable all-records query. NXDOMAIN applies to the resolver's DNS view; split-horizon DNS and caches can change answers.

## 3. Registration and public research
```bash
whois <LAB_DOMAIN>
whois <LAB_IP>
```
Record registry/registrar, nameservers, dates and network range where present. Registrant details may be privacy-protected. WHOIS/RDAP does not prove the server is reachable or that a specific service is vulnerable.

Use search engines/public sources only according to lab instructions and applicable policies. Record query/source/date. Avoid collecting unrelated personal information or attempting to access private accounts.

## 4. Inspect the web surface without changing state
```bash
curl -I https://<LAB_DOMAIN>/
curl -sS -o /dev/null -w '%{http_code} %{content_type}\n' https://<LAB_DOMAIN>/
curl -v https://<LAB_DOMAIN>/
```
- `-I`: sends HEAD (may differ from GET).
- `-w`: prints response metadata.
- `-v`: connection/TLS diagnostics; redact headers before sharing.
Check HTTP status, redirects, server headers and TLS hostname/certificate. Fingerprint headers are hints, not proof of exact versions.

## 5. Simple recon worksheet
| Question | Evidence | Limitation |
|---|---|---|
| What records resolve? | DNS answer + timestamp | Depends on resolver/cache/view |
| Which name servers are listed? | NS response | Does not prove zone transfer is possible |
| Which HTTP status is returned? | status + response headers | HEAD can differ from GET |
| Which organization/network is registered? | registry result | May be privacy-protected or delegated |
| What technology appears present? | headers/fingerprint | Can be hidden/spoofed/proxied |

## 6. Troubleshooting
- **No DNS answer:** check spelling, resolver, record type and VPN/lab DNS.
- **NXDOMAIN vs SERVFAIL:** the first indicates the queried name was reported nonexistent; the second indicates the resolver could not complete the query.
- **curl TLS error:** verify hostname/SNI, system clock and certificate chain; do not disable validation as a default fix.
- **Different answers on different networks:** suspect split DNS, CDN, geolocation or cache differences.
- **Do not overclaim:** record “observed banner suggests…” rather than “confirmed vulnerable.”

## Lab drill
For the provided lab domain, gather A/AAAA/MX/NS, record the answer and TTL, then inspect HTTP headers. Provide one limitation for each observation.

**Related:** [Recon/DNS commands](../tools/recon-dns.md) · [Tool index](../tools/README.md)