# Module 13 — Hacking Web Servers

## Exam objective
Assess exposed server behavior and configuration: HTTP headers/methods, TLS certificate, default content, directory listing, version disclosure and logs. A banner alone does not prove an exploitable server vulnerability.

## 1. Record HTTP behavior
```bash
curl -I <LAB_URL>
curl -i <LAB_URL>
curl -sS -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' <LAB_URL>
curl -X OPTIONS -i <LAB_URL>
``
Use the lab URL exactly as supplied. HEAD can differ from GET; OPTIONS can be disabled or answered by a proxy. Do not send state-changing methods unless explicitly asked by the lab.

## 2. TLS checks
```bash
openssl s_client -connect <LAB_DOMAIN>:443 -servername <LAB_DOMAIN> -showcerts
openssl x509 -in <LAB_CERT.pem> -noout -subject -issuer -dates
testssl.sh --fast <LAB_DOMAIN>
``
Inspect hostname/SAN, dates, chain, protocol and cipher warnings. `-showcerts` displays certificates sent by the server but doesn't by itself validate trust. Use the right SNI hostname rather than testing only an IP.

## 3. Web server fingerprinting and checks
```bash
whatweb <LAB_URL>
nikto -h <LAB_URL> -output nikto-report.txt
``
These tools send requests. Run only against the authorized lab host, with a low-impact lab profile if available. Review each result and validate applicability; do not assume an outdated-looking banner equals a vulnerable version.

## 4. Misconfigurations to recognize
- Default sample/configuration pages or unnecessary diagnostic endpoints.
- Directory listing or accidental backup/config file exposure.
- Unnecessary HTTP methods or unsupported legacy protocols.
- Server/version disclosure that facilitates fingerprinting (contextual risk).
- Weak TLS configuration, expired/mismatched certificate or chain problems.
- Excessive file permissions or secrets stored in web root.
- Detailed error pages/debug mode or missing access control.
- Missing/security headers—hardening issue whose impact depends on context.

## 5. Server logs and operational verification
Linux service examples (service names/log paths vary):
```bash
systemctl status <LAB_SERVICE>
journalctl -u <LAB_SERVICE> --since '1 hour ago'
tail -n 100 <LAB_ACCESS_LOG>
tail -n 100 <LAB_ERROR_LOG>
``
Windows/IIS: use Event Viewer and the configured IIS log directory; verify site/app pool and binding configuration from the lab. Don't alter/delete logs.

## 6. Finding format
Target/port → method → exact response/setting → impact → evidence/limitations → fix → re-test. For example, a directory listing should include the exact in-scope path and what type of files are listed, but never download unrelated sensitive files.

## 7. Common troubleshooting
- Redirect loop: compare HTTP/HTTPS, Host/SNI and proxy behavior.
- TLS error: verify hostname, time, cert chain and lab proxy.
- 403/404: may be policy/route hiding, not necessarily absence/presence.
- Server header removed: no reliable version clue; use approved inventory/config evidence.
- Scan report is noisy: capture the exact request, status/body and validate one finding at a time.

## Lab drill
Inspect headers and TLS on the designated lab server, then review one approved scanner result. State one confirmed configuration issue and one item that remains unverified.

**Related:** [Web CLI tools](../tools/web-cli-tools.md) · [OpenSSL/TLS](../tools/crypto-openssl.md) · [Log analysis](../tools/log-analysis.md)