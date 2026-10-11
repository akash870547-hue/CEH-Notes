# Module 11 — Session Hijacking and Session Security

## Exam objective
Understand how web applications maintain user state and how session theft/fixation risks arise. The practical emphasis is inspecting cookies, transport security, session rotation, CSRF relationship and server-side invalidation using a designated training application.

## 1. Session concepts
- **Session ID/token:** random identifier linking browser requests to server-side state.
- **Cookie:** common browser storage/transport mechanism for the session token.
- **Session fixation:** an attacker causes a victim to use a known/pre-set session identifier; defense is rotate the ID after login/privilege changes.
- **Session theft:** a valid token is exposed or captured and reused; defenses include TLS, XSS prevention, expiry and rotation.
- **CSRF:** causes an authenticated browser to send an unwanted action; related to cookies but not the same as session hijacking.
- **Replay:** re-use of a previously valid token/request; nonce, expiry, rotation and server-side checks can reduce risk.

## 2. Inspect cookies in browser DevTools
Use a lab test account. DevTools → Application/Storage → Cookies, and Network → select a request → Request/Response Headers.
Check:
- `Secure`: cookie is sent over secure transport.
- `HttpOnly`: browser JavaScript cannot read it directly.
- `SameSite`: limits some cross-site cookie sending; it is not a complete CSRF defense.
- `Domain` / `Path`: scope of where the cookie is sent.
- `Expires` / `Max-Age`: client cookie lifetime; server-side validity can differ.
- token entropy/format should not expose credentials or personal information.

Command-line header inspection:
```bash
curl -sS -D - -o /dev/null <LAB_URL>
curl -I <LAB_URL>
```
A public endpoint may set no session cookie until login; inspect the relevant authenticated lab request. Do not save/replay real session tokens in shared notes.

## 3. Safe verification workflow
1. Capture unauthenticated baseline.
2. Log in with the assigned test account and inspect Set-Cookie/session changes.
3. Verify the session identifier changes at authentication or privilege change if the application design expects it.
4. Log out, then use the normal lab browser session to confirm protected requests require re-authentication.
5. Inspect expiry/rotation behavior with test accounts only.
6. Capture minimal evidence and redact tokens.

Never copy an active cookie to another browser/person or try it against a real user's account.

## 4. Defenses
- HTTPS everywhere and correct certificate validation.
- Strong, unpredictable, server-generated session identifiers.
- Rotate after login, MFA step-up and privilege changes.
- Invalidate server-side on logout/password change and set reasonable idle/absolute timeouts.
- Apply Secure, HttpOnly and appropriate SameSite attributes.
- Protect against XSS and CSRF; use CSRF tokens/origin checks for state-changing operations where appropriate.
- Do not put tokens in URLs, screenshots, analytics or logs.

## 5. Interpret the evidence carefully
A missing flag is a hardening finding, but severity depends on context. HttpOnly is not a substitute for preventing XSS; Secure doesn't fix a compromised endpoint; SameSite defaults vary across browsers. A logout redirect alone doesn't prove server-side invalidation—verify access to a protected lab resource.

## Lab drill
On an intentionally vulnerable local app, record Set-Cookie attributes before and after login and test logout behavior through the normal UI. Write expected vs observed, impact, limitation and fix.

**Related:** [Burp/ZAP workflow](../tools/burp-zap.md) · [HTTP tools](../tools/web-cli-tools.md) · [Exam workflow](../EXAM-WORKFLOW.md)