# Burp Suite & OWASP ZAP — Beginner to Advanced Workflow

These tools proxy and inspect HTTP/S traffic, replay requests, and help validate application security in an authorized test app. Exact menus vary by version.

## 1. Proxy setup (Burp or ZAP)
1. Start Burp Suite Community or OWASP ZAP.
2. Use its browser or configure a dedicated test browser to use the local proxy shown by the tool (often 127.0.0.1 with a default proxy port, but verify your own setup).
3. Confirm the browser request appears in HTTP history.
4. For HTTPS labs, use the tool's documented certificate procedure in the dedicated test browser only.
5. Set the target/scope to the course app; exclude unrelated hosts.

## 2. Baseline request workflow
- Browse one normal feature and open **Proxy/History** (Burp) or **History/Requestor** (ZAP).
- Record method, path, parameters, cookies, status code, response headers and body.
- Send a request to Repeater (Burp) or Requester (ZAP) when the task calls for a controlled comparison.
- Change **one field at a time**, resend and compare outcomes.
- Restore baseline and capture minimal evidence.

## 3. Burp Repeater (manual testing)
Checklist:
1. Send selected request to Repeater.
2. Confirm host and endpoint match the authorized lab.
3. Keep method and session context intact.
4. Change one test input or header.
5. Click Send and compare status, length, response text and timing.
6. Save a screenshot or sanitized request/response, removing tokens and personal data.

Use the built-in Decoder for URL/Base64 transformations and Comparer to compare responses. Do not paste live access tokens into reports.

## 4. Burp Intruder / ZAP Fuzzer
Fuzzing sends repeated requests and may affect availability or accounts. Use only a test user and the specific endpoint/rate approved by the lab. Start with a tiny test list, low request rate and a clear stopping condition. Never fuzz production login/reset flows or use leaked credential lists.

## 5. ZAP command line — baseline scan
On installs that include the wrapper scripts:
```bash
zap-baseline.py -t <LAB_URL> -r zap-baseline.html
```
The baseline scan is designed for passive checks and can still create traffic. Wrapper filename/flags differ by distribution; check the included help. Keep target restricted to the authorized lab.

Active scanning can send attack payloads and change server state. Run it only when a lab explicitly permits active tests:
```bash
zap-full-scan.py -t <LAB_URL> -r zap-active-lab-report.html
``
Review the version's CLI docs; do not treat all alerts as confirmed vulnerabilities.

## 6. Cookies / session checkpoints
Inspect `Set-Cookie` and verify:
- `Secure`: only sent over secure transport.
- `HttpOnly`: scripts cannot directly read the cookie.
- `SameSite`: constrains some cross-site sending; not a complete CSRF defense.
- Session ID rotates on authentication/privilege changes where expected.
- Logout and expiry invalidate the session server-side.
Avoid copying real session IDs into notes.

## 7. Finding workflow
1. Identify baseline behavior.
2. Change one controlled input.
3. Show reproducible difference.
4. Explain impact without accessing unrelated data.
5. Propose remediation.
6. Re-test after the fix.

## 8. Frequent problems
- No traffic: browser proxy setting or wrong proxy listener.
- HTTPS errors: certificate not installed in dedicated test browser, or target scope wrong.
- App breaks through proxy: verify proxy settings and do not disable application TLS controls beyond the lab guide.
- Results depend on login: log into the lab app and keep test account/session context.
- Too many alerts: prioritize reproducible/high-context findings; validate rather than trusting a scanner label.

References: [Burp documentation](https://portswigger.net/burp/documentation) · [ZAP docs](https://www.zaproxy.org/docs/)
