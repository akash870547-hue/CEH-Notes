# Workflow Cluster — Session, Perimeter & Web Application Practicals

This is a **custom revision cluster**, not an official CEH Engage phase number. It covers the conceptual workflow for Modules 11–15. Carry out hands-on checks only against the intentionally vulnerable app or service assigned in the course range.

## Web request workflow
1. Map the pages/routes and note whether login is required.
2. Open browser DevTools → Network and reproduce one normal action.
3. Record method, URL, parameters, cookies, status, redirects and response.
4. Change one input at a time in the test app and compare behavior.
5. Preserve a minimal request/response pair that demonstrates the observation.
6. State impact and limitations; then suggest a fix.

## Session security checkpoints
- HTTPS protects data in transit when configured and validated correctly.
- `Secure`: cookie is sent over secure transport.
- `HttpOnly`: browser scripts cannot directly read that cookie.
- `SameSite`: controls some cross-site cookie sending behavior; it is not a complete CSRF solution by itself.
- Rotate session identifiers after authentication/privilege changes.
- Expire/invalidate sessions on logout and password/security changes.
- Keep tokens out of URLs, logs, screenshots and issue trackers.

## Web server review
Inspect HTTP headers, default content, directory listing behavior, TLS certificate/hostname/dates and server logs. A missing header is a hardening observation; demonstrate concrete impact before calling it a vulnerability.

## Application testing categories
- Authentication: identity verification and password/reset flow.
- Authorization: whether this role may access that object/action.
- Input validation: malformed or unexpected data handled safely.
- File upload: allowed type, size, storage location, content validation and execution risk.
- Security configuration: headers, cookies, errors, debug features and secrets.
- Logging: whether useful, non-sensitive audit records are generated.

## SQL injection essentials
SQL injection occurs when untrusted input changes a database query's structure. In a training app, identify the behavior with controlled test inputs and capture evidence. The central remediation is a parameterized/prepared statement, combined with least-privilege database accounts and safe error handling. Escaping alone is not a universal fix.

Use a lab-provided URL for any automated tester; confirm the target and request scope first. Avoid destructive queries or extracting real user data.

## Perimeter / IDS / firewall reasoning
Separate network reachability from application authorization. A filtered port, WAF response or IDS alert may explain an observed behavior but does not independently prove security or vulnerability. Review logs and test with a benign, repeatable action.

## Suggested tools
- Burp Suite Community / OWASP ZAP: proxy, history, request replay and response comparison.
- `curl -I`: headers.
- Wireshark: inspect protocol and connection clues.
- Server and application logs: correlate the test timestamp.

## Evidence template
```text
Route/feature:
User role:
Baseline request:
Changed input:
Observed status/body/redirect:
Reproducible?:
Impact:
Evidence captured:
Suggested fix:
```
