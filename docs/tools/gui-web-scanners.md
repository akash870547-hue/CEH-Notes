# GUI Web Vulnerability Scanners — Acunetix / AppScan Practical Workflow

Some CEH tools are GUI-first and do not have a single portable command line across versions/editions. Never memorize invented CLI flags; use the lab's exact version and documentation.

## 1. Before scanning
- Verify exact lab hostname/IP and written scope.
- Check whether the scanner requires authentication/test credentials.
- Use a lab-approved scan profile; do not launch destructive/high-impact checks unless the exercise explicitly calls for it.
- Record product, version, scan template, target and time.

## 2. Acunetix / Invicti-style web scanner workflow
1. Add a new target using the exact authorized lab base URL.
2. Confirm the scanner is configured for the lab environment; avoid adding unrelated domains.
3. If the lab requires logged-in testing, configure its test-only authentication mechanism and verify login succeeds before starting.
4. Select the lab-prescribed profile and start the scan.
5. Review the issue list and open each finding's evidence/request/response.
6. Validate high-priority findings in the web app or proxy using a safe single test.
7. Export the report and record remediation/re-test status.

## 3. IBM Security AppScan workflow
1. Create/open the lab scan using the supplied AppScan edition and version.
2. Set the exact starting URL and allowed scope.
3. Configure test-only authentication if required by the exercise.
4. Follow the lab instructions for crawl/explore before test phase.
5. Review issue details, affected request/parameter, evidence and confidence.
6. Prioritize confirmed issues, export report and redact any cookies/tokens.

Menu and feature names vary by AppScan edition. Use its installed Help/official documentation rather than assuming every product/edition has the same options.

## 4. Scanner result interpretation
For each finding, record:
- affected URL/parameter and request method;
- confidence/severity and evidence supporting it;
- preconditions, e.g. logged-in role or specific configuration;
- false-positive possibility and safe validation;
- impact in this app;
- remediation and re-test result.

A scanner's "critical" label is a lead to investigate, not a universal business-risk statement.

## 5. Common pitfalls
- Missing login session leads to incomplete crawl.
- Out-of-scope links may cause the scanner to leave the target; verify scope settings.
- A report can contain session cookies, internal URLs, names and sensitive response bodies; store it safely.
- Re-scans may affect test data; reset the app only if the lab guide says so.
- Do not scan production URLs or third-party apps just because the tool can reach them.

Reference: [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) · [Acunetix documentation](https://www.acunetix.com/support/docs/) · [IBM AppScan documentation](https://www.ibm.com/docs/en/appscan)
