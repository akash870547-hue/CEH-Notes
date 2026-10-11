# Web Content Discovery — dirb, Dirsearch, WPScan, Wfuzz and Wappalyzer

Use these tools against the exact lab application only. Content discovery creates repeated HTTP requests; keep rates low and use the wordlist provided by the lab. Do not brute-force authentication or discover content on third-party sites.

## 1. DIRB
```bash
dirb
dirb <LAB_URL> <LAB_WORDLIST>
dirb <LAB_URL> <LAB_WORDLIST> -o dirb-report.txt
```
Check local help if this build doesn't support a switch. Read status code, response length and redirect destination. A path hit may be a custom 404 or access-control page; open the exact result in the lab browser before reporting it.

## 2. Dirsearch
```bash
dirsearch --help
dirsearch -u <LAB_URL> -w <LAB_WORDLIST> --format=plain -o dirsearch.txt
```
Flags change between versions; verify help before execution. Start with a small wordlist and low thread/request rate. Stop if the app degrades or rate-limits.

## 3. WPScan — WordPress lab only
```bash
wpscan --version
wpscan --help
wpscan --url <LAB_URL> --enumerate vp
```
The vp enumeration selector and available database behavior can vary by version. Don't add password-attack options. Use plugin/theme enumeration only on a lab WordPress instance when scope allows it; validate findings, not just version labels.

## 4. Wfuzz — inspect help and scope
```bash
wfuzz --help
wfuzz -c -z file,<LAB_WORDLIST> --hc 404 <LAB_URL>/FUZZ
```
Syntax varies by version; confirm local help. A 404 filter can mislead where the app uses custom 404 pages; compare a normal nonexistent-path response before filtering.

## 5. Wappalyzer / browser technology extensions
These are commonly GUI/browser-extension tools, not a uniform CLI. Open the supplied lab page and record detected categories (server, framework, CMS, JavaScript libraries) plus evidence/uncertainty. Fingerprints can be hidden, proxied, stale or spoofed. Don't treat a technology label as a confirmed CVE.

## 6. Baseline and false positives
1. Request the exact base URL.
2. Request one obviously nonexistent path and record status/body length.
3. Confirm login/session requirements.
4. Choose only the lab wordlist and modest rate.
5. Review hits manually; keep task-relevant evidence only.

## Troubleshooting
- All paths show the same status: check custom 404/WAF and response size.
- 429/rate limit or high latency: stop and lower rate; follow lab instructions.
- Redirects hide content: inspect Location and authentication state.
- 403: denied in this request context, not automatically a leak.
- Technology mismatch: correlate with headers, HTML/JS and application behavior.
