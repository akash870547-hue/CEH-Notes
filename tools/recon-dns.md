# Reconnaissance & DNS Tools — Basic to Advanced

Tools covered: `whois`, `dig`, `host`, `nslookup`, `curl`, `wget`, `ip`, `traceroute` and `mtr`.

## 1. Tool and network setup
```bash
whois --version
dig -v
curl --version
ip addr
ip route
``
Confirm the given hostname and the authorized scope. Passive/public data may be stale or redacted.

## 2. WHOIS and registration lookup
```bash
whois <LAB_DOMAIN>
whois <LAB_IP>
``
Read registrar/registry, dates, nameservers, status and network allocation. Privacy protections may hide registrant details. WHOIS data is not proof of live DNS or server ownership by itself.

## 3. dig: record types
```bash
dig <LAB_DOMAIN> A
dig <LAB_DOMAIN> AAAA
dig <LAB_DOMAIN> MX
dig <LAB_DOMAIN> NS
dig <LAB_DOMAIN> TXT
dig <LAB_DOMAIN> CNAME
dig <LAB_DOMAIN> SOA
dig <LAB_DOMAIN> ANY
``
Note: `ANY` is frequently minimized/blocked and is not a reliable "show all records" command.

### Specify resolver and concise output
```bash
dig @<LAB_DNS_IP> <LAB_DOMAIN> A
dig +short <LAB_DOMAIN> A
dig +noall +answer <LAB_DOMAIN> MX
dig +trace <LAB_DOMAIN>
``
Use `+trace` only where permitted; it queries multiple DNS servers and can behave differently behind a lab resolver. `+short` suppresses much diagnostic context, so use full output while troubleshooting.

## 4. host and nslookup
```bash
host <LAB_DOMAIN>
host -t MX <LAB_DOMAIN>
host -t NS <LAB_DOMAIN>
nslookup <LAB_DOMAIN>
nslookup -type=MX <LAB_DOMAIN>
nslookup <LAB_DOMAIN> <LAB_DNS_IP>
``
Common exam trap: a failed lookup may be resolver reachability, record absence, split-horizon DNS, or a typo. Check response status and resolver before concluding.

## 5. HTTP header and page retrieval with curl
```bash
curl -I <LAB_URL>                     # headers only
curl -i <LAB_URL>                     # headers + response body
curl -sS -o /dev/null -w '%{http_code}\n' <LAB_URL>
curl -L -I <LAB_URL>                  # follow redirects for final header view
curl -v <LAB_URL>                     # verbose connection/TLS diagnostics
curl -o page.html <LAB_URL>           # save body to file
```
Options:
- `-I`: HEAD request; some servers handle HEAD differently than GET.
- `-i`: include response headers in output.
- `-L`: follow redirects.
- `-sS`: suppress progress but keep errors.
- `-w`: report selected transfer metrics.
- `-v`: useful for troubleshooting; output may expose sensitive headers, so redact tokens before sharing.

### Request method and headers (lab app only)
```bash
curl -X OPTIONS -i <LAB_URL>
curl -H 'User-Agent: CEH-Lab-Check' -I <LAB_URL>
curl -H 'Content-Type: application/json' -i <LAB_URL>
``
Do not send state-changing POST/PUT/DELETE requests unless the task explicitly tells you to and you understand the effect. Use test data only.

## 6. wget and retrieval
```bash
wget --server-response <LAB_URL>
wget -O response.html <LAB_URL>
``
Avoid recursive mirroring or large downloads unless explicitly part of the lab task.

## 7. Route and reachability checks
```bash
ip addr
ip route
ip neigh
traceroute <LAB_IP>
tracepath <LAB_IP>
mtr -rw -c 5 <LAB_IP>
``
Windows: `ipconfig /all`, `route print`, `tracert <LAB_IP>`, `nslookup <LAB_DOMAIN>`.

## 8. Common output interpretation
- DNS A/AAAA answers map a name to IPv4/IPv6 addresses.
- MX indicates mail exchangers; NS indicates name servers.
- TTL influences cache lifetime.
- NXDOMAIN means the resolver says the queried name doesn't exist in that DNS view.
- SERVFAIL commonly points to a resolver/zone validation problem, but requires context.
- HTTP 301/302 redirect; 401 authentication needed; 403 denied in current context; 404 not found/hidden; 5xx server-side error.
- TLS/certificate diagnostics should check hostname, dates, chain, protocol and client trust.

## Mini practice
For a lab hostname, collect A/AAAA/MX/NS, inspect HTTP headers and save evidence. Explain one thing each result proves and one thing it does not prove.

References: [dig manual](https://bind9.readthedocs.io/en/latest/manpages.html) · [curl manual](https://curl.se/docs/manpage.html)
