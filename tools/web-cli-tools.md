# Web CLI Tools — curl, WhatWeb, Nikto, Gobuster, ffuf, testssl.sh

Run web enumeration only against the assigned lab URL/host. Directory discovery can create many requests; keep wordlists and thread counts small unless the course task instructs otherwise.

## 1. curl recap
```bash
curl -I <LAB_URL>
curl -i <LAB_URL>
curl -L -I <LAB_URL>
curl -sS -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' <LAB_URL>
curl -v <LAB_URL>
```
Use `-I` for a HEAD request, `-i` to show response headers, `-L` to follow redirects, and `-v` to diagnose connection/TLS issues. HEAD can behave differently from GET.

## 2. WhatWeb — technology fingerprinting
```bash
whatweb --version
whatweb <LAB_URL>
whatweb --color=never <LAB_URL>
whatweb -v <LAB_URL>
```
Technology identification is probabilistic; a CMS/server fingerprint does not confirm a vulnerability.

## 3. Nikto — web server checks
```bash
nikto -Version
nikto -host <LAB_URL>
nikto -h <LAB_URL> -output nikto-report.txt
nikto -h <LAB_URL> -Display 1234
```
Options can vary by version. Nikto sends multiple requests and may trigger alarms; use it only against the exact lab server, and follow course rate/scope instructions. Review findings for false positives and validate applicability.

## 4. Gobuster — directory/DNS/vhost modes
Check supported syntax first because versions differ:
```bash
gobuster version
gobuster dir --help
gobuster dns --help
gobuster vhost --help
```
Bounded directory discovery:
```bash
gobuster dir -u <LAB_URL> -w <LAB_WORDLIST> -t 10 -o gobuster.txt
```
- `dir`: directory/file path discovery.
- `-u`: lab base URL.
- `-w`: course-provided wordlist.
- `-t`: worker threads; keep modest.
- `-o`: output file.
Use the DNS mode only for domains explicitly in scope, and do not turn a single-host exercise into wildcard subdomain discovery.

## 5. ffuf — controlled content discovery
Check version/help:
```bash
ffuf -V
ffuf -h
```
Basic lab path discovery:
```bash
ffuf -u <LAB_URL>/FUZZ -w <LAB_WORDLIST> -t 10 -of json -o ffuf.json
```
Read status codes, content length, redirects and false positives. Filter options (`-fc`, `-fs`, `-fw`, `-fl`) depend on observed response patterns; measure normal not-found behavior before applying filters. Avoid broad wordlists/high concurrency on production services.

## 6. testssl.sh — TLS inspection
```bash
testssl.sh --version
testssl.sh <LAB_DOMAIN>
testssl.sh --fast <LAB_DOMAIN>
testssl.sh --warnings batch <LAB_DOMAIN>
```
Exact options vary by release; use `--help`. Review supported protocols, cipher suites, certificate identity/date and warnings. A scanner result is not a substitute for checking hostname, chain and application context.

## 7. Common tasks and expected evidence

| Objective clue | Tool | Capture |
|---|---|---|
| "Identify web technology" | WhatWeb / headers | product hints + limitations |
| "Find exposed paths on lab server" | Gobuster / ffuf | URL, status, relevant response evidence |
| "Check known server misconfigurations" | Nikto | finding, request/evidence, validation |
| "Review TLS configuration" | testssl.sh / OpenSSL | cert dates, hostname, protocol and cipher results |
| "Check response status/headers" | curl | exact URL, status, selected headers |

## Troubleshooting
- **403 for every path:** access control/WAF may be present; do not assume paths exist.
- **Many false positives:** record baseline 404 status/body size and filter carefully.
- **TLS name errors:** test the correct hostname/SNI, not only the raw IP.
- **Rate limit / slow app:** stop and reduce request rate.
- **Tools show conflicting tech:** fingerprinting is heuristic; verify headers/configuration and avoid overclaiming.

References: [Gobuster](https://github.com/OJ/gobuster) · [ffuf](https://github.com/ffuf/ffuf) · [Nikto](https://github.com/sullo/nikto) · [testssl.sh](https://testssl.sh/)
