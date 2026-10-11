# Module 14 — Hacking Web Applications

## Exam objective
Use a repeatable web testing workflow to evaluate authentication, authorization, session management, input validation, file handling, errors and security configuration. Make one controlled change at a time and keep a minimal request/response pair.

## 1. Baseline and map the app
1. Confirm exact lab origin and allowed paths.
2. Browse normal features while recording requests in DevTools Network or Burp/ZAP.
3. Identify login/logout, roles, object IDs, file uploads, forms and state-changing operations.
4. Establish a baseline user/role and response before testing.
5. Avoid state changes or account lockouts unless the lab explicitly requires them.

## 2. HTTP inspection from terminal
```bash
curl -I <LAB_URL>
curl -i <LAB_URL>
curl -sS -o /dev/null -w '%{http_code}\n' <LAB_URL>
```
Inspect request method, path, parameters, Host, Origin/Referer when relevant, cookies, response code, redirects and content. Browser DevTools gives a better view of dynamic sessions.

## 3. Main testing categories
- **Authentication:** login, reset flow, MFA, account lockout and error differences.
- **Authorization/access control:** whether a role may reach a resource/action; use only designated test roles and dummy records.
- **Session management:** cookie flags, session rotation, expiry and logout invalidation.
- **Input validation:** how unexpected/malformed input is handled. Change one field and compare a baseline.
- **File upload:** extension/type/content checks, safe storage outside executable web root, size limits and access control.
- **Security configuration:** debug mode, verbose errors, security headers and secrets exposure.
- **Business logic:** sequence, quantity/price/state assumptions; use synthetic test transactions.
- **Logging:** ensure the security-relevant event is logged without recording credentials/tokens.

## 4. Burp/ZAP workflow
1. Use the supplied lab browser/proxy and set scope to the assigned app.
2. Capture baseline request.
3. Send to Repeater/Requester for controlled comparison.
4. Modify one parameter/header at a time, then compare response.
5. Save request/response with cookies and tokens redacted.
6. Describe the impact and defense; don't extract real user data.

Intrusive active scans/fuzzers can change state and create traffic. Use only the profile and rate the lab approves.

## 5. Response codes are clues, not full conclusions
- 200: response returned; task may still have failed.
- 302: redirect; inspect Location and session state.
- 401: authentication required/failed in this context.
- 403: forbidden in this request context.
- 404: resource not found or intentionally hidden.
- 500: server error; may be caused by malformed input but is not proof of a vulnerability.

## 6. Security headers and cookies
Inspect `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, framing protection and Set-Cookie attributes. Recommended header sets depend on application behavior; don't apply a header without testing compatibility. See [session security](11-session-hijacking.md).

## 7. Evidence report
```text
Feature / endpoint:
Test role and expected access:
Baseline request/response:
Single change made:
Observed difference:
Reproducible?:
Impact on this app:
Sensitive data avoided:
Suggested fix:
Retest result:
```

## Lab drill
Using a test account and dummy record, verify an access-control rule or cookie attribute. Record expected vs observed and identify one limitation in your test.

**Related:** [Burp/ZAP](../tools/burp-zap.md) · [Web CLI tools](../tools/web-cli-tools.md) · [SQL injection](15-sql-injection.md) · [Session security](11-session-hijacking.md)