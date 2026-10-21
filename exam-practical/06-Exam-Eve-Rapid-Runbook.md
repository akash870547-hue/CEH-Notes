# CEH v13 Practical: Exam-Eve Rapid Runbook

> **Purpose:** A compact, high-signal revision sheet for the final review before a CEH practical/Engage session. This is independent study material, not an official exam blueprint. Use commands only against the explicitly authorized lab targets and follow the task's exact scope and instructions.

## The 20-second routine for every task

1. **Read the requested output**: IP, hostname, port, version, credential, filename, CVE/category, count, hash, or flag.
2. **Copy the current target from the task**. Never trust an IP, port, hostname, password, file path, or flag from an old walkthrough without validating it.
3. **Identify the evidence source**: scan output, pcap, log, web response, report, file, or authenticated share.
4. **Run the smallest useful check**, read all output, then verify the result.
5. **Submit only the requested format**: preserve case, punctuation, separators, and leading zeroes.
6. **Stop once verified**. If stuck, move on temporarily rather than sacrificing the whole session.

## Network and Nmap

### Quick commands

```bash
ip -br addr
ip route
ip neigh
nmap -sn <LAB_SUBNET>
nmap -Pn -p <PORTS> <LAB_IP>
nmap -sV -p <PORTS> <LAB_IP>
nmap -oN scan.txt <LAB_IP>
```

Use a subnet and target supplied by the current task. `-Pn` skips host discovery; it does not make a closed port open. `-sV` attempts to identify the service/version; a banner is evidence, not proof that a vulnerability is exploitable.

### Port states to remember

| State | Meaning | Next thought |
|---|---|---|
| `open` | A service accepted/responded to probes | Verify the service and protocol |
| `closed` | Host responded, no listener accepted the probe | Re-check the port, service state, and task clues |
| `filtered` | Filtering prevents a clear determination | Check scope, route, firewall/VPN and scan context |
| `open|filtered` | Nmap cannot decide between open and filtered | Common with UDP; use a protocol-aware check |

### The port-number trap

Default ports are clues, not guarantees: HTTP 80, HTTPS 443, SSH 22, FTP 21, SMB 445, DNS 53, RDP 3389, MSSQL 1433. Always use the port shown in the task or verified by a scoped scan. **1433 and 1443 are different ports.**

## Error-to-next-step table

| Error/result | What it usually tells you | Check next |
|---|---|---|
| `Connection refused` | Target actively rejected connection or no listener is accepting it | IP, port, service status, TCP vs UDP |
| `Connection timed out` | No response within timeout | Route, VPN/lab startup, firewall, target IP |
| `Login failed` / `Authentication failed` | Service was reached but auth failed | Username, password, domain/workgroup, quoting |
| `Name or service not known` | Name resolution failed | Spelling, DNS, lab resolver, provided hosts mapping |
| `No route to host` | Routing/reachability problem or network rejection | `ip addr`, `ip route`, interface/VPN |
| `Permission denied` | Current identity lacks a required permission or auth was rejected | User context, file permissions, credentials |
| Empty output | Query/filter/scope may not match available evidence | Correct file, interface, filter, path, time window |
| Scanner says vulnerable | Possible finding, not definitive exploitability | Version/build, plugin/request evidence, preconditions |

A failed `ping` alone does **not** prove a host is down. ICMP can be blocked. Diagnose one hypothesis at a time.

## DNS, web and server identification

```bash
dig <LAB_DOMAIN> A
dig <LAB_DOMAIN> MX
dig <LAB_DOMAIN> NS
nslookup <LAB_DOMAIN>
curl -I <LAB_URL>
curl -i <LAB_URL>
```

- `A` maps a name to IPv4; `AAAA` to IPv6; `MX` lists mail exchangers; `NS` lists name servers.
- HTTP status is not the final answer by itself: 200 means a response succeeded, 301/302 redirects, 401 asks for authentication, 403 denies this request, 404 says the requested resource was not found in that context, and 500 indicates a server-side error.
- For a “web server technology” question, use the assigned host and approved identification tool, then read the reported technology field. Avoid guessing from the website's look.

## Wireshark and packet-capture analysis

Open the exact supplied capture file. Use a **display filter** to narrow packets, then inspect the packet details and stream context.

| Goal | Display filter |
|---|---|
| Show DNS packets | `dns` |
| Show ARP | `arp` |
| Show ICMP | `icmp` |
| Show one host | `ip.addr == <LAB_IP>` |
| Show HTTP requests | `http.request` |
| Show HTTP POST | `http.request.method == "POST"` |
| Show TCP port | `tcp.port == 80` |
| Show DNS queries | `dns.flags.response == 0` |

