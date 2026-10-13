# 11 - Burp, Parameter Tampering, XSS and DVWA

## Trigger
Inspect an HTTP request, test a parameter, verify reflected/stored XSS or compare access-control behavior.

## Burp workflow
1. Configure the lab browser to the supplied Burp listener.
2. Capture only the relevant request.
3. Send it to Repeater.
4. Change one parameter at a time and compare status, headers and body.
5. Keep a copy of the original request and response.

## Request / response helpers
```bash
curl -sS -D <HEADERS_FILE> -o <BODY_FILE> '<TARGET_URL>'
```

## Safe input validation in the lab
- Use harmless marker strings first to identify reflection and encoding.
- For XSS, check whether a marker appears in HTML text, an attribute, a URL or a script context. Context determines whether output encoding is correct.
- For authorization, compare the same request as the assigned low-privilege and allowed test account. Change only the identifier specified by the challenge.
- For DVWA, confirm the configured security level and preserve cookies / CSRF tokens in requests.

## Answer path
Use the response field explicitly asked for: reflected location, parameter name, status / authorization difference or challenge evidence. A reflected string is not by itself proof of executable XSS.

## Troubleshooting
- Burp has no request: confirm proxy and browser profile.
- Login redirects: preserve the lab session and CSRF token.
- Output appears encoded: inspect response source and context.
- Responses look identical: change only one field and compare status, body length and key text.
