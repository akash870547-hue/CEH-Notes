# sqlmap — Basic to Advanced (Authorized SQLi Labs)

sqlmap automates tests for SQL injection. Use it only against the deliberately vulnerable CEH lab URL or an app with explicit written approval. Even low-risk tests send requests; aggressive options may alter or expose data.

## 1. Check version/help
```bash
sqlmap --version
sqlmap -hh
``

## 2. Start with a single lab URL/parameter
```bash
sqlmap -u '<LAB_URL>/item.php?id=1' --batch
``
Use the actual parameter from the lab page. Do not include real session tokens in saved commands.

## 3. Safer, lower-impact test options
```bash
sqlmap -u '<LAB_URL>/item.php?id=1' --batch --risk=1 --level=1
sqlmap -u '<LAB_URL>/item.php?id=1' --batch --technique=BEUSTQ --threads=1
``
- `--batch`: choose tool defaults automatically; still read logs/output.
- `--risk=1`: lowest risk level.
- `--level=1`: least extensive test level.
- `--technique`: limits test categories; BEUSTQ stands for boolean, error, UNION, stacked queries, time-based and inline (availability depends on DB/context).
- `--threads=1`: conservative concurrency.
The second example expands techniques; choose it only if the exercise asks and the environment permits it.

## 4. Authenticated or POST-based lab forms
Capture the exact request from browser DevTools/Burp and save it as a lab request file, then:
```bash
sqlmap -r lab-request.txt --batch --risk=1 --level=1
``
Check the request file to ensure its Host/URL are the lab target and remove unrelated cookies. Avoid sharing request files that contain credentials/session tokens.

## 5. Confirm DBMS / enumerate metadata only when asked
If the lab objective explicitly asks you to identify DBMS or list lab database names, use the narrowest option:
```bash
sqlmap -u '<LAB_URL>/item.php?id=1' --batch --dbms=<LAB_DBMS>
sqlmap -u '<LAB_URL>/item.php?id=1' --batch --dbs
``
Database enumeration can expose data, so do not use it unless it is explicitly part of the sanctioned challenge. Do not dump tables or rows from real systems. Stop once the required lab result is obtained.

## 6. Useful files and reporting
```bash
sqlmap -u '<LAB_URL>/item.php?id=1' --batch -v 2
``
sqlmap stores session/log data under its output directory; review what gets written and redact sensitive values. Consult `--help` for options specific to the installed version.

## 7. Read the result properly
A positive signal needs context: request/parameter, technique, DBMS inference, repeatability and false-positive possibility. HTTP errors, WAF blocks or unstable timing may produce confusing output. Tool output does not grant authorization to extract data.

## 8. Troubleshooting
- URL not reachable: confirm host, scheme, port and app login.
- No injectable parameter: ensure the lab actually provides a parameter and baseline dynamic behavior.
- WAF/429/blocked: stop and follow the lab's instructions; do not attempt bypasses against a real target.
- Time-based uncertainty: network jitter can create false signals; repeat only within lab-approved request limits.
- Use one URL/parameter at a time and keep a copy of baseline response.

## Defensive fix to memorize
Use prepared/parameterized statements, least-privilege database accounts, input validation appropriate to the field and safe errors. Output encoding addresses a different class of risk; it does not fix SQL injection.

Official docs: [sqlmap wiki](https://github.com/sqlmapproject/sqlmap/wiki/Usage)