**Evidence workflow:** confirm filename → apply filter → identify relevant request/response → expand the correct protocol fields → use Follow TCP Stream when useful → extract only the value requested. HTTP credentials may be visible in plaintext only when the capture contains unencrypted HTTP; HTTPS application payloads are normally encrypted without legitimate decryption keys.

Don't confuse a capture filter (used while capturing) with a display filter (used to view packets already captured).

## Files, logs, hashes and forensics

```bash
pwd
ls -la
find <START_DIR> -type f -iname '*<CLUE>*' 2>/dev/null
file <FILE>
stat <FILE>
sha256sum <FILE>
strings -n 6 <FILE> | head -n 60
grep -inE 'failed|invalid|login|connect|error' <LOG_FILE>
```

- Use the task's clues to choose a sensible directory; do not assume every machine has the same layout.
- For log questions, correlate repeated events, timestamps and source/destination fields. A single line may not identify the attacker or victim.
- Hashing fingerprints a file; it does not decrypt it. `strings` is a clue-finding aid, not a substitute for parsing the file format.
- Preserve originals and avoid executing unknown files outside an isolated lab.

## SMB, FTP and SSH: reliable workflow

1. Verify the current target IP and service/port.
2. Use only credentials obtained or supplied within the authorized exercise.
3. Enumerate only the share, directory or files relevant to the objective.
4. Copy/retrieve the required artifact using the protocol's normal client/tool.
5. Open and inspect the artifact, then return the exact requested value.

Common clues: SMB typically uses TCP 445; FTP control commonly uses TCP 21; SSH commonly uses TCP 22. Ports may be customized. A successful network connection does not imply the current account can access every share or path.

## Web application and database workflow

### Burp Suite / OWASP ZAP
- Confirm the target scope before sending traffic.
- Capture a baseline request and response.
- Change one input at a time; compare status, length, redirects, headers and body.
- Re-check the actual evidence behind a scanner alert; avoid treating every alert as confirmed.

### SQL injection
- First understand the parameter, normal response, authentication context and permitted test scope.
- Use the lab-approved tool and its help/options, then inspect the evidence returned.
- Database, table and row counts must come from the result, not from guessing.
- A login failure and a connection failure are different: the first is authentication/application-layer; the second is usually connectivity/service-layer.

### Common web security terms
- **Authentication**: who are you? **Authorization**: what may you access?
- **SQL injection**: untrusted input changes a database query's intended structure.
- **Cross-site scripting (XSS)**: attacker-controlled script executes in another user's browser context.
- **Content Security Policy (CSP)**: browser-enforced policy that can restrict script/resource sources; useful defense, not a replacement for output encoding.
- **CVE** identifies a vulnerability; **CVSS** rates technical severity; **WASC** is a separate web-application security classification scheme.
- A scanner finding needs confirmation against the deployed build, configuration and prerequisites.

## Password auditing and cracking concepts

Know the difference:
- **Online guessing/brute force**: attempts authentication against a service; may be rate-limited, logged or locked out.
- **Offline cracking**: tests guesses against a hash in a controlled environment.
- **John the Ripper / Hashcat**: offline password-auditing tools; first identify the hash type and understand the input format.
- **Hydra / Medusa**: online login-auditing tools; a service/port, username and wordlist must match the lab environment.

If an attempt fails, verify the target service is reachable before changing credentials repeatedly. Use only the supplied lab account/list and authorized host.

## Quick command syntax reminders

```bash
nmap -sV -p <PORTS> <LAB_IP>
nmap -Pn -p <PORTS> <LAB_IP>
whatweb <LAB_URL>
curl -I <LAB_URL>
file <FILE>
sha256sum <FILE>
```

For any tool: `<tool> --help` is often the fastest way to check exact local syntax. Versions differ, and examples from one VM can be stale in another.

## Final submission checklist

- [ ] Correct task, correct machine, correct current IP/domain/port.
- [ ] Correct file and right user/session context.
- [ ] Answer is supported by output, not a guess or a third-party walkthrough.
- [ ] Exact requested case, separators, length and formatting.
- [ ] No trailing spaces/newline accidentally included in a flag/value.
- [ ] Stop testing the objective after successful verification.

## Official / primary references

- [EC-Council CEH Engage overview](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh-engage/)
- [EC-Council CEH training overview](https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/)
- [Nmap Network Scanning, official guide](https://nmap.org/book/)
- [Wireshark User's Guide, display filters](https://www.wireshark.org/docs/wsug_html/index.html)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

This page is a learning aid. CEH Engage tasks, available tools and lab assets can vary across versions. Your current exam/lab instructions take precedence.
